import { Context } from "hono"

export const handleLineWebhook = async (c: Context) => {
    const body = await c.req.json()
    console.log(body.events[0])
    return c.json({ message: 'OK' })
}