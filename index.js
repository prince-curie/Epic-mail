import express from 'express';
import morgan from 'morgan';

const app = express();

const port = 3000 || process.env.PORT;

app.use(morgan('combined'));

morgan.token(app.get('/', (req, res) => {res.send('Jehovah na you i dey look oh')}));

(app.listen(port, () => console.log('Jehovah is my strength')));