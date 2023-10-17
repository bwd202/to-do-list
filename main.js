/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/classes.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/classes.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.border {
    /* border: 1px solid black; */
    border-radius: 14px;
}

.banner {
    display: grid;
    grid-auto-flow: column;
    padding: 10px;
    background-color: var(--card);
    grid-template-columns: max-content 1fr 100px max-content;
    align-items: center;
    gap: 5px;
}

.button {
    cursor: pointer;
}

.close-btn {
    background-color: red;
    color: white;
    border-radius: 5px;
    padding: 0 2px;
}

.close-btn-2 {
    color: var(--input);
}

.close-btn-2:hover {
    scale: 1.7;
    color: red;
}

.close-btn:hover {
    scale: 1.2;
}

.card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas: 'icon count' 'title .';
    align-items: center;
    padding: 10px;
    background-color: var(--card);
    gap: 5px;
}

.drop-down {
    background-color: var(--card);
    border-top: 1px solid darkgrey;

}

.filter-blue {
    filter: invert(17%) sepia(97%) saturate(4457%) hue-rotate(241deg) brightness(115%) contrast(139%);
}

.filter-red {
    filter: invert(26%) sepia(90%) saturate(2174%) hue-rotate(9deg) brightness(99%) contrast(102%);
}

.filter-gray {
    filter: invert(36%) sepia(9%) saturate(1550%) hue-rotate(200deg) brightness(93%) contrast(89%);
}

.filter-green {
    filter: invert(57%) sepia(48%) saturate(661%) hue-rotate(76deg) brightness(93%) contrast(89%);
}

.form-wrapper {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: max-content 1fr;
    grid-column: 2;
    background-color: var(--card);
    position: relative;
}

.input {
    background-color: var(--input);
    border: 0;
    padding: 6px;
    border-radius: 14px;
}

.list-wrapper {
    display: grid;
}

.modal {
    /* display: grid; */
    grid-template-columns: repeat(3, 1fr);
    background-color: var(--modal-background);
    position: absolute;
    inset: 0;
    z-index: 10;
    /* fixes issue with add list button icon showing on top of reminder modal */
}

.modal-btn {
    position: absolute;
    right: -0;
    top: -0;
}

