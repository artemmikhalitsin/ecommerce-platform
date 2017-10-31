class DimensionsTDG {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(dimension) {
        return this.connection.insert({
          'depth': dimension.depth,
          'height': dimension.height,
          'width': dimension.width
        },'id')
        .into('Dimensions');
    }

    select(){
        //TODO
    }
    update(dimension){
        //TODO
        return this.connection.update({
          'depth': dimension.depth,
          'height': dimension.height,
          'width': dimension.width
        }).from('Dimensions').where({'dimensionId': dimension.dimensionId});
    }
}
module.exports = DimensionsTDG;
