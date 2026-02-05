const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// توجيه كل الطلبات إلى الصفحة الرئيسية ليعمل التطبيق كـ SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`💎 Aite.studio is running at http://localhost:${port}`);
});
