module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./apy.js":
/*!****************!*\
  !*** ./apy.js ***!
  \****************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @compound-finance/compound-js */ \"@compound-finance/compound-js\");\n/* harmony import */ var _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0__);\n\nconst provider = process.env.INFURAURL;\nconst comptroller = _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.util.getAddress(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.Comptroller);\nconst opf = _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.util.getAddress(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.PriceFeed);\nconst cTokenDecimals = 8; // always 8\n\nconst blocksPerDay = 4 * 60 * 24; // 4 blocks in 1 minute\n\nconst daysPerYear = 365;\nconst ethMantissa = Math.pow(10, 18); // 1 * 10 ^ 18\n\nasync function calculateSupplyApy(cToken) {\n  const supplyRatePerBlock = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(cToken, 'function supplyRatePerBlock() returns (uint)', [], {\n    provider\n  });\n  return 100 * (Math.pow(supplyRatePerBlock / ethMantissa * blocksPerDay + 1, daysPerYear - 1) - 1);\n} // recives (Address, ticker sybol of underlaying asset, number Of Decimal of underlaying asset)\n\n\nasync function calculateCompApy(cToken, ticker, underlyingDecimals) {\n  // amount of Comp Tokens given out to lenders/ borrowers per block \n  let compSpeed = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(comptroller, 'function compSpeeds(address cToken) public returns (uint)', [cToken], {\n    provider\n  }); // get Comp Token Price with OrcaleSmartContract\n\n  let compPrice = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(opf, 'function price(string memory symbol) external view returns (uint)', [_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.COMP], {\n    provider\n  }); // get Price of underlying asset => cToken represents asset => get current price of that asset\n\n  let underlyingPrice = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(opf, 'function price(string memory symbol) external view returns (uint)', [ticker], {\n    provider\n  }); // amount of cTokens that where emitted\n\n  let totalSupply = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(cToken, 'function totalSupply() returns (uint)', [], {\n    provider\n  }); // get exchange rate of cToken and underlying asset => 1 cDai can be 10 Dai etc\n\n  let exchangeRate = await _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.eth.read(cToken, 'function exchangeRateCurrent() returns (uint)', [], {\n    provider\n  });\n  exchangeRate = +exchangeRate.toString() / ethMantissa;\n  compSpeed = compSpeed / 1e18; // COMP has 18 decimal places\n\n  compPrice = compPrice / 1e6; // price feed is USD price with 6 decimal places\n\n  underlyingPrice = underlyingPrice / 1e6;\n  totalSupply = +totalSupply.toString() * exchangeRate * underlyingPrice / Math.pow(10, underlyingDecimals);\n  const compPerDay = compSpeed * blocksPerDay;\n  return 100 * (compPrice * compPerDay / totalSupply) * 365;\n}\n\nasync function calculateApy(cToken, ticker) {\n  const underlyingDecimals = _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.decimals[cToken.slice(1, 10)];\n  const cTokenAddress = _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_0___default.a.util.getAddress(cToken);\n  const [supplyApy, compApy] = await Promise.all([calculateSupplyApy(cTokenAddress), calculateCompApy(cTokenAddress, ticker, underlyingDecimals)]);\n  return {\n    ticker,\n    supplyApy,\n    compApy\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (calculateApy);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHkuanM/ZDIyZiJdLCJuYW1lcyI6WyJwcm92aWRlciIsInByb2Nlc3MiLCJlbnYiLCJJTkZVUkFVUkwiLCJjb21wdHJvbGxlciIsIkNvbXBvdW5kIiwidXRpbCIsImdldEFkZHJlc3MiLCJDb21wdHJvbGxlciIsIm9wZiIsIlByaWNlRmVlZCIsImNUb2tlbkRlY2ltYWxzIiwiYmxvY2tzUGVyRGF5IiwiZGF5c1BlclllYXIiLCJldGhNYW50aXNzYSIsIk1hdGgiLCJwb3ciLCJjYWxjdWxhdGVTdXBwbHlBcHkiLCJjVG9rZW4iLCJzdXBwbHlSYXRlUGVyQmxvY2siLCJldGgiLCJyZWFkIiwiY2FsY3VsYXRlQ29tcEFweSIsInRpY2tlciIsInVuZGVybHlpbmdEZWNpbWFscyIsImNvbXBTcGVlZCIsImNvbXBQcmljZSIsIkNPTVAiLCJ1bmRlcmx5aW5nUHJpY2UiLCJ0b3RhbFN1cHBseSIsImV4Y2hhbmdlUmF0ZSIsInRvU3RyaW5nIiwiY29tcFBlckRheSIsImNhbGN1bGF0ZUFweSIsImRlY2ltYWxzIiwic2xpY2UiLCJjVG9rZW5BZGRyZXNzIiwic3VwcGx5QXB5IiwiY29tcEFweSIsIlByb21pc2UiLCJhbGwiXSwibWFwcGluZ3MiOiJBQUNBO0FBQUE7QUFBQTtBQUFBO0FBRUEsTUFBTUEsUUFBUSxHQUFHQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsU0FBN0I7QUFFQSxNQUFNQyxXQUFXLEdBQUdDLG9FQUFRLENBQUNDLElBQVQsQ0FBY0MsVUFBZCxDQUF5QkYsb0VBQVEsQ0FBQ0csV0FBbEMsQ0FBcEI7QUFDQSxNQUFNQyxHQUFHLEdBQUdKLG9FQUFRLENBQUNDLElBQVQsQ0FBY0MsVUFBZCxDQUF5QkYsb0VBQVEsQ0FBQ0ssU0FBbEMsQ0FBWjtBQUVBLE1BQU1DLGNBQWMsR0FBRyxDQUF2QixDLENBQTBCOztBQUMxQixNQUFNQyxZQUFZLEdBQUcsSUFBSSxFQUFKLEdBQVMsRUFBOUIsQyxDQUFrQzs7QUFDbEMsTUFBTUMsV0FB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VyxNQUF6QixDQUF0QjtBQUNBLFFBQU0sQ0FBQ21CLFNBQUQsRUFBWUMsT0FBWixJQUF1QixNQUFNQyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxDQUMzQ3ZCLGtCQUFrQixDQUFDbUIsYUFBRCxDQUR5QixFQUUzQ2QsZ0JBQWdCLENBQUNjLGFBQUQsRUFBZ0JiLE1BQWhCLEVBQXdCQyxrQkFBeEIsQ0FGMkIsQ0FBWixDQUFuQztBQUlBLFNBQU87QUFBRUQsVUFBRjtBQUFVYyxhQUFWO0FBQXFCQztBQUFyQixHQUFQO0FBQ0g7O0FBRWNMLDJFQUFmIiwiZmlsZSI6Ii4vYXB5LmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgQ29tcG91bmQgZnJvbSAnQGNvbXBvdW5kLWZpbmFuY2UvY29tcG91bmQtanMnO1xuXG5jb25zdCBwcm92aWRlciA9IHByb2Nlc3MuZW52LklORlVSQVVSTDtcblxuY29uc3QgY29tcHRyb2xsZXIgPSBDb21wb3VuZC51dGlsLmdldEFkZHJlc3MoQ29tcG91bmQuQ29tcHRyb2xsZXIpO1xuY29uc3Qgb3BmID0gQ29tcG91bmQudXRpbC5nZXRBZGRyZXNzKENvbXBvdW5kLlByaWNlRmVlZCk7XG5cbmNvbnN0IGNUb2tlbkRlY2ltYWxzID0gODsgLy8gYWx3YXlzIDhcbmNvbnN0IGJsb2Nrc1BlckRheSA9IDQgKiA2MCAqIDI0OyAvLyA0IGJsb2NrcyBpbiAxIG1pbnV0ZVxuY29uc3QgZGF5c1BlclllYXIgPSAzNjU7XG5jb25zdCBldGhNYW50aXNzYSA9IE1hdGgucG93KDEwLCAxOCk7IC8vIDEgKiAxMCBeIDE4XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZVN1cHBseUFweShjVG9rZW4pIHtcbiAgICBjb25zdCBzdXBwbHlSYXRlUGVyQmxvY2sgPSBhd2FpdCBDb21wb3VuZC5ldGgucmVhZChcbiAgICAgICAgY1Rva2VuLFxuICAgICAgICAnZnVuY3Rpb24gc3VwcGx5UmF0ZVBlckJsb2NrKCkgcmV0dXJucyAodWludCknLFxuICAgICAgICBbXSxcbiAgICAgICAgeyBwcm92aWRlciB9XG4gICAgKTtcblxuICAgIHJldHVybiAxMDAgKiAoTWF0aC5wb3coKHN1cHBseVJhdGVQZXJCbG9jayAvIGV0aE1hbnRpc3NhICogYmxvY2tzUGVyRGF5KSArIDEsIGRheXNQZXJZZWFyIC0gMSkgLSAxKTtcbn1cblxuLy8gcmVjaXZlcyAoQWRkcmVzcywgdGlja2VyIHN5Ym9sIG9mIHVuZGVybGF5aW5nIGFzc2V0LCBudW1iZXIgT2YgRGVjaW1hbCBvZiB1bmRlcmxheWluZyBhc3NldClcbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUNvbXBBcHkoY1Rva2VuLCB0aWNrZXIsIHVuZGVybHlpbmdEZWNpbWFscykge1xuICAgIC8vIGFtb3VudCBvZiBDb21wIFRva2VucyBnaXZlbiBvdXQgdG8gbGVuZGVycy8gYm9ycm93ZXJzIHBlciBibG9jayBcbiAgICBsZXQgY29tcFNwZWVkID0gYXdhaXQgQ29tcG91bmQuZXRoLnJlYWQoXG4gICAgICAgIGNvbXB0cm9sbGVyLFxuICAgICAgICAnZnVuY3Rpb24gY29tcFNwZWVkcyhhZGRyZXNzIGNUb2tlbikgcHVibGljIHJldHVybnMgKHVpbnQpJyxcbiAgICAgICAgW2NUb2tlbl0sXG4gICAgICAgIHsgcHJvdmlkZXIgfVxuICAgICk7XG4gICAgLy8gZ2V0IENvbXAgVG9rZW4gUHJpY2Ugd2l0aCBPcmNhbGVTbWFydENvbnRyYWN0XG4gICAgbGV0IGNvbXBQcmljZSA9IGF3YWl0IENvbXBvdW5kLmV0aC5yZWFkKFxuICAgICAgICBvcGYsXG4gICAgICAgICdmdW5jdGlvbiBwcmljZShzdHJpbmcgbWVtb3J5IHN5bWJvbCkgZXh0ZXJuYWwgdmlldyByZXR1cm5zICh1aW50KScsXG4gICAgICAgIFtDb21wb3VuZC5DT01QXSxcbiAgICAgICAgeyBwcm92aWRlciB9XG4gICAgKTtcbiAgICAvLyBnZXQgUHJpY2Ugb2YgdW5kZXJseWluZyBhc3NldCA9PiBjVG9rZW4gcmVwcmVzZW50cyBhc3NldCA9PiBnZXQgY3VycmVudCBwcmljZSBvZiB0aGF0IGFzc2V0XG4gICAgbGV0IHVuZGVybHlpbmdQcmljZSA9IGF3YWl0IENvbXBvdW5kLmV0aC5yZWFkKFxuICAgICAgICBvcGYsXG4gICAgICAgICdmdW5jdGlvbiBwcmljZShzdHJpbmcgbWVtb3J5IHN5bWJvbCkgZXh0ZXJuYWwgdmlldyByZXR1cm5zICh1aW50KScsXG4gICAgICAgIFt0aWNrZXJdLFxuICAgICAgICB7IHByb3ZpZGVyIH1cbiAgICApO1xuICAgIC8vIGFtb3VudCBvZiBjVG9rZW5zIHRoYXQgd2hlcmUgZW1pdHRlZFxuICAgIGxldCB0b3RhbFN1cHBseSA9IGF3YWl0IENvbXBvdW5kLmV0aC5yZWFkKFxuICAgICAgICBjVG9rZW4sXG4gICAgICAgICdmdW5jdGlvbiB0b3RhbFN1cHBseSgpIHJldHVybnMgKHVpbnQpJyxcbiAgICAgICAgW10sXG4gICAgICAgIHsgcHJvdmlkZXIgfVxuICAgICk7XG4gICAgLy8gZ2V0IGV4Y2hhbmdlIHJhdGUgb2YgY1Rva2VuIGFuZCB1bmRlcmx5aW5nIGFzc2V0ID0+IDEgY0RhaSBjYW4gYmUgMTAgRGFpIGV0Y1xuICAgIGxldCBleGNoYW5nZVJhdGUgPSBhd2FpdCBDb21wb3VuZC5ldGgucmVhZChcbiAgICAgICAgY1Rva2VuLFxuICAgICAgICAnZnVuY3Rpb24gZXhjaGFuZ2VSYXRlQ3VycmVudCgpIHJldHVybnMgKHVpbnQpJyxcbiAgICAgICAgW10sXG4gICAgICAgIHsgcHJvdmlkZXIgfVxuICAgICk7XG5cbiAgICBleGNoYW5nZVJhdGUgPSArZXhjaGFuZ2VSYXRlLnRvU3RyaW5nKCkgLyBldGhNYW50aXNzYTtcbiAgICBjb21wU3BlZWQgPSBjb21wU3BlZWQgLyAxZTE4OyAvLyBDT01QIGhhcyAxOCBkZWNpbWFsIHBsYWNlc1xuICAgIGNvbXBQcmljZSA9IGNvbXBQcmljZSAvIDFlNjsgIC8vIHByaWNlIGZlZWQgaXMgVVNEIHByaWNlIHdpdGggNiBkZWNpbWFsIHBsYWNlc1xuICAgIHVuZGVybHlpbmdQcmljZSA9IHVuZGVybHlpbmdQcmljZSAvIDFlNjtcbiAgICB0b3RhbFN1cHBseSA9ICgrdG90YWxTdXBwbHkudG9TdHJpbmcoKSAqIGV4Y2hhbmdlUmF0ZSAqIHVuZGVybHlpbmdQcmljZSkgLyAoTWF0aC5wb3coMTAsIHVuZGVybHlpbmdEZWNpbWFscykpO1xuICAgIGNvbnN0IGNvbXBQZXJEYXkgPSBjb21wU3BlZWQgKiBibG9ja3NQZXJEYXk7XG5cbiAgICByZXR1cm4gMTAwICogKGNvbXBQcmljZSAqIGNvbXBQZXJEYXkgLyB0b3RhbFN1cHBseSkgKiAzNjU7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNhbGN1bGF0ZUFweShjVG9rZW4sIHRpY2tlcikge1xuICAgIGNvbnN0IHVuZGVybHlpbmdEZWNpbWFscyA9IENvbXBvdW5kLmRlY2ltYWxzW2NUb2tlbi5zbGljZSgxLCAxMCldO1xuICAgIGNvbnN0IGNUb2tlbkFkZHJlc3MgPSBDb21wb3VuZC51dGlsLmdldEFkZHJlc3MoY1Rva2VuKTtcbiAgICBjb25zdCBbc3VwcGx5QXB5LCBjb21wQXB5XSA9IGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgY2FsY3VsYXRlU3VwcGx5QXB5KGNUb2tlbkFkZHJlc3MpLFxuICAgICAgICBjYWxjdWxhdGVDb21wQXB5KGNUb2tlbkFkZHJlc3MsIHRpY2tlciwgdW5kZXJseWluZ0RlY2ltYWxzKVxuICAgIF0pO1xuICAgIHJldHVybiB7IHRpY2tlciwgc3VwcGx5QXB5LCBjb21wQXB5IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNhbGN1bGF0ZUFweTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./apy.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/*! exports provided: default, getServerSideProps */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getServerSideProps\", function() { return getServerSideProps; });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @compound-finance/compound-js */ \"@compound-finance/compound-js\");\n/* harmony import */ var _compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _apy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../apy */ \"./apy.js\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/Home.module.css */ \"./styles/Home.module.css\");\n/* harmony import */ var _styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_Home_module_css__WEBPACK_IMPORTED_MODULE_3__);\n\nvar _jsxFileName = \"/Users/harrytrippel/Desktop/DEFI/compound-dashboad/pages/index.js\";\n\n\n\nfunction Home({\n  apys\n}) {\n  const formatPercent = num => `${new Number(num).toFixed(2)}%`;\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"div\", {\n    className: \"container\",\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"table\", {\n      className: \"table\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"thead\", {\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"tr\", {\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"th\", {\n            children: \"Ticker\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 12,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"th\", {\n            children: \"Supply APY\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 13,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"th\", {\n            children: \"COMP APY\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 14,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"th\", {\n            children: \"Total AP\"\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 15,\n            columnNumber: 13\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 11,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 10,\n        columnNumber: 9\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"tbody\", {\n        children: apys.map(apy => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"tr\", {\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"td\", {\n            children: apy.ticker.toUpperCase()\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 21,\n            columnNumber: 15\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"td\", {\n            children: formatPercent(apy.supplyApy)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 22,\n            columnNumber: 15\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"td\", {\n            children: formatPercent(apy.compApy)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 23,\n            columnNumber: 15\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__[\"jsxDEV\"])(\"td\", {\n            children: formatPercent(parseFloat(apy.supplyApy) + parseFloat(apy.compApy))\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 24,\n            columnNumber: 15\n          }, this)]\n        }, apy.ticker, true, {\n          fileName: _jsxFileName,\n          lineNumber: 20,\n          columnNumber: 13\n        }, this))\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 18,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 8,\n    columnNumber: 5\n  }, this);\n}\nasync function getServerSideProps(context) {\n  const apys = await Promise.all([Object(_apy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1___default.a.cDAI, 'DAI'), Object(_apy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1___default.a.cUSDC, 'USDC'), Object(_apy__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(_compound_finance_compound_js__WEBPACK_IMPORTED_MODULE_1___default.a.cUSDT, 'USDT')]);\n  return {\n    props: {\n      apys\n    }\n  };\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz80NGQ4Il0sIm5hbWVzIjpbIkhvbWUiLCJhcHlzIiwiZm9ybWF0UGVyY2VudCIsIm51bSIsIk51bWJlciIsInRvRml4ZWQiLCJtYXAiLCJhcHkiLCJ0aWNrZXIiLCJ0b1VwcGVyQ2FzZSIsInN1cHBseUFweSIsImNvbXBBcHkiLCJwYXJzZUZsb2F0IiwiZ2V0U2VydmVyU2lkZVByb3BzIiwiY29udGV4dCIsIlByb21pc2UiLCJhbGwiLCJjYWxjdWxhdGVBcHkiLCJDb21wb3VuZCIsImNEQUkiLCJjVVNEQyIsImNVU0RUIiwicHJvcHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUVlLFNBQVNBLElBQVQsQ0FBYztBQUFFQztBQUFGLENBQWQsRUFBd0I7QUFDckMsUUFBTUMsYUFBYSxHQUFJQyxHQUFELElBQVUsR0FBRSxJQUFJQyxNQUFKLENBQVdELEdBQVgsRUFBZ0JFLE9BQWhCLENBQXdCLENBQXhCLENBQTJCLEdBQTdEOztBQUNBLHNCQUNFO0FBQUssYUFBUyxFQUFDLFdBQWY7QUFBQSwyQkFDRTtBQUFPLGVBQVMsRUFBQyxPQUFqQjtBQUFBLDhCQUNFO0FBQUEsK0JBQ0U7QUFBQSxrQ0FDRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixlQUVFO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUZGLGVBR0U7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBSEYsZUFJRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFKRjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFERjtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBREYsZUFTRTtBQUFBLGtCQUNHSixJQUFJLENBQUNLLEdBQUwsQ0FBU0MsR0FBRyxpQkFDWDtBQUFBLGtDQUNFO0FBQUEsc0JBQUtBLEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxXQUFYO0FBQUw7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFERixlQUVFO0FBQUEsc0JBQUtQLGFBQWEsQ0FBQ0ssR0FBRyxDQUFDRyxTQUFMO0FBQWxCO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBRkYsZUFHRTtBQUFBLHNCQUFLUixhQUFhLENBQUNLLEdBQUcsQ0FBQ0ksT0FBTDtBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUhGLGVBSUU7QUFBQSxzQkFBS1QsYUFBYSxDQUFDVSxVQUFVLENBQUNMLEdBQUcsQ0FBQ0csU0FBTCxDQUFWLEdBQTRCRSxVQUFVLENBQUNMLEdBQUcsQ0FBQ0ksT0FBTCxDQUF2QztBQUFsQjtBQUFBO0FBQUE7QUFBQTtBQUFBLGtCQUpGO0FBQUEsV0FBU0osR0FBRyxDQUFDQyxNQUFiO0FBQUE7QUFBQTtBQUFBO0FBQUEsZ0JBREQ7QUFESDtBQUFBO0FBQUE7QUFBQTtBQUFBLGNBVEY7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBREY7QUFBQTtBQUFBO0FBQUE7QUFBQSxVQURGO0FBd0JEO0FBRU0sZUFBZUssa0JBQWYsQ0FBa0NDLE9BQWxDLEVBQTJDO0FBQ2hELFFBQU1iLElBQUksR0FBRyxNQUFNYyxPQUFPLENBQUNDLEdBQVIsQ0FBWSxDQUM3QkMsb0RBQVksQ0FBQ0Msb0VBQVEsQ0FBQ0MsSUFBVixFQUFnQixLQUFoQixDQURpQixFQUU3QkYsb0RBQVksQ0FBQ0Msb0VBQVEsQ0FBQ0UsS0FBVixFQUFpQixNQUFqQixDQUZpQixFQUc3Qkgsb0RBQVksQ0FBQ0Msb0VBQVEsQ0FBQ0csS0FBVixFQUFpQixNQUFqQixDQUhpQixDQUFaLENBQW5CO0FBTUEsU0FBTztBQUNMQyxTQUFLLEVBQUU7QUFDTHJCO0FBREs7QUFERixHQUFQO0FBS0QiLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb3VuZCBmcm9tICdAY29tcG91bmQtZmluYW5jZS9jb21wb3VuZC1qcydcbmltcG9ydCBjYWxjdWxhdGVBcHkgZnJvbSAnLi4vYXB5J1xuaW1wb3J0IHN0eWxlcyBmcm9tICcuLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzJ1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKHsgYXB5cyB9KSB7XG4gIGNvbnN0IGZvcm1hdFBlcmNlbnQgPSAobnVtKSA9PiBgJHtuZXcgTnVtYmVyKG51bSkudG9GaXhlZCgyKX0lYFxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGFpbmVyXCI+XG4gICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGFibGVcIj5cbiAgICAgICAgPHRoZWFkPlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0aD5UaWNrZXI8L3RoPlxuICAgICAgICAgICAgPHRoPlN1cHBseSBBUFk8L3RoPlxuICAgICAgICAgICAgPHRoPkNPTVAgQVBZPC90aD5cbiAgICAgICAgICAgIDx0aD5Ub3RhbCBBUDwvdGg+XG4gICAgICAgICAgPC90cj5cbiAgICAgICAgPC90aGVhZD5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIHthcHlzLm1hcChhcHkgPT4gKFxuICAgICAgICAgICAgPHRyIGtleT17YXB5LnRpY2tlcn0gPlxuICAgICAgICAgICAgICA8dGQ+e2FweS50aWNrZXIudG9VcHBlckNhc2UoKX08L3RkPlxuICAgICAgICAgICAgICA8dGQ+e2Zvcm1hdFBlcmNlbnQoYXB5LnN1cHBseUFweSl9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPntmb3JtYXRQZXJjZW50KGFweS5jb21wQXB5KX08L3RkPlxuICAgICAgICAgICAgICA8dGQ+e2Zvcm1hdFBlcmNlbnQocGFyc2VGbG9hdChhcHkuc3VwcGx5QXB5KSArIHBhcnNlRmxvYXQoYXB5LmNvbXBBcHkpKX08L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XG4gIGNvbnN0IGFweXMgPSBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgY2FsY3VsYXRlQXB5KENvbXBvdW5kLmNEQUksICdEQUknKSxcbiAgICBjYWxjdWxhdGVBcHkoQ29tcG91bmQuY1VTREMsICdVU0RDJyksXG4gICAgY2FsY3VsYXRlQXB5KENvbXBvdW5kLmNVU0RULCAnVVNEVCcpLFxuICBdKTtcblxuICByZXR1cm4ge1xuICAgIHByb3BzOiB7XG4gICAgICBhcHlzXG4gICAgfSxcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "./styles/Home.module.css":
