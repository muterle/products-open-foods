import express, { Express } from "express";
import cors from "cors";

const server: Express = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

export default server;
