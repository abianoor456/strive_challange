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

    /**
     * Fetches the content of a file from a GitHub repository based on the `repoUrl` and `fileSha` set in the constructor.
     *
     * @returns The content of the file as a string.
     * @throws {ApiError} If the GitHub API returns an error or if the `repoUrl` is invalid.
     * @throws {InternalServer} If there is an unexpected error fetching the file from GitHub.
     */
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
