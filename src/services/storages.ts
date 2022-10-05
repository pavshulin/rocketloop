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

interface getOneByNameParams {
  name: string
}

interface isFullParameters {
  id: number
}

interface isEmptyParameters {
  id: number
}

interface removeParams {
  id: number
}

interface getItemsListParams {
  id: number
}

export async function create({ name, capacity, doesRefrigeration }: createParameters) {
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

export async function update({ id, name }: updateParameters) {
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
      where: {
        id
      }
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

export async function getOneByName({ name }: getOneByNameParams) {
  let storage;

  try {
    storage = await models.Storage.findOne({
      where: {
        name
      }
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

export async function isFull({ id }: isFullParameters) {
  const storage = await getOneById({ id });
  const items = await ItemsService.getListByStorage({ storageId: id })

  return items?.count > storage.get('capacity')
}

export async function isEmpty({ id }: isEmptyParameters) {
  const items = await ItemsService.getListByStorage({ storageId: id })

  console.log(items?.count > 0, items.count, id, 'COUNT')
  return !(items?.count > 0)
}

export async function getItemsList({ id }: getItemsListParams) {
  return ItemsService.getListByStorage({ storageId: id })
}

export async function remove({ id }: removeParams) {
  if(!await isEmpty({ id })) {
    console.log(await isEmpty({ id }),  id )
    throw new UnexpectedError("CAN'T REMOVE NON EMPTY STORAGE")
  }

  const storage = await getOneById({ id });

  if (!storage) {
    throw new UnexpectedError("CAN'T REMOVE NON EMPTY STORAGE")
  }

  await storage.destroy()
}
