import { Highlight } from "./highlight.interface";
import { HighlightSections } from "./highlightSections.interface";
import { Sections } from "./sections.interface";

export interface Blog {
  id: number;
  title: string;
  description: string;
  blogImage: string;
  blogImageAltText: string;
  blogImageDescription: string;
  blogImageCaption: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  Sections: Sections[];
  Highlight: Highlight[];
}
