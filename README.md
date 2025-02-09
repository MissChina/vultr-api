# 文本模型对话项目

这是一个简单的文本模型对话项目，使用 Vultr Inference API 进行模型选择和对话。

## 项目结构

```
text-model-chat/
│
├── backend/
│   ├── server.js      # 后端服务器代码
│   ├── package.json   # 后端依赖配置
│   ├── .env          # 环境变量配置（需要自行创建）
│   └── .env.example  # 环境变量示例文件
│
└── frontend/
    ├── index.html    # 前端页面
    ├── style.css     # 样式文件
    └── script.js     # 前端交互脚本
```

## 环境变量配置

1. 在 `backend` 目录下创建 `.env` 文件
2. 参考 `.env.example` 文件的格式，设置以下环境变量：
   ```
   API_KEY=你的API密钥
   ```

## 安装和运行

### 后端

1. 进入后端目录：
   ```bash
   cd backend
   ```

2. 安装依赖：
   ```bash
   npm install
   ```

3. 配置环境变量：
   - 复制 `.env.example` 为 `.env`
   - 在 `.env` 文件中设置你的 API 密钥

4. 启动服务器：
   ```bash
   npm start
   ```

服务器将运行在 `http://localhost:3000`

### 前端

直接在浏览器中打开 `frontend/index.html` 文件即可使用。

## 使用说明

1. 确保已正确配置 API 密钥
2. 确保后端服务器已启动
3. 打开前端页面
4. 从下拉列表中选择要使用的模型
5. 在文本框中输入你的问题
6. 点击"发送"按钮获取回复

## 注意事项

- 确保 `.env` 文件已正确配置且包含有效的 API 密钥
- 不要将 `.env` 文件提交到版本控制系统
- 如果遇到跨域问题，请确认后端的 CORS 设置是否正确
