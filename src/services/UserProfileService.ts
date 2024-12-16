import { UpdateProfileDto } from "../dto/UpdateProfileDto";
import DatabaseService from "./database";
import { ApiError } from "../utils/error";

export class UserProfileService {
    /**
     * Updates or creates a student profile.
     * 
     * @param userId - The ID of the user whose profile is being updated
     * @param dto - Data Transfer Object containing profile updates
     * @returns The updated or newly created student profile
     * @throws {ApiError} If the database operation fails
     */
    async updateProfile(userId: string, dto: UpdateProfileDto) {
        try {
            const updatedProfile = await DatabaseService.updateStudentProfile(
                userId,
                dto
            );

            if (!updatedProfile) {
                throw new ApiError("Failed to update profile", 500);
            }

            return updatedProfile;
        } catch (error) {
            console.error("Error in UserProfileService.updateProfile:", error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError("An unexpected error occurred while updating profile", 500);
        }
    }

    /**
     * Retrieves a student profile by user ID.
     * 
     * @param userId - The ID of the user whose profile is being retrieved
     * @returns The student profile, or null if not found
     * @throws {ApiError} If the database operation fails
     */
    async getProfile(userId: string) {
        try {
            const profile = await DatabaseService.getStudentProfileByUserId(userId);

            if (!profile) {
                throw new ApiError("Profile not found", 404);
            }

            return profile;
        } catch (error) {
            console.error("Error in UserProfileService.getProfile:", error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError("An unexpected error occurred while retrieving profile", 500);
        }
    }

    /**
     * Deletes a student profile by user ID.
     * 
     * @param userId - The ID of the user whose profile is being deleted
     * @returns The deleted student profile
     * @throws {ApiError} If the database operation fails
     */
    async deleteProfile(userId: string) {
        try {
            const deletedProfile = await DatabaseService.deleteStudentProfile(userId);

            if (!deletedProfile) {
                throw new ApiError("Profile not found for deletion", 404);
            }

            return deletedProfile;
        } catch (error) {
            console.error("Error in UserProfileService.deleteProfile:", error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError("An unexpected error occurred while deleting profile", 500);
        }
    }
}
