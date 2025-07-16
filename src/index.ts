// 导入 express 框架
import express from 'express';
// 导入我们定义的路由模块
import statusRouter from './routes/status';

// 创建 express 应用实例
const app = express();

// 启用 JSON 请求体解析（例如 POST JSON）
app.use(express.json());

// 将 /status 的请求路径交给 statusRouter 路由处理
app.use('/status', statusRouter);

// 设置端口号，优先使用环境变量，否则默认 3000
const PORT = process.env.PORT || 3000;

// 启动服务，监听端口
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
