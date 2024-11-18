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

export interface ReviewDocument {
    repoUrl: string;
    fileSha: string;
    score: number;
    reasoning: {
        readability: { score: number; reasoning: string };
        functionality: { score: number; reasoning: string };
        errorHandling: { score: number; reasoning: string };
        bestPractices: { score: number; reasoning: string };
    };
}
