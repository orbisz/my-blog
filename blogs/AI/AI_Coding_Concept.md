---
title: AI Coding 技术概念
date: 2025/11/13
tags:
  - AI 
  - AI Coding
categories:
 - AI Concept
---

## AI Coding 技术概念

<span style="color:#ff6600">**Command**</span>

通俗理解：Command 就是一个快捷方式，将与值得一段提示词发送至对话中。

Command 本质上就是一个存放在指定位置的 Markdown 文件，文件定义了一些配置属性形式，具体包括这个 Command 的名称以及描述等。

![img_31.png](img_31.png)

配置文件存储可以存储在如下位置，并具有不同的生效范围

![img_30.png](img_30.png)

可以根据日常任务，从中提取一些共性的规则，并将其整理为规范的 SOP 流程，并使用自然语言进行描述。

<span style="color:#ff6600">**Subagent**</span>

Subagent 是 Claude Code 中专门用于处理特定任务的 AI Agent（有的 Subagent 也定义为处理通用任务），
每个 Subagent 有自己独立的上下文窗口、系统提示词和工具权限，通过合理使用可以显著改善复杂任务的处理能力。
简单理解，Claude Code 为自己的主 Agent 配置了多个"工具人"，从关注过程转变为关注结果。

1. 处理更长程任务：在大模型存在上下文长度限制的前提下，Claude Code 尝试将 "大任务拆小任务，把原本只能塞进一个模型上下文里的信息，拆分到多个子上下文中分别处理"，从而在整体上突破单一上下文的实际可用上限，提升能够处理任务的复杂度。
2. 提升处理效率：Claude Code 可能会同时唤起多个 Subagent 并行处理同一任务，并且将不同的 Subagent 处理结果进行汇聚和总结，从而并发提升任务处理效率。
3. 专业领域定制：Subagent 支持配置自己独立的提示词、工具清单，可以实现不同专业领域的定制
   - 自定义提示词，通过 Markdown 描述领域提示词；
   - 自定义工具清单，限制 Subagent 可以使用的工具清单。

Claude Code 中的 Subagent 由一个配置文件定义，配置文件格式为 Markdown，定义 Subagent 的 Metadata 以及系统提示词。

以下是一个功能定位为 RESTful API 审查的 Subagent 示例，frontmatter 部分包含三个字段作用如下：
- name：唯一的名称；
- description：定义 Subagent 的作用，模型根据该内容选择具体的 Subagent 执行任务；
- tools：定义 Subagent 可以使用的工具清单；

<span style="color:#ff6600">**Skills**</span>

Skill 是 Claude Code 中将专业知识打包成可复用功能的机制，每个 Skill 包含一个 SKILL.md 文件，其中包含 Claude Code 在对应场景时读取的指令。

### Claude Skills 是什么？

Claude Skills 是一种基于文件系统的、可复用的知识包，运行在 Claude 的沙盒虚拟机（VM）环境中，用于向 Agent 注入流程化、确定性的内部知识（SOP）的标准化方案。
>Anthropic 官方文档给出了 Agent Skills 的定义：
> 智能体技能（Agent Skills）是一种模块化的能力，用于扩展 Claude 的功能。每个"技能"都封装了相应的指令、元数据和可选资源（例如脚本、模板）。当场景匹配时，Claude 会自动调用这些技能来完成任务。

Agent Skills 的三大组成要素，同时也构成了上下文的三个层级，从抽象到具体：
- 元数据：Skill 的名称、描述、标签等信息；
- 指令：Skill 具体的指令；
- 资源：Skill 附带的相关资源（比如文件、可执行代码等）；

Anthropic 在 GitHub 上开源了一系列的 Agent Skills：https://github.com/anthropics/skills/blob/main/theme-factory/SKILL.md

以画布设计的 Skill 为例，一个 Skill 就是一个文件夹，可以包含嵌套的子文件夹，形成 Skills 的嵌套层级。上面的三要素对应：
- 元数据：包含在 `SKILL.md` 的 YAML 头中；
- 指令：`SKILL.md` 的内容；
- 资源：Skill 文件夹中的其他文件，资源可以在指令中被引用；

#### 渐进式披露

每个 Skill 本质上是一个文件夹，核心是 skill.md，里面用结构化方式描述：这个技能叫什么、解决什么任务、需要哪些步骤/脚本/资源，以及调用时应遵循的规则。
```yaml
{skill-name}/
├── SKILL.md          # 必需：主文件，包含 Skill 定义
├── reference.md      # 可选：详细参考文档
├── examples.md       # 可选：使用示例
├── scripts/          # 可选：辅助脚本
│   └── helper.py
└── templates/        # 可选：模板文件
   └── template.txt
```
Claude Code 在对话前会先读取所有 Skill 的名字和简短描述，匹配当前任务是否适合用某个 Skill；
只有匹配成功时，才按需加载该 Skill 的详细说明和脚本，这就是所谓"渐进式披露"（Progressive Disclosure）。
![img_33.png](img_33.png)

#### Claude Skills 是如何被 Agent 感知的?

Claude Skills 设计遵循了一个非常重要的原则：
>Progressive Disclosure - 渐进式披露：
>
>分阶段、按需加载信息，而不是在任务开始时就将所有内容全部塞入本已宝贵的上下文窗口中。

整个加载过程分为三个层次，对应上面的三要素：

