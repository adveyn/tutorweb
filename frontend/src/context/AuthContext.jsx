/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Stores all global functions and variables which are used in other components. Mostly for authentication. 

JWT Tokens:
https://www.youtube.com/watch?v=xjMP0hspNLE ==> some code used from here
*/
import {createContext, useState, useEffect, React} from "react"
import {useNavigate} from 'react-router-dom'
import jwt_decode from "jwt-decode";

const AuthContext = createContext()
export default AuthContext;

 
export const AuthProvider = ({children}) => {
  
  console.log(localStorage.getItem('authTokens'))
  
  //variables to be exported
  let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
  let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
  let [loading, setLoading] = useState(true)
  let [profile, setProfile] = useState(null)
  let [tagElems, setTagElems] = useState({'a':[], 'b':[]})

  const history = useNavigate()
  
  //communicating with backend for user login
  let loginUser = async (e)=> {
    e.preventDefault()
    let response = await fetch ('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})

    })
    let data = await response.json()
    if(response.status === 200){
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      history('/home')
    }else{
      alert('something is wrong!')
    }
  }

  //communicating with backend for signup (POSTing data)
  let signupUser = async (e)=> {
    let response = await fetch ('http://127.0.0.1:8000/api/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email': e.target.email.value, 'password': e.target.password.value})

    })
    if(response.status == 200){
      history('/home')
    }else{
      alert("Something went wrong")
    }
  }
  
  //logout functionality
  let logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    //removes authentication tokens from local storage (not signed in anymore)
    localStorage.removeItem('authTokens')
    history('/login')
  }

  //data to be exported
  let contextData = {
    user:user,
    loginUser: loginUser,
    authTokens: authTokens,
    setAuthTokens: setAuthTokens,
    logoutUser: logoutUser,
    signupUser: signupUser,
    setUser: setUser,
    profile: profile,
    setProfile: setProfile,
    tagElems: tagElems,
    setTagElems: setTagElems,
    

  }

  //get user with authentication tokens
  useEffect(()=>{
    if(authTokens){
      setUser(jwt_decode(authTokens.access))
    }
    setLoading(false)
  }, [authTokens, loading])

  //export
  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  )
}


