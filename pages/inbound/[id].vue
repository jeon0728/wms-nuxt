<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from '#app'
import { useInboundStore } from '~/stores/inbound'
const inboundStore = useInboundStore()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const item = ref(null as any)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  item.value = await inboundStore.getDetailById(id)
  loading.value = false
})

const markReceived = async () => {
  console.log(id)
  await inboundStore.update(id, { status: 'received' })
  // update inventory as well: call inventory store adjust or implement within backend
  router.push('/inbound')
}
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold mb-4">Inbound Detail</h1>
    <div v-if="loading">로딩중...</div>
    <div v-else-if="item">
      <div class="mb-2"><strong>SKU:</strong> {{ item.sku }}</div>
      <div class="mb-2"><strong>명칭:</strong> {{ item.name }}</div>
      <div class="mb-2"><strong>수량:</strong> {{ item.qty }}</div>
      <div class="mb-2"><strong>상태:</strong> {{ item.status }}</div>
      <div class="mt-4">
        <button v-if="item.status === 'pending'" @click="markReceived" class="px-3 py-2 bg-blue-600 text-white rounded">입고 완료</button>
        <NuxtLink to="/inbound" class="ml-2 px-3 py-2 border rounded">목록</NuxtLink>
      </div>
    </div>
    <div v-else>항목을 찾을 수 없습니다.</div>
  </div>
</template>
