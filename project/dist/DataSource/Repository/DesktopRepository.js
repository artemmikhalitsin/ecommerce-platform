'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var rootPath = require('app-root-dir').get();
var UnitOfWork = require(rootPath + '/DataSource/UnitOfWork.js');

// TODO: I don't think this class is properly implemented - it has inconsistent
// variable usage and incomplete get method - Artem

/**
 * Repository for Desktops
 * @author TODO: IF YOU'RE THE AUTHOR, ATTRIBUTE THIS CLASS TO YOURSELF
 * REVIEW: PLEASE MAKE SURE THE METHOD DESCRIPTIONS ARE CORRECT - Artem
 */

var DesktopRepository = function () {
  /**
   * Constructor initializes the repo's unit of work
   */
  function DesktopRepository() {
    _classCallCheck(this, DesktopRepository);

    this.uow = new UnitOfWork();
  }

  /**
   * Retrieves all items from the Dekstop table of the database
   * @param {string} args TODO: Not sure what this argument is doing here??
   * @return {Promise} promise which resolves to the list of desktops in the
   * database
   */


  _createClass(DesktopRepository, [{
    key: 'get',
    value: function get(args) {
      return this.database('Desktop').select('*');
    }
  }]);

  return DesktopRepository;
}();

module.exports = DesktopRepository;