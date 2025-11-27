<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from '#app'
import { useInboundStore } from '~/stores/inbound'

const router = useRouter()
const inboundStore = useInboundStore()
const sku = ref('')
const name = ref('')
const qty = ref<number | null>(null)
const location = ref('')
const creating = ref(false)

const submit = async () => {
  creating.value = true
  await inboundStore.create({ sku: sku.value, name: name.value, qty: qty.value ?? 0, status:'pending', location: location.value })
  creating.value = false
  router.push('/inbound')
}
</script>

<template>
  <div class="p-6 max-w-lg">
    <h1 class="text-lg font-semibold mb-4">새 입고 요청</h1>
    <div class="space-y-3">
      <input v-model="sku" placeholder="SKU" class="w-full border rounded px-3 py-2" />
      <input v-model="name" placeholder="상품명" class="w-full border rounded px-3 py-2" />
      <input type="number" v-model.number="qty" placeholder="수량" class="w-full border rounded px-3 py-2" />
      <input v-model="location" placeholder="위치" class="w-full border rounded px-3 py-2" />
      <div class="flex gap-2">
        <button @click="submit" :disabled="creating" class="px-4 py-2 bg-green-600 text-white rounded">등록</button>
        <NuxtLink to="/inbound" class="px-4 py-2 border rounded">취소</NuxtLink>
      </div>
    </div>
  </div>
</template>
