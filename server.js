const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.static("public"));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.id);

    socket.on("message", (msg) => {
        console.log("📩 Message:", msg);

        // Send to all connected clients
        io.emit("message", msg);
    });

    socket.on("disconnect", () => {
        console.log("🔴 User disconnected:", socket.id);
    });
});

server.listen(3000, () => {
    console.log("🚀 Socket.IO server running at http://localhost:3000");
});
