import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const storage = multer.memoryStorage(); // Armazena em memória para converter para base64 depois
const upload = multer({ storage });
export { upload };
