import { ReviewDto } from '@dto/ReviewRequest.dto';
import { GitHubService } from './github';
import { OpenAIService } from './openAI';
import { ReviewResult, CodeReviewResponse } from '@types/index';

export class ReviewService {
    async processReviewRequest(dto: ReviewDto): Promise<ReviewResult> {
        const gitHubService = new GitHubService(dto.repoUrl, dto.fileSha);
        const fileContent = await gitHubService.fetchFileContent();
        const review: CodeReviewResponse = await OpenAIService.getCodeReview(fileContent);

        return {
            score: review.score,
            reasoning: review.reasoning,
        };
    }
}
