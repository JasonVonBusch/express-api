class RequestParams {
    constructor(id: string, description: string, location: string) {
        this.id = id;
        this. description = description;
        this.location = location;
    }

    public id: string;
    public description: string;
    public location: string;
}

export {RequestParams};