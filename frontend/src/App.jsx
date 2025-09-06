// import { useEffect, useRef, useState } from 'react'
// import './App.css'
// import Editor from '@monaco-editor/react'

// // io() is the Socket.IO client function (made available by <script src="/socket.io/socket.io.js">).
// // Calling io() creates a connection from the browser to your Socket.IO server the io you created on the Node side).


// import io from 'socket.io-client'

// //connection req bhejta h to server  at node side and rreq type is http
// //socket is the object represting the connetion btw client and server
// const socket=io('http://localhost:5000')

// export const App = () => {
//   const [joined,setjoined]=useState(false);
//   const [roomid,setroomid]=useState("");
//   const [userName,setusername]=useState("");
//   const [language,setlanguage]=useState('javascript');
//   const [code,setcode]=useState('//Start your code here')
//   const[copysuccess,setcopysuccess]=useState('')
//   const [users,setusers]=useState([])
//   const [typing,settyping]=useState('')
//   const [output,setoutput]=useState('')
//   const [version,setversion]=useState('*')

  












//  useEffect(()=>{
//     socket.on('userjoined',(users)=>{
//       setusers(users)    
//     });
 

//     socket.on('codeupdate',(newcode)=>{
//       setcode(newcode)
//     })

//     socket.on('usertyping',(user)=>{
      
//       settyping(`${user} is typing`)
//       setTimeout(() =>  settyping('')  , 4000);
//       //meanss it will show usetyping for 4second only and them make it enpty
//     }) 

//     socket.on('languageupdate',(newlanguage)=>{
//       setlanguage(newlanguage)
//     })

//     socket.on('coderesponse',(response)=>{
//       setoutput(response.run.output)
//     })

//     socket.on("chatmessage", ({ username, message }) => {
//       setMessages((prev) => [...prev, { username, message }]);
//     });
    
//     return ()=>{
//       socket.off('userjoined')
//       socket.off('codeupdate')
//       socket.off('usertyping')
//       socket.off('languageupdate')
//       socket.off('coderesponse')
//       socket.off("chatmessage");


//     // This is the cleanup function that React will run when the component unmounts.
//     //socket.off(event) means: “Stop listening for this event.”
//     // If you don’t unsubscribe:
//     // Memory leaks: Old callbacks pile up.
//     // Duplicate events: If the component mounts again, you’ll subscribe twice, and now each event is handled twice.
//     // Errors/warnings: React warns if you update state on a component that no longer exist
//     }
//   },[])
  
  







//   useEffect(()=>{
//     const handlebeforeunload=()=>{socket.emit('leaveroom')}
//     //beforeunload = browser event that fires just before the page is closed, refreshed, or navigated away.
//     window.addEventListener('beforeunload',handlebeforeunload)
//     return ()=>{
//       window.removeEventListener('beforeunload',handlebeforeunload)
//     }
//   },[])
  





//   const joinroom = () => {
//     if (roomid && username) {
//       socket.emit("join", { roomid, userName });
//       setjoined(true);
//     }
//   };


//   const handlecodechange=(newcode)=>{
//     setcode(newcode)
//     socket.emit('typing',{roomid,userName})
//     socket.emit('codechange',{roomid,code:newcode});
//   }


//   const handlelanguagechange=e=>{
//     const newlanguage= e.target.value;
//     setlanguage(newlanguage)
//    socket.emit('languagechange',{roomid,language:newlanguage});
//   }



//   const runcode=()=>{
//     socket.emit('compilecode',{code,roomid,language,version})
//   }
//   //user ko join krane k liye func
//   const joinroom=()=>{
//     if(roomid && userName){
//       socket.emit('join',{roomid, username:userName})
//       console.log(`${userName} joined room ${roomid}`);

//       setjoined(true);
//     }
//   }
//   const copyroomid=()=>{
//    navigator.clipboard.writeText(roomid)
//    setcopysuccess("Copied!")
//    setTimeout(() => setcopysuccess(""),2000);

//   }


//   const leaveroom=()=>{
//     socket.emit('leaveroom')
//     setjoined(false)
//     setroomid('')
//     setcode('//Start your code here')
//     setusername('')
//     setlanguage('javascript')
//   }



//   const sendMessage = () => {
//     if (chatInput.trim()) {
//       socket.emit("chatmessage", { roomid, username: userName, message: chatInput });
//       setChatInput("");
//     }
//   };
  

