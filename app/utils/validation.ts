import { db } from './db.server'

export function validateName(name: string) {
  return name.length < 3 ? 'Username is too short' : null
}

export function validatePassword(password: string) {
  return password.length < 6 ? 'Password is too short' : null
}

export function validateEmail(email: string) {
  return /^\S+@\S+\.\S+$/.test(email) ? null : 'Enter a valid email'
}

export function validateConfirmPassword(password: string, confirm: string) {
  const error = validatePassword(confirm)
  return error
    ? error
    : password !== confirm
    ? 'Passwords does not match'
    : null
}

export async function validateEmailExistence(email: string) {
  const u = await db.user.findUnique({ where: { email } })
  return u ? 'Email is already taken' : null
}

export async function validateUsernameExistence(username: string) {
  const u = await db.user.findUnique({ where: { username } })
  return u ? 'Username is already taken' : null
}

export function validateCountry(countryId: string) {
  return !countryId.length ? 'Please select a country' : null
}
