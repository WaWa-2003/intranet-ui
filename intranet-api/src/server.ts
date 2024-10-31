import express from 'express';
import cors from 'cors';
import sequelize from './models/db';
import systemDataRoutes from './routes/systemData';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/systemData', systemDataRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});
