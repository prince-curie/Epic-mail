import express from 'express';

const app = express();

const port = 3000 || process.env.PORT;

(app.listen(port, () => console.log('Jehovah is my strength')));