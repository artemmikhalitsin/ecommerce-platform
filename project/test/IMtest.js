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

describe('Inventory Item Identity Map Unit Testing', function() {
    ()=>timeout(5000);
    let iiim = new InvIdentityMap();
    const im1 = new InventoryItem(0, 'app', '0H', null);
    const im2 = new InventoryItem(1, 'app', '5H', null);
    const im3 = new InventoryItem(2, 'app', '1C', null);
    const im4 = new InventoryItem(3, 'ppa', '5Q', null);
    beforeEach(function() {
    });

    after(function() {
    });

    it('add new inventory items to identity map and'
    +' be able to retrieve them', function() {
        iiim.add(im4);
        iiim.add(im1);
        iiim.add(im3);
        iiim.add(im2);
        expect(iiim.getAll()).to.include(im4);
        expect(iiim.getAll()).to.include(im2);
        expect(iiim.getAll()).to.include(im1);
        expect(iiim.getAll()).to.include(im3);
    });

    it('be able to retrieve specific items by their serial'
    + 'or model number', function() {
        const serial = 'ppa';
        const model = '5H';
        expect(iiim.get(serial)).to.have.property('serialNumber', serial);
        (iiim.getByModelNumber(model).every((item) => expect(item)
            .to.have.property('modelNumber', model)));
            });

    it('be able to delete specific items by their model number', function() {
        const serial = '0H';
        iiim.delete(serial);
        (iiim.getAll()).every((item) => expect(item).to
            .not.have.property('serialNumber', serial));
    });
});

describe('Product Description Identity Map Unit Testing', function() {
    ()=>timeout(5000);
    let piim = new ProdIdentityMap();
    const pd1 = new ProductDescription('1$', '2g', 'app', '1H', true, 'a');
    const pd2 = new ProductDescription('1$', '2g', 'paa', '2H', true, 'a');
    const pd3 = new ProductDescription('1$', '2g', 'app', '0H', true, 'a');
    const pd4 = new ProductDescription('1$', '2g', 'app', '3H', true, 'a');
    beforeEach(function() {
    });

    after(function() {
    });

    it('add new product descriptions to identity map and'
    +' be able to retrieve them', function() {
        piim.add(pd1);
        piim.add(pd2);
        piim.add(pd3);
        piim.add(pd4);
        expect(piim.getAll()).to.include(pd1);
        expect(piim.getAll()).to.include(pd2);
        expect(piim.getAll()).to.include(pd3);
        expect(piim.getAll()).to.include(pd4);
    });

    it('be able to retrieve specific descriptions by'
    +' their model number', function() {
        const modNumList = '0H';
        expect(piim.get(modNumList)).to.have.property('modelNumber',
        modNumList);
    });

    // it('be able to update a description'
    // +' by their model number', function() {
    //     const oldDescs = piim.getAll();
    //     const modNumToChange = ['app'];
    //     // every updatedItem is assumed to have a unique model number
    //     let updatedItems = [];
    //     for (let i=0; i<modNumToChange.length; i++) {
    //         updatedItems.push(new ProductDescription('4$', '5g',
    //             modNumToChange[i], '0H', 'a'));
    //     }
    //     piim.update(updatedItems);
    //     const upDescs = (piim.getAll()).filter((d) => {
    //         return modNumToChange.includes(d.modelNumber);
    //     });
    //     expect(upDescs).to.not.include(upDescs);
    //     expect(piim.getAll()).to.have.property('length', oldDescs.length);
    // });

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
        (uiim.getByEmail(dupEmail)).every((user) => expect(user).to.have
        .property('email', dupEmail));
    });

    it('be able to delete a user from identity map'
    +'by their email', function() {
        const dupEmail = 'a@a.a';
        uiim.delete(dupEmail);
        (uiim.getAll()).every((user) => expect(user).to.not.have
        .property('email', dupEmail));
    });
});
