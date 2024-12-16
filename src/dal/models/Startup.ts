import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for the document
export interface Startup extends Document {
    userId: mongoose.Types.ObjectId; // Reference to the user who owns the startup
    companyName: string;
    description: string;
    industry: string;
    website?: string;
    teamSize: number;
    projects: {
        title: string;
        description: string;
        skillsRequired: string[];
    }[];
}

// Schema definition
const StartupSchema = new Schema<Startup>(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        companyName: { type: String, required: true },
        description: { type: String, required: true },
        industry: { type: String, required: true },
        website: { type: String },
        teamSize: { type: Number, required: true },
        projects: [
            {
                title: { type: String, required: true },
                description: { type: String, required: true },
                skillsRequired: { type: [String], default: [] },
            },
        ],
    },
    { timestamps: true }
);

// Model definition
export const Startup: Model<Startup> =
    mongoose.models.Startup || mongoose.model<Startup>('Startup', StartupSchema);
