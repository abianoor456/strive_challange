
interface ReviewRequestBody {
    repoUrl: string;
    fileSha: string;
  }
  
  export class ReviewDto {
    repoUrl: string;
    fileSha: string;
  
    constructor(data: ReviewRequestBody) {
      this.repoUrl = data.repoUrl;
      this.fileSha = data.fileSha;
    }
  
    private static repoUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+(\.git)?$/;
    private static fileShaRegex = /^[a-fA-F0-9]{40}$/;
  
    isValid(): boolean {
      return ReviewDto.repoUrlRegex.test(this.repoUrl) && ReviewDto.fileShaRegex.test(this.fileSha);
    }
  
    getOwnerAndRepo(): { owner: string; repo: string } | null {
      const match = this.repoUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?$/);
      if (!match) return null;
      const [, owner, repo] = match;
      return { owner, repo };
    }
  }
  