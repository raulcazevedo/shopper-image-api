import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import uploadRoutes from './http/routes/upload.routes';
import listRoutes from './http/routes/list.routes';
import confirmRoutes from './http/routes/confirm.routes';
import { connect } from './persistence/database';

const app = express();
const PORT = process.env.PORT || 80;

// Middlewares
app.use(cors());
app.use(json());

// Rotas
app.use('/upload', uploadRoutes);
app.use('/list', listRoutes);
app.use('/confirm', confirmRoutes);

// Inicia o servidor
async function start() {
  await connect(); // conecta ao banco de dados
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}

start();
