[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Project Code For Google Mobile Web Nano Degree  Part 2   

This project has a separate JSON server to simulate fetching data from an external API.  
It must be started up first.  
To start the jsonServer, do the following...  

Use node version 8.  

In the terminal  
`$ cd jsonServer`  
`$ npm install`  
`$ npm run start`  to start the server.  

Verify it is running by navigating to **http://localhost:1337/restaurants** in your browser, and geting the restaurants JSON.  
Further information about the jsonServer is available in the README.md inside the jsonServer/ folder.  

Next, we can start the main project.  Change directory back to the project root, and...  
`$ npm install`  
`$ npm run serve`  

And view the app in your browser at:  
http://localhost:8081  

The serve script is running gulp serve, and gulp serve is defined in gulpfile.js.  
This builds and runs the application.  
The build is in the build/ folder.  
