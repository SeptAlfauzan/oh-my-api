import { User } from "firebase/auth";
export default abstract class AuthRepository {
  abstract signup(
    username: string,
    email: string,
    password: string
  ): Promise<User>;
  abstract signin(email: string, password: string): Promise<User>;
  abstract oAuthFindOrCreateNewUser(firebaseUser: User): Promise<User>;
  abstract resetPassword(email: string): Promise<void>;
}
