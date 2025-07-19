import { Hono } from 'hono'
import './cron-task/scheduler'
import danbooruRoute from './routes/test/danbooru'
const app = new Hono()

app.route('/test', danbooruRoute)

export default app
