"use server";

import { Filter } from "@/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createSkillAction(formData: FormData) {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      console.error("Error creating skill:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error creating skill:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    return data;
  } catch (error) {
    console.error("Error creating skill:", error);
    throw error;
  }
}

export async function getAllSkillsAction(filters?: Filter[]) {
  try {
    const queryParams = new URLSearchParams();
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.name && filter.value) {
          queryParams.append(filter.name, filter.value);
        }
      });
    }
    const url = `${
      process.env.NEXT_PUBLIC_API_URL
    }/skill/paginate?${queryParams.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error fetching skills:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    return data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    throw error;
  }
}

export async function deleteSkillAction(id: string) {
  try {
    const token = (await cookies()).get("accessToken")?.value;
    if (!token) {
      throw new Error("No access token found");
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skill/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      console.error("Error deleting skill:", error);
      throw new Error(error.message);
    }
    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error deleting skill:", data.error);
      throw new Error(data?.error || "Unknown error");
    }
    console.log("Skill deleted successfully:", data);
    // Revalidate the skills page to reflect the changes
    revalidatePath("/skills");
    return data;
  } catch (error) {
    console.error("Error deleting skill:", error);
    return {
      success: false,
      error: "Failed to delete skill",
    };
  }
}
