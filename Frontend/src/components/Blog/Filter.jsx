"use client";
import {
  categories,
  subcategories,
  templates,
} from "@/app/dashboard/blog/data";
import React, { useState } from "react";
import { Button } from "../ui/button";

const Filter = ({ onFilterChange }) => {
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");

  const handleTemplateChange = (e) => {
    setSelectedTemplate(e.target.value);
    setSelectedCategory("");
    setSelectedSubcategory("");
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedSubcategory("");
  };

  const handleSubcategoryChange = (e) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubmit = () => {
    console.log(selectedTemplate, selectedCategory, selectedSubcategory);
    onFilterChange(selectedTemplate, selectedCategory, selectedSubcategory);
    setSelectedCategory("");
    setSelectedTemplate("");
    setSelectedSubcategory("");
  };

  return (
    <div className="flex flex-col space-y-4 py-4">
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
        <select
          value={selectedTemplate}
          onChange={handleTemplateChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
        >
          <option value="">Select Template</option>
          {templates.map((template, index) => (
            <option key={index} value={template}>
              {template}
            </option>
          ))}
        </select>

        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          disabled={!selectedTemplate}
        >
          <option value="">Select Category</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={selectedSubcategory}
          onChange={handleSubcategoryChange}
          className="p-2 border border-gray-300 rounded w-full md:w-1/3"
          disabled={!selectedCategory}
        >
          <option value="">Select Subcategory</option>
          {selectedCategory &&
            subcategories[selectedCategory].map((subcategory, index) => (
              <option key={index} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
        <Button
          onClick={handleSubmit}
          className="p-2 bg-black text-white rounded "
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Filter;
