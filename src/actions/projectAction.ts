"use server";

import { Filter } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const createProjectAction = async (formData: FormData) => {
  for (const [key, value] of formData) {
    console.log(key, value);
  }
  console.log(process.env.NEXT_PUBLIC_API_URL);
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      console.error("No access token found in cookies");
      throw new Error("No access token found");
    }
    console.log("Creating project with token:", token);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/project`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      console.error("Error creating project:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error creating project:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    return data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

export const getAllProjectsAction = async (filters?: Filter[]) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/project`;
    if (filters && filters.length > 0) {
      const searchParams = new URLSearchParams();
      filters.forEach((filter) => {
        searchParams.append(filter.name, filter.value);
      });
      url = `${url}?${searchParams.toString()}`;
    }

    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      console.error("Error fetching projects:", error);
      throw new Error(error.message);
    }

    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error fetching projects:", data.error);
      throw new Error(data?.error || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

export const deleteProjectAction = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      console.error("No access token found in cookies");
      throw new Error("No access token found");
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/project/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      }
    );
    if (!res.ok) {
      const error = await res.json();
      console.error("Error deleting project:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error deleting project:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    revalidatePath("/projects");
    return data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};
