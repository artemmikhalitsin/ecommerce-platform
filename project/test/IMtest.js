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
const ProductDescription = require(rootPath + '/models/ProductDescription.js');

describe('Inventory Item Unit Testing', function() {
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
        const modNumList = 'ppa';
        (iiim.get(modNumList)).every((item) => expect(item).to.have
        .property('serialNumber', 'ppa'));
    });

    it('be able to delete specific items by their model number', function() {
        const modNumList = 'app';
        iiim.delete(modNumList);
        (iiim.getAll()).every((item) => expect(item).to.not.have
        .property('serialNumber', 'app'));
    });
});

describe('Prouct Description Unit Testing', function() {
    ()=>timeout(5000);
    let piim = new ProdIdentityMap();
    const pd1 = new ProductDescription('1$', '2g', 'app', '0H', 'a');
    const pd2 = new ProductDescription('1$', '2g', 'paa', '0H', 'a');
    const pd3 = new ProductDescription('1$', '2g', 'app', '0H', 'a');
    const pd4 = new ProductDescription('1$', '2g', 'app', '0H', 'a');
    const list = [pd1, pd2, pd3, pd4];
    beforeEach(function() {
    });

    after(function() {
    });

    it('add new product descriptions to identity map and'
    +'be able to retrieve them', function() {
        piim.add(list);
        expect(piim.getAll()).to.have.deep.members(list);
    });

    it('be able to retrieve a specific description by'
    +'its model number', function() {
        const modNumList = 'app';
        (piim.get(modNumList)).every((desc) => expect(desc).to.have
        .property('serialNumber', 'app'));
    });

    it('be able to update a description'
    +'by their model number', function() {
        const oldDescs = piim.getAll();
        const modNumToChange = ['app'];
        // every updatedItem is assumed to have a unique model number
        let updatedItems = [];
        for (let i=0; i<modNumToChange.length; i++) {
            updatedItems.push(new ProductDescription('4$', '5g',
                modNumToChange[i], '0H', 'a'));
        }
        piim.update(updatedItems);
        const upDescs = (piim.getAll()).filter((d) => {
            return modNumToChange.includes(d.modelNumber);
        });
        expect(upDescs).to.not.include(upDescs);
        expect(piim.getAll()).to.have.property('length', oldDescs.length);
    });

    it('be able to delete specific descriptions'
    +'by their model number', function() {
        const modNumList = 'app';
        piim.delete(modNumList);
        (piim.getAll()).every((desc) => expect(desc).to.not.have
        .property('serialNumber', 'app'));
    });
});
