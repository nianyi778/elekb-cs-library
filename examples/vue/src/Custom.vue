<template>
    <div class="wrapper">
      <h1>Vue - 自定义容器模式</h1>
      <div ref="chatContainer" class="chat-box"></div>
      <button @click="toggleChat">💬 打开 Chat</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import  AIChatBox  from '../../../';
  
  const chatContainer = ref<HTMLDivElement | null>(null);
  let chat: AIChatBox;
  
  onMounted(() => {
    chat = new AIChatBox({
      mode: 'custom',
      url: 'https://elekb.io/entrance',
      container: chatContainer.value!,
      payload:{
        uuid: '1231231231',
        sessionId: '1231231231',
        lang: 'en',
        user: {
          id: 'j.t',
          name: 'React User',
        }
      }
    });
    chat.init();
  });
  
  function toggleChat() {
    chat.toggle();
  }
  </script>
  
  <style>
  .chat-box {
    width: 500px;
    height: 600px;
    border-radius: 10px;
    overflow: hidden;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  </style>