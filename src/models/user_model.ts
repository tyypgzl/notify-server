import mongoose, { CallbackWithoutResultAndOptionalError, Model } from 'mongoose';
import { HashUtils } from '../utils';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  email: string;
  password: string;
}

interface IUserMethods {
  isValidPassword(password: string): boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    email: {
      type: String,
      required: true,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      maxlength: 128,
    },
  },
  { timestamps: true, collection: 'User', minimize: true },
);

userSchema.method('isValidPassword', async function isValidPassword(password: string) {
  return await HashUtils.compare(password, this.password);
});

userSchema.pre('save', async function (next: CallbackWithoutResultAndOptionalError) {
  try {
    const hashedPassword = await HashUtils.hash(String(this.password));
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export { User };
