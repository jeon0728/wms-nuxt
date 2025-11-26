<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useInboundStore } from '~/stores/inbound'

const inboundStore = useInboundStore()
const searchText = ref('')

onMounted(() => inboundStore.fetchList())

const search = async () => {
  const params = {
    searchText: searchText.value
  }
  //await inboundStore.fetchListBySearchText(params)
}
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-xl font-semibold">Inbound List</h1>
      <NuxtLink to="/inbound/create" class="btn">새 입고 요청</NuxtLink>
    </div>

    <div class="mb-4 flex gap-2">
      <input v-model="searchText" placeholder="SKU 검색" class="border rounded px-3 py-2" />
      <button @click="search" class="px-4 py-2 bg-blue-600 text-white rounded">검색</button>
    </div>

    <div>
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="py-2">ID</th>
            <th>SKU</th>
            <th>명칭</th>
            <th>수량</th>
            <th>상태</th>
            <th>생성일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in inboundStore.items" :key="item.id" class="border-t">
            <td class="py-2">{{ item.id }}</td>
            <td>{{ item.sku }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.status }}</td>
            <td>{{ new Date(item.createdAt).toLocaleString() }}</td>
            <td>
              <NuxtLink :to="`/inbound/${item.id}`" class="text-blue-600">상세</NuxtLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
