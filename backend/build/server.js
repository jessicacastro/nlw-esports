import express from 'express';
const app = express();
const port = 3000 || process.env.PORT;
app.get('/games', (request, response) => {
    return response.json([]);
});
app.post('/ads', (request, response) => {
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} 🚀`);
});
