import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { productHandlers } from "./productHandlers";
import { categoryHandlers } from "./categoryHandlers";

const worker = setupWorker(
  ...handlers,
  ...productHandlers,
  ...categoryHandlers
);

export default worker;
