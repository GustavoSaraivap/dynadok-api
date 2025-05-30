// src/server.ts
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongo } from './infrastructure/database/MongoConnection';
import { clienteRoutes } from './presentation/routes/clienteRoutes';
import { errorHandler } from './presentation/middlewares/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/clientes', clienteRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

connectMongo()
  .then(() => console.log('MongoDB conectado'))
  .then(() => app.listen(PORT, () => console.log(`API rodando em :${PORT}`)))
  .catch(console.error);
