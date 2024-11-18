// src/services/GitHubService.ts
import axios from 'axios';
import { isValidRepoUrl, isValidFileSha, getOwnerAndRepo } from '@utils/github'
import { guard } from '@utils/error';

export class GitHubService {
    private repoUrl: string;
    private fileSha: string;

    constructor(repoUrl: string, fileSha: string) {
        if (!isValidRepoUrl(repoUrl)) {
            guard.badImplementation('Invalid GitHub URL.', 400);
        }
        if (!isValidFileSha(fileSha)) {
            guard.badImplementation('Invalid file SHA format.', 400);
        }
        this.repoUrl = repoUrl;
        this.fileSha = fileSha;
    }

    async fetchFileContent(): Promise<string> {
        const repoDetails = getOwnerAndRepo(this.repoUrl);
        if (!repoDetails) {
            guard.notFound('Invalid GitHub repository URL.');
        }

        const { owner, repo } = repoDetails!;
        const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/git/blobs/${this.fileSha}`;

        try {
            const response = await axios.get(githubApiUrl, {
                headers: { Accept: 'application/vnd.github.v3+json' },
            });
            return Buffer.from(response.data.content, 'base64').toString('utf-8');
        } catch (error) {
            console.error('Error fetching file from GitHub:', error);
            guard.internalServer('Failed to fetch file from GitHub');
            return ''
        }
    }
}
