import { Schema } from "mongoose";

const TaskSchema: Schema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    statusTask: { type: Number, required: true }
});

export { TaskSchema };