class LaptopsTDG {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(compId, laptop) {
        return this.connection.insert({
            'comp_id': compId,
            'model_number': laptop.model_number,
            'display_size': laptop.display_size,
            'battery_info': laptop.battery_info,
            'os': laptop.os,
            'camera': laptop.camera,
            'touch_screen': laptop.touch_screen,
        }, 'id')
        .into('Laptop');
    }

    select(){
        //TODO
    }
    update(laptop){
        //TODO
        return this.connection.update({
          'comp_id': compId,
          'model_number': laptop.model_number,
          'display_size': laptop.display_size,
          'battery_info': laptop.battery_info,
          'os': laptop.os,
          'camera': laptop.camera,
          'touch_screen': laptop.touch_screen,
        }).from('Laptop').where('id',id);
    }
}
module.exports = LaptopsTDG;
