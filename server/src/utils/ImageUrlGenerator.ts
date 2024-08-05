import { Request } from "express";

export const ImageUrlGenerator = (req: Request, url: string): string => {
  return `${req.protocol}://${req.get("host")}/public/${url}`;
};
