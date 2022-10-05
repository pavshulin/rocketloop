import config from "config";
import { Context } from "koa"
import * as ItemsService from "../services/items";
import { koaError } from "../middleware/erorHandler";

const { RESPONSE_STATUSES } = config.get("CONSTANTS");

async function create(ctx: Context) {
  const { expiresAt, storageName, typeName } = ctx.request.body;
  let itemType;

  try {
    itemType = await ItemsService.create({ expiresAt, storageName, typeName })
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


export {
  create
};
