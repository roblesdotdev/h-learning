import { Menu, Transition } from '@headlessui/react'
import { Form } from '@remix-run/react'
import { Fragment } from 'react'
import {
  BarsIcon,
  BellIcon,
  ChevronDownIcon,
  CogIcon,
  PowerIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  UserCircleIcon,
} from './icons'

export default function Topbar({
  onShowSide,
}: {
  isMobile?: boolean
  onShowSide: () => void
}) {
  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b bg-slate-50 p-6">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-0">
          <button
            onClick={onShowSide}
            className="w-full items-center rounded-md p-1.5 text-sm leading-6 text-slate-400 shadow-sm lg:hidden"
          >
            <span className="sr-only">Sidebar Button</span>
            <BarsIcon />
          </button>
          <button
            type="button"
            className="hidden w-full items-center rounded-md p-1.5 text-sm leading-6 text-slate-400 shadow-sm ring-1 ring-slate-900/10 hover:ring-slate-300 lg:flex"
          >
            <span className="flex items-center gap-4">
              <SearchIcon />
              <span>Qué estás buscando...</span>
            </span>
            <span className="ml-auto flex-none pl-3 text-xs font-semibold">
              Ctrl K
            </span>
          </button>
        </div>
        <ul className="flex items-center gap-2">
          <li className="lg:hidden">
            <button className="w-full items-center rounded-md p-2 text-sm leading-6 text-slate-400 shadow-sm lg:flex">
              <SearchIcon />
              <span className="sr-only">Search...</span>
            </button>
          </li>
          <li>
            <button className="w-full items-center rounded-md p-2 text-sm leading-6 text-slate-400 shadow-sm lg:flex">
              <BellIcon />
              <span className="sr-only">Notificaciones</span>
            </button>
          </li>
          <li>
            <MenuButton />
          </li>
        </ul>
      </nav>
    </div>
  )
}

function MenuButton() {
  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            Username
            <ChevronDownIcon
              className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <UserCircleIcon />
                      <span>Perfil</span>
                    </div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <CogIcon />
                      <span>Preferencias</span>
                    </div>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? 'bg-violet-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                  >
                    <div className="flex items-center gap-2">
                      <QuestionMarkCircleIcon />
                      <span>Ayuda</span>
                    </div>
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="p-1">
              <Menu.Item>
                {({ active }) => (
                  <Form method="post" action="/logout">
                    <button
                      className={`${
                        active ? 'bg-violet-500 text-white' : 'text-gray-900'
                      } group flex w-full items-center rounded-md p-2 text-sm`}
                    >
                      <div className="flex items-center gap-2">
                        <PowerIcon />
                        <span>Logout</span>
                      </div>
                    </button>
                  </Form>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
