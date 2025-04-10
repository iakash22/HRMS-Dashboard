const errors = require('../constant/errors');
const models = require('../models');
const { uploadImageCloudinary } = require('../utils/fileUploadAndDelete');

const applyLeave = async (payload) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const attendance = await models.Attendance.findOne({
            employee: payload.employeeId,
            date: today,
            isDeleted: false,
        }).populate("employee", "fullName email profilePic position").lean().exec();

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

        return {
            success: true, status: 200, message: "Leave request submitted.", data: { leave, employee: attendance.employee }
        };
    } catch (error) {
        console.error("Error applying leave:", error);
        return errors.SERVER_ERROR;
    }
}

const updateLeaveStatus = async (payload) => {
    try {
        const leave = await models.Leave.findById(payload?.leaveId);
        if (!leave) return errors.NOT_FOUND;

        leave.status = payload?.status;
        leave.updatedAt = new Date();
        await leave.save();

        return { success: true, status: 200, message: "Leave status updated.", data: leave };
    } catch (error) {
        console.error("Error updating leave status:", error);
        return errors.SERVER_ERROR;
    }
};

const getAndSearchLeaves = async (payload) => {
    try {
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const whereClause = {
            isDeleted: false,
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
                .populate("employee", "fullName email profilePic position"),
            models.Leave.countDocuments(whereClause)
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            status: 200,
            message: "Leaves fetched successfully.",
            data: {
                users: leaves,
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


const getLeaveCountsByDate = async (payload) => {
    try {
        const leaves = await models.Leave.find({
            status: 'Approved',
            isDeleted: false
        }).select('date'); // only need the date field

        const leaveCountMap = {};

        leaves.forEach((leave) => {
            const dateKey = new Date(leave.date).toISOString().split('T')[0]; // 'YYYY-MM-DD'
            leaveCountMap[dateKey] = (leaveCountMap[dateKey] || 0) + 1;
        });

        const result = Object.entries(leaveCountMap).map(([date, count]) => ({
            date,
            count,
        }));

        return {
            success: true,
            status: 200,
            message: "Leave count by date fetched successfully.",
            data: result,
        };
    } catch (error) {
        console.error("Error fetching leave count by date:", error);
        return errors.SERVER_ERROR;
    }
};



module.exports = {
    applyLeave: applyLeave,
    updateLeaveStatus: updateLeaveStatus,
    getAndSearchLeaves: getAndSearchLeaves,
    getLeaveCountsByDate : getLeaveCountsByDate
}