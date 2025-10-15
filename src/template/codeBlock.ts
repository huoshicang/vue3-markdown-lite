import {html, render} from 'lit-html';

class CodeBlock extends HTMLElement {
  // 监听的属性
  static readonly observedAttributes = ['default-expanded', 'expanded'];

  private shadowRoot: ShadowRoot | null = null;
  private expanded: boolean = true;
  private copy: boolean = false;
  private collapse: boolean = false;

  /**
   * 连接到 DOM 时调用
   */
  connectedCallback(): void {
    // 创建 shadow root
    this.shadowRoot = this.attachShadow({mode: 'open'});

    // 获取初始属性
    const defaultExpanded = this.getAttribute('default-expanded');
    if (defaultExpanded !== null) {
      this.expanded = defaultExpanded === 'true';
    }
    this.copy = this.getAttribute('copy-coder') === 'true';
    this.collapse = this.getAttribute('collapse') === 'true';

    // 初始渲染
    this.renderCompontent();


  }

  /**
   * 属性变化回调
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue === newValue) return;

    if (name === 'expanded') {
      this.expanded = newValue === 'true';
      this.updateExpandState();
    }
  }

  /**
   * 更新展开状态
   */
  private updateExpandState(): void {
    if (!this.collapse || !this.shadowRoot) return;

    this.expanded = !this.expanded;
    const codeContent = this.shadowRoot.querySelector('.code-content');
    const expand = this.shadowRoot.querySelector('.expand');
    const folding = this.shadowRoot.querySelector('.folding');

    // 确保元素存在
    if (codeContent) {
      if (this.expanded) {
        codeContent.style.maxHeight = codeContent.scrollHeight + 'px';
        if (expand) expand.classList.remove('none');
        if (folding) folding.classList.add('none');
      } else {
        codeContent.style.maxHeight = '0';
        if (expand) expand.classList.add('none');
        if (folding) folding.classList.remove('none');
      }
    }
  }

  /**
   * 复制代码
   */
  private copyCode(event: Event): void {
    event.stopPropagation();
    if (!this.shadowRoot) return;

    const copyBtn = this.shadowRoot.querySelector('.copy-btn');
    const myTextSlot = this.shadowRoot.querySelector('slot[name="code"]');
    const assignedNodes = myTextSlot?.assignedNodes();

    if (copyBtn && assignedNodes && assignedNodes.length > 0) {
      const codeText = (assignedNodes[0] as HTMLElement)?.innerText;
      if (codeText) {
        navigator.clipboard.writeText(codeText).then(() => {
          // 改变按钮状态
          copyBtn.classList.add('copy-success');

          // 2秒后恢复
          setTimeout(() => copyBtn.classList.remove('copy-success'), 2000);
        }).catch(err => console.error('复制失败:', err));
      }
    }
  }

  /**
   * 渲染组件
   */
  private renderCompontent(): void {
    if (!this.shadowRoot) return;

    render(this.htmlTemplate(), this.shadowRoot);
  }

  /**
   * HTML模板
   */
  private htmlTemplate() {
    return html`
      <style>
        :host {
          display: block;
          margin-bottom: 1rem;
        }

        .code-block {
          border: 1px solid var(--borderColor-default);
          border-radius: 8px;
          overflow: hidden;
          background: var(--bgColor-muted);
          color: var(--fgColor-default);
          margin-bottom: var(--base-size-16);
        }

        .code-header {
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          border-bottom: 1px solid rgba(192, 191, 191, 0.44);
          background: var(--bgColor-muted);
          color: var(--fgColor-default);
        }

        .code-content {
          overflow: hidden;
          transition: max-height 0.3s ease-in-out;
        }

        .code-pre {
          padding: 1rem;
          overflow-x: auto;
          font-family: 'MapleMono-NF-CN-ExtraBold', sans-serif;
          font-size: 0.875rem;
          margin: 0;
          line-height: 1.5;
          background: var(--bgColor-default);
          color: var(--fgColor-default);
        }

        .icon {
          width: 1rem;
          height: 1rem;
        }

        .copy-btn {
          color: var(--fgColor-default);
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .copy-btn:hover {
          transform: scale(1.05);
        }

        .copy-btn.copy-success {
          color: #28a745;
        }

        .toggle-btn {
          color: var(--fgColor-default);
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s ease;
          margin-right: 0.5rem;
        }

        .code-header:hover .toggle-btn {
          color: #398ce0;
        }

        .language {
          margin-left: 5px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--fgColor-default);
          font-family: 'MapleMono-NF-CN-ExtraBold', sans-serif;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .none {
          display: none;
        }
      </style>

      <div class="code-block">
        <div class="code-header" @click=${this.updateExpandState.bind(this)}>
          <div class="header-left">
            <!-- 折叠按钮 -->
            <i class="expand ${!this.expanded ? 'none' : ''}">
              <!-- 展开图标 -->
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                  d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  fill="currentColor"/>
              </svg>
            </i>
            <i class="folding ${this.expanded ? 'none' : ''}">
              <!-- 折叠图标 -->
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                  fill="currentColor"/>
              </svg>
            </i>
            <span class="language"><slot name="languageName"></slot></span>
          </div>
          <!--复制-->
          <i @click=${this.copyCode.bind(this)} class="${this.copy ? '' : 'none'}">
            <svg class="copy-btn icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-200.6c0-17.4-7.1-34.1-19.7-46.2L370.6 17.8C358.7 6.4 342.8 0 326.3 0L192 0zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-64 0l0 16-192 0l0-256 16 0l0-64-16 0z"
                fill="currentColor"/>
            </svg>
          </i>
        </div>
        <div class="code-content" style="max-height: ${this.expanded ? 'none' : '0'}">
          <pre class="code-pre"><slot name="code"></slot></pre>
        </div>
      </div>
    `;
  }
}

customElements.define('code-block', CodeBlock);
