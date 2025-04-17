const errors = require('../constant/errors');
const models = require('../models');
const { faker } = require('@faker-js/faker');

const getAndSearchAttendance = async (payload) => {
    try {
        console.log("payload :", payload);
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const searchRegex = payload?.search ? new RegExp(payload.search, 'i') : null;
        const statusFilter = payload?.status || null;

        const whereClause = {};

        if (searchRegex) {
            whereClause.$or = [
                { fullName: searchRegex },
                { email: searchRegex },
            ];
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let data = null;
        let totalPages = 0;
        let totalCount = 0;

        if (statusFilter && !searchRegex) {
            const [attendanceDocs, totalAttendanceCount, taskDocs] = await Promise.all([
                models.Attendance.find({
                    status: statusFilter,
                    date: today,
                    isDeleted: false
                }).populate("employee", "fullName email position department profilePic")
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .lean(),
                models.Attendance.countDocuments({
                    status: statusFilter,
                    date: today,
                    isDeleted: false
                }),
                models.Task.find({
                    date: today,
                }),
            ]);

            attendanceDocs.sort((a, b) =>
                a.employee.fullName.localeCompare(b.employee.fullName)
            );

            const taskMap = new Map();

            taskDocs.forEach((t) => {
                taskMap.set(t.employee.toString(), {
                    description: t.description,
                });
            });

            data = attendanceDocs
                .map((_docs) => {
                    const task = taskMap.get(_docs.employee._id.toString())?.description || "";

                    return {
                        ..._docs.employee,
                        attendance: _docs?.status,
                        task,
                    };
                })
            totalPages = Math.ceil(totalAttendanceCount / pageSize);
            totalCount = totalAttendanceCount;
        }
        else {
            whereClause.role = "Employee";
            whereClause.isDeleted = false;
            whereClause.status = { $in: ["Selected"] };

            const [employees, totalEmployeeCount] = await Promise.all([
                models.CandidateToEmployee.find(whereClause)
                    .select("fullName email position department profilePic")
                    .skip((page - 1) * pageSize)
                    .limit(pageSize)
                    .sort({ "fullName": 1 }),

                models.CandidateToEmployee.countDocuments(whereClause),
            ]);

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
                });
            });

            data = employees
                .map((emp) => {
                    const id = emp._id.toString();
                    const attendance = attendanceMap.get(id) || "Not Marked";
                    const task = taskMap.get(id)?.description || "";

                    return {
                        ...emp._doc,
                        attendance,
                        task,
                    };

                });
            totalPages = Math.ceil(totalEmployeeCount / pageSize);
            totalCount = totalEmployeeCount;
        }



        return {
            success: true,
            status: 200,
            message: "Attendance fetched successfully.",
            data: {
                users: data,
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
        console.log("payload :", payload);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const existing = await models.Attendance.findOne({ employee: payload?.employeeId, date: today });

        if (existing) {
            existing.status = payload?.status;
            existing.updatedAt = new Date();
            await existing.save();
            return { success: true, status: 200, message: 'Attendance updated successfully', data: { _id: existing?.employee, status: existing?.status } };
        }

        const attendance = await models.Attendance.create({
            employee: payload?.employeeId,
            date: today,
            status: payload?.status,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await models.Task.create({
            employee: payload?.employeeId,
            description: faker.hacker.phrase(),
            comment : faker.lorem.sentences(3),
            date: today,
            createdAt: new Date(),
            updatedAt: new Date(),
        })

        return { success: true, status: 200, message: 'Attendance updated successfully', data: { _id: attendance?.employee, status: attendance?.status } };
    }
    catch (error) {
        console.error("Error marking attendance:", error);
        return errors.SERVER_ERROR;
    }
}


module.exports = {
    getAndSearchAttendance: getAndSearchAttendance,
    markAttendance: markAttendance,
}