.visible {
    display: grid;
}`, "",{"version":3,"sources":["webpack://./src/classes.css"],"names":[],"mappings":"AAAA;IACI,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,6BAA6B;IAC7B,wDAAwD;IACxD,mBAAmB;IACnB,QAAQ;AACZ;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,qBAAqB;IACrB,YAAY;IACZ,kBAAkB;IAClB,cAAc;AAClB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,UAAU;IACV,UAAU;AACd;;AAEA;IACI,UAAU;AACd;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,2BAA2B;IAC3B,2CAA2C;IAC3C,mBAAmB;IACnB,aAAa;IACb,6BAA6B;IAC7B,QAAQ;AACZ;;AAEA;IACI,6BAA6B;IAC7B,8BAA8B;;AAElC;;AAEA;IACI,iGAAiG;AACrG;;AAEA;IACI,8FAA8F;AAClG;;AAEA;IACI,8FAA8F;AAClG;;AAEA;IACI,6FAA6F;AACjG;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,mCAAmC;IACnC,cAAc;IACd,6BAA6B;IAC7B,kBAAkB;AACtB;;AAEA;IACI,8BAA8B;IAC9B,SAAS;IACT,YAAY;IACZ,mBAAmB;AACvB;;AAEA;IACI,aAAa;AACjB;;AAEA;IACI,mBAAmB;IACnB,qCAAqC;IACrC,yCAAyC;IACzC,kBAAkB;IAClB,QAAQ;IACR,WAAW;IACX,2EAA2E;AAC/E;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,OAAO;AACX;;AAEA;IACI,aAAa;AACjB","sourcesContent":[".border {\n    /* border: 1px solid black; */\n    border-radius: 14px;\n}\n\n.banner {\n    display: grid;\n    grid-auto-flow: column;\n    padding: 10px;\n    background-color: var(--card);\n    grid-template-columns: max-content 1fr 100px max-content;\n    align-items: center;\n    gap: 5px;\n}\n\n.button {\n    cursor: pointer;\n}\n\n.close-btn {\n    background-color: red;\n    color: white;\n    border-radius: 5px;\n    padding: 0 2px;\n}\n\n.close-btn-2 {\n    color: var(--input);\n}\n\n.close-btn-2:hover {\n    scale: 1.7;\n    color: red;\n}\n\n.close-btn:hover {\n    scale: 1.2;\n}\n\n.card {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 1fr 1fr;\n    grid-template-areas: 'icon count' 'title .';\n    align-items: center;\n    padding: 10px;\n    background-color: var(--card);\n    gap: 5px;\n}\n\n.drop-down {\n    background-color: var(--card);\n    border-top: 1px solid darkgrey;\n\n}\n\n.filter-blue {\n    filter: invert(17%) sepia(97%) saturate(4457%) hue-rotate(241deg) brightness(115%) contrast(139%);\n}\n\n.filter-red {\n    filter: invert(26%) sepia(90%) saturate(2174%) hue-rotate(9deg) brightness(99%) contrast(102%);\n}\n\n.filter-gray {\n    filter: invert(36%) sepia(9%) saturate(1550%) hue-rotate(200deg) brightness(93%) contrast(89%);\n}\n\n.filter-green {\n    filter: invert(57%) sepia(48%) saturate(661%) hue-rotate(76deg) brightness(93%) contrast(89%);\n}\n\n.form-wrapper {\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-template-rows: max-content 1fr;\n    grid-column: 2;\n    background-color: var(--card);\n    position: relative;\n}\n\n.input {\n    background-color: var(--input);\n    border: 0;\n    padding: 6px;\n    border-radius: 14px;\n}\n\n.list-wrapper {\n    display: grid;\n}\n\n.modal {\n    /* display: grid; */\n    grid-template-columns: repeat(3, 1fr);\n    background-color: var(--modal-background);\n    position: absolute;\n    inset: 0;\n    z-index: 10;\n    /* fixes issue with add list button icon showing on top of reminder modal */\n}\n\n.modal-btn {\n    position: absolute;\n    right: -0;\n    top: -0;\n}\n\n.visible {\n    display: grid;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/colors.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/colors.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
    --card: white;
    --modal-background: rgba(0,0,0,0.5);
    --input: lightgrey;
    --wrapper: whitesmoke;
    --subtext: darkgrey;
}`, "",{"version":3,"sources":["webpack://./src/colors.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,mCAAmC;IACnC,kBAAkB;IAClB,qBAAqB;IACrB,mBAAmB;AACvB","sourcesContent":[":root {\n    --card: white;\n    --modal-background: rgba(0,0,0,0.5);\n    --input: lightgrey;\n    --wrapper: whitesmoke;\n    --subtext: darkgrey;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/footer.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/footer.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `footer {
    grid-area: footer;
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    align-items: end; 
    gap: 10px;
}

footer form {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(4, 100px);
    grid-auto-rows: 100px;
    grid-auto-flow: column;
    align-items: center;
    justify-items: center;
}

footer > button {
    border: 0;
    border-radius: 14px;
    padding: 10px;
    width: 200px;
    color: blue;
    display: grid;
    align-items: center;
    justify-items: start;
    gap: 5px;
}

button#new-reminder {
    grid-template-columns: max-content 1fr;

}

button#openListModal {
    height: 70px;
    justify-items: center;
}

/* REMINDER MODAL */

#reminder-modal {
    /* display: grid; */

}

#reminder-modal .form-wrapper {
    min-height: 100vh;
}

#reminder-modal form {
    grid-template-areas: 'title title title title'
                         'notes notes notes notes' 
                         '. date date .' 
                         '. time time .' 
                         '. priority priority .'
                         'list list list list' 
                         '. done reset .';
}

#reminder-modal label:first-of-type {
    grid-area: title;
}

#reminder-modal label:nth-of-type(2) {
    grid-area: notes;
}

#reminder-modal label:nth-of-type(3) {
    grid-area: date;
}

#reminder-modal label:nth-of-type(4) {
    grid-area: time;
}

#reminder-modal label:nth-of-type(5) {
    grid-area: priority;
}

#reminder-modal label:nth-of-type(6) {
    grid-area: list;
}

#reminder-modal input {
    width: 150px;
}

#reminder-modal button:first-of-type {
    grid-area: done;
}

#reminder-modal button:last-of-type {
    grid-area: reset;
}

/* LIST MODAL */

