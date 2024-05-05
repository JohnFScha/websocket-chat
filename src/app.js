//* dotenv
import { config } from "dotenv";
config();

//* Components
import { createServer } from "node:http";
import createError from "http-errors";
import express, { json, urlencoded } from "express";
import { join } from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { engine } from "express-handlebars";
import { __dirname } from "./path.js";
import { Server } from "socket.io";
import { connect } from "mongoose";
import { MessageModel } from "./models/chat.model.js";
import censorMessage from "./helpers/censorMessage.js";

// * Routes
import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

const PORT = process.env.PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;

const app = express();
const server = createServer(app);
const io = new Server(server);

//* view engine setup
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", join(__dirname, "views"));

//* Middlewares
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(join(__dirname, "public")));

//* Routes implementation
app.use("/", indexRouter);
app.use("/users", usersRouter);

//! catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

//! error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { err: err.message });
});

io.on("connection", (socket) => {
  console.log("a user connected");

  //* Disconnect
  // Cuando la ruta que aloja el socket se cierra, se cierra a su vez la conexion, para ahorrar recursos y por seguridad, ya que un socket ofrece una entrada sencilla al servidor para cualquier atacante.
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //* Recieve a msg
  // Aca se implementa la logica necesaria para por ejenplo
  // guardar el mensaje en la DB, etc.
  socket.on("chat message", async (msg) => {
    const censoredMsg = censorMessage(msg)
    await MessageModel.create({message: msg, createdAt: Date.now()})
    io.emit("chat message", censoredMsg);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});

connect(MONGO_DB_URI)
  .then(() => console.log("Connected to MongoDB Cloud"))
  .catch((err) => console.log(err));
