import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.send({data: 'Jehovah thank you'});
});

const port = 3000 || process.env.PORT;

app.listen(port, () => console.log('Jehovah is my strength'));

export default app;