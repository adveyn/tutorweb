/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Playing and stopping video 

Links used for video calling creation:
https://www.youtube.com/watch?v=lUrWJVCCVGc
https://www.youtube.com/watch?v=ENakkm58Uyw
*/
import React, { useEffect, useRef } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng'
import { Grid } from '@mui/material';
const VideoPlayer = (props) => {
  const ref = useRef();
  const {user, showVideo} = props

  //Function actually stops and plays video depending on variable state
  useEffect(() => {
    if (ref.current && user.videoTrack && showVideo) {
      user.videoTrack.play(ref.current);
    }else{
      user.videoTrack.stop()
    }
  }, [user.videoTrack, showVideo]);

  return (
    <div>
      
        <div ref={ref} style={{ width: '400px', height: '400px' }}></div>
        
    </div>

  );
};

export default VideoPlayer;
