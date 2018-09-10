const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const favicon = require('koa-favicon')
const helmet = require('koa-helmet')
const morgan = require('koa-morgan')
const passport = require('koa-passport')
const path = require('path')
const session = require('koa-session')

const config = require('./configuration/config.json')
const authRoutes = require('./routes/auth')
const reportRoutes = require('./routes/report')
const requireLogin = require('./auth/login')

const app = new Koa()
app.keys = [process.env.FORGE_CLIENT_ID]

app.use(cors( { credentials: true }))
app.use(favicon(path.join(__dirname, config.favicon)))
app.use(helmet())
app.use(bodyParser())
app.use(morgan('combined'))
app.use(session(config.session, app))

// Authentication
require('./auth')
app.use(passport.initialize())
app.use(passport.session())

// Add routing
app.use(authRoutes.routes())
app.use(authRoutes.allowedMethods())
app.use(requireLogin)
app.use(reportRoutes.routes())
app.use(reportRoutes.allowedMethods())

app.listen(process.env.PORT || 5000, () => {
  console.info('Server listening on port: 5000.\n')
})
