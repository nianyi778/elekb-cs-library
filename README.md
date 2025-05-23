[📘 中文](./README.md) | [🇺🇸 English](./README.en.md) | [🇯🇵 日本語](./README.ja.md)
# AI Chat Box SDK 中文文档

一个轻量、框架无关的前端 SDK，帮助你快速集成 AI 聊天对话框，可在任意页面中以浮窗、独立页面或自定义容器方式打开。

---

## 📦 安装方式

```bash
pnpm add ai-chat-bot-sdk
# 或
npm install ai-chat-bot-sdk
# 或
yarn add ai-chat-bot-sdk
```

---

## 🚀 快速开始

### HTML 示例
```html
<div id="chatContainer"></div>
<button id="chatTrigger">打开聊天</button>
<script src="./dist/ai-chat-bot-sdk.umd.js"></script>
<script>
  const chat = new window.AIChatBox({
    url: 'https://chat.example.com',
    mode: 'custom',
    container: '#chatContainer',
    triggerSelector: '#chatTrigger',
    user: { id: 'htmlUser' }
  });
  chat.init();
</script>
```

### React 示例（TS）
```tsx
import { useEffect, useRef } from 'react';
import { AIChatBox } from 'ai-chat-bot-sdk';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chat = new AIChatBox({
      url: 'https://chat.example.com',
      mode: 'custom',
      container: containerRef.current!,
      user: { id: 'reactUser' }
    });
    chat.init();
  }, []);

  return (
    <>
      <div ref={containerRef} style={{ width: 400, height: 600 }} />
      <button onClick={() => chat.toggle()}>💬 打开聊天</button>
    </>
  );
}
```

### Vue 示例（Vue 3 + `<script setup>`）
```vue
<template>
  <div>
    <div ref="containerRef" class="chat-box"></div>
    <button @click="chat.toggle()">打开聊天</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AIChatBox } from 'ai-chat-bot-sdk';

const containerRef = ref<HTMLElement | null>(null);
let chat: AIChatBox;

onMounted(() => {
  chat = new AIChatBox({
    url: 'https://chat.example.com',
    mode: 'custom',
    container: containerRef.value!,
    user: { id: 'vueUser' }
  });
  chat.init();
});
</script>

<style>
.chat-box {
  width: 420px;
  height: 580px;
  border: 1px solid #ccc;
}
</style>
```

---

## ⚠️ 配置项注意事项 / 互斥项说明

| 配置项         | 冲突/依赖关系说明 |
|----------------|------------------|
| `mode: 'popup'` | 可用 `position`, 不使用 `container` |
| `mode: 'custom'` | 必须设置 `container`，`position` 无效 |
| `mode: 'new-tab'` | 不使用 `iframe`，`container` / `position` / `styles` 均无效 |
| `triggerSelector` | 可选，用于自动触发，亦可手动调用 `chat.toggle()` |
| `styles` | 自定义 iframe 样式，仅 `popup`/`custom` 有效 |

---

## ✨ 三种模式对比

| 模式       | 是否插入 iframe | 是否支持定位 | 是否支持自定义容器 |
|------------|------------------|---------------|----------------------|
| `popup`    | ✅ 是            | ✅ `position`  | ❌ 无需容器           |
| `new-tab`  | ❌ 否            | ❌ 无          | ❌ 无                |
| `custom`   | ✅ 是            | ❌ 忽略定位    | ✅ 需要 `container` |

---

## 🛡️ 开源协议

MIT © 2025 ELESTYLE