import DashboardInsightSkeleton from "@/components/loader/DashboardInsightSkeleton";
import DashboardInsight from "@/components/module/dashboard/DashboardInsight";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FolderGit2, Lightbulb, Notebook } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function DashboardHomePage() {
  return (
    <div className="container py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to your Portfolio Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Here&apos;s an overview of your portfolio content and statistics
        </p>
      </div>
      <Suspense fallback={<DashboardInsightSkeleton />}>
        <DashboardInsight />
      </Suspense>
      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
                <FolderGit2 className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">
                  <Link
                    href="/projects/create"
                    className="text-inherit no-underline"
                  >
                    Add Project
                  </Link>
                </CardTitle>
                <CardDescription>
                  Create a new portfolio project
                </CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
                <Lightbulb className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">
                  <Link
                    href="/skills/create"
                    className="text-inherit no-underline"
                  >
                    Add Skill
                  </Link>
                </CardTitle>
                <CardDescription>Add a new technical skill</CardDescription>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:bg-accent/50 cursor-pointer transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full bg-orange-100 dark:bg-orange-900/30 p-3">
                <Notebook className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">
                  <Link
                    href="/blogs/write"
                    className="text-inherit no-underline"
                  >
                    Write Blog
                  </Link>
                </CardTitle>
                <CardDescription>Create a new blog post</CardDescription>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
