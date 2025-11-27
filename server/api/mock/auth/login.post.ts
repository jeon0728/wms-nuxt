import { defineEventHandler, readBody } from 'h3'
import { getUserDB } from '~/server/db/mockUser'
import { LoginResponse } from '~/types/auth'

export default defineEventHandler(async (event) => {
  // const body = await readBody(event)

  // // 아주 단순한 로그인 체크
  // if (body.email === 'test' && body.password === '1234') {
  //   // 정상 발급했다고 가정
  //   return {
  //     accessToken: 'mock-access-token-123',
  //     refreshToken: 'mock-refresh-token-456'
  //   }
  // }

  // return {
  //   status: 401,
  //   message: 'Invalid credentials'
  // }

  const { email, password } = await readBody(event)

  if (!email || !password) {
    return {
      status: 400,
      message: '이메일과 비밀번호를 입력해주세요.',
      data: null
    }
  }

  // DB 조회
  const users = await getUserDB()
  const user = users.find(u => u.email === email && u.password === password)

  if (!user) {
    return {
      resultCd: 401,
      resultMsg: '아이디 또는 비밀번호가 올바르지 않습니다.',
      resultData: null
    }
  } else {
    // Password 제외 후 반환
    const { password: _, ...userInfo } = user

    const loginRes = {
      accessToken: 'mock-access-token-123',
      refreshToken: 'mock-refresh-token-456',
      user: userInfo
    }

    return {
      resultCd: 200,
      resultMsg: '로그인 성공',
      resultData: loginRes
    }
  }
})
