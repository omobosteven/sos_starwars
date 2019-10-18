import 'dotenv/config';
import express from 'express';

const app = express();

app.listen(3000, () => console.log(`listening on port ${process.env.PORT}!`),);
