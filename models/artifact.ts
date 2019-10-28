class Artifact {
    constructor(id: number, description: string, location: string, timeStamp: Date){
        this.id = id;
        this.description = description;
        this.location = location;
        this.timeStamp = timeStamp;
    }

    public id: number;
    public description: string;
    public location: string;
    public timeStamp: Date;
};

export { Artifact };