#list-modal form {
    grid-template-areas: '. input input .' '. color color .' '. done reset .';
    gap: 10px;
}

#list-modal input:first-of-type {
    width: 250px;
    grid-area: input;
}

#list-modal input:nth-of-type(2) {
    grid-area: color;
}

#list-modal button:first-of-type {
    grid-area: done;
}

#list-modal button:last-of-type {
    grid-area: reset;
}`, "",{"version":3,"sources":["webpack://./src/footer.css"],"names":[],"mappings":"AAAA;IACI,iBAAiB;IACjB,aAAa;IACb,sBAAsB;IACtB,8BAA8B;IAC9B,gBAAgB;IAChB,SAAS;AACb;;AAEA;IACI,aAAa;IACb,qCAAqC;IACrC,oCAAoC;IACpC,qBAAqB;IACrB,sBAAsB;IACtB,mBAAmB;IACnB,qBAAqB;AACzB;;AAEA;IACI,SAAS;IACT,mBAAmB;IACnB,aAAa;IACb,YAAY;IACZ,WAAW;IACX,aAAa;IACb,mBAAmB;IACnB,oBAAoB;IACpB,QAAQ;AACZ;;AAEA;IACI,sCAAsC;;AAE1C;;AAEA;IACI,YAAY;IACZ,qBAAqB;AACzB;;AAEA,mBAAmB;;AAEnB;IACI,mBAAmB;;AAEvB;;AAEA;IACI,iBAAiB;AACrB;;AAEA;IACI;;;;;;yCAMqC;AACzC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,gBAAgB;AACpB;;AAEA,eAAe;;AAEf;IACI,yEAAyE;IACzE,SAAS;AACb;;AAEA;IACI,YAAY;IACZ,gBAAgB;AACpB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,gBAAgB;AACpB","sourcesContent":["footer {\n    grid-area: footer;\n    display: grid;\n    grid-auto-flow: column;\n    justify-content: space-between;\n    align-items: end; \n    gap: 10px;\n}\n\nfooter form {\n    display: grid;\n    grid-template-columns: repeat(4, 1fr);\n    grid-template-rows: repeat(4, 100px);\n    grid-auto-rows: 100px;\n    grid-auto-flow: column;\n    align-items: center;\n    justify-items: center;\n}\n\nfooter > button {\n    border: 0;\n    border-radius: 14px;\n    padding: 10px;\n    width: 200px;\n    color: blue;\n    display: grid;\n    align-items: center;\n    justify-items: start;\n    gap: 5px;\n}\n\nbutton#new-reminder {\n    grid-template-columns: max-content 1fr;\n\n}\n\nbutton#openListModal {\n    height: 70px;\n    justify-items: center;\n}\n\n/* REMINDER MODAL */\n\n#reminder-modal {\n    /* display: grid; */\n\n}\n\n#reminder-modal .form-wrapper {\n    min-height: 100vh;\n}\n\n#reminder-modal form {\n    grid-template-areas: 'title title title title'\n                         'notes notes notes notes' \n                         '. date date .' \n                         '. time time .' \n                         '. priority priority .'\n                         'list list list list' \n                         '. done reset .';\n}\n\n#reminder-modal label:first-of-type {\n    grid-area: title;\n}\n\n#reminder-modal label:nth-of-type(2) {\n    grid-area: notes;\n}\n\n#reminder-modal label:nth-of-type(3) {\n    grid-area: date;\n}\n\n#reminder-modal label:nth-of-type(4) {\n    grid-area: time;\n}\n\n#reminder-modal label:nth-of-type(5) {\n    grid-area: priority;\n}\n\n#reminder-modal label:nth-of-type(6) {\n    grid-area: list;\n}\n\n#reminder-modal input {\n    width: 150px;\n}\n\n#reminder-modal button:first-of-type {\n    grid-area: done;\n}\n\n#reminder-modal button:last-of-type {\n    grid-area: reset;\n}\n\n/* LIST MODAL */\n\n#list-modal form {\n    grid-template-areas: '. input input .' '. color color .' '. done reset .';\n    gap: 10px;\n}\n\n#list-modal input:first-of-type {\n    width: 250px;\n    grid-area: input;\n}\n\n#list-modal input:nth-of-type(2) {\n    grid-area: color;\n}\n\n#list-modal button:first-of-type {\n    grid-area: done;\n}\n\n#list-modal button:last-of-type {\n    grid-area: reset;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/header.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/header.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `header {
    display: grid;
    grid-area: header;
    align-items: start;
}`, "",{"version":3,"sources":["webpack://./src/header.css"],"names":[],"mappings":"AAAA;IACI,aAAa;IACb,iBAAiB;IACjB,kBAAkB;AACtB","sourcesContent":["header {\n    display: grid;\n    grid-area: header;\n    align-items: start;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/main.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/main.css ***!
  \************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    /* border: 1px dotted red; */
}

body {
    background-color: black;
    display: grid;
    grid-template-columns: repeat(4, max(300px, 25%));
    width: 100%;
    min-width: 800px;
    justify-content: center;
    position: relative;
}

button,
input,
select,
textarea {
  font-family: inherit;
  font-size: 100%;
}

#wrapper {
    display: grid;
    grid-template-columns: subgrid;
    grid-column: 2 / span 2;
    grid-template-rows: 100px 1fr 100px;
    grid-template-areas: 'header header' 
                        'main main' 
                        'footer footer';
    padding: 10px;
    background-color: white;
    background-color: var(--wrapper);
    min-height: 100vh;
}

main {
    grid-area: main;
    display: grid;
    grid-template-columns: subgrid;
    gap: 10px;
}

/* CARDS */

.card img {
    grid-area: icon;
    align-self: end;
}

.card span {
    grid-area: count;
    align-self: start;
    justify-self: end;
    padding: 10px;
}

.card p {
    grid-area: title;
    align-self: start;
    padding: 5px;   /* to align with icon */
}

article {
    display: grid;
    grid-template-columns: subgrid;
    grid-template-rows: 30px 1fr;
    grid-column: span 2;
    gap: 10px;
}

article > div {
    grid-column: inherit;
}

#reminders {    /* aka dropdown */
    grid-template-columns: 50px 100px 1fr max-content;
    grid-template-rows: max-content repeat(3, 1fr);
    grid-template-areas: 'heading heading heading heading' 
                        'checkbox title title closeBtn' 
                        '. notes notes notes' 
                        '. dueDate dueTime priority';
    padding: 10px;
}

/* list item count */
.banner span:nth-of-type(1) {
    place-self: center;
}

#reminders h2 {
    grid-area: heading;
}

#reminders [type='checkbox'] {
    grid-area: checkbox;
}

#reminders h4 {
    grid-area: title;
}

#reminders span {
    grid-area: closeBtn;
}

#reminders p:nth-of-type(1) {
    grid-area: notes;
    color: var(--subtext);
}

#reminders p:nth-of-type(2) {
    grid-area: dueDate; 
    color: var(--subtext);
}

#reminders p:nth-of-type(3) {
    grid-area: dueTime;
    color: var(--subtext);
}

#reminders p:nth-of-type(4) {
    grid-area: priority;
}`, "",{"version":3,"sources":["webpack://./src/main.css"],"names":[],"mappings":"AAAA;IACI,sBAAsB;IACtB,SAAS;IACT,UAAU;IACV,4BAA4B;AAChC;;AAEA;IACI,uBAAuB;IACvB,aAAa;IACb,iDAAiD;IACjD,WAAW;IACX,gBAAgB;IAChB,uBAAuB;IACvB,kBAAkB;AACtB;;AAEA;;;;EAIE,oBAAoB;EACpB,eAAe;AACjB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,uBAAuB;IACvB,mCAAmC;IACnC;;uCAEmC;IACnC,aAAa;IACb,uBAAuB;IACvB,gCAAgC;IAChC,iBAAiB;AACrB;;AAEA;IACI,eAAe;IACf,aAAa;IACb,8BAA8B;IAC9B,SAAS;AACb;;AAEA,UAAU;;AAEV;IACI,eAAe;IACf,eAAe;AACnB;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;IACjB,iBAAiB;IACjB,aAAa;AACjB;;AAEA;IACI,gBAAgB;IAChB,iBAAiB;IACjB,YAAY,IAAI,uBAAuB;AAC3C;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,4BAA4B;IAC5B,mBAAmB;IACnB,SAAS;AACb;;AAEA;IACI,oBAAoB;AACxB;;AAEA,gBAAgB,iBAAiB;IAC7B,iDAAiD;IACjD,8CAA8C;IAC9C;;;oDAGgD;IAChD,aAAa;AACjB;;AAEA,oBAAoB;AACpB;IACI,kBAAkB;AACtB;;AAEA;IACI,kBAAkB;AACtB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;IAChB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,kBAAkB;IAClB,qBAAqB;AACzB;;AAEA;IACI,mBAAmB;AACvB","sourcesContent":["* {\n    box-sizing: border-box;\n    margin: 0;\n    padding: 0;\n    /* border: 1px dotted red; */\n}\n\nbody {\n    background-color: black;\n    display: grid;\n    grid-template-columns: repeat(4, max(300px, 25%));\n    width: 100%;\n    min-width: 800px;\n    justify-content: center;\n    position: relative;\n}\n\nbutton,\ninput,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: 100%;\n}\n\n#wrapper {\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-column: 2 / span 2;\n    grid-template-rows: 100px 1fr 100px;\n    grid-template-areas: 'header header' \n                        'main main' \n                        'footer footer';\n    padding: 10px;\n    background-color: white;\n    background-color: var(--wrapper);\n    min-height: 100vh;\n}\n\nmain {\n    grid-area: main;\n    display: grid;\n    grid-template-columns: subgrid;\n    gap: 10px;\n}\n\n/* CARDS */\n\n.card img {\n    grid-area: icon;\n    align-self: end;\n}\n\n.card span {\n    grid-area: count;\n    align-self: start;\n    justify-self: end;\n    padding: 10px;\n}\n\n.card p {\n    grid-area: title;\n    align-self: start;\n    padding: 5px;   /* to align with icon */\n}\n\narticle {\n    display: grid;\n    grid-template-columns: subgrid;\n    grid-template-rows: 30px 1fr;\n    grid-column: span 2;\n    gap: 10px;\n}\n\narticle > div {\n    grid-column: inherit;\n}\n\n#reminders {    /* aka dropdown */\n    grid-template-columns: 50px 100px 1fr max-content;\n    grid-template-rows: max-content repeat(3, 1fr);\n    grid-template-areas: 'heading heading heading heading' \n                        'checkbox title title closeBtn' \n                        '. notes notes notes' \n                        '. dueDate dueTime priority';\n    padding: 10px;\n}\n\n/* list item count */\n.banner span:nth-of-type(1) {\n    place-self: center;\n}\n\n#reminders h2 {\n    grid-area: heading;\n}\n\n#reminders [type='checkbox'] {\n    grid-area: checkbox;\n}\n\n#reminders h4 {\n    grid-area: title;\n}\n\n#reminders span {\n    grid-area: closeBtn;\n}\n\n#reminders p:nth-of-type(1) {\n    grid-area: notes;\n    color: var(--subtext);\n}\n\n#reminders p:nth-of-type(2) {\n    grid-area: dueDate; \n    color: var(--subtext);\n}\n\n#reminders p:nth-of-type(3) {\n    grid-area: dueTime;\n    color: var(--subtext);\n}\n\n#reminders p:nth-of-type(4) {\n    grid-area: priority;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/html-loader/dist/runtime/getUrl.js */ "./node_modules/html-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___HTML_LOADER_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-badge.svg */ "./src/icons/calendar-badge.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-clock.svg */ "./src/icons/calendar-clock.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-multiselect.svg */ "./src/icons/calendar-multiselect.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-multiple-check.svg */ "./src/icons/calendar-multiple-check.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-text.svg */ "./src/icons/calendar-text.svg"), __webpack_require__.b);
var ___HTML_LOADER_IMPORT_5___ = new URL(/* asset import */ __webpack_require__(/*! ./icons/calendar-plus.svg */ "./src/icons/calendar-plus.svg"), __webpack_require__.b);
// Module
var ___HTML_LOADER_REPLACEMENT_0___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_0___);
var ___HTML_LOADER_REPLACEMENT_1___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_1___);
var ___HTML_LOADER_REPLACEMENT_2___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_2___);
var ___HTML_LOADER_REPLACEMENT_3___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_3___);
var ___HTML_LOADER_REPLACEMENT_4___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_4___);
var ___HTML_LOADER_REPLACEMENT_5___ = _node_modules_html_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_0___default()(___HTML_LOADER_IMPORT_5___);
var code = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>To-Do List</title>\n</head>\n<body>\n    <div id=\"wrapper\">\n        <header>\n            <input id=\"search\" type=\"text\" placeholder=\"&#x1F50D; Search\" class=\"input\">\n           </header>\n           <main>\n            <div id=\"today\" class=\"card button border\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_0___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-blue\"><p>today</p><span>0</span></div>\n            <div id=\"scheduled\" class=\"card button border\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_1___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-red\"><p>scheduled</p><span>0</span></div>\n            <div id=\"all\" class=\"card button border\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_2___ + "\" alt=\"\" width=\"50\" height=\"50\"><p>all</p><span>0</span></div>\n            <div id=\"completed\" class=\"card button border\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_3___ + "\" alt=\"\" width=\"50\" height=\"50\" class=\"filter-gray\"><p>completed</p><span>0</span></div>\n            <article id=\"lists\">\n                <h2>My Lists</h2>\n                <div class=\"list-wrapper\">\n                    <div id=\"reminder-list\" class=\"button banner border\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_4___ + "\" width=\"50\" height=\"50\" alt=\"\" class=\"filter-green\"><p>Reminders</p><span>0</span><span class=\"close-btn-2\">&times;</span></div>\n                    <div id=\"reminders\" class=\"drop-down\" hidden>\n                        <h2>List name</h2>\n                    </div>\n                </div>\n               \n            </article>\n            </main>\n           <footer>\n            <button id=\"new-reminder\" class=\"button\"><img src=\"" + ___HTML_LOADER_REPLACEMENT_5___ + "\" width=\"50\" height=\"50\" alt=\"\" class=\"filter-blue\">New Reminder</button>\n            <div id=\"reminder-modal\" class=\"modal \" hidden>\n                <div class=\"form-wrapper\">\n                    <span id=\"reminder-modal-close-btn\" class=\"button modal-btn\">&times;</span>\n                    <form action=\"/\">\n                        <label for=\"\">Title<input type=\"text\" id=\"title\" placeholder=\"take dogs for a walk\" name=\"reminderTitle\" class=\"input\"></label>\n                        <label for=\"\">Notes<input type=\"text\" id=\"notes\" placeholder=\"bring poop bags\" name=\"reminderNotes\" class=\"input\"></label>\n                        <label for=\"\">Due Date<input type=\"date\" id=\"dueDate\" name=\"reminderDueDate\" class=\"\"></label>\n                        <label for=\"\">Due Time<input type=\"time\" id=\"dueTime\" name=\"reminderDueTime\" class=\"\"></label>\n                        <label for=\"priority\">Priority<select id=\"priority\" name=\"reminderPriority\" class=\"\">\n                            <option value=\"1\">low</option>\n                            <option value=\"2\" selected>medium</option>\n                            <option value=\"3\">high</option>\n                        </select></label>\n                        <label for=\"selectList\">Select List<select id=\"selectList\" name=\"reminderSelectList\">\n                            <option value=\"default\">Default</option>\n                        </select>\n                        </label>\n                        <button id=\"publishReminder\" type=\"button\">Done</button>\n                        <button type=\"reset\">Reset</button> \n                    </form>\n                </div>\n                \n            </div>\n            <button id=\"openListModal\" class=\"button\"><span>Add List</span></button>\n            <div id=\"list-modal\" class=\"modal\" hidden>\n                <div class=\"form-wrapper\">\n                    <span id=\"list-modal-close-btn\" class=\"button modal-btn\">&times;</span>\n                    <form action=\"/\">\n                        <input type=\"text\" placeholder=\"List name\" class=\"input\">\n                        <input type=\"color\" class=\"\">\n                        <button id=\"addList\" type=\"button\">Done</button>\n                        <button type=\"reset\">Reset</button>\n                    </form>\n                </div>\n            </div>\n           </footer>\n    </div>\n</body>\n</html>";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/html-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ./node_modules/html-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  }

  if (!url) {
    return url;
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = String(url.__esModule ? url.default : url);

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  }

  if (options.maybeNeedQuotes && /[\t\n\f\r "'=<>`]/.test(url)) {
    return "\"".concat(url, "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/classes.css":
/*!*************************!*\
  !*** ./src/classes.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_classes_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./classes.css */ "./node_modules/css-loader/dist/cjs.js!./src/classes.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_classes_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_classes_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_classes_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_classes_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/colors.css":
/*!************************!*\
  !*** ./src/colors.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_colors_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./colors.css */ "./node_modules/css-loader/dist/cjs.js!./src/colors.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_colors_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_colors_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_colors_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_colors_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/footer.css":
/*!************************!*\
  !*** ./src/footer.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./footer.css */ "./node_modules/css-loader/dist/cjs.js!./src/footer.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_footer_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/header.css":
/*!************************!*\
  !*** ./src/header.css ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./header.css */ "./node_modules/css-loader/dist/cjs.js!./src/header.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_header_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/main.css":
/*!**********************!*\
  !*** ./src/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/list.js":
/*!*********************!*\
  !*** ./src/list.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _icons_calendar_text_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./icons/calendar-text.svg */ "./src/icons/calendar-text.svg");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (addList);
;

// UI

// let addListBtn = document.querySelector('')

class List {
    constructor({name = 'new list', color = '#000'}={}) {
        this.name = name
        this.color = color
    }
}

let listHtml = function() {

    let wrapper = new DocumentFragment()

    let listWrapper = document.createElement('div')
    
    listWrapper.classList.add('list-wrapper')

    let container = document.createElement('div')

    container.classList.add('banner','button','border')

    let icon = new Image(50,50)
    icon.src = _icons_calendar_text_svg__WEBPACK_IMPORTED_MODULE_0__

    let h3 = document.createElement('h3')

    let listName = document.querySelector("[placeholder='List name']").value

    h3.append(listName)

    // let color = document.querySelector("[type='color']").value

    let count = document.createElement('span')

    count.innerHTML = 0

    let closeBtn = document.createElement('span')
    closeBtn.classList.add('close-btn-2')
    closeBtn.innerHTML = '&times;'
    closeBtn.addEventListener('click', () => container.remove())

    container.append(icon, h3, count, closeBtn)

    listWrapper.append(container)

    wrapper.append(listWrapper)

    return wrapper
}

function addList() {

    let article = document.querySelector('article')

    article.append(listHtml())
}

/***/ }),

