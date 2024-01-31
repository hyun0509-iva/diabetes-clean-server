import "module-alias/register";
import validateEnv from "./config/validEnv";
import App from "./app";
import ContentsController from "./apis/contents/contents.controller";
import ContentsService from "./apis/contents/contents.service";

validateEnv();

/* services */
const contentsService = new ContentsService()

const server = new App([new ContentsController(contentsService)]);

server.listen();
