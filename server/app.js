import request from 'request'

console.log(`
 1. Get daily challenge page
    GET https://tw.voicetube.com/everyday/20170311

 2. Parse to get challenge id
    some where in "core/zhTW/spkChallenges/CHALLENGE_ID/comments"

 3. Get comments by challenge id
    POST https://vtapi.voicetube.com/v2/core/zhTW/spkChallenges/CHALLENGE_ID/comments

 4. And there you go
`)

const date = new Date().toLocaleDateString().split('-').join('')
const CHALLENGE_PAGE_ENDPOINT = 'https://tw.voicetube.com/everyday/'
console.log(CHALLENGE_PAGE_ENDPOINT + date)

request
  .get({
    url: CHALLENGE_PAGE_ENDPOINT + date,
    gzip: true,
    headers: {
      'cache-control': 'no-cache',
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'User-Agent': 'yee'
    }
  })
  .on('data', data => {
    let line = data.toString()
    const startStr = 'core/zhTW/spkChallenges/'
    const start = line.indexOf(startStr)
    if (start > -1) {
      line = line.substring(start, line.length)
      const endStr = '/comments'
      const end = line.indexOf(endStr)
      if (end > -1) {
        console.log('daily challenge id found ->', line.substring(startStr.length, end))
        // POST the comments back!
      }
    }
  })
  .on('error', err => {
    console.log(err)
  })
