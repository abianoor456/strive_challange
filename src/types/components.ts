export interface ErrorProps {
    message: string;
}

export interface FormProps {
    onSubmit: (repoUrl: string, fileSha: string) => void;
    error: string;
    loading: boolean;
}

export interface ResultProps {
    result: string;
}