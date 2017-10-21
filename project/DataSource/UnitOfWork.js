const Promise = require('bluebird');

class UnitOfWork {
  constructor() {
    this.environment = process.env.NODE_ENV || 'development';
    this.rootPath = require('app-root-dir').get();
    this.configuration = require(this.rootPath + '/knexfile')[this.environment];
    this.connection = require('knex')(this.configuration);
  }

  addProductDescription(electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'brand_name': electronic.brand_name,
        'weight': electronic.weight,
        'price': electronic.price,
        'type': electronic.type,
      }, 'model_number')
    .into('ProductDescription');
  }

  commitAll(object) {
      let electronics = [{
       model_number: '56',
       serial_numbers: ['10', '20', '21', '22'],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'Desktop',
       processor_type: 'r',
       ram_size: 1,
       number_cpu_cores: 2,
       harddrive_size: 3,
       dimensions: {depth: 1,
          height: 1,
          width: 1},
      }, {
       model_number: '57',
       serial_numbers: [],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'Desktop',
       processor_type: 'q',
       ram_size: 1,
       number_cpu_cores: 2,
       harddrive_size: 3,
       dimensions: {depth: 1,
          height: 1,
          width: 1},
      }, {
       model_number: '58',
       serial_numbers: ['12', '30', '31', '33', '34', '35'],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'Laptop',
       processor_type: 'n',
       ram_size: 1,
       number_cpu_cores: 2,
       harddrive_size: 3,
       display_size: 1,
       battery_info: 'info about battery',
       os: 'os info',
       camera: true,
       touch_screen: false,
     }, {
       model_number: '59',
       serial_numbers: ['13'],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'Tablet',
       processor_type: 'n',
       ram_size: 1,
       number_cpu_cores: 2,
       harddrive_size: 3,
       dimensions: {depth: 1,
          height: 1,
          width: 1},
       display_size: 1,
       battery_info: 'info about battery',
       os: 'os info',
       camera_info: 'camera info',
     }, {
       model_number: '60',
       serial_numbers: ['14'],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'Monitor',
       display_size: 1,
     }, {
       model_number: '61',
       serial_numbers: ['15', '16'],
       brand_name: 'b',
       price: 1,
       weight: 1,
       type: 'TV',
       dimensions: {depth: 1,
          height: 1,
          width: 1},
       category_name: 'HD',
     }];
      return this.connection.transaction((trx) => {
          Promise.each(electronics, (electronic) => {
            return this.addProductDescription(electronic)
              .then((model_number) => {
                // getting all the serial numbers from an electronic
                let serials = electronic.serial_numbers;
                serials.map(serial => { // adding each serial to the database
                this.addInventoryItem(serial, electronic.model_number)
                  .then(() => {
                    console.log("Success adding serial#: ", serial);
                  })
                  .catch((err) => {
                    console.log("Something bad happened! Here are all the details about it");
                    console.log(err);
                  });
                });
                switch (electronic.type) {
                  case 'Desktop': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addComputer(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.addDesktop(compId, dimensionsId, electronic)
                        .transacting(trx);
                      });
                    });
                  };break;
                  case 'Laptop': {
                    return this.addComputer(electronic)
                    .transacting(trx)
                    .then((compId) => {
                      return this.addLaptop(compId, electronic)
                      .transacting(trx);
                    });
                  };break;
                  case 'Tablet': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addComputer(electronic)
                      .transacting(trx)
                      .then((compId) => {
                        return this.addTablet(compId, dimensionsId, electronic)
                        .transacting(trx);
                      });
                    });
                  };break;
                  case 'TV': {
                    return this.addDimensions(electronic)
                    .transacting(trx)
                    .then((dimensionsId) => {
                      return this.addTV(dimensionsId, electronic)
                      .transacting(trx);
                    });
                  };break;
                  case 'Monitor': {
                    return this.addMonitor(electronic)
                    .transacting(trx);
                  };break;
                }
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
     });
  }

  addInventoryItem(serial_number, model_number) {
    return this.connection.insert({
        'model_number': model_number,
        'serial_number': serial_number,
      }, 'id')
    .into('Inventory');
  }

  getAllInventoryItems() {
    return new Promise((resolve, reject) => {
      let desktops =  this.getAllDesktops();
      let laptops = this.getAllLaptops();
      let tablets = this.getAllTablets();
      let monitors = this.getAllMonitors();
      let tvs = this.getAllTVs();

      Promise.all([laptops, desktops, tablets, monitors, tvs])
      .then((results => {
        let products = [].concat(...results);

        //retrieve the model numbers present in the products
        let model_numbers = this.getAllModelNumbers(products);

        // getting the serial numbers associated with the model numbers
        this.connection('Inventory')
        .select('*')
        .havingIn('model_number', model_numbers)
        .then(serials => {
            products = products.map(product => {
              let serial_numbers = serials.filter(serial => {
                return serial.model_number === product.model_number;
              })
              .map(serial => {
                return serial.serial_number;
              })

              product.serial_numbers = serial_numbers
              return product;
            })

            resolve(products)
          }
        )
      }))
      .catch(err => reject(err))
    })
  }

  getAllModelNumbers(products){
    return products.map(obj => {return obj.model_number})
  }

  getAllProductsDescription() {
    return this.connection('ProductDescription').select('*');
  }

  getAllDesktops(){
    return this.connection('ProductDescription')
    .innerJoin('Desktop', 'Desktop.model_number', 'ProductDescription.model_number')
    .innerJoin('Computer', 'Desktop.comp_id', 'Computer.comp_id')
    .innerJoin('Dimensions', 'Desktop.dimension_id', 'Dimensions.dimension_id')
    .select('ProductDescription.model_number','brand_name','price', 'type',
    'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores',
    'harddrive_size', 'depth', 'height', 'width');
  }

  getAllLaptops(){
    return this.connection('ProductDescription')
    .innerJoin('Laptop', 'Laptop.model_number', 'ProductDescription.model_number')
    .innerJoin('Computer', 'Laptop.comp_id', 'Computer.comp_id')
    .select('ProductDescription.model_number','brand_name','price', 'type',
    'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores',
    'harddrive_size', 'os', 'touch_screen', 'camera', 'display_size', 'battery_info');
  }

  getAllTablets(){
    return this.connection('ProductDescription')
    .innerJoin('Tablet', 'Tablet.model_number', 'ProductDescription.model_number')
    .innerJoin('Computer', 'Tablet.comp_id', 'Computer.comp_id')
    .innerJoin('Dimensions', 'Tablet.dimension_id', 'Dimensions.dimension_id')
    .select('ProductDescription.model_number','brand_name','price', 'type',
    'weight', 'is_available', 'processor_type', 'ram_size', 'number_cpu_cores',
    'harddrive_size', 'display_size', 'battery_info', 'camera_info', 'os', 'depth',
    'height', 'width');
  }

  getAllMonitors(){
    return this.connection('ProductDescription')
    .innerJoin('Monitor', 'Monitor.model_number', 'ProductDescription.model_number')
    .select('ProductDescription.model_number', 'brand_name', 'price', 'type',
    'weight', 'is_available', 'display_size');
  }

  getAllTVs(){
    return this.connection('ProductDescription')
    .innerJoin('TV', 'TV.model_number', 'ProductDescription.model_number')
    .innerJoin('Dimensions', 'TV.dimension_id', 'Dimensions.dimension_id')
    .select('ProductDescription.model_number', 'brand_name', 'price', 'type',
    'weight', 'is_available', 'category_name', 'height', 'width', 'depth');
  }

  addDimensions(electronic) {
    return this.connection.insert(electronic.dimensions, 'dimension_id')
    .into('Dimensions');
  }

  addComputer(electronic) {
    return this.connection.insert({
        'processor_type': electronic.processor_type,
        'ram_size': electronic.ram_size,
        'number_cpu_cores': electronic.number_cpu_cores,
        'harddrive_size': electronic.harddrive_size,
    }, 'comp_id')
    .into('Computer');
  }

  addDesktop(compId, dimensionsId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
    }, 'id')
    .into('Desktop');
  }

  addLaptop(compId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'display_size': electronic.display_size,
        'battery_info': electronic.battery_info,
        'os': electronic.os,
        'camera': electronic.camera,
        'touch_screen': electronic.touch_screen,
    }, 'id')
    .into('Laptop');
  }

  addTablet(compId, dimensionsId, electronic) {
    return this.connection.insert({
        'comp_id': compId,
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
        'display_size': electronic.display_size,
        'battery_info': electronic.battery_info,
        'os': electronic.os,
        'camera_info': electronic.camera_info,
    }, 'id')
    .into('Tablet');
  }

  addMonitor(electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'display_size': electronic.display_size,
    }, 'id')
    .into('Monitor');
  }

  addTV(dimensionsId, electronic) {
    return this.connection.insert({
        'model_number': electronic.model_number,
        'dimension_id': dimensionsId,
        'category_name': electronic.category_name,
    }, 'id')
    .into('TV');
  }
}

module.exports = UnitOfWork;
