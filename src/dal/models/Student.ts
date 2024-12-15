import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the document
export interface Student extends Document {
    userId: mongoose.Types.ObjectId;
    bio: string;
    skills: string[];
    portfolioLinks: string[];
    education: {
        degree: string;
        institution: string;
        yearOfGraduation: number;
    }[];
    experience: {
        title: string;
        company: string;
        duration: string;
        description: string;
    }[];
}

// Schema definition
const StudentSchema = new Schema<Student>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        bio: { type: String },
        skills: { type: [String], default: [] },
        portfolioLinks: { type: [String], default: [] },
        education: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                yearOfGraduation: { type: Number, required: true },
            },
        ],
        experience: [
            {
                title: { type: String, required: true },
                company: { type: String, required: true },
                duration: { type: String, required: true },
                description: { type: String },
            },
        ],
    },
    { timestamps: true }
);

// Model definition
export const Student: Model<Student> =
    mongoose.models.Student || mongoose.model<Student>('Student', StudentSchema);
