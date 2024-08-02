import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import userRoute from "./routes/user.route";
import templateRoute from "./routes/template.route";
import categoryRoute from "./routes/category.route";
import subCategoryRoute from "./routes/subCategory.route";
import blogRoute from "./routes/blog.route";
import sectionsRoute from "./routes/sections.route";
import highlightRoute from "./routes/highlight.route";
import highlightSectionsRoute from "./routes/highlightSections.route";
import contactRoute from "./routes/contact.route";

import { globalErrorHandler } from "./middlewares/errorHandler";
import { NotFoundError } from "./error/NotFoundError";

const app = express();

const __variableOfChoice = path.resolve();

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
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
app.use("/api/v1/highlight", highlightRoute);
app.use("/api/v1/highlight-sections", highlightSectionsRoute);
app.use("/api/v1/contact", contactRoute);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

export default app;
