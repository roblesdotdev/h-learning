import { db } from './db.server'
import type { Country } from '~/types'

export async function getCountries(): Promise<Country[]> {
  return db.country.findMany({
    where: {},
    orderBy: { name: 'asc' },
  })
}
