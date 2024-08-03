"use client";

import BlogList from "@/components/Blog/BlogList";

const page = () => {
  return (
    <div className="max-w-full p-4">
      <div className="w-full flex justify-between">
        <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      </div>
      <BlogList />
    </div>
  );
};

export default page;
