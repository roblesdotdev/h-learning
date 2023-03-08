import { NavLink } from '@remix-run/react'
import clsx from 'clsx'
import type { ReactElement } from 'react'

export default function Sidebar() {
  return (
    <div className="fixed inset-y-0 mt-[89px] flex w-56 border-r">
      <nav className="flex flex-1 flex-col justify-between">
        <ul className="flex flex-col gap-4 p-6">
          <li>
            <SideLink to="/dashboard">Home</SideLink>
          </li>
          <li>
            <SideLink to="/dashboard/cohort">My Cohort</SideLink>
          </li>
          <li>
            <SideLink to="/dashboard/videos">Videos</SideLink>
          </li>
          <li>
            <SideLink to="/dashboard/projects">Projects</SideLink>
          </li>
          <li>
            <SideLink to="/dashboard/favorites">Favorites</SideLink>
          </li>
        </ul>
        <ul className="flex flex-col gap-4 p-6 text-left">
          <a href="https://google.com" target="_blank" rel="noreferrer">
            Calendar
          </a>
          <a href="https://google.com" target="_blank" rel="noreferrer">
            Migrations
          </a>
        </ul>
      </nav>
    </div>
  )
}

type SideLinkProps = {
  to: string
  children: string | ReactElement
}

function SideLink({ to, children }: SideLinkProps) {
  return (
    <NavLink
      className={({ isActive }) => clsx(isActive && 'text-red-300')}
      to={to}
      prefetch="intent"
      end
    >
      {children}
    </NavLink>
  )
}
