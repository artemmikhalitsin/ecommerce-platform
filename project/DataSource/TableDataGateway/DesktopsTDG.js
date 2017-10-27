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

    update(desktop){
        return this.connection.update({
        'model_number': desktop.model_number,
        'dimension_id': dimensionsId,
      }).from('Desktop').where('id', id);

        //TODO
    }
}
module.exports = DesktopsTDG;
