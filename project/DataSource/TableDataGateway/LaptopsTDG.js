const environment = process.env.NODE_ENV || 'development';
const rootPath = require('app-root-dir').get();
const configuration = require(rootPath + '/knexfile')[environment];
const connection = require('knex')(configuration);
const Laptop = require(rootPath + '/models/Laptop.js');
/**
 * Table Data Gateway for the Laptop table
 * @author Eaterina Ruhlin
 * REVIEW: PLEASE VERIFY THAT THE METHOD DESCRIPTIONS ARE CORRECT
 */
class LaptopsTDG {
    /**
     * Inserts a laptop object into the Laptop table
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {Object} laptop the product specifications of a laptop
     * @return {Promise<number[]>} promise which resolves to the list containing
     * the id of the new laptop record in the database
     */
    add(compId, laptop) {
        return connection.insert({
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

    getAll() {
        let result = [];
        return connection('Laptop').select('*')
                                    .leftJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id')
                                    .leftJoin('ProductDescription', 'Laptop.model_number','ProductDescription.model_number')
                                    .then((laptops) => {
                                        laptops.forEach(function(laptop){
                                            result.push(new Laptop( 
                                                laptop.comp_id,
                                                laptop.processor_type, 
                                                laptop.ram_size, 
                                                laptop.number_cpu_cores, 
                                                laptop.harddrive_size,
                                                laptop.display_size,
                                                laptop.battery_info,
                                                laptop.os,
                                                laptop.touch_screen,
                                                laptop.camera,
                                                laptop.price, 
                                                laptop.weight, 
                                                laptop.brand_name, 
                                                laptop.model_number));
                                        });
                                        return result;
                                    });
    }
    getByModelNumber(modelNumber){
        let result = [];
        return connection('Laptop').select('*')
                                    .where({model_number: modelNumber})
                                    .leftJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id')
                                    .leftJoin('ProductDescription', 'Laptop.model_number','ProductDescription.model_number')
                                    .then((laptops) => {
                                        laptops.forEach(function(laptop){
                                            result.push(new Laptop( 
                                                laptop.comp_id,
                                                laptop.processor_type, 
                                                laptop.ram_size, 
                                                laptop.number_cpu_cores, 
                                                laptop.harddrive_size,
                                                laptop.display_size,
                                                laptop.battery_info,
                                                laptop.os,
                                                laptop.touch_screen,
                                                laptop.camera,
                                                laptop.price, 
                                                laptop.weight, 
                                                laptop.brand_name, 
                                                laptop.model_number));
                                        });
                                        return result;
                                    });
    }

    /**
     * Updates the specifications of a laptop in the database
     * @param {number} compId the id of the Computer portion specification in
     * the Computer table
     * @param {Object} laptop the product specifications of a laptop
     * @return {Promise<number>} promise which resolves to the number of
     * rows affected
     */
    update(compId, laptop) {
      // REVIEW: This was marked todo, is this still the case? - Artem
        return connection.update({
          'comp_id': laptop.comp_id,
          'model_number': laptop.model_number,
          'display_size': laptop.display_size,
          'battery_info': laptop.battery_info,
          'os': laptop.os,
          'camera': laptop.camera,
          'touch_screen': laptop.touch_screen,
        }).from('Laptop').where({id: laptop.id});
    }
}
module.exports = LaptopsTDG;
