<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
const router = useRouter();

</script>

<template>
  <header class="d-flex justify-content-center py-3">
    <ul class="nav nav-pills">
      <li class="nav-item">
        <RouterLink to="/" class="nav-link" :class="{ active: router.currentRoute.value.path === '/' }">Home
        </RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/qr" class="nav-link" :class="{ active: router.currentRoute.value.path === '/qr' }">QR
        </RouterLink>
      </li>
      <li class="nav-item"><a href="#" class="nav-link">Map</a></li>
      <li class="nav-item"><a href="#" class="nav-link">Pricing</a></li>
      <li class="nav-item"><a href="#" class="nav-link">FAQs</a></li>
      <li class="nav-item"><a href="#" class="nav-link">About</a></li>
    </ul>
  </header>

  <RouterView />
</template>