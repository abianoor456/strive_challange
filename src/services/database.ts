import { ReviewDocument, Student as StudentDocument } from '@/types';
import { connectToDatabase } from '../config/database';
import { Review } from '@dal/models/Review';
import { guard } from '@utils/error';
import { Student } from "@dal/models/Student";


class DatabaseService {
    constructor() {
        connectToDatabase();
    }

    async saveReview(reviewData: ReviewDocument): Promise<ReviewDocument | undefined> {
        try {
            const review = new Review(reviewData);
            return await review.save();
        } catch (error) {
            console.error('Error saving review:', error);
            guard.internalServer('Failed to save review');
        }
    }

    async getReviewByFileSha(fileSha: string): Promise<ReviewDocument | null | undefined> {
        try {
            return await Review.findOne({ fileSha });
        } catch (error) {
            console.error('Error retrieving review:', error);
            guard.internalServer('Failed to retrieve review');
        }
    }

    /**
 * Updates an existing student profile.
 * Ensures that only an existing profile is updated. Throws an error if the profile is not found.
 *
 * @param userId - The user ID to associate the profile with
 * @param profileData - The profile data to update
 * @returns The updated student profile
 * @throws {ApiError} If the profile is not found or the update fails
 */
    async updateStudentProfile(
        userId: string,
        profileData: Partial<StudentDocument>
    ): Promise<StudentDocument> {
        try {
            // Check if the student profile exists
            console.log('profileData', profileData)
            const existingProfile = await Student.findOne({ _id: userId });
            if (!existingProfile) {
                throw new Error("Student profile not found");
            }

            // Update the existing profile
            const updatedProfile = await Student.findOneAndUpdate(
                { _id: userId },
                { $set: profileData },
                { new: true, runValidators: true }
            );

            if (!updatedProfile) {
                throw new Error("Failed to update student profile", 500);
            }

            return updatedProfile;
        } catch (error) {
            console.error("Error updating student profile:", error);

            if (error instanceof Error) {
                throw error; // Re-throw known API errors
            }

            throw new Error("Failed to update student profile", 500);
        }
    }


    /**
     * Retrieves a student profile by user ID.
     *
     * @param userId - The user ID to search for
     * @returns The student profile, or null if not found
     */
    async getStudentProfileByUserId(
        userId: string
    ): Promise<StudentDocument | null | undefined> {
        try {
            return await Student.findOne({ userId });
        } catch (error) {
            console.error("Error retrieving student profile:", error);
            guard.internalServer("Failed to retrieve student profile");
        }
    }

    /**
     * Deletes a student profile by user ID.
     *
     * @param userId - The user ID to delete the profile for
     * @returns The deleted student profile, or null if not found
     */
    async deleteStudentProfile(
        userId: string
    ): Promise<StudentDocument | null | undefined> {
        try {
            return await Student.findOneAndDelete({ userId });
        } catch (error) {
            console.error("Error deleting student profile:", error);
            guard.internalServer("Failed to delete student profile");
        }
    }
}

export default new DatabaseService();
