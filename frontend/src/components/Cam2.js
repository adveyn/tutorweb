/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Page for joining chat room 
*/
import React, { useState } from 'react'
import VideoRoom from './VideoRoom'
import { useParams } from 'react-router-dom'
const Cam2 = () => {
  const [joined, setJoined] = useState(false)
  //join chat room if not already joined and call VideoRoom if joined
  return (
    <div>
        <h1>Cam</h1>
        
        {!joined && <button onClick={() => setJoined(true)}>Join Room</button>} =
        {joined && <VideoRoom />}
        
        
    </div>
  )
}

export default Cam2