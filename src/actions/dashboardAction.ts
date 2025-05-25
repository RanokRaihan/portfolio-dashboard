import { cookies } from "next/headers";

export const getAllinsightAction = async () => {
  try {
    const accessToken = (await cookies()).get("accessToken")?.value;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/dashboard/insight`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Error fetching insight:", error);
      throw new Error(error.message);
    }

    const data = await res.json();
    if (data.error || data.success === false) {
      console.error("Error fetching insight:", data.error);
      throw new Error(data?.error || "Unknown error");
    }

    return data;
  } catch (error) {
    console.error("Error fetching insight:", error);
    throw error;
  }
};
