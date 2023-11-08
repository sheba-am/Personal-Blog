import express from "express"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
//import mysql from "mysql"





const app = express()
// to be able to send data from browser
app.use(express.json() )
app.use(cookieParser())
app.use("/api/posts", postRoutes)
app.use("/api/users", userRoutes)
app.use("/api/auth", authRoutes)

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "NotGonna$65"
//   });
  
//   con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//   });

// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'NotGonna$65',
//     database: 'blog01'
// });

// connection.connect(function(err) {

//     if (err) {
//         return console.error('error: ' + err.message);
//     }

//     console.log('Connected to the MySQL server.');
// });


app.listen(8800,() => { 
    console.log("Connected!")
})