
export class UpdateProfileDto {
    bio?: string;
    skills?: string[];
    portfolioLinks?: string[];
    education?: {
        degree: string;
        institution: string;
        yearOfGraduation: number;
    }[];
    experience?: {
        title: string;
        company: string;
        duration: string;
        description: string;
    }[];
    cvUrl?: string;

    constructor(data: any) {
        this.bio = data.bio;
        this.skills = data.skills || [];
        this.portfolioLinks = data.portfolioLinks || [];
        this.education = data.education || [];
        this.experience = data.experience || [];
        this.cvUrl = data.cvUrl;
    }
}
