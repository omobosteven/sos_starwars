import 'dotenv/config';
import express from 'express';
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.status(200).send({
    status: 200,
    message: 'sos starwars movies!!!'
}));

app.use(router);

app.use((req, res) => {
    return res.status(404).send({
        status: 'error',
        message: `Route ${req.method} ${req.url} not found.`
    });
});

app.listen(port, () => console.log(`listening on port ${port}!`),);

export default app;
