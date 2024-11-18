export interface ReviewResult {
    score: number;
    reasoning: string;
}

export interface ReviewRequestBody {
    repoUrl: string;
    fileSha: string;
}
