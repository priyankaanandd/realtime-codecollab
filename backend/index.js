// import express from 'express'
// import http from "http"

// import {Server} from "socket.io"
// import path from 'path'
// import axios from 'axios'

// //just lie const express=requre('express)

// const app=express();

// //This attaches a Socket.IO server (io) to your HTTP server.
// //io = WebSocket server,
// // Now your HTTP server can handle both:
// // Normal HTTP requests (via Express app)
// // WebSocket connections (via Socket.IO io)

// const server=http.createServer(app)
// const io=new Server(server,{
//     cors:"*",
// });


// // rooms = {
// //     "room1": Set { "Alice", "Bob" },
// //     "room2": Set { "Priyanka" }
// //this is what rooms below is for 
// //  } 
// const rooms=new Map();
// //Server emits "connection" event
// //io.on("connection") → server-only, listens for new client connections.
// //socket.on("event") → listens for custom events/messages after connection is established

// // socket.emit → private message to this client only.
// // io.emit → send to all clients globally.
// // socket.to(roomid).emit → notify everyone else in the room (not me).
// // io.to(roomid).emit → notify everyone in the room, including me.

// io.on("connection",(socket)=>{
//     console.log("user connected",socket.id)

//     let currentuser=null;
//     let currentroom=null;

//     socket.on('join',({roomid,username})=>{
//         if(currentroom){
//             socket.leave(currentroom)
//             rooms.get(currentroom).delete(currentuser)
//            io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));}  

       
//        currentroom = roomid;
//     currentuser = username;

//     socket.join(roomid);

//     if (!rooms.has(roomid)) {
//       rooms.set(roomid, new Set());
//     }

//     rooms.get(roomid).add(username);
//     io.to(roomid).emit('userjoined',Array.from(rooms.get(currentroom)));
//     // create a map of socket.id -> username for the room
//     // Maintain socket.id -> username map per room




        
//         socket.on('codechange',({roomid,code})=>{
//             socket.to(roomid).emit('codeupdate',code)
//         })

//         socket.on('leaveroom',()=>{

//             if(currentroom && currentuser){
//                 rooms.get(currentroom).delete(currentuser)
//                 io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));
                
//                 socket.leave(currentroom)
//                 currentroom=null
//                 currentuser=null
            
//             }
//         })
//         //disconnect is a built-in Socket.IO event.
//         //It is automatically triggered whenever the client’s socket connection to the server is lost, for any reason.
//         //if no leaveroom is triggered then use thsi

//         socket.on('disconnect',()=>{
//             if(currentroom && currentuser){
//                 rooms.get(currentroom).delete(currentuser)
//                 io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));
               
            
//             }
//             console.log('user disconnected')
//         })

//         socket.on('typing',({roomid,userName})=>{
//             socket.to(roomid).emit("usertyping",userName)
//         })

//         socket.on('languagechange',({roomid,language})=>{
//             console.log(`Language change in room ${roomid} -> ${language}`);
//             io.to(roomid).emit('languageupdate',language);  
//         })

//         socket.on('compilecode' , async({code,roomid,language,version})=>{
//             if(rooms.has(roomid)){
//                 const room=rooms.get(roomid)
//                 const response = await axios.post("https://emkc.org/api/v2/piston/execute",{
//                 language,
//                 version,
//                     files:[
//                         {
//                             content:code
//                         }
                        
//                     ]
//                 })

//                 room.output = response.data.run.output
//                 io.to(roomid).emit('coderesponse',response.data)
//             }
//         })

//         socket.on("chatmessage", ({ roomid, username, message }) => {
//             console.log(`[${roomid}] ${username}: ${message}`);
//             io.to(roomid).emit("chatmessage", { username, message });
//         });

//         socket.on('call-user', ({ roomid, signalData, to }) => {
//             io.to(to).emit('call-made', { signalData, from: socket.id });
//         });
        
//         socket.on('make-answer', ({ to, signalData }) => {
//             io.to(to).emit('answer-made', { signalData, from: socket.id });
//         });
        
        
//     })
// })

