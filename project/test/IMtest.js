'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
// const sinon = require('sinon');

const rootPath = require('app-root-dir').get();
const InvIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'InventoryItemsIdentityMap.js');
const ProdIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'ProductDescriptionsIdentityMap.js');
const UsersIdentityMap = require(rootPath + '/DataSource/IdentityMap/'
    +'UsersIdentityMap.js');
const InventoryItem = require(rootPath + '/models/InventoryItem.js');
const ProductDescription = require(rootPath + '/models/ProductDescription.js');
const User = require(rootPath + '/models/User.js');

describe('Inventory Item Unit Testing', function() {
    ()=>timeout(5000);
    let iiim = new InvIdentityMap();
    const im1 = new InventoryItem(0, 'app', '0H', null);
    const im2 = new InventoryItem(1, 'app', '5H', null);
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
    const pd1 = new ProductDescription('1$', '2g', 'app', '1H', true, 'a');
    const pd2 = new ProductDescription('1$', '2g', 'paa', '2H', true, 'a');
    const pd3 = new ProductDescription('1$', '2g', 'app', '0H', true, 'a');
    const pd4 = new ProductDescription('1$', '2g', 'app', '3H', true, 'a');
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
        const modNumList = '0H';
        piim.delete(modNumList);
        (piim.getAll()).every((desc) => expect(desc).to.not.have
        .property('serialNumber', modNumList));
    });
});

describe('Users Identity Map Unit Testing', function() {
    let uiim = new UsersIdentityMap();
    const u1 = new User('a@a.a', 'Billy', '123 ms', 'Bob', false);
    const u2 = new User('b@b.a', 'Elfie', '123 ms', 'Aoa', false);
    const u3 = new User('c@c.a', 'Vinny', '123 ms', 'Aba', false);
    const u4 = new User('a@a.a', 'Raspy', '123 ms', 'Bab', false);
    const list = [u1, u2, u3, u4];
    beforeEach(function() {
    });

    after(function() {
    });

    it('add new users to identity map and'
    +' be able to retrieve them', function() {
        uiim.add(list);
        expect(uiim.getAll()).to.have.deep.members(list);
    });

    it('be able to retrieve specific users by their email', function() {
        const dupEmail = 'a@a.a';
        console.log(uiim.getByEmail(dupEmail));
        (uiim.getByEmail(dupEmail)).every((user) => expect(user).to.have
        .property('email', dupEmail));
    });

    it('be able to retrieve a specific user by a combination of'
    +' email and password', function() {
        const emailCorr = 'b@b.a';
        const passCorr = 'Aoa';
        console.log(uiim.getByEmail(emailCorr));
        console.log(uiim.getByEmailAndPassword(emailCorr, passCorr));
        expect(uiim.getByEmailAndPassword(emailCorr, passCorr).email()).to
        .equal(emailCorr);
        expect(uiim.getByEmailAndPassword(emailCorr, passCorr)).to.have
        .property('password', passCorr);
    });

    it('be able to delete a user from identity map'
    +'by their email', function() {
        const dupEmail = 'a@a.a';
        uiim.delete(dupEmail);
        (uiim.getAll()).every((user) => expect(user).to.not.have
        .property('email', dupEmail));
    });
});
