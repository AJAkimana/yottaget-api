import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { sequelize } from './models';

dotenv.config();
const port = process.env.PORT || 3000;
sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch(() => {
    console.log('Something wrong with db');
    process.exit(1);
  });
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.status(200).json({ message: 'The test apis are working' });
});
app.listen(port, () => console.log(`listening on port ${port}`));

export default app;
