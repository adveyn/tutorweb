import {createClient, createMicrophoneAndCameraTracks} from "agora-rtc-react";

const appId = "cbbac606803b464fa2550d8a14d4709c" 
const token = "007eJxTYKiZdvDVS+mVHmEKS+vPdj7gMyy9sEX6mWS44NoNfzN4HpQpMCQnJSUmmxmYWRgYJ5mYmaQlGpmaGqRYJBqapJiYG1gmZ5pEpDQEMjKsfMfJwsgAgSA+C0NuYmYeAwMAhq0foQ=="


export const config = {mode: "rtc", codec: "vp8", appId: appId, token: token};

export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "main";
  