import * as express      from "express";
import { RequestBaseController } from "./requestbase.controller";
import path    = require("path");
import arcData = require("../resources/storyList.json");


class ArtifactController {
  public router = express.Router();

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/addartifact"     , this.addArtifact);
    this.router.get("/deleteartifact"  , this.addArtifact);
    this.router.get("/getallartifacts" , this.getAllArtifacts);
    this.router.get("/getartifact"     , this.getArtifact);
    this.router.get("/updateartifact"  , this.updateArtifact);
  }

  addArtifact = (request: express.Request, response: express.Response) => {
    //get artifact information from the existing json file, if it is present
    let artifactListJSON = this.GetArtifactArchive();
    let nextId = artifactListJSON.artifacts.length + 1;

    //TODO: perform commands to add a new artifact
    artifactListJSON.artifacts.push({"id": nextId
                                   , "description": ""
                                   , "location": ""
                                   , "timestamp": Date.now.toString()}); 

    this.WriteArtifactArchive(artifactListJSON);
    response.send(artifactListJSON);
  }

  deleteArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = this.GetArtifactArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let index = artifactListJSON.artifacts.findIndex((x: { id: string; }) => x.id === params.id);

    if (index && index > 0) {
      artifactListJSON.artifacts.splice(index, 1);
      this.WriteArtifactArchive(artifactListJSON);
    } else {
      response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(artifactListJSON));
  }

  getAllArtifacts = (request: express.Request, response: express.Response) => {
    const artifactListSTRING: string = JSON.stringify(arcData);
    response.end(artifactListSTRING);
  }

  getArtifact = (request: express.Request, response: express.Response) => {
    let params = RequestBaseController.GetRequestParams(request);
    let found = this.GetArtifactById(params.id);

    if (found) {
      response.send(JSON.stringify(found));
    } else {
      response.send("error: invalid parameters");
    }

    const artifactListSTRING: string = JSON.stringify(arcData);
    response.end(artifactListSTRING);
  }

  updateArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = this.GetArtifactArchive();
    //TODO: perform commands that will update an existing artifact
    this.WriteArtifactArchive(artifactListJSON);
    response.send(artifactListJSON);
  }

  //#region Private Routines
  private GetArtifactArchive() : any {
    //get the json file and parse it into an object for use
    const artifactListSTRING: string = JSON.stringify(arcData);
    return JSON.parse(artifactListSTRING);
  }

  private GetArtifactById(id: string) : any {
    let artifactListJSON = this.GetArtifactArchive();

    let found = artifactListJSON.artifacts.find((artifact: { id: number; }) => {
      return artifact.id === Number(id)
    });

    return found = found.id > 0 ? found : null;
  }

  private WriteArtifactArchive(artifactListJSON: any){
    //write out json file with passed in json information
    var fs = require('fs');
    fs.writeFile(path.resolve(__dirname + "/../resources/artifactList.json")
               , JSON.stringify(artifactListJSON, null, 2)
               , function (err: any) {
                                  if (err) console.log(err);
                                });
  }
  //#endregion
}

export { ArtifactController }
