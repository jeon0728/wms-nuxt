<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const email = ref<string>('')
const password = ref<string>('')
const authStroe = useAuthStore()
const router = useRouter()
const error = ref<string>('')

const onLogin = async () => {
  error.value = ''
  const ok = await authStroe.login({ email: email.value, password: password.value })
  if (ok) {
    navigateTo('/inbound');
  } else {
    error.value = '로그인 실패: 이메일/비밀번호 확인'
  }
}

const onRefreshTest = async () => {
  error.value = ''
  const useYn = await authStroe.refreshToken()
  console.log('access token 존재여부:', useYn)
  console.log('새 토큰:', authStroe.accessToken)
  
}

definePageMeta({ //초기화면 설정
  layout: 'auth'
});


</script>

<template>
  <div class="login">
    <h2 style="margin-bottom: 20px;">Login</h2>

    <BaseInput
      label="Email"
      v-model="email"
      type="email"
    />

    <BaseInput
      label="Password"
      v-model="password"
      type="password"
      style="margin-top: 12px;"
    />

    <BaseButton
      style="margin-top: 20px; width: 100%;"
      @click="onLogin"
    >
      Login
    </BaseButton>

    <div v-if="error">{{ error }}</div>

  </div>
</template>
