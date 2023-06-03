/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

This file contains the frontend for setting user profile
*/

import React, {useContext, useEffect, useState} from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {MdClose} from "react-icons/md"
import './Tags.css'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Form, FormControl} from 'react-bootstrap';
import "./SearchBar.css"
const theme = createTheme();
const Profile = () => {

  //variable definitions
  let {profile, setProfile} = useContext(AuthContext)
  let {user} = useContext(AuthContext)
  const history = useNavigate()
  let [grades, setGrades] = useState([])
  let [elems, setElems] = useState([])
  let [tags, setTags] = useState([])
  let [tagsSorted, setTagsSorted] = useState([])
  let [prevFirstName, setPrevFirstName] = useState("")

  let [subjects, setSubjects] = useState([])
  let [elems2, setElems2] = useState([])
  let [tags2, setTags2] = useState([])
  let [tagsSorted2, setTagsSorted2] = useState([])
  

  let merge = (lst) => {
    /* 
    This is the merge sort function. It takes in a list and returns the sorted list. Uses 2 pointer algorithm for sorting

    Args:
      lst: List
    Returns:
      lst3: List
    */
    if(lst.length <= 1){ 
      console.log(lst)
      return lst
     }
    let lst1 = lst.slice(0, Math.floor(lst.length/2))
    let lst2 = lst.slice(Math.floor(lst.length/2))
    
    lst1 = merge(lst1)
    lst2 = merge(lst2)
    
    let lst3 = []
    let p1 = 0
    let p2 = 0
    while(p1 < lst1.length || p2 < lst2.length){
      if(p1 >= lst1.length){
        lst3.push(lst2[p2])
        p2 += 1
      }else if(p2 >= lst2.length){
        lst3.push(lst1[p1])
        p1 += 1
      }else if(lst1[p1] < lst2[p2]){
        lst3.push(lst1[p1])
        p1 += 1
      }else{
        lst3.push(lst2[p2])
        p2 += 1
      }
    }
    return lst3
  }

  //The function in useEffect is used to set the dropdown menu fpr grades and is called whenever tags is modified
  useEffect(()=>{
      let tmp1 = []
      let vals = ['Comp Sci','Math', 'English', 'History', 'Geography'] 
      for(let i = 0; i < vals.length; ++i){
        if(!(tags.includes(vals[i]))){
          tmp1.push(vals[i])
        }
      }
      setTagsSorted(merge(tags))
      setGrades(tmp1)
    }, [tags])

    //The function in useEffect is used to set the dropdown menu for subjects and is called whenever tags is modified
    useEffect(()=>{
      let tmp1 = []
      let vals = ['Gr1','Gr2', 'Gr3', 'Gr4', 'Gr5', 'Gr6', 'Gr7', 'Gr8', 'Gr9', 'Gr10', 'Gr11'] 
      for(let i = 0; i < vals.length; ++i){
        if(!(tags2.includes(vals[i]))){
          tmp1.push(vals[i])
        }
      }
      setTagsSorted2(merge(tags2))
      setSubjects(tmp1)
    }, [tags2])
    
    // Another function used to set dropdown values depending on substring of user input
    const handle = (e, sig) => {
      const tmp = []
      let gr = (sig == 0) ? grades : subjects 
      for(let i = 0; i < gr.length;++i){
          if(gr[i].includes(e.target.value)){
              tmp.push(gr[i])
          }
      }
      if(sig == 0){ setElems(tmp)}else{ setElems2(tmp)}
    }

    //Handles setting tags when enter or backspace are pressed
    const handleTags2 = (e, sig) => {
      let tgs = (sig == 0) ? tags: tags2 
      let el = (sig == 0) ? elems : elems2
      if(e.key === "Enter" && e.target.value !== "" && el.length){
          console.log("Entered!!")
          if(sig == 0) {setTags([...tags, el[0]])} else{ setTags2([...tags2, el[0]])};
          
          e.target.value=""
          e.preventDefault()
          if(sig == 0) {setElems([])} else{ setElems2([])}
          
      }
      
      else if(e.key === "Backspace" && tgs.length && e.target.value == 0){
          const tagsCopy = (sig == 0) ? [...tags] : [...tags2]
          console.log("hey")
          tagsCopy.pop()
          e.preventDefault()
          if(sig == 0) {setTags(tagsCopy)}else{ setTags2(tagsCopy)}
      }
      
      else if(e.target.value === "" && e.key === "Enter"){
          e.preventDefault()
          
      }
    }
      //Deletion of tags when icon is clicked
      const removeTags = (index, sig) => {
          if(sig == 0) {setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])} else{setTags2([...tags2.filter(tag => tags2.indexOf(tag) !== index)])}
      }
      

         
  
  //Fetch previous profile from the backend using async await commands
  let getCompetence = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/profile/${user.user_id}/`)
    let data = await response.json()
    setProfile(data)
    setPrevFirstName(data['firstname'])
    if(data['level'] !== ""){
      setTags(data['level'].split(","))
    }
    if(data['subjects'] !== ""){
      setTags2(data['subjects'].split(","))
    }
    
  }

  useEffect(()=>{
    getCompetence()
  }, [])
  
  //PUT request to set the backend with updated values
  let updateCompetence = async () => {
    
    fetch(`http://127.0.0.1:8000/api/profile/${user.user_id}/update/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"competence": profile.competence, "firstname": profile.firstname, "lastname": profile.lastname, "role": profile.role, "level": tags.toString(), "subjects": tags2.toString(), "profileDone": true})
    })
  }

  //If name is updated, the previous messages need to be updated too --> Request to backend
  let updateName = async() => {
    if(profile.firstname != prevFirstName){
      let response = await fetch ('http://127.0.0.1:8000/api/editMessages/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'pastusername': prevFirstName, 'username': profile.firstname})
      })
    }
  }

  //Handle changes for different values and update profile with changes
  let handleChange = (value) => {
    setProfile(profile => ({...profile, 'competence':value}))
  }
  let handleChange1 = (value) => {
    setProfile(profile => ({...profile, 'firstname':value}))
  }
  
  let handleChange2 = (value) => {
    setProfile(profile => ({...profile, 'lastname':value}))
  }

  
  //form is submitted
  let handleSubmit = () => {
    
    
    if(profile.lastname && profile.firstname && profile.role && profile.competence && tags.length !== 0 && tags2.length !== 0){
      setProfile(profile => ({...profile, 'profileDone': true}))
      console.log(profile.profileDone)
      updateCompetence()
      updateName()
      history("/home")
      
    }else{
      
    }
    
  }

  //radio button modifications
  const radioSelected = (value) => {
    
    return(profile?.role === value)
  }

  const handleRadio = (e) => {
    
    setProfile(profile => ({...profile, 'role':e.target.value}))
  }
  
  return (
    <div >
      
      <form>
      <div>
      <Grid container spacing={5} justifyContent = "center" style={{marginTop: '5px'}}>
        
        <Grid item xs={12} sm={3}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            InputLabelProps={{
              shrink: profile?.firstname || false,
            }}
            onChange={(e) => {handleChange1(e.target.value)}} 
            value={profile?.firstname}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            InputLabelProps={{
              shrink: profile?.lastname || false,
            }}
            onChange={(e) => {handleChange2(e.target.value)}} 
            value={profile?.lastname}
          />
        </Grid>
      </Grid>
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <p>Choose Your Role</p>
      </div>
      <Grid container spacing={2} justifyContent = "center" style={{marginTop: '0px', padding: 0}}>
        <Grid item xs={12} sm={1}>
          <input  type="radio" id="tutor" name="person" value="tutor" checked={radioSelected("tutor")} onChange={handleRadio}/>
          <label for="tutor">Tutor</label>
        </Grid>
        
        <Grid item xs={12} sm={1}>
          <input type="radio" id="student" name="person" value="student" checked={radioSelected("student")} onChange={handleRadio}/>
          <label for="student">Student</label>
          </Grid>
      </Grid>
      
      <div style={{ display: "flex", justifyContent: "center", marginTop:'30px' }}>
        <p>Talk About Yourself!</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
          
          <TextField
            id="outlined-multiline-static"
            label="Talk About Yourself"
            multiline
            rows={4}
            InputLabelProps={{
              shrink: profile?.competence || false,
            }}
            onChange={(e) => {handleChange(e.target.value)}} 
            value={profile?.competence}
            sx={{ width: "75ch" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search Subjects" className="mr-sm-2" style={{ height: '40px', width: '300px' }} onChange={e=>{handle(e, 0)}} onKeyDown= {e => handleTags2(e, 0)} />
                    
                </Form>
            </div>
          <div>
              <div className="search">
              
          
          {elems.map((value, key) => {
              return (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                    <div className='dataResult'>
                      <p key={key}  onClick={() => setTags([...tags, value])}>{value}</p>
                    </div>
                 </div>
              )
          })}
          
      </div>
 
      
      <div className='tags'>
          {tagsSorted.map((tag, index) => (
              <div className='single-tag' key={index}>
                  <span>{tag}</span>
                  <i onClick={() => removeTags(index, 0)}><MdClose /></i>
              </div>
          ))}

      </div>

  </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20}}>
                <Form inline>
                    <FormControl type="text" placeholder="Search Grades" className="mr-sm-2" style={{ height: '40px', width: '300px' }} onChange={e=>{handle(e, 1)}} onKeyDown= {e => handleTags2(e, 1)} />
                    
                </Form>
            </div>
      
              <div className="search">
              
              {elems2.map((value, key) => {
              return (
                <div style={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
                    <div className='dataResult'>
                      <p key={key}  onClick={() => setTags2([...tags2, value])}>{value}</p>
                    </div>
                 </div>
              )
          })}


      
      <div className='tags'>

          {tagsSorted2.map((tag, index) => (
              <div className='single-tag' key={index}>
                  <span>{tag}</span>
                  <i onClick={() => removeTags(index, 1)}><MdClose /></i>
              </div>
          ))}

      </div>
  </div>
   <div style={{ display: "flex", justifyContent: "center", marginTop: 20, marginBottom: 40}} onClick={handleSubmit}>
            <Button type="submit" variant="contained" sx={{ borderRadius: "10px", fontSize: "1rem", textTransform: "none", backgroundColor: "#fff", color: "#000", borderColor: "#000" , '&:hover': { backgroundColor: "#005ea8" }}}>
              Save
            </Button>
        </div>
      </form>
    </div>
  )
}

export default Profile