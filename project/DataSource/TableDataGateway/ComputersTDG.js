class ComputersTDG {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(computer) {
        return this.connection.insert({
            'processor_type': computer.processor_type,
            'ram_size': computer.ram_size,
            'number_cpu_cores': computer.number_cpu_cores,
            'harddrive_size': computer.harddrive_size,
        }, 'comp_id')
        .into('Computer');
    }

    select(){
        //TODO
    }
    update(computer){
        //TODO
        return this.connection.update({
          'processor_type': computer.processor_type,
          'ram_size': computer.ram_size,
          'number_cpu_cores': computer.number_cpu_cores,
          'harddrive_size': computer.harddrive_size,
        }).from('Computer').where({comp_id:  computer.comp_id});
    }
}
module.exports = ComputersTDG;
