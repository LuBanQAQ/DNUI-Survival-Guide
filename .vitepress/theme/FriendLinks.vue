<script setup lang="ts">
import { friends } from './friends'
</script>

<template>
  <div class="friend-links">
    <a
      v-for="f in friends"
      :key="f.url"
      class="friend-card"
      :href="f.url"
      target="_blank"
      rel="noopener"
    >
      <span class="friend-icon">{{ f.icon }}</span>
      <span class="friend-info">
        <span class="friend-name">{{ f.name }}</span>
        <span class="friend-desc">{{ f.desc }}</span>
        <span class="friend-domain">{{ f.domain }}</span>
      </span>
    </a>
  </div>
</template>
