import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik } from "formik";

const StepOne = ({ prevStep, nextStep, currentStep }) => {
  const initialValues = {
    titleTag: "",
    metaTag: "",
    blogName: "",
    blogDescription: "",
    slug: "",
    blogTitle: "",
    titleDescription: "",
    blogImage: "",
    canonicalTag: "",
    blogImageAltText: "",
    blogImageDescription: "",
    blogImageCaption: "",
  };

  const renderField = (id, name, type = "text", placeholder) => (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={id} className="text-primary">
        {placeholder}
      </Label>
      <Field
        as={Input}
        id={id}
        name={name}
        placeholder={`Enter ${placeholder}`}
      />
    </div>
  );

  return (
    <Formik
      initialValues={initialValues}
      // Add validation and onSubmit handler here
      onSubmit={(values) => {
        // Handle form submission
        console.log(values);
        nextStep();
      }}
    >
      {(formik) => (
        <Form>
          <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4 overflow-y-auto scrollbar-custom max-h-[400px]">
            {renderField("blogName", "blogName", "text", "Blog Name")}
            {renderField(
              "blogDescription",
              "blogDescription",
              "text",
              "Blog Description"
            )}
            {renderField("titleTag", "titleTag", "text", "Title Tag")}
            {renderField("metaTag", "metaTag", "text", "Meta Tag")}
            {renderField("blogTitle", "blogTitle", "text", "Blog Menu Title")}
            {renderField(
              "titleDescription",
              "titleDescription",
              "text",
              "Blog Menu Description"
            )}
            {renderField("slug", "slug", "text", "Slug")}
            {renderField(
              "canonicalTag",
              "canonicalTag",
              "text",
              "Canonical Tag"
            )}
            {renderField(
              "blogImageAltText",
              "blogImageAltText",
              "text",
              "Blog Image Alt Text"
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="blogImage" className="text-primary">
                Blog Image
              </Label>
              <Field as={Input} id="blogImage" name="blogImage" type="file" />
            </div>
            {renderField(
              "blogImageDescription",
              "blogImageDescription",
              "text",
              "Blog Image Description"
            )}
            {renderField(
              "blogImageCaption",
              "blogImageCaption",
              "text",
              "Blog Image Caption"
            )}
          </div>
          <div className="flex justify-between mt-4">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
            >
              Previous
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
