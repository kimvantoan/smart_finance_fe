import ChangePwPage from '@/features/auth/pages/ChangePwPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/setting/change-password/')({
  component: ChangePwPage,
})

