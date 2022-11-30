import express from 'express';
import { imagesRoute } from './routes/images/images.js';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import sequelize from './db/config.js';
import { usersRoute } from './routes/users/users.js';

const PORT = 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
await sequelize.sync();
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', imagesRoute);
app.use('/users', usersRoute);
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
