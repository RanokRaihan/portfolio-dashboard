import WriteBlogForm from "@/components/form/BlogForm";

export default function BlogWritePage() {
  return (
    <div>
      <header className="mb-2">
        <h1 className="text-3xl font-bold">Write a Blog Post</h1>
        <p className="text-muted-foreground mt-2">
          Create and publish your blog post to share with the world.
        </p>
      </header>
      <WriteBlogForm />
    </div>
  );
}
