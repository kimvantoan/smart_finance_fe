import Report from '@/features/report/page/Report'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/report/')({
  component: Report,
})
