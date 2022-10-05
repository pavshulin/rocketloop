/* eslint-env node, mocha */
require('dotenv').config();
const config = require('config');

const should = require('should');
const sinon = require('sinon');

const { models } = require('../../models');

const StorageService = require('../../services/storages');
const TypeService = require('../../services/itemTypes');
const ItemService = require('../../services/items');

const {
  create
} = require('../../services/items');
const moment = require("moment");

const dummydata = {
  types: {
    iceCreamType: {
      "name": "ice cream",
      "needsRefrigeration": true
    },
    candyType: {
      "name": "candy",
      "needsRefrigeration": false
    }
  },
  storages: {
    refBigStorage: {
      "name": "Berlin",
      "capacity": 100,
      "doesRefrigeration": true
    },
    refSmallStorage: {
      "name": "Hamburg",
      "capacity": 2,
      "doesRefrigeration": true
    },
    noRefBigStorage: {
      "name": "Lisbon",
      "capacity": 100,
      "doesRefrigeration": false
    },
    noRefSmallStorage: {
      "name": "Porto",
      "capacity": 2,
      "doesRefrigeration": false
    }
  }
}

describe('create item test', () => {
  before('cleanup and create types and facilities', async () => {
    // destroy all data
    await models.Item.destroy({
      where: {

      }
    });
    await models.ItemType.destroy({
      where: {

      }
    });
    await models.Storage.destroy({
      where: {

      }
    });
    // recreate storages
    for (let storageName in dummydata.storages) {
      //create again
      await StorageService.create(dummydata.storages[storageName])
    }

    // recreate types
    for (let typeName in dummydata.types) {
      //create again
      await TypeService.create(dummydata.types[typeName])
    }
  });

  describe('successful test', () => {
    const typesMap = [];
    const storagesMap = [];

    before('get maps', async () => {

      const types = await models.ItemType.findAll();
      const storages = await models.Storage.findAll();

      types.map((type) => {
        typesMap[type.name] = type.id
      })

      storages.map((storage) => {
        storagesMap[storage.name] = storage.id
      })

      console.log(storagesMap, typesMap)

    })


    it('items creation success', async () => {

      const item = await ItemService.create({
        expiresAt: moment('2024-12-12'),
        storageName: dummydata.storages.refBigStorage.name,
        typeName: dummydata.types.iceCreamType.name
      })

      item.should.have.property('expiresAt');
      item.should.have.property('id');
    });

    it('items creation fail wrong type', async () => {
      let item

      try {
        item = await ItemService.create({
          expiresAt: moment('2024-12-12'),
          storageName: dummydata.storages.noRefBigStorage.name,
          typeName: dummydata.types.iceCreamType.name
        })
      } catch (error) {
        error.should.have.property('message')
        error.message.should.be.equal('WRONG STORAGE TYPE FOR THIS ITEM')
      }

    });

    it('items creation fail expires date not in future', async () => {
      let item

      try {
        item = await ItemService.create({
          expiresAt: moment('2020-12-12'),
          storageName: dummydata.storages.refBigStorage.name,
          typeName: dummydata.types.iceCreamType.name
        })
      } catch (error) {
        error.should.have.property('message')
        error.message.should.be.equal(' SHOULD BE IN FUTURE')
      }

    });
  });


  after('clenaup again', async () => {
    //await deleteUser(user.email);
  });
});
