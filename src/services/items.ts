import config from "config";
import moment from "moment";
import * as StoragesService from './storages'
import {
  UnexpectedError
} from "../types/CustomError";
const { models } = require('../models');

interface createParameters {
  expiresAt: string,
  storageName: string,
  typeName: string
}

interface listByTypeParameters {
  typeId: number
}

interface getListByStorageParameters {
  storageId: number
}

export async function create({ expiresAt, storageName, typeName }: createParameters) {
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

  if (StoragesService.isFull({id: storage.get('id')})) {
    throw new UnexpectedError("STORAGE IS FULL")
  }

  if (storage.get('doesRefrigeration') !== itemType.get('needsRefrigeration')) {
    throw new UnexpectedError("WRONG STORAGE TYPE FOR THIS ITEM")
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

export async function getListByType ({ typeId }):listByTypeParameters {
  let items
  try {
    items = await models.Item.findAndCountAll({
      where: {
        typeId
      }
    })

  } catch (error) {
    console.debug(error);
    throw new UnexpectedError(error)
  }

  return items
}

export async function getListByStorage ({ storageId }):getListByStorageParameters {
  let items
  try {
    items = await models.Item.findAndCountAll({
      where: {
        storageId
      }
    })

  } catch (error) {
    console.debug(error);
    throw new UnexpectedError(error)
  }

  return items
}
