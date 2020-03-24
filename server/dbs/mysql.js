const { dbs } = require('./conf.js') 
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection( dbs )

// 开始连接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
    const promise = new Promise((resolve, reject) => {
        con.query(sql, (err, result) => {
            if(err) {
                reject(err)
                return
            } 
    
            resolve(result)
        })
    })

    promise.catch(err => {
        console.log(err)
    })

    return promise
}

module.exports = {
    exec,
    escape: mysql.escape
}
