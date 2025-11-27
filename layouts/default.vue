<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <div class="font-bold">Mini WMS</div>

        <nav class="flex gap-4">
          <NuxtLink to="/" class="hover:underline">Dashboard</NuxtLink>
          <NuxtLink to="/inbound" class="hover:underline">Inbound</NuxtLink>
          <NuxtLink to="/inventory" class="hover:underline">Inventory</NuxtLink>
          <NuxtLink to="/outbound" class="hover:underline">Outbound</NuxtLink>
        </nav>

        <!-- 오른쪽 사용자 영역 -->
        <div class="flex items-center gap-3">
          <!-- 로그인 상태 UI -->
          <template v-if="isLoggedIn">
            <span class="text-sm opacity-90">👋 {{ user?.name }}님</span>

            <button
              @click="refresh"
              class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
            >
              연장
            </button>

            <button
              @click="logout"
              class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
            >
              로그아웃
            </button>
          </template>

          <!-- 로그아웃 상태 UI -->
          <template v-else>
            <NuxtLink
              to="/login"
              class="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
            >
              로그인
            </NuxtLink>
          </template>
        </div>
      </div>
    </header>

    <main class="container mx-auto mt-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
const authStroe = useAuthStore()

const user = computed(() => authStroe.user)
const isLoggedIn = computed(() => authStroe.isLoggedIn)

const logout = () => authStroe.logout()

// 🔄 refresh token 요청 (백엔드가 refresh endpoint 있어야 동작)
const refresh = async () => {
  const useYn = await authStroe.refreshToken()
  console.log('access token 존재여부:', useYn)
  console.log('새 토큰:', authStroe.accessToken)
}
</script>
