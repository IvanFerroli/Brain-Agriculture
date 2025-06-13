/*
  Warnings:

  - Added the required column `atualizadoEm` to the `Safra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fim` to the `Safra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inicio` to the `Safra` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Safra" ADD COLUMN     "atualizadoEm" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fim" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "inicio" TIMESTAMP(3) NOT NULL;
