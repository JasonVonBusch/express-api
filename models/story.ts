class Story {
    constructor(id: number, description: string, timeStamp: Date, ...artifactIds: []){
        this.id = id;
        this.description = description;
        this.timeStamp = timeStamp;
        this.artifactIds = artifactIds;
    }

    public id: number;
    public description: string;
    public timeStamp: Date;
    public artifactIds: [];
};

export { Story };