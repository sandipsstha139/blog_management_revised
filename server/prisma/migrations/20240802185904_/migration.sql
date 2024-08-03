/*
  Warnings:

  - You are about to drop the `privacypolicy` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `termsandcondition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `blogImageAltText` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogImageCaption` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blogImageDescription` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canonicalTag` to the `Blog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HighlightImageAltText` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HighlightImageCaption` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `HighlightImageDescription` to the `HighlightSections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionImageAltText` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionImageCaption` to the `Sections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sectionImageDescription` to the `Sections` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blog` ADD COLUMN `blogImageAltText` VARCHAR(191) NOT NULL,
    ADD COLUMN `blogImageCaption` VARCHAR(191) NOT NULL,
    ADD COLUMN `blogImageDescription` VARCHAR(191) NOT NULL,
    ADD COLUMN `canonicalTag` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `highlightsections` ADD COLUMN `HighlightImageAltText` VARCHAR(191) NOT NULL,
    ADD COLUMN `HighlightImageCaption` VARCHAR(191) NOT NULL,
    ADD COLUMN `HighlightImageDescription` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sections` ADD COLUMN `sectionImageAltText` VARCHAR(191) NOT NULL,
    ADD COLUMN `sectionImageCaption` VARCHAR(191) NOT NULL,
    ADD COLUMN `sectionImageDescription` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `privacypolicy`;

-- DropTable
DROP TABLE `termsandcondition`;
