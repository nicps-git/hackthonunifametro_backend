/*
  Warnings:

  - You are about to drop the column `statusAgendamentoId` on the `tbAgendamento` table. All the data in the column will be lost.
  - Added the required column `idStatusAgendamento` to the `tbAgendamento` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tbAgendamento" DROP CONSTRAINT "tbAgendamento_statusAgendamentoId_fkey";

-- AlterTable
ALTER TABLE "tbAgendamento" DROP COLUMN "statusAgendamentoId",
ADD COLUMN     "idStatusAgendamento" VARCHAR(36) NOT NULL;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idStatusAgendamento_fkey" FOREIGN KEY ("idStatusAgendamento") REFERENCES "tbStatusAgendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
