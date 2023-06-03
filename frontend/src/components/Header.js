/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Header that is displayed on every page (contains navbarr)
*/

import React, {useContext} from 'react'
import {Link} from "react-router-dom"
import AuthContext from '../context/AuthContext'

import Container from 'react-bootstrap/Container';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import { useState } from 'react';
import { useEffect } from 'react';



const Header = () => {

  //variables
  let {user, logoutUser} = useContext(AuthContext)
  let [profile, setProfile] = useState()

  //acquire profile from backend for checks
  let getPerson = async () => {
    if(user){
      let response = await fetch(`http://127.0.0.1:8000/api/profile/${user.user_id}/`)
      let data = await response.json()
      setProfile(data)
      console.log("Hey!!", profile.profileDone)
    }
  }
  useEffect(() => {
    getPerson()
  }, [])
  //perform various checks to make sure user is eligible to see certain items
  return (
    
    <div>
    

    <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/home">tutorweb</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              {user && <Nav.Link href="/profile">Profile</Nav.Link>}
              {(user && profile?.profileDone === true) && <Nav.Link href="/profiles">Chat</Nav.Link>}
              {user && <Nav.Link href="/reviews">Review</Nav.Link>}
              {user && <Nav.Link href="/notifications">Notifications</Nav.Link>}
              {user ? (<Nav.Link onClick={logoutUser}>Logout</Nav.Link>): (<Nav.Link href="/login">Login</Nav.Link>  )}  
              {!user && <Nav.Link href="/signup">Sign Up</Nav.Link>}

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>!</div>
      
    </div>

    
    
    
  )
}

export default Header