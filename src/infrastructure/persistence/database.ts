import { PrismaClient } from '@prisma/client';

// Cria uma instância do Prisma Client
const prisma = new PrismaClient();

// Função para conectar ao banco
async function connect() {
  try {
    await prisma.$connect();
    console.log('Conectado ao banco de dados');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error);
  }
}

// Função para desconectar quando necessário
async function disconnect() {
  await prisma.$disconnect();
}

export { prisma, connect, disconnect };
