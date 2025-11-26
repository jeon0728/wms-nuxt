<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :type="type"
      v-bind="$attrs" 
      :value="modelValue"
      @input="updateValue"
      class="base-input"
    />
  </div>
  <!-- 
    v-bind: 단순속성값 (placeholder, maxlength)
    :value: 실제 값을 받기 위함
  -->
</template>

<script setup lang="ts">
const props = defineProps({
  modelValue: String,
  type: { type: String, default: "text" },
  label: String
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<style scoped>
.base-input {
  width: 93%;
  height: 38px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
</style>

