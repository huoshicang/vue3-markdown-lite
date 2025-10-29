// 校验元素是否为 div.markdown-body
const validateMarkdownBody = (element: HTMLElement): boolean => {
  return element.tagName.toLowerCase() === 'div' && element.classList.contains('markdown-body');
};

/**
 * 等待元素内所有图片加载完成
 */
const waitForImagesLoad = (element: HTMLElement): Promise<void> => {
  const images = Array.from(element.querySelectorAll('img'));
  if (images.length === 0) return Promise.resolve();

  // 等待所有图片加载完成（包括base64图片）
  const imageLoadPromises = images.map(img => {
    return new Promise((resolve) => {
      // 图片已加载完成
      if (img.complete) {
        resolve(true);
        return;
      }
      // 监听加载完成事件
      img.onload = () => resolve(true);
      // 忽略错误（避免一张图失败导致整体卡住）
      img.onerror = () => resolve(true);
    });
  });

  return Promise.all(imageLoadPromises).then(() => {});
};

/**
 * 导出HTML内容为PDF（保留水印状态）
 * @param element 要导出的DOM元素
 * @param filename 文件名
 * @param hasWatermark 是否包含水印
 */
export async function exportToPDF(
  element: HTMLElement,
  filename = 'document.pdf',
  hasWatermark: boolean = true
) {
  // 检查是否在浏览器环境
  if (typeof window === 'undefined') {
    console.error('导出PDF功能仅在浏览器环境中可用');
    return;
  }

  if (!validateMarkdownBody(element)) {
    console.error('导出失败：目标元素不是 div.markdown-body');
    return;
  }

  try {
    // 动态导入 html2pdf.js
    const { default: html2pdf } = await import('html2pdf.js');
    
    // 1. 等待所有图片加载完成
    await waitForImagesLoad(element);

    // 2. 克隆元素（包含已加载的图片）
    const clone = element.cloneNode(true) as HTMLElement;

    // 处理水印
    if (!hasWatermark) {
      const watermark = clone.querySelector('.markdown-watermark');
      if (watermark) watermark.remove();
    }

    // 3. 配置html2canvas，解决跨域图片问题
    const opt = {
      margin: 10,
      filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 4. 创建临时容器，避免影响原页面
    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'fixed';
    tempContainer.style.top = '-9999px';
    tempContainer.style.left = '-9999px';
    tempContainer.style.width = `${element.offsetWidth}px`;
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);

    // 5. 执行导出，完成后清理
    try {
      await html2pdf().from(clone).set(opt).save();
    } finally {
      document.body.removeChild(tempContainer);
    }
  } catch (error) {
    console.error('导出PDF失败:', error);
  }
}
