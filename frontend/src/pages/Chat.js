/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Frontend for room chats
*/
import React, {useContext, useEffect, useState} from 'react'
import { useLocation, useParams} from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { w3cwebsocket as W3cWebSocket } from 'websocket'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';
import { Box } from '@mui/material';
import { VideoCameraFront } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(10),
    paddingTop:theme.spacing(3),

    margin: theme.spacing(2),
    maxWidth: 2000,
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(1),
  },
  username: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
  },
  content: {
    paddingLeft: theme.spacing(1),
  },
}));

const Chat = () => {

  //variables
  const classes = useStyles();
  const {room_name, user2} = useParams()
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [fname, setFname] = useState("")
  let [notif, setNotif] = useState("")
  let [vals, setVals] = useState([])
  let {user} = useContext(AuthContext)
  const history = useNavigate()
  
  let getUsername = async() => {
    let response = await fetch(`http://127.0.0.1:8000/api/profile/${user.user_id}/`)
    let data = await response.json()
    setFname(data["firstname"])
    
  } 
  let getMsgs = async() => {
    
    let response = await fetch(`http://127.0.0.1:8000/api/messages/${room_name}/`)
    let data = await response.json()
    setVals(data)

    
  } 

  //check backend for room 
  let getRoom = async () => {
    fetch(`http://127.0.0.1:8000/api/getroom/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"room": room_name})   
    })
  }
  
  //delete notification once user recieves messga
  const del = async (user2) => {
      fetch(`http://127.0.0.1:8000/api/delete/${user.user_id}/${user2}/`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        }
      })
    }



  useEffect(() => {
    getRoom()
  }, [])

  useEffect(() => {
    getMsgs()
  }, [])

  useEffect(() => {
    getUsername()
  }, [])


  useEffect(() => {
    //https://blog.devgenius.io/building-a-real-time-chat-application-with-django-channels-and-react-ee2d8fee7328?gi=08febecce60b for Websocket 
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${room_name}/`)
    setSocket(newSocket)
    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");
    console.log(user)
    return () => {
        newSocket.close();
    };

  }, [])

  //Message recieved through websocket
  useEffect(() => {
    if(socket){
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data)
            del(user2)
            setMessages((prevMessages) => [...prevMessages, data])
        }
    }
  }, [socket])

  //sending message (goes through backend)
  const handleSubmit = (event) => {
    event.preventDefault()

    if(message && socket) {
        console.log("YOLO", user2)
        socket.send(JSON.stringify({
            'message': message,
            "username": fname, 
            "user1": user.user_id,          
            "user2": user2,
        }));
        setMessage("")
    }
  }

  //use MUI Paper and Typography to make the chat look nice
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <Paper className={classes.paper}sx={{ maxWidth: '1000px', margin: 'auto', padding: '1rem'}} >
        <Box sx={{ maxHeight: 600, overflowY: 'auto', paddingRight: 30}}>
            {vals.map((val, index) => (
              <div key={index} className={classes.message}>
                <Typography variant="caption">{val.timestamp}</Typography>
                <Typography variant="subtitle2" className={classes.username}>
                  {val.username}
                </Typography>
                <Typography variant="body1" className={classes.content}>
                  {val.content}
                </Typography>
              </div>
            ))}
            {messages.map((message, index) => (
              <div key={index} className={classes.message}>
                <Typography variant="caption">{message.timestamp}</Typography>
                <Typography variant="subtitle2" className={classes.username}>
                  {message.username}
                </Typography>
                <Typography variant="body1" className={classes.content}>
                  {message.message}
                </Typography>
              </div>
            ))}
            </Box>
          </Paper>
    </div>
    
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder='Type Message...' value={message} onChange={(event) => setMessage(event.target.value)} />
            <button type="submit">Send</button>
        </form>
      
        <VideoCameraFront style={{ fontSize: '45px' }} onClick={() => history(`/webcam/${room_name}`)}/>
      
      </div>
    </div>
  )
}

export default Chat