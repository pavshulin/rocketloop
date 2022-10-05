import config from "config";
import { Context } from "koa"
import * as ItemTypesService from "../services/itemTypes";
import { koaError } from "../middleware/erorHandler";

const { RESPONSE_STATUSES } = config.get("CONSTANTS");

async function create(ctx: Context) {
  const { name, needsRefrigeration } = ctx.request.body;
  let itemType;

  try {
    itemType = await ItemTypesService.create({ name, needsRefrigeration })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 200;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: itemType.toJSON(),
  };
}

async function update(ctx: Context) {
  const { name } = ctx.request.body;
  const { id } = ctx.params;
  let itemType;

  try {
    itemType = await ItemTypesService.update({ id, name })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 200;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: itemType.toJSON(),
  };
}

async function remove(ctx: Context) {
  const { id } = ctx.params;
  let itemType;

  try {
    itemType = await ItemTypesService.remove({ id })
  } catch (error) {
    console.error(error);
    return koaError(ctx, error)
  }

  ctx.status = 204;
  ctx.body = {
    status: RESPONSE_STATUSES.SUCCESS,
    data: {}
  };
}

export {
  create,
  update,
  remove
};
