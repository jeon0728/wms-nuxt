<template>
  <div class="auth-wrapper">
    <div class="auth-box">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f2f4f7;
}

.auth-box {
  width: 380px;
  padding: 32px;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}
</style>
