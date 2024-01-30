import { Router } from "express";
import { Controller } from "@/interfaces/controller";
import { AUTH } from "@/constants/path";

class AuthController implements Controller {
  public path: string;
  public router: Router;
  constructor() {
    this.path = `${AUTH}`;
    this.router = Router();
  }

  public initializeRoutes() {}

  /* APIS */
  private login = async () => {};
  private checkemail = async () => {};
  private logout = async () => {};
  private getUserIdByToken = async () => {};
  
}

export default AuthController;
