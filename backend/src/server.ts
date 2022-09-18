import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from './utils/convert-hour-string-to-minutes'
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string'

const port = 3000 || process.env.PORT

const app = express()
app.use(express.json())
app.use(cors())

const prismaClient = new PrismaClient({
  log: ['query'],
})

app.get('/', (request, response) => response.send('API Works!'))

app.get('/games', async (request, response) => {
  const games = await prismaClient.game.findMany({
    take: 6,
    include: {
      _count: {
        select: {
          Advertisements: true
        }
      }
    }
  })

  return response.status(200).json(games)
})

app.post('/games/:gameId/ads', async (request, response) => {
  const { gameId } = request.params
  const data = request.body

  const weekDays = data.weekDays.join(',')
  const hourStart = convertHourStringToMinutes(data.hourStart)
  const hourEnd = convertHourStringToMinutes(data.hourEnd)

  const ad: any = await prismaClient.advertisement.create({
    data: {
      gameId: gameId,
      weekDays: weekDays,
      hourStart: hourStart,
      hourEnd: hourEnd,
      name: data.name,
      yearsPlaying: data.yearsPlaying,
      discord: data.discord,
      useVoiceChannel: data.useVoiceChannel
    }
  })

  return response.status(201).json(ad)
})

app.get('/games/:id/ads', async (request, response) => {
  const { id: gameId } = request.params

  const ads = await prismaClient.advertisement.findMany({
    where: {
      gameId
    },
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    }, 
    orderBy: {
      createdAt: 'desc'
    }
  })

  const adsWithFormattedWeekDays = ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHourString(ad.hourStart),
    hourEnd: convertMinutesToHourString(ad.hourEnd)
  }))

  return response.status(200).json(adsWithFormattedWeekDays)
})

app.get('/ads/:id/discord', async (request, response) => {
  const { id: adId } = request.params

  const ad = await prismaClient.advertisement.findUniqueOrThrow({
    where: {
      id: adId
    },
    select: {
      discord: true
    }
  })

  return response.json({ discord: ad.discord })

})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port} 🚀`)
})
