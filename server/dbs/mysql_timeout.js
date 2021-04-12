const { dbs } = require('./conf.js')
const mysql = require('mysql')

var con = null

function connect () {
  con = mysql.createConnection(dbs);
  con.connect(handleError);
  con.on('error', handleError);
}

// 到时间则重连重连
function handleError (err) {
  if (err) {
    // 如果是连接断开，自动重新连接
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      connect();
    } else {
      console.error(err.stack || err);
    }
  }
}

connect()

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
