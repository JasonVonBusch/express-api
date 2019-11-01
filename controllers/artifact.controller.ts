import * as express              from "express";
import { IArtifact }              from "../models/artifact";
import { RequestBaseController } from "./requestbase.controller";
import path    = require("path");
import arcData = require("../resources/artifactList.json");


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
    let artifactListJSON = ArtifactController.GetArtifactArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = ArtifactController.GetArtifactById(params.id);
    
    if (found) { response.send("error: invalid parameters"); }
    
    //build new story object to be added
    let today = new Date(Date.now.toString());
    let newArtifact: IArtifact ={id         : params.id,
                                 description: params.description,
                                 location   : params.location,
                                 timeStamp  : today};
    
    //add the new story to existing ones
    artifactListJSON.aritfacts.push(newArtifact); 
    
    //update artifact for stories
    ArtifactController.WriteArtifactArchive(artifactListJSON);
    
    response.send(JSON.stringify(artifactListJSON));
  }

  deleteArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = ArtifactController.GetArtifactArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let index = artifactListJSON.artifacts.findIndex((x: { id: number; }) => x.id === params.id);

    if (index && index > 0) {
      artifactListJSON.artifacts.splice(index, 1);
      ArtifactController.WriteArtifactArchive(artifactListJSON);
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
    let found = ArtifactController.GetArtifactById(params.id);

    if (found) {
      response.send(JSON.stringify(found));
    } else {
      response.send("error: invalid parameters");
    }

    const artifactListSTRING: string = JSON.stringify(arcData);
    response.end(artifactListSTRING);
  }

  updateArtifact = (request: express.Request, response: express.Response) => {
    let artifactListJSON = ArtifactController.GetArtifactArchive();
    let params = RequestBaseController.GetRequestParams(request);
    let found = ArtifactController.GetArtifactById(params.id);

    if (found) {
      console.log("success: artifact was found, updating...");
      for (let idx = 0; idx < artifactListJSON.artifacts.length; idx++) {
        if (artifactListJSON.artifacts[idx].id === found.id) {
          artifactListJSON.artifacts[idx].description = params.description !== null
                                                      ? params.description
                                                      : artifactListJSON.artifacts[idx].description;
          artifactListJSON.artifacts[idx].location = params.location !== null
                                                   ? params.location
                                                   : artifactListJSON.artifacts[idx].location;

          artifactListJSON.artifacts[idx].timeStamp = Date.now.toString()
          console.log("success: artifact updated!");
        }
      }
      //update existing artifact
      ArtifactController.WriteArtifactArchive(artifactListJSON);
    } else {
      return response.send("error: invalid parameters");
    }

    //respond with latest information, updated or not
    response.send(JSON.stringify(artifactListJSON));
  }

  //#region Private Routines
  static GetArtifactArchive() : any {
    //get the json file and parse it into an object for use
    const artifactListSTRING: string = JSON.stringify(arcData);
    return JSON.parse(artifactListSTRING);
  }

  static GetArtifactById(id: number) : any {
    let artifactListJSON = this.GetArtifactArchive();

    let found = artifactListJSON.artifacts.find((artifact: { id: number; }) => {
      return artifact.id === Number(id)
    });

    return found = found.id > 0 ? found : null;
  }

  static WriteArtifactArchive(artifactListJSON: any){
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
