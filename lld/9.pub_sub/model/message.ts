export class Message{
    public readonly topicName: string;
    public readonly payload: string;
    public readonly timestamp: number; 

    constructor(topicName: string, payload: string, timestamp: number){
        this.topicName = topicName;
        this.payload = payload;
        this.timestamp = timestamp; // milliseconds
    }

    toString(): string{
        return "[" + topicName + "] " + payload + " @" + timestamp;
    }

}