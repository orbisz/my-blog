---
title: 开发小贴士
date: 2025/10/05
tags:
 - 前端
 - 后端
 - 开发
 - AI 

---

该贴记录了学习Java开发和日常工程项目开发中遇到的各种小技巧、小问题及解决。


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