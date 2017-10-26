let assert = require('assert');

let rootPath = require('app-root-dir').get();
let inventoryRepo = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1, 2, 3].indexOf(4));
    });
  });
});

describe('inventoryRepo', () => {
  describe('#getAllInventoryItems()', () => {
    it('should return a bunch of items', (done) => {
      inventoryRepo.getAllInventoryItems().then((invItems) => {
        assert.equal(6, invItems.length);
        done();
      });
    });
  });
});
