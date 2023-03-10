import { Transition } from '@headlessui/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import Sidebar from '~/components/sidebar'
import Topbar from '~/components/topbar'
import { requireSessionUser } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireSessionUser(request)

  return json({})
}

export default function DashboardLayout() {
  const [showSide, setShowSide] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  function handleResize() {
    if (innerWidth <= 1024) {
      setShowSide(false)
      setIsMobile(true)
    } else {
      setShowSide(true)
      setIsMobile(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      addEventListener('resize', handleResize)
    }

    return () => {
      removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-6">
      <Transition
        as={Fragment}
        show={showSide}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar
          visible={showSide}
          onClose={() => setShowSide(false)}
          isMobile={isMobile}
        />
      </Transition>
      <div className={clsx('col-span-5 transition-all duration-300')}>
        <Topbar onShowSide={() => setShowSide(!showSide)} />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
