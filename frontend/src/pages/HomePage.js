/*
Author: Advey Nandan
Last Modified: June 2, 2023
NPM VERSION 8.19.3

Homepage containing all reviews for the website
*/
import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { MenuBook, LaptopChromebook, Class } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
const HomePage = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //get reviews
  useEffect(() => {
    if(isLoading) getReviews();
  }, []);

  //connect with the backend to acquire the reviews
  const getReviews = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/reviewsGetter/');
      const data = await response.json();
      setReviews(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  //style reviews with MUI Grid --> Looks organized
  return (
    <div>
      <Typography variant="h4" component="div" sx={{ textAlign: "center", mb: 2 }}>
            Reviews
      </Typography>

      <Grid container spacing={3} sx={{ p: 3 }}>
        {reviews.map((review) => (
          <Grid item key={review.id} xs={12} md={3}>
            <Card sx={{ height: "100%", display: "flex", flexDirection: "column",  backgroundColor: "#222"}}>
              <CardContent sx={{ flex: 1 }}>
                <Grid container spacing={8} sx={{ p: 0 }}>
                  <Grid item xs={12} md={4}>
                    <IconButton sx={{ color: "#fff" }}>
                      <LaptopChromebook />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton sx={{ color: "#fff" }}>
                      <MenuBook />
                    </IconButton>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <IconButton sx={{ color: "#fff" }}>
                      <Class />
                    </IconButton>
                  </Grid>
                </Grid>
                <Typography variant="h6" color="text.secondary" sx={{ color: "#fff" }}>
                  "{review.content}"
                </Typography>
              </CardContent>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default HomePage;
