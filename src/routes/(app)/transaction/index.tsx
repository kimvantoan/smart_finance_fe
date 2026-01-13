import Transactions from '@/features/transaction/page/Transactions'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/transaction/')({
  component: Transactions,
})
