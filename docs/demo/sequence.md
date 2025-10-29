---
title: 序列图
description: 在markdown里实现序列图
sidebar: true  # 此页面不显示侧边栏
navbar: true    # 显示导航栏（默认）
---


# 配置
```plaintext
sequenceDiagram
participant Alice
participant Bob
Alice->John: Hello John, how are you?
  loop Healthcheck
John->John: Fight against hypochondria
end
Note right of John: Rational thoughts <br/>prevail...
John-->Alice: Great!
John->Bob: How about you?
  Bob-->John: Jolly good!
```

# 语法
````markdown
```mermaid

```
````


# 示例
![sequenceDiagram](/sequenceDiagram.png)
