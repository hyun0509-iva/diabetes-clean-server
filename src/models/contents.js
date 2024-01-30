import { Schema, model } from "mongoose";
const { ObjectId } = Schema.Types;

const contentsSchema = new Schema(
  {
    writer: {
      type: ObjectId,
      ref: "User"
    },
    content: {
      type: String
    },
    imageName: {
      type: String,
      default: ""
    },
    imageUrl: {
      type: String,
      default: ""
    },
    isDeleted: {
      type: Boolean,
      default: false /* true이면 삭제된 상태 */
    }
  },
  {
    timestamps: true
  }
);

// 검색을 위한 인덱싱
contentsSchema.index({ content: "text" });
const Contents = model("Contents", contentsSchema);
export default Contents;
