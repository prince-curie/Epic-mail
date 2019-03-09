import express from 'express';
import userRoutes from './api/routes/user.route';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send({data: 'Jehovah thank you'});
});

app.use('/api/v1/users', userRoutes);

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log('Jehovah is my strength'));

export default app;