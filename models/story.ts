class Story {
    constructor(id: string, description: string, timeStamp: Date, ...artifactList: []){
        this.id = id;
        this.description = description;
        this.timeStamp = timeStamp;
        this.artifactList = artifactList;
    }

    public id: string;
    public description: string;
    public timeStamp: Date;
    public artifactList: [];
};

export { Story };