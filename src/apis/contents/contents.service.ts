import LikeModel from "../likes/likes.model";
import UsersModel from "../users/users.model";
import ContentsModel from "./contents.model";
import { CreateContentsDTO, UpdateContentsDTO } from "./dto/contents.dto";

class ContentsService {
  private Contents = ContentsModel;
  private Users = UsersModel;
  private Likes = LikeModel;

  /* Business */
  public createContents = async (data: CreateContentsDTO) => {
    const newContents = new this.Contents(data);
    const result = await newContents.save();
    return result;
  };
  /* 모든 게시글 */
  public getAllContents = async (listSize: number, currentPage: number) => {
    const contents = await this.Contents.find()
      .sort({ createdAt: -1 }) //데이터 최신순으로 정렬
      .skip(listSize * (currentPage - 1))
      .limit(listSize)
      .populate("writer", "nickname imageSrc");
    return contents;
  };
  /* 게시글 상세 */
  public getContentsById = async (id: string) => {
    const contents = await this.Contents.findById(id).populate(
      "writer",
      "nickname imageSrc"
    );

    return contents;
  };
  /* 내 피드(내 게시글) */
  public getMyFeed = async (
    userId: string,
    listSize: number,
    currentPage: number
  ) => {
    const contents = await this.Contents.find()
      .where("writer")
      .equals(userId)
      .sort({ createdAt: -1 })
      .skip(listSize * (currentPage - 1))
      .limit(listSize)
      .populate("writer", "email nickname imageSrc aboutMe");

    return contents;
  };
  /* 내 피드 정보 */
  public getMyFeedInfo = async (nickname: string) => {
    const users = await this.Users.findOne({ nickname });
    const contentsCount = await this.Contents.countDocuments({
      writer: users._id
    });
    return { users, contentsCount };
  };
  /* 내관심 게시글 */
  public getLikedMyContents = async (
    userId: string,
    listSize: number,
    currentPage: number
  ) => {
    const likedPost = await this.Likes.find()
      .where("writer")
      .equals(userId)
      .where({ contentsType: "contents" })
      .sort({ createdAt: -1 })
      .select("_id contents")
      .skip(listSize * (currentPage - 1))
      .limit(listSize)
      .populate({
        path: "contents",
        populate: { path: "writer", select: "_id email nickname imageSrc" }
      });
    return likedPost;
  };
  /* 게시글 수정 */
  public updateContents = async (id: string, data: UpdateContentsDTO) => {
    const contents = await this.Contents.findById(id);
    if (!contents) return null;
    const result = await contents.updateOne({
      $set: data
    });
    return result;
  };
  /* 게시글 삭제 */
  public deleteContents = async (id: string) => {
    const contents = await this.Contents.findById(id);
    if (!contents) return null;
    const result = await contents.updateOne({
      $set: { isDeleted: true }
    });
    return result;
  };
}

export default ContentsService;
