import IUser from "@/apis/users/interface/users.interface";

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}