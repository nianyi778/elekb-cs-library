[📘 中文](./README.md) | [🇺🇸 English](./README.en.md) | [🇯🇵 日本語](./README.ja.md)
# AI Chat Box SDK – English Documentation

A lightweight, framework-agnostic frontend SDK that allows you to easily integrate an AI chat window into any webpage. It supports three flexible modes: floating popup, new browser tab, or fully custom container embedding.

---

## 📦 Installation

```bash
pnpm add ai-chat-bot-sdk
# or
npm install ai-chat-bot-sdk
# or
yarn add ai-chat-bot-sdk
```

---

## 🚀 Quick Start

### HTML Example

```html
<div id="chatContainer"></div>
<button id="chatTrigger">Open Chat</button>
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

### React Example (TypeScript)

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
      <button onClick={() => chat.toggle()}>💬 Open Chat</button>
    </>
  );
}
```

### Vue Example (Vue 3 + `<script setup>`)

```vue
<template>
  <div>
    <div ref="containerRef" class="chat-box"></div>
    <button @click="chat.toggle()">Open Chat</button>
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

## ⚠️ Configuration Notes / Exclusive Options

| Option             | Conflict/Dependency Explanation |
|--------------------|-------------------------------|
| `mode: 'popup'`    | Uses `position`; `container` is ignored |
| `mode: 'custom'`   | Requires `container`; `position` is ignored |
| `mode: 'new-tab'`  | Does not use iframe; `container`, `position`, and `styles` are ignored |
| `triggerSelector`  | Optional; auto-bind click or use `chat.toggle()` manually |
| `styles`           | Only applicable in `popup` and `custom` modes |

---

## ✨ Mode Comparison

| Mode      | Uses iframe | Supports Position | Requires Custom Container |
|-----------|-------------|-------------------|----------------------------|
| `popup`   | ✅ Yes       | ✅ Yes            | ❌ No                     |
| `new-tab` | ❌ No        | ❌ No             | ❌ No                     |
| `custom`  | ✅ Yes       | ❌ No (ignored)   | ✅ Yes                    |

---

## 🛡️ License

MIT © 2025 ELESTYLE

