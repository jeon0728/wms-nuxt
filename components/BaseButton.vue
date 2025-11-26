<template>
  <button
    class="base-btn"
    :disabled="disabled"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = defineProps({
  disabled: Boolean
});
const emit = defineEmits(["click"]);
</script>

<style scoped>
.base-btn {
  height: 40px;
  padding: 0 16px;
  background: #2563eb;
  border-radius: 6px;
  color: white;
  border: none;
  cursor: pointer;
}

.base-btn:disabled {
  background: #93a3b8;
  cursor: not-allowed;
}
</style>
