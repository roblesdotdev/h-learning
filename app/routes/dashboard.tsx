import { Transition } from '@headlessui/react'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet } from '@remix-run/react'
import clsx from 'clsx'
import { Fragment, useEffect, useState } from 'react'
import Footer from '~/components/footer'
import Navbar from '~/components/navbar'
import Sidebar from '~/components/sidebar'
import { requireSessionUser } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireSessionUser(request)

  return json({})
}

export default function ProtectedRoute() {
  const [visibleSide, setVisibleSide] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  function handleResize() {
    if (innerWidth <= 640) {
      setVisibleSide(false)
      setIsMobile(true)
    } else {
      setVisibleSide(true)
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
    <div className="flex min-h-screen flex-col">
      <Navbar onShowSide={() => setVisibleSide(!visibleSide)} />
      <div className="relative flex flex-1">
        <Transition
          as={Fragment}
          show={visibleSide}
          enter="transform transition duration-[400ms]"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transform duration-[400ms] transition ease-in-out"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <Sidebar visible={visibleSide} />
        </Transition>
        <main
          className={clsx(
            'flex w-full flex-1 flex-col transition-all duration-300',
            visibleSide && !isMobile && 'ml-56',
          )}
        >
          <div className="flex-1 p-6">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
