
# tutorweb

## Features

* Edit user profile (first name, last name, competents, role, subject areas, subject grades) 
    * Backspace key to delete last added tag
    * Enter key to append topmost tag
    * Tagas are automatically sorted with merge sort 
* Chat feature to chat with tutor 
* Video call feature to meet with tutor
* Search for tutors based on preference
    * Search based on any component of profile 
* Only accepts good website reviews
* Chat is updated when profile is changed
* Notifications allow tutor/student to find what they missed

## Installation
* Node Version Manager version 1.1.0,  Django version 4.1.5, and pip must be installed
* To install dependencies for backend, run pip install requirements.txt
* The React portion of the website does not have a requirements.txt. Simply run **npm install** in the frontend directory to install dependencies
* The video call functionality relies on the Agora SDK and a temporary token. Below are the steps to acquire a new token (which is needed to run the project):
    - Navigate to **agora.io** and sign in with the following credentials: email: **arklark@protonmail.com**, password: **ICS4Uproject!**
    - Navigate to the Group-Video-Calling-App project and create a new temp token with project name **wdj** 
    - Paste this temp token int **VideoRoom.js**
* Furthermore, Memurai also needs to be installed and running in the background for the project to work
    - Navigate to **memurai.com** and install
    - Make sure it is running in the background by navigating to the **Services app** in Windows
* Some packages included for this project are channels, jwt-tokens, and daphne

## Known Bugs
* Video call is not separated into rooms
* Turning off camera may produce certain problems

## Support
* Contact anand7@ocdsb.ca for support
