import * as express              from "express";
import { Story }                 from "../models/story";
import { RequestBaseController } from "./requestbase.controller";
import path    = require("path");
import arcData = require("../resources/storyList.json");

class StoryController {
  public router = express.Router();

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/addstory"      , this.addStory);
    this.router.get("/deletestory"   , this.deleteStory);
    this.router.get("/getallstories" , this.getAllStories);
    this.router.get("/getstory"      , this.getStory);
    this.router.get("/updatestory"   , this.updateStory);
  }

  addStory = (request: express.Request, response: express.Response) => {
    //get story information from the existing json file, if it is present
    let storyListJSON = this.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = this.GetStoryById(params.id);

    if (found) { response.send("error: invalid parameters"); }

    //build new story object to be added
    let today = new Date(Date.now.toString());
    let newStory = new Story(params.id, params.description, today)

    //add the new story to existing ones
    storyListJSON.stories.push(newStory); 

    //update artifact for stories
    this.WriteStoryArchive(storyListJSON);

    response.send(JSON.stringify(storyListJSON));
  }

  deleteStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let index = storyListJSON.stories.findIndex((x: { id: number; }) => x.id === params.id);

    if (index && index > 0) {
      storyListJSON.stories.splice(index, 1);
      this.WriteStoryArchive(storyListJSON);
    } else {
      response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(storyListJSON));
  }

  getAllStories = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    response.send(JSON.stringify(storyListJSON));
  }

  getStory = (request: express.Request, response: express.Response) => {
    let params = RequestBaseController.GetRequestParams(request);
    let found = this.GetStoryById(params.id);

    if (found) {
      response.send(JSON.stringify(found));
    } else {
      response.send("error: invalid parameters");
    }
  }

  updateStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = this.GetStoryById(params.id);

    if (found) {
      console.log("success: story was found, updating...");
      for (let idx = 0; idx < storyListJSON.stories.length; idx++) {
        if (storyListJSON.stories[idx].id === found.id) {
          storyListJSON.stories[idx].description = params.description !== null
                                                 ? params.description
                                                 : storyListJSON.stories[idx].description
          storyListJSON.stories[idx].timeStamp = Date.now.toString()
          console.log("success: story updated!");
        }
      }
      //update existing artifact
      this.WriteStoryArchive(storyListJSON);
    } else {
      return response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(storyListJSON));
  }

  //#region Private Routines
  private GetStoryArchive() : any {
    //get the json file and parse it into an object for use
    const storyListSTRING: string = JSON.stringify(arcData);
    return JSON.parse(storyListSTRING);
  }

  private GetStoryById(id: number) : any {
    let storyListJSON = this.GetStoryArchive();

    let found = storyListJSON.stories.find((story: { id: number; }) => {
      return story.id === Number(id)
    });

    return found = found.id > 0 ? found : null;
  }

  private WriteStoryArchive(storyListJSON: any){
    //write out json file with passed in json information
    var fs = require('fs');
    fs.writeFile(path.resolve(__dirname + "/../resources/storyList.json")
               , JSON.stringify(storyListJSON, null, 2)
               , function (err: any) {
                                  if (err) console.log(err);
                                });
  }
  //#endregion
}

export { StoryController }
