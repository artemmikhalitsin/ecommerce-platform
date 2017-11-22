let chai = require('chai');
let UnitOfWork = require('./DataSource/UnitOfWork.js');

let assert = chai.assert;

describe('Unit of work', function() {
  describe('#deletedItems()', function() {
  it('delete items', function() {
    let newElements = [];
    assert.equal(UnitOfWork.registerNew(object).length, 0);
  });
  });
  it('deletes items', function() {
    let deletedInventoryItems = ['item1', 'item2'];
    assert.equal(UnitOfWork.deletedItems('item1'), deletedInventoryItems);
  });
  it('deletes purchases', function() {
    let newPurchases = [];
    assert.equal(newPurchases.length, 0);
  });
  it('updates items', function() {
    let newPurchases = [];
    assert.equal(newPurchases.length, 0);
  });
});
