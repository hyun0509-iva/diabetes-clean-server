import mongoose, { Model, Schema, model } from "mongoose";
import IUser from "./interface/users.interface";

interface IUserModel extends Model<IUser> {}
const { ObjectId } = Schema.Types;

const userSchema = new Schema<IUser, IUserModel>(
  {
    email: {
      type: String,
      unique: true,
      maxlength: 50,
      require: true
    },
    nickname: {
      type: String,
      maxlength: 50
    },
    password: {
      type: String,
      minglength: 5,
      require: true
    },
    imageSrc: {
      type: String,
      default: ""
    },
    aboutMe: {
      //유저 소개
      type: String,
      max: 80
    },
    followers: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    followings: [
      {
        type: ObjectId,
        ref: "User"
      }
    ],
    token: {
      type: String
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const UsersModel =
  mongoose.models.UsersModel || model<IUser, IUserModel>("User", userSchema);
export default UsersModel;
