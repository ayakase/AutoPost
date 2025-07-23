// routes/test/danbooru.ts
import { Hono } from 'hono'
import { handleLineWebhook } from '../../api-handlers/line'
const lineRoute = new Hono()
// used once just to get user ID
lineRoute.post('/line', async (c) => {
    return handleLineWebhook(c)
})
export default lineRoute
