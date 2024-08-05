import React from "react";
import { useGetAllBlogsQuery } from "../../../provider/redux/query/blogService";
import Image from "next/image";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const BlogList = () => {
  const { data, isLoading } = useGetAllBlogsQuery();
  const blogs = data?.data?.blogs;
  const handleBlogDelete = (id) => {
    console.log("Delete Blog", id);
  };
  const handleUpdateBlog = (id) => {
    console.log("Update Blog", id);
  };
  return (
    <div className="flex w-full flex-wrap ">
      {isLoading ? (
        <div>Loading ...</div>
      ) : blogs?.length ? (
        blogs.map((blog, index) => (
          <Card key={index} className="w-[350px]">
            <CardHeader>
              <CardTitle>{blog.blogName}</CardTitle>
              {/* <CardDescription>{blog.titleDescription}</CardDescription> */}
            </CardHeader>
            <CardContent>
              <Image
                src={blog.blogImage}
                alt={blog.title}
                width={200}
                height={200}
              />
              <p> {blog.blogTitle}</p>
              <p> {blog.titleDescription}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => handleUpdateBlog(blog.id)}
              >
                Update
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleBlogDelete(blog.id)}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
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

// {
//   blogs?.length ? (
//     blogs.map((blog, index) => (
//       <div
//         key={index}
//         className="p-4 border border-gray-300 rounded mb-4 md:mr-4 w-full md:w-auto"
//       >
//         <h2 className="text-xl font-bold">{blog.title}</h2>
//         <p>Template: {blog.template}</p>
//         <p>Category: {blog.category}</p>
//         <p>Subcategory: {blog.subcategory}</p>
//       </div>
//     ))
//   ) : (
//     <div className="flex justify-center items-center  w-full h-64 ">
//       <p>No blogs found</p>
//     </div>
//   );
// }
