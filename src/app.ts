import express, { Application } from "express";
import morgan from 'morgan';
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middleware/error.middleware";
import { Controller } from "./interfaces/controller";
import cookieParser from "cookie-parser";
// import config from "./config/key.js";
// import dbconnect from "./dbconfig.js";
// import {
//   usersRouter,
//   authRouter,
//   commentRouter,
//   contentsRouter,
//   diabetesRouter,
//   likeRouter,
//   searchRouter,
//   imageRouter
// } from "./routes/index.js";
// import {
//   BASIC_API_URL,
//   COMMENT,
//   LIKE,
//   SEARCH,
//   USERS,
//   AUTH,
//   DIABETES,
//   CONTENTS,
//   BASIC_CLIENT_URL
// } from "./constants/path.js";
// import path from "path";
// import { fileURLToPath } from "url";
// app.use("/img/uimg", express.static(path.join(__dirname, "uploads/userImg")));
// app.use("/img/pimg", express.static(path.join(__dirname, "uploads/postImg")));

// app.use(`${BASIC_API_URL}/${USERS}`, usersRouter);
// app.use(`${BASIC_API_URL}/${AUTH}`, authRouter);
// app.use(`${BASIC_API_URL}/${DIABETES}`, diabetesRouter);
// app.use(`${BASIC_API_URL}/${CONTENTS}`, contentsRouter);
// app.use(`${BASIC_API_URL}/${COMMENT}`, commentRouter);
// app.use(`${BASIC_API_URL}/${LIKE}`, likeRouter);
// app.use(`${BASIC_API_URL}/${SEARCH}`, searchRouter);
// app.use(`${BASIC_API_URL}/image`, imageRouter);
// // app.use(`${INDEX_PATH}`, (_, res) => res.send("연결 완료"));

class App {
  app: Application;
  constructor(controllers: Controller) {
    this.app = express();
    this.connectDB();
    this.initializeMeddlewares();

  }
  private connectDB() {
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
    try {
      mongoose.connect(process.env.MONGO_PATH);
    } catch (err) {
      console.error(err);
    }

    mongoose.connection.on("connected", () => {
      console.log("몽고디비에 연결되었습니다. 😊");
    });

    mongoose.connection.on("disconnected", this.connectDB);
  }

  private initializeMeddlewares() {
    this.app.use(morgan("dev"));
    this.app.use(
      cors({
        origin: process.env.CLIENT_URL || `${process.env.BASIC_CLIENT_URL}`,
        credentials: true
      })
    );
    this.app.use(
      helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" }
      })
    );
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cookieParser(process.env.COOKIE_SECRET));
  }
  private initializeErrorHandler() {
    this.app.use(errorMiddleware);
  }

  public listen() {}
}

// app.listen(PORT, () =>
//   console.log(`Server Listening on http://localhost:${PORT}`)
// );

export default App;
