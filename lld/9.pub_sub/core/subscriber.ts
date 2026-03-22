import { Message } from "../model/message"

export interface Subscriber{
    onMessage(message: Message): void;
}

/**
 * This is Dependency Inversion Principle (DIP):
    System depends on abstraction, not concrete classes
 */