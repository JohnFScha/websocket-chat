import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const MessageSchema = new Schema({ message: String });

MessageSchema.plugin(mongoosePaginate);

const MessageModel = model("Message", MessageSchema);

export default MessageModel;
