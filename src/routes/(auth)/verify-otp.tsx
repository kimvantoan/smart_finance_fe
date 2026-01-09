import VerifyPage from '@/features/auth/pages/VerifyPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/verify-otp')({
  component: VerifyPage,
})
