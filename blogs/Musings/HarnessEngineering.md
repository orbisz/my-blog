---
title: Harness Engineering 是什么，是SDD的上位替代吗？
date: 2026/4/2
tags:
 - AI Coding
 - AI
categories:
 - 杂谈
---

## Harness Engineering
>Harness 一词来源于马具。马是强大的 AI 模型，但因其黑盒属性具有不可控性；Harness 是指缰绳、马鞍和护具等，是工程管理学；骑手是人类工程师，明确意图、设计环境和构建反馈回路。
>

Mitchell Hashimoto 对于 Mitchell Hashimoto 的定义只有一句话：
>"It is the idea that anytime you find an agent makes a mistake, you take the time to engineer a solution such that the agent never makes that mistake again."
> 
> 每当你发现 Agent 犯了一个错误，你就花时间去工程化一个解决方案，让它再也不会犯同样的错。

她提到了两类具体做法：
- 在`AGENTS.md`里记录 Agent 的坏行为模式，防止重现。
- 二是编写专用工具脚本（截图工具、过滤测试等），让 Agent 有办法验证自己的工作是否做对了。

Harness从工程师个人实践的角度来看，就是**当 Agent 出错，不要反复纠正，而是工程化地消除这个错误的可能性。**

OpenAI 在官方《Harness Engineering》博客文章中提到了这样一段话：
> 「显而易见的是：构建软件仍然需要纪律，但纪律更多地体现在支撑结构（scaffolding）上，而不是代码上。保持代码库一致性的工具、抽象和反馈回路变得越发重要。」
> 
> 「我们当前最棘手的挑战集中在设计环境、反馈回路和控制系统方面，帮助智能体实现我们的目标：大规模构建和维护复杂、可靠的软件。」

这句话重新定义了「工程纪律」。

以前，纪律体现在：好好写代码、认真做 code review、遵守编码规范。 现在，纪律体现在：构建好让 Agent 工作的环境——文档、约束、反馈回路。
纪律从「如何写好代码」转移到了「如何构建支撑 Agent 工作的系统体系」——包括结构化的文档、明确的约束规则、完善的反馈回路等。

OpenAI 工程团队的 Harness 是一套完整的环境体系：结构化的`docs/`目录、`product-specs/`（产品规格）、`exec-plans/`（执行计划）、`design-docs/`（设计文档）、架构约束（自定义 linter + 结构测试）、反馈回路（可观测性工具直接接入 Agent 运行时），以及定期运行的「垃圾回收」Agent 扫描架构漂移。
他们总结出的核心发现是：从智能体的角度来看，它在运行时无法在情境中访问的任何内容都是不存在的——存储在 Google Docs、聊天记录或人们头脑中的知识都无法被系统访问；代码仓库本地的、已版本化的工件，才是 Agent 所能看到的全部。

**Agent看不到的，就不存在。**

因此 Harness 里的 scaffolding 就是所有被写进仓库、Agent 可以读到、可以推理的内容——包括规范、意图、约束、决策记录。

### 启示
<span style="color:#ff6600">启示一：人类注意力是最稀缺的资源——审查的重心应在 Spec，而不是代码</span>

人类做的是「定义正确性」，而不是「检查每一行代码」。

<span style="color:#ff6600">「大型 AGENTS.md」是一个陷阱——执行约束和语义约束要分开管</span>

执行约束（「不要使用这个 API」「文件大小不超过 X 行」「不要运行这个命令」）和语义约束（「这个字段的含义是什么」「这个服务的边界在哪里」「这个错误码在跨服务场景下如何处理」）是两类性质完全不同的东西。混在同一份文件里，两者都会随着文件膨胀而失效。

<span style="color:#ff6600">Spec 漂移是必然的——仅靠人工维护不够，需要主动检测机制</span>

代码漂移通常能在运行时感知——测试挂了、类型报错了、行为不符合预期。但 Spec 漂移是沉默的：Active 状态的 Spec 在描述一个已经演进了的系统，它不会报错，不会提醒你，只会沉默地让下一个 Agent 基于一份过时的定义去生成代码。

<span style="color:#ff6600">启示四：遇到问题时，追问的方向是「AI 还缺什么」，而不是「人类再努力一点」</span>

在落地过程中遇到 Bug 或阻塞时，首要的追问不是「怎么让人把这件事做对」，而是「AI 在完成这件事时还缺什么」。缺的可能是 Spec 里的一个 Scenario，可能是一个让 AI 能自我验证的工具，也可能是系统里缺少一层 AI 可以直接读取的可观测性数据。


