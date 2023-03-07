import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useFetcher, useSearchParams } from '@remix-run/react'
import invariant from 'tiny-invariant'
import { verifyCredentials } from '~/utils/auth.server'
import { createUserSession, getSessionUser } from '~/utils/session.server'
import { validatePassword, validateEmail } from '~/utils/validation'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getSessionUser(request)

  if (user) return redirect('/')

  return json({})
}

type ActionData = {
  status: 'success' | 'error'
  errors?: {
    email?: string | null
    password?: string | null
    form?: string | null
  } | null
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { email, password, remember, redirectTo } = Object.fromEntries(formData)
  invariant(typeof email === 'string', 'email type invalid')
  invariant(typeof password === 'string', 'password type invalid')
  invariant(typeof redirectTo === 'string', 'redirectTo type invalid')

  const errors = {
    email: validateEmail(email),
    password: validatePassword(password),
  }

  if (Object.values(errors).some(Boolean)) {
    return json<ActionData>({ status: 'error', errors }, { status: 400 })
  }

  const user = await verifyCredentials({ email, password })
  if (!user) {
    return json<ActionData>(
      { status: 'error', errors: { form: 'Invalid username or password' } },
      { status: 400 },
    )
  }

  return await createUserSession({
    request,
    userId: user.id,
    remember: remember === 'on',
    redirectTo,
  })
}

export default function LoginRoute() {
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/'
  const fetcher = useFetcher()
  const errors = fetcher.data?.errors

  return (
    <div>
      <fetcher.Form
        method="post"
        autoComplete="off"
        spellCheck="false"
        noValidate
        aria-describedby="form-error"
      >
        <div className="mx-auto max-w-xl px-4 pt-16 pb-4">
          <div className="py-4">
            <h1 className="text-2xl font-bold">Welcome Back</h1>
            <h2 className="text-lg">
              Take your programming skills to the next level.
            </h2>
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="email">Email</label>
            <input
              className="w-full rounded-md px-2 py-3"
              placeholder="Enter your email address..."
              type="email"
              name="email"
              id="email"
              aria-describedby="username-error"
              aria-invalid={Boolean(errors?.username)}
            />
            {errors?.email ? (
              <span id="username-error" className="text-sm text-red-600">
                {errors.email}
              </span>
            ) : null}
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password">Password</label>
            <input
              className="w-full rounded-md px-2 py-3"
              placeholder="Enter your password..."
              type="password"
              name="password"
              id="password"
              aria-describedby="password-error"
              aria-invalid={Boolean(errors?.password)}
            />
            {errors?.password ? (
              <span id="password-error" className="text-sm text-red-600">
                {errors.password}
              </span>
            ) : null}
          </div>
          <div className="space-x-2 py-2">
            <input type="checkbox" name="redirectTo" id="redirectTo" />
            <label htmlFor="redirectTo">Remember me</label>
          </div>
          <input type="hidden" name="redirectTo" defaultValue={redirectTo} />
          {errors?.form ? (
            <span id="form-error" className="text-sm text-red-600">
              {errors.form}
            </span>
          ) : null}
          <div className="mt-4">
            <button
              type="submit"
              className="rounded-md bg-black py-3 px-8 text-white"
              disabled={fetcher.state !== 'idle'}
            >
              Log in
            </button>
          </div>
        </div>
      </fetcher.Form>
      <div className="mx-auto max-w-xl px-4">
        <p>
          Don't have an account yet?{' '}
          <Link className="text-blue-600 underline" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
