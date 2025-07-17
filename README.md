
# my-typescript-app

基于 TypeScript + Express 的示例项目，用于接收上游 API 调用并更新状态（Draft -> Activated）。

---

## 目录

- [环境要求](#环境要求)
- [依赖说明](#依赖说明)
- [安装依赖](#安装依赖)
- [环境变量](#环境变量)
- [开发启动（带热重载）](#开发启动带热重载)
- [生产启动](#生产启动)
- [运行测试](#运行测试)
- [代码格式化](#代码格式化)
- [代码检查](#代码检查)
- [构建项目](#构建项目)
- [项目功能概述](#项目功能概述)
- [项目结构](#项目结构)

---

## 环境要求

- Node.js >= 16.x
- npm >= 8.x

---

## 依赖说明

本项目主要依赖：

- **express**：Node.js Web 框架，用于搭建 HTTP 服务和路由处理。
- **dotenv**：加载 `.env` 环境变量配置文件，方便环境配置管理。
- **typescript**：JavaScript 超集，提供类型系统和编译功能。
- **ts-node**：直接运行 TypeScript 代码的工具，方便开发调试。
- **nodemon**：监控文件变化，自动重启服务，提升开发效率。
- **jest**：JavaScript 测试框架，用于编写和执行单元测试。
- **supertest**：HTTP 断言库，用于测试 Express 路由。
- **eslint**：代码风格检查工具，保证代码质量。
- **prettier**：代码格式化工具，统一代码风格。

---

## 安装依赖

```bash
npm install
```

---

## 环境变量

项目使用 [dotenv](https://github.com/motdotla/dotenv) 加载根目录 `.env` 文件中的配置。  

示例 `.env` 文件内容：

```env
PORT=3000
```

你也可以直接通过命令行设置环境变量：

```bash
PORT=4000 npm run dev
```

---

## 开发启动（带热重载）

```bash
npm run dev
```
---

## 生产启动

```bash
npm run build
npm start
```

先使用 `tsc` 编译代码到 `dist` 目录，再用 Node.js 运行编译后的 JavaScript。

---

## 运行测试

```bash
npm run test:coverage
```

使用 Jest 运行单元测试并生成覆盖率报告。

---

## 代码格式化

格式化项目代码：

```bash
npm run format
```

检查代码格式：

```bash
npm run check:format
```

---

## 代码检查

运行 ESLint 进行代码风格和规范检查：

```bash
npm run lint
```

自动修复部分代码问题：

```bash
npm run lint:fix
```

---

## 构建项目

编译 TypeScript 源码：

```bash
npm run build
```

---

## 项目功能概述

- 提供 RESTful API 接口 `/status`，接收上游调用请求，更新业务实体状态（Draft -> Activated）。
- 支持 JSON 格式请求体。
- 内置完善的代码风格检查和自动修复工具。
- 集成单元测试和代码覆盖率检测，保障代码质量。
- 使用 `.env` 文件管理环境变量，便于多环境切换和配置管理。

---

## 项目结构

```
my-typescript-app/
├── src/
│   ├── controllers/
│   │   └── status.controller.ts       # 控制器：处理请求逻辑，调用服务层
│   ├── models/
│   │   └── status.model.ts            # 数据模型：定义数据结构和类型
│   ├── routes/
│   │   └── status.route.ts            # 路由：定义接口路径与控制器函数的映射
│   ├── services/
│   │   └── status.service.ts          # 服务：业务逻辑处理
│   ├── utils/
│   │   └── logger.ts                  # 工具：日志记录等通用方法
│   └── index.ts                       # 应用入口：初始化服务与中间件
├── tests/
│   ├── controllers/
│   │   └── status.controller.test.ts  # 控制器单元测试
│   ├── routes/
│   │   └── status.route.test.ts       # 路由集成测试（使用 supertest）
│   ├── services/
│   │   └── status.service.test.ts     # 服务层单元测试
│   └── utils/
│       └── logger.test.ts             # 工具函数测试（可选）
├── dist/                              # 编译后的 JavaScript 输出（不需要手动修改）
├── .env                               # 环境变量配置
├── jest.config.mjs                    # Jest 测试配置（ESM 模式）
├── package.json                       # 项目信息和依赖
├── tsconfig.json                      # TypeScript 编译配置
├── .eslintrc.js                       # ESLint 配置文件
├── .prettierrc                        # Prettier 配置文件
└── README.md                          # 项目说明文档（已生成）

```

## Best Practices
- TypeScript 项目结构和配置（tsconfig.json） 
- ES模块规范及导入导出方式 
- ESLint + Prettier 严格代码规范和格式化 
- Jest + Supertest 的完整单元测试和覆盖率设置 
- package.json 脚本规范化（分开命令，带注释） 
- 环境变量管理与 .env 文件使用 
- Node 版本管理及 engines、.nvmrc 规范
- README 详尽的项目文档编写
---
