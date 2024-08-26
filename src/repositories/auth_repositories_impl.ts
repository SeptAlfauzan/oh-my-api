import { User } from "firebase/auth";
import FirebaseHelper from "@/helper/firebase_helper";
import { prisma } from "@/helper/prisma";
import AuthRepository from "@/domain/repositories/auth_repository";

export default class AuthRepositoryImpl implements AuthRepository {
  async oAuthFindOrCreateNewUser(firebaseUser: User): Promise<User> {
    try {
      const username = firebaseUser.displayName ?? firebaseUser.email ?? "-";
      const userData = {
        data: {
          id: firebaseUser.uid,
          username: username,
        },
      };
      const userInDb = await prisma.user.findFirst({
        where: userData.data,
      });
      if (userInDb == null) await prisma.user.create(userData);
      return firebaseUser;
    } catch (error) {
      throw error;
    }
  }
  async signup(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    let user: User | undefined;
    try {
      const firebaseApp = FirebaseHelper.getInstance();
      user = await firebaseApp.registerEmailPassword(email, password);
      const userData = {
        data: {
          id: user.uid,
          username: username,
        },
      };
      await prisma.user.create(userData);
      return user;
    } catch (error) {
      if (user != undefined) await user.delete();
      throw error;
    }
  }
  async signin(email: string, password: string): Promise<User> {
    try {
      const firebaseApp = FirebaseHelper.getInstance();
      const user = await firebaseApp.loginEmailPassword(email, password);
      const userRegisteredInDb = await prisma.user.findUnique({
        where: {
          id: user.uid,
        },
      });
      if (userRegisteredInDb == null)
        throw new Error("User not registered in oh-my-api database!");

      return user;
    } catch (error) {
      throw error;
    }
  }
}
