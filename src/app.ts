import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import errorMiddleware from "./middleware/error.middleware";
import { Controller } from "./interfaces/controller";
import cookieParser from "cookie-parser";
import path from "path";
import { BASIC_API_URL } from "./constants/path";

class App {
  app: Application;
  constructor(controllers: Controller[]) {
    this.app = express();
    this.app.set("port", process.env.PORT || 5000);

    this.connectDB();
    this.initializeMeddlewares();
    this.initalControllers(controllers);
    this.initalStaticRoutes();
    this.initializeErrorHandler();
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

  private initializeMeddlewares(): void {
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

  private initalStaticRoutes(): void {
    // 아래 이미지 url은 스토리지 사용하게 되면 initalStaticRoutes이 필요없음
    this.app.use(
      "/img/uimg",
      express.static(path.join(__dirname, "..", "/src/", "uploads/userImg"))
    );
    this.app.use(
      "/img/pimg",
      express.static(path.join(__dirname, "..", "/src/", "uploads/postImg"))
      );
  }

  private initalControllers(controllers: Controller[]): void {
    this.app.use("/api/page", (req: Request, res: Response) => {
      res.send("page page");
    });
    controllers.forEach((controller) => {
      this.app.use(`${BASIC_API_URL}`, controller.router);
    });
    this.app.use("/api/*", (req, res) =>
      res.send("해당 페이지를 찾을 수 없습니다.")
    );
    this.app.use("/*", (req, res) =>
      res.send("당클린 서버에 연결 성공")
    );
  }

  private initializeErrorHandler(): void {
    this.app.use(errorMiddleware);
  }

  public listen(): void {
    const port = this.app.get("port");
    this.app.listen(port, () => {
      console.log(`Server Listening on http://localhost:${port}`);
    });
  }
}

export default App;
