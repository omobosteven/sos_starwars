import 'dotenv/config';
import 'regenerator-runtime/runtime';
import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, () => console.log(`listening on port ${process.env.PORT}!`),);
