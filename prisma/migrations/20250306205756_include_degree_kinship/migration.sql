-- AlterTable
ALTER TABLE "tbMedicos" ALTER COLUMN "dataNascimento" SET DATA TYPE VARCHAR(10);

-- AlterTable
ALTER TABLE "tbPacientes" ADD COLUMN     "grauParentesco" VARCHAR(255),
ADD COLUMN     "nomeResponsavel" VARCHAR(255),
ALTER COLUMN "dataNascimento" SET DATA TYPE VARCHAR(10);
