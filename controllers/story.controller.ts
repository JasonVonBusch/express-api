import * as express      from "express";
import { Story }         from "../models/story";
import { RequestParams } from "../models/requestParams";
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
    this.router.get("/getstory" , this.getStory);
    this.router.get("/updatestory", this.updateStory);
  }

  addStory = (request: express.Request, response: express.Response) => {
    //TODO: update logic to building a new story from the request

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

    response.send(JSON.stringify(storyListJSON));
  }

  deleteStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    let params = this.GetRequestParams(request);
    let index = storyListJSON.stories.findIndex((x: { id: string; }) => x.id === params.id);

    if (index) {
      storyListJSON.stories.splice(index, 1);
      this.WriteStoryArchive(storyListJSON);
    } else {
      response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(storyListJSON));
  }

  getStories = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    response.send(JSON.stringify(storyListJSON));
  }

  getStory = (request: express.Request, response: express.Response) => {
    let params = this.GetRequestParams(request);
    let found = this.GetStoryById(params.id);

    if (found) {
      response.send(JSON.stringify(found));
    } else {
      response.send("error: invalid parameters");
    }
  }

  updateStory = (request: express.Request, response: express.Response) => {
    let storyListJSON = this.GetStoryArchive();
    let params = this.GetRequestParams(request);
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
  private GetRequestParams(request: express.Request) : RequestParams {
    let params = new RequestParams();
    params.id = request.query.id !== null || request.query.id !== undefined
              ? request.query.id
              : null;

    params.description = request.query.description !== null || request.query.description !== undefined
                       ? request.query.description
                       : null;

    params.location = request.query.location !== null || request.query.location !== undefined
                       ? request.query.location
                       : null;
    return params;
  }

  private GetStoryArchive() : any {
    //get the json file and parse it into an object for use
    const storyListSTRING: string = JSON.stringify(arcData);
    return JSON.parse(storyListSTRING);
  }

  private GetStoryById(id: string) : any {
    let storyListJSON = this.GetStoryArchive();

    let found = storyListJSON.stories.find((story: { id: number; }) => {
      return story.id === Number(id)
    });

    return found;
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