<span style="color:#ff6600">第一层：元数据（始终加载）</span>

每个 Skill 都有一个 `SKILL.md` 文件，其头部的 YAML 元数据包含了名称和描述。
```yaml
---
name: pdf-processing
description: 提取 PDF 文件中的文本和表格，填写表单，合并文档。当处理 PDF 文件或用户提及 PDF、表单或文档提取时使用。
---
```
**元数据在 Claude 启动时加载，并始终保持在上下文窗口中**，占用约 100 个 Token。

<span style="color:#ff6600">第二层：核心指令（触发时加载）</span>

**当 Claude 发现某个 Skill 与当前任务相关时，Claude 会使用 Bash 工具阅读 `SKILL.md` 文件的主体内容**，例如：
```md
# PDF 处理

## 快速入门
使用 `pdfplumber` 提取 PDF 文本：

import pdfplumber
with pdfplumber.open("document.pdf") as pdf:
    text = pdf.pages[0].extract_text()

如需了解高级表单填写，请参阅 [FORMS.md](FORMS.md)。
```
`如需了解高级表单填写，请参阅 [FORMS.md](FORMS.md)`只有在这个时候，Skill 的核心指令和工作流程才会进入上下文窗口。Claude 开始学习如何完成这项具体任务。

<span style="color:#ff6600">第三层：代码与资源（按需加载）</span>

一个复杂的 Skill 可能包含多个文件，形成一个完整的知识库。

Claude 会根据 `SKILL.md` 中的指引，在需要时才去读取 `FORMS.md` 或执行 `fill_form.py` 脚本。执行脚本是最高效的方式。脚本代码本身永远不会进入上下文窗口，只有脚本的输出结果（例如 "验证通过" 或具体的错误信息）会作为反馈进入上下文。

下图说明了完整的渐进式披露的信息加载过程：
![img_22.png](img_22.png)

#### Skill 是一种 Command
Claude Code 实际上是将每个 Skill 定义为 Command，因此实际上可以在 TUI 输入框中输入对应的 Slash Command 来实现 Skill 的手工加载。
从下面的截图中可以看出，Skill 的加载过程与 Command 的执行效果类似，本质上都是把 Skill 预设的提示词放到上下文中。

![img_32.png](img_32.png)

>Claude Code 并没有以 Command 形式展示 Skill，但是支持在输入框中直接唤起，这说明 Claude Code期望 Skill 的加载不需要用户关注，而是自动加载方式。

#### Agent 可以自动加载 Skill
Claude Code 实现了一个 Skill 工具，工具的描述定义如下，其中 <available_skills/> 标签包含了可以被加载的 Skill 名称和描述信息，模型会根据这些信息判断何时以及如何调用该工具进行 Skill 加载。

#### Claude Skills 和 MCP 的关系是什么?
- Claude Skills 是一种基于文件系统的、可复用的知识包，运行在 Claude 的沙盒虚拟机（VM）环境中，用于向 Agent 注入流程化、确定性的内部知识（SOP）的标准化方案。
- MCP 是一种开放 AI 工具的标准，允许任何外部服务（无论是 Jira、Stripe 还是内部 API）将自己的能力以一种标准化的方式暴露给 Agent，让 Agent 可以不关心工具注册、工具发现、工具调用等工程实现细节。

Claude Skills 和 MCP 是可以协同工作的，Claude Skills 为 Agent 提供领域知识、MCP 为 Agent 提供外部工具。

#### 如何实现 Agent Skills
https://github.com/numman-ali/openskills
提供了一个与 Claude 官方近似的实现，思路非常直观，把 skills 写入 AGENTS.md 中，然后 Agent 可以通过 `Bash("openskills read pdf")` 进行调用，这种方案可以支持 Claude Code 之外的其他 Agent，例如 Qwen Code、Codex 等。

<span style="color:#ff6600">**Hooks**</span>

Hooks 是 Claude Code 提供的接入 Agent 推理循环过程的一种能力，可以支持在 Claude Code 生命周期中的不同阶段执行用户配置的脚本。
Hooks 为 Claude Code 的行为提供了可预测的确定性，确保某些操作一定会发生，而不是依赖于让大模型自行决定是否运行这些操作。

Claude Code 为多个"生命周期事件"提供 Hook 入口，用户可以在这些事件上添加脚本调用设置。核心是围绕「用户输入 → 工具调用 → Claude 输出与结束」这条链路提供若干标准事件点，目前主要包括如下 8 个关键 Hook 事件点。

![img_34.png](img_34.png)

### 通俗理解
![img_35.png](img_35.png)

Command：
- 是 "人" 给 Agent 下达指令
- 指令通常是 "任务描述" 和 "任务要求"

Subagent：
- 主 Agent 通过 Task 工具唤起 Subagent "工具人" 工作
- Subagent 提示词配置的是 "人设描述"、"价值观"

Skills：
- 主子 Agent 进行工作的 "指导方针"

CLAUDE.md（AGENTS.md）：
- 长期记忆文件
- "价值观"、"红线"、"员工手册"

>用户通过 Command 让 Subagent 加载 Skill 完成某个任务；
>Subagent 自动判断一个任务需要加载特定 Skill 来完成；多个 Subagent 都可以加载 Skill，如果 Skill 不够通用可以直接设置给 Subagent 常用的 Agent；
> 执行准则可以放到 AGENTS.md 当中

![img_36.png](img_36.png)