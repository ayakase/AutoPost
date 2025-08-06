// routes/test/danbooru.ts
import { Hono } from 'hono'
import { handleLineWebhook } from '../../api-handlers/line'
const lineRoute = new Hono()
lineRoute.post('/line', async (c) => {
    return handleLineWebhook(c)
})
lineRoute.get('/line', async (c) => {
    return c.text('LINE api is working')
})
export default lineRoute
