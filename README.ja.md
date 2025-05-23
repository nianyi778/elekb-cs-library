[📘 中文](./README.md) | [🇺🇸 English](./README.en.md) | [🇯🇵 日本語](./README.ja.md)
# AI Chat Box SDK – 日本語ドキュメント

AI チャットボックスをあらゆる Web ページに簡単に埋め込むための軽量 SDK です。フローティングポップアップ、新しいタブ、カスタムコンテナの 3 つのモードをサポートし、HTML、React、Vue に対応しています。

---

## 📦 インストール方法

```bash
pnpm add ai-chat-bot-sdk
# または
npm install ai-chat-bot-sdk
# または
yarn add ai-chat-bot-sdk
```

---

## 🚀 クイックスタート

### HTML の例
```html
<div id="chatContainer"></div>
<button id="chatTrigger">チャットを開く</button>
<script src="./dist/ai-chat-bot-sdk.umd.js"></script>
<script>
  const chat = new window.AIChatBot({
    url: 'https://chat.example.com',
    mode: 'custom',
    container: '#chatContainer',
    triggerSelector: '#chatTrigger',
    user: { id: 'htmlUser' }
  });
  chat.init();
</script>
```

### React の例（TypeScript）
```tsx
import { useEffect, useRef } from 'react';
import { AIChatBot } from 'ai-chat-bot-sdk';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chat = new AIChatBot({
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
      <button onClick={() => chat.toggle()}>💬 チャットを開く</button>
    </>
  );
}
```

### Vue の例（Vue 3 + `<script setup>`）
```vue
<template>
  <div>
    <div ref="containerRef" class="chat-box"></div>
    <button @click="chat.toggle()">チャットを開く</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { AIChatBot } from 'ai-chat-bot-sdk';

const containerRef = ref<HTMLElement | null>(null);
let chat: AIChatBot;

onMounted(() => {
  chat = new AIChatBot({
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

## ⚠️ モードごとの注意点 / 排他的な設定

| 設定項目              | 説明 |
|------------------------|------|
| `mode: 'popup'`        | `position` 使用可能、`container` は無視される |
| `mode: 'custom'`       | `container` 必須、`position` は無効 |
| `mode: 'new-tab'`      | iframe を使用せず、すべてのレイアウト関連設定は無効 |
| `triggerSelector`      | 任意。クリックで自動起動するか、`chat.toggle()` を手動で呼び出せる |
| `styles`               | iframe のスタイル。`popup` と `custom` モードでのみ使用可能 |

---

## ✨ モードの比較表

| モード       | iframe 使用 | 位置指定サポート | コンテナ指定必要 |
|--------------|-------------|------------------|------------------|
| `popup`      | ✅ はい      | ✅ 可能           | ❌ 不要           |
| `new-tab`    | ❌ いいえ    | ❌ 無効           | ❌ 無効           |
| `custom`     | ✅ はい      | ❌ 無効           | ✅ 必須           |

---

## 🛡️ ライセンス

MIT © 2025 ELESTYLE