//   if(!joined){
//     return (
//       <div className='join-container' >
//         <div className='join-form'>
//           <h1>Join Code Room</h1>

//           <input type="text" 
//           placeholder='RoomId'  
//           value={roomid}
//           onChange={(e)=>{setroomid(e.target.value)}}/>

//         <input type="text" 
//           placeholder='Your Name'  
//           value={userName}
//           onChange={(e)=>{setusername(e.target.value)}}/>

//           <button onClick={joinroom}>Join Room</button>
//         </div>
//       </div>
//     )
    

//   }
//   return <div className='editor-container'>
//       <div className='sidebar'>
//         <div className='room-info'>
//           <h2>Code Room:{roomid}</h2>
//           <button onClick={copyroomid} className='copy-button'>Copy ID
//           </button>
//           {copysuccess && <span className='copy-success'>
//             {copysuccess}</span>}
//         </div>
//         <h3>Users in Rooms</h3>
//         <ul>
//           {
//             users.map((user,index)=>(
//               <li key={index}>{user}</li>
//             ))
//           }
//           </ul>
//           <p className='typing-indicator'>{typing}</p>
//           <select className='language-selector' 
//           value={language}
//           onChange={handlelanguagechange}>
//             <option value="javascript">JavaScript</option>
//             <option value="python">Python</option>
//             <option value="java">Java</option>
//             <option value="cpp">C++</option>
//           </select>
//           <button className='leave-button' onClick={leaveroom}>Leave Room</button>



//           <div className="chat-box">
//   <h3>Chat</h3>
//   <div className="messages">
//     {messages.map((msg, i) => (
//       <p key={i}><strong>{msg.username}:</strong> {msg.message}</p>
//     ))}
//   </div>
//   <div className="chat-input">
//     <input
//       type="text"
//       value={chatInput}
//       onChange={(e) => setChatInput(e.target.value)}
//       placeholder="Type a message..."
//     />
//     <button onClick={sendMessage}>Send</button>
//   </div>
// </div>










//       </div>
      

//       <div className='editor-wrapper'>
//         <Editor
//         key={language}   
//         height={"60%"}
//         // defaultLanguage={language}
//         language={language}
//         value={code}
//         onChange={(handlecodechange)}
//         theme='vs-dark'
//         options={
//           {
//             minimap:{enabled:false},
//             fontSize:14,
//           }
//         }
//         />
//         <button className='run-btn' onClick={runcode}> Execute</button>
//         <textarea className="output-console" value={output}  readOnly placeholder='output will appear here '></textarea>
          

        
//       </div>
//     </div>
 
 
// }

// export default App;


import { useEffect, useRef, useState } from 'react'
import './App.css'
import Editor from '@monaco-editor/react'
// io() is the Socket.IO client function (made available by <script src="/socket.io/socket.io.js">).
// Calling io() creates a connection from the browser to your Socket.IO server the io you created on the Node side).


import io from 'socket.io-client'

//connection req bhejta h to server  at node side and rreq type is http
//socket is the object represting the connetion btw client and server
const socket=io('https://realtime-codecollab-0okt.onrender.com')

