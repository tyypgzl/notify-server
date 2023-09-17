import mongoose, { Model } from 'mongoose';

const { Schema } = mongoose;

interface ITodo extends mongoose.Document {
  title: string;
  description?: string;
  colorNumber: number;
  activity: number;
  createdTime: Date;
}

interface ITodoMethods {
  isValid(): boolean;
}

type TodoModel = Model<ITodo, object, ITodoMethods>;

const todoScheme = new Schema<ITodo, TodoModel, ITodoMethods>(
  {
    id: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    colorNumber: {
      type: Number,
      required: true,
    },
    activity: {
      type: Number,
      required: true,
    },
    createdTime: {
      type: Date,
      required: true,
    },
  },
  { collection: 'Todo', minimize: true },
);

const Todo = mongoose.model<ITodo, TodoModel>('Todo', todoScheme);

export { Todo };