// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// const env = process.env;
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";

export default class FirebaseHelper {
  private config = {
    apiKey: process.env["NEXT_PUBLIC_FIREBASE_APIKEY"] ?? "",
    authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAI"] ?? "",
    projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECTID"] ?? "",
    storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"] ?? "",
    messagingSenderId:
      process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"] ?? "",
    appId: process.env["NEXT_FIREBASE_APP_ID"] ?? "",
    measurementId: process.env["NEXT_FIREBASE_MEASUREMENT_ID"] ?? "",
  };
  private static instance: FirebaseHelper;
  private app: FirebaseApp;

  private constructor() {
    const app = initializeApp(this.config);
    this.app = app;
  }

  public static getInstance(): FirebaseHelper {
    if (!FirebaseHelper.instance)
      FirebaseHelper.instance = new FirebaseHelper();
    return FirebaseHelper.instance;
  }

  public getApp(): FirebaseApp {
    return this.app;
  }

  public async googleOAuth(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      const auth = getAuth();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async loginEmailPassword(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const auth = getAuth();
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      return user;
    } catch (error) {
      throw error;
    }
  }

  public async registerEmailPassword(
    email: string,
    password: string
  ): Promise<User> {
    try {
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      return user;
    } catch (error) {
      throw error;
    }
  }
}
