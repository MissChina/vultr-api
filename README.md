# 文本模型对话项目

这是一个简单的文本模型对话项目，使用 Vultr Inference API 进行模型选择和对话。

## 项目结构

```
text-model-chat/
│
├── backend/
│   ├── server.js      # 后端服务器代码
│   └── package.json   # 后端依赖配置
│
└── frontend/
    ├── index.html    # 前端页面
    ├── style.css     # 样式文件
    └── script.js     # 前端交互脚本
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

3. 启动服务器：
   ```bash
   npm start
   ```

服务器将运行在 `http://localhost:3000`

### 前端

直接在浏览器中打开 `frontend/index.html` 文件即可使用。

## 使用说明

1. 确保后端服务器已启动
2. 打开前端页面
3. 从下拉列表中选择要使用的模型
4. 在文本框中输入你的问题
5. 点击"发送"按钮获取回复

## 注意事项

- 确保后端服务器在使用前已经启动
- 如果遇到跨域问题，请确认后端的 CORS 设置是否正确
- API 密钥已经配置在后端代码中，请确保其有效性
