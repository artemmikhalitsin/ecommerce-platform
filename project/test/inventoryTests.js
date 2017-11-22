let expect = require('chai').expect;
let rootPath = require('app-root-dir').get();
let inventoryRepo = require(rootPath +
  '/DataSource/Repository/InventoryItemRepository.js');

describe('inventoryRepo', function() {
  describe('#getAllInventoryItems()', function() {
    it('should return a bunch of items', function(done) {
      inventoryRepo.getAllInventoryItems().then(function(invItems) {
        expect(invItems).to.have.lengthOf(6);
        done();
      }).catch(function(err) {
        throw new Error('Wrong length');
        done();
      });
    });
  });
});
