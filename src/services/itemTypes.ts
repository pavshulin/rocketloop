import config from "config";
import moment from "moment";
import {
  UnexpectedError,
  NotFoundError
} from "../types/CustomError";
import { ItemType } from "../types/itemType";
import * as ItemsService from './items'
const { models } = require('../models');


export async function create({ name, needsRefrigeration }: Partial<ItemType>):Promise<ItemType> {
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

export async function update({ id, name }: Partial<ItemType>):Promise<ItemType> {
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

export async function remove({ id }: Partial<ItemType>) {
  const items = await ItemsService.getListByType({
    typeId: id
  });

  if (items?.count > 0) {
    throw new UnexpectedError("CAN'T REMOVE NON EMPTY TYPE");
  }

  try {
    await models.ItemType.destroy({
      where: {
        id
      }
    })

  } catch (error) {
    console.debug(error);
    throw new UnexpectedError(error)
  }

  return {};
}

export async function getOneByName({ name }: Partial<ItemType>) {
  let type;

  try {
    type = await models.ItemType.findOne({
      where: {
        name
      }
    });
  } catch (error) {
    console.debug(error);
    throw new NotFoundError(error)
  }

  if (!type) {
    throw new NotFoundError("NOT FOUND")
  }

  return type
}