/***/ "./src/modalControl.js":
/*!*****************************!*\
  !*** ./src/modalControl.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeModal: () => (/* binding */ closeModal),
/* harmony export */   openModal: () => (/* binding */ openModal),
/* harmony export */   toggleModal: () => (/* binding */ toggleModal)
/* harmony export */ });


function closeModal(modal) {//returns fn for eventHandler

    return function() {

        modal.classList.remove('visible')
    }
   
}

function openModal(modal) {

    return function() {

        modal.classList.add('visible')
    }

}

function toggleModal(modal) {
    return function() {
        modal.classList.toggle('visible')
    }
}

/***/ }),

/***/ "./src/reminder.js":
/*!*************************!*\
  !*** ./src/reminder.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (publishReminder);

class Reminder {

    constructor({title="title", notes="notes", dueDate="dueDate", dueTime="dueTime", priority="medium", list="default"} = {}) {
        this.title = title
        this.notes = notes
        this.dueDate = dueDate
        this.dueTime = dueTime
        this.priority = priority
        this.list = list
    }

}

function getReminderData() { //organizes user input from modal into object

    let reminderTitle = document.querySelector('input#title').value

    let reminderNotes = document.querySelector('input#notes').value

    let reminderDueDate = document.querySelector('input#dueDate').value

    let reminderDueTime = document.querySelector('input#dueTime').value

    let reminderPriority = document.querySelector('select#priority').value

    let reminderList = document.querySelector('select#selectList').value

    // console.log(reminderPriority)

    return new Reminder({title:reminderTitle, notes:reminderNotes, dueDate:reminderDueDate, dueTime:reminderDueTime, priority:reminderPriority, list:reminderList})
}

function reminderHtml(obj) {  //makes reminder html from object

    let reminder = []

    let checkbox = document.createElement('input')
    
    checkbox.setAttribute('type','checkbox')

    let reminderTitle = document.createElement('h4')

    reminderTitle.innerHTML = obj.title

    let closeBtn = document.createElement('span')

    closeBtn.classList.add('button','close-btn')

    closeBtn.innerHTML = '&times;'

    let reminderNotes = document.createElement('p')

    reminderNotes.innerHTML = obj.notes

    let reminderDueDate = document.createElement('p')

    reminderDueDate.innerHTML = obj.dueDate

    let reminderDueTime = document.createElement('p')

    reminderDueTime.innerHTML = obj.dueTime

    let reminderPriority = document.createElement('p')

    reminderPriority.innerHTML = obj.priority

    reminder.push(checkbox,reminderTitle,closeBtn,reminderNotes,reminderDueDate,reminderDueTime,reminderPriority)

    // console.log(reminder)

    return reminder
}

function publishReminder() { //shows reminder on the page

    let container = document.querySelector('div#reminders')

    container.append(...reminderHtml(getReminderData()))
}

/***/ }),

