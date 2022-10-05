import config from "config";
import moment from "moment";
import {
  NotAuthorizedError, NotFoundError,
  UnexpectedError,
  ValidationError
} from "../types/CustomError";
import { ItemType } from "../types/itemType";
import * as ItemsService from './items'
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

interface getOneByIdParams {
  id: number
}

interface isFullParameters {
  id: number
}

interface getItemsListParams {
  id: number
}

export async function create({ name, capacity, doesRefrigeration }: createParameters):Promise {
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

export async function update({ id, name }: updateParameters):Promise {
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

export async function getOneById({ id }: getOneByIdParams) {
  let storage;

  try {
    storage = await models.Storage.findOne({
      id
    });
  } catch (error) {
    console.debug(error);
    throw new NotFoundError(error)
  }

  if (!storage) {
    throw new NotFoundError("NOT FOUND")
  }

  return storage
}


export async function isFull({ id }: isFullParameters):Promise {
  const storage = getOneById({ id });
  const items = ItemsService.getListByStorage({ storageId: id })


  return !(items?.count > storage.get('capacity'))
}

export async function getItemsList({ id }: getItemsListParams):Promise {
  return ItemsService.getListByStorage({ storageId: id })
}
