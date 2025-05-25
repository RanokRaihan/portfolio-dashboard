import { getAllBlogAction } from "@/actions/blogAction";
import BlogTable from "@/components/table/BlogTable";
import { Filter, SearchParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Management",
  description: "Manage your blog posts",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let filters: Filter[] = [];
  const currSearchParams = await searchParams;
  const searchParamsArray = Object.entries(currSearchParams).map(
    ([name, value]) => ({
      name,
      value: String(value),
    })
  );

  // You can use filters for additional query parameters if needed
  if (searchParamsArray.length > 0) {
    filters = searchParamsArray;
  }

  const { data: blogs, meta } = await getAllBlogAction(filters);
  console.log(blogs, meta);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground mt-1">
            Manage your blog posts, edit, delete, and create new ones.
          </p>
        </div>
      </div>

      <BlogTable
        blogs={blogs}
        pageCount={meta?.totalPage || 0}
        currentPage={meta?.page || 1}
      />
    </div>
  );
}