## Harness Engineering 与 Spec
>>- Harness Engineering 和 SDD（Spec-Driven Development） 不是竞争关系，而是同一件事的两个层面。
>>- 工程纪律没有消失，只是从「写好代码」转移到了「构建好让 Agent 工作的 scaffolding」。而 Spec——写进仓库的意图、契约和规范——正是这个 scaffolding 的核心内容之一。Harness 越强，执行能力越强，Spec 的质量对最终结果的影响就越大。**Harness 是放大器，Spec 是被放大的内容**。

明白了「scaffolding 由写进去的内容决定」，Spec 在 Harness 里的角色就清晰了。它不是 Harness 的附件，而是 Harness 能运转起来的前提之一。具体是三个角色：

<span style="color:#ff6600">角色一：Agent 推理的地图</span>

OpenAI 有一条实践原则：
> 「要给 Codex 的是一张地图，而不是一本 1,000 页的说明书。」
> 
> 「这实现了渐进式披露：智能体从一个小而稳定的切入点开始，并被指导下一步该去哪里查看，而不是一开始就被淹没。」

Spec 应该是：一张地图，而不是一本百科全书。地图的特点是：有目录，有指针，Agent 从高层概览出发，按需深入到具体节点。系统级 Spec 告诉 Agent「这个系统有哪些服务、各自负责什么、边界在哪里」；服务级 Spec 告诉 Agent「这个服务内部有哪些能力、接口语义是什么、行为规则是什么」。Agent 不需要一次性读完所有内容，它被指引着去找它需要的那部分。

没有这张地图，Agent 的起点是代码——而代码只告诉它「系统现在是什么样」，不告诉它「为什么是这样」「哪些是不应该改的」「这个字段在跨服务之间有什么约定」。

<span style="color:#ff6600">角色二：约束生效的语义基础</span>

OpenAI 用 linter 和结构测试来机械地强制执行架构规则——比如层间依赖方向、文件大小限制、命名规范。这些是「格式」层面的约束，可以完全自动化。

但 linter 检查不了语义。它不知道「某个错误码在跨服务场景下应该怎么处理」，不知道「某个接口字段在特定来源场景下的业务含义」，不知道「这个状态的流转规则是什么」。

这些语义，必须被显式写下来，Agent 才能正确推理。Spec 的契约层和行为规格层承载的，正是这类「linter 管不到、但 Agent 必须知道」的语义约定。

<span style="color:#ff6600">角色三：反馈回路的正确性判据</span>

Harness Engineering 的核心飞轮是：Agent 犯错 → 诊断原因 → 工程化修复 → Agent 不再重犯。但这个飞轮的第一步「Agent 犯错」，需要一个前提：你能知道 Agent 犯错了。能知道，需要有一个「正确性的判据」——对照什么来判断 Agent 的输出是对是错。

如果只有代码，这个判据很难建立——代码只描述了「系统实际是什么样」，不描述「系统应该是什么样」。你只能靠人肉 review，靠跑起来看结果，靠上线后被用户发现。

Spec 的验收标准层（WHEN/THEN Scenario，即描述「在什么条件下，系统应该有什么行为」的结构化场景）提供的，正是这个判据。Agent 的实现可以被自动对照 Spec 里定义的场景来验证——覆盖了哪些 Scenario、哪些没有覆盖、哪些行为和 Spec 描述不一致。有了判据，反馈回路才能闭合；没有判据，「发现错误」这一步只能靠运气。

因此，可以得出 Harness 越强，Spec 越重要

原因很简单：Harness 是放大器。它放大 Agent 的执行能力，也放大输入给 Agent 的内容的影响。Spec 写得好，Harness 把它放大为可靠的、一致的、可验证的输出。Spec 写得差或者根本没有，Harness 把 Agent 的猜测放大为高效率地产出错误。

OpenAI 自己说得很清楚：最难的挑战不是「模型够不够强」，而是「如何设计环境、反馈回路和控制系统」。这正是 Harness Engineering 的实质——也正是 SDD 在解决的问题。

构建 SDD 体系，不是在做一件和 Harness Engineering 平行的事，而是在回答 Harness Engineering 最核心的那个追问：究竟需要什么样的 scaffolding，才能让 Agent 把我们想要的东西，既清晰可读又可强制执行地做出来？

## 参考
1. [工程技术：在智能体优先的世界中利用 Codex](https://openai.com/zh-Hans-CN/index/harness-engineering/)
2. [Harness Engineering 来了，SDD 还有意义吗？](https://mp.weixin.qq.com/s/Laz4W0180y9yGW0b6EpUMQ)
3. [Harness驾驭工程是AI平权的必经之路？](https://mp.weixin.qq.com/s/h_bnt6YFaLHSDgKSoFb6SA)