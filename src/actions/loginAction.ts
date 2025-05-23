"use server";

import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const loginUser = async (loginData: {
  email: string;
  password: string;
}) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const result = await res.json();
    if (result?.success && result?.data?.accessToken) {
      (await cookies()).set("accessToken", result.data.accessToken);
    }
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    (await cookies()).delete("accessToken");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

export const getCurrentUser = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;

    if (!accessToken) {
      return null;
    }
    const decoded = jwtDecode(accessToken);
    return decoded as IUser;
  } catch (error) {
    console.error("Get current user error:", error);
    return null;
  }
};
