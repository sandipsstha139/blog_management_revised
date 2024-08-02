/*
  Warnings:

  - Added the required column `blogId` to the `Highlight` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `highlightsections` DROP FOREIGN KEY `HighlightSections_highlightId_fkey`;

-- DropForeignKey
ALTER TABLE `sections` DROP FOREIGN KEY `Sections_blogId_fkey`;

-- AlterTable
ALTER TABLE `highlight` ADD COLUMN `blogId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Sections` ADD CONSTRAINT `Sections_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Highlight` ADD CONSTRAINT `Highlight_blogId_fkey` FOREIGN KEY (`blogId`) REFERENCES `Blog`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HighlightSections` ADD CONSTRAINT `HighlightSections_highlightId_fkey` FOREIGN KEY (`highlightId`) REFERENCES `Highlight`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
