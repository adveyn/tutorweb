/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Sign Up Page
*/
import {React, useContext, useState, useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthContext from '../context/AuthContext'
import Image from "./studying2.jpg"

const theme = createTheme();

const SignupPage = () => {
  let {signupUser} = useContext(AuthContext)
  
  const [error, setError] = useState('')
  const [pword, setPword] = useState('')
  const [pword1, setPword1] = useState('')
  
  // change password when input is changed
  const onInputChange = e => {
    setPword(e.target.value)
    console.log("Password: ", pword)
  }
  const onInputChange1 = e => {
    setPword1(e.target.value) 
    console.log("Password1: ", pword1)
    
  }
  //check if passwords are the same
  useEffect(() => {
    if(pword && pword1 && pword !== pword1){
        setError("Passwords Don't Match")
    }else{
        setError("")
    }
  }, [setError, pword, pword1]);

  //used the MUI template and modified it, see: https://mui.com/material-ui/getting-started/templates/
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" noValidate onSubmit={e => {(error ? <></> : signupUser(e)); e.preventDefault()}} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField onChange={onInputChange}
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={pword}
                autoComplete="current-password"
              />

             <TextField onChange={onInputChange1}
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Confirm Password"
                type="password"
                id="password1"
                value={pword1}
                autoComplete="current-password"
              />
              {error && <h9>{error}</h9>}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
      </Grid>
    </ThemeProvider>
  );
}

export default SignupPage
