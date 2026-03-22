import { Subscriber } from "./Subscriber";
import { Message } from "./Message";

export class ConcreteSubscriber implements Subscriber {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  onMessage(message: Message): void {
    console.log(`   >> [${this.name}] received: ${message.toString()}`);
  }
}