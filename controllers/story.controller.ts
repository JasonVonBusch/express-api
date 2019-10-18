import * as express from "express";
import { Story } from "../models/story";

class StoryController {
  public router = express.Router();
  public jsonData = require("../datarepo/storyList.json");

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/addstory"   , this.addStory);
    this.router.get("/deletestory", this.deleteStory);
    this.router.get("/getstories" , this.getStories);
    this.router.get("/updatestory", this.updateStory);
  }

  addStory = (request: express.Request, response: express.Response) => {
    //get story information from the existing json file, if it is present
    let storyListJSON = this.GetStoryArchive();
    let nextId = storyListJSON.stories.length + 1;
    storyListJSON.stories.push({"id": nextId
                              , "description" : ""
                              , "timestamp"   : Date.now.toString()
                              , "artifactList": [{ "id": 0 }]
                               }); 
    this.UpdateStoryArchive(storyListJSON);
    response.end(storyListJSON);
  }

  deleteStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    //perform commands to do the delete
    this.UpdateStoryArchive(storyListJSON);
    response.end(storyListJSON);
  }

  getStories = (request: express.Request, response: express.Response) => {
    const storyListSTRING: string = JSON.stringify(this.jsonData);
    response.end(storyListSTRING);
  }

  updateStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    //perform commands that will update existing records
    this.UpdateStoryArchive(storyListJSON);
    response.end(storyListJSON);
  }

  private GetStoryArchive() : any {
    //get the json file and parse it into an object for use
    return JSON.parse(this.jsonData);
  }

  private UpdateStoryArchive(storyListJSON: any){
    //write out json file with passed in json information
    var fs = require('fs');
    fs.writeFile(""
               , JSON.stringify(storyListJSON, null, 2)
               , function (err) {
                                  if (err) console.log(err);
                                });
  }
}

export { StoryController }
