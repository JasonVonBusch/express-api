class Artifact {
    constructor(id: string, description: string, location: string, timeStamp: Date){
        this.id = id;
        this.description = description;
        this.location = location;
        this.timeStamp = timeStamp;
    }

    public id: string;
    public description: string;
    public location: string;
    public timeStamp: Date;
};

export { Artifact };