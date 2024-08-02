/*
  Warnings:

  - You are about to drop the column `HighlightImageAltText` on the `highlightsections` table. All the data in the column will be lost.
  - You are about to drop the column `HighlightImageCaption` on the `highlightsections` table. All the data in the column will be lost.
  - You are about to drop the column `HighlightImageDescription` on the `highlightsections` table. All the data in the column will be lost.
  - Added the required column `highlightSectionImageAltText` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlightSectionImageCaption` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `highlightSectionImageDescription` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `highlightsections` DROP COLUMN `HighlightImageAltText`,
    DROP COLUMN `HighlightImageCaption`,
    DROP COLUMN `HighlightImageDescription`,
    ADD COLUMN `highlightSectionImageAltText` VARCHAR(191) NOT NULL,
    ADD COLUMN `highlightSectionImageCaption` VARCHAR(191) NOT NULL,
    ADD COLUMN `highlightSectionImageDescription` VARCHAR(191) NOT NULL;
