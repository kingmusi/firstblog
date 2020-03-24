import Router from 'koa-router'
import { exec, escape } from '../dbs/mysql'

const router  = new Router({
    prefix: '/blog'
})

router.post('/create', async (ctx, next) => {
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: -1,
            msg: '你还未登陆',
            id: ''
        }
        return
    }
    let {title, content, bigType, smallType, img} = ctx.request.body
    title = escape(title)
    content = escape(content)
    bigType = escape(bigType)
    smallType = escape(smallType)
    img = escape(img)
    
    const time = new Date().getTime()
    const author = ctx.session.passport.user

    const sql = `insert into blogs(title, content, createtime, author, img, bigType, smallType) 
                             values(${title}, ${content}, ${time}, '${author}', ${img}, ${bigType}, ${smallType})`

    const result = await exec(sql)
    if(result.affectedRows){
        ctx.body = {
            code: 0,
            msg: '创建成功',
            id: result.insertId
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '创建失败',
            id: ''
        }
    }
})

router.post('/getBlog', async (ctx, next) => {
    const {id} = ctx.request.body

    const sql = `select title, content, createtime, author, img, bigType, smallType from blogs where id=${id}`
    const result = await exec(sql)
    if(result[0]){
        ctx.body = {
            code: 0,
            title: result[0].title,
            content: result[0].content,
            createtime: result[0].createtime,
            author: result[0].author,
            img: result[0].img,
            bigType: result[0].bigType,
            smallType: result[0].smallType
        }
    }else{
        ctx.body = {
            code: -1,
            msg: '没有此文章'
        }
    }
})
 
router.get('/getBloglist', async (ctx, next) => {
    const { bigType, smallType, countstart, count } = ctx.query

    let sql = `select id, title, content, createtime, author, bigType, smallType from blogs where 1=1 `
    if(bigType.length){
        sql += `and bigType='${bigType}' `
    }
    if(smallType.length){
        sql += `and smallType='${smallType}'`
    }
    sql += `order by createtime desc limit ${countstart}, ${count}`

    const result = await exec(sql)
    if(result.length){
        ctx.body = {
            code: 0,
            result,
            msg: ''
        }
    }else{
        ctx.body = {
            code: -1,
            result: [],
            msg: '没有数据了'
        }
    }
})

router.get('/getType', async (ctx, next) => {
    let result = []
    let sql = `select count(smallType) as counts,bigType as label,bigType as value from types group by bigType;`
    const bigTypeResult = await exec(sql)

    sql = `select smallType as label, smallType as value from types order by bigType;`
    const smallTypeResult = await exec(sql)

    let index = 0    
    bigTypeResult.forEach(item => {
        item.children = smallTypeResult.slice(index, item.counts+index)
        result.push(item)
        index += item.counts
    })

    if(result.length){
        ctx.body = {
            code: 0,
            typeList: result
        }
    }else{
        ctx.body = {
            code: -1,
            typeList: []
        }
    }
})

router.get('/selectBlog', async (ctx, next) => {
    let {search} = ctx.query
    if(search === ''){
        ctx.body = {
            code:-1,
            list:[],
            msg:'无'
        }
        return 
    }
    search = escape('%' + search + '%')

    const sql = `select id,title from blogs where content like ${search} or title like ${search} limit 0, 10`

    const result = await exec(sql)
    if(result.length){
        ctx.body = {
            code:0,
            list: result,
            msg: '找到数据'
        }
    }else{
        ctx.body = {
            code: -1,
            list: [],
            msg: '未找到结果'
        }
    }
})

router.post('/update', async (ctx, next) => {
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code: 0,
            msg: '未登录，不能修改'
        }
        return
    }

    let {id,title,bigType,smallType,content,img} = ctx.request.body
    title = escape(title)
    bigType = escape(bigType)
    smallType = escape(smallType)
    content = escape(content)
    img = escape(img)

    const sql = `update blogs set title=${title},bigType=${bigType},smallType=${smallType},content=${content},img=${img} where id=${id}`
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

router.get('/getUserBlog', async (ctx, next) => {
    if(!ctx.isAuthenticated()){
        ctx.body = {
            code:-1,
            result:[],
            msg: '未登录'
        }
        return
    }

    const sql = `select id,title,createtime from blogs where author='${ctx.session.passport.user}'`

    const result = await exec(sql)
    if(result.length){
        ctx.body = {
            code: 0,
            result,
            msg: '成功'
        }
    }else{
        ctx.body = {
            code: 0,
            result: [],
            msg: '没有数据'
        }
    }
})

router.post('/getOtherBlog', async (ctx, next) => {
    let {author} = ctx.request.body
    const sql = `select id,title,createtime from blogs where author='${author}'`

    const result = await exec(sql)
    if(result.length){
        ctx.body = {
            code: 0,
            result,
            msg: '成功'
        }
    }else{
        ctx.body = {
            code: 0,
            result: [],
            msg: '没有数据'
        }
    }
})

export default router