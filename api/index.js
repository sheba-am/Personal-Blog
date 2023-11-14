import express from "express"
import postRoutes from "./routes/posts.js"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import multer from "multer"
//import mysql from "mysql"





const app = express()
// to be able to send data from browser
app.use(express.json() )
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })

const upload = multer({ storage })

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file
    res.status(200).json(file.filename)

  })


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