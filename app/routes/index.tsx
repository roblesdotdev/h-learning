import type { LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Form, Link } from '@remix-run/react'
import { useOptionalUser } from '~/utils/misc'
import { requireSessionUser } from '~/utils/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireSessionUser(request)

  return redirect('/dashboard')
}

export default function Index() {
  const user = useOptionalUser()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-xl font-bold">
        Welcome{' '}
        <span className="font-bold">{user ? user.username : 'Guest'}</span>
      </h1>
      <div>
        {user ? (
          <div className="flex flex-col gap-2">
            <Form method="post" action="/logout">
              <button type="submit" className="text-red-600 underline">
                Logout
              </button>
            </Form>
            <Link to="/protected" className="text-blue-600 underline">
              Protected Route
            </Link>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 underline">
            Login
          </Link>
        )}
      </div>
    </div>
  )
}
