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

export const sendFlexMessage = async (replyToken: string, flexMessage: any) => {
    try {
        const url = `https://api.line.me/v2/bot/message/reply`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
        }
        const body = {
            replyToken: replyToken,
            messages: [flexMessage]
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
    return response.data
}
export const sendImageToLineViaReplyToken = async (replyToken: string, post: any, characterTag?: string, characterName?: string) => {
    try {
        const url = `https://api.line.me/v2/bot/message/reply`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
        }

        const imageMessage = {
            type: "image",
            originalContentUrl: post.file_url,
            previewImageUrl: post.preview_file_url
        }

        const textMessage = {
            type: "text",
            text: `ID: ${post.id}\nCharacter: ${post.tag_string_character}\nArtist: ${post.tag_string_artist}\nImage URL: ${post.file_url}\nLarge Img: ${post.large_file_url}`
        }

        const messages: any[] = [imageMessage, textMessage]

        // Add reroll button if characterTag is provided
        if (characterTag) {
            const flexMessage = {
                type: "flex",
                altText: "Reroll button",
                contents: rerollFlexMessage(characterTag, characterName)
            }
            messages.push(flexMessage)
        }

        const body = {
            replyToken: replyToken,
            messages: messages
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
// export const sendRerollFlexMessageViaReplyToken = async (replyToken: string, message: string) => {
//     try {
//         const url = `https://api.line.me/v2/bot/message/reply`
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${Bun.env.CHANNEL_ACCESS_TOKEN}`
//         }
//     }
// }


const rerollFlexMessage = (characterTag: string, characterName?: string) => {
    const displayName = characterName || (characterTag === 'random' ? 'Random' : characterTag)
    const buttonLabel = `Reroll ${displayName} 🔁`

    return {
        "type": "carousel",
        "contents": [
            {
                "type": "bubble",
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [
                        {
                            "type": "button",
                            "style": "primary",
                            "action": {
                                "type": "postback",
                                "label": buttonLabel,
                                "data": `reroll:${characterTag}`
                            },
                            "height": "sm"
                        },
                        {
                            "type": "button",
                            "style": "primary",
                            "action": {
                                "type": "postback",
                                "label": "Copy Artist 📋",
                                "data": "copy_artist"
                            },
                            "height": "sm",
                            "color": "#00CCFF"
                        }
                    ],
                    "spacing": "md",
                    "paddingAll": "md",
                    "cornerRadius": "none"
                }
            }
        ]
    }
}


export const quotaFlexMessage = (used: number, total: number) => {
    return {
        "type": "carousel",
        "contents": [
            {
                "type": "bubble",
                "size": "nano",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                        {
                            "type": "text",
                            "text": "Used",
                            "color": "#ffffff",
                            "align": "start",
                            "size": "md",
                            "gravity": "center"
                        },
                        {
                            "type": "text",
                            "text": `${used}/${total}`,
                            "color": "#ffffff",
                            "align": "start",
                            "size": "xs",
                            "gravity": "center"
                        },
                        {
                            "type": "text",
                            "text": `${Math.round((used / total) * 100)}%`,
                            "color": "#ffffff",
                            "align": "start",
                            "size": "xs",
                            "gravity": "center"
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [
                                {
                                    "type": "box",
                                    "layout": "vertical",
                                    "contents": [
                                        {
                                            "type": "filler"
                                        }
                                    ],
                                    "width": "70%",
                                    "backgroundColor": "#0D8186",
                                    "height": "6px"
                                }
                            ],
                            "backgroundColor": "#9FD8E36E",
                            "height": "6px",
                            "margin": "sm"
                        }
                    ],
                    "backgroundColor": "#27ACB2",
                    "paddingTop": "19px",
                    "paddingAll": "12px",
                    "paddingBottom": "16px"
                },
                "styles": {
                    "footer": {
                        "separator": false
                    }
                }
            }
        ]
    }
}

export const helpFlexMessage = (characterList: any[]) => {
    const characterItems = characterList.map(char => ({
        "type": "box",
        "layout": "horizontal",
        "contents": [
            {
                "type": "text",
                "text": char.command,
                "size": "sm",
                "color": "#555555"
            },
            {
                "type": "text",
                "text": char.name,
                "size": "sm",
                "color": "#111111",
                "align": "end"
            }
        ]
    }))

    return {
        "type": "bubble",
        "body": {
            "type": "box",
            "layout": "vertical",
            "contents": [
                {
                    "type": "text",
                    "text": "MAKEINE BOT COMMANDS",
                    "weight": "bold",
                    "color": "#1DB446",
                    "size": "sm"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "spacing": "sm",
                    "contents": [
                        ...characterItems,
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "/rd",
                                    "size": "sm",
                                    "color": "#555555"
                                },
                                {
                                    "type": "text",
                                    "text": "Random character",
                                    "size": "sm",
                                    "color": "#111111",
                                    "align": "end"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "/quota",
                                    "size": "sm",
                                    "color": "#555555"
                                },
                                {
                                    "type": "text",
                                    "text": "Check quota usage",
                                    "size": "sm",
                                    "color": "#111111",
                                    "align": "end"
                                }
                            ]
                        },
                        {
                            "type": "box",
                            "layout": "horizontal",
                            "contents": [
                                {
                                    "type": "text",
                                    "text": "@mkbot",
                                    "size": "sm",
                                    "color": "#555555"
                                },
                                {
                                    "type": "text",
                                    "text": "Ask AI anything",
                                    "size": "sm",
                                    "color": "#111111",
                                    "align": "end"
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        "styles": {
            "footer": {
                "separator": true
            }
        }
    }
}