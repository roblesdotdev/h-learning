import { faker } from '@faker-js/faker'
import bcrypt from 'bcryptjs'
import type { User, Password } from '~/types'

export function createUser(username: string): Pick<User, 'email' | 'username'> {
  return {
    username,
    email: `${username}@email.com`,
  }
}

export function createPassword(username: string): Pick<Password, 'hash'> {
  return {
    hash: bcrypt.hashSync(username.toUpperCase(), 10),
  }
}

export function createContactInfo(username: string) {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    phone: faker.phone.number(),
    github: `https://github.com/${username}`,
  }
}

export function getCountryList() {
  return [
    'Argentina',
    'Bolivia',
    'Brasil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Paraguary',
    'Peru',
    'Uruguay',
    'Venezuela',
  ]
}
