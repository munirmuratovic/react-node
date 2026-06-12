const express = require('express');
const app = express();
const port = 3000;

const apiPrefix = '/api';

app.use(express.json());

app.get(`${apiPrefix}/hello`, (req, res) => {
    res.json({ message: 'Hello from the API!' });
});

const postsRouter = require('./posts');
app.use(`${apiPrefix}/posts`, postsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});