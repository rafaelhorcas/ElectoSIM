import express from 'express'
const app = express();
import router from './routes/router';

app.use(express.json());

const PORT = 3000;

app.get('/', (_, res) => {
    res.send('Hello, World!');
    });

app.use('/api', router);

app.listen(PORT, () => {   
    console.log(`Server is running on http://localhost:${PORT}`);
});