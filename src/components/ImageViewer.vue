<template>
  <div class="image-viewer">
    <!-- 缩略图 -->
    <img
      :src="originalSrc"
      class="preview-thumbnail"
      @click="openViewer"
      :alt="altText"
      loading="lazy"
    >
    
    <!-- 图片查看器弹窗 -->
    <div v-if="isViewerOpen" class="image-viewer-modal" @click="closeViewer">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <span class="modal-title">{{ altText || '图片预览' }}</span>
          <button class="modal-close" @click="closeViewer">&times;</button>
        </div>
        
        <div class="image-container">
          <img
            :src="processedSrc"
            class="processed-image"
            :alt="altText"
          >
        </div>
        
        <div class="image-controls">
          <div class="control-group">
            <label>缩放: {{ scale * 100 }}%</label>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              :value="scale * 100"
              @input="handleScaleChange"
            >
          </div>
          
          <div class="control-group">
            <label>旋转: {{ rotate }}°</label>
            <input
              type="range"
              min="0"
              max="360"
              step="15"
              :value="rotate"
              @input="handleRotateChange"
            >
          </div>
          
          <div class="control-buttons">
            <button @click="handleFlipX">水平翻转</button>
            <button @click="handleFlipY">垂直翻转</button>
            <button @click="resetImage">重置</button>
            <button @click="downloadImage">下载图片</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue';
import {getImageInfo, ImageProcessOptions, processImage} from '@/utils/image-processor';

const props = defineProps<{
  src: string;
  alt?: string;
}>();

// 状态管理
const isViewerOpen = ref(false);
const originalSrc = ref(props.src);
const processedSrc = ref(props.src);
const altText = ref(props.alt || '');
const imageInfo = ref<any>(null);

// 处理参数
const scale = ref(1);
const rotate = ref(0);
const flipX = ref(false);
const flipY = ref(false);

// 初始化获取图片信息
onMounted(async () => {
  imageInfo.value = await getImageInfo(props.src);
});

// 计算处理选项
const processOptions = computed<ImageProcessOptions>(() => ({
  scale: scale.value,
  rotate: rotate.value,
  flipX: flipX.value,
  flipY: flipY.value
}));

// 打开查看器
const openViewer = () => {
  isViewerOpen.value = true;
  // 初始化为原始图片
  processedSrc.value = originalSrc.value;
};

// 关闭查看器
const closeViewer = () => {
  isViewerOpen.value = false;
  resetImage();
};

// 处理图片变更
const handleImageProcess = async () => {
  
  try {
    processedSrc.value = await processImage(originalSrc.value, processOptions.value);
  } catch (error) {
    console.error('处理图片失败:', error);
  }
};

// 缩放变更
const handleScaleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  scale.value = parseInt(value) / 100;
  handleImageProcess();
};

// 旋转变更
const handleRotateChange = (e: Event) => {
  rotate.value = parseInt((e.target as HTMLInputElement).value);
  handleImageProcess();
};

// 水平翻转
const handleFlipX = () => {
  flipX.value = !flipX.value;
  handleImageProcess();
};

// 垂直翻转
const handleFlipY = () => {
  flipY.value = !flipY.value;
  handleImageProcess();
};

// 重置图片
const resetImage = () => {
  scale.value = 1;
  rotate.value = 0;
  flipX.value = false;
  flipY.value = false;
  processedSrc.value = originalSrc.value;
};

// 下载图片
const downloadImage = async () => {
  try {
    const link = document.createElement('a');
    link.href = processedSrc.value;
    link.download = `processed-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('下载图片失败:', error);
  }
};

watch(
  [() => scale.value, () => rotate.value, () => flipX.value, () => flipY.value],
  async () => {
    console.log('参数变化，重新处理图片');
    try {
      processedSrc.value = await processImage(originalSrc.value, {
        scale: scale.value,
        rotate: rotate.value,
        flipX: flipX.value,
        flipY: flipY.value
      }); // 关键：更新视图绑定的src
    } catch (err) {
      console.error('参数变化后处理失败:', err);
    }
  }
);
</script>

<style scoped>
.image-viewer {
  display: inline-block;
  position: relative;
}

.preview-thumbnail {
  max-width: 100%;
  height: auto;
  cursor: zoom-in;
  transition: all 0.3s ease;
}

.preview-thumbnail:hover {
  opacity: 0.9;
  transform: scale(1.02);
}

.image-viewer-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.modal-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.image-container {
  padding: 1rem;
  flex: 1;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.processed-image {
  max-width: 100%;
  max-height: 60vh;
  transition: all 0.3s ease;
}

.image-controls {
  padding: 1rem;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.control-group {
  margin-bottom: 1rem;
}

.control-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.control-group input {
  width: 100%;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.control-buttons button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.control-buttons button:hover {
  background-color: #359e75;
}
</style>
