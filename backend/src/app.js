import { default as connectDB } from "@/database/config";
import seedDB from "@/database/seed";
import { PORT } from "@/utils/config";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { default as routes } from "./routes";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

connectDB();
seedDB();
