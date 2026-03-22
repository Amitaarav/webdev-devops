/**
 * Maintain subscriber list
 * Handle subscribe/unsubscribe
 * notify safely
 */

// create snapshot before iterating

import { Subscriber } from "./subscriber";
import { Message } from "../model/message";

export class Topic {
    private name: string;
    private subscribers: Subscriber[] = [];

    constructor(name: string){
        this.name = name;
    }

    getName(): string{
        return this.name;
    }

    subscribe(subscriber: Subscriber): void{
        if(!this.subscribers.includes(subscriber)){
            this.subscribers.push(subscriber);
            console.log(`[Topic: ${this.name}] Subscribed`);
        }
    }

    unsubscribe(subscriber:Subscriber): void{
        this.subscribers = this.subscribers.filter(s => s !== subscriber);
        console.log(`[Topic ${this.name}] Unsubscribed`);
    }

    notifySubscribers(message: Message): void{
        // snapshot copy 
        const snapshot = [...this.subscribers];

        for(const subscriber of snapshot){
            try{
                subscriber.onMessage(message);
            } catch (e: any){
                console.error(`[Topic ${this.name} Error: ${e.message}]`);
            }
        }
    }

    subscriberCount(): number{
        return this.subscribers.length;
    }
}
/**
 * Why snapshot?
 * Without it:
    - If unsubscribe happens mid-loop → array mutation → bugs

    With it:
    Read = safe
    Write = independent

    This mimic Copy-On-Write pattern
 */