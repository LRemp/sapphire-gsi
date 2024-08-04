// src/index.ts
import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req: any, res: any) => {
  res.send("Hello, TypeScript with Express!");
});

app.post("/", (req: any, rest: any) => {
  var body = "";

  req.on("data", (data: any) => {
    body += data;
  });

  req.on("end", () => {
    console.log("http request payload: " + body);
    const data = JSON.parse(body);
    io.emit("update", data);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
