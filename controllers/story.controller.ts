import * as express from "express";
import { Story }    from "../models/story";
import path    = require("path");
import arcData = require("../resources/storyList.json");

class StoryController {
  public router = express.Router();

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

    //build new story object to be added
    let nextId = storyListJSON.stories.length + 1;
    let today = new Date(Date.now.toString());
    let newStory = new Story(nextId, "", today)

    //add the new story to existing ones
    storyListJSON.stories.push(newStory); 

    //update artifact for stories
    this.WriteStoryArchive(storyListJSON);

    response.end(JSON.stringify(storyListJSON));
  }

  deleteStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    //perform commands to do the delete
    this.WriteStoryArchive(storyListJSON);
    response.end(storyListJSON);
  }

  getStories = (request: express.Request, response: express.Response) => {
    const storyListSTRING: string = JSON.stringify(arcData);
    response.end(storyListSTRING);
  }

  updateStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();

    let updateId = request.query.id !== undefined ? request.query.id : -1
    let found = storyListJSON.stories.find(story => {
                    return story.id === Number(updateId)
                  });
    if(found){
      console.log("story was found, updating...");
      for (let idx = 0; idx < storyListJSON.stories.length; idx++) {
        if (storyListJSON.stories[idx].id === found.id) {
          storyListJSON.stories[idx].description = "changed";
          console.log("story updated!");
        }
      }
    } else {
      return response.send("error: story not found")
    }

    //perform commands that will update existing records
    this.WriteStoryArchive(storyListJSON);
    response.end(JSON.stringify(storyListJSON));
  }

  //#region Private Routines
  private GetStoryArchive() : any {
    //get the json file and parse it into an object for use
    const storyListSTRING: string = JSON.stringify(arcData);
    return JSON.parse(storyListSTRING);
  }

  private WriteStoryArchive(storyListJSON: any){
    //write out json file with passed in json information
    var fs = require('fs');
    fs.writeFile(path.resolve(__dirname + "/../resources/storyList.json")
               , JSON.stringify(storyListJSON, null, 2)
               , function (err) {
                                  if (err) console.log(err);
                                });
  }
  //#endregion
}

export { StoryController }
