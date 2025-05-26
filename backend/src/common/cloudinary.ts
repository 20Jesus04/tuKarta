// src/common/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(__dirname, '..', '..', '.env') });

console.log('CLOUD_NAME:', process.env.CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Esto debe mostrar dvljkxv1n

export default cloudinary;

export async function subirImagenDesdeBuffer(buffer: Buffer): Promise<string> {
  return new Promise((resolve, reject) => {
    // @ts-ignore: TypeScript no detecta correctamente el stream
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'tukarta',
        resource_type: 'image',
      },
      (error: any, result: any) => {
        if (error || !result) {
          reject(error || new Error('No se pudo subir la imagen'));
        } else {
          resolve(result.secure_url);
        }
      },
    );

    stream.end(buffer);
  });
}
