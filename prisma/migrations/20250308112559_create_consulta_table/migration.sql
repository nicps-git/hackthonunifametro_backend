-- CreateTable
CREATE TABLE "tbConsultas" (
    "id" VARCHAR(36) NOT NULL,
    "idAgendamento" VARCHAR(36) NOT NULL,
    "laudoMedico" VARCHAR(255) NOT NULL,
    "prescricaoMedica" VARCHAR(255) NOT NULL,
    "afastamento" TIMESTAMP(3),
    "retorno" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbConsultas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbConsultas" ADD CONSTRAINT "tbConsultas_idAgendamento_fkey" FOREIGN KEY ("idAgendamento") REFERENCES "tbAgendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
