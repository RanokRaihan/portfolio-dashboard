import CreateSkillForm from "@/components/form/CreateSkillForm";

export default function CreateSkillPage() {
  return (
    <div className="pb-4">
      <header className="py-4 space-y-2">
        <h1 className="text-2xl font-bold text-primary">Add a new skill</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to add a new skill to your portfolio.
        </p>
      </header>
      <CreateSkillForm />
    </div>
  );
}
