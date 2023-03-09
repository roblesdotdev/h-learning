import { NavLink } from '@remix-run/react'
import clsx from 'clsx'
import type { ReactElement } from 'react'
import { forwardRef } from 'react'
import {
  BriefCaseIcon,
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
  { visible: boolean; isMobile?: boolean }
>(({ visible }, ref) => {
  return (
    <div
      ref={ref}
      className="fixed inset-y-0 mt-[85px] flex w-56 border-r bg-slate-50"
    >
      <nav className="flex flex-1 flex-col justify-between">
        <ul className="flex flex-col gap-6 p-6">
          {SIDE_LINKS.map(link => (
            <li key={link.to}>
              <SideLink to={link.to} icon={link.icon} title={link.title} />
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
  )
})

type SideLinkProps = {
  to: string
  icon: ReactElement
  title: string
}

function SideLink({ to, icon, title }: SideLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => clsx(isActive && 'text-red-300')}
      to={to}
      prefetch="intent"
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
