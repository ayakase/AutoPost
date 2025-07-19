// routes/test/danbooru.ts
import { Hono } from 'hono'
import { getOnePost } from '../../api-handlers/danbooru'
const danbooruRoute = new Hono()

danbooruRoute.get('/danbooru', async (c) => {
    const post = await getOnePost()
    return c.json({ post })
})

export default danbooruRoute
