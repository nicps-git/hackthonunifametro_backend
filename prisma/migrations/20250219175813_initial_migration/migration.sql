-- CreateTable
CREATE TABLE "tbPacientes" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
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

    CONSTRAINT "tbPacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbEnderecos" (
    "id" VARCHAR(36) NOT NULL,
    "cep" VARCHAR(8) NOT NULL,
    "logradouro" VARCHAR(255) NOT NULL,
    "numero" VARCHAR(10) NOT NULL,
    "complemento" VARCHAR(255),
    "bairro" VARCHAR(255) NOT NULL,
    "cidade" VARCHAR(255) NOT NULL,
    "estado" CHAR(2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbEnderecos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbPerfis" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbPerfis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tbPacientes_cpf_key" ON "tbPacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "tbPacientes_email_key" ON "tbPacientes"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tbPacientes_user_key" ON "tbPacientes"("user");

-- CreateIndex
CREATE UNIQUE INDEX "tbPacientes_idEndereco_key" ON "tbPacientes"("idEndereco");

-- CreateIndex
CREATE UNIQUE INDEX "tbPacientes_idPerfil_key" ON "tbPacientes"("idPerfil");

-- AddForeignKey
ALTER TABLE "tbPacientes" ADD CONSTRAINT "tbPacientes_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "tbEnderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbPacientes" ADD CONSTRAINT "tbPacientes_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "tbPerfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
