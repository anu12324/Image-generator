const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Mock image generation API
app.post('/api/generate-image', (req, res) => {
    const { prompt } = req.body;

    // Generate a random image from Picsum
    const width = 400;
    const height = 300;
    const randomId = Math.floor(Math.random() * 1000);
    const imageUrl = `https://picsum.photos/seed/${encodeURIComponent(prompt + randomId)}/${width}/${height}`;

    res.json({ imageUrl });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
