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

const Sidebar = forwardRef<HTMLDivElement, { visible: boolean }>(
  ({ visible }, ref) => {
    return (
      <div
        ref={ref}
        className="fixed inset-y-0 mt-[85px] flex w-56 border-r bg-slate-50"
      >
        <nav className="flex flex-1 flex-col justify-between">
          <ul className="flex flex-col gap-6 p-6">
            <li>
              <SideLink to="/dashboard" icon={<HomeIcon />} title="Home" />
            </li>
            <li>
              <SideLink
                to="/dashboard/cohort"
                icon={<GroupIcon />}
                title="My cohort"
              />
            </li>
            <li>
              <SideLink
                to="/dashboard/videos"
                icon={<PlayIcon />}
                title="Videos"
              />
            </li>
            <li>
              <SideLink
                to="/dashboard/projects"
                icon={<BriefCaseIcon />}
                title="Projects"
              />
            </li>
            <li>
              <SideLink
                to="/dashboard/favorites"
                icon={<HeartIcon />}
                title="Favorites"
              />
            </li>
          </ul>
          <ul className="flex flex-col gap-4 p-6 text-left">
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-2">
                <span>Calendario</span>
                <ExternalIcon className="h-3 w-3" />
              </div>
            </a>
            <a href="https://google.com" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-2">
                <span>Solicitudes</span>
                <ExternalIcon className="h-3 w-3" />
              </div>
            </a>
          </ul>
        </nav>
      </div>
    )
  },
)

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