export const App = () => {
  const [joined,setjoined]=useState(false);
  const [roomid,setroomid]=useState("");
  const [userName,setusername]=useState("");
  const [language,setlanguage]=useState('javascript');
  const [code,setcode]=useState('//Start your code here')
  const[copysuccess,setcopysuccess]=useState('')
  const [users,setusers]=useState([])
  const [typing,settyping]=useState('')
  const [output,setoutput]=useState('')
  const [version,setversion]=useState('*')




  const [chatInput, setChatInput] = useState("");
const [messages, setMessages] = useState([]);


  // * means all version accepted

  //users → an array of usernames currently in the room. 
  //Updated when the server broadcasts "userjoined".


 useEffect(()=>{
    socket.on('userjoined',(users)=>{
      setusers(users)
    });

    socket.on('codeupdate',(newcode)=>{
      setcode(newcode)
    })

    socket.on('usertyping',(user)=>{
      
      settyping(`${user} is typing`)
      setTimeout(() =>  settyping('')  , 4000);
      //meanss it will show usetyping for 4second only and them make it enpty
    }) 

    socket.on('languageupdate',(newlanguage)=>{
      setlanguage(newlanguage)
    })

    socket.on('coderesponse',(response)=>{
      setoutput(response.run.output)
    })



    socket.on("chatmessage", ({ username, message }) => {
      setMessages((prev) => [...prev, { username, message }]);
    });
    
    return ()=>{
      socket.off('userjoined')
      socket.off('codeupdate')
      socket.off('usertyping')
      socket.off('languageupdate')
      socket.off('coderesponse')
      socket.off("chatmessage");


    // This is the cleanup function that React will run when the component unmounts.
    //socket.off(event) means: “Stop listening for this event.”
    // If you don’t unsubscribe:
    // Memory leaks: Old callbacks pile up.
    // Duplicate events: If the component mounts again, you’ll subscribe twice, and now each event is handled twice.
    // Errors/warnings: React warns if you update state on a component that no longer exist
    }
  },[])


  useEffect(()=>{
    const handlebeforeunload=()=>{socket.emit('leaveroom')}
    //beforeunload = browser event that fires just before the page is closed, refreshed, or navigated away.
    window.addEventListener('beforeunload',handlebeforeunload)
    return ()=>{
      window.removeEventListener('beforeunload',handlebeforeunload)
    }
  },[])

  const handlecodechange=(newcode)=>{
    setcode(newcode)
    socket.emit('typing',{roomid,userName})
    socket.emit('codechange',{roomid,code:newcode});
  }


  const handlelanguagechange=e=>{
    const newlanguage= e.target.value;
    setlanguage(newlanguage)
   socket.emit('languagechange',{roomid,language:newlanguage});
  }



  const runcode=()=>{
    socket.emit('compilecode',{code,roomid,language,version})
  }
  //user ko join krane k liye func
  const joinroom=()=>{
    if(roomid && userName){
      socket.emit('join',{roomid, username:userName})
      console.log(`${userName} joined room ${roomid}`);

      setjoined(true);
    }
  }
  const copyroomid=()=>{
   navigator.clipboard.writeText(roomid)
   setcopysuccess("Copied!")
   setTimeout(() => setcopysuccess(""),2000);

  }


  const leaveroom=()=>{
    socket.emit('leaveroom')
    setjoined(false)
    setroomid('')
    setcode('//Start your code here')
    setusername('')
    setlanguage('javascript')
  }



  const sendMessage = () => {
    if (chatInput.trim()) {
      socket.emit("chatmessage", { roomid, username: userName, message: chatInput });
      setChatInput("");
    }
  };
  

  if(!joined){
    return (
      <div className='join-container' >
        <div className='join-form'>
          <h1>Join Code Room</h1>

          <input type="text" 
          placeholder='RoomId'  
          value={roomid}
          onChange={(e)=>{setroomid(e.target.value)}}/>

        <input type="text" 
          placeholder='Your Name'  
          value={userName}
          onChange={(e)=>{setusername(e.target.value)}}/>

          <button onClick={joinroom}>Join Room</button>
        </div>
      </div>
    )
    

  }
  return <div className='editor-container'>
      <div className='sidebar'>
        <div className='room-info'>
          <h2>Code Room:{roomid}</h2>
          <button onClick={copyroomid} className='copy-button'>Copy ID
          </button>
          {copysuccess && <span className='copy-success'>
            {copysuccess}</span>}
        </div>
        <h3>Users in Rooms</h3>
        <ul>
          {
            users.map((user,index)=>(
              <li key={index}>{user}</li>
            ))
          }
          </ul>
          <p className='typing-indicator'>{typing}</p>
          <select className='language-selector' 
          value={language}
          onChange={handlelanguagechange}>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          <button className='leave-button' onClick={leaveroom}>Leave Room</button>



          <div className="chat-box">
  <h3>Chat</h3>
  <div className="messages">
    {messages.map((msg, i) => (
      <p key={i}><strong>{msg.username}:</strong> {msg.message}</p>
    ))}
  </div>
  <div className="chat-input">
    <input
      type="text"
      value={chatInput}
      onChange={(e) => setChatInput(e.target.value)}
      placeholder="Type a message..."
    />
    <button onClick={sendMessage}>Send</button>
  </div>
</div>


      </div>

      <div className='editor-wrapper'>
        <Editor
        key={language}   
        height={"60%"}
        // defaultLanguage={language}
        language={language}
        value={code}
        onChange={(handlecodechange)}
        theme='vs-dark'
        options={
          {
            minimap:{enabled:false},
            fontSize:14,
          }
        }
        />
        <button className='run-btn' onClick={runcode}> Execute</button>
        <textarea className="output-console" value={output}  readOnly placeholder='output will appear here '></textarea>
          

        
      </div>
    </div>
 
 
}

export default App;  
 
 