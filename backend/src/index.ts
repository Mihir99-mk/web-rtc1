import express from "express"
import http from "http"
import {Server} from "socket.io"
import { route } from "./routes/route"
import cors from "cors"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"

const app = express()
const server = http.createServer(app)
const io = new Server(server)
const PORT = 4000;
app.use(cors({
    origin: "*"
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(route)


io.on("connection", ()=>{
    console.log(`a user connected`)
})

server.listen(PORT, ()=>{
    console.log(`server running on ${PORT}`)
})
