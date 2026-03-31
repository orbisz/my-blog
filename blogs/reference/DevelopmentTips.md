---
title: 开发小贴士
date: 2025/10/05
tags:
 - 前端
 - 后端
 - 开发
 - AI 
categories:
   - reference
---

> 该贴记录了学习Java开发和日常工程项目开发中遇到的各种小技巧、小问题及解决。


windows设置环境变量CMD：set(当前窗口临时)；setx(永久设置)
linux设置环境变量:export

对于一些apiKey密钥，可以将其保存在环境变量中，然后在程序中读取环境变量的值来读取密钥以保证初步安全，在云服务器上同理，云服务器就相当于是一个linux环境的电脑。

对于通过Github Actions 创建 workflow 执行工作流程的项目，到仓库 Settings → Secrets and variables → Actions，将apiKey配置为 Repository secret，对所有 job 默认可见（除来自 fork 的 PR 等特殊情况），配置成本更低。
```yaml
env:
  GLM_KEY: ${{ secrets.GLM_KEY }}     # OS 环境变量
run: java -DGLM_KEY=$GLM_KEY ...      # 赋值给Java 系统属性，在 System.getProperty("GLM_KEY") / @Value("${GLM_KEY}")需要

```
如果把apiKey配置为Environment secret，需要在workflow中声明这个环境，才能把apiKey注入到secrets里
```yawl
jobs:
  build:
    runs-on: ubuntu-latest
    environment: GLM_KEY       # 这里是环境名
```

#### AI Agent生成前端工作流
参考文献：https://mp.weixin.qq.com/s/OECH3QXoNayCFxj7M3qDfw
1. 建立统一的设计规范，保证稳定的产出原型图
   ```
   请你充分理解当前设计规范 @xxx 生成 design-master-prompt.md .遵循 prompt 工程最佳实践。我希望后续通过这个 prompt 让 AI 设计出的组件符合设计规范。我的使用场景比如：------/design-master-prompt 你模拟数据设计一个三栏移动端的商品详情组件,商品可以是某个寿险产品的领取方式. 直接输出 HTML,我们将会进行 POC. 三栏在移动端是三个模块横向排列.你可以生成多个版本, 当你生成后直接打开HTML 供我选择。------
   如果有任何不清楚的，请你向我确认。
   ```
2. 生成 “Design-Master-Prompt”
   - 将这个 prompt 作为 AI 工具的提示词，让 AI 能根据需求生成符合规范的 HTML 原型。
3. 将原型压缩为 “运行时生成 Prompt”： 
   - 将已验证的 HTML 原型转化为 Agent 在生产环境中可复用的 Prompt，用于实时生成同类组件。
4. Agent 运行时渲染前端组件