import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";
import connectDB from "./db/connect.js";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import auth from "./middleware/auth.js";
import authRoutes from "./routes/authRoutes.js";
import JobRoutes from "./routes/jobRoutes.js";

const app = express();
app.use(express.json());
app.disable('x-powered-by')
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("tiny"));
}
app.get("/", (req, res) => {
  res.json({ msg: "hahaha" });
});
// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", auth, JobRoutes);

// middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const PORT = process.env.port || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`server listening on the ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
