import { Context } from "koa";
import { CustomError } from "../types/CustomError";
import config from "config";
const { RESPONSE_STATUSES } = config.get("CONSTANTS");

export const koaError = (ctx: Context, error: CustomError) => {
  if (error.code === 500) {
    ctx.body = {
      status: RESPONSE_STATUSES.ERROR,
      message: error.message,
    };
  } else {
    ctx.body = {
      status: RESPONSE_STATUSES.FAIL,
      data: {
        message: error.message,
        code: error.code,
      },
    };
  }

  return ctx;
};
