const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// تقديم الملفات الثابتة (HTML, CSS, JS)
app.use(express.static('public'));
app.use(express.json());

// مسار رئيسي
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`🚀 Editor is running at http://localhost:${port}`);
});
