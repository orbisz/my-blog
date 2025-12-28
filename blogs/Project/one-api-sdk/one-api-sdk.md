---
title: 统一大模型对接SDK实现

date: 2025/12/18
tags:
  - AI
  - 组件开发
  - LLM
categories:
  - 后端开发
---

本项目实现了一个多模型AI服务统一接入SDK，通过良好的架构设计，使得开发者可以使用统一的API调用不同的AI模型，大大简化了集成多个AI服务的复杂度。
项目支持文本对话、图片生成、图片理解等多种功能，采用流式输出和异步处理提升用户体验。

这是一个统一的AI模型SDK，用于集成多个主流AI服务提供商的API，包括：
- OpenAI ChatGPT
- 阿里通义千问
- 百度文心一言
- 智谱ChatGLM
- 腾讯混元
- 讯飞星火
- Google PaLM2/Gemini Pro
- 360智脑
- Claude (待实现)

## 核心架构
项目采用了分层架构和策略模式的设计：

1. `Session`层
   - `OpenAiSession`: 统一会话接口，提供所有AI交互的API
   - `OpenAiSessionFactory`: 工厂接口，用于创建会话
   - `Configuration`: 中央配置类，管理所有AI模型的配置
   - `DefaultOpenAiSession`: 默认会话实现
   - `DefaultOpenAiSessionFactory`: 工厂实现，负责创建和配置会话

2. `Executor`层
   - `Executor`: 执行器接口，定义所有AI模型的统一操作，每个AI模型都有独立的执行器实现（如ChatGPTModelExecutor）
   - `interceptor`：HTTP 传输层的横切拦截器
     - 作用:为所有请求统一设置基础头（`Content-Type`、`User-Agent`、`Accept`），保证 SSE 与 JSON 请求的协议一致性。
     - 实现:`HTTPInterceptor`注入到`OkHttpClient`，在会话工厂初始化时安装
     - 关系:与认证无直接耦合；各模型的认证头在对应`model/*Executor`内部单独设置（如`Authorization: Bearer`）
   - `parameter`：统一的跨模型请求/响应 DTO 与参数转换接口
     - 作用：为统一会话 API 提供通用数据模型，降低各厂商请求结构差异
       - 文本对话：`CompletionRequest`、`Message`、`CompletionResponse`、`ChatChoice`、`Usage` 
       - 图片：`ImageRequest`、`ImageEditRequest`、`ImageResponse`；图片理解：`PictureRequest`、`PictureContentEnum`
   - result ：SSE 等流式事件处理的统一抽象
     - 作用：对流式事件（SSE）的监听处理进行统一抽象，便于在各执行器中复用/适配
     - 接口：`ResultHandler`仅定义监听器透传/包装方法，具体处理可在执行器中实现或复用
     - 关系：结合会话实现的同步聚合逻辑，将流式事件汇总为`CompletableFuture<String>`（会话层处理；与`result`包协作）
   - `model`：各模型厂商的具体执行器与其私有 VO/配置/工具
     - 作用：承载“厂商/模型”的具体执行逻辑，实现统一的`Executor`接口；内部完成：
       - 认证：Bearer/JWT/HMAC/TC3等签名与令牌获取
       - 传输：SSE、同步 HTTP、WebSocket 的请求构建与响应解析
       - DTO：各厂商私有的请求/响应 VO
   >- `OpenAiSession`作为统一入口，按`CompletionRequest.model`路由到`model/*Executor`
   >- `interceptor`提供通用 HTTP 头；`model/*Executor`负责具体认证与协议细节
   >- `parameter`保证会话 API 的跨模型一致性，并通过`ParameterHandler`做私有参数适配
   >- `result`统一事件监听抽象，结合会话层实现同步结果聚合


3. 模型层 (`executor.model.*`)

每个AI模型都有自己的包结构：
```
model/
├── chatgpt/          # OpenAI ChatGPT
├── aliyun/           # 阿里通义千问
├── baidu/            # 百度文心一言
├── chatglm/          # 智谱ChatGLM
├── tencent/          # 腾讯混元
├── xunfei/           # 讯飞星火
├── google/           # Google PaLM/Gemini
├── brain360/         # 360智脑
├── gemini/           # Gemini Pro
└── claude/           # Claude
```
每个模型包包含：
- `ModelExecutor.java`: 执行器实现
- `config/Config.java`: 模型配置
- `valobj/`: 请求响应对象

4. 参数层 (`executor.parameter`)
- `CompletionRequest`: 统一的对话请求对象
- `CompletionResponse`: 统一的响应对象
- `Message`: 标准化的消息格式
- `ImageRequest/ImageResponse`: 图片生成相关
- 其他通用参数类

## 核心功能
1. 文本对话功能
   - 支持流式输出（`Server-Sent Events`）
   - 支持同步响应
   - 可配置温度、top_p、最大token数等参数
2. 图片生成功能
   - 支持DALL-E 2/3图片生成
   - 支持图片编辑（ChatGPT）
   - 支持文生图（百度文心）
3. 图片理解功能
   - 支持图片内容理解和描述
4. 统一配置管理
   - 每个模型独立的配置类
   - 支持自定义API密钥和主机
   - HTTP客户端统一配置

## 设计模式
1. 工厂模式: `OpenAiSessionFactory`创建会话
2. 策略模式: 不同模型执行器实现相同接口
3. 建造者模式: 请求对象使用`Builder`构建
4. 拦截器模式: HTTP请求统一处理
5. 适配器模式: 不同AI模型API适配为统一接口

## 典型调用链
- 问答（流式）：`OpenAiSession.completions`→ 查找执行器并转发 → 执行器构建请求（认证、JSON）→ `EventSource`推送 → 业务监听或会话实现聚合 OpenAiSession.java:26 → DefaultOpenAiSession.java:31-36 → ChatGPTModelExecutor.java:52-74
- 问答（同步）：在会话层以监听器收集 SSE 片段并完成`CompletableFuture DefaultOpenAiSession.java:53-96`
- 图片生成/编辑：`OpenAiSession.genImages/editImages`→ 执行器同步 HTTP 调用（JSON 或 multipart）→ 解析响应`DefaultOpenAiSession.java:98-108,130-138`→`ChatGPTModelExecutor.java:82-115,124-167`

### 通义千问执行器认证与请求构建过程举例
- 通义千问执行器以 SSE 流式为主，使用`Authorization: Bearer <apiKey>`完成认证，目标端点为`DashScope`文本生成 API。
- 将通用`CompletionRequest`转换为 Ali 专属`AliModelCompletionRequest`，设置相关参数配置，并在事件监听中将 Ali 响应统一适配为通用`CompletionResponse`。
