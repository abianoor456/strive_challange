import mongoose from 'mongoose';

export interface Student {
    userId: mongoose.Types.ObjectId;
    bio: string;
    skills: string[];
    portfolioLinks?: string[]; // Optional portfolio links
    education?: {
        degree: string;
        institution: string;
        yearOfGraduation: number;
    }[]; // Optional education
    experience?: {
        title: string;
        company: string;
        duration: string;
        description: string;
    }[]; // Optional experience
    cvUrl?: string; // Optional CV URL
}