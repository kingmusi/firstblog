import Router from 'koa-router'
import {exec, escape} from '../dbs/mysql'

const router = new Router({
    prefix: '/comment'
})

router.post('/setComment', async (ctx, next) => {
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code:-1,
            msg: '未登录'
        }
        return
    }

    let {id, comment} = ctx.request.body
    id = escape(id)
    comment = escape(comment)
    
    let sql = `insert into comments(articleid, user, createtime, comment) values(${id}, '${ctx.session.passport.user}', '${new Date().getTime()}', ${comment})`
    const result = await exec(sql)

    if(result.affectedRows){
        ctx.body = {
            code: 0,
            msg: '评论成功'
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '服务器发生错误，评论失败'
        }
    }
})

router.post('/getComment', async (ctx,next) => {
    let {fromid, articleid} = ctx.request.body
    articleid = escape(articleid)

    let sql = `select id, user, createtime, comment, isto from comments where `
    if(fromid !== null){
        sql += `fromid = ${fromid} and `
    }else{
        sql += `fromid is null and `
    }
    sql += `articleid=${articleid} order by createtime desc`

    const result = await exec(sql)

    if(result.length){

        ctx.body = {
            code: 0,
            comments: result,
            msg: ''
        }
    }else{
        ctx.body = {
            code: -1,
            comments: [],
            msg: '没有评论'
        }
    }
})

router.post('/setChildComment', async (ctx, next) => {
    let {fromid, comment, articleid} = ctx.request.body
    comment = escape(comment)

    let sql = `update comments set isto=1 where id=${fromid}`
    let result = await exec(sql)
    if(result.affectedRows){
        sql = `insert into comments(articleid, user, createtime, comment, fromid) values(${articleid}, '${ctx.session.passport.user}', '${new Date().getTime()}', ${comment}, ${fromid})`

        result = await exec(sql)
        if(result.affectedRows){
            ctx.body = {
                code: 0,
                msg: '成功'
            }
        }else{
            ctx.body = {
                code: -1,
                msg: '服务器出错，评论失败'
            }
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '服务器出错，评论失败'
        }
    }
})

export default router