const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app)
require("dotenv/config");

// add cors when setting up server with heroku
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000/"
    }
})

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// add origins when setting up heroku
app.use(cors());
app.use(session({
    secret: process.env.Secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.Store_Connection })
}))

// routes
app.use("/account", require("./routes/account"));
app.use("/auth", require("./routes/auth"));
app.use("/search", require("./routes/search"));

io.on("connection", (socket) => {

    socket.on("sent", (message) => {
        socket.broadcast.emit("received", message)
    })

    socket.on("join", (room, id) => {
        socket.join(room);
    })
})

httpServer.listen(process.env.Port || 3400, () => {
    console.log("server started");
})

mongoose.connect(process.env.Store_Connection, () => {
    console.log("database connected");
})