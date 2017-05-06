import request from 'request'
import rp from 'request-promise'

const date = new Date().toLocaleDateString().split('-').join('')
const CHALLENGE_PAGE_ENDPOINT = 'https://tw.voicetube.com/everyday/'

export const getCommentId = () => rp
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
  .then(data => {
    let line = data.toString()
    const startStr = 'core/zhTW/spkChallenges/'
    const start = line.indexOf(startStr)
    if (start !== -1) {
      line = line.substring(start, line.length)
      const endStr = '/comments'
      const end = line.indexOf(endStr)
      if (end !== -1) {
        const id = line.substring(startStr.length, end)
        console.log('daily challenge id found ->', id)

        // POST the comments back!
        return id
      }
    }
  })
  .then(id => {
    if (typeof id === 'undefined') console.log('comment id not found')
    return id
  })
  .catch(err => console.log(err))

export const getComments = id => {
  let buffers = []
  request
    .post({
      url: `https://vtapi.voicetube.com/v2/core/zhTW/spkChallenges/${id}/comments`,
      gzip: true,
      rejectUnauthorized: false,
      headers: {
        'cache-control': 'no-cache',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'User-Agent': 'yee'
      }
    })
    .on('data', data => {
      buffers.push(data.toString())
    })
    .on('response', response => {
      console.log('response!')
    })
    .on('error', err => {
      console.log(err)
    })
    .on('end', () => {
      console.log('end!')
      console.log(JSON.parse(buffers.join('')).length, 'comments received!')
    })
}