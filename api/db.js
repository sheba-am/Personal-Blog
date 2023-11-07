import mysql from "mysql"
export const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "NotGonns$65",
    database: blog01
})