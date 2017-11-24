let chai = require('chai');
let rootDir = require('app-root-dir').get();
let UnitOfWork = require(rootDir +'/DataSource/UnitOfWork.js');

let assert = chai.assert;
let expect = require('chai').expect;

/**
 * Testing Unit of Work register functions
 */

describe('Unit of work', function() {
  let object = [
  {
    'model_number': '891507686-9',
    'comp_id': 4,
    'display_size': 67,
    'battery_info': 'integer a nibh',
    'os': 'elit proin',
    'touch_screen': false,
    'camera': true,
  }];
 let emptyArray = [];
  let objects = [
  {
    'model_number': '891507686-9',
    'comp_id': 4,
    'display_size': 67,
    'battery_info': 'integer a nibh',
    'os': 'elit proin',
    'touch_screen': false,
    'camera': true,
  },
  {
    'model_number': '079057815-8',
    'brand_name': 'Acer',
    'price': 22,
    'weight': 97,
    'type': 'Laptop',
    'is_available': true,
  },
  {
    'model_number': '471262598-8',
    'brand_name': 'Razer',
    'price': 75,
    'weight': 79,
    'type': 'Laptop',
    'is_available': false,
  }];

  describe('#registerNew()', function() {
  it('should register new object', function() {
    const newUoW = new UnitOfWork();
    newUoW.registerNew(object);
    expect(newUoW.newElements).to.include(object);
  });
  it('should register nothing if nothing is passed', function() {
    const newUoW = new UnitOfWork();
    newUoW.registerNew();
    expect(newUoW.newElements).to.include();
  });
  });
  describe('#registerNewPurchase()', function() {
  it('should register new Purchase', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerNewPurchase(object);
      expect(newUoW.newPurchases).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerNewPurchase();
      expect(newUoW.newPurchases).to.include();
    });
  });
  describe('#registerReturn()', function() {
  it('should register return', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerReturn(object);
      expect(newUoW.deletedPurchases).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerReturn();
      expect(newUoW.deletedPurchases).to.include();
    });
  });
  describe('#registerDirty()', function() {
  it('should register dirty', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDirty(object);
      expect(newUoW.dirtyElements).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDirty();
      expect(newUoW.dirtyElements).to.include();
    });
  });
  describe('#registerDeleted()', function() {
  it('should register deleted item', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDeleted(object);
      expect(newUoW.deletedElements).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDeleted();
      expect(newUoW.deletedElements).to.include();
    });
  });
  describe('#registerNewItem()', function() {
  it('should register new inventory item', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerNewItem(object);
      expect(newUoW.newInventoryItems).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerNewItem();
      expect(newUoW.newInventoryItems).to.include();
    });
  });
  describe('#registerDeletedItem()', function() {
  it('should register deleted inventory item', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDeletedItem(object);
      expect(newUoW.deletedInventoryItems).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDeletedItem();
      expect(newUoW.deletedInventoryItems).to.include();
    });
  });
  describe('#registerTransaction()', function() {
  it('should register transaction items', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerTransaction(object);
      expect(newUoW.transactionItems).to.include(object);
    });
    it('should register nothing if nothing is passed', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerTransaction();
      expect(newUoW.transactionItems).to.include();
    });
  });
  describe('#commitAll()', function() {
  it('should commit items in deletedIventoryItems', function() {
      const newUoW = new UnitOfWork();
      newUoW.registerDeletedItem(object);
      newUoW.commitAll();
      assert.equal(newUoW.deletedInventoryItems[0].length, 1);
    });
  });

  describe('#getAllModelNumbers()', function() {
  it('should return all model numbers from all products', function() {
      const newUoW = new UnitOfWork();
      let test = newUoW.getAllModelNumbers(objects);
      expect(test).to.include('891507686-9');
    });
  });
  describe('#getAllModelNumbers()', function() {
  it('should return all model numbers from all products', function() {
      const newUoW = new UnitOfWork();
      let test = newUoW.getAllModelNumbers(objects);
      expect(test).to.include('891507686-9');
    });
    it('should return nothing if nothing is found', function() {
        const newUoW = new UnitOfWork();
        let test = newUoW.getAllModelNumbers(emptyArray);
        expect(test).to.be.empty;
      });
  });
  describe('#getAllProductsDescription()', function() {
  it('should return all descriptions from all products', function() {
      const newUoW = new UnitOfWork();
      let test = newUoW.getAllProductsDescription();
      expect(test).to.not.be.empty;
    });
  });
  describe('#getAllDesktops()', function() {
  it('should return all desktops from all products', function() {
      const newUoW = new UnitOfWork();
      let test = newUoW.getAllProductsDescription();
      expect(test).to.not.be.empty;
    });
});
describe('#getAllLaptops()', function() {
it('should return all Laptops from all products', function() {
    const newUoW = new UnitOfWork();
    let test = newUoW.getAllLaptops();
    expect(test).to.not.be.empty;
  });
});
describe('#getAllTablets()', function() {
it('should return all Tablets from all products', function() {
    const newUoW = new UnitOfWork();
    let test = newUoW.getAllTablets();
    expect(test).to.not.be.empty;
  });
});
describe('#getAllMonitors()', function() {
it('should return all Monitors from all products', function() {
    const newUoW = new UnitOfWork();
    let test = newUoW.getAllMonitors();
    expect(test).to.not.be.empty;
  });
});
describe('#compareWithContext()', function() {
it('should update electonics if needed', function() {
    const newUoW = new UnitOfWork();
    let test = newUoW.compareWithContext(objects, emptyArray);
    expect(test).to.have.length(3);
  });
  it('should add electonics if needed', function() {
    });
  it('should delete electonics if needed', function() {
      });
});
});
