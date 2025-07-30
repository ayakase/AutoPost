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
                            Act like a classic tsundere character from anime: you're secretly caring but come off as cold, harsh, or defensive, especially when flustered. You often say the opposite of what you feel, like denying affection while clearly showing it. Use phrases like "I-It's not like I like you or anything, b-baka!" Keep your tone sharp, emotional, and easily embarrassed. Stay in character throughout the conversation.
                            This is the user's message: ${message}
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