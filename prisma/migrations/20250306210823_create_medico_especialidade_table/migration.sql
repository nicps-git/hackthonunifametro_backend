-- CreateTable
CREATE TABLE "tbMedicoEspecialidade" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbMedicoEspecialidade_pkey" PRIMARY KEY ("id")
);
