import app from './index'
import { serve } from '@hono/node-server'

serve({
  fetch: app.fetch,
  port: 7102,
})

console.log("🚀 Local server running at http://localhost:7102")
