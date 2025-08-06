import { CronJob } from 'cron'
// import { postToLine } from '../services/line/postToLine'

const job = new CronJob('* * * * *', async () => {
  console.log(`Running job at ${new Date().toISOString()}`)
  try {
    // const post = await getOnePost()
    // console.log(`Post ID: ${post.id}`)
    // console.log(`Image URL: ${post.file_url}`)
    // console.log(`tag_string_character: ${post.tag_string_character}`)
    // console.log(`tag_string_artist: ${post.tag_string_artist}`)
    // console.log(`large_file_url: ${post.large_file_url}`)
    // console.log(`preview_file_url: ${post.preview_file_url}`)

    // Construct LINE messages
    // const imageMessage = {
    //   type: "image",
    //   originalContentUrl: post.file_url,
    //   previewImageUrl: post.preview_file_url
    // }
    // const textMessage = {
    //   type: "text",
    //   text: `Post ID: ${post.id}\nImage URL: ${post.file_url}\nCharacter Tags: ${post.tag_string_character}\nArtist Tags: ${post.tag_string_artist}`
    // }
    // await postToLine([imageMessage, textMessage])
  } catch (err) {
    console.error('Job failed:', err)
  }
})

job.start()
