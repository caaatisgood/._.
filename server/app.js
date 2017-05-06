import restify from 'restify'
import plugins from 'restify-plugins'
import {
  getCommentId,
  getComments
} from './crawler'

let server = restify.createServer()
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())
server.use(plugins.bodyParser())

server.get('/echo/:name', (req, res, next) => {
  res.send({params: req.params, query: req.query})
  return next()
})

server.listen(9487, () => {
  console.log('%s listening at %s', server.name, server.url)
})

getCommentId()
  .then(id => {
    getComments(id)
  })