/***/ "./src/icons/calendar-badge.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar-badge.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "cb0e65bd516b4b5f5d06.svg";

/***/ }),

/***/ "./src/icons/calendar-clock.svg":
/*!**************************************!*\
  !*** ./src/icons/calendar-clock.svg ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0afa66342b0e5f53443f.svg";

/***/ }),

/***/ "./src/icons/calendar-multiple-check.svg":
/*!***********************************************!*\
  !*** ./src/icons/calendar-multiple-check.svg ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "61238fdaf03dcdcfb315.svg";

/***/ }),

/***/ "./src/icons/calendar-multiselect.svg":
/*!********************************************!*\
  !*** ./src/icons/calendar-multiselect.svg ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "7c08cb4f6d6cfe3d09d7.svg";

/***/ }),

/***/ "./src/icons/calendar-plus.svg":
/*!*************************************!*\
  !*** ./src/icons/calendar-plus.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ab58307c4579e18946a8.svg";

/***/ }),

/***/ "./src/icons/calendar-text.svg":
/*!*************************************!*\
  !*** ./src/icons/calendar-text.svg ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "219cb3f5774dc4da59ea.svg";

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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _colors_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colors.css */ "./src/colors.css");
/* harmony import */ var _classes_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./classes.css */ "./src/classes.css");
/* harmony import */ var _header_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./header.css */ "./src/header.css");
/* harmony import */ var _main_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main.css */ "./src/main.css");
/* harmony import */ var _footer_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./footer.css */ "./src/footer.css");
/* harmony import */ var _modalControl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modalControl */ "./src/modalControl.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./list */ "./src/list.js");
/* harmony import */ var _reminder_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./reminder.js */ "./src/reminder.js");










