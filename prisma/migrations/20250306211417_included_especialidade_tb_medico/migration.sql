/*
  Warnings:

  - A unique constraint covering the columns `[idEspecialidade]` on the table `tbMedicos` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tbMedicos" ADD COLUMN     "idEspecialidade" VARCHAR(36);

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_idEspecialidade_key" ON "tbMedicos"("idEspecialidade");

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idEspecialidade_fkey" FOREIGN KEY ("idEspecialidade") REFERENCES "tbMedicoEspecialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;
