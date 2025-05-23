<template>
  <div style="padding: 40px">
    <h1>AI Chat Box SDK - Vue 示例</h1>
    <button @click="toggleChat">💬 打开聊天</button>
    <Custom />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import AIChatBot from '../../../';
import Custom from './Custom.vue';

const chat = new AIChatBot({
  url: 'https://elekb.io/entrance',
  styles: {
    width: '400px',
    height: '600px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#fff',
    color: '#333',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  triggerSelector: '#chatTrigger',
  payload: {
    uuid: '1231231231',
    sessionId: '1231231231',
    lang: 'en-US',
    user: {
      id: 'j.t',
      name: 'React User',
    }
  }
});

onMounted(() => chat.init());

function toggleChat() {
  chat.toggle();
}
</script>