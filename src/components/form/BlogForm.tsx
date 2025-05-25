"use client";

import { createBlogAction } from "@/actions/blogAction";

import { SingleImageUpload } from "@/components/form/SingleImageUpload";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { calculateReadTime } from "@/lib/utils";
import { blogValidation } from "@/shcema/blogValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Tag, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Editor from "./Editor";

export default function WriteBlogForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<z.infer<typeof blogValidation>>({
    resolver: zodResolver(blogValidation),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      thumbnail: undefined,
      category: "",
      tags: [],
      author: "",
      readTime: 0,
      isFeatured: false,
      status: "draft",
    },
  });

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      form.setValue("tags", newTags);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    form.setValue("tags", newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const calculateEstimatedReadTime = (content: string) => {
    const readTime = calculateReadTime(content);
    form.setValue("readTime", readTime);
    return readTime;
  };

  const onEditorChange = (content: string) => {
    form.setValue("content", content);
    calculateEstimatedReadTime(content);
  };

  const onSubmit = async (data: z.infer<typeof blogValidation>) => {
    setIsLoading(true);
    try {
      console.log(data);
      // If readTime wasn't calculated yet, do it now
      if (!data.readTime && data.content) {
        data.readTime = calculateEstimatedReadTime(data.content);
      }
      // Append the rest of the data as JSON
      const { thumbnail, ...rest } = data;
      const formData = new FormData();

      // Handle thumbnail as File object
      if (data.thumbnail instanceof File) {
        formData.append("thumbnail", thumbnail);
      }

      formData.append("data", JSON.stringify(rest));

      const result = await createBlogAction(formData);
      console.log(result);
      if (result?.success) {
        setError(null);
        toast.success("Blog post created successfully!");
        form.reset();
        setTags([]);
        // // Optionally redirect to the blog post or clear form
        // if (data.status === "published") {
        //   // Could redirect to view the published blog
        //   // router.push(`/blogs/${result.data.id}`);
        // } else {
        //   form.reset();
        //   setTags([]);
        // }
      } else {
        setError(result?.message || "Failed to create blog post");
        toast.error(
          result?.message || "An error occurred while creating the blog post."
        );
      }
    } catch (err) {
      const error = err as Error;
      setError(
        error.message || "An error occurred while creating the blog post."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="md:col-span-2 space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter an engaging title"
                        {...field}
                        className="text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Summary */}
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write a brief summary of your blog post"
                        {...field}
                        className="min-h-[100px] resize-none"
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear in blog previews and search results.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Rich Text Editor */}
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Editor
                        value={field.value}
                        onChange={onEditorChange}
                        placeholder="Write your blog content here..."
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Card className="md:col-span-1">
              <CardContent className="pt-6 space-y-6">
                {/* Thumbnail */}
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blog Thumbnail</FormLabel>
                      <FormControl>
                        <SingleImageUpload
                          name={field.name}
                          control={form.control}
                          label="Upload Thumbnail"
                        />
                      </FormControl>
                      <FormDescription>
                        Recommended size: 1200 x 630 pixels
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="programming">
                            Programming
                          </SelectItem>
                          <SelectItem value="design">Design</SelectItem>
                          <SelectItem value="business">Business</SelectItem>
                          <SelectItem value="marketing">Marketing</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Tags */}
                <FormField
                  control={form.control}
                  name="tags"
                  render={() => (
                    <FormItem>
                      <FormLabel>Tags</FormLabel>
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {tags.map((tag) => (
                            <Badge
                              key={tag}
                              className="flex items-center gap-1"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-muted-foreground hover:text-foreground"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">
                                  Remove {tag} tag
                                </span>
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Add a tag"
                            className="flex-1"
                          />
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={addTag}
                          >
                            <Tag className="h-4 w-4 mr-2" /> Add
                          </Button>
                        </div>
                      </div>
                      <FormDescription>
                        Press Enter to add a tag
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Author - optional */}
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Author name (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Read Time - display only */}
                <FormField
                  control={form.control}
                  name="readTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Read Time</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={`${field.value || 0} min`}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Automatically calculated from your content
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Featured Toggle */}
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel>Featured Post</FormLabel>
                        <FormDescription>
                          Show this post in featured sections
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

                {/* Status - Draft or Published */}
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="draft">Save as Draft</SelectItem>
                          <SelectItem value="published">Publish Now</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Draft posts are only visible to you
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader className="animate-spin h-4 w-4" />
                      Saving...
                    </span>
                  ) : form.getValues("status") === "published" ? (
                    "Publish Post"
                  ) : (
                    "Save Draft"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>
    </div>
  );
}
