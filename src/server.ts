import express from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import routes from './infrastructure/http/routes/index';
import uploadRoutes from './infrastructure/http/routes/upload.routes';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/v1/upload', uploadRoutes);
app.use(multer().single('image'));
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '../../../../uploads')));

const port = process.env.PORT || 80;
app.listen(80, () => {
    console.log('Server running on porta 80');
  });
  
export default app;
