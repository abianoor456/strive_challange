import { ReviewDto } from '@dto/ReviewRequest.dto';
import DatabaseService from './database';
import { GitHubService } from './github';
import { LangChainService } from './langChain';
import { ApiError } from '@utils/error';
import { CodeReviewResponse } from '@/types';

export class ReviewService {
    async processReviewRequest(dto: ReviewDto): Promise<CodeReviewResponse> {
        try {

            const gitHubService: GitHubService = new GitHubService(dto.repoUrl, dto.fileSha);
            const fileContent: string = await gitHubService.fetchFileContent();
            const review: CodeReviewResponse = await LangChainService.getCodeReview(fileContent);

            await DatabaseService.saveReview({
                repoUrl: dto.repoUrl,
                fileSha: dto.fileSha,
                score: review.score,
                reasoning: review.reasoning,
            });

            return review;
        } catch (error) {
            console.error('Review processing error:', error);
            throw new ApiError('Failed to process review request', 500);
        }
    }
}
