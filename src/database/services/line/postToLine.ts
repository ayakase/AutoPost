export const postToLine = async (messages: Object[]) => {
    const lineToken = Bun.env.CHANNEL_ACCESS_TOKEN;
    if (!lineToken) {
        console.error("CHANNEL_ACCESS_TOKEN is undefined");
        return;
    }
    const response = await fetch("https://api.line.me/v2/bot/message/push", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${lineToken}`
        },
        body: JSON.stringify({
            to: Bun.env.USER_ID,
            messages: messages
        })
    })
    if (!response.ok) {
        console.error("Failed to post to Line:", response.statusText)
    }
}