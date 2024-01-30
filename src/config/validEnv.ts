import "dotenv/config";
import { cleanEnv, port, str } from "envalid";

function validateEnv() {
  cleanEnv(process.env, {
    MONGO_PATH: str(),
    PORT: port(),
    CLIENT_URL: str(),
    JWT_SECRET: str(),
    JWT_ALGORITHN: str(),
    JWT_SHORT_EXPIRESIN: str(),
    COOKIE_SECRET: str(),
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"]
    })
  });
}

export default validateEnv;
