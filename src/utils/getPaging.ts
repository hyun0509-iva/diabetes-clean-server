import qs, { ParsedQs } from "qs";
import ContentsModel from "@/apis/contents/contents.model";

/**
 * 페이징 처리해주는 함수
 * @param query - req.query
 * @param filter - mongodb query
 * @param Model - mongodb Model
 * @returns Promise<number[]>
 */
export async function getPaging(query: any, filter = {}, Model = ContentsModel) {
  console.log({ Model });
  const { page, size } = qs.parse(query);
  const currentPage = parseInt((page as string) || "1", 10); // 현재 페이지, default: 1
  const listSize = parseInt((size as string) || "10", 10); //한 페이지당 보여줄 게시글 수, default: 1
  const totalContents = await Model.countDocuments(filter); //총 컨텐츠 갯수
  return [currentPage, listSize, totalContents];
}
