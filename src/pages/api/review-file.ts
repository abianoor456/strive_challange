import { NextApiRequest, NextApiResponse } from 'next';
import { ReviewDto } from '@dto/ReviewRequest.dto';
import { ReviewService } from '@services/reviewCode';
import { ApiError } from '@utils/error';

const reviewService = new ReviewService();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    try {
        const dto = new ReviewDto(req.body);
        const result = await reviewService.processReviewRequest(dto);
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof ApiError) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            console.error('Unexpected error:', error);
            res.status(500).json({ message: 'An unexpected error occurred' });
        }
    }
}
