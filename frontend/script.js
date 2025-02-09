$(document).ready(() => {
    const $modelSelect = $('#modelSelect');
    const $promptTextarea = $('#prompt');
    const $sendButton = $('#sendButton');
    const $clearButton = $('#clearButton');
    const $chatHistory = $('#chatHistory');

    // 从localStorage加载历史记录
    let conversations = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    // 格式化时间
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    // 创建打字指示器
    const createTypingIndicator = () => {
        return $('<div class="typing-indicator bot message">')
            .append('<span></span><span></span><span></span>');
    };

    // 显示历史对话记录
    const displayHistory = () => {
        $chatHistory.empty();
        conversations.forEach(message => {
            const $messageDiv = $('<div>')
                .addClass(`message ${message.role}`)
                .text(message.content);
            
            // 添加时间戳
            if (message.timestamp) {
                $('<div>')
                    .addClass('time')
                    .text(formatTime(message.timestamp))
                    .appendTo($messageDiv);
            }
            
            $chatHistory.append($messageDiv);
        });
        // 滚动到底部
        $chatHistory.scrollTop($chatHistory[0].scrollHeight);
    };

    // 保存对话记录到localStorage
    const saveHistory = () => {
        localStorage.setItem('chatHistory', JSON.stringify(conversations));
    };

    // 添加消息到历史记录
    const addMessage = (content, role) => {
        conversations.push({
            content,
            role,
            timestamp: new Date().getTime()
        });
        saveHistory();
        displayHistory();
    };

    // 清除历史记录
    $clearButton.on('click', () => {
        if (confirm('确定要清除所有对话历史吗？')) {
            conversations = [];
            saveHistory();
            displayHistory();
        }
    });

    // 获取模型列表
    fetch('http://localhost:3000/models')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(model => {
                $('<option>')
                    .val(model.id)
                    .text(model.id)
                    .appendTo($modelSelect);
            });
            $modelSelect.val(data.data[0].id); // 默认选择第一个模型
        })
        .catch(error => {
            addMessage('获取模型列表失败，请确保后端服务器已启动。', 'bot');
        });

    // 处理消息发送
    const sendMessage = async () => {
        const modelId = $modelSelect.val();
        const prompt = $promptTextarea.val().trim();

        if (!prompt) {
            return;
        }

        // 添加用户消息到历史记录
        addMessage(prompt, 'user');
        
        // 清空输入框
        $promptTextarea.val('');
        
        // 禁用输入和按钮
        $promptTextarea.prop('disabled', true);
        $sendButton.prop('disabled', true);
        $clearButton.prop('disabled', true);

        // 显示打字指示器
        const $typingIndicator = createTypingIndicator();
        $chatHistory.append($typingIndicator);
        $chatHistory.scrollTop($chatHistory[0].scrollHeight);

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modelId, prompt })
            });
            
            const data = await response.json();
            // 移除打字指示器
            $typingIndicator.remove();

            if (data.error) {
                addMessage(`错误：${data.error}`, 'bot');
            } else {
                // 处理回复内容，移除<think>标签内容
                let content = data.choices[0].message.content;
                content = content.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
                addMessage(content, 'bot');
            }
        } catch (error) {
            // 移除打字指示器
            $typingIndicator.remove();
            addMessage('对话失败，请稍后再试。', 'bot');
        } finally {
            // 启用输入和按钮
            $promptTextarea.prop('disabled', false);
            $sendButton.prop('disabled', false);
            $clearButton.prop('disabled', false);
            $promptTextarea.focus();
        }
    };

    // 添加发送按钮点击事件
    $sendButton.on('click', sendMessage);

    // 添加键盘事件监听
    $promptTextarea.on('keydown', (event) => {
        // 检查是否按下Enter键且没有按下Shift键
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 阻止默认的换行行为
            sendMessage();
        }
    });

    // 自动调整文本框高度
    $promptTextarea.on('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // 显示初始历史记录
    displayHistory();
});
