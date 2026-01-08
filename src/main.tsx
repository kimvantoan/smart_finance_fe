import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './app/Router'
import { Providers } from './app/Providers'
import '@/app/i18n'

createRoot(document.getElementById('root')!).render(
  <Providers>
    <RouterProvider router={router} />
  </Providers>
)
