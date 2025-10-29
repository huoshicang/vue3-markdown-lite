---
title: 高效绘制流程图
description: 在markdown里实现高效绘制流程图
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 配置
```plaintext
graph TD
A[用户请求] --> B[语义解析]
B --> C[RAG检索]

C -->|✅ 知识库匹配| D[上下文增强]
C -->|❌ 无匹配| E[任务分解]

D --> E

E --> F{工具选择}

F -->|🛠️ 核心工具| G{基础操作}
F -->|🔌 MCP扩展服务| H{MCP操作}

G -->|✏️ 文件操作| I[读写/替换]
G -->|🖥️ 系统命令执行| J[执行命令]
G -->|🔍 代码分析| K[代码分析]

H -->|⚙️ 使用MCP工具| L[使用MCP工具]
H -->|📦 访问MCP资源| M[访问MCP资源]

I --> N[结果验证]
J --> N
K --> N
L --> N
M --> N

N --> O{完成判断}

O -->|✅| P[提交最终结果]
O -->|❌| E
```

# 语法
````markdown
```mermaid

```
````


# 示例
![graph](/graph.png)
