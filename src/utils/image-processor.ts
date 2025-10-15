import {Jimp} from 'jimp';

export interface ImageProcessOptions {
  scale?: number;
  rotate?: number;
  flipX?: boolean;
  flipY?: boolean;
}

export async function processImage(
  url: string,
  options: ImageProcessOptions = {}
): Promise<string> {
  try {
    // 1. 读取图片
    const image = await Jimp.read(url);

    // 2. 应用处理（确保参数有效）
    if (options.scale && typeof options.scale === 'number' && options.scale > 0 && options.scale !== 1) {
      image.scale(options.scale);
    }
    if (options.rotate && typeof options.rotate === 'number') {
      const safeRotate = ((options.rotate % 360) + 360) % 360; // 确保角度在0-360
      image.rotate(safeRotate);
    }
    if (options.flipX) {
      image.flip(true, false);
    }
    if (options.flipY) {
      image.flip(false, true);
    }

    // 3. 解析扩展名（加强容错）
    let extension = 'png'; // 默认扩展名
    try {
      // 处理复杂URL（含参数、哈希、多级路径）
      const cleanUrl = url.split('?')[0].split('#')[0]; // 移除参数和哈希
      const fileName = cleanUrl.split('/').pop() || ''; // 取最后一段作为文件名
      const parts = fileName.split('.');
      if (parts.length > 1) {
        extension = parts.pop()?.toLowerCase() || 'png'; // 取最后一个.后的内容
      }
    } catch (e) {
      console.warn('解析扩展名失败，使用默认值png:', e);
      extension = 'png';
    }

    // 4. 映射MIME类型（确保绝对有值）
    const mimeMap: Record<string, string> = {
      png: Jimp.MIME_PNG,
      jpg: Jimp.MIME_JPEG,
      jpeg: Jimp.MIME_JPEG,
      gif: Jimp.MIME_GIF,
      bmp: Jimp.MIME_BMP,
      webp: Jimp.MIME_WEBP,
      // 覆盖可能的其他扩展名，全部默认到PNG
      default: Jimp.MIME_PNG
    };
    // 无论解析出什么扩展名，都确保MIME类型有效
    const mimeType = mimeMap[extension] || mimeMap.default;

    // 5. 生成Base64（最终校验MIME类型）
    if (!mimeType) {
      throw new Error('无法确定有效的MIME类型');
    }

    return new Promise((resolve, reject) => {
      image.getBase64(mimeType, (err, base64) => {
        if (err) {
          console.error('生成Base64失败:', err);
          // 终极容错：即使指定类型失败，强制用PNG重试
          image.getBase64(Jimp.MIME_PNG, (finalErr, finalBase64) => {
            if (finalErr) reject(finalErr);
            else resolve(finalBase64);
          });
        } else {
          resolve(base64);
        }
      });
    });

  } catch (error) {
    console.error('图片处理总错误:', error);
    throw new Error('图片处理失败（MIME类型错误或网络问题）');
  }
}

export async function getImageInfo(url: string) {
  try {
    const image = await Jimp.read(url);
    return {
      width: image.bitmap.width,
      height: image.bitmap.height,
      // 容错处理：如果无法识别类型，返回默认值
      type: image.getMIME?.() || 'image/unknown'
    };
  } catch (error) {
    console.error('获取图片信息失败:', error);
    return null;
  }
}
