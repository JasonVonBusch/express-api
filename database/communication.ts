import { createConnection, Connection } from "typeorm";
// import { Artifact } from "./entity/artifact.entity";
import { Story } from "./entity/story.entity";

export class Communication {
    static async GetConnection() {
        return await createConnection({
                        type: "postgres",
                        host: "localhost",
                        port: 5432,
                        username: "postgres",
                        password: "postgres",
                        database: "postgres",
                        entities: [
                            // __dirname + './entity/*.entity.js',
                            // Artifact,
                            Story
                        ],
                        synchronize: true,
                        logging: false
                    }).then(connection => {      
                        // return the connection
                        return connection;
                    }).catch(error => {
                        console.log(error)
                        return null;
                    });
    }
}

