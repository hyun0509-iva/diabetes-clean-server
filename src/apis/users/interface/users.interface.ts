interface IUser {
  email: string;
  nickname: string;
  password: string;
  imageSrc: string;
  aboutMe: string;
  token: string;
  followers: Array<IUser>;
  followings: Array<IUser>;
}

export default IUser;
