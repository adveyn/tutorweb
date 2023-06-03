import React from 'react'
import {Route, Navigate} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'
import HomePage from '../pages/HomePage'
const PrivateRoute = () => {

  let {user} = useContext(AuthContext)

 return (
    !user ? <Navigate to="/login"/>: <HomePage />
  )
}

export default PrivateRoute