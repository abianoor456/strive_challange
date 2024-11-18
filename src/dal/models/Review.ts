import mongoose, { Schema, Document } from 'mongoose';

interface ReviewDocument extends Document {
    repoUrl: string;
    fileSha: string;
    score: number;
    reasoning: {
        readability: { score: number; reasoning: string };
        functionality: { score: number; reasoning: string };
        errorHandling: { score: number; reasoning: string };
        bestPractices: { score: number; reasoning: string };
    };
}

const ReviewSchema = new Schema<ReviewDocument>({
    repoUrl: { type: String, required: true },
    fileSha: { type: String, required: true, unique: true },
    score: { type: Number, required: true },
    reasoning: {
        readability: { score: Number, reasoning: String },
        functionality: { score: Number, reasoning: String },
        errorHandling: { score: Number, reasoning: String },
        bestPractices: { score: Number, reasoning: String },
    },
}, { timestamps: true });

export const Review = mongoose.model<ReviewDocument>('Review', ReviewSchema);
