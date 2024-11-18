import { NextApiRequest, NextApiResponse } from 'next';
import { ReviewDto } from '@dto/ReviewRequest.dto';
import { ReviewService } from '@services/reviewCode';
import { ReviewResult, ApiErrorResponse } from '@types/index';

const reviewService = new ReviewService();
type ReviewResponse = ReviewResult | ApiErrorResponse;

/**
 * Handles POST requests to review a file in a GitHub repository.
 *
 * @param {NextApiRequest<ReviewRequestBody>} req - The request object with ReviewRequestBody.
 * @param {NextApiResponse<ReviewResponse>} res - The response object with ReviewResponse.
 * @returns {Promise<void>}
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<ReviewResponse>) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    try {
        const dto = new ReviewDto(req.body);

        const result = await reviewService.processReviewRequest(dto);

        res.status(200).json(result);
    } catch (error) {
        console.error('Error processing review request:', error);
        res.status(500).json({ message: 'Failed to process review request' });
    }
}
