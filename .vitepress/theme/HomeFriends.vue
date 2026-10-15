<script setup lang="ts">
import { friends } from './friends'
</script>

<template>
  <div class="home-friends">
    <span class="home-friends-label">友链</span>
    <a
      v-for="f in friends"
      :key="f.url"
      class="home-friends-item"
      :href="f.url"
      target="_blank"
      rel="noopener"
      :title="f.desc"
    >
      <span class="home-friends-icon">{{ f.icon }}</span>
      <span>{{ f.name }}</span>
    </a>
    <a class="home-friends-more" href="/friends">更多 →</a>
  </div>
</template>
