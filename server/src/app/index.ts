import express from "express";
import { defaultError, notFoundError } from "./errors";
import middlewares from "./middlewares";
import router from "./router";

const app = express();

// use middlewares
app.use(middlewares);

// use router
app.use(router);
// handle errors
app.use(notFoundError);
app.use(defaultError);

export default app;
