import { NextFunction, Request, Response, Router } from "express";
import { Controller } from "@/interfaces/controller";
import { CreateContentsDTO } from "./dto/contents.dto";
import ContentsService from "./contents.service";
import { getPaging } from "@/utils/getPaging";

class ContentsController implements Controller {
  public path: string;
  public router: Router;

  constructor(private contentsService: ContentsService) {
    this.path = "/contents";
    this.router = Router();

    this.initializeRoutes();
  }
  public initializeRoutes() {
    this.router.post(this.path, this.createContents);
    this.router.get(this.path, this.getAllContents);
    this.router.get(`${this.path}/:id`, this.getContentsById);
    this.router.get(`${this.path}/:id`, this.getMyFeed);
    this.router.get(`${this.path}/:id`, this.getMyFeedInfo);
    this.router.get(`${this.path}/:id`, this.getLikedMyContents);
    this.router.patch(`${this.path}/:id`, this.updateContents);
    this.router.delete(`${this.path}/:id`, this.deleteContents);
  }

  /*
    method: POST
    path: /api/v1/contents
    rel: 컨텐츠 작성 
  */
  private createContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const reqData: CreateContentsDTO = req.body;
      if (!reqData)
        return res
          .status(400)
          .json({ isOk: false, message: "입력 항목이 올바르지 않습니다." });
      const result = await this.contentsService.createContents(reqData);
      res.json({ isOk: true, message: "게시글이 저장되었습니다.", result });
    } catch (error) {
      next(error);
    }
  };

  /*
    method: GET
    path: /api/v1/contents?page=1&size=10
    rel: 모든 컨텐츠 조회
  */
  private getAllContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const queryString = req.query;
    const [currentPage, listSize, totalContents] = await getPaging(queryString);
    const result = await this.contentsService.getAllContents(
      listSize,
      currentPage
    );
    if (!totalContents) {
      return res
        .status(404)
        .json({ isOk: false, message: "게시글이 존재하지 않습니다." });
    }
    res.status(200).json({ isOk: true, result });
  };

  /*
    method: GET
    path: /api/v1/contents/:id
    rel: 컨텐츠 상세 조회
  */
  private getContentsById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  /* 
    method: GET
    path: /api/v1/contents/users/:nickname
    rel: 내 피드(내 게시글)
  */
  private getMyFeed = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  /* 
    method: GET
    path: /api/v1/contents/users/:nickname/info
    rel: 내 피드 정보
  */
  private getMyFeedInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  /* 
    method: GET
    path: /api/v1/contents/like/users/:nickname
    rel: 내 관심 게시글      
  */
  private getLikedMyContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  /* 
    method: PATCH
    path: /api/v1/contents/:id
    rel: 게시글 수정
  */
  private updateContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};

  /* 
    method: DELETE
    path: /api/v1/contents/:id
    rel: 게시글 삭제
  */
  private deleteContents = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {};
}

export default ContentsController;
