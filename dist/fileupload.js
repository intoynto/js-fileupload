/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.FileUpload = void 0;

var react_1 = __importDefault(__webpack_require__(/*! react */ "react"));

function toFloat(value) {
  if (value === null || value === undefined) return 0;

  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    var val = parseFloat(value);
    val = isNaN(val) ? 0 : val;
    return val;
  }

  return 0;
}

function toFileSize(bytes) {
  var digit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (bytes === null || bytes === undefined) return '0 byte';
  var sizes = ['byte', 'Kb', 'Mb', 'Gb', 'Tb'];
  var val = toFloat(bytes);
  var dm = digit < 0 ? 0 : digit;
  var nol = Math.floor(Math.log(val) / Math.log(1024));
  if (nol === -Infinity) return '0 byte';
  var i = parseInt(nol.toString());
  return Math.round(val / Math.pow(1024, i)).toFixed(dm) + ' ' + sizes[i];
}

var getUniqueId = function getUniqueId() {
  return Math.random().toString(36).substr(2, 9);
};

var FileUpload = /*#__PURE__*/function (_react_1$default$Comp) {
  _inherits(FileUpload, _react_1$default$Comp);

  var _super = _createSuper(FileUpload);

  function FileUpload(props) {
    var _this;

    _classCallCheck(this, FileUpload);

    _this = _super.call(this, props);
    _this.ndInput = null;
    _this.iUid = "file-go-".concat(getUniqueId());
    _this._key = 0;
    _this.hDrgEnter = _this.hDrgEnter.bind(_assertThisInitialized(_this));
    _this.hDrgOver = _this.hDrgOver.bind(_assertThisInitialized(_this));
    _this.hDrop = _this.hDrop.bind(_assertThisInitialized(_this));
    _this.hDrgLeave = _this.hDrgLeave.bind(_assertThisInitialized(_this));
    _this.hCh = _this.hCh.bind(_assertThisInitialized(_this));
    _this.onClear = _this.onClear.bind(_assertThisInitialized(_this));
    _this.state = _this.gInitState(props);
    return _this;
  }

  _createClass(FileUpload, [{
    key: "gInitState",
    value: function gInitState(props) {
      var s = {
        dragType: '',
        file: null,
        blob: null
      };
      return s;
    }
  }, {
    key: "callPropsChange",
    value: function callPropsChange(files) {
      typeof this.props.onChange === 'function' ? this.props.onChange(files) : null;
    }
  }, {
    key: "hCh",
    value: function hCh(e) {
      var _this2 = this;

      e.preventDefault();
      var files = e.currentTarget.files ? e.currentTarget.files : [];
      var file = files[0];
      var type = (file ? file.type : '').toString().toLowerCase().trim();
      var hasImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/svg+xml', ' 	image/tiff', 'image/webp'].indexOf(type) >= 0;

      if (hasImage) {
        var reader = new FileReader();

        reader.onload = function (re) {
          _this2.setState({
            file: file,
            blob: re.currentTarget.result
          }, function () {
            _this2.callPropsChange(files);
          });
        };

        reader.onerror = function () {
          _this2.setState({
            file: null,
            blob: null
          }, function () {
            _this2.callPropsChange(files);
          });
        };

        reader.readAsDataURL(file);
        return;
      }

      this.setState({
        file: file,
        blob: null
      }, function () {
        _this2.callPropsChange(files);
      });
    }
  }, {
    key: "hDrgEnter",
    value: function hDrgEnter(e) {
      this.setState({
        dragType: e.type
      });
    }
  }, {
    key: "hDrgOver",
    value: function hDrgOver(e) {
      e.preventDefault();
      this.setState({
        dragType: e.type
      });
    }
  }, {
    key: "hDrop",
    value: function hDrop(e) {
      var _this3 = this;

      e.preventDefault();
      var files = e.dataTransfer ? e.dataTransfer.files : [];
      var file = files[0];
      var type = (file ? file.type : '').toString().toLowerCase().trim();
      var hasImage = ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp', 'image/svg+xml', ' 	image/tiff', 'image/webp'].indexOf(type) >= 0;
      this._key++;

      var proper = function proper() {
        var input = _this3.ndInput;
        if (!input) return;
        var b = new ClipboardEvent("").clipboardData || new DataTransfer();
        b.items.add(file);
        input.files = b.files;
      };

      if (hasImage) {
        var reader = new FileReader();

        reader.onload = function (re) {
          _this3.setState({
            dragType: '',
            file: file,
            blob: re.currentTarget.result
          }, function () {
            proper();

            _this3.callPropsChange(files);
          });
        };

        reader.onerror = function () {
          _this3.setState({
            dragType: '',
            file: null,
            blob: null
          }, function () {
            _this3.callPropsChange(files);
          });
        };

        reader.readAsDataURL(file);
        return;
      }

      this.setState({
        dragType: '',
        file: file,
        blob: null
      }, function () {
        proper();

        _this3.callPropsChange(files);
      });
    }
  }, {
    key: "hDrgLeave",
    value: function hDrgLeave(e) {
      this.setState({
        dragType: ''
      });
    }
  }, {
    key: "onClear",
    value: function onClear(e) {
      var _this4 = this;

      if (e) e.preventDefault();
      this._key++;
      this.setState({
        file: null,
        blob: null
      }, function () {
        _this4.callPropsChange([]);
      });
    }
  }, {
    key: "rdrFileInfo",
    value: function rdrFileInfo() {
      var _this$state = this.state,
          dragType = _this$state.dragType,
          file = _this$state.file,
          blob = _this$state.blob;
      return react_1["default"].createElement("div", {
        className: "fU--file"
      }, react_1["default"].createElement("div", null, react_1["default"].createElement("div", {
        className: "fU--flex"
      }, react_1["default"].createElement("div", {
        className: "fU--flexAuto"
      }, react_1["default"].createElement("div", {
        className: 'fU--fileInfo'
      }, react_1["default"].createElement("div", {
        className: "fU--fileInfoMain"
      }, react_1["default"].createElement("div", {
        className: "fU--aria"
      }, "\xA0"), react_1["default"].createElement("div", {
        className: "fU--text"
      }, file.name)), react_1["default"].createElement("div", null, "Size ", toFileSize(file.size)))), react_1["default"].createElement("div", null, react_1["default"].createElement("a", {
        className: 'fU--removeTrigger',
        onClick: this.onClear
      }, react_1["default"].createElement("svg", {
        width: "26",
        height: "26",
        viewBox: "0 0 26 26",
        xmlns: "http://www.w3.org/2000/svg"
      }, react_1["default"].createElement("path", {
        d: "M11.586 13l-2.293 2.293a1 1 0 0 0 1.414 1.414L13 14.414l2.293 2.293a1 1 0 0 0 1.414-1.414L14.414 13l2.293-2.293a1 1 0 0 0-1.414-1.414L13 11.586l-2.293-2.293a1 1 0 0 0-1.414 1.414L11.586 13z",
        fill: "currentColor",
        "fill-rule": "nonzero"
      })))))));
    }
  }, {
    key: "render",
    value: function render() {
      var _this5 = this;

      var props = this.props;
      var _this$state2 = this.state,
          dragType = _this$state2.dragType,
          file = _this$state2.file,
          blob = _this$state2.blob;
      var hasDrag = dragType !== '';
      var hasFile = file !== null && file !== undefined;
      var cntStyle = {
        position: 'relative'
      };
      var inpStyle = {
        position: 'absolute',
        margin: 0,
        padding: 0,
        left: '1em',
        top: '1.75em',
        width: 'calc(100% - 2em)',
        fontSize: '0',
        opacity: 0
      };
      var lbCtnStyle = {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '46px'
      };
      var inpProps = {};
      var imgProps = {
        src: blob
      };
      return react_1["default"].createElement("div", {
        className: "fU ".concat(hasDrag ? 'fU--drag' : ''),
        style: cntStyle,
        onDragEnter: this.hDrgEnter,
        onDragOver: this.hDrgOver,
        onDragLeave: this.hDrgLeave,
        onDrop: this.hDrop
      }, react_1["default"].createElement("div", {
        style: {
          padding: '0.5rem'
        }
      }, react_1["default"].createElement("input", Object.assign({
        ref: function ref(fn) {
          return _this5.ndInput = fn;
        },
        key: this._key,
        type: "file",
        name: "".concat(props.name ? props.name : 'file'),
        style: inpStyle,
        id: this.iUid,
        onChange: this.hCh
      }, inpProps)), react_1["default"].createElement("div", {
        style: lbCtnStyle
      }, react_1["default"].createElement("label", {
        id: this.iUid,
        htmlFor: this.iUid
      }, props.renderLabel && props.renderLabel({
        hasDrag: hasDrag,
        hasFile: hasFile
      }), !props.renderLabel && react_1["default"].createElement("span", null, hasDrag && react_1["default"].createElement("span", null, "Lepaskan file disini"), !hasDrag && react_1["default"].createElement("span", null, "Drag & Drop file atau ", react_1["default"].createElement("a", null, "Browse"))))), file && react_1["default"].createElement("div", {
        className: 'fU--handle'
      }, blob && react_1["default"].createElement("div", {
        className: "fU--imagePreview"
      }, this.rdrFileInfo(), react_1["default"].createElement("div", {
        className: "fU--posterWrapper"
      }, react_1["default"].createElement("div", {
        className: "fU--filePoster"
      }, react_1["default"].createElement("img", Object.assign({}, imgProps))))), !blob && react_1["default"].createElement("div", {
        className: "fU--blob"
      }, this.rdrFileInfo()))));
    }
  }]);

  return FileUpload;
}(react_1["default"].Component);

exports.FileUpload = FileUpload;

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = react;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=fileupload.js.map