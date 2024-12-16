import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the document
export interface Student extends Document {
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

// Schema definition
const StudentSchema = new Schema<Student>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bio: { type: String },
        skills: { type: [String], default: [] },
        portfolioLinks: { type: [String], default: [] }, // Optional with default value
        education: [
            {
                degree: { type: String },
                institution: { type: String },
                yearOfGraduation: { type: Number },
            },
        ], // Optional by removing "required" keys
        experience: [
            {
                title: { type: String },
                company: { type: String },
                duration: { type: String },
                description: { type: String },
            },
        ], // Optional by removing "required" keys
        cvUrl: { type: String, default: null }, // Optional with default value
    },
    { timestamps: true }
);

// Model definition
export const Student: Model<Student> =
    mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
