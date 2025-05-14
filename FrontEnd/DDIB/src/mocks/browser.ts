import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { productHandlers } from "./productHandlers";
import { categoryHandlers } from "./categoryHandlers";
import { userHandlers } from "./userHandlers";

const worker = setupWorker(
  ...handlers,
  ...productHandlers,
  ...categoryHandlers,
  ...userHandlers
);

export default worker;
