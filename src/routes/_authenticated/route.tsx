import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { auth } from "@/shared/utils/auth"

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    if (!auth.isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: () => <Outlet />,
})