// UIs

let defaultList = document.querySelector('div#reminder-list')

let reminders = document.querySelector('#reminders')

let newReminderBtn = document.querySelector('#new-reminder')

let reminderModal = document.querySelector('#reminder-modal')

let reminderModalCloseBtn = document.querySelector('#reminder-modal-close-btn')

let listModal = document.querySelector('#list-modal')

let listModalCloseBtn = document.querySelector('#list-modal-close-btn')

// EVENT LISTENERS

// Reminder Object HTML (drop-down container)

// document.querySelector('#reminders').classList.add('visible')

document.querySelector('button#publishReminder').addEventListener('click', _reminder_js__WEBPACK_IMPORTED_MODULE_8__["default"])

let clickEvent = new Event('click')

document.querySelector('button#publishReminder').dispatchEvent(clickEvent)

// New Reminder Modal Controls

// document.querySelector('#reminder-modal').classList.add('visible')

defaultList.addEventListener('click', (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.toggleModal)(reminders))

newReminderBtn.addEventListener('click', (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.openModal)(reminderModal))

reminderModalCloseBtn.addEventListener('click', (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.closeModal)(reminderModal))

// List Modal Controls

// document.querySelector('#list-modal').classList.add('visible')

openListModal.addEventListener('click', (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.openModal)(listModal))  //html id

listModalCloseBtn.addEventListener('click', (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.closeModal)(listModal))

addList.addEventListener('click', _list__WEBPACK_IMPORTED_MODULE_7__["default"])

// testing
// addList.dispatchEvent(clickEvent)

// Window

window.addEventListener('click', (e) => {

    let modal = e.target

    if(modal.id === "reminder-modal") {

        (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.closeModal)(reminderModal)()

    } else if(modal.id === 'list-modal') {

        (0,_modalControl__WEBPACK_IMPORTED_MODULE_6__.closeModal)(listModal)() //invokes the "inner" function
    }
})
})();

/******/ })()
;
//# sourceMappingURL=main.js.map