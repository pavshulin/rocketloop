import config from "config";
import moment from "moment";
import {
  UnexpectedError
} from "../types/CustomError";
const { models } = require('../models');

interface createParameters {
  expiresAt: string,
  storageName: string,
  typeName: string
}

export default class ItemsService {
  public static async create({ expiresAt, storageName, typeName }: createParameters) {
    let itemType, item, storage;

    try {
      itemType = await models.ItemType.findByName(typeName)
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError("CANNOT FIND ITEM TYPE")
    }

    try {
      storage = await models.Storage.findByName(storageName)
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError("CANNOT FIND STORAGE")
    }

    if (!storage || !itemType) {
      console.log(storage, itemType)
      throw new UnexpectedError("CANNOT FIND STORAGE OR TYPE")
    }

    try {
      item = await models.Item.createOne({
        expiresAt,
        typeId: itemType.get('id'),
        storageId: storage.get('id')
      });
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return item;
  }
}
