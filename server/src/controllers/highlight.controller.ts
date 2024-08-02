import { NextFunction } from "express";
import { Highlight } from "../interface/highlight.interface";
import { CatchAsync } from "../utils/CatchAsync";

export const createHighlight = CatchAsync(
  async (req: Highlight, res: Response, next: NextFunction) => {
    const { title, description, blogId } = req.body;
  }
);
