## NonFunctional Requirements
These are the quality attributes - what makes it good, not just correct.

- Decoupling Publishers must not know about subscribers
- Thread Safety Multiple threads publishing/subscribing concurrently must not corrupt state
- Extensibility Easy to plug in filters, async delivery persistence later.

Reliability
1. Isolation Guarantee: A slow or failing subscriber must not degrade the experimence

## Entity & Responsibilities
Greate LLD starts with asking: 
"Who are the actors? 
What do they know?
What can they do?"

- **message**: a data container(topic + payload + timestamp)
- **subscriber(interface)**: anyone who wants to receive messages implements onMessage()
- **Topic**: holds a list of subscribers; know how to notify them
- **MessageBroker**: The central registry; maps topic names to Topic objects
- **Publisher**: a helper that holds a broker reference and calls publish()

## Interactions(Relations)
1. Publisher publish() the messages
2. MessageBroker (lookup topic)
3. new Message()
4. Topic (notify all)
5. Subscribers

## UML class diagram
```
```
## Thread safety
Issue:
A subscriber might unsubscribe while the broker is mid-loop notifying it. What breaks?

CopyOnWriteArrayList:For the subscriber list inside each topic.
read (iteration during notify) are lock free
write (subscribe/unsubscribe) copy the underlying array

This is ideal when reads far outnumber writes - which is exactly our publish pattern.

Starts with the model

```
// Decoupling
Publisher → Broker → Topic → Subscriber

```

## Thread Safety (JS Version)

Even though JS is single-threaded:
- Async events simulate concurrency
- Snapshot pattern prevents race issues

## Extensibility Hooks

can easily add:
- Filters
- Async queue (RabbitMQ style)
- Retry logic
- Persistence (Kafka style)