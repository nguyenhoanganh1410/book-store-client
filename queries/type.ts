import { Timestamp } from "firebase/firestore";

export type UserData = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  markedChapters?: string[];
  isPurchasedCourse?: boolean;
  customerStripeId?: string;
};

export type ISignUpFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
};

export type ISignInFormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type IResetPasswordFormValues = {
  email: string;
};

export type IBirdEyeData = {
  id: string;
  title: string;
  imageUrl: string;
  subTitle: string;
};

export type IAddCommentData = {
  userId: string;
  userName: string;
  userAvatarUrl?: string | null;
  comment: string;
  chapterId: string;
};

export type IAddReplyData = {
  userId: string;
  userName: string;
  userAvatarUrl?: string | null;
  chapterId: string;
  commentId: string;
  reply: string;
};

export interface ICommentData extends IAddCommentData {
  id: string;
  createdAt: Timestamp;
}

export interface IReplyData extends IAddReplyData {
  id: string;
  createdAt: Timestamp;
}

export type IAddChapter = {
  indexChapter: number;
  title: string;
  // subTitle: string;
  description: string;
  thumbnail: string;
  video: string;
}

export interface Chapter extends IAddChapter {
  id: string;
};

export interface IFooterFormValues {
  fullName: string;
  email: string;
  adventure: string;
}
