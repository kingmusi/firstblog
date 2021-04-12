// const env = process.env.NODE_ENV

// let dbs
// let redis

// if (env === 'dev') {
//     dbs = {
//         host: 'localhost',
//         user: 'root',
//         password: '852456',
//         port: '3306',
//         database: 'myblog'
//     }

//     redis = {
//         port: '6379',
//         host: '127.0.0.1'
//     }
// }

// if (env === 'start') {
//     dbs = {
//         host: 'localhost',
//         user: 'root',
//         password: '852456',
//         port: '3306',
//         database: 'myblog'
//     }

//     redis = {
//         port: '6379',
//         host: '127.0.0.1'
//     }
// }

let dbs = {
    host: 'localhost',
    user: 'root',
    password: '852456',
    port: '3306',
    database: 'myblog',
    useConnectionPooling: true
}

let redis = {
    port: '6379',
    host: '127.0.0.1'
}

module.exports = {
    dbs,
    redis
}