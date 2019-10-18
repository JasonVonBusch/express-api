import * as express from "express";
import { Artifact } from "../models/artifact";

class ArtifactController {
  public router = express.Router();
  public jsonData = require("../datarepo/artifactList.json");

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/addartifact"   , this.addArtifact);
    this.router.get("/deleteartifact", this.addArtifact);
    this.router.get("/getartifacts"  , this.getArtifacts);
    this.router.get("/updateartifact", this.updateArtifact);
  }

  addArtifact = (request: express.Request, response: express.Response) => {
    //get artifact information from the existing json file, if it is present
    let artifactListJSON = this.GetArtifactArchive();
    let nextId = artifactListJSON.artifacts.length + 1;

    artifactListJSON.artifacts.push({"id": nextId
                                   , "description": ""
                                   , "location": ""
                                   , "timestamp": Date.now.toString()}); 

    this.UpdateArtifactArchive(artifactListJSON);
    response.send(artifactListJSON);
  }

  deleteArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = this.GetArtifactArchive();
    //perform commands to do the delete
    this.UpdateArtifactArchive(artifactListJSON);
    response.send(artifactListJSON);
  }

  getArtifacts = (request: express.Request, response: express.Response) => {
    const artifactListSTRING: string = JSON.stringify(this.jsonData);
    response.end(artifactListSTRING);
  }

  updateArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = this.GetArtifactArchive();
    //perform commands that will update existing records
    this.UpdateArtifactArchive(artifactListJSON);
    response.send(artifactListJSON);
  }

  private GetArtifactArchive() : any {
    //get the json file and parse it into an object for use
    return JSON.parse(this.jsonData);
  }

  private UpdateArtifactArchive(artifactListJSON: any){
    //write out json file with passed in json information
    var fs = require('fs');
    fs.writeFile(""
               , JSON.stringify(artifactListJSON, null, 2)
               , function (err) {
                                  if (err) console.log(err);
                                });
  }
}

export { ArtifactController }
