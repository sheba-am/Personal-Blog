import mysql from "mysql"
// export const db = mysql.createConnection({
//     host:"localhost",
//     user: "root",
//     password: "NotGonna$65",
//     database: blog01,
// })
export const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'NotGonna$65',
    database: 'blog01'
});



export const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: 'NotGonna$65',
    database: 'blog01',
    
});