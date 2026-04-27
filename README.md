# 智能客服与自动回访

**部门**: 资管公司  
**序号**: 35

## 项目定位

客服回访中枢 是一个基于 Next.js App Router 的智能客服管理后台，围绕在线咨询、自动回访、看房预约和 FAQ 知识库进行 MVP 演示。

项目采用本地 SQLite + Prisma 持久化，所有业务功能使用高质量 Mock 数据驱动，便于快速上线验证。

## 技术栈

- React + Next.js App Router + TypeScript
- Ant Design + Ant Design X（Sender / Bubble / Conversations）
- Prisma + SQLite（`prisma/dev.db`）
- Server Actions + 本地 Mock 业务闭环

## 本地启动

1. 安装依赖：`npm install`
2. 初始化数据库：`npm run db:init`
3. 启动开发：`npm run dev`
4. 访问：`http://localhost:3000`

## 常用命令

- `npm run verify`：结构和关键约束校验
- `npm run typecheck`：TypeScript 类型检查
- `npm run build`：生产构建检查
- `npm run db:seed`：重置并写入演示业务数据

## PRD 文档

- [35_资管公司_智能客服与自动回访_PRD.md](./35_资管公司_智能客服与自动回访_PRD.md)
- [35_资管公司_智能客服与自动回访_需求文档.md](./35_资管公司_智能客服与自动回访_需求文档.md)
- [35_资管公司_智能客服与自动回访_需求拆解与页面方案.md](./35_资管公司_智能客服与自动回访_需求拆解与页面方案.md)
