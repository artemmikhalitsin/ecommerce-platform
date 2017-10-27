class DimensionsTDG{
    constructor(){
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(dimension) {
        return this.connection.insert(dimension.dimensions, 'dimension_id')
        .into('Dimensions');
    }

    select(){
        //TODO
    }
    update(dimension){
        //TODO
        return this.connection.update({
          'dimension_id': dimension_id,
        }).from('Dimensions').where('id', id);
    }
}
module.exports = DimensionsTDG;
