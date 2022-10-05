import config from "config";
import moment from "moment";
import {
  NotAuthorizedError, NotFoundError,
  UnexpectedError,
  ValidationError
} from "../types/CustomError";
import { ItemType } from "../types/itemType";
const { models } = require('../models');

interface createParameters {
  name: string,
  capacity: number,
  doesRefrigeration: boolean
}

interface updateParameters {
  id: number,
  name: string
}

export default class StorageService {
  public static async create({ name, capacity, doesRefrigeration }: createParameters):Promise {
    let storage;

    try {
      storage = await models.Storage.createOne({
        name,
        capacity,
        doesRefrigeration
      });
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return storage;
  }

  public static async update({ id, name }: updateParameters):Promise {
    let storage;

    try {
      storage = await models.Storage.findOne({
        id
      });
    } catch (error) {
      console.debug(error);
      throw new NotFoundError(error)
    }


    try {
      await storage.update({
        name
      });
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return storage;
  }

}
