import { Hono } from 'hono'
import danbooruRoute from './routes/test/danbooru'
import lineRoute from './routes/trigger/line'

const app = new Hono()

app.get('/', (c) => c.json({ message: 'running' }))
app.route('/test', danbooruRoute)
app.route('/api', lineRoute)

// ⬇️ Add this to explicitly start the server on 0.0.0.0:3000
Bun.serve({
    port: 3000,
    hostname: '0.0.0.0',
    fetch: app.fetch,
})
