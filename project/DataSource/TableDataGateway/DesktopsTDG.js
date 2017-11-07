class DesktopsTDG {
    constructor() {
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(compId, dimensionsId, desktop) {
        return this.connection.insert({
            'comp_id': compId,
            'model_number': desktop.model_number,
            'dimension_id': dimensionsId,
        }, 'id')
        .into('Desktop');
    }

    select(){
        //TODO
    }

    update(compId, dimensionsId, desktop){
        return this.connection.update({
        'model_number': desktop.model_number,
        'dimension_id': desktop.dimension.dimensions_id,
      }).from('Desktop').where({id: desktop.id});

        //TODO
    }
}
module.exports = DesktopsTDG;
