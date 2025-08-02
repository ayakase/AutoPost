import { Context } from "hono"
import { getQuota, sendImageToLineViaReplyToken, sendLineMessage, sendFlexMessage, quotaFlexMessage, helpFlexMessage } from "../helpers/lineServices"
import { getPostByCharacterTag, getRandomPost } from "../helpers/danbooruServices"
import { getGeminiResponse } from "../helpers/geminiServices"

const characterList = [
    {
        name: 'Anna Yanami',
        shortName: 'Anna',
        tag: 'yanami_anna',
        command: '/anna'
    },
    {
        name: 'Chika Komari',
        shortName: 'Chika',
        tag: 'komari_chika',
        command: '/chika'
    },
    {
        name: 'Lemon Yakishio',
        shortName: 'Lemon',
        tag: 'yakishio_lemon',
        command: '/lemon'
    },
    {
        name: 'Nukumizu Kazuhiko',
        shortName: 'Nuku',
        tag: 'nukumizu_kazuhiko',
        command: '/nuku'
    },
    {
        name: 'Shikiya Yumeko',
        shortName: 'Shikiya',
        tag: 'shikiya_yumeko',
        command: '/shikiya'
    },
    {
        name: 'Tiara Basori',
        shortName: 'Tiara',
        tag: 'basori_tiara',
        command: '/tiara'
    },
    {
        name: 'Nukumizu Kaju',
        shortName: 'Kaju',
        tag: 'nukumizu_kaju',
        command: '/kaju'
    },
    {
        name: 'Hibari',
        shortName: 'Hibari',
        tag: 'hibari',
        command: '/hibari'
    }
]

export const handleLineWebhook = async (c: Context) => {
    const body = await c.req.json()
    // Loop through all events instead of just the first one
    for (const event of body.events) {
        const type = event.type
        const replyToken = event.replyToken
        if (event.source.type === 'user') {
            return
        }
        console.log('event', event)

        if (type === 'message') {
            const message = event.message
            const text = message.text

            // Handle character commands
            const character = characterList.find(char => text.includes(char.command))
            if (character) {
                const post = await getPostByCharacterTag(character.tag)
                await sendImageToLineViaReplyToken(replyToken, post, character.tag, character.name)
                return
            }

            // Handle random command
            if (text.includes('/rd')) {
                const post = await getRandomPost()
                console.log('post', post)
                await sendImageToLineViaReplyToken(replyToken, post, 'random', 'Random')
                return
            }

            // Handle help command
            if (text.includes('/help')) {
                console.log('help')
                const flexMessage = {
                    type: "flex",
                    altText: "Makeine Bot Commands",
                    contents: helpFlexMessage(characterList)
                }
                await sendFlexMessage(replyToken, flexMessage)
                return
            }

            // Handle quota command
            if (text.includes('/quota')) {
                const quota: any = await getQuota()
                const flexMessage = {
                    type: "flex",
                    altText: "Quota usage",
                    contents: quotaFlexMessage(quota.totalUsage, 500)
                }
                await sendFlexMessage(replyToken, flexMessage)
                return
            }

            // Handle @mkbot command
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

        if (type === 'postback') {
            const data = event.postback.data
            console.log('postback data:', data)

            if (data.startsWith('reroll:')) {
                const characterTag = data.replace('reroll:', '')
                let post
                let characterName = 'Random'

                if (characterTag === 'random') {
                    post = await getRandomPost()
                } else {
                    post = await getPostByCharacterTag(characterTag)
                    // Find character name from the list
                    const character = characterList.find(char => char.tag === characterTag)
                    if (character) {
                        characterName = character.name
                    }
                }

                await sendImageToLineViaReplyToken(replyToken, post, characterTag, characterName)
                return
            }
        }
    }

    // Return a proper response for LINE webhook
    return c.json({ status: 'ok' })
}