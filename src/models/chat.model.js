import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//* Definir el esquema del documento
const MessageSchema = new Schema({ 
  message: String, 
  createdAt: Date
});

//* Añadir plugins a mongoose
MessageSchema.plugin(mongoosePaginate);

//* Instancia desde la que se realizan las consultas a la DB
export const MessageModel = model("Message", MessageSchema);
