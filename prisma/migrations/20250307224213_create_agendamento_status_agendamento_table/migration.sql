-- CreateTable
CREATE TABLE "tbAgendamento" (
    "id" VARCHAR(36) NOT NULL,
    "idPaciente" VARCHAR(36) NOT NULL,
    "idMedico" VARCHAR(36) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" VARCHAR(8) NOT NULL,
    "statusAgendamentoId" VARCHAR(36) NOT NULL,
    "observacao" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbAgendamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbStatusAgendamento" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbStatusAgendamento_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "tbPacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "tbMedicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_statusAgendamentoId_fkey" FOREIGN KEY ("statusAgendamentoId") REFERENCES "tbStatusAgendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
