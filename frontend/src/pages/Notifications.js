/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Notifications Page
*/
import AuthContext from '../context/AuthContext'
import React, {useContext, useEffect, useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Chat } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import "./Tg2.css"
import CryptoJS from 'crypto-js'
import { useNavigate } from 'react-router-dom'


const Notifications = () => {
  let {user} = useContext(AuthContext)
  let [peers, setPeers] = useState([])
  let[encVal, setEncVal] = useState([])
  let history = useNavigate()

  //fetch notifications from the backend
  let getNums = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/getNotifs/${user.user_id}/`)
    let data = await response.json()
    setPeers(data)
    
  }

  //delete notification when icon pressed
  const del = async (user2) => {
    fetch(`http://127.0.0.1:8000/api/delete/${user.user_id}/${user2}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  useEffect(() => {
    getNums()
  }, [])

  //encoding function using SHA256 hashing
  const enc = () => {
    let tmp = []
    for(let i = 0; i < peers?.length; ++i){
        const user2 = peers[i].user
        let val = []
        val.push(user.user_id.toString())
        val.push(user2.toString())
        val.sort()
        val = val.join('')
        
        const enc = CryptoJS.SHA256(
            val   
        ).toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32')
        tmp.push({...peers[i], pass: enc})
      }
    setEncVal(tmp)
  }
  useEffect(() => {
    enc()
  }, [peers])

  //display notifications with icon
  return (
    <div>
    <Grid container spacing={1} sx={{ p: 3 }} >
    {encVal?.map((value, key) => (
         <Grid item key={key} xs={12} md={3}>
         <Card sx={{ height: "100%", display: "flex", flexDirection: "column",  backgroundColor: "#222"}}>
           <CardContent sx={{ flex: 1 }}>
           <Grid container spacing={2} sx={{ p: 0}}>
             <Grid item key={key} xs={5} md={9.5}>
                 <Typography variant="h5" color="text.secondary" sx={{ color: "#fff" }}>
                 {value.firstname} {value.lastname}
                 </Typography>
             </Grid>
             </Grid>
             <Grid item key={key} xs={0} md={0}sm={12}>
                <IconButton sx={{ color: "#fff" }}>
                    
                    <Chat onClick={() => {
                        del(value.user)
                        history(
                        {
                            pathname: `/chat/${value.pass}/${value.user}`,
                            state: {propValue: value.user}}
                        )
                        }}/>
                </IconButton>
            </Grid>
          </CardContent>  
        </Card>
        </Grid>
    ))}
    </Grid>
    </div>
    
  )
}

export default Notifications