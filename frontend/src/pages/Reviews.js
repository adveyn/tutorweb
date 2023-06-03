/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Reviews Page --> submitting a review
*/
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
const Rev = () => {
  let [text, setText] = useState()
  const history = useNavigate()

  //post review to backend
  let handleSubmit = async (e) => {
    e.preventDefault()
    fetch(`http://127.0.0.1:8000/api/reviews/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"content": text})   
    })
    
    history("/home")
  }

  //display textbox
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TextField
            id="outlined-multiline-static"
            label="Review"
            multiline
            rows={4}
            onChange={(e) => {setText(e.target.value)}} 
            value={text}
            sx={{ width: "150ch" }}
          />
        </div>
          <br></br>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button type="submit" variant="contained" sx={{ borderRadius: "10px", fontSize: "1rem", textTransform: "none", backgroundColor: "#fff", color: "#000", borderColor: "#000" , '&:hover': { backgroundColor: "#005ea8" }}}>
              Submit
            </Button>
          </div>
        </form>
    </div>
  )
}

export default Rev