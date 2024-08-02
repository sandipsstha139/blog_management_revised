"use client";

import { blogs } from "./data";
import Filter from "@/components/Blog/Filter";
import BlogList from "@/components/Blog/BlogList";
import { useState } from "react";

const page = () => {
  const [filteredBlogs, setFilteredBlogs] = useState();

  const handleFilterChange = (template, category, subcategory) => {
    let filtered = blogs;
    if (template) {
      filtered = filtered.filter((blog) => blog.template === template);
      setFilteredBlogs(filtered);
    }
    if (category) {
      filtered = filtered.filter((blog) => blog.category === category);
      setFilteredBlogs(filtered);
    }
    if (subcategory) {
      filtered = filtered.filter((blog) => blog.subcategory === subcategory);
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="max-w-full p-4">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <Filter onFilterChange={handleFilterChange} />
      <BlogList blogs={filteredBlogs} />
    </div>
  );
};

export default page;
