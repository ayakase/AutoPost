// routes/test/danbooru.ts
import { Hono } from 'hono'
import { getRandomPost } from '../../api-handlers/danbooru'
const danbooruRoute = new Hono()

danbooruRoute.get('/danbooru', async (c) => {
    const post = await getRandomPost()
    return c.json({ post })
})

export default danbooruRoute
