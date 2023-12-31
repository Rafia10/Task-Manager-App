import http from 'http'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router  from './src/Routes/route.js'
import express from 'express'
import cors from 'cors'
import {Server} from 'socket.io'

dotenv.config()
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());
app.use('/auth',router)
app.use('/task',router)


async function start() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    io.on('connection', (socket) => {
      console.log('user is connected');
    });
    server.listen(port, console.log("Server is up and running at port",port));
  } catch (error) {
    console.log("Connection failed",error);
  }
}
start();