class Story {
    constructor(id: number, description: string, timeStamp: Date, ...artifactList: []){
        this.id = id;
        this.description = description;
        this.timeStamp = timeStamp;
        this.artifactList = artifactList;
    }

    public id: number;
    public description: string;
    public timeStamp: Date;
    public artifactList: [];
};

export { Story };