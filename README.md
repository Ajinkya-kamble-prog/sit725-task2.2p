# SIT725 Task 2.2P: Express Web Server

A simple Node.js + Express server that serves a static web page and exposes a REST calculator API.

## Requirements
- Node.js (LTS) and npm

## Setup
```bash
git clone https://github.com/Ajinkya-kamble-prog/sit725-task2.2p.git
cd sit725-task2.2p
npm install
node server.js
```
Server runs at http://localhost:3000

## Web page
Open http://localhost:3000 to use the calculator UI (served from `/public`).

## API Endpoints

| Method | Endpoint | Example |
|--------|----------|---------|
| GET | `/hello` | `/hello` |
| GET | `/add?a=&b=` | `/add?a=5&b=3` |
| GET | `/subtract?a=&b=` | `/subtract?a=10&b=4` |
| GET | `/multiply?a=&b=` | `/multiply?a=6&b=7` |
| GET | `/divide?a=&b=` | `/divide?a=10&b=2` |
| POST | `/calculate` | body: `{"a":10,"b":4,"operation":"add"}` |

Invalid input returns HTTP 400 with an error message.