import express from 'express';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  const image = fs.readFileSync(path.resolve(__dirname, `../../public/image${req.query.imgIndex}.jpg`), {
    encoding: 'base64',
  });
  res.send('data:image/jpeg;base64,' + image);
});

export { router as imagesRoute };
