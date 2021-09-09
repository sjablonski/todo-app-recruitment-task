import express, { Application } from "express";
import cors from "cors";
import routers from "routes";
import mongoose from "mongoose";
import mongoURI from "configs/mongo";
import TodoTask from "models/TodoTask";
import initTodoTaskCollection from "utils/initTodoTaskCollection";

const app: Application = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

async function run() {
  await mongoose.connect(mongoURI);

  // Collection initialization
  const todotaskLength = await TodoTask.count();
  if (todotaskLength === 0) {
    await initTodoTaskCollection();
  }

  app.use("/", routers);
  app.listen(3001);
  console.log("App is listening on port 3001");
}

run().catch((e) => console.error(`[backend] ${e.message}`, e));

const errorTypes = ["unhandledRejection", "uncaughtException"];
const signalTraps = ["SIGTERM", "SIGINT", "SIGUSR2"];

errorTypes.map((type) => {
  process.on(type, async (message) => {
    try {
      console.error(`process.on ${type}, ${message}`);
      await mongoose.connection.db.dropCollection("todotasks"); // Cleaning collection
      process.exit(0);
    } catch (_) {
      process.exit(1);
    }
  });
});

signalTraps.map((type) => {
  process.on(type, async () => {
    try {
      await mongoose.connection.db.dropCollection("todotasks"); // Cleaning collection
    } finally {
      process.kill(process.pid, type);
      process.exit();
    }
  });
});
