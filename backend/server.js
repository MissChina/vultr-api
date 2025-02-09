require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// 检查API密钥是否存在
if (!process.env.API_KEY) {
    console.error('错误：未设置API密钥！请在.env文件中设置API_KEY');
    process.exit(1);
}

const API_KEY = process.env.API_KEY;
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
        console.error('获取模型列表失败:', error.message);
        res.status(500).json({ 
            error: '获取模型列表失败',
            details: error.response?.data || error.message
        });
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
        console.error('对话请求失败:', error.message);
        res.status(500).json({ 
            error: '对话失败',
            details: error.response?.data || error.message
        });
    }
});

// 健康检查端点
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`服务器运行在 http://localhost:${port}`);
    console.log('API密钥已配置');
});
