const errors = require('../constant/errors');
const models = require('../models');

const editEmployee = async (payload) => {
    try {
        console.log("payload :", payload);
        const employee = await models.CandidateToEmployee.findOne({ _id: payload?.employeeId }).select("-isDeleted -resumeUrl -status");

        if (!employee) {
            return errors.NOT_FOUND;
        }

        if (payload.fullName) employee.fullName = payload.fullName;
        if (payload.phone) employee.phone = payload.phone;
        if (payload.email) employee.email = payload.email;
        if (payload.position) employee.position = payload.position;
        if (payload.department) employee.department = payload.department;
        if (payload.joiningDate) employee.joiningDate = payload.joiningDate;

        await employee.save();

        return {
            status: 200,
            message: "Employee updated successfully",
            data: employee,
        };

    } catch (error) {
        console.error("Error Ocurred Occurred while edit employee controller", error);
        return errors.SERVER_ERROR;
    }
}

const deleteEmployee = async (payload) => {
    try {
        console.log("payload :", payload);
        const employee = await models.CandidateToEmployee.findOne({ _id: payload.employeeId, role: "Employee", isDeleted: false });

        if (!employee) {
            return errors.NOT_FOUND;
        }

        employee.isDeleted = true;
        await employee.save();

        return { status: 200, success: true, message: "Deleted Successfully", data: { _id: employee._id } };
    } catch (error) {
        console.error("Error Ocurred Occurred while delete employee controller", error);
        return errors.SERVER_ERROR;
    }
}

const getAndSearchEmployees = async (payload) => {
    try {
        console.log("payload :", payload);
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const whereClause = {
            role: "Employee",
            isDeleted: false,
            status: { $in: ["Selected"] }
        };

        if (payload?.search) {
            const searchRegex = new RegExp(payload.search, 'i');
            if (payload.onlyFullName) {
                whereClause.fullName = searchRegex;
            } else {
                whereClause.$or = [
                    { fullName: searchRegex },
                    { email: searchRegex },
                    { position: searchRegex },
                ];
            }
        }

        if (payload?.position) {
            const searchRegex = new RegExp(payload.position, 'i');
            whereClause.position = searchRegex
        }

        const [candidates, totalCount] = await Promise.all([
            models.CandidateToEmployee.find(whereClause)
                .select("fullName email createdAt phone position profilePic joiningDate department")
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort({ createdAt: -1 }),
            models.CandidateToEmployee.countDocuments(whereClause)
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            status: 200,
            message: "Employee fetched successfully.",
            data: {
                users: candidates,
                page,
                pageSize,
                totalPages,
                totalCount,
            }
        };
    } catch (error) {
        console.error("Error Ocurred Occurred while get and Search employee controller", error);
        return errors.SERVER_ERROR;
    }
}

module.exports = {
    editEmployee: editEmployee,
    deleteEmployee: deleteEmployee,
    getAndSearchEmployees: getAndSearchEmployees
}