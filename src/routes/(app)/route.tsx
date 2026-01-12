import { AppLayout } from '@/layouts/AppLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)')({
  component: AppLayout,
})

