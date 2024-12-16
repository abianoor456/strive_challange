import mongoose, { Schema, Document, Model } from 'mongoose';
import { ApplicationState, CompensationType, ApplicationStatus } from '@utils/enum';

// Interface for the document
export interface ApplicationDocument extends Document {
    startupId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    skillsRequired: string[];
    duration: string;
    compensation: CompensationType;
    status: ApplicationState;
    applicants: {
        studentId: mongoose.Types.ObjectId;
        applicationStatus: ApplicationStatus;
        message?: string;
    }[];
}

// Schema definition
const ApplicationSchema = new Schema<ApplicationDocument>(
    {
        startupId: { type: Schema.Types.ObjectId, ref: 'Startup', required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        skillsRequired: { type: [String], default: [] },
        duration: { type: String, required: true },
        compensation: {
            type: String,
            enum: Object.values(CompensationType),
            default: CompensationType.UNPAID,
        },
        status: {
            type: String,
            enum: Object.values(ApplicationState),
            default: ApplicationState.OPEN,
        },
        applicants: [
            {
                studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
                applicationStatus: {
                    type: String,
                    enum: Object.values(ApplicationStatus),
                    default: ApplicationStatus.APPLIED,
                },
                message: { type: String },
            },
        ],
    },
    { timestamps: true }
);

// Model definition
export const Application: Model<ApplicationDocument> =
    mongoose.models.Application || mongoose.model<ApplicationDocument>('Application', ApplicationSchema);
