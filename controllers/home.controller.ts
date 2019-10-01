import * as express from "express";

class HomeController {
  public path = "/";
  public router = express.Router();

  constructor() { 
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get(this.path, this.getHomePage);
  }

  getHomePage = (request: express.Request, response: express.Response) => {
    let name = request.query.name !== undefined 
             ? `Welcome Home ${request.query.name}, this is your main entry point.`
             : `Welcome Home, this is your main entry point.`
    response.send(name);
  }
}

export { HomeController }
