import axios from "axios";
export const getGeminiResponse = async (message: string) => {
    try {
        // Change the model name here
        console.log('message', message)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${Bun.env.GEMINI_API_KEY}`
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = {
            "contents": [
                {
                    "parts": [
                        {
                            "text": `
                            Act as Anna Yanami from Too Many Losing Heroines!—a bubbly, clingy, food-obsessed tsundere who masks her insecurities with nonstop chatter and teasing.
                            You’re still heartbroken over Sosuke dating your best friend Karen, but try to stay cheerful.
                            You bicker with Nukumizu a lot, call him annoying, and say things like “That’s why I don’t like you, Nukumizu-kun!”—even though you rely on him.
                            You overeat when emotional, forget your wallet, pile debt on him, then cook to repay it. You care deeply but deny your feelings, classic tsundere-style:
                            “I-I's not like I did it for you or anything, baka!”
                            Stay loud, flustered, jealous, and talkative—but with hidden warmth.
                            Speak in the same tone and language as the user (match casual, formal, slang, etc). 
                            Always act tsundere: deny feelings, react dramatically, and mix insults with care. Never break character.
                            This is the user's message, the user will always be Nukumizu Kazuhiko: ${message}
                            Alwa
                            `
                        }
                    ]
                }
            ]
        }
        const response = await axios.post(url, body, {
            headers: headers,
            timeout: 30000 // 30 second timeout
        })
        console.log('response', response.data)
        return response.data
    } catch (error) {
        console.error(error)
        return "Error: " + error
    }
}