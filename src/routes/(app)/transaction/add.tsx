import TransactionAdd from '@/features/transaction/page/TransactionAdd'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/transaction/add')({

  component: TransactionAdd,
})
