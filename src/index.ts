import { Hono } from 'hono'
import './cron-task/scheduler'
import danbooruRoute from './routes/test/danbooru'
import lineRoute from './routes/trigger/line'
const app = new Hono()

app.route('/test', danbooruRoute)
app.route('/api', lineRoute)
export default app
