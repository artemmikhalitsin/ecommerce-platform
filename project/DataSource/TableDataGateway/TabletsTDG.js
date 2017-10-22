class TabletsTDG{
    constructor(){
        this.environment = process.env.NODE_ENV || 'development';
        this.rootPath = require('app-root-dir').get();
        this.configuration = require(this.rootPath + '/knexfile')[this.environment];
        this.connection = require('knex')(this.configuration);
    }
    add(compId, dimensionsId, tablet){
        return this.connection.insert({
            'comp_id': compId,
            'model_number': tablet.model_number,
            'dimension_id': dimensionsId,
            'display_size': tablet.display_size,
            'battery_info': tablet.battery_info,
            'os': tablet.os,
            'camera_info': tablet.camera_info,
        }, 'id')
        .into('Tablet');
    }
    select(){
        //TODO
    }
    update(tablet){
        //TODO
    }
}
module.exports = TabletsTDG;