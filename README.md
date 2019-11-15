# Sample Express Application

## Summary
A simple API using Node.js, Express, Typescript, Chai and Cucumber

### Running the application

1. open up a new bash terminal window
2. navigate to the _express-api_ directory in the terminal
    * this can be done using various windows command functions like ```cd``` to change directory or ```cd ..``` to go back a directory
3. run ```npm install``` to install npm packages
4. run ```npm run tsc``` to compile the typescript files into the _dist_ directory
4. run ```npm start``` to run the project
5. open up a new Chrome browser window and navigate to one of the following urls to ensure the application is running (listening on port 5000 by default, this can be changed in the *server.ts* file and running ```npm run tsc``` to re-compile the changes)
    * [home page](http://localhost:5000/)
    * [about page](http://localhost:5000/about)
    * [story information](http://localhost:5000/getallstories)
    * [artifact information](http://localhost:5000/getallartifacts)

### Setup tests
1. ```~.feature``` and ```~.steps``` files should be placed under features folder
    * Cucumber will flatten out the ```features/``` directory to match up ```.feature``` files with their respective ```.js``` files
2. for each ```Scenario``` there should be tests written
    * don't include extra tests without a ```Scenario``` created because this can cause unnecessary cleanup later
    * each ```Scenario``` should have a ```~.steps.js``` file for better organization and to not produce errors when they don't have a matching ```feature\step``` relationship

### Running tests
1. open up a new bash terminal window
2. navigate to the _express-api_ directory in the terminal
3. run ```npm run tsc``` to compile the typescript files into the _dist_ directory
4. run ```npm run test```

    