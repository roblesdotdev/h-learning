import { PrismaClient } from '@prisma/client'
import {
  createContactInfo,
  createPassword,
  createUser,
  getCountryList,
} from './utils'

const prisma = new PrismaClient()

async function seed() {
  console.log('๐ฑ Seeding...')
  console.time(`๐ฑ Database has been seeded`)

  console.time('๐งน Cleaned up the database...')
  await prisma.country.deleteMany({ where: {} })
  await prisma.user.deleteMany({ where: {} })
  console.timeEnd('๐งน Cleaned up the database...')

  const countryList = getCountryList()
  const countries = await Promise.all(
    countryList.map(async country => {
      return await prisma.country.create({
        data: {
          name: country,
        },
      })
    }),
  )

  console.time('๐ค Create test user...')
  const countriesIds = countries.map(c => c.id)
  const countryId =
    countriesIds[Math.floor(Math.random() * countriesIds.length)]
  const userData = createUser('remixer')
  await prisma.user.create({
    data: {
      ...userData,
      countryId,
      contactInfo: {
        create: createContactInfo(userData.username ?? 'remixer'),
      },
      password: {
        create: createPassword(userData.username ?? 'remixer'),
      },
    },
  })
  console.timeEnd('๐ค Create test user...')

  console.timeEnd(`๐ฑ Database has been seeded`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
