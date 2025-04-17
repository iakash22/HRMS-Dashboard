const errors = require('../constant/errors');
const models = require('../models');
const { uploadImageCloudinary } = require('../utils/fileUploadAndDelete');

const applyLeave = async (payload) => {
    try {
        console.log("payload :", payload);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await models.Attendance.findOne({
            employee: payload.employeeId,
            date: today,
            isDeleted: false,
        }).populate("employee", "fullName profilePic position").lean().exec();

        if (!attendance || attendance.status !== "Present") {
            return { success: false, status: 400, message: "Only 'Present' employees can apply for leave." };
        }

        let docsUrl = "";
        if (payload?.docs) {
            const folder = process.env.FOLDER_NAME || "HRMS_DASHBOARD";
            const result = await uploadImageCloudinary([payload?.docs], folder);
            docsUrl = result[0].url;
        }

        const leave = await models.Leave.create({
            employee: payload.employeeId,
            reason: payload.reason,
            date: payload.date,
            docsUrl: docsUrl || "",
            status: "Pending",
        });

        const employee = attendance?.employee;

        const modifiedData = {
            _id: leave?._id,
            reason: leave?.reason,
            date: leave?.date,
            employeeId: leave?.employee,
            status: leave?.status,
            docsUrl: leave?.docsUrl,
            fullName: employee?.fullName,
            profilePic: employee?.profilePic,
        }

        return { success: true, status: 200, message: "Leave request submitted.", data: modifiedData };
    } catch (error) {
        console.error("Error applying leave:", error);
        return errors.SERVER_ERROR;
    }
}

const updateLeaveStatus = async (payload) => {
    try {
        console.log("payload :", payload);
        const leave = await models.Leave.findById(payload?.leaveId);
        if (!leave) return errors.NOT_FOUND;

        leave.status = payload?.status;
        leave.updatedAt = new Date();
        await leave.save();

        if (leave?.status === "Approved") {
            const markAttendance = await models.Attendance.findOne({
                employee: leave.employee,
                date: leave.date,
                isDeleted: false,
            });

            if (!markAttendance) {
                const leaveDate = leave?.date;
                leaveDate.setHours(0, 0, 0, 0);
                await models.Attendance.create({
                    employee: leave?.employee,
                    date: leaveDate,
                    status: "Absent",
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
            } else {
                markAttendance.status = "Absent";
                await markAttendance.save();
            }
        }

        return { success: true, status: 200, message: "Leave status updated.", data: leave };
    } catch (error) {
        console.error("Error updating leave status:", error);
        return errors.SERVER_ERROR;
    }
};

const getAndSearchLeaves = async (payload) => {
    try {
        console.log("payload :", payload);
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const whereClause = {
            isDeleted: false,
            date: { $gte: today },
        };

        if (payload?.search) {
            const searchRegex = new RegExp(payload?.search, 'i');

            const matchingEmployees = await models.CandidateToEmployee.find({
                $or: [
                    { fullName: searchRegex },
                    { email: searchRegex },
                    { position: searchRegex }
                ]
            }).select('_id');

            const employeeIds = matchingEmployees.map(e => e._id);

            whereClause.employee = { $in: employeeIds };
        }

        if (payload?.status) {
            whereClause.status = payload?.status;
        }

        const [leaves, totalCount] = await Promise.all([
            models.Leave.find(whereClause)
                .select("status date reason docsUrl")
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort({ createdAt: -1 })
                .populate("employee", "fullName profilePic")
                .lean(),
            models.Leave.countDocuments(whereClause)
        ]);

        const data = leaves.map(({ employee, ...rest }) => ({ ...rest, employeeId: employee?._id, profilePic: employee?.profilePic, fullName: employee?.fullName }));

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            status: 200,
            message: "Leaves fetched successfully.",
            data: {
                users: data,
                page,
                pageSize,
                totalPages,
                totalCount,
            }
        };

    } catch (error) {
        console.error("Error get leave :", error);
        return errors.SERVER_ERROR;
    }
}

const getLeaveCountsAndDataByDate = async (payload) => {
    try {
        console.log("payload :", payload);
        if (payload?.date) {
            const inputDate = new Date(payload.date);
            const startOfDay = new Date(inputDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(inputDate.setHours(23, 59, 59, 999));

            const leaves = await models.Leave.find({
                status: 'Approved',
                isDeleted: false,
                date: { $gte: startOfDay, $lte: endOfDay },
            }).select('date').populate('employee', 'fullName position department _id profilePic');

            return {
                success: true,
                status: 200,
                message: "Date Wise Leaves fetched successfully.",
                data: leaves,
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const leaves = await models.Leave.find({
            status: 'Approved',
            isDeleted: false,
            date: { $gte: today },
        }).select('date'); // only need the date field

        const leaveCountMap = {};

        leaves.forEach((leave) => {
            const dateKey = leave.date;
            leaveCountMap[dateKey] = (leaveCountMap[dateKey] || 0) + 1;
        });

        const result = Object.entries(leaveCountMap).map(([date, count]) => ({
            date,
            count,
        }));

        return { success: true, status: 200, message: "Date Wise Leaves count fetched successfully.", data: result };
    } catch (error) {
        console.error("Error fetching leave count by date:", error);
        return errors.SERVER_ERROR;
    }
};



module.exports = {
    applyLeave: applyLeave,
    updateLeaveStatus: updateLeaveStatus,
    getAndSearchLeaves: getAndSearchLeaves,
    getLeaveCountsAndDataByDate: getLeaveCountsAndDataByDate
}