'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rootPath = require('app-root-dir').get();
var ProductDescription = require(rootPath + '/models/ProductDescription.js');

var Monitor = function (_ProductDescription) {
  _inherits(Monitor, _ProductDescription);

  function Monitor(displaySize, touchescreen, price, weight, brandName, modelNumber) {
    _classCallCheck(this, Monitor);

    var _this = _possibleConstructorReturn(this, (Monitor.__proto__ || Object.getPrototypeOf(Monitor)).call(this, price, weight, brandName, modelNumber));

    _this.displaySize = displaySize;
    _this.touchescreen = touchescreen;
    return _this;
  }

  _createClass(Monitor, [{
    key: 'getDisplaySize',
    value: function getDisplaySize() {
      return this.displaySize;
    }
  }, {
    key: 'getTouchescreen',
    value: function getTouchescreen() {
      return this.touchescreen;
    }
  }, {
    key: 'setDisplaySize',
    value: function setDisplaySize(displaySize) {
      this.displaySize = displaySize;
    }
  }, {
    key: 'setTouchescreen',
    value: function setTouchescreen(touchescreen) {
      this.touchescreen = touchescreen;
    }
  }]);

  return Monitor;
}(ProductDescription);

module.exports = Monitor;