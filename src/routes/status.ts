// 导入 express 框架及类型定义
import express, { Request, Response } from 'express';

// 创建一个路由实例
const router = express.Router();

// 定义请求体的类型接口，确保类型安全
interface UpdateStatusRequestBody {
  id: string; // 对象的唯一标识
  status: 'draft' | 'activated'; // 限定状态只能是 'draft' 或 'activated'
}

// 处理 POST 请求：/status/update
router.post('/update', (req: Request, res: Response) => {
  // 使用类型断言，确保 req.body 符合接口定义
  const body = req.body as UpdateStatusRequestBody;

  // 打印日志以观察收到的请求数据
  console.log(`📥 Received status update for ID=${body.id}: ${body.status}`);

  // 返回响应：状态已接收（这里不做实际处理）
  return res.status(200).json({ message: 'Status received' });
});

// 导出该路由模块
export default router;
