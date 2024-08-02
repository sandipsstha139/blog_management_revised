"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from "../../../provider/redux/query/authService";
import { useEffect } from "react";
import { useSnackbar } from "notistack";

export function AuthLogin() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [
    loginUser,
    {
      isSuccess: isSuccessLoginUser,
      isError: isErrorLoginUser,
      error: errorLoginUser,
    },
  ] = useLoginUserMutation();
  const initialValues = {
    email: "",
    password: "",
  };
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await loginUser(values).unwrap();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error Login:", error);
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (isSuccessLoginUser) {
      enqueueSnackbar("Login Successfully", { variant: "success" });
    }
    if (isErrorLoginUser) {
      enqueueSnackbar(`${errorLoginUser.data.message}`, { variant: "error" });
    }
  }, [isSuccessLoginUser, isErrorLoginUser, errorLoginUser]);
  return (
    <div className="w-screen flex justify-center items-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-primary">Login </CardTitle>
          <CardDescription className="text-reading">
            Add Blogs to Hajir App Effortlessly
          </CardDescription>
        </CardHeader>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <Form>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email" className="text-primary">
                      Email
                    </Label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      placeholder="Enter Your Email"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="password" className="text-primary">
                      Password
                    </Label>
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Enter Your Password"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="submit"
                  className="bg-bgColorDark"
                  disabled={formik.isSubmitting}
                >
                  Login
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
}
