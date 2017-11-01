class InventoryItemsTDG {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(inventoryItem) {
        return this.connection.insert({
            'model_number': inventoryItem.model_number,
            'serial_number': inventoryItem.serial_number,
          }, 'id')
        .into('Inventory');
    }
    select() {
        return this.connection('Inventory').select('*');
    }
    // update is not in current requirements for inventory items
    /* update(inventoryItems){

    }*/
    delete(inventoryItem){
        //TODO
        return this.connection.from('Inventory').where({id: inventoryItem.id}).del();
    }
}
module.exports = InventoryItemsTDG;
