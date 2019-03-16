import express from 'express';
import userRoutes from './routes/user.route';

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send({ data: 'Welcome to EPIC-MAIL' }));

app.use('/api/v1/', userRoutes);

/* istanbul ignore next */
const port = 3000 || process.env.PORT;

app.listen(port, () => console.log('App is running.....'));

export default app;
