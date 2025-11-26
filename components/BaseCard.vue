<template>
  <div class="base-card">
    <slot />
  </div>
</template>

<style scoped>
.base-card {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
}
</style>
