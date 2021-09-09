import { Schema, model } from 'mongoose';

interface TodoTask {
    title: string;
    description: string;
    finished: boolean;
}

const TodoTaskSchema = new Schema<TodoTask>({
    title: { type: String, required: true },
    description: { type: String, required: false },
    finished: { type: Boolean }
});

export default model<TodoTask>('TodoTasks', TodoTaskSchema);