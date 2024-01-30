import "module-alias/register";
import validateEnv from "./config/validEnv";

validateEnv();

/* services */

const server = new App([new BoardController(boardService)]);

server.listen();
