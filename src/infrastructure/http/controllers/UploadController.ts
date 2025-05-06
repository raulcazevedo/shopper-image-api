import { Request, Response } from 'express';
import { UploadMeasureUseCase } from 'application/use-cases/UploadMeasureUseCase';
import { PrismaMeasureRepository } from 'infrastructure/persistence/MeasureRepository';
import { GeminiService } from 'infrastructure/services/GeminiService';

export class UploadController {
  private uploadMeasureUseCase: UploadMeasureUseCase;

  constructor(uploadMeasureUseCase: UploadMeasureUseCase) {
    const measureRepository = new PrismaMeasureRepository();
    const geminiService = new GeminiService();
    this.uploadMeasureUseCase = new UploadMeasureUseCase(measureRepository, geminiService);
  }

  async upload(req: Request, res: Response): Promise<void> {
    const { type } = req.body;
    const customerCode = req.params.customerCode;
    const datetime = req.body.datetime;
    const image = req.file;

    if (!image) {
      res.status(400).json({ error: 'Image is required' });
      return;
    }

    
    const imageUrl = `uploads/${image.originalname}`; 

    try {
      // Chamando o UseCase e aguardando o retorno
      const measure = await this.uploadMeasureUseCase.execute({
        type,
        customerCode,
        datetime: new Date(datetime),
        imageBuffer: image.buffer,  
        imageName: image.originalname, 
      });

      
      res.status(201).json(measure); // Retorna a medida criada
    } catch (error) {
      res.status(400).json({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }
}
