import express from 'express';
import dotenv from 'dotenv';
import routes from './infrastructure/http/routes/index';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

export default app;
