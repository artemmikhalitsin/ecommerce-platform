class MonitorsTDG{
    constructor(){
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(monitor){
        return this.connection.insert({
            'model_number': monitor.model_number,
            'display_size': monitor.display_size,
        }, 'id')
        .into('Monitor');
    }
    select(){
        //TODO
    }
    update(monitor){
        //TODO
        return this.connection.update({
          'model_number': monitor.model_number,
          'display_size': monitor.display_size,
        }).from('Monitor').where('id',id);
    }
}
module.exports = MonitorsTDG;
