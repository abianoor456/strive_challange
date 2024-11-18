
const repoUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+(\.git)?$/;
const fileShaRegex = /^[a-fA-F0-9]{40}$/;

//TODO; remove
export function isValid(repoUrl: string, fileSha: string): boolean {
    return repoUrlRegex.test(repoUrl) && fileShaRegex.test(fileSha);
}

export function isValidRepoUrl(url: string): boolean {
    const repoUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+(\.git)?$/;
    return repoUrlRegex.test(url);
}

export function isValidFileSha(fileSha: string): boolean {
    const fileShaRegex = /^[a-fA-F0-9]{40}$/;
    return fileShaRegex.test(fileSha);
}

export function getOwnerAndRepo(repoUrl: string): { owner: string; repo: string } | null {
    const match = repoUrl.match(/^https:\/\/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?$/);
    if (!match) return null;
    const [, owner, repo] = match;
    return { owner, repo };
}
