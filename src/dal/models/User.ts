import mongoose, { Schema, Document, Model } from 'mongoose';
import { UserRole } from '@utils/enum';

// Interface for the document
export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    profilePicture?: string;
}

// Schema definition
const UserSchema = new Schema<UserDocument>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: Object.values(UserRole), required: true },
        profilePicture: { type: String },
    },
    { timestamps: true }
);

// Model definition
export const User: Model<UserDocument> =
    mongoose.models.User || mongoose.model<UserDocument>('User', UserSchema);
