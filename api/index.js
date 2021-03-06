import express from 'express';
import userRoutes from './routes/user.route';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.json());

app.get('/', (req, res) => res.send({ data: 'Welcome to EPIC-MAIL' }));

app.use('/api/v1/', userRoutes);

/* istanbul ignore next */
const port = process.env.PORT;

app.listen(port, () => console.log('App is running.....'));

export default app;
