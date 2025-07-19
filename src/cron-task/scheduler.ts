import { CronJob } from 'cron'

const job = new CronJob('* * * * *', async () => {
  console.log(`[scheduler] Running job at ${new Date().toISOString()}`)
  try {
    // your task here
    console.log('run')
  } catch (err) {
    console.error('[scheduler] Job failed:', err)
  }
})

job.start()
