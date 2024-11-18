// import mongoose, { Schema, Document } from 'mongoose';

// // export interface ICodeReview extends Document {
//     repoUrl: string;
//     fileSha: string;
//     score: number;
//     reasoning: object;
//     createdAt: Date;
// }

// const CodeReviewSchema = new Schema({
//     repoUrl: { type: String, required: true },
//     fileSha: { type: String, required: true },
//     score: { type: Number, required: true },
//     reasoning: { type: Object, required: true },
//     createdAt: { type: Date, default: Date.now },
// });

// export const CodeReview = mongoose.model<ICodeReview>('CodeReview', CodeReviewSchema);
