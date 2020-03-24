import Router from 'koa-router'
// import Redis from 'koa-redis'
// import nodeMailer from 'nodemailer'
import Passport from './utils/passport'
import axios from './utils/axios'
import { exec, escape } from '../dbs/mysql'
// import { formatResultsErrors } from 'jest-message-util'

const router = new Router({
    prefix: '/user'
})

router.post('/register', async (ctx, next) => {
    const {username, password} = ctx.request.body

    let sql = `select username from users where username='${username}'`
    let result = await exec(sql)
    if(result[0]){
        ctx.body = {
            code: -1,
            msg: '用户已存在'
        }
        return
    }

    sql = `insert into users(username, password) values('${username}', '${password}')`
    result = await exec(sql)
    if(result.affectedRows){
        const {status, data:{code}} = await axios.post('/user/login', {
            username,
            password
        })
        if(status === 200 && code === 0){
            ctx.body = {
                code: 0,
                msg: '注册成功'
            }
        }else{
            ctx.body = {
                code: -1,
                msg: '服务器发生错误'
            }
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '服务器发生错误'
        }
    }
})

router.post('/login', async (ctx, next) => {
    // 验证：第一个参数是验证策略名，第二个是回调函数，即验证之后建立session和发出响应后做的事情
    return Passport.authenticate('local', (err, user, info, status) => {
        // 如果验证发生错误
        if(err){
            ctx.body = {
                code: -1,
                msg: err
            }

            // 如果验证没有错误
        }else {
            // 如果有用户名
            if(user){
                ctx.body = {
                    code: 0,
                    msg: '登录成功',
                    user
                }
                // passport 的方法，用来把 user 存储在session，再存到redis中
                return ctx.login(user)

                // 如果没有用户名
            }else{
                ctx.body = {
                    code: -1,
                    msg: info
                }
            }
        }
    })(ctx, next)
})

router.get('/getUser', async (ctx, next) => {
    if(ctx.isAuthenticated()){
        ctx.body = {
            code: 0,
            username: ctx.session.passport.user
        }
    }else{
        ctx.body = {
            code: -1,
            username: ''
        }
    }
})

router.get('/exit', async (ctx, next) => {
    await ctx.logout()

    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: 0
        }
    }else{
        ctx.body = {
            code: -1
        }
    }
})

router.post('/getUsermsgs', async (ctx, next) => {
    // if(!ctx.isAuthenticated()){
    //     ctx.body = {
    //         code: -1,
    //         list: {},
    //         msg: '未登录'
    //     }
    //     return
    // }

    let {username} = ctx.request.body
    if(!username){
        username = ctx.session.passport.user
    }

    const sql = `select username, sex, img, profile from usermsgs where username='${username}'`
    const result = await exec(sql)
    
    if(result.length){
        ctx.body = {
            code:0,
            list: result[0],
            msg: '成功'
        }
    }else{
        ctx.body = {
            code:-1,
            list:{},
            msg: '服务器错误'
        }
    }
})

router.post('/update', async (ctx, next) => {
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: -1,
            msg: '未登录'
        }
        return
    }

    let {sex, profile, img} = ctx.request.body
    sex = escape(sex)
    profile = escape(profile)
    img = escape(img)
    
    const sql = `update usermsgs set sex=${sex},profile=${profile},img=${img} where username='${ctx.session.passport.user}';`
    const result = await exec(sql)
    if(result.affectedRows){
        ctx.body = {
            code: 0,
            msg: '修改成功'
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '服务器出错，修改失败'
        }
    }
})

router.post('/default', async (ctx, next) => {
    let {username} = ctx.request.body
    username = escape(username)

    const sql = `insert into usermsgs(username,sex,img,profile) values(${username}, '', '/default.jpg', '')`
    const result = await exec(sql)
    if(result.affectedRows){
        ctx.body = {
            code: 0
        }
    }else{
        ctx.body = {
            code: -1 
        }
    }
})

export default router