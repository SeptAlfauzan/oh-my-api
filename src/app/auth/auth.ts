import { cookies } from "next/headers";

export async function signoutDeleteCookies() {
  "use server";
  cookies().set("jwt-token", "", { expires: 0 });
}
