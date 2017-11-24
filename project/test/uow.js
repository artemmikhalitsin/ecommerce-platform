const UnitOfWork = require('../DataSource/UnitOfWork.js');
const Desktop = require('../models/Desktop.js');
const Dimensions = require('../models/Dimensions.js');

let unit = new UnitOfWork();
let desktop = new Desktop('intel', 2048, 4, 700,
            new Dimensions(1, 2, 3, 4), 500, 100, 'HP', 'rub-a535', 3,
            'Desktop', true);
let desktop2 = desktop.clone();
desktop2.isAvailable = false;
unit.registerNew(desktop);
unit.registerDirty(desktop2);
unit.commit().then((val) => console.log('ok'));
