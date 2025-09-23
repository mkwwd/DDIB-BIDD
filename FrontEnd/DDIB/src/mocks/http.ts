import { createMiddleware } from "@mswjs/http-middleware";
import express from "express";
import cors from "cors";
import { handlers } from "./handlers";
import { productHandlers } from "./productHandlers";
import { categoryHandlers } from "./categoryHandlers";
import { userHandlers } from "./userHandlers";

const app = express();
const port = 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
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
