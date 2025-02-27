-- CreateTable
CREATE TABLE "tbMedicos" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "crm" VARCHAR(6) NOT NULL,
    "dataNascimento" VARCHAR(5) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user" VARCHAR(11) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "idEndereco" VARCHAR(36),
    "idPerfil" VARCHAR(36) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbMedicos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_cnpj_key" ON "tbMedicos"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_crm_key" ON "tbMedicos"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_email_key" ON "tbMedicos"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_user_key" ON "tbMedicos"("user");

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_idEndereco_key" ON "tbMedicos"("idEndereco");

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_idPerfil_key" ON "tbMedicos"("idPerfil");

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "tbEnderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "tbPerfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
