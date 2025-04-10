const errors = require('../constant/errors');
const models = require('../models');
const { uploadImageCloudinary } = require('../utils/fileUploadAndDelete');

const createCandidate = async (payload) => {
    try {
        const { fullName, email, phone, position, experience } = payload;

        const resume = payload.resume;

        if (!resume) {
            return errors.FIELDS_REQUIRED;
        }

        // Check if email already exists
        const existing = await models.CandidateToEmployee.findOne({ email, isDeleted: false });
        if (existing) {
            return { ...errors.USER_ALREADY_EXISTS, message: 'Candidate already exists with this email.' };
        }

        const folder = process.env.FOLDER_NAME || 'HRMS_DASHBOARD';
        const result = await uploadImageCloudinary([resume], folder);

        const newCandidate = await models.CandidateToEmployee.create({
            fullName,
            email,
            phone,
            position,
            experience,
            resumeUrl: result[0].url,
            role: 'Candidate',
            status: 'New',
        });

        newCandidate.isDeleted = undefined;
        newCandidate.profilePic = undefined;
        newCandidate.department = undefined;

        return {
            status: 201,
            message: 'Candidate created successfully.',
            data: newCandidate,
        };
    } catch (error) {
        console.error("Error Ocurred Occurred while create candidate controller", error);
        return errors.SERVER_ERROR;
    }
}

const getAndSearchCandidates = async (payload) => {
    try {
        console.log("payload :", payload);
        const page = parseInt(payload?.page) || 1;
        const pageSize = parseInt(payload?.pageSize) || 10;

        const whereClause = {
            role: "Candidate",
            isDeleted: false,
            status: { $nin: ["Selected"] }
        };

        if (payload?.search) {
            const searchRegex = new RegExp(payload.search, 'i'); 
            whereClause.$or = [
                { fullName: searchRegex },
                { email: searchRegex },
                { position: searchRegex },
            ];
        }

        if (payload?.position) {
            const searchRegex = new RegExp(payload.position, 'i');
            whereClause.position = searchRegex
        }

        if (payload?.status) {
            const searchRegex = new RegExp(payload.status, 'i');
            whereClause.status = searchRegex
        }

        const [candidates, totalCount] = await Promise.all([
            models.CandidateToEmployee.find(whereClause)
                .select("fullName email status createdAt phone resumeUrl position experience")
                .skip((page - 1) * pageSize)
                .limit(pageSize)
                .sort({ createdAt: -1 }),
            models.CandidateToEmployee.countDocuments(whereClause)
        ]);

        const totalPages = Math.ceil(totalCount / pageSize);

        return {
            success: true,
            status: 200,
            message: "Candidates fetched successfully.",
            data: {
                users: candidates,
                page,
                pageSize,
                totalPages,
                totalCount,
            }
        };
    } catch (error) {
        console.error("Error Ocurred Occurred while get candidate controller", error);
        return errors.SERVER_ERROR;
    }
}

const updateStatus = async (payload) => {
    try {
        const candidate = await models.CandidateToEmployee.findOne({ _id: payload?.candidateId, role: "Candidate", isDeleted: false });

        if (!candidate) {
            return errors.NOT_FOUND
        }

        // if(payload?.status === "rejected")

        if (payload?.status === "Selected") {
            candidate.role = "Employee";
            candidate.profilePic = `https://api.dicebear.com/5.x/initials/svg?seed=${candidate?.fullName}`;
            candidate.joiningDate = Date.now();
        }

        candidate.status = payload.status;
        await candidate.save();

        return { status: 200, success: true, message: "Status updated", data: candidate };
    } catch (error) {
        console.error("Error Ocurred Occurred while update status candidate controller", error);
        return errors.SERVER_ERROR;
    }
}

const deleteCandidate = async (payload) => {
    try {
        const candidate = await models.CandidateToEmployee.findOne({ _id: payload.userId, role: "Candidate", isDeleted: false });

        if (!candidate) {
            return errors.NOT_FOUND;
        }

        candidate.isDeleted = true;
        await candidate.save();

        return { status: 200, success: true, message: "Deleted Sucessfully", data: { _id: candidate._id } };
    } catch (error) {
        console.error("Error Ocurred Occurred while delete candidate controller", error);
        return errors.SERVER_ERROR;
    }
}

module.exports = {
    getAndSearchCandidates: getAndSearchCandidates,
    createCandidate: createCandidate,
    updateStatus: updateStatus,
    deleteCandidate: deleteCandidate,
}