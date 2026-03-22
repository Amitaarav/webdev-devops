// Demo.ts
import { MessageBroker } from "../core/messageBroker";
import { Publisher } from "../publisher/publisher";
import { ConcreteSubscriber } from "../subscriber/concreteSubscriber";

const broker = MessageBroker.getInstance();

// Create topics
broker.createTopic("sports");
broker.createTopic("tech");

// Subscribers
const alice = new ConcreteSubscriber("Alice");
const bob = new ConcreteSubscriber("Bob");
const carol = new ConcreteSubscriber("Carol");

// Subscribe
broker.subscribe("sports", alice);
broker.subscribe("sports", bob);
broker.subscribe("tech", bob);
broker.subscribe("tech", carol);

// Publishers
const espn = new Publisher("ESPN");
const techCrunch = new Publisher("TechCrunch");

// Publish
espn.publish("sports", "Messi scores!");
techCrunch.publish("tech", "GPT-5 announced!");

// Unsubscribe
console.log("\n--- Bob unsubscribes from sports ---");
broker.unsubscribe("sports", bob);

espn.publish("sports", "Ronaldo retires");