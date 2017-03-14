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
    console.log('decoded chunk: ' + data)
  })
  .on('error', err => {
    console.log(err)
  })
