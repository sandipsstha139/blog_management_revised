-- AlterTable
ALTER TABLE `user` MODIFY `refreshToken` VARCHAR(191) NULL,
    MODIFY `refreshTokenExpires` DATETIME(3) NULL;
