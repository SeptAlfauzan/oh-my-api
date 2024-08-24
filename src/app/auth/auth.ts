import { JWT_TOKEN_KEY } from "@/constanta";
import { cookies } from "next/headers";

export async function signoutDeleteCookies() {
  "use server";
  cookies().set(JWT_TOKEN_KEY, "", { expires: 0 });
}
