import { Context } from "hono"
import { getQuota, sendImageToLineViaReplyToken, sendLineMessage } from "../helpers/lineServices"
import { getPostByCharacterTag, getRandomPost } from "../helpers/danbooruServices"
import { getGeminiResponse } from "../helpers/geminiServices"
export const handleLineWebhook = async (c: Context) => {
    const body = await c.req.json()
    // Loop through all events instead of just the first one
    for (const event of body.events) {
        const type = event.type
        const replyToken = event.replyToken
        if (event.source.type === 'user') {
            return
        }
        if (type === 'message') {
            const message = event.message
            const text = message.text

            if (text.includes('/anna')) {
                const tag = "yanami_anna"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/lemon')) {
                const tag = "yakishio_lemon"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/chika')) {
                const tag = "komari_chika"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/nuku')) {
                const tag = "nukumizu_kazuhiko"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/kaju')) {
                const tag = "nukumizu_kaju"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/shikiya')) {
                const tag = "shikiya_yumeko"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/tiara')) {
                const tag = "basori_tiara"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/hibari')) {
                const tag = "hibari"
                const post = await getPostByCharacterTag(tag)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/rd')) {
                const post = await getRandomPost()
                console.log('post', post)
                await sendImageToLineViaReplyToken(replyToken, post)
                return
            }
            if (text.includes('/help')) {
                console.log('help')
                const message = `
/anna: Anna Yanami
/chika: Chika Komari
/lemon: Lemon Yakishio
/nuku: Nukumizu Kazuhiko
/shikiya: Shikiya Yumeko
/tiara: Tiara Basori
/kaju: Nukumizu Kaju
/rd: random Makeine character
@mkbot ... : Tag the bot and ask
                `
                await sendLineMessage(replyToken, message)
                return
            }
            if (text.includes('/quota')) {
                const quota: any = await getQuota()
                const message = quota.totalUsage + "/500 messages used"
                await sendLineMessage(replyToken, message)
                return
            }
            if (text.includes('@mkbot')) {
                console.log('received message', text)
                const message = text.replace('@mkbot', '').trim()
                if (!message) {
                    await sendLineMessage(replyToken, "Please provide a message after @mkbot")
                    return
                }
                const response = await getGeminiResponse(message)
                console.log('response', response)

                if (response && response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts && response.candidates[0].content.parts[0]) {
                    const geminiText = response.candidates[0].content.parts[0].text
                    await sendLineMessage(replyToken, geminiText)
                } else {
                    await sendLineMessage(replyToken, "Sorry, I couldn't generate a response. Please try again.")
                }
                return
            }
        }
    }

}