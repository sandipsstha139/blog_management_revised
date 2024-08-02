import React from "react";

const BlogList = ({ blogs }) => {
  return (
    <div className="flex w-full flex-wrap ">
      {blogs?.length ? (
        blogs.map((blog, index) => (
          <div
            key={index}
            className="p-4 border border-gray-300 rounded mb-4 md:mr-4 w-full md:w-auto"
          >
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>Template: {blog.template}</p>
            <p>Category: {blog.category}</p>
            <p>Subcategory: {blog.subcategory}</p>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center  w-full h-64 ">
          <p>No blogs found</p>
        </div>
      )}
    </div>
  );
};

export default BlogList;
