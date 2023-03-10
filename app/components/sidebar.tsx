import { Link, NavLink } from '@remix-run/react'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import { forwardRef } from 'react'
import {
  BriefCaseIcon,
  CloseIcon,
  ExternalIcon,
  GroupIcon,
  HeartIcon,
  HomeIcon,
  PlayIcon,
} from './icons'

const SIDE_LINKS = [
  { title: 'Inicio', to: '/dashboard', icon: <HomeIcon /> },
  { title: 'Mi Cohorte', to: '/dashboard/cohort', icon: <GroupIcon /> },
  { title: 'Videos', to: '/dashboard/videos', icon: <PlayIcon /> },
  { title: 'Proyectos', to: '/dashboard/projects', icon: <BriefCaseIcon /> },
  { title: 'Favoritos', to: '/dashboard/favorites', icon: <HeartIcon /> },
]

const EXTERNAL_LINKS = [
  { title: 'Calendario', href: 'https://gogle.com' },
  { title: 'Solicitudes', href: 'https://gogle.com' },
]

const Sidebar = forwardRef<
  HTMLDivElement,
  { visible: boolean; onClose: () => void; isMobile: boolean }
>(({ onClose, isMobile }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-y-0 z-[100] col-span-1 flex h-screen w-full flex-col justify-between overflow-y-auto border-r bg-slate-50 xs:w-64 lg:sticky lg:w-full"
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-8">
          <Link to="/" prefetch="intent">
            <h1 className="font-bold uppercase tracking-wide">H-Labs</h1>
          </Link>
          <button
            onClick={onClose}
            className="items-center rounded-md p-2 text-sm leading-6 text-slate-400 shadow-sm lg:hidden"
          >
            <CloseIcon />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-between">
          <ul className="flex flex-col gap-6 p-6">
            {SIDE_LINKS.map(link => (
              <li key={link.to}>
                <SideLink
                  to={link.to}
                  icon={link.icon}
                  title={link.title}
                  onClick={isMobile ? onClose : undefined}
                />
              </li>
            ))}
          </ul>
          <ul className="flex flex-col gap-4 p-6 text-left">
            {EXTERNAL_LINKS.map((link, idx) => (
              <a href={link.href} key={idx} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2">
                  <span>{link.title}</span>
                  <ExternalIcon className="h-3 w-3" />
                </div>
              </a>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
})

type SideLinkProps = {
  to: string
  icon: ReactElement
  title: string
  onClick?: () => void
}

function SideLink({ to, icon, title, onClick }: SideLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => clsx(isActive && 'text-red-300')}
      to={to}
      prefetch="intent"
      onClick={onClick}
      end
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
    </NavLink>
  )
}

Sidebar.displayName = 'Sidebar'
export default Sidebar
