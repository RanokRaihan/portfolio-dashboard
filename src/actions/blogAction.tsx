"use server";

import { Filter } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function createBlogAction(formData: FormData) {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      console.error("Error creating blog:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error creating blog:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    return data;
  } catch (error) {
    console.error("Error creating blog post:", error);

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Invalid form data",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to create blog post",
    };
  }
}

// get all blogs

export const getAllBlogAction = async (filters?: Filter[]) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/blog`;
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
      console.error("Error fetching blog:", error);
      throw new Error(error.message);
    }

    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error fetching blog:", data.error);
      throw new Error(data?.error || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};

export const deleteBlogAction = async (id: string) => {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      console.error("No access token found in cookies");
      throw new Error("No access token found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      console.error("Error deleting blog:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error deleting blog:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    revalidatePath("/blogs");
    return data;
  } catch (error) {
    console.error("Error deleting blog post:", error);
    throw error;
  }
};
