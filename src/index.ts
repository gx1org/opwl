import { Hono } from 'hono'
import { cors } from 'hono/cors'

type Subscription = {
  origin: string
  status: string
  expires: string
}

const currentSubscriptions: Subscription[] = [
  { origin: 'https://coverain-fe.vercel.app', status: 'active', expires: '2026-12-31' },
  { origin: 'http://localhost:7101', status: 'active', expires: '2026-12-31' },
]

const app = new Hono()

// 🔥 CORS middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST'],
  allowHeaders: ['Origin', 'Content-Type', 'Accept'],
  exposeHeaders: ['Content-Type'],
}))

app.get('/', (c) => {
  const origin = c.req.header('origin') ?? ''

  for (const sub of currentSubscriptions) {
    if (sub.origin === origin) {
      return c.json(sub, 200)
    }
  }

  return c.json(
    { message: 'Unregistered origin ' + origin },
    404
  )
})

export default app
