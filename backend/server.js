const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const API_KEY = 'NCJFTKXZRJ4HTI7AAY6KNEANJZ3LMWF3VMUQ';
const API_URL = 'https://api.vultrinference.com/v1';

// 获取模型列表
app.get('/models', async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/models`, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '获取模型列表失败' });
    }
});

// 与模型进行对话
app.post('/chat', async (req, res) => {
    const { modelId, prompt } = req.body;
    try {
        const response = await axios.post(`${API_URL}/chat/completions`, {
            model: modelId,
            messages: [{ role: 'user', content: prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: '对话失败' });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
});
