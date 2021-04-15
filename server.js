const express=require("express");
const app=express();
const http=require("http").createServer(app);

const PORT =process.env.PORT || 3000;

//middleware
app.use(express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
})

http.listen(PORT,(req,res)=>{
    console.log("Server connecting successfully...");
})


//socket

const io=require("socket.io")(http);

io.on('connection',(socket)=>{
    socket.on("message",(msg)=>{
        socket.broadcast.emit("message",msg);
    })
})