import mongoose, { Schema, model } from "mongoose";
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
      default: false /* true이면 삭제된 상태, 삭제일자로 변경할 예정 */
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// 검색을 위한 인덱싱
contentsSchema.index({ content: "text" });
const ContentsModel = model<IContents & mongoose.Document>("Contents", contentsSchema);
export default ContentsModel;
