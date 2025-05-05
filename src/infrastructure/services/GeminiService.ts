import axios from 'axios';
import { ENV } from '../config/env';

export class GeminiService {
  async getMeasureFromImage(imageBase64: string): Promise<any> {
    const apiKey = ENV.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Gemini API Key is missing');
    }

    try {
      const response = await axios.post(
        'https://api.gemini.com/v1/measure',
        {
          image: imageBase64,
        },
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error('Failed to connect to Gemini API: ' + error.message);
      } else {
        throw new Error('An unknown error occurred while connecting to Gemini API');
      }
    }
  }
}