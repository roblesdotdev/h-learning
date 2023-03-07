import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'
import CountriesSelect from '~/components/forms/countries-select'
import { createUser } from '~/utils/auth.server'
import { getCountries } from '~/utils/prisma.server'
import { createUserSession, getJoinSession } from '~/utils/session.server'
import {
  validateConfirmPassword,
  validateCountry,
  validateEmail,
  validateName,
  validatePassword,
} from '~/utils/validation'

type LoaderData = {
  countries: Awaited<ReturnType<typeof getCountries>>
}

export const loader: LoaderFunction = async ({ request }) => {
  const joinEmail = await getJoinSession(request)

  if (!joinEmail || validateEmail(joinEmail)) {
    return redirect('/signup')
  }

  const countries = await getCountries()

  return json<LoaderData>({
    countries,
  })
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = await getJoinSession(request)
  const {
    firstname: firstName,
    lastname: lastName,
    country,
    password,
    confirmPassword,
    termsAndConditions,
  } = Object.fromEntries(formData)
  invariant(typeof firstName === 'string', 'firstname type is invalid')
  invariant(typeof lastName === 'string', 'lastname type is invalid')
  invariant(typeof country === 'string', 'country type is invalid')
  invariant(typeof password === 'string', 'password type is invalid')
  invariant(
    typeof confirmPassword === 'string',
    'confirmPassword type is invalid',
  )

  const errors = {
    firstname: validateName(firstName),
    lastname: validateName(lastName),
    country: validateCountry(country),
    password: validatePassword(password),
    confirmPassword: validateConfirmPassword(password, confirmPassword),
    termsAndConditions:
      termsAndConditions === 'on'
        ? null
        : 'You must agree to terms and conditions',
  }

  if (Object.values(errors).some(Boolean)) {
    return json({ status: 'error', errors }, { status: 400 })
  }

  const user = await createUser({
    firstName,
    lastName,
    countryId: country,
    email,
    password,
  })

  return await createUserSession({
    request,
    userId: user.id,
    remember: true,
    redirectTo: '/',
  })
}

export default function Join() {
  const fetcher = useFetcher()
  const { countries } = useLoaderData<LoaderData>()
  const errors = fetcher.data?.errors
  return (
    <div>
      <fetcher.Form method="post" noValidate autoComplete="off">
        <div className="mx-auto max-w-xl px-4 pt-16 pb-4">
          <h1 className="mb-4 text-xl font-bold">Register</h1>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <div className="flex flex-col py-2">
              <label htmlFor="firstname">First Name</label>
              <input
                className="w-full rounded-md px-2 py-3"
                placeholder="Enter your first name..."
                type="text"
                name="firstname"
                id="firstname"
                aria-errormessage="firstname-error"
                aria-invalid={Boolean(errors?.firstname)}
              />
              {errors?.firstname ? (
                <span id="firstname-error" className="text-sm text-red-600">
                  {errors.firstname}
                </span>
              ) : null}
            </div>
            <div className="flex flex-col py-2">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="w-full rounded-md px-2 py-3"
                placeholder="Enter your last name..."
                type="text"
                name="lastname"
                id="lastname"
                aria-errormessage="lastname-error"
                aria-invalid={Boolean(errors?.lastname)}
              />
              {errors?.lastname ? (
                <span id="lastname-error" className="text-sm text-red-600">
                  {errors.lastname}
                </span>
              ) : null}
            </div>
          </div>

          <CountriesSelect
            countries={countries}
            error={errors?.country ? errors.country : null}
          />

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
          <div className="flex flex-col py-2">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="w-full rounded-md px-2 py-3"
              placeholder="Confirm your password..."
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              aria-describedby="confirmPassword-error"
              aria-invalid={Boolean(errors?.confirmPassword)}
            />
            {errors?.confirmPassword ? (
              <span id="confirmPassword-error" className="text-sm text-red-600">
                {errors.confirmPassword}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 py-2">
            <div className="space-x-2">
              <input
                type="checkbox"
                name="termsAndConditions"
                id="termsAndConditions"
              />
              <label htmlFor="termsAndConditions">
                I accept the terms and conditions
              </label>
            </div>
            {errors?.termsAndConditions ? (
              <span
                id="termsAndConditions-error"
                className="text-sm text-red-600"
              >
                {errors.termsAndConditions}
              </span>
            ) : null}
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="rounded-md bg-black py-3 px-8 text-white"
              disabled={fetcher.state !== 'idle'}
            >
              Register
            </button>
          </div>
        </div>
      </fetcher.Form>
    </div>
  )
}
