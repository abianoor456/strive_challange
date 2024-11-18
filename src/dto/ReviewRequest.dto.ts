import { ReviewRequestBody } from '@/types';
import { isValid, getOwnerAndRepo } from '@utils/github'
export class ReviewDto {
  repoUrl: string;
  fileSha: string;

  constructor(data: ReviewRequestBody) {
    this.repoUrl = data.repoUrl;
    this.fileSha = data.fileSha;
  }

  isValid(): boolean {
    return isValid(this.repoUrl, this.fileSha);
  }

  getOwnerAndRepo(): { owner: string; repo: string } | null {
    return getOwnerAndRepo(this.repoUrl);
  }
}
