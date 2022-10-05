/* eslint-disable import/first */
import dotenv from "dotenv";
import moment from "moment";
// get env vars before doing anything else
dotenv.config();
import Koa from "koa";
import cors from "@koa/cors";
import json from "koa-json";
import Router from "koa-router";
import koaBody from "koa-body";
import config from "config";

import itemTypesRoutes from "./routes/itemTypes";
import storageRoutes from "./routes/storages";
import itemsRoutes from "./routes/items";

const koa404Handler = require("koa-404-handler");
const errorHandler = require("koa-better-error-handler");

const port = config.get("port");

export const app = new Koa();
const router = new Router({ prefix: "/v1" });

// Middlewares
app.use(cors());
app.use(json());
app.use(
  koaBody({
    multipart: true,
    parsedMethods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
  }),
);
app.context.onerror = errorHandler();
app.context.api = true;

app.use(koa404Handler);
app.use(itemTypesRoutes(router).routes());
app.use(itemsRoutes(router).routes());
app.use(storageRoutes(router).routes());

app.use(router.allowedMethods());

app.listen(port, () => {
  console.log(
    `Koa started on ${port} on ${moment().format("MMMM Do YYYY, h:mm:ss a")}`,
  );
});

