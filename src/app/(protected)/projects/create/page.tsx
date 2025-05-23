import CreateProjectForm from "@/components/form/CreateProjectForm";

export default function CreateProjectPage() {
  return (
    <div className="pb-4">
      <header className="py-4 space-y-2">
        <h1 className="text-2xl font-bold text-primary">Add a new project</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to create a new project.
        </p>
      </header>
      <CreateProjectForm />
    </div>
  );
}
