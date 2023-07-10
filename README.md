
# tutorweb

## Features

* Edit user profile (first name, last name, competents, role, subject areas, subject grades) 
    * Backspace key to delete last added tag
    * Enter key to append topmost tag
    * Tags are automatically sorted with merge sort 
* Chat feature to chat with tutor 
* Video call feature to meet with tutor
* Search for tutors based on preference
    * Search based on any component of profile 
* Only accepts good website reviews
* Chat is updated when profile is changed
* Notifications allow tutor/student to find what they missed

## Installation
* Node Version Manager version 1.1.0,  Django version 4.1.5, and ```pip``` must be installed
* ICS4U is the backend directory and frontend is the frontend directory
* Remember to run the frontend directory with admin permission set
* To install dependencies for backend, run **pip install requirements.txt**
* The React portion of the website does not have a requirements.txt. Simply run **npm install** or  **npm install --force** in the frontend directory to install dependencies
* The video call functionality relies on the Agora SDK and a temporary token. Below are the steps to acquire a new token (which is needed to run the project):
    - Navigate to **agora.io** and sign in with the following credentials: email: **arklark@protonmail.com**, password: **ICS4Uproject!**
    - Navigate to the Group-Video-Calling-App project and create a new temp token with project name **wdj** 
    - Paste this temp token int **VideoRoom.js**
* Furthermore, Memurai also needs to be installed and running in the background for the project to work
    - Navigate to **memurai.com** and install
    - Make sure it is running in the background by navigating to the **Services app** in Windows
* Some packages included for this project are channels, jwt-tokens, and daphne

## Running the project 
* Run **npm start** for frontend and **python manage.py runserver** for backend 

## Known Bugs
* Video call is not separated into rooms
* Turning off camera may produce certain problems

## Support
* Contact anand7@ocdsb.ca for support

## Sources

[1] Authentication &amp; Refreshing Tokens Implementation. YouTube, 2021. 

[2] React Tutorial for Beginners. YouTube, 2023. 

[3] Custom User Model with Email Login (DJANGO). YouTube, 2020. 

[4] Django + React Notes App. YouTube, 2021. 

[5] “React grid component - material UI,” React Grid component - Material UI, https://mui.com/material-ui/react-grid/ (accessed Jun. 3, 2023). 

[6] “React card component - material UI,” React Card component - Material UI, https://mui.com/material-ui/react-card/ (accessed Jun. 3, 2023). 

[7] “React text field component - material UI,” React Text Field component - Material UI, https://mui.com/material-ui/react-text-field/ (accessed Jun. 3, 2023). 

[8] “9+ free react templates - material UI,” 9+ Free React Templates - Material UI, https://mui.com/material-ui/getting-started/templates/ (accessed Jun. 3, 2023). 

[9] Simple Sentiment Text Analysis in Python. YouTube, 2020. 

[10] Installing Django Channels 2 (Redis and WebSockets). YouTube, 2020. 

[11] “Django channels¶,” Django Channels - Channels 4.0.0 documentation, https://channels.readthedocs.io/en/stable/ (accessed Jun. 3, 2023). 

[12] W. Teo, “Building a real-time chat application with Django, channels and react,” Medium, https://blog.devgenius.io/building-a-real-time-chat-application-with-django-channels-and-react-ee2d8fee7328?gi=cc2293f747b1 (accessed Jun. 3, 2023). 

[13] Coding a Video Calling App with React. YouTube, 2022. 

[14] React Group Video Calling App Tutorial. YouTube, 2021. 

[15] N. Sharma, “Create a custom tags input using react,” Medium, https://javascript.plainenglish.io/create-a-custom-tags-input-using-react-76519c35a842 (accessed Jun. 3, 2023). 

[16] React-bootstrap documentation, https://react-bootstrap-v4.netlify.app/getting-started/introduction/ (accessed Jun. 4, 2023). 

[17] React Controlled Radio Buttons Explained | React Radio Buttons | with Typescript. YouTube, 2021. 
