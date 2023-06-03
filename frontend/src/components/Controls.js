/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Controls for video and audio (muting/unmuting)

Links used for Controls:
https://www.youtube.com/watch?v=lUrWJVCCVGc
*/
import React, {useState} from 'react'
import { client } from './VideoRoom'
import { Grid, Button, Icon } from '@mui/material'
import { Mic } from '@mui/icons-material'
import { MicOff } from '@mui/icons-material'
import { Videocam } from '@mui/icons-material'
import { VideocamOff } from '@mui/icons-material'
import { ExitToApp } from '@mui/icons-material'
import AgoraRTC from 'agora-rtc-sdk-ng';
import { useNavigate } from 'react-router-dom'

const Controls = (props) => {
  const clientL = client
  const {tracks, showVideo, setShowVideo } = props 
  const [trackState, setTrackState] = useState({video: true, audio: true})
  let history = useNavigate()
  
  //mute or unmute audio by setting variable
  const mute = async (type) => {
    if (type === "audio"){
        await tracks[0].setEnabled(!trackState.audio)
        setTrackState((ps) => {
            return {...ps, audio: !ps.audio}
        })
    }
    //mute or unmute video by setting variable
    else if (type === "video"){
        await tracks[1].setEnabled(!trackState.video)
        setShowVideo(!trackState.video)
        setTrackState((ps) => {
            return {...ps, video: !ps.video}
        })
    }
  }
  //behaviour for leaving channel
  const leaveChannel = async () => {
    for(let track of tracks){
        track.stop()
        track.close()
    }
    history("/home")
    
  }


  return (
    <Grid container spacing={2} alignItems="center" direction="row">
        <Grid item> 
            <Button variant="contained" color={trackState.audio ? "primary" : "secondary"} onClick={() => mute("audio")}>
                {trackState.audio ? <Mic /> : <MicOff/> }
            </Button>
        </Grid>

        <Grid item>
            <Button variant="contained" color={trackState.video ? "primary" : "secondary"} onClick={() => mute("video")}>
                {trackState.video ? <Videocam /> : <VideocamOff /> }
            </Button>

        </Grid>
            
        <Grid item>
            <Button variant="contained" color="inherit" onClick={() => leaveChannel()}>
                <ExitToApp />
            </Button> 
        </Grid>
    </Grid>
  ) 
}

export default Controls