export interface ReviewResult {
    score: number;
    reasoning: ReviewReasoning;
}

export interface ReviewRequestBody {
    repoUrl: string;
    fileSha: string;
}

export interface CriterionDetail {
    score: number;
    reasoning: string;
}

export interface ReviewReasoning {
    readability: CriterionDetail;
    functionality: CriterionDetail;
    errorHandling: CriterionDetail;
    bestPractices: CriterionDetail;
}

export interface CodeReviewResponse {
    score: number;
    reasoning: ReviewReasoning;
}
