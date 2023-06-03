/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Creates audio and video tracks and handles audio/video/leaving behaviour
IMPORTANT NOTE: PLEASE REPLACE TOKEN WITH A NEW TOKEN WHEN RUNNING THE PROGRAM

Links used for video calling creation:
https://www.youtube.com/watch?v=lUrWJVCCVGc
https://www.youtube.com/watch?v=ENakkm58Uyw

*/
import React, { useEffect, useState } from 'react'
import AgoraRTC from 'agora-rtc-sdk-ng'
import VideoPlayer from './VideoPlayer'
import Controls from './Controls'
import { Grid } from '@mui/material'
const APP_ID = 'cbbac606803b464fa2550d8a14d4709c'
const TOKEN = '007eJxTYJj3ROC/UGjU45rwWX2uKydZCtVe2+y/+N67lmO/YlYLSKxRYEhOSkpMNjMwszAwTjIxM0lLNDI1NUixSDQ0STExN7BM/tRUndIQyMjww8iRmZEBAkF8ZobylCwGBgCcfyCC'
const CHANNEL = 'wdj'

export const client = AgoraRTC.createClient({
    mode: 'rtc',
    codec: 'vp8',
})
const VideoRoom = () => {
  const [users, setUsers] = useState([]) 
  const [localTracks, setLocalTracks] = useState([])
  const [showVideo, setShowVideo] = useState(true)

  //handles when user joins the room
  const handleUserJoined = async (user, mediaType) =>{
    await client.subscribe(user, mediaType)

    if(mediaType === "video"){
        setUsers((previousUsers) => [...previousUsers, user])
    }

    if(mediaType === "audio"){
        user.audioTrack.play()
    }
  }

  //takes user out of list when leaving
  const handleUserLeft = (user) => {
    setUsers((previousUsers) => 
        previousUsers.filter((u) => u.uid !== user.uid)
    )
  }
  
  //create tracks and store them 
  useEffect(() => {
    client.on('user-published', handleUserJoined)
    client.on('user-left', handleUserLeft)
    client.join(APP_ID, CHANNEL, TOKEN, null)
    .then((uid) => 
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
    ).then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks)
        setUsers((previousUsers) => [...previousUsers, {
            uid,
            videoTrack,
            audioTrack,
        },
        ])
        client.publish(tracks)

    })

    //handle user leaves
    return () => {
        for(let localTrack of localTracks){
            localTrack.stop()
            localTrack.close()
        }
        client.off('user-published', handleUserJoined)
        client.off('user-left', handleUserLeft)
        client.unpublish(localTracks).then(() => client.leave())
    }
  }, [client])
  return (
    <div style={{display: "flex", justifyContent: 'center'}}>
        
        <Grid container spacing={3} sx={{ p: 3 }} alignItems="center" justifyContent="center" direction="column">
            
                <div>
                    
                        {users.map((user) => (
                            <Grid container spacing={3} sx={{ p: 3 }} direction="row">
                                <Grid item> 
                                    <VideoPlayer key={user.uid} user={user} showVideo={showVideo}/>
                                </Grid>
                            </Grid>
                        ))}
                    
                </div>

            <Grid item>
                <Controls tracks={localTracks} showVideo={showVideo} setShowVideo={setShowVideo} />
            </Grid>
        </Grid>
    </div>
  )
}

export default VideoRoom