-- CreateTable
CREATE TABLE "tbMedicoDisponibilidade" (
    "id" VARCHAR(36) NOT NULL,
    "idMedico" VARCHAR(36) NOT NULL,
    "diaSemana" VARCHAR(3) NOT NULL,
    "horario" VARCHAR(8) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbMedicoDisponibilidade_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbMedicoDisponibilidade" ADD CONSTRAINT "tbMedicoDisponibilidade_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "tbMedicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