/*!********************************!*\
  !*** ./styles/Home.module.css ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Exports\nmodule.exports = {\n\t\"container\": \"Home_container__1EcsU\",\n\t\"main\": \"Home_main__1x8gC\",\n\t\"footer\": \"Home_footer__1WdhD\",\n\t\"title\": \"Home_title__3DjR7\",\n\t\"description\": \"Home_description__17Z4F\",\n\t\"code\": \"Home_code__axx2Y\",\n\t\"grid\": \"Home_grid__2Ei2F\",\n\t\"card\": \"Home_card__2SdtB\",\n\t\"logo\": \"Home_logo__1YbrH\"\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdHlsZXMvSG9tZS5tb2R1bGUuY3NzP2M1NzkiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Ii4vc3R5bGVzL0hvbWUubW9kdWxlLmNzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEV4cG9ydHNcbm1vZHVsZS5leHBvcnRzID0ge1xuXHRcImNvbnRhaW5lclwiOiBcIkhvbWVfY29udGFpbmVyX18xRWNzVVwiLFxuXHRcIm1haW5cIjogXCJIb21lX21haW5fXzF4OGdDXCIsXG5cdFwiZm9vdGVyXCI6IFwiSG9tZV9mb290ZXJfXzFXZGhEXCIsXG5cdFwidGl0bGVcIjogXCJIb21lX3RpdGxlX18zRGpSN1wiLFxuXHRcImRlc2NyaXB0aW9uXCI6IFwiSG9tZV9kZXNjcmlwdGlvbl9fMTdaNEZcIixcblx0XCJjb2RlXCI6IFwiSG9tZV9jb2RlX19heHgyWVwiLFxuXHRcImdyaWRcIjogXCJIb21lX2dyaWRfXzJFaTJGXCIsXG5cdFwiY2FyZFwiOiBcIkhvbWVfY2FyZF9fMlNkdEJcIixcblx0XCJsb2dvXCI6IFwiSG9tZV9sb2dvX18xWWJySFwiXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/Home.module.css\n");

/***/ }),

/***/ "@compound-finance/compound-js":
/*!************************************************!*\
  !*** external "@compound-finance/compound-js" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@compound-finance/compound-js\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJAY29tcG91bmQtZmluYW5jZS9jb21wb3VuZC1qc1wiP2M0NjIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiQGNvbXBvdW5kLWZpbmFuY2UvY29tcG91bmQtanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJAY29tcG91bmQtZmluYW5jZS9jb21wb3VuZC1qc1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///@compound-finance/compound-js\n");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdC9qc3gtZGV2LXJ1bnRpbWVcIj9jZDkwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlYWN0L2pzeC1kZXYtcnVudGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlYWN0L2pzeC1kZXYtcnVudGltZVwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react/jsx-dev-runtime\n");

/***/ })

/******/ });