import { ReviewDocument } from '@/types';
import { connectToDatabase } from '../config/database';
import { Review } from '@dal/models/Review';
import { guard } from '@utils/error';

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
}

export default new DatabaseService();
