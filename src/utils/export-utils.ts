import html2pdf from 'html2pdf.js';

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
export async function exportToPDF(  // 改为async函数，等待图片加载
  element: HTMLElement,
  filename = 'document.pdf',
  hasWatermark: boolean = true
) {
  if (!validateMarkdownBody(element)) {
    console.error('导出失败：目标元素不是 div.markdown-body');
    return;
  }

  // 1. 等待所有图片加载完成（关键步骤）
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
    image: { type: 'jpeg', quality: 0.95 }, // 适当降低质量，避免文件过大
    html2canvas: {
      scale: 2, // 提高缩放比，保证清晰度
      useCORS: true, // 允许跨域图片（关键）
      allowTaint: true, // 允许tainted画布（跨域图片会导致画布tainted，但不影响导出）
      logging: false // 关闭日志
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // 4. 创建临时容器，避免影响原页面
  const tempContainer = document.createElement('div');
  tempContainer.style.position = 'fixed';
  tempContainer.style.top = '-9999px';
  tempContainer.style.left = '-9999px';
  tempContainer.style.width = `${element.offsetWidth}px`; // 保持原始宽度
  tempContainer.appendChild(clone);
  document.body.appendChild(tempContainer);

  // 5. 执行导出，完成后清理
  try {
    await html2pdf().from(clone).set(opt).save();
  } finally {
    document.body.removeChild(tempContainer);
  }
}
