import express from "express"
const app = express()
// to be able to send data from browser
app.use(express.json() )
app.listen(8800,() => { 
    console.log("Connected!")
})