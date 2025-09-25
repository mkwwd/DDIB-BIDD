import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "./handlers";
import { productHandlers } from "./productHandlers";
import { categoryHandlers } from "./categoryHandlers";
import { userHandlers } from "./userHandlers";

const app = express();
const port = 8080;

const allowedOrigins = [
  "http://localhost:3000",
  "https://ddib-bidd.vercel.app/",
  "https://ddib-bidd-git-master-chojayoungs-projects.vercel.app/maintenance",
];

app.use(
  cors({
    origin: allowedOrigins,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.use(express.json());
app.use(
  createMiddleware(
    ...handlers,
    ...productHandlers,
    ...categoryHandlers,
    ...userHandlers
  )
);
app.listen(port, () => console.log(`Mock server is running on port: ${port}`));
