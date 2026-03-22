## A port is a logical communication endpoint that allows the operating system to route incoming network traffic to the correct application process.

1. Why Ports Exist

When data arrives at a computer through the IP address, the system still needs to know which application should receive the data.

A single machine can run multiple network services simultaneously:
- Web server
- Email server
- SSH
- Database
- Multiplayer game server

**All of them share the same IP address.**

So the OS uses ports to decide which process should handle the incoming data.

```
| Component   | Real-world analogy              |
| ----------- | ------------------------------- |
| IP Address  | Apartment building address      |
| Port        | Apartment number                |
| Application | Person living in that apartment |

```
```
IP Address: 192.168.1.5
Port: 80
```

2. Ports + IP = Socket

A socket uniquely identifies a network connection.

4. Common Well-Known Ports

Here are important ports you should know:

```
| Port  | Protocol   | Service                |
| ----- | ---------- | ---------------------- |
| 20/21 | FTP        | File Transfer          |
| 22    | SSH        | Secure remote login    |
| 23    | Telnet     | Remote login           |
| 25    | SMTP       | Email sending          |
| 53    | DNS        | Domain name resolution |
| 80    | HTTP       | Websites               |
| 443   | HTTPS      | Secure websites        |
| 3306  | MySQL      | Database               |
| 5432  | PostgreSQL | Database               |
| 27017 | MongoDB    | Database               |

```

5. How Ports work in a real request
Let's see what happens when we visit a website.

### step 1: Browser sends request
```
    Client: 192.168.1.5:52344
    Server: 142.250.183.14:443
```
where:
- 52344 = temporary port created by OS
- 443 = HTTPS port

### step 2: Server recieves the request
The serverchecks:
Destination Port = 443

So it forwards the request to the web server process.

Example processes:
- Nginx
- Apache
- Node.js server
- Express app

### Step 3 — Server responds

The response goes back to:
192.168.1.5:52344

6. Ports and Protocols
Ports are used with transport layer protocols:
TCP Ports
- Reliable connection.

Used by:
- HTTP
- HTTPS
- FTP
- SSH
- Databases

UDP Ports
- Faster but no guarantee of delivery.

Used by:
- DNS
- VoIP
- Video streaming
- Online games

## Network Protocol
Protocols are a set of rules and regulations setup to communicate and share information over a network.

ex: HTTP, UDP, TCP etc

Email: SMTP - Simple mail transfer protocol

## Packets
In order to share data, we can't send big chunk of data over the network. So we divide the data into smaller chunks, these small chuncks are called packets.

## Address
Sending messages over the networks requires the destination details. This detail uniquely identify the end system is called as address.

## Ports
At which process
Any machine could be running many network apps, in order to distinguish these apps for receiving messages we use ports: (port numbers)

```
    IP-address + Port = Socket
```

Port helps you get the packets to specific process on the host.

##
Every process has 16 bit port number:

```
    0 – 65535 ports
```

They are divided into three categories.

```
| Range         | Type                    | Description                  |
| ------------- | ----------------------- | ---------------------------- |
| 0 – 1023      | Well-known ports        | Reserved for common services |
| 1024 – 49151  | Registered ports        | Assigned to software         |
| 49152 – 65535 | Dynamic/Ephemeral ports | Temporary client ports       |
```
## System Defined


## Registered ports
They are used by specific, potentially proprietary apps/process that are known but not system defined.

End user, opensource

Sql server: 1433
MongoDB: 27017

we can specifically mention or change the port

## Dynamic ports
For future purpose: we can run some of our process

## Access Network
These are media using which end systems connect to the internet.

Wifi
Telephone lines

***Network interface adapter***: It enables a computer to attach to a network. As there are different type of networks, it acts as a single suite to connect to any network. (Hardware Device)

***DSL (Digital Subscriber line):*** 
DSL uses the existing telephone groundwork lines for internet connection.Generally DSL is provided by same company which supplies telephone service.

***ISP (Internet Service Provider): ***
It is just a company which provide end users internet.
ex: AT&T

Fiber, satelite, cable, dial up connection
