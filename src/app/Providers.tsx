import { QueryClientProvider } from "@tanstack/react-query"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./store"
import type { ReactNode } from "react"
import { queryClient } from "@/router"

type Props = {
  children: ReactNode
}

export function Providers({ children }: Props) {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </ReduxProvider>
  )
}
