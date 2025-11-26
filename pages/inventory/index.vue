<script setup lang="ts">
import { onMounted } from 'vue'
import { useInventoryStore } from '~/stores/inventory'
const store = useInventoryStore()
onMounted(() => store.fetchAll())
</script>

<template>
  <div class="p-6">
    <h1 class="text-xl font-semibold mb-4">Inventory</h1>
    <table class="min-w-full bg-white">
      <thead><tr><th>ID</th><th>SKU</th><th>명칭</th><th>수량</th><th>위치</th></tr></thead>
      <tbody>
        <tr v-for="it in store.list" :key="it.id" class="border-t">
          <td class="py-2">{{ it.id }}</td>
          <td>{{ it.sku }}</td>
          <td>{{ it.name }}</td>
          <td>{{ it.qty }}</td>
          <td>{{ it.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
