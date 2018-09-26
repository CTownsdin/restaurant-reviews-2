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

Next, do these steps...  
`$ npm run bundleJS`  to rebuild the JS bundles in the src directory  
`$ npm run gulp-serve`  to wipe and rebuild the build/ directory  
ctrl-c out of that  
`$ npm run simpleServer` to serve the build/ directory files  

and we can view the app, being served from the build/ folder, at...  
*http://localhost:9999*  

