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
                            "text": message
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