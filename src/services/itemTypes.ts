import config from "config";
import moment from "moment";
import {
  UnexpectedError,
  NotFoundError
} from "../types/CustomError";
import { ItemType } from "../types/itemType";
const { models } = require('../models');


export default class ItemTypesService {

  public static async create({ name, needsRefrigeration }: Partial<ItemType>):Promise<ItemType> {
    let itemType;

    try {
      itemType = await models.ItemType.createOne({
        name,
        needsRefrigeration
      });
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return itemType;
  }

  public static async update({ id, name }: Partial<ItemType>):Promise<ItemType> {
    let itemType;

    try {
      itemType = await models.ItemType.findOne({
        id
      });
    } catch (error) {
      console.debug(error);
      throw new NotFoundError(error)
    }


    try {
      await itemType.update({
        name
      });
    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return itemType;
  }

  public static async remove({ id }: Partial<ItemType>):Promise<ItemType> {
    let itemType, items;

    try {
      items = await models.Item.findAndCountAll({
        where: {
          typeId: id
        }
      })

    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    if (items?.count > 0) {
      throw new UnexpectedError("CAN'T REMOVE NON EmPTY TYPE");
    }

    try {
      items = await models.ItemType.destroy({
        where: {
          id
        }
      })

    } catch (error) {
      console.debug(error);
      throw new UnexpectedError(error)
    }

    return items;
  }

}
