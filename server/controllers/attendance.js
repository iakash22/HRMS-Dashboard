const errors = require('../constant/errors');
const models = require('../models');

const getAndSearchAttendance = async (payload) => {
    try {
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const searchRegex = payload?.search ? new RegExp(payload.search, 'i') : null;
        const statusFilter = payload?.status || null;

        // 🔹 Step 1: Base employee query
        const employeeQuery = {
            role: "Employee",
            isDeleted: false,
            status: { $in: ["Selected"] },
        };

        if (searchRegex) {
            employeeQuery.$or = [
                { fullName: searchRegex },
                { email: searchRegex },
                { position: searchRegex },
            ];
        }

        const [employees, totalCount] = await Promise.all([
            models.CandidateToEmployee.find(employeeQuery)
                .select("fullName email position department profilePic")
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort({ createdAt: -1 }),

            models.CandidateToEmployee.countDocuments(employeeQuery),
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const employeeIds = employees.map((e) => e._id);

        const [attendanceDocs, taskDocs] = await Promise.all([
            models.Attendance.find({
                employee: { $in: employeeIds },
                date: today,
                isDeleted: false,
            }),
            models.Task.find({
                employee: { $in: employeeIds },
                date: today,
            }),
        ]);

        const attendanceMap = new Map();
        const taskMap = new Map();

        attendanceDocs.forEach((a) => {
            attendanceMap.set(a.employee.toString(), a.status);
        });

        taskDocs.forEach((t) => {
            taskMap.set(t.employee.toString(), {
                description: t.description,
                isCompleted: t.isCompleted,
            });
        });

        const finalList = employees
            .map((emp) => {
                const id = emp._id.toString();
                const attendance = attendanceMap.get(id) || "Not Marked";
                const task = taskMap.get(id) || { description: "", isCompleted: false };

                return {
                    ...emp._doc,
                    attendance,
                    task,
                };
            })
            .filter((item) => (statusFilter ? item.attendance === statusFilter : true));

        return {
            success: true,
            status: 200,
            message: "Attendance fetched successfully.",
            data: {
                users: finalList,
                page,
                pageSize,
                totalPages,
                totalCount,
            },
        };
    } catch (error) {
        console.error("Error while fetching attendance with task:", error);
        return errors.SERVER_ERROR;
    }
};

const markAttendance = async (payload) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        const existing = await models.Attendance.findOne({ employee: payload?.employeeId, date: today });

        if (existing) {
            existing.status = payload?.status;
            existing.updatedAt = new Date();
            await existing.save();
            return { success: true, status :200, message: 'Attendance updated successfully', data: { _id: existing?.employee, status: existing?.status } };
        }

        const attendance = await models.Attendance.create({
            employee: payload?.employeeId,
            date: today,
            status: payload?.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        return { success: true, status : 200, message: 'Attendance updated successfully', data: { _id: attendance?.employee, status: attendance?.status } };
    }
    catch (error) {
        console.error("Error marking attendance:", error);
        return errors.SERVER_ERROR;
    }
}


module.exports = {
    getAndSearchAttendance: getAndSearchAttendance,
    markAttendance : markAttendance,
}