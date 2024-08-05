import { HighlightSections } from "./highlightSections.interface";

export interface Highlight {
  id: number;
  title: string;
  description: string;
  blogId: number;
  createdAt: Date;
  updatedAt: Date;
  HighlightSections: HighlightSections[];
}
