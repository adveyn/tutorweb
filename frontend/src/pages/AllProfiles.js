/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Getting all profiles of users specified
*/
import React, { useEffect, useState, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import CryptoJS from 'crypto-js'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { Chat } from '@mui/icons-material'
import IconButton from '@mui/material/IconButton'
import "./Tg2.css"
import { useNavigate } from 'react-router-dom'
import { Form, FormControl} from 'react-bootstrap';

const AllProfiles = () => {
    const history = useNavigate()
    let [profiles, setProfiles] = useState([])
    let [elems, setElems] = useState([])

    let {user} = useContext(AuthContext)
    
    //deletes notification once icon is clicked
    const del = async (user2) => {
    fetch(`http://127.0.0.1:8000/api/delete/${user.user_id}/${user2}/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    }

    //hash the url for chat room using user ids 
    const handle = (e) => {
        const tmp = []
        for(let i = 0; i < profiles.length;++i){
            if((profiles[i].firstname.includes(e.target.value) || (profiles[i].lastname.includes(e.target.value)) ||  (profiles[i].competence.includes(e.target.value)) || (profiles[i].level.includes(e.target.value)) ||  (profiles[i].subjects.includes(e.target.value))) && profiles[i].role == "tutor"){
                let val = []    
                val.push(user.user_id.toString())
                val.push(profiles[i].user.toString())
                val.sort()
                val = val.join('')
                
                const enc = CryptoJS.SHA256(
                    val   
                ).toString().replace('+','xMl3Jk').replace('/','Por21Ld').replace('=','Ml32')

                console.log(val, enc)
                
                tmp.push({...profiles[i], 'pass': enc, "this": user.user_id.toString(), "other": profiles[i].user.toString()})
                console.log("TMP", tmp)
            } 
        }
        setElems(tmp)
      }
    
    //get data from backend on api profiles
    let fetchData = async () => {
        let response = await fetch("http://127.0.0.1:8000/api/profiles/")
        let data = await response.json()
        setProfiles(data)
    }
    useEffect(()=> {
        fetchData()
        
    }, [user]) 
    
    //output data
    return ( 
        <div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" style={{ height: '40px', width: '300px' }} onChange={e=>{handle(e)}}/>
                    
                </Form>
            </div>
            
        <div>

        <Grid container spacing={3} sx={{ p: 3 }}>
            {elems.map((value, key) => ( 
            
            <Grid item key={key} xs={12} md={3}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column",  backgroundColor: "#222"}}>
              <CardContent sx={{ flex: 1 }}>
              <Grid container spacing={2} sx={{ p: 0}}>
                <Grid item key={key} xs={5} md={9.5}>
                    <Typography variant="h5" color="text.secondary" sx={{ color: "#fff" }}>
                    {value.firstname} {value.lastname}
                    </Typography>
                </Grid>
                <Grid item key={key} xs={0} md={0}>
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
              </Grid>
                <Typography variant="body2" sx={{ color: "#fff" }}>
                    {value.competence}
                </Typography>
                <div>
                    {value.subjects.split(",").map((v, k) => (
                        <div className='s-tag' key={k}>
                            <p>{v}</p>
                        </div>
                    ))}
                </div>

                <div>
                    {value.level.split(",").map((v, k) => (
                        <div className='s-tag' key={k}>
                            <p>{v}</p>
                        </div>
                    ))}
                </div>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
            </Grid>
          </div>
        </div>
    
  )
}

export default AllProfiles