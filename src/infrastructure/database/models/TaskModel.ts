import mongoose, { Schema, Document } from 'mongoose';

// Omitimos _id de Document para poder redefinirlo como string
export interface ITaskDocument extends Omit<Document, '_id'> {
    _id: string;
    title: string;
    description: string;
    statusTask: number;
}

const TaskSchema: Schema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    statusTask: { type: Number, default: 0 }
});

export const TaskModel = mongoose.model<ITaskDocument>('Task', TaskSchema);
