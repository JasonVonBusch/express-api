const express = require("express");
const chalk = require("chalk");

//const app = express();
//const port = process.env.PORT || 3000;

// Setup the API routes
//app.get("/", (req, res) => {
//  res.send(`Welcome Home!  This is your main entry point.`);
//});

//app.get("/api", (req, res) => {
//  res.json({
//    name: req.query.name !== undefined ? req.query.name : "<name>",
//    team: req.query.team !== undefined ? req.query.team : "<team>",
//    cpuUsage: process.cpuUsage(),
//    memoryUsage: process.memoryUsage()
//  });
//});

//app.get("/about", (req, res) => {
//  res.send(AboutController.AboutPage());
//});

// Listen for incoming connections to the API
//app.listen(port, () => {
//  console.log(`${chalk.green(`Express is listening on port ${port}...`)}`);
//});

class App {
  public app: any;
  public port: number;

  constructor (controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeControllers(controllers);
  }
  
  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`${chalk.green(`Express is listening on port ${this.port}...`)}`);
    });
  }
}

export { App }