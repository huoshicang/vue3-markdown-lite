import{_ as s,c as n,o as p,ae as e}from"./chunks/framework.DVxWJi2S.js";const l="/vue3-markdown-lite/graph.png",m=JSON.parse('{"title":"高效绘制流程图","description":"在markdown里实现高效绘制流程图","frontmatter":{"title":"高效绘制流程图","description":"在markdown里实现高效绘制流程图","sidebar":true,"navbar":true},"headers":[],"relativePath":"demo/graph.md","filePath":"demo/graph.md"}'),t={name:"demo/graph.md"};function i(c,a,r,o,d,g){return p(),n("div",null,[...a[0]||(a[0]=[e(`<h1 id="配置" tabindex="-1">配置 <a class="header-anchor" href="#配置" aria-label="Permalink to &quot;配置&quot;">​</a></h1><div class="language-plaintext vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plaintext</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>graph TD</span></span>
<span class="line"><span>A[用户请求] --&gt; B[语义解析]</span></span>
<span class="line"><span>B --&gt; C[RAG检索]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>C --&gt;|✅ 知识库匹配| D[上下文增强]</span></span>
<span class="line"><span>C --&gt;|❌ 无匹配| E[任务分解]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>D --&gt; E</span></span>
<span class="line"><span></span></span>
<span class="line"><span>E --&gt; F{工具选择}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>F --&gt;|🛠️ 核心工具| G{基础操作}</span></span>
<span class="line"><span>F --&gt;|🔌 MCP扩展服务| H{MCP操作}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>G --&gt;|✏️ 文件操作| I[读写/替换]</span></span>
<span class="line"><span>G --&gt;|🖥️ 系统命令执行| J[执行命令]</span></span>
<span class="line"><span>G --&gt;|🔍 代码分析| K[代码分析]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>H --&gt;|⚙️ 使用MCP工具| L[使用MCP工具]</span></span>
<span class="line"><span>H --&gt;|📦 访问MCP资源| M[访问MCP资源]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>I --&gt; N[结果验证]</span></span>
<span class="line"><span>J --&gt; N</span></span>
<span class="line"><span>K --&gt; N</span></span>
<span class="line"><span>L --&gt; N</span></span>
<span class="line"><span>M --&gt; N</span></span>
<span class="line"><span></span></span>
<span class="line"><span>N --&gt; O{完成判断}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>O --&gt;|✅| P[提交最终结果]</span></span>
<span class="line"><span>O --&gt;|❌| E</span></span></code></pre></div><h1 id="语法" tabindex="-1">语法 <a class="header-anchor" href="#语法" aria-label="Permalink to &quot;语法&quot;">​</a></h1><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`mermaid</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`</span></span></code></pre></div><h1 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h1><p><img src="`+l+'" alt="graph"></p>',6)])])}const u=s(t,[["render",i]]);export{m as __pageData,u as default};
