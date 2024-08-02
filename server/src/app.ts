import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import AppError from "./errors/AppError";
import cookieParser from "cookie-parser";
import path from "path";

import userRoute from "./routes/user.route";
import templateRoute from "./routes/template.route";
import categoryRoute from "./routes/category.route";
import subCategoryRoute from "./routes/subCategory.route";
import blogRoute from "./routes/blog.route";
import sectionsRoute from "./routes/sections.route";

const app = express();

const __variableOfChoice = path.resolve();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  "/public",
  express.static(path.join(__variableOfChoice, "/public/uploads"))
);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/template", templateRoute);
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/sub-category", subCategoryRoute);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/sections", sectionsRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const message: string = err.message || "Something went wrong";
  const statusCode: number = err.statusCode || 500;

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
});

export default app;
