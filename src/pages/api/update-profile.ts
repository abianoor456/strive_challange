import { NextApiRequest, NextApiResponse } from "next";
import { UserProfileService } from "../../services/UserProfileService";
import { UpdateProfileDto } from "../../dto/UpdateProfileDto";
import { ApiError } from '@utils/error';

const userProfileService = new UserProfileService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Only PUT requests are allowed" });
    }

    try {
        const userId = '675f55579a7b4eaff4e05e05'; // Provided by authGuard
        if (!userId) {
            throw new ApiError("Unauthorized", 401);
        }

        const dto = new UpdateProfileDto(req.body);
        const updatedProfile = await userProfileService.updateProfile(userId, dto);

        res.status(200).json(updatedProfile);
    } catch (error) {
        console.error("Error updating profile:", error);

        if (error instanceof ApiError) {
            return res.status(error.statusCode).json({ message: error.message });
        }

        res.status(500).json({ message: "An unexpected error occurred" });
    }
};
