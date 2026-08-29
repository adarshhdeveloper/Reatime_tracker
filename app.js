const express = require("express")
const app = express()

//socket setup or boiler plat 
const http = require("http")
const path = require("path")
const  scocketio = require("socket.io")
const server = http.createServer(app)
const io = scocketio(server)
//socket setup done

//view engin setup 
app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,"public")))   //usefull for access static files from public folder into browser 

// io handle 
io.on("connection",(scocket)=>{
    console.log("Connected")
})

app.get("/",(req,res)=>{
    res.render("index")
})
server.listen(3000,()=>{
    console.log("Server is Running")
})