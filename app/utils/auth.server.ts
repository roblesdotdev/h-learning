import bcrypt from 'bcryptjs'
import type { ContactInfo, User } from '~/types'
import { db } from './db.server'

export async function getUserById(
  userId: User['id'],
): Promise<Pick<User, 'id' | 'username' | 'email'> | null> {
  return db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      email: true,
    },
  })
}

export async function verifyCredentials({
  email,
  password,
}: {
  email: User['email']
  password: string
}) {
  const userWithPassword = await db.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      email: true,
      password: true,
    },
  })
  if (!userWithPassword || !userWithPassword.password) {
    return null
  }
  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _pwd, ...safeUser } = userWithPassword
  return safeUser
}

export async function createUser({
  firstName,
  lastName,
  countryId,
  email,
  password,
}: Pick<User, 'email' | 'countryId'> & { password: string } & Pick<
    ContactInfo,
    'firstName' | 'lastName'
  >) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return db.user.create({
    data: {
      email,
      countryId,
      contactInfo: {
        create: {
          firstName,
          lastName,
        },
      },
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })
}
