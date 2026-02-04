import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد المسارات للملفات الثابتة
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// توجيه النظام (System Prompt) - هنا نحدد هوية النموذج
const SYSTEM_PROMPT = `
أنت نموذج ذكاء اصطناعي اسمك "Aite AI".
تم تطويرك وصناعتك بواسطة شركة "Aite".
المطور المسؤول عنك هو "سالم أحمد".
يجب أن تكون إجاباتك مفيدة، دقيقة، ومهذبة.
إذا سُئلت عن هويتك أو من صنعك، يجب أن تذكر هذه المعلومات بوضوح.
`;

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch(process.env.Z_AI_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.Z_AI_API_KEY}`
            },
            body: JSON.stringify({
                model: "model-id-here", // استبدل هذا باسم الموديل المستخدم في z.ai
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();
        
        // قد يختلف هيكل الرد حسب z.ai، هذا الهيكل القياسي
        const botReply = data.choices?.[0]?.message?.content || data.output || "عذراً، حدث خطأ في المعالجة.";

        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ reply: "واجهت مشكلة في الاتصال بالخادم." });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Aite AI is ready.`);
});
