import { ReviewDto } from '@dto/ReviewRequest.dto';
import DatabaseService from './database';
import { GitHubService } from './github';
import { LangChainService } from './langChain';
import { ApiError } from '@utils/error';
import { CodeReviewResponse } from '@/types';

export class ReviewService {
    /**
     * Processes a review request, handling errors gracefully and returning 
     * detailed error information if encountered.
     * 
     * @param dto - Data Transfer Object containing the repository URL and file SHA.
     * @returns The generated CodeReviewResponse.
     * @throws {ApiError} If the request fails due to service errors.
     */
    async processReviewRequest(dto: ReviewDto): Promise<CodeReviewResponse> {
        try {
            // initialize GitHub service to fetch file content
            const gitHubService: GitHubService = new GitHubService(dto.repoUrl, dto.fileSha);
            const fileContent: string = await gitHubService.fetchFileContent();

            // generate code review via LangChainService
            const review: CodeReviewResponse = await LangChainService.getCodeReview(fileContent);

            // save the review in the database
            await DatabaseService.saveReview({
                repoUrl: dto.repoUrl,
                fileSha: dto.fileSha,
                score: review.score,
                reasoning: review.reasoning,
            });

            return review;
        } catch (error) {
            console.error('Review processing error:', error);

            if (error instanceof ApiError) {
                throw error;
            }

            throw new ApiError(
                error.message || 'An unexpected error occurred while processing the review request',
                500
            );
        }
    }
}
