import { getAllSkillsAction } from "@/actions/skillAction";
import { SkillTable } from "@/components/table/SkillTable";
import { Button } from "@/components/ui/button";
import { Filter, SearchParams } from "@/types";
import { PlusIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skills Management",
  description: "Manage your portfolio skills and technologies",
};

export default async function SkillsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  let filters: Filter[] = [];
  const currSearchParams = await searchParams;
  // Convert searchParams to array of objects with name-value pairs
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

  const { data: skills, meta } = await getAllSkillsAction(filters);
  console.log(skills, meta);

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="text-muted-foreground mt-1">
            Manage your technical skills and expertise
          </p>
        </div>

        <Button asChild>
          <Link href="/skills/create" className="flex items-center gap-2">
            <PlusIcon className="h-4 w-4" />
            Add Skill
          </Link>
        </Button>
      </div>

      <SkillTable
        skills={skills}
        pageCount={meta?.totalPage || 0}
        currentPage={meta?.page}
      />
    </div>
  );
}
