import { MessageBroker} from "../core/messageBroker";

export class Publisher{
    private name: string;
    private broker: MessageBroker;

    constructor (name: string){
        this.name = name;
        this.braker = MessageBroker.getInstance();
    }

    publish(topicName: string, payload: string): void{
        console.log(`\n[Publisher: ${this.name}] Publishing...`);
        this.broker.publish(topicName, payload);
    }
}