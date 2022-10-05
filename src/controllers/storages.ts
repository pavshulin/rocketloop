import config from "config";
import { Context } from "koa"
import * as StoragesService from "../services/storages";
import { koaError } from "../middleware/erorHandler";

const { RESPONSE_STATUSES } = config.get("CONSTANTS");

async function create(ctx: Context) {
  const { name, capacity, doesRefrigeration } = ctx.request.body;
  let storage;

  try {
    storage = await StoragesService.create({ name, capacity, doesRefrigeration })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 200;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: storage.toJSON(),
  };
}

async function update(ctx: Context) {
  const { name } = ctx.request.body;
  const { id } = ctx.params;
  let storage;

  try {
    storage = await StoragesService.update({ id, name })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 200;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: storage.toJSON(),
  };
}

async function getItemsList(ctx: Context) {
  const { id } = ctx.params;
  let items;

  try {
    items = await StoragesService.getItemsList({ id })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 200;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: items,
  };
}


export {
  create,
  update
};