// const port=process.env.PORT || 5000; 
// const __dirname=path.resolve()
// app.use(express.static(path.join(__dirname,"frontend/dist")))
// app.get(/.*/,(req,res)=>{
//     res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
// })

// server.listen(port,()=>{
//     console.log("server is running on 5000")
// })




import express from 'express'
import http from "http"

import {Server} from "socket.io"
import path from 'path'
import axios from 'axios'

//just lie const express=requre('express)

const app=express();

//This attaches a Socket.IO server (io) to your HTTP server.
//io = WebSocket server,
// Now your HTTP server can handle both:
// Normal HTTP requests (via Express app)
// WebSocket connections (via Socket.IO io)

const server=http.createServer(app)

//for hosting

const url = `https://render-hosting-se2b.onrender.com`;
const interval = 30000;
function reloadWebsite() {
  axios
    .get(url)
    .then((response) => {
      console.log("website reloded");
    })
    .catch((error) => {
      console.error(`Error : ${error.message}`);
    });
}
setInterval(reloadWebsite, interval);



const io=new Server(server,{
    cors:"*",
});


// rooms = {
//     "room1": Set { "Alice", "Bob" },
//     "room2": Set { "Priyanka" }
//this is what rooms below is for 
//  } 
const rooms=new Map();
//Server emits "connection" event
//io.on("connection") → server-only, listens for new client connections.
//socket.on("event") → listens for custom events/messages after connection is established

// socket.emit → private message to this client only.
// io.emit → send to all clients globally.
// socket.to(roomid).emit → notify everyone else in the room (not me).
// io.to(roomid).emit → notify everyone in the room, including me.

io.on("connection",(socket)=>{
    console.log("user connected",socket.id)

    let currentuser=null;
    let currentroom=null;

    socket.on('join',({roomid,username})=>{
        if(currentroom){
            socket.leave(currentroom)
            rooms.get(currentroom).delete(currentuser)
            io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));
        }
        currentroom=roomid;
        currentuser=username;


        socket.join(roomid)

        if(!rooms.has(roomid)){
            rooms.set(roomid,new Set());
        }

        rooms.get(roomid).add(username);

        io.to(roomid).emit('userjoined',Array.from(rooms.get(currentroom)));
        socket.on('codechange',({roomid,code})=>{
            socket.to(roomid).emit('codeupdate',code)
        })

        socket.on('leaveroom',()=>{

            if(currentroom && currentuser){
                rooms.get(currentroom).delete(currentuser)
                io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));
                
                socket.leave(currentroom)
                currentroom=null
                currentuser=null
            
            }
        })
        //disconnect is a built-in Socket.IO event.
        //It is automatically triggered whenever the client’s socket connection to the server is lost, for any reason.
        //if no leaveroom is triggered then use thsi

        socket.on('disconnect',()=>{
            if(currentroom && currentuser){
                rooms.get(currentroom).delete(currentuser)
                io.to(currentroom).emit('userjoined',Array.from(rooms.get(currentroom)));
               
            
            }
            console.log('user disconnected')
        })

        socket.on('typing',({roomid,userName})=>{
            socket.to(roomid).emit("usertyping",userName)
        })

        socket.on('languagechange',({roomid,language})=>{
            console.log(`Language change in room ${roomid} -> ${language}`);
            io.to(roomid).emit('languageupdate',language);  
        })

        socket.on('compilecode' , async({code,roomid,language,version})=>{
            if(rooms.has(roomid)){
                const room=rooms.get(roomid)
                const response = await axios.post("https://emkc.org/api/v2/piston/execute",{
                language,
                version,
                    files:[
                        {
                            content:code
                        }
                        
                    ]
                })

                room.output = response.data.run.output
                io.to(roomid).emit('coderesponse',response.data)
            }
        })
        
        socket.on("chatmessage", ({ roomid, username, message }) => {
            console.log(`[${roomid}] ${username}: ${message}`);
            io.to(roomid).emit("chatmessage", { username, message });
        });
        
    })
})

const port=process.env.PORT || 5000; 
const __dirname=path.resolve()
app.use(express.static(path.join(__dirname,"frontend/dist")))
app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(port,()=>{
    console.log("server is running on 5000")
}) 
