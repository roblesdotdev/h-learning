import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import Footer from '~/components/footer'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import { requireSessionUser } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireSessionUser(request)

  return json({})
}

export default function ProtectedRoute() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="relative flex flex-1">
        <Sidebar />
        <main className="ml-56 flex w-full flex-1 flex-col">
          <div className="flex-1 p-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
