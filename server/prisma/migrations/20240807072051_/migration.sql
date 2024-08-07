/*
  Warnings:

  - Added the required column `templateId` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `subcategory` ADD COLUMN `templateId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `SubCategory` ADD CONSTRAINT `SubCategory_templateId_fkey` FOREIGN KEY (`templateId`) REFERENCES `Template`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
