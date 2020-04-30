import * as express              from "express";
import { IStory }                from "../models/story";
import { RequestBaseController } from "./requestbase.controller";
import { Story }                 from "../database/entity/story.entity";
import { Communication }         from "../database/communication"
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

  addStory = async (request: express.Request, response: express.Response) => {
    //get story information from the existing json file, if it is present
    let storyListJSON = await StoryController.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = StoryController.GetStoryById(params.id);

    if (!found) { response.send("error: invalid parameters"); }

    //build new story object to be added
    let today = new Date(Date.now.toString());
    let newStory: IStory ={id: params.id,
                           description: params.description,
                           timeStamp: today,
                           artifactIds: []};

    //add the new story to existing ones
    storyListJSON.stories.push(newStory); 

    //update archive for stories
    StoryController.WriteStoryArchive(storyListJSON);

    response.send(JSON.stringify(storyListJSON));
  }

  deleteStory = async (request: express.Request, response: express.Response) => {
    let storyListJSON = await StoryController.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let index = storyListJSON.stories.findIndex((x: { id: number; }) => x.id === params.id);

    if (index && index > 0) {
      storyListJSON.stories.splice(index, 1);
      StoryController.WriteStoryArchive(storyListJSON);
    } else {
      response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(storyListJSON));
  }

  getAllStories = (request: express.Request, response: express.Response) => {
    let storyListJSON = StoryController.GetStoryArchive();
    response.send(JSON.stringify(storyListJSON));
  }

  getStory = (request: express.Request, response: express.Response) => {
    let params = RequestBaseController.GetRequestParams(request);
    let found = StoryController.GetStoryById(params.id);

    if (found) {
      response.send(JSON.stringify(found));
    } else {
      response.send("error: invalid parameters");
    }
  }

  updateStory = async (request: express.Request, response: express.Response) => {
    let storyListJSON = await StoryController.GetStoryArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = await StoryController.GetStoryById(params.id);

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
      //update existing archive
      StoryController.WriteStoryArchive(storyListJSON);
    } else {
      return response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(storyListJSON));
  }

  //#region Private Routines
  static async GetStoryArchive() : Promise<any> {
    let storyListSTRING: string;

    return await Communication.GetConnection().then(connection =>{
      // get items using a repository
      let repo = connection.getRepository(Story)
      repo.find().then((results: any) => {
        storyListSTRING = JSON.stringify(results);
        console.log("All stories from the repo: ", results);

        //get the json file and parse it into an object for use
        return JSON.parse(storyListSTRING);
      });

      // get items using a manager
      connection.manager.find(Story).then((results: any) => {
        storyListSTRING = JSON.stringify(results);
        console.log("All stories from the manager: ", results);

        //get the json file and parse it into an object for use
        return JSON.parse(storyListSTRING);
      });

      // close the connection
      // connection.close();
    });

  }

  static async GetStoryById(id: number) : Promise<any> {
    let storyListJSON = await this.GetStoryArchive();

    let found = storyListJSON.stories.find((story: { id: number; }) => {
      return story.id === Number(id)
    });

    return found = found.id > -1 ? found : null;
  }

  static WriteStoryArchive(storyListJSON: any){
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
