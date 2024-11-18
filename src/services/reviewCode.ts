import { ReviewDto } from '@dto/ReviewRequest.dto';
import { GitHubService } from './github';
import { OpenAIService } from './openAI';
import { ReviewResult } from '@types/index';

export class ReviewService {
    async processReviewRequest(dto: ReviewDto): Promise<ReviewResult> {
        const gitHubService = new GitHubService(dto.repoUrl, dto.fileSha);

        const fileContent = await gitHubService.fetchFileContent();

        const review = await OpenAIService.getCodeReview(fileContent);

        return {
            score: 80, // Example static score; replace with dynamic scoring if available
            reasoning: review,
        };
    }
}
