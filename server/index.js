const Koa = require('koa') 
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import passport from './interface/utils/passport'
import koastatic from 'koa-static'
import { redis } from './dbs/conf'

import user from './interface/user'
import blog from './interface/blog'
import upload from './interface/upload'
import comment from './interface/comment'

const app = new Koa()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

// 安装koa-static 开放static文件夹，并且直接 服务器/文件名 即可访问在static中的文件
app.use(koastatic(__dirname + '/static'))

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  app.keys = ['123jkl']
  app.use(session({
    key: 'blog',
    prefix: 'blog:uid',
    // 配置 cookie
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    },
    // 配置 redis
    store: Redis({
      all: `${redis.host}:${redis.port}`
    })
  }))

  app.use(bodyParser({
    extendTypes: ['json', 'form', 'text']
  }))
  app.use(json())
  app.use(passport.initialize())
  app.use(passport.session())

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use(user.routes()).use(user.allowedMethods())
  app.use(blog.routes()).use(blog.allowedMethods())
  app.use(upload.routes()).use(upload.allowedMethods())
  app.use(comment.routes()).use(comment.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
