import { Schema, model, Model, Document } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const userSchema = new Schema(
  {
    age: {
      type: Number,
      default: 0,
      validate(age: number) {
        if (age < 0) {
          throw new Error('Age cant be minor to zero');
        }
      },
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(password: string) {
        if (password.toLowerCase().includes('password')) {
          throw new Error(`Password can't be 'password'`);
        }
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(email: string) {
        if (!validator.isEmail(email)) {
          throw new Error('Email is invalid');
        }
      },
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Define an interface for the user document
interface IUserDocument extends Document {
  email: string;
  password: string;
  generateAuthToken(): Promise<any>;
}

// Define an interface for the user model with custom static methods
interface IUserModel extends Model<IUserDocument> {
  findByCredentials(
    email: string,
    password: string
  ): Promise<IUserDocument | null>;
}

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign(
    {
      _id: user._id.toString(),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: process.env.JWT_EXPIRATION_HOURS,
    }
  );

  user.tokens = user.tokens.concat({ token });
  await user.save();

  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.avatar;

  return userObject;
};

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Unable to login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Unable to login');
  }

  return user;
};

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

export const User = model<IUserDocument, IUserModel>('User', userSchema);
