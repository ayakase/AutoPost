import axios from 'axios'
export const sendLineMessage = async (replyToken: string, message: string) => {
    console.log(Bun.env.CHANNEL_ACCESS_TOKEN)
    console.log(replyToken)
    console.log(message)
    try {
        const url = `https://api.line.me/v2/bot/message/reply`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
        }
        const body = {
            replyToken: replyToken,
            messages: [{ type: 'text', text: message }]
        }
        const response = await axios.post(url, body, { headers: headers })
    } catch (error) {
        console.error(error)
    }
}
export const getQuota = async () => {
    const url = `https://api.line.me/v2/bot/message/quota/consumption`
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
    }
    const response = await axios.get(url, { headers: headers })
    console.log(response)
    return response.data
}
export const sendImageToLineViaReplyToken = async (replyToken: string, post: any) => {
    try {
        const url = `https://api.line.me/v2/bot/message/reply`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
        }

        const imageMessage = {
            type: "image",
            originalContentUrl: post.file_url,
            previewImageUrl: post.media_asset?.variants?.find((v: any) => v.type === "360x360")?.url || post.preview_file_url
        }

        const textMessage = {
            type: "text",
            text: `ID: ${post.id}\nCharacter: ${post.tag_string_character}\nArtist: ${post.tag_string_artist}\nImage URL: ${post.file_url}\nLarge Img: ${post.large_file_url}\nPreview Img: ${post.preview_file_url}`
        }

        const body = {
            replyToken: replyToken,
            messages: [imageMessage, textMessage]
        }

        const response = await axios.post(url, body, { headers: headers })
        console.log(response)
    } catch (error) {
        console.error(error)
    }
}
export const startChatLoading = async (chatId: string, loadingSeconds: number) => {
    try {
        const url = `https://api.line.me/v2/bot/chat/loading/start`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
        }
        const body = {
            chatId: chatId,
            loadingSeconds: loadingSeconds
        }
        await axios.post(url, body, { headers: headers })
    } catch (error) {
        console.error(error)
    }
}
