import { ReviewDto } from '@dto/ReviewRequest.dto';
import { GitHubService } from './github';
import { LangChainService } from './langChain';
import { ApiError } from '@utils/error';

export class ReviewService {
    async processReviewRequest(dto: ReviewDto) {
        try {

            const gitHubService = new GitHubService(dto.repoUrl, dto.fileSha);
            const fileContent = await gitHubService.fetchFileContent();
            const review = await LangChainService.getCodeReview(fileContent);

            return review;
        } catch (error) {
            console.error('Review processing error:', error);
            throw new ApiError('Failed to process review request', 500);
        }
    }
}
