-- CreateTable
CREATE TABLE "tbPacientes" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cpf" VARCHAR(11) NOT NULL,
    "dataNascimento" VARCHAR(10) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "grauParentesco" VARCHAR(255),
    "nomeResponsavel" VARCHAR(255),
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

-- CreateTable
CREATE TABLE "tbResetPasswordCodes" (
    "id" VARCHAR(36) NOT NULL,
    "code" CHAR(6) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbResetPasswordCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbMedicos" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "sobrenome" VARCHAR(255) NOT NULL,
    "cnpj" VARCHAR(14) NOT NULL,
    "crm" VARCHAR(6) NOT NULL,
    "dataNascimento" VARCHAR(10) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "telefone" VARCHAR(11) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "user" VARCHAR(11) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "idEndereco" VARCHAR(36),
    "idPerfil" VARCHAR(36) NOT NULL,
    "idEspecialidade" VARCHAR(36),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbMedicos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbMedicoEspecialidade" (
    "id" VARCHAR(36) NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "descricao" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tbMedicoEspecialidade_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "tbAgendamento" (
    "id" VARCHAR(36) NOT NULL,
    "idPaciente" VARCHAR(36) NOT NULL,
    "idMedico" VARCHAR(36) NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horario" VARCHAR(8) NOT NULL,
    "idStatusAgendamento" VARCHAR(36) NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "tbMedicos_idEspecialidade_key" ON "tbMedicos"("idEspecialidade");

-- AddForeignKey
ALTER TABLE "tbPacientes" ADD CONSTRAINT "tbPacientes_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "tbEnderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbPacientes" ADD CONSTRAINT "tbPacientes_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "tbPerfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idEndereco_fkey" FOREIGN KEY ("idEndereco") REFERENCES "tbEnderecos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idPerfil_fkey" FOREIGN KEY ("idPerfil") REFERENCES "tbPerfis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbMedicos" ADD CONSTRAINT "tbMedicos_idEspecialidade_fkey" FOREIGN KEY ("idEspecialidade") REFERENCES "tbMedicoEspecialidade"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbMedicoDisponibilidade" ADD CONSTRAINT "tbMedicoDisponibilidade_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "tbMedicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "tbPacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "tbMedicos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbAgendamento" ADD CONSTRAINT "tbAgendamento_idStatusAgendamento_fkey" FOREIGN KEY ("idStatusAgendamento") REFERENCES "tbStatusAgendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbConsultas" ADD CONSTRAINT "tbConsultas_idAgendamento_fkey" FOREIGN KEY ("idAgendamento") REFERENCES "tbAgendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

