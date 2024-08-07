"use client";

import BlogList from "@/components/Blog/BlogList";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Blog = () => {
  const router = useRouter();
  const handleAddBlogs = () => {
    router.push("/dashboard/blog/add-blogs");
  };
  return (
    <div className="max-w-full p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
        <Button onClick={handleAddBlogs}>Add Blogs</Button>
      </div>
      <BlogList />
    </div>
  );
};

export default Blog;
