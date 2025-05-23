"use client";
import { createProjectAction } from "@/actions/projectAction";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createProjectValidation } from "@/shcema/createProjectValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription } from "../ui/alert";
import { MultipleImageUpload } from "./MultipleImageUpload";

export default function CreateProjectForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createProjectValidation>>({
    resolver: zodResolver(createProjectValidation),
    defaultValues: {
      title: "",
      summary: "",
      description: "",
      challenges: "",
      technologies: "",
      backendRepo: "",
      frontendRepo: "",
      backendLive: "",
      frontendLive: "",
      thumbnail: [],
      images: [],
      isFeatured: false,
      keyFeatures: "",
      status: "planned",
    },
  });

  const onSubmit = async (data: z.infer<typeof createProjectValidation>) => {
    setIsLoading(true);
    try {
      // Handle form submission
      const refinedData = {
        ...data,
        technologies: data.technologies
          .split(",")
          .map((str: string) => str.trim())
          .filter((str: string) => str.length > 0),
        challenges: data.challenges
          .split(",")
          .map((str: string) => str.trim())
          .filter((str: string) => str.length > 0),
        keyFeatures: data.keyFeatures
          .split(",")
          .map((str: string) => str.trim())
          .filter((str: string) => str.length > 0),
        thumbnail: data.thumbnail[0],
      };
      console.log({ refinedData });
      const { thumbnail, images, ...rest } = refinedData;
      const formData = new FormData();
      formData.append("thumbnail", thumbnail);
      if (images) {
        images.forEach((image: File) => {
          formData.append("images", image);
        });
      }
      formData.append("data", JSON.stringify(rest));

      const result = await createProjectAction(formData);

      if (result?.success) {
        setError(null);
        form.reset();
        toast.success("Project created successfully!");
      }
    } catch (err) {
      const error = err as Error;
      setError(
        error.message || "An error occurred while creating the project."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Project Title"
                      {...field}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="technologies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Technologies</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="React, Next.js, Tailwind"
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>Separate with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40"
                      placeholder="Short summary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40"
                      placeholder="Detailed description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40"
                      placeholder="Challenge1, Challenge2"
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>Separate with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="keyFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Features</FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-40"
                      placeholder="Feature1, Feature2"
                      value={
                        Array.isArray(field.value)
                          ? field.value.join(", ")
                          : field.value
                      }
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>Separate with commas.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="backendRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend Repo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frontendRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend Repo URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://github.com/..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="backendLive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Backend Live URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="frontendLive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frontend Live URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Thumbnail URL */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleImageUpload
                      name={field.name}
                      control={form.control}
                      label="Upload Thumbnail"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Multiple image upload */}
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MultipleImageUpload
                      name={field.name}
                      control={form.control}
                      label="Upload project Images"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Switch for isFeatured */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 items-baseline">
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Featured Project</FormLabel>
                    <FormDescription>
                      Mark this project as featured.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* Key Features */}

            {/* Status select */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit button */}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" /> Creating project...
              </span>
            ) : (
              "Create Project"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
