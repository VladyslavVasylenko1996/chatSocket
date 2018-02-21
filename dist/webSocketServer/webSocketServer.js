"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketIo = require("socket.io");
class WebSocketServer {
    constructor(redis) {
        this.port = process.env.PORT || WebSocketServer.PORT;
        this.redis = redis;
        this.io = socketIo();
        this.listen();
    }
    listen() {
        this.io.listen(this.port);
        this.io.on('connect', (socket) => {
            socket.on('subscribeChannel', (message) => {
                console.log('subscribed: ' + message);
                this.redis.subscribe(message);
            });
            socket.on('disconnect', () => {
                this.redis.unsubscribe();
            });
        });
    }
    broadcast(channel, message) {
        console.log('broadcast');
    }
}
WebSocketServer.PORT = 8080;
exports.default = WebSocketServer;