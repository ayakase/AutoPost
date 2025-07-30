import { Hono } from 'hono'
import { logger } from 'hono/logger'
import danbooruRoute from './routes/test/danbooru'
import lineRoute from './routes/trigger/line'

const app = new Hono()

// Add logger middleware to log all incoming requests
app.use('*', logger())

app.get('/', (c) => c.json({ message: 'running' }))
app.route('/test', danbooruRoute)
app.route('/api', lineRoute)
export default app

// ⬇️ Add this to explicitly start the server on 0.0.0.0:3000
// Bun.serve({
//     port: 3000,
//     hostname: '0.0.0.0',
//     fetch: app.fetch,
// })
