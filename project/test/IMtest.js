'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
const sinon = require('sinon');

const rootPath = require('app-root-dir').get();
const InvIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'InventoryItemsIdentityMap.js');
const ProdIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'ProductDescriptionsIdentityMap.js');
const UsersIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'UsersIdentityMap.js');
const InventoryItem = require(rootPath + '/models/InventoryItem.js');

describe('Inventory Unit Testing', function() {
    ()=>timeout(5000);
    let iiim = new InvIdentityMap();
    const im1 = new InventoryItem(0, 'app', '0H', null);
    const im2 = new InventoryItem(1, 'app', '0H', null);
    const im3 = new InventoryItem(2, 'app', '1C', null);
    const im4 = new InventoryItem(3, 'ppa', '5Q', null);
    const list = [im1, im2, im3, im4];
    beforeEach(function() {
    });

    after(function() {
    });

    it('add new inventory items to identity map and'
    +'be able to retrieve them', function() {
        iiim.add(list);
        expect(iiim.getAll()).to.have.deep.members(list);
    });

    it('be able to retrieve a specific item by its model number', function() {
        const modNumList = 'app';
        (iiim.get(modNumList)).every((item) => expect(item).to.have
        .property('serialNumber', 'app'));
    });

    it('be able to delete specific items by their model number', function() {
        const modNumList = 'app';
        iiim.delete(modNumList);
        (iiim.getAll()).every((item) => expect(item).to.not.have
        .property('serialNumber', 'app'));
    });
});
