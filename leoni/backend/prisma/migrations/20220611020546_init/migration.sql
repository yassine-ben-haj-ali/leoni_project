-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `matricule` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nom` VARCHAR(191) NULL,
    `prenom` VARCHAR(191) NULL,
    `mdp` VARCHAR(191) NOT NULL,
    `Role` ENUM('Administrateur', 'Utilisateur') NOT NULL DEFAULT 'Utilisateur',
    `fonctionId` INTEGER NULL,
    `serviceId` INTEGER NULL,

    UNIQUE INDEX `User_matricule_key`(`matricule`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Fonction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Fonction_designation_key`(`designation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Service` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designation` VARCHAR(191) NOT NULL,
    `nbr_employee` INTEGER NULL,

    UNIQUE INDEX `Service_designation_key`(`designation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sortie_bien_personel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nature` VARCHAR(191) NOT NULL,
    `quantite` INTEGER NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `nom_tronsporteur` VARCHAR(191) NOT NULL,
    `prenom_tronsporteur` VARCHAR(191) NOT NULL,
    `institue` VARCHAR(191) NOT NULL,
    `type_stage` INTEGER NOT NULL,
    `date_stage` DATETIME(3) NOT NULL,
    `date_debut` DATETIME(3) NOT NULL,
    `date_fin` DATETIME(3) NOT NULL,
    `etat` ENUM('En_attente', 'Accepte', 'Refuse') NOT NULL DEFAULT 'En_attente',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type_stage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeStage` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_stage_TypeStage_key`(`TypeStage`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sortie_bien_societe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantite` INTEGER NOT NULL,
    `destination` VARCHAR(191) NOT NULL,
    `tronsporteur` VARCHAR(191) NOT NULL,
    `type_sortie` INTEGER NOT NULL,
    `num_mise_rebut` VARCHAR(191) NOT NULL,
    `date_sortie` DATETIME(3) NOT NULL,
    `date_retour_prevue` DATETIME(3) NOT NULL,
    `responsable_retour` VARCHAR(191) NOT NULL,
    `nature_bien` VARCHAR(191) NOT NULL,
    `etat` ENUM('En_attente', 'Accepte', 'Refuse') NOT NULL DEFAULT 'En_attente',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Type_sortie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `TypeSortie` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Type_sortie_TypeSortie_key`(`TypeSortie`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rebut` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nature_investissement` VARCHAR(191) NOT NULL,
    `caracteristiques` VARCHAR(191) NOT NULL,
    `montant_acquisition` VARCHAR(191) NOT NULL,
    `centre_cout` VARCHAR(191) NOT NULL,
    `perte` VARCHAR(191) NOT NULL,
    `date_acquisition` DATETIME(3) NOT NULL,
    `date_sortie` DATETIME(3) NOT NULL,
    `cause_rebut` VARCHAR(191) NOT NULL,
    `etat` ENUM('En_attente', 'Accepte', 'Refuse') NOT NULL DEFAULT 'En_attente',
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Materielles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `num_imm` VARCHAR(191) NOT NULL,
    `num_serie` VARCHAR(191) NOT NULL,
    `marque` VARCHAR(191) NOT NULL,
    `sortieId` INTEGER NOT NULL,

    UNIQUE INDEX `Materielles_num_imm_key`(`num_imm`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_fonctionId_fkey` FOREIGN KEY (`fonctionId`) REFERENCES `Fonction`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sortie_bien_personel` ADD CONSTRAINT `Sortie_bien_personel_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sortie_bien_personel` ADD CONSTRAINT `Sortie_bien_personel_type_stage_fkey` FOREIGN KEY (`type_stage`) REFERENCES `Type_stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sortie_bien_societe` ADD CONSTRAINT `Sortie_bien_societe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sortie_bien_societe` ADD CONSTRAINT `Sortie_bien_societe_type_sortie_fkey` FOREIGN KEY (`type_sortie`) REFERENCES `Type_sortie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Rebut` ADD CONSTRAINT `Rebut_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Materielles` ADD CONSTRAINT `Materielles_sortieId_fkey` FOREIGN KEY (`sortieId`) REFERENCES `Sortie_bien_societe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
