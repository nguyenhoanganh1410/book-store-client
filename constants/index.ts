import { IBirdEyeData } from "@/queries/type";

//LOCAL_STORAGE_KEYS
export const LOCAL_STORAGE_KEYS = {
  rememberMe: "REMEMBER_ME",
};

//ROUTER
export const ROUTERS = {
  login: "/",
  signup: "/signup",
  home: "/home",
  chapter: "/chapter",
  purchaseSuccess: '/purchase-success',
  cart: "/cart",
  order: "/order",
  checkout: '/checkout'
};

//FORMAT
export const FORMAT_DATE = {
  formatDate: "DD/MM/YYYY",
  formatFullDate: "MMM DD, YYYY h:mm A",
};

//ERROR_MESSAGES
export const ERROR_CODE_FIREBASE = {
  "auth/user-not-found": "Not found user",
  "auth/wrong-password": "Invalid password",
  "auth/invalid-login-credentials": "Email or Password is incorrect",
  "auth/email-already-in-use": "Email already in use. Please use another email",
};

export const DEFAULT_LIMIT_COMMENTS = 20;

export const MEDIA_SOCIAL_URL = {
  facebook: 'https://www.facebook.com/makeupbyheatherb/',
  instagram: 'https://www.instagram.com/makeupbyheatherb/',
  linkedIn: 'https://www.linkedin.com/in/makeupbyheatherb',
}

export const STRIPE_LINKS = {
  buyCourse: process.env.NEXT_PUBLIC_FIREBASE_ADMIN_MODE === 'development' ? 'https://buy.stripe.com/test_4gw3dNgu0ebSaA0dQS' : 'https://buy.stripe.com/28o4gB2Q59Aiabu8wy'
}

export const MESSAGE_UNKNOWN_ERROR = 'An unknown error has occurred please refresh the page and try again.';

export const orderStatus = {
  newOrder: 'new-order',
  shipping: 'shipping',
  completed: 'completed',
  pending: 'pending'
};