import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import { exec } from '../../dbs/mysql'

passport.use(new LocalStrategy(async (username, password, done)=> {
    const sql = `select username,password from users where username='${username}'`
    let result = await exec(sql)
    if(result != undefined){
        if(result[0].password == password){
            return done(null, result[0].username)
        }else{
            return done(null, false, '密码错误')
        }
    }else{
        return done(null, false, '用户不存在')
    }
}))

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    return done(null, user)
})

export default passport