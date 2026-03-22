import { Topic } from "./topic";
import { Subscriber } from "./subscriber";
import { Message } from "../model/Message";

export class MessageBroker {
  private static instance: MessageBroker;
  private topics: Map<string, Topic> = new Map(); //O(1), scalable for many topics

  private constructor() {}

  static getInstance(): MessageBroker {
    if (!MessageBroker.instance) {
      MessageBroker.instance = new MessageBroker();
    }
    return MessageBroker.instance;
  }

  createTopic(name: string): Topic {
    if (!this.topics.has(name)) {
      this.topics.set(name, new Topic(name));
    }
    console.log(`[Broker] Topic created/fetched: ${name}`);
    return this.topics.get(name)!;
  }

  private getOrThrow(name: string): Topic {
    const topic = this.topics.get(name);
    if (!topic) throw new Error(`Topic not found: ${name}`);
    return topic;
  }

  subscribe(topicName: string, subscriber: Subscriber): void {
    this.getOrThrow(topicName).subscribe(subscriber);
  }

  unsubscribe(topicName: string, subscriber: Subscriber): void {
    this.getOrThrow(topicName).unsubscribe(subscriber);
  }

  publish(topicName: string, payload: string): void {
    const topic = this.getOrThrow(topicName);
    const message = new Message(topicName, payload);

    console.log(`[Broker] Publishing to '${topicName}': ${payload}`);
    topic.notifySubscribers(message);
  }
}