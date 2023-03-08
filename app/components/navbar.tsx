import { Link } from '@remix-run/react'

export default function Navbar() {
  return (
    <div className="sticky inset-x-0 top-0 z-50 border-b bg-slate-50 py-8 px-6">
      <nav className="flex items-center justify-between">
        <Link to="/" prefetch="intent">
          <h1>H-Labs</h1>
        </Link>
        <ul className="flex items-center gap-4">
          <li>
            <button>🔍 Search</button>
          </li>
          <li>
            <button>🔔 Notifications</button>
          </li>
          <li>
            <button>ℹ️ Help</button>
          </li>
          <li>
            <button>💀 Menu</button>
          </li>
        </ul>
      </nav>
    </div>
  )
}
