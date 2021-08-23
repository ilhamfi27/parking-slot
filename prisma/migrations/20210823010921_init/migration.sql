-- CreateTable
CREATE TABLE `ParkingLevel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `level` VARCHAR(191) NOT NULL,
    `max_slot` INTEGER NOT NULL,

    UNIQUE INDEX `ParkingLevel.level_unique`(`level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ParkingSlot` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `slot` INTEGER NOT NULL,
    `car_number` VARCHAR(12) NOT NULL,
    `parkingLevelId` INTEGER,

    UNIQUE INDEX `ParkingSlot.car_number_unique`(`car_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ParkingSlot` ADD FOREIGN KEY (`parkingLevelId`) REFERENCES `ParkingLevel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
