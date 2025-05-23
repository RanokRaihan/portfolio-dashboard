import { getAllProjectsAction } from "@/actions/projectAction";
import { ProjectTable } from "@/components/table/ProjectTable";
import { Filter } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage your portfolio projects",
};

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
  };
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  let filters: Filter[] = [];

  // Convert searchParams to array of objects with name-value pairs
  const searchParamsArray = Object.entries(await searchParams).map(
    ([name, value]) => ({
      name,
      value: String(value),
    })
  );

  // You can use filters for additional query parameters if needed
  if (searchParamsArray.length > 0) {
    filters = searchParamsArray;
  }

  // Fetch projects with pagination
  const { data, meta } = await getAllProjectsAction(filters);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <a
          href="/projects/new"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add Project
        </a>
      </div>

      <ProjectTable
        projects={data}
        pageCount={meta?.totalPage || 0}
        currentPage={meta?.page || 1}
      />
    </div>
  );
}
