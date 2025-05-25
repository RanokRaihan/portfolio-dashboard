import { getAllinsightAction } from "@/actions/dashboardAction";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderGit2, Lightbulb, Notebook } from "lucide-react";

const DashboardInsight = async () => {
  const { data } = await getAllinsightAction();
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Projects Card */}
      <Card className="overflow-hidden border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl font-bold">Projects</CardTitle>
          <FolderGit2 className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">{data.project.total}</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-muted-foreground">
                {data.project.completed} Completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <p className="text-xs text-muted-foreground">
                {data.project.inProgress} In Progress
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-400"></div>
              <p className="text-xs text-muted-foreground">
                {data.project.planned} Planned
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skills Card */}
      <Card className="overflow-hidden border-l-4 border-l-purple-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl font-bold">Skills</CardTitle>
          <Lightbulb className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">{data.skill.total}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
              <p className="text-xs text-muted-foreground">
                {data.skill.beginner} Beginner
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-400"></div>
              <p className="text-xs text-muted-foreground">
                {data.skill.intermediate} Intermediate
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <p className="text-xs text-muted-foreground">
                {data.skill.advanced} Advanced
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <p className="text-xs text-muted-foreground">
                {data.skill.expert} Expert
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Blog Card */}
      <Card className="overflow-hidden border-l-4 border-l-orange-500">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-xl font-bold">Blog Posts</CardTitle>
          <Notebook className="h-5 w-5 text-orange-500" />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold mb-4">{data.blog.total}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <p className="text-xs text-muted-foreground">
                {data.blog.published} Published
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gray-400"></div>
              <p className="text-xs text-muted-foreground">
                {data.blog.draft} Drafts
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardInsight;
