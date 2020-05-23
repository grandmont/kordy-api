import express from 'express';

const app = express();

app.use('/', (req, res) => {
    res.json({ version: '0.0.1' });
});

app.listen(3001, () => console.log('Server listening'));
