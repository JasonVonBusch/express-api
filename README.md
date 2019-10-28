# Sample Express Application

## Summary
A simple API using Node.js, Express, and Typescript

### Running the application

1. open up a new bash terminal window
2. Navigate to the _express-api_ directory in the terminal
    * this can be done using various windows command functions like ```cd``` to change directory or ```cd ..``` to go back a directory.
3. run ```npm install``` to install npm packages
4. run ```npm run tsc``` to compile the typescript files into the dist directory
4. run ```npm start``` to run the project
5. open up a new Chrome browser window and navigate to one of the following urls to ensure the application is running (listening on port 5000 by default, this can be changed in the *server.ts* file and running ```npm run tsc``` to compile the changes)
    * [home page](http://localhost:5000/)
    * [about page](http://localhost:5000/about)
    * [story information](http://localhost:5000/getstories)
    