/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Fizzy UI utils v2.0.7
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(24)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( matchesSelector ) {
      return factory( window, matchesSelector );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.matchesSelector
    );
  }

}( window, function factory( window, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- makeArray ----- //

var arraySlice = Array.prototype.slice;

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  if ( Array.isArray( obj ) ) {
    // use object if already an array
    return obj;
  }
  // return empty array if undefined or null. #6
  if ( obj === null || obj === undefined ) {
    return [];
  }

  var isArrayLike = typeof obj == 'object' && typeof obj.length == 'number';
  if ( isArrayLike ) {
    // convert nodeList to array
    return arraySlice.call( obj );
  }

  // array of single index
  return [ obj ];
};

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = ary.indexOf( obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem.parentNode && elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  elems.forEach( function( elem ) {
    // check that elem is an actual element
    if ( !( elem instanceof HTMLElement ) ) {
      return;
    }
    // add elem if no selector
    if ( !selector ) {
      ffElems.push( elem );
      return;
    }
    // filter & find items if we have a selector
    // filter
    if ( matchesSelector( elem, selector ) ) {
      ffElems.push( elem );
    }
    // find children
    var childElems = elem.querySelectorAll( selector );
    // concat childElems to filterFound array
    for ( var i=0; i < childElems.length; i++ ) {
      ffElems.push( childElems[i] );
    }
  });

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  threshold = threshold || 100;
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    clearTimeout( timeout );

    var args = arguments;
    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold );
  };
};

// ----- docReady ----- //

utils.docReady = function( callback ) {
  var readyState = document.readyState;
  if ( readyState == 'complete' || readyState == 'interactive' ) {
    // do async to allow for other scripts to run. metafizzy/flickity#441
    setTimeout( callback );
  } else {
    document.addEventListener( 'DOMContentLoaded', callback );
  }
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via [data-namespace] or .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-options
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  utils.docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var dataAttr = 'data-' + dashedNamespace;
    var dataAttrElems = document.querySelectorAll( '[' + dataAttr + ']' );
    var jsDashElems = document.querySelectorAll( '.js-' + dashedNamespace );
    var elems = utils.makeArray( dataAttrElems )
      .concat( utils.makeArray( jsDashElems ) );
    var dataOptionsAttr = dataAttr + '-options';
    var jQuery = window.jQuery;

    elems.forEach( function( elem ) {
      var attr = elem.getAttribute( dataAttr ) ||
        elem.getAttribute( dataOptionsAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' + elem.className +
          ': ' + error );
        }
        return;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('namespace')
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    });

  });
};

// -----  ----- //

return utils;

}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Flickity main
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(4),
      __webpack_require__(6),
      __webpack_require__(0),
      __webpack_require__(25),
      __webpack_require__(26),
      __webpack_require__(27)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter, getSize, utils, Cell, Slide, animatePrototype ) {
      return factory( window, EvEmitter, getSize, utils, Cell, Slide, animatePrototype );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./cell'),
      require('./slide'),
      require('./animate')
    );
  } else {
    // browser global
    var _Flickity = window.Flickity;

    window.Flickity = factory(
      window,
      window.EvEmitter,
      window.getSize,
      window.fizzyUIUtils,
      _Flickity.Cell,
      _Flickity.Slide,
      _Flickity.animatePrototype
    );
  }

}( window, function factory( window, EvEmitter, getSize,
  utils, Cell, Slide, animatePrototype ) {

'use strict';

// vars
var jQuery = window.jQuery;
var getComputedStyle = window.getComputedStyle;
var console = window.console;

function moveElements( elems, toElem ) {
  elems = utils.makeArray( elems );
  while ( elems.length ) {
    toElem.appendChild( elems.shift() );
  }
}

// -------------------------- Flickity -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Flickity intances
var instances = {};

function Flickity( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for Flickity: ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // do not initialize twice on same element
  if ( this.element.flickityGUID ) {
    var instance = instances[ this.element.flickityGUID ];
    instance.option( options );
    return instance;
  }

  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }
  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // kick things off
  this._create();
}

Flickity.defaults = {
  accessibility: true,
  // adaptiveHeight: false,
  cellAlign: 'center',
  // cellSelector: undefined,
  // contain: false,
  freeScrollFriction: 0.075, // friction when free-scrolling
  friction: 0.28, // friction when selecting
  namespaceJQueryEvents: true,
  // initialIndex: 0,
  percentPosition: true,
  resize: true,
  selectedAttraction: 0.025,
  setGallerySize: true
  // watchCSS: false,
  // wrapAround: false
};

// hash of methods triggered on _create()
Flickity.createMethods = [];

var proto = Flickity.prototype;
// inherit EventEmitter
utils.extend( proto, EvEmitter.prototype );

proto._create = function() {
  // add id for Flickity.data
  var id = this.guid = ++GUID;
  this.element.flickityGUID = id; // expando
  instances[ id ] = this; // associate via id
  // initial properties
  this.selectedIndex = 0;
  // how many frames slider has been in same position
  this.restingFrames = 0;
  // initial physics properties
  this.x = 0;
  this.velocity = 0;
  this.originSide = this.options.rightToLeft ? 'right' : 'left';
  // create viewport & slider
  this.viewport = document.createElement('div');
  this.viewport.className = 'flickity-viewport';
  this._createSlider();

  if ( this.options.resize || this.options.watchCSS ) {
    window.addEventListener( 'resize', this );
  }

  // add listeners from on option
  for ( var eventName in this.options.on ) {
    var listener = this.options.on[ eventName ];
    this.on( eventName, listener );
  }

  Flickity.createMethods.forEach( function( method ) {
    this[ method ]();
  }, this );

  if ( this.options.watchCSS ) {
    this.watchCSS();
  } else {
    this.activate();
  }

};

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  utils.extend( this.options, opts );
};

proto.activate = function() {
  if ( this.isActive ) {
    return;
  }
  this.isActive = true;
  this.element.classList.add('flickity-enabled');
  if ( this.options.rightToLeft ) {
    this.element.classList.add('flickity-rtl');
  }

  this.getSize();
  // move initial cell elements so they can be loaded as cells
  var cellElems = this._filterFindCellElements( this.element.children );
  moveElements( cellElems, this.slider );
  this.viewport.appendChild( this.slider );
  this.element.appendChild( this.viewport );
  // get cells from children
  this.reloadCells();

  if ( this.options.accessibility ) {
    // allow element to focusable
    this.element.tabIndex = 0;
    // listen for key presses
    this.element.addEventListener( 'keydown', this );
  }

  this.emitEvent('activate');
  this.selectInitialIndex();
  // flag for initial activation, for using initialIndex
  this.isInitActivated = true;
  // ready event. #493
  this.dispatchEvent('ready');
};

// slider positions the cells
proto._createSlider = function() {
  // slider element does all the positioning
  var slider = document.createElement('div');
  slider.className = 'flickity-slider';
  slider.style[ this.originSide ] = 0;
  this.slider = slider;
};

proto._filterFindCellElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.cellSelector );
};

// goes through all children
proto.reloadCells = function() {
  // collection of item elements
  this.cells = this._makeCells( this.slider.children );
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
};

/**
 * turn elements into Flickity.Cells
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Flickity Cells
 */
proto._makeCells = function( elems ) {
  var cellElems = this._filterFindCellElements( elems );

  // create new Flickity for collection
  var cells = cellElems.map( function( cellElem ) {
    return new Cell( cellElem, this );
  }, this );

  return cells;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.getLastSlide = function() {
  return this.slides[ this.slides.length - 1 ];
};

// positions all cells
proto.positionCells = function() {
  // size all cells
  this._sizeCells( this.cells );
  // position all cells
  this._positionCells( 0 );
};

/**
 * position certain cells
 * @param {Integer} index - which cell to start with
 */
proto._positionCells = function( index ) {
  index = index || 0;
  // also measure maxCellHeight
  // start 0 if positioning all cells
  this.maxCellHeight = index ? this.maxCellHeight || 0 : 0;
  var cellX = 0;
  // get cellX
  if ( index > 0 ) {
    var startCell = this.cells[ index - 1 ];
    cellX = startCell.x + startCell.size.outerWidth;
  }
  var len = this.cells.length;
  for ( var i=index; i < len; i++ ) {
    var cell = this.cells[i];
    cell.setPosition( cellX );
    cellX += cell.size.outerWidth;
    this.maxCellHeight = Math.max( cell.size.outerHeight, this.maxCellHeight );
  }
  // keep track of cellX for wrap-around
  this.slideableWidth = cellX;
  // slides
  this.updateSlides();
  // contain slides target
  this._containSlides();
  // update slidesWidth
  this.slidesWidth = len ? this.getLastSlide().target - this.slides[0].target : 0;
};

/**
 * cell.getSize() on multiple cells
 * @param {Array} cells
 */
proto._sizeCells = function( cells ) {
  cells.forEach( function( cell ) {
    cell.getSize();
  });
};

// --------------------------  -------------------------- //

proto.updateSlides = function() {
  this.slides = [];
  if ( !this.cells.length ) {
    return;
  }

  var slide = new Slide( this );
  this.slides.push( slide );
  var isOriginLeft = this.originSide == 'left';
  var nextMargin = isOriginLeft ? 'marginRight' : 'marginLeft';

  var canCellFit = this._getCanCellFit();

  this.cells.forEach( function( cell, i ) {
    // just add cell if first cell in slide
    if ( !slide.cells.length ) {
      slide.addCell( cell );
      return;
    }

    var slideWidth = ( slide.outerWidth - slide.firstMargin ) +
      ( cell.size.outerWidth - cell.size[ nextMargin ] );

    if ( canCellFit.call( this, i, slideWidth ) ) {
      slide.addCell( cell );
    } else {
      // doesn't fit, new slide
      slide.updateTarget();

      slide = new Slide( this );
      this.slides.push( slide );
      slide.addCell( cell );
    }
  }, this );
  // last slide
  slide.updateTarget();
  // update .selectedSlide
  this.updateSelectedSlide();
};

proto._getCanCellFit = function() {
  var groupCells = this.options.groupCells;
  if ( !groupCells ) {
    return function() {
      return false;
    };
  } else if ( typeof groupCells == 'number' ) {
    // group by number. 3 -> [0,1,2], [3,4,5], ...
    var number = parseInt( groupCells, 10 );
    return function( i ) {
      return ( i % number ) !== 0;
    };
  }
  // default, group by width of slide
  // parse '75%
  var percentMatch = typeof groupCells == 'string' &&
    groupCells.match(/^(\d+)%$/);
  var percent = percentMatch ? parseInt( percentMatch[1], 10 ) / 100 : 1;
  return function( i, slideWidth ) {
    return slideWidth <= ( this.size.innerWidth + 1 ) * percent;
  };
};

// alias _init for jQuery plugin .flickity()
proto._init =
proto.reposition = function() {
  this.positionCells();
  this.positionSliderAtSelected();
};

proto.getSize = function() {
  this.size = getSize( this.element );
  this.setCellAlign();
  this.cursorPosition = this.size.innerWidth * this.cellAlign;
};

var cellAlignShorthands = {
  // cell align, then based on origin side
  center: {
    left: 0.5,
    right: 0.5
  },
  left: {
    left: 0,
    right: 1
  },
  right: {
    right: 0,
    left: 1
  }
};

proto.setCellAlign = function() {
  var shorthand = cellAlignShorthands[ this.options.cellAlign ];
  this.cellAlign = shorthand ? shorthand[ this.originSide ] : this.options.cellAlign;
};

proto.setGallerySize = function() {
  if ( this.options.setGallerySize ) {
    var height = this.options.adaptiveHeight && this.selectedSlide ?
      this.selectedSlide.height : this.maxCellHeight;
    this.viewport.style.height = height + 'px';
  }
};

proto._getWrapShiftCells = function() {
  // only for wrap-around
  if ( !this.options.wrapAround ) {
    return;
  }
  // unshift previous cells
  this._unshiftCells( this.beforeShiftCells );
  this._unshiftCells( this.afterShiftCells );
  // get before cells
  // initial gap
  var gapX = this.cursorPosition;
  var cellIndex = this.cells.length - 1;
  this.beforeShiftCells = this._getGapCells( gapX, cellIndex, -1 );
  // get after cells
  // ending gap between last cell and end of gallery viewport
  gapX = this.size.innerWidth - this.cursorPosition;
  // start cloning at first cell, working forwards
  this.afterShiftCells = this._getGapCells( gapX, 0, 1 );
};

proto._getGapCells = function( gapX, cellIndex, increment ) {
  // keep adding cells until the cover the initial gap
  var cells = [];
  while ( gapX > 0 ) {
    var cell = this.cells[ cellIndex ];
    if ( !cell ) {
      break;
    }
    cells.push( cell );
    cellIndex += increment;
    gapX -= cell.size.outerWidth;
  }
  return cells;
};

// ----- contain ----- //

// contain cell targets so no excess sliding
proto._containSlides = function() {
  if ( !this.options.contain || this.options.wrapAround || !this.cells.length ) {
    return;
  }
  var isRightToLeft = this.options.rightToLeft;
  var beginMargin = isRightToLeft ? 'marginRight' : 'marginLeft';
  var endMargin = isRightToLeft ? 'marginLeft' : 'marginRight';
  var contentWidth = this.slideableWidth - this.getLastCell().size[ endMargin ];
  // content is less than gallery size
  var isContentSmaller = contentWidth < this.size.innerWidth;
  // bounds
  var beginBound = this.cursorPosition + this.cells[0].size[ beginMargin ];
  var endBound = contentWidth - this.size.innerWidth * ( 1 - this.cellAlign );
  // contain each cell target
  this.slides.forEach( function( slide ) {
    if ( isContentSmaller ) {
      // all cells fit inside gallery
      slide.target = contentWidth * this.cellAlign;
    } else {
      // contain to bounds
      slide.target = Math.max( slide.target, beginBound );
      slide.target = Math.min( slide.target, endBound );
    }
  }, this );
};

// -----  ----- //

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
proto.dispatchEvent = function( type, event, args ) {
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery && this.$element ) {
    // default trigger with type if no event
    type += this.options.namespaceJQueryEvents ? '.flickity' : '';
    var $event = type;
    if ( event ) {
      // create jQuery event
      var jQEvent = jQuery.Event( event );
      jQEvent.type = type;
      $event = jQEvent;
    }
    this.$element.trigger( $event, args );
  }
};

// -------------------------- select -------------------------- //

/**
 * @param {Integer} index - index of the slide
 * @param {Boolean} isWrap - will wrap-around to last/first if at the end
 * @param {Boolean} isInstant - will immediately set position at selected cell
 */
proto.select = function( index, isWrap, isInstant ) {
  if ( !this.isActive ) {
    return;
  }
  index = parseInt( index, 10 );
  this._wrapSelect( index );

  if ( this.options.wrapAround || isWrap ) {
    index = utils.modulo( index, this.slides.length );
  }
  // bail if invalid index
  if ( !this.slides[ index ] ) {
    return;
  }
  var prevIndex = this.selectedIndex;
  this.selectedIndex = index;
  this.updateSelectedSlide();
  if ( isInstant ) {
    this.positionSliderAtSelected();
  } else {
    this.startAnimation();
  }
  if ( this.options.adaptiveHeight ) {
    this.setGallerySize();
  }
  // events
  this.dispatchEvent( 'select', null, [ index ] );
  // change event if new index
  if ( index != prevIndex ) {
    this.dispatchEvent( 'change', null, [ index ] );
  }
  // old v1 event name, remove in v3
  this.dispatchEvent('cellSelect');
};

// wraps position for wrapAround, to move to closest slide. #113
proto._wrapSelect = function( index ) {
  var len = this.slides.length;
  var isWrapping = this.options.wrapAround && len > 1;
  if ( !isWrapping ) {
    return index;
  }
  var wrapIndex = utils.modulo( index, len );
  // go to shortest
  var delta = Math.abs( wrapIndex - this.selectedIndex );
  var backWrapDelta = Math.abs( ( wrapIndex + len ) - this.selectedIndex );
  var forewardWrapDelta = Math.abs( ( wrapIndex - len ) - this.selectedIndex );
  if ( !this.isDragSelect && backWrapDelta < delta ) {
    index += len;
  } else if ( !this.isDragSelect && forewardWrapDelta < delta ) {
    index -= len;
  }
  // wrap position so slider is within normal area
  if ( index < 0 ) {
    this.x -= this.slideableWidth;
  } else if ( index >= len ) {
    this.x += this.slideableWidth;
  }
};

proto.previous = function( isWrap, isInstant ) {
  this.select( this.selectedIndex - 1, isWrap, isInstant );
};

proto.next = function( isWrap, isInstant ) {
  this.select( this.selectedIndex + 1, isWrap, isInstant );
};

proto.updateSelectedSlide = function() {
  var slide = this.slides[ this.selectedIndex ];
  // selectedIndex could be outside of slides, if triggered before resize()
  if ( !slide ) {
    return;
  }
  // unselect previous selected slide
  this.unselectSelectedSlide();
  // update new selected slide
  this.selectedSlide = slide;
  slide.select();
  this.selectedCells = slide.cells;
  this.selectedElements = slide.getCellElements();
  // HACK: selectedCell & selectedElement is first cell in slide, backwards compatibility
  // Remove in v3?
  this.selectedCell = slide.cells[0];
  this.selectedElement = this.selectedElements[0];
};

proto.unselectSelectedSlide = function() {
  if ( this.selectedSlide ) {
    this.selectedSlide.unselect();
  }
};

proto.selectInitialIndex = function() {
  var initialIndex = this.options.initialIndex;
  // already activated, select previous selectedIndex
  if ( this.isInitActivated ) {
    this.select( this.selectedIndex, false, true );
    return;
  }
  // select with selector string
  if ( initialIndex && typeof initialIndex == 'string' ) {
    var cell = this.queryCell( initialIndex );
    if ( cell ) {
      this.selectCell( initialIndex, false, true );
      return;
    }
  }

  var index = 0;
  // select with number
  if ( initialIndex && this.slides[ initialIndex ] ) {
    index = initialIndex;
  }
  // select instantly
  this.select( index, false, true );
};

/**
 * select slide from number or cell element
 * @param {Element or Number} elem
 */
proto.selectCell = function( value, isWrap, isInstant ) {
  // get cell
  var cell = this.queryCell( value );
  if ( !cell ) {
    return;
  }

  var index = this.getCellSlideIndex( cell );
  this.select( index, isWrap, isInstant );
};

proto.getCellSlideIndex = function( cell ) {
  // get index of slides that has cell
  for ( var i=0; i < this.slides.length; i++ ) {
    var slide = this.slides[i];
    var index = slide.cells.indexOf( cell );
    if ( index != -1 ) {
      return i;
    }
  }
};

// -------------------------- get cells -------------------------- //

/**
 * get Flickity.Cell, given an Element
 * @param {Element} elem
 * @returns {Flickity.Cell} item
 */
proto.getCell = function( elem ) {
  // loop through cells to get the one that matches
  for ( var i=0; i < this.cells.length; i++ ) {
    var cell = this.cells[i];
    if ( cell.element == elem ) {
      return cell;
    }
  }
};

/**
 * get collection of Flickity.Cells, given Elements
 * @param {Element, Array, NodeList} elems
 * @returns {Array} cells - Flickity.Cells
 */
proto.getCells = function( elems ) {
  elems = utils.makeArray( elems );
  var cells = [];
  elems.forEach( function( elem ) {
    var cell = this.getCell( elem );
    if ( cell ) {
      cells.push( cell );
    }
  }, this );
  return cells;
};

/**
 * get cell elements
 * @returns {Array} cellElems
 */
proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

/**
 * get parent cell from an element
 * @param {Element} elem
 * @returns {Flickit.Cell} cell
 */
proto.getParentCell = function( elem ) {
  // first check if elem is cell
  var cell = this.getCell( elem );
  if ( cell ) {
    return cell;
  }
  // try to get parent cell elem
  elem = utils.getParent( elem, '.flickity-slider > *' );
  return this.getCell( elem );
};

/**
 * get cells adjacent to a slide
 * @param {Integer} adjCount - number of adjacent slides
 * @param {Integer} index - index of slide to start
 * @returns {Array} cells - array of Flickity.Cells
 */
proto.getAdjacentCellElements = function( adjCount, index ) {
  if ( !adjCount ) {
    return this.selectedSlide.getCellElements();
  }
  index = index === undefined ? this.selectedIndex : index;

  var len = this.slides.length;
  if ( 1 + ( adjCount * 2 ) >= len ) {
    return this.getCellElements();
  }

  var cellElems = [];
  for ( var i = index - adjCount; i <= index + adjCount ; i++ ) {
    var slideIndex = this.options.wrapAround ? utils.modulo( i, len ) : i;
    var slide = this.slides[ slideIndex ];
    if ( slide ) {
      cellElems = cellElems.concat( slide.getCellElements() );
    }
  }
  return cellElems;
};

/**
 * select slide from number or cell element
 * @param {Element, Selector String, or Number} selector
 */
proto.queryCell = function( selector ) {
  if ( typeof selector == 'number' ) {
    // use number as index
    return this.cells[ selector ];
  }
  if ( typeof selector == 'string' ) {
    // do not select invalid selectors from hash: #123, #/. #791
    if ( selector.match(/^[#\.]?[\d\/]/) ) {
      return;
    }
    // use string as selector, get element
    selector = this.element.querySelector( selector );
  }
  // get cell from element
  return this.getCell( selector );
};

// -------------------------- events -------------------------- //

proto.uiChange = function() {
  this.emitEvent('uiChange');
};

// keep focus on element when child UI elements are clicked
proto.childUIPointerDown = function( event ) {
  // HACK iOS does not allow touch events to bubble up?!
  if ( event.type != 'touchstart' ) {
    event.preventDefault();
  }
  this.focus();
};

// ----- resize ----- //

proto.onresize = function() {
  this.watchCSS();
  this.resize();
};

utils.debounceMethod( Flickity, 'onresize', 150 );

proto.resize = function() {
  if ( !this.isActive ) {
    return;
  }
  this.getSize();
  // wrap values
  if ( this.options.wrapAround ) {
    this.x = utils.modulo( this.x, this.slideableWidth );
  }
  this.positionCells();
  this._getWrapShiftCells();
  this.setGallerySize();
  this.emitEvent('resize');
  // update selected index for group slides, instant
  // TODO: position can be lost between groups of various numbers
  var selectedElement = this.selectedElements && this.selectedElements[0];
  this.selectCell( selectedElement, false, true );
};

// watches the :after property, activates/deactivates
proto.watchCSS = function() {
  var watchOption = this.options.watchCSS;
  if ( !watchOption ) {
    return;
  }

  var afterContent = getComputedStyle( this.element, ':after' ).content;
  // activate if :after { content: 'flickity' }
  if ( afterContent.indexOf('flickity') != -1 ) {
    this.activate();
  } else {
    this.deactivate();
  }
};

// ----- keydown ----- //

// go previous/next if left/right keys pressed
proto.onkeydown = function( event ) {
  // only work if element is in focus
  var isNotFocused = document.activeElement && document.activeElement != this.element;
  if ( !this.options.accessibility ||isNotFocused ) {
    return;
  }

  var handler = Flickity.keyboardHandlers[ event.keyCode ];
  if ( handler ) {
    handler.call( this );
  }
};

Flickity.keyboardHandlers = {
  // left arrow
  37: function() {
    var leftMethod = this.options.rightToLeft ? 'next' : 'previous';
    this.uiChange();
    this[ leftMethod ]();
  },
  // right arrow
  39: function() {
    var rightMethod = this.options.rightToLeft ? 'previous' : 'next';
    this.uiChange();
    this[ rightMethod ]();
  },
};

// ----- focus ----- //

proto.focus = function() {
  // TODO remove scrollTo once focus options gets more support
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#Browser_compatibility
  var prevScrollY = window.pageYOffset;
  this.element.focus({ preventScroll: true });
  // hack to fix scroll jump after focus, #76
  if ( window.pageYOffset != prevScrollY ) {
    window.scrollTo( window.pageXOffset, prevScrollY );
  }
};

// -------------------------- destroy -------------------------- //

// deactivate all Flickity functionality, but keep stuff available
proto.deactivate = function() {
  if ( !this.isActive ) {
    return;
  }
  this.element.classList.remove('flickity-enabled');
  this.element.classList.remove('flickity-rtl');
  this.unselectSelectedSlide();
  // destroy cells
  this.cells.forEach( function( cell ) {
    cell.destroy();
  });
  this.element.removeChild( this.viewport );
  // move child elements back into element
  moveElements( this.slider.children, this.element );
  if ( this.options.accessibility ) {
    this.element.removeAttribute('tabIndex');
    this.element.removeEventListener( 'keydown', this );
  }
  // set flags
  this.isActive = false;
  this.emitEvent('deactivate');
};

proto.destroy = function() {
  this.deactivate();
  window.removeEventListener( 'resize', this );
  this.allOff();
  this.emitEvent('destroy');
  if ( jQuery && this.$element ) {
    jQuery.removeData( this.element, 'flickity' );
  }
  delete this.element.flickityGUID;
  delete instances[ this.guid ];
};

// -------------------------- prototype -------------------------- //

utils.extend( proto, animatePrototype );

// -------------------------- extras -------------------------- //

/**
 * get Flickity instance from element
 * @param {Element} elem
 * @returns {Flickity}
 */
Flickity.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.flickityGUID;
  return id && instances[ id ];
};

utils.htmlInit( Flickity, 'flickity' );

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'flickity', Flickity );
}

// set internal jQuery, for Webpack + jQuery v3, #478
Flickity.setJQuery = function( jq ) {
  jQuery = jq;
};

Flickity.Cell = Cell;
Flickity.Slide = Slide;

return Flickity;

}));


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( true ) {
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
		return jQuery;
	}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * EvEmitter v1.1.0
 * Lil' event emitter
 * MIT License
 */

/* jshint unused: true, undef: true, strict: true */

( function( global, factory ) {
  // universal module definition
  /* jshint strict: false */ /* globals define, module, window */
  if ( true ) {
    // AMD - RequireJS
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS - Browserify, Webpack
    module.exports = factory();
  } else {
    // Browser globals
    global.EvEmitter = factory();
  }

}( typeof window != 'undefined' ? window : this, function() {

"use strict";

function EvEmitter() {}

var proto = EvEmitter.prototype;

proto.on = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // set events hash
  var events = this._events = this._events || {};
  // set listeners array
  var listeners = events[ eventName ] = events[ eventName ] || [];
  // only add once
  if ( listeners.indexOf( listener ) == -1 ) {
    listeners.push( listener );
  }

  return this;
};

proto.once = function( eventName, listener ) {
  if ( !eventName || !listener ) {
    return;
  }
  // add event
  this.on( eventName, listener );
  // set once flag
  // set onceEvents hash
  var onceEvents = this._onceEvents = this._onceEvents || {};
  // set onceListeners object
  var onceListeners = onceEvents[ eventName ] = onceEvents[ eventName ] || {};
  // set flag
  onceListeners[ listener ] = true;

  return this;
};

proto.off = function( eventName, listener ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  var index = listeners.indexOf( listener );
  if ( index != -1 ) {
    listeners.splice( index, 1 );
  }

  return this;
};

proto.emitEvent = function( eventName, args ) {
  var listeners = this._events && this._events[ eventName ];
  if ( !listeners || !listeners.length ) {
    return;
  }
  // copy over to avoid interference if .off() in listener
  listeners = listeners.slice(0);
  args = args || [];
  // once stuff
  var onceListeners = this._onceEvents && this._onceEvents[ eventName ];

  for ( var i=0; i < listeners.length; i++ ) {
    var listener = listeners[i]
    var isOnce = onceListeners && onceListeners[ listener ];
    if ( isOnce ) {
      // remove listener
      // remove before trigger to prevent recursion
      this.off( eventName, listener );
      // unset once flag
      delete onceListeners[ listener ];
    }
    // trigger listener
    listener.apply( this, args );
  }

  return this;
};

proto.allOff = function() {
  delete this._events;
  delete this._onceEvents;
};

return EvEmitter;

}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unipointer v2.3.0
 * base class for doing one thing with pointer event
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */ /*global define, module, require */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(4)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter ) {
      return factory( window, EvEmitter );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('ev-emitter')
    );
  } else {
    // browser global
    window.Unipointer = factory(
      window,
      window.EvEmitter
    );
  }

}( window, function factory( window, EvEmitter ) {

'use strict';

function noop() {}

function Unipointer() {}

// inherit EvEmitter
var proto = Unipointer.prototype = Object.create( EvEmitter.prototype );

proto.bindStartEvent = function( elem ) {
  this._bindStartEvent( elem, true );
};

proto.unbindStartEvent = function( elem ) {
  this._bindStartEvent( elem, false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd - remove if falsey
 */
proto._bindStartEvent = function( elem, isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';

  // default to mouse events
  var startEvent = 'mousedown';
  if ( window.PointerEvent ) {
    // Pointer Events
    startEvent = 'pointerdown';
  } else if ( 'ontouchstart' in window ) {
    // Touch Events. iOS Safari
    startEvent = 'touchstart';
  }
  elem[ bindMethod ]( startEvent, this );
};

// trigger handler methods for events
proto.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
proto.getTouch = function( touches ) {
  for ( var i=0; i < touches.length; i++ ) {
    var touch = touches[i];
    if ( touch.identifier == this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  // dismiss clicks from right or middle buttons
  var button = event.button;
  if ( button && ( button !== 0 && button !== 1 ) ) {
    return;
  }
  this._pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this._pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this._pointerDown( event, event );
};

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto._pointerDown = function( event, pointer ) {
  // dismiss right click and other pointers
  // button = 0 is okay, 1-4 not
  if ( event.button || this.isPointerDown ) {
    return;
  }

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
};

proto.pointerDown = function( event, pointer ) {
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// hash of events to be bound after start event
var postStartEvents = {
  mousedown: [ 'mousemove', 'mouseup' ],
  touchstart: [ 'touchmove', 'touchend', 'touchcancel' ],
  pointerdown: [ 'pointermove', 'pointerup', 'pointercancel' ],
};

proto._bindPostStartEvents = function( event ) {
  if ( !event ) {
    return;
  }
  // get proper events to match start event
  var events = postStartEvents[ event.type ];
  // bind events to node
  events.forEach( function( eventName ) {
    window.addEventListener( eventName, this );
  }, this );
  // save these arguments
  this._boundPointerEvents = events;
};

proto._unbindPostStartEvents = function() {
  // check for _boundEvents, in case dragEnd triggered twice (old IE8 bug)
  if ( !this._boundPointerEvents ) {
    return;
  }
  this._boundPointerEvents.forEach( function( eventName ) {
    window.removeEventListener( eventName, this );
  }, this );

  delete this._boundPointerEvents;
};

// ----- move event ----- //

proto.onmousemove = function( event ) {
  this._pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerMove( event, event );
  }
};

proto.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerMove( event, touch );
  }
};

/**
 * pointer move
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerMove = function( event, pointer ) {
  this.pointerMove( event, pointer );
};

// public
proto.pointerMove = function( event, pointer ) {
  this.emitEvent( 'pointerMove', [ event, pointer ] );
};

// ----- end event ----- //


proto.onmouseup = function( event ) {
  this._pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerUp( event, event );
  }
};

proto.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerUp( event, touch );
  }
};

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerUp = function( event, pointer ) {
  this._pointerDone();
  this.pointerUp( event, pointer );
};

// public
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
};

// ----- pointer done ----- //

// triggered on pointer up & pointer cancel
proto._pointerDone = function() {
  this._pointerReset();
  this._unbindPostStartEvents();
  this.pointerDone();
};

proto._pointerReset = function() {
  // reset properties
  this.isPointerDown = false;
  delete this.pointerIdentifier;
};

proto.pointerDone = noop;

// ----- pointer cancel ----- //

proto.onpointercancel = function( event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this._pointerCancel( event, event );
  }
};

proto.ontouchcancel = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this._pointerCancel( event, touch );
  }
};

/**
 * pointer cancel
 * @param {Event} event
 * @param {Event or Touch} pointer
 * @private
 */
proto._pointerCancel = function( event, pointer ) {
  this._pointerDone();
  this.pointerCancel( event, pointer );
};

// public
proto.pointerCancel = function( event, pointer ) {
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// -----  ----- //

// utility function for getting x/y coords from event
Unipointer.getPointerPoint = function( pointer ) {
  return {
    x: pointer.pageX,
    y: pointer.pageY
  };
};

// -----  ----- //

return Unipointer;

}));


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * getSize v2.0.3
 * measure size of elements
 * MIT license
 */

/* jshint browser: true, strict: true, undef: true, unused: true */
/* globals console: false */

( function( window, factory ) {
  /* jshint strict: false */ /* globals define, module */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.getSize = factory();
  }

})( window, function factory() {
'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') == -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console == 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

var measurementsLength = measurements.length;

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}

// -------------------------- getStyle -------------------------- //

/**
 * getStyle, get style of element, check for Firefox bug
 * https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function getStyle( elem ) {
  var style = getComputedStyle( elem );
  if ( !style ) {
    logError( 'Style returned ' + style +
      '. Are you running this code in a hidden iframe on Firefox? ' +
      'See https://bit.ly/getsizebug1' );
  }
  return style;
}

// -------------------------- setup -------------------------- //

var isSetup = false;

var isBoxSizeOuter;

/**
 * setup
 * check isBoxSizerOuter
 * do on first getSize() rather than on page load for Firefox bug
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  // -------------------------- box sizing -------------------------- //

  /**
   * Chrome & Safari measure the outer-width on style.width on border-box elems
   * IE11 & Firefox<29 measures the inner-width
   */
  var div = document.createElement('div');
  div.style.width = '200px';
  div.style.padding = '1px 2px 3px 4px';
  div.style.borderStyle = 'solid';
  div.style.borderWidth = '1px 2px 3px 4px';
  div.style.boxSizing = 'border-box';

  var body = document.body || document.documentElement;
  body.appendChild( div );
  var style = getStyle( div );
  // round value for browser zoom. desandro/masonry#928
  isBoxSizeOuter = Math.round( getStyleSize( style.width ) ) == 200;
  getSize.isBoxSizeOuter = isBoxSizeOuter;

  body.removeChild( div );
}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem == 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem != 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display == 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = style.boxSizing == 'border-box';

  // get all measurements
  for ( var i=0; i < measurementsLength; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

return getSize;

});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_scss__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__css_main_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__css_main_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_vendor_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_vendor_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__js_vendor_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_app_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_app_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__js_app_js__);





/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(13)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js??ref--2-3!./main.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--2-1!../../node_modules/postcss-loader/lib/index.js??ref--2-2!../../node_modules/sass-loader/lib/loader.js??ref--2-3!./main.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports
exports.i(__webpack_require__(10), "");
exports.i(__webpack_require__(11), "");
exports.i(__webpack_require__(12), "");

// module
exports.push([module.i, "/*! normalize.css v3.0.0 | MIT License | git.io/normalize */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined in IE 8/9.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background: transparent; }\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\na:active,\na:hover {\n  outline: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted; }\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold; }\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000; }\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\nimg {\n  border: 0; }\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0; }\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto; }\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */ }\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10.\n */\nbutton {\n  overflow: visible; }\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8+, and Opera\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none; }\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */ }\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal; }\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box; }\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Remove default vertical scrollbar in IE 8/9.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold; }\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\nbutton {\n  border: 0;\n  background: none;\n  padding: 0; }\n  button:focus {\n    outline: none; }\n\ninput:focus {\n  outline: none;\n  -webkit-box-shadow: none;\n          box-shadow: none; }\n\n/* ==========================================================================\n   Config Variables\n   ========================================================================== */\n/* $title-font: Menlo, Monaco, Consolas, \"Courier New\", monospace !default; */\n/* Base-Colours */\n/* body background colour */\n/* base content colour */\n/* Primary Colour */\n/* primary colour */\n/* Secondary Colour */\n/* secondary colour */\n/* Grey Shades */\n/* dark grey */\n/* light grey */\n/* Interaction Colours */\n/*\n    *\n    *    Colour Palette\n    *\n    */\n/* ==========================================================================\nMixins\n========================================================================== */\n/*--- Centering Elements ---*/\n/*--- Grid Elements ---*/\n/*--- List Elements ---*/\n/*--- Media Queries ---*/\n/*--- If Responsive: Show mq-breakpoints ---*/\nbody:before {\n  content: \"0\";\n  position: fixed;\n  bottom: 0px;\n  left: 0;\n  font-weight: 600;\n  font-size: 2em;\n  opacity: 0.3;\n  color: #FFF;\n  background-color: #000;\n  line-height: 100%;\n  z-index: 50001;\n  padding: .05em .2em;\n  border-top-right-radius: 3px; }\n\n@media only screen and (min-width: 480px) {\n  body:before {\n    content: \"thumb\"; } }\n\n@media only screen and (min-width: 560px) {\n  body:before {\n    content: \"handheld\"; } }\n\n@media only screen and (min-width: 768px) {\n  body:before {\n    content: \"lap\"; } }\n\n@media only screen and (min-width: 1024px) {\n  body:before {\n    content: \"desk\"; } }\n\n@media only screen and (min-width: 1248px) {\n  body:before {\n    content: \"widescreen\"; } }\n\n@media only screen and (min-width: 1440px) {\n  body:before {\n    content: \"widescreen-hd\"; } }\n\n/* ==========================================================================\n   Wrappers\n   ========================================================================== */\n.wrapper {\n  max-width: 1240px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0 auto;\n  padding-left: 25px;\n  padding-right: 25px; }\n\n.wrapper--flex {\n  display: block; }\n  @media only screen and (min-width: 1024px) {\n    .wrapper--flex {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; } }\n\n/* .wrapper {\n    max-width: 1366px;\n    margin: 0 5%;\n    width: auto;\n    box-sizing: border-box;\n\n    @include mq(handheld) {\n        margin: 0 10%;\n    }\n\n    @include mq(desk) {\n        padding: 0 2rem;\n        margin: 0 auto;\n    }\n\n    &--flex {\n        @extend .wrapper;\n        @include flex-justify;\n        flex-wrap: wrap;\n    }\n    &--medium {\n        max-width: 1140px;\n    }\n    &--medium.cards {\n        margin: 0 auto !important;\n    }\n} */\n/* ==========================================================================\n   Utilities\n   ========================================================================== */\n.container {\n  padding-top: 50px;\n  padding-bottom: 50px; }\n  @media only screen and (min-width: 1024px) {\n    .container {\n      padding-top: 175px;\n      padding-bottom: 175px; } }\n\n/* ==========================================================================\n   Body\n   ========================================================================== */\n/*  */\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow: auto;\n  /* box-sizing: border-box; */ }\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle; }\n\n/* ==========================================================================\n   Extra class names\n   ========================================================================== */\n/* H2 - EXTRA CLASS TO MAKE BIGGER */\n.block-title--h2 {\n  font-size: 36px;\n  margin: 30px 0; }\n\n/* SUBTITLE - FOR ABOVE HEADINGS */\n.subtitle {\n  color: #444;\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: uppercase;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.subtitle-dash {\n  width: 20px;\n  border: 2px solid #444;\n  margin: 0 20px 0 0;\n  border-radius: 2px; }\n\n.subtitle h4 {\n  margin: 0; }\n\n/* BODY Text */\np {\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 400; }\n\n.par-text--s {\n  color: #888; }\n\n/* 3rd Party Override */\n.flickity-viewport {\n  height: 100%; }\n\n.flickity-button {\n  background: #999 !important;\n  /* transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91); */\n  -webkit-box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, .2);\n          box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, .2); }\n\n.flickity-prev-next-button .flickity-button-icon {\n  color: white !important;\n  padding: 5px; }\n\n/* ==========================================================================\n   Core Fonts\n   ========================================================================== */\n/* ==========================================================================\n   Grid\n   ========================================================================== */\n.flex-grid {\n  margin: 0 auto;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n  .flex-grid__col {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    display: block; }\n  .flex-grid__item {\n    -ms-flex-preferred-size: 100px;\n        flex-basis: 100px;\n    -webkit-box-flex: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1; }\n\n.row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap; }\n  .row .col {\n    position: relative;\n    width: auto;\n    -ms-flex-preferred-size: 10%;\n        flex-basis: 10%;\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1; }\n    .row .col-m3 {\n      margin: 0 0.5em; }\n\nbody {\n  font-size: 12pt;\n  line-height: 1.25em;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  text-align: left;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #444; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  color: #444;\n  line-height: 120%; }\n\nh1 {\n  font-size: 38px;\n  line-height: 1.1; }\n\nh2 {\n  font-size: 27px;\n  line-height: 1.2; }\n\nh3 {\n  font-size: 20px;\n  line-height: 160%; }\n\nh4 {\n  font-size: 14px;\n  line-height: 1.25em; }\n\np {\n  font-size: 16px;\n  line-height: 160%;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Droid Sans, Helvetica Neue, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; }\n  @media only screen and (min-width: 560px) {\n    p {\n      font-size: 17px; } }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:hover {\n    cursor: pointer; }\n\n.btn {\n  padding: 12px 16px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, .1);\n          box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, .1);\n  outline: none;\n  font-weight: 500;\n  /* Primary Coloured Buttons */\n  /* Secondary Coloured Buttons */ }\n  .btn--p-solid {\n    border: none;\n    background: #444;\n    color: #f3f3f3; }\n  .btn--s-solid {\n    border: none;\n    background: #888;\n    color: #f3f3f3; }\n  .btn--s-border {\n    border: 2px solid #888;\n    background: #f3f3f3;\n    color: #888; }\n\n.item--margin-right {\n  margin-right: 16px; }\n\n.page-title {\n  top: -22px;\n  position: relative; }\n\n.page-title__container {\n  border-radius: 5px;\n  background-color: #333;\n  display: inline-block;\n  padding: 8px 16px; }\n\n.page-title__title {\n  color: #fff;\n  /* secondary */\n  font-size: 22px;\n  text-transform: uppercase; }\n\nh3 {\n  margin: 0; }\n\n/*\n*    hamburger styling, containing:\n*        - hamburger class\n*        - each line styling\n*        - hamburger animation\n*        - media queries\n*/\n.hamburger {\n  display: block;\n  cursor: pointer;\n  width: auto;\n  float: right;\n  z-index: 9999;\n  position: relative; }\n  @media only screen and (min-width: 480px) {\n    .hamburger {\n      margin: auto; } }\n\n.line {\n  width: 30px;\n  height: 2px;\n  max-width: 100%;\n  background-color: #fff;\n  margin: 6px 0;\n  -webkit-transition: 0.4s;\n  transition: 0.4s; }\n\n.toggle-ico-active:nth-child(1) {\n  -webkit-transform: rotate(-45deg) translate(-4.5px, 6px);\n  transform: rotate(-45deg) translate(-4.5px, 6px); }\n  @media only screen and (min-width: 768px) {\n    .toggle-ico-active:nth-child(1) {\n      background-color: #fff; } }\n\n.toggle-ico-active:nth-child(2) {\n  opacity: 0; }\n\n.toggle-ico-active:nth-child(3) {\n  -webkit-transform: rotate(45deg) translate(-5px, -7px);\n  transform: rotate(45deg) translate(-5px, -7px); }\n  @media only screen and (min-width: 768px) {\n    .toggle-ico-active:nth-child(3) {\n      background-color: #fff; } }\n\n.bordered-image {\n  border: 1px solid gainsboro;\n  padding: 5px;\n  background: #f2f2f2;\n  display: block;\n  position: relative;\n  overflow: hidden; }\n\n.bordered-image caption {\n  color: #333;\n  font-size: 10px; }\n\n.glb-footer {\n  width: 100%;\n  background: gainsboro; }\n\n.glb-footer-nav {\n  display: block;\n  margin-top: 35px; }\n  @media only screen and (min-width: 560px) {\n    .glb-footer-nav {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-pack: space-evenly;\n          -ms-flex-pack: space-evenly;\n              justify-content: space-evenly; } }\n  @media only screen and (min-width: 1024px) {\n    .glb-footer-nav {\n      margin-top: 0; } }\n\n.glb-footer-nav > .site-nav__list {\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  width: auto;\n  max-width: 100%; }\n  @media only screen and (min-width: 560px) {\n    .glb-footer-nav > .site-nav__list {\n      max-width: 35%; } }\n\n.glb-footer-logo {\n  display: block;\n  margin: 0 0 30px; }\n\n.glb-footer-content {\n  width: 100%; }\n  @media only screen and (min-width: 1024px) {\n    .glb-footer-content {\n      width: 30%; } }\n\n.glb-footer-content p {\n  margin: 0;\n  padding: 0;\n  font-size: 14px; }\n\n.glb-credits {\n  background-color: #cac9c9;\n  padding: 16px 0;\n  color: #ebebeb; }\n\n.glb-credits p {\n  margin: 0;\n  font-size: 14px;\n  text-align: center; }\n\n/* Header SCSS */\n.glb-header {\n  width: 100%; }\n  .glb-header--floating {\n    position: absolute;\n    padding-top: 50px; }\n  .glb-header--solid {\n    background-color: #444;\n    color: white;\n    padding: 32px 0; }\n  .glb-header a {\n    font-size: 18px;\n    color: white;\n    text-decoration: none; }\n  .glb-header-nav > .site-nav__list {\n    display: none; }\n    @media only screen and (min-width: 1024px) {\n      .glb-header-nav > .site-nav__list {\n        display: -webkit-box;\n        display: -ms-flexbox;\n        display: flex; } }\n  .glb-header-nav > .hamburger {\n    display: block; }\n    @media only screen and (min-width: 1024px) {\n      .glb-header-nav > .hamburger {\n        display: none; } }\n  .glb-header .wrapper--flex {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center; }\n\n/* Site Nav: Header+Footer */\n.site-nav {\n  display: block;\n  width: auto;\n  max-width: 768px;\n  margin: 0 0 0 auto;\n  font-weight: 600;\n  padding-left: 50px; }\n  .site-nav__list {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    text-align: left;\n    margin-top: 30px; }\n    @media only screen and (min-width: 560px) {\n      .site-nav__list {\n        margin-top: 0; } }\n  .site-nav__subtitle {\n    padding-bottom: 5px;\n    font-weight: 600; }\n  .site-nav__item {\n    margin-right: 25px;\n    margin-bottom: 10px;\n    display: inline-block; }\n    .site-nav__item p {\n      font-size: 14px;\n      margin: 0 0 10px; }\n    @media only screen and (min-width: 1024px) {\n      .site-nav__item {\n        margin-left: 25px;\n        margin-right: 0; } }\n  .site-nav__link {\n    font-family: 'Source Sans Pro', sans-serif; }\n\nnav ul, nav li {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n/*\n*    main css for this project, containing:\n*        - slidenav\n*        - navigation content\n*        - media queries\n*/\n/* slidenav hidden until activated by clicking on sidepanel */\n.slidenav {\n  height: 100vh;\n  max-width: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: -100%;\n  background-color: #fff;\n  -webkit-transition: 250ms;\n  transition: 250ms;\n  /* transition effect to slide in the sidenav */\n  z-index: 9998;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  overflow-y: auto; }\n  @media only screen and (min-width: 560px) {\n    .slidenav {\n      top: 0;\n      left: -100%;\n      width: 0;\n      height: 100vh;\n      position: absolute;\n      overflow-x: hidden;\n      /* Disable horizontal scroll */\n      -webkit-box-shadow: none;\n              box-shadow: none;\n      -webkit-box-shadow: 8px 0 10px rgba(0, 0, 0, .1);\n              box-shadow: 8px 0 10px rgba(0, 0, 0, .1); } }\n  @media only screen and (min-width: 1024px) {\n    .slidenav {\n      display: none; } }\n  .slidenav__portal {\n    padding: 50px 25px;\n    background-color: #fff;\n    width: 100%;\n    -ms-flex-item-align: baseline;\n        align-self: baseline;\n    margin: auto 0 0 0; }\n    .slidenav__portal a {\n      color: #fff;\n      font-weight: 600;\n      font-size: 12.8px;\n      font-size: .8rem;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex; }\n      .slidenav__portal a span {\n        margin-left: 16px;\n        margin-left: 1rem; }\n    .slidenav__portal:hover, .slidenav__portal:hover a, .slidenav__portal:hover .social-link__icon {\n      color: #999;\n      cursor: pointer; }\n  .slidenav__nav {\n    display: block;\n    list-style: none;\n    margin: 0;\n    padding: 0 70px 50px 35px; }\n  .slidenav__list {\n    display: block;\n    list-style: none;\n    margin: 0;\n    padding: 35px 0 60px; }\n  .slidenav__item {\n    display: block;\n    margin: 25px 0;\n    width: 100%; }\n  .slidenav__link {\n    color: #444;\n    font-size: 22px;\n    font-weight: 600;\n    text-decoration: none;\n    display: block; }\n    .slidenav__link:hover {\n      color: #999; }\n  .slidenav .subtitle {\n    font-size: 14px;\n    font-weight: 700;\n    color: #999; }\n\n.current {\n  font-style: italic;\n  color: #fff; }\n\n.slidenav .site-logo {\n  padding: 25px 35px;\n  display: block;\n  width: 100%;\n  background-color: #444; }\n  .slidenav .site-logo img {\n    width: 100%;\n    height: auto;\n    max-width: 176px; }\n\n/* CSS for javascript */\n.toggle-menu {\n  height: 100vh;\n  left: 0; }\n  @media only screen and (min-width: 768px) {\n    .toggle-menu {\n      width: auto;\n      min-width: 325px; } }\n\n.main-body--active {\n  position: relative;\n  overflow: hidden;\n  height: 100vh; }\n\n/* Main Layout */\n.banner {\n  position: relative;\n  z-index: -1;\n  height: 600px;\n  width: 100%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center; }\n\n.banner__container {\n  height: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background: rgba(0, 0, 0, .3); }\n\n.banner__text {\n  text-align: left;\n  width: 100%; }\n\n.banner__title {\n  font-size: 32px;\n  max-width: 460px;\n  color: white;\n  text-shadow: 0 4px 8px rgba(0, 0, 0, .2); }\n\n.banner--large {\n  height: 800px; }\n\n.banner__title--large {\n  font-size: 48px;\n  font-size: 3rem;\n  padding-bottom: 30px;\n  border-bottom: 5px solid #888; }\n\n/* ==========================================================================\n   Blocks\n   ========================================================================== */\n.block {\n  max-width: 100%;\n  width: 100%;\n  position: relative; }\n  .block__actions {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    position: relative;\n    margin-top: 30px; }\n\n.testimonial-block {\n  width: 100%;\n  position: relative;\n  height: auto;\n  top: 50px; }\n  .testimonial-block__strip {\n    height: 325px;\n    background: #444;\n    width: 100%;\n    position: absolute;\n    margin-top: 50px; }\n\n.testimonial-slider__quote {\n  font-size: 16px;\n  font-weight: 600;\n  font-style: italic;\n  color: #444; }\n  @media only screen and (min-width: 768px) {\n    .testimonial-slider__quote {\n      font-size: 20px; } }\n\n.testimonial-slider__job {\n  font-size: 18px;\n  font-weight: 600;\n  color: #444;\n  margin: 32px 0 0; }\n\n.testimonial-slider__company {\n  font-size: 16px;\n  font-weight: 600;\n  font-style: italic;\n  color: #444;\n  margin: 16px 0 0; }\n\n.testimonial-slider__container {\n  background: gainsboro;\n  border: 2px solid #888;\n  height: 425px;\n  position: relative;\n  max-width: 90%; }\n  @media only screen and (min-width: 1248px) {\n    .testimonial-slider__container {\n      max-width: 1140px; } }\n\n.testimonial-slider__slider {\n  position: relative;\n  height: 100%;\n  padding: 25px 75px;\n  margin: 0 -60px; }\n\n.testimonial-slider__item {\n  margin: 0 15%;\n  padding: 50px 0;\n  text-align: center;\n  width: 100%;\n  max-width: 768px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 100%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column; }\n  @media only screen and (min-width: 1248px) {\n    .testimonial-slider__item {\n      padding: 75px 0; } }\n\n.testimonial-slider__content {\n  margin: auto; }\n\n.brands-slider {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  min-height: 500px;\n  position: relative; }\n  .brands-slider-block {\n    position: relative; }\n  .brands-slider__container {\n    width: auto; }\n    .brands-slider__container .flickity-viewport {\n      height: 250px !important; }\n  .brands-slider__item {\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    background-color: #fff;\n    border: 1px solid #dcdcdc;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    height: 100%;\n    padding: 75px;\n    width: 90%;\n    -webkit-box-shadow: 0 6px 15px rgba(36, 37, 38, .08);\n            box-shadow: 0 6px 15px rgba(36, 37, 38, .08); }\n    .brands-slider__item.is-selected {\n      transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);\n      -webkit-box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, .2);\n              box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, .2);\n      z-index: 2; }\n    @media only screen and (min-width: 560px) {\n      .brands-slider__item {\n        width: 50%; } }\n    @media only screen and (min-width: 1024px) {\n      .brands-slider__item {\n        width: 30%; } }\n    @media only screen and (min-width: 1440px) {\n      .brands-slider__item {\n        width: 20%; } }\n  .brands-slider__logo {\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n    height: auto;\n    margin: auto;\n    max-height: 100%;\n    position: relative;\n    width: 200px; }\n\n.casestudy {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n  min-height: 550px;\n  width: 100%; }\n  .casestudy__container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    vertical-align: middle;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: auto;\n    max-width: 400px;\n    background-color: gainsboro;\n    height: auto;\n    min-height: 550px;\n    margin: 0 0 0 auto;\n    position: relative; }\n  .casestudy__content {\n    display: block;\n    padding: 50px;\n    -ms-flex-item-align: center;\n        align-self: center;\n    margin: auto 0; }\n\n.casestudy {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n  min-height: 550px;\n  width: 100%; }\n  .casestudy__container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    vertical-align: middle;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    width: auto;\n    max-width: 400px;\n    background-color: gainsboro;\n    height: auto;\n    min-height: 550px;\n    margin: 0 0 0 auto;\n    position: relative; }\n  .casestudy__content {\n    display: block;\n    padding: 50px;\n    -ms-flex-item-align: center;\n        align-self: center;\n    margin: auto 0; }\n\n/* ==========================================================================\n   Hero Slider Block\n   ========================================================================== */\n.hero-slider {\n  background: pink;\n  height: 600px;\n  position: relative; }\n\n.text-block {\n  background-color: white; }\n  .text-block--bgsecondary {\n    background-color: #999; }\n  .text-block__list {\n    padding: 30px 50px;\n    border: 2px solid #444; }\n  .text-block__item {\n    line-height: 140%;\n    margin-bottom: 10px;\n    font-size: 14px;\n    font-weight: 600; }\n    .text-block__item:last-child {\n      margin-bottom: 0; }\n  .text-block__sidebar {\n    width: 350px;\n    margin: 50px auto; }\n    @media only screen and (min-width: 1024px) {\n      .text-block__sidebar {\n        width: 25%;\n        margin-left: 10%; } }\n  .text-block__body {\n    padding-top: 30px; }\n  .text-block__content, .text-block__content--large {\n    min-width: 50%;\n    width: auto;\n    display: block;\n    margin-top: 75px; }\n    .text-block__content--large {\n      width: 100%;\n      margin-top: 0; }\n      @media only screen and (min-width: 1024px) {\n        .text-block__content--large {\n          width: 65%; } }\n    .text-block__content p, .text-block__content--large p {\n      margin: 30px auto 0 auto; }\n      .text-block__content p:first-child, .text-block__content--large p:first-child {\n        margin: 0 auto; }\n    @media only screen and (min-width: 1024px) {\n      .text-block__content, .text-block__content--large {\n        margin-top: 0; } }\n", "", {"version":3,"sources":["/Users/kirstynoble/Sites/ifm.com/src/css/setup/helpers/_normalize.scss","/Users/kirstynoble/Sites/ifm.com/src/css/main.scss","/Users/kirstynoble/Sites/ifm.com/src/css/setup/helpers/_reset.scss","/Users/kirstynoble/Sites/ifm.com/src/css/setup/_variables.scss","/Users/kirstynoble/Sites/ifm.com/src/css/tools/_mixins.scss","/Users/kirstynoble/Sites/ifm.com/src/css/tools/_wrappers.scss","/Users/kirstynoble/Sites/ifm.com/src/css/tools/_utilities.scss","/Users/kirstynoble/Sites/ifm.com/src/css/core/_body.scss","/Users/kirstynoble/Sites/ifm.com/src/css/core/_extra.scss","/Users/kirstynoble/Sites/ifm.com/src/css/core/_fonts.scss","/Users/kirstynoble/Sites/ifm.com/src/css/core/_grid.scss","/Users/kirstynoble/Sites/ifm.com/src/css/core/_typography.scss","/Users/kirstynoble/Sites/ifm.com/src/css/elements/_btns.scss","/Users/kirstynoble/Sites/ifm.com/src/css/elements/_page-title.scss","/Users/kirstynoble/Sites/ifm.com/src/css/elements/_hamburger.scss","/Users/kirstynoble/Sites/ifm.com/src/css/elements/_image.scss","/Users/kirstynoble/Sites/ifm.com/src/css/components/_footer.scss","/Users/kirstynoble/Sites/ifm.com/src/css/components/_header.scss","/Users/kirstynoble/Sites/ifm.com/src/css/components/_site-nav.scss","/Users/kirstynoble/Sites/ifm.com/src/css/components/_slidenav.scss","/Users/kirstynoble/Sites/ifm.com/src/css/layouts/_main.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_banner.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_blocks.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_testimonials.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_brands-slider.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_feature.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_hero-slider.scss","/Users/kirstynoble/Sites/ifm.com/src/css/blocks/_text.scss"],"names":[],"mappings":"AAAA,4DAA4D;AAE5D;;;;GAIG;AAEH;EACE,wBAAuB;EAAE,OAAO;EAChC,2BAA0B;EAAE,OAAO;EACnC,+BAA8B;EAAE,OAAO,EACxC;;AAED;;GAEG;AAEH;EACE,UAAS,EACV;;AAED;gFACgF;AAEhF;;GAEG;AAEH;;;;;;;;;;;;EAYE,eAAc,EACf;;AAED;;;GAGG;AAEH;;;;EAIE,sBAAqB;EAAE,OAAO;EAC9B,yBAAwB;EAAE,OAAO,EAClC;;AAED;;;GAGG;AAEH;EACE,cAAa;EACb,UAAS,EACV;;AAED;;;GAGG;ACHH;;EDOE,cAAa,EACd;;AAED;gFACgF;AAEhF;;GAEG;AAEH;EACE,wBAAuB,EACxB;;AAED;;GAEG;AAEH;;EAEE,WAAU,EACX;;AAED;gFACgF;AAEhF;;GAEG;AAEH;EACE,0BAAyB,EAC1B;;AAED;;GAEG;AAEH;;EAEE,kBAAiB,EAClB;;AAED;;GAEG;AAEH;EACE,mBAAkB,EACnB;;AAED;;;GAGG;AAEH;EACE,eAAc;EACd,iBAAgB,EACjB;;AAED;;GAEG;AAEH;EACE,iBAAgB;EAChB,YAAW,EACZ;;AAED;;GAEG;AAEH;EACE,eAAc,EACf;;AAED;;GAEG;AAEH;;EAEE,eAAc;EACd,eAAc;EACd,mBAAkB;EAClB,yBAAwB,EACzB;;AAED;EACE,YAAW,EACZ;;AAED;EACE,gBAAe,EAChB;;AAED;gFACgF;AAEhF;;GAEG;AAEH;EACE,UAAS,EACV;;AAED;;GAEG;AAEH;EACE,iBAAgB,EACjB;;AAED;gFACgF;AAEhF;;GAEG;AAEH;EACE,iBAAgB,EACjB;;AAED;;GAEG;AAEH;EAEE,gCAAuB;UAAvB,wBAAuB;EACvB,UAAS,EACV;;AAED;;GAEG;AAEH;EACE,eAAc,EACf;;AAED;;GAEG;AAEH;;;;EAIE,kCAAiC;EACjC,eAAc,EACf;;AAED;gFACgF;AAEhF;;;GAGG;AAEH;;;;;GAKG;AAEH;;;;;EAKE,eAAc;EAAE,OAAO;EACvB,cAAa;EAAE,OAAO;EACtB,UAAS;EAAE,OAAO,EACnB;;AAED;;GAEG;AAEH;EACE,kBAAiB,EAClB;;AAED;;;;;GAKG;AAEH;;EAEE,qBAAoB,EACrB;;AAED;;;;;;GAMG;AAEH;;;;EAIE,2BAA0B;EAAE,OAAO;EACnC,gBAAe;EAAE,OAAO,EACzB;;AAED;;GAEG;AAEH;;EAEE,gBAAe,EAChB;;AAED;;GAEG;AAEH;;EAEE,UAAS;EACT,WAAU,EACX;;AAED;;;GAGG;AAEH;EACE,oBAAmB,EACpB;;AAED;;;;;;GAMG;AAEH;;EAEE,+BAAsB;UAAtB,uBAAsB;EAAE,OAAO;EAC/B,WAAU;EAAE,OAAO,EACpB;;AAED;;;;GAIG;AAEH;;EAEE,aAAY,EACb;;AAED;;;;GAIG;AAEH;EACE,8BAA6B;EAAE,OAAO;EAEtC,gCAA+B;EAAE,OAAO;EACxC,wBAAuB,EACxB;;AAED;;;;GAIG;AAEH;;EAEE,yBAAwB,EACzB;;AAED;;GAEG;AAEH;EACE,0BAAyB;EACzB,cAAa;EACb,+BAA8B,EAC/B;;AAED;;;GAGG;AAEH;EACE,UAAS;EAAE,OAAO;EAClB,WAAU;EAAE,OAAO,EACpB;;AAED;;GAEG;AAEH;EACE,eAAc,EACf;;AAED;;;GAGG;AAEH;EACE,kBAAiB,EAClB;;AAED;gFACgF;AAEhF;;GAEG;AAEH;EACE,0BAAyB;EACzB,kBAAiB,EAClB;;AAED;;EAEE,WAAU,EACX;;AAjKD;EEhQI,UAAS;EACT,iBAAgB;EAChB,WAAU,EAKb;EARD;IAMQ,cAAa,EAChB;;AAGL;EAEQ,cAAa;EACb,yBAAgB;UAAhB,iBAAgB,EACnB;;AClBL;;gFAEgF;AAa5E,8EAA8E;AAQ9E,kBAAkB;AAC8B,4BAA4B;AAC5B,yBAAyB;AAEzE,oBAAoB;AACyB,oBAAoB;AAEjE,sBAAsB;AACuB,sBAAsB;AAEnE,iBAAiB;AAC+B,eAAe;AACb,gBAAgB;AAElE,yBAAyB;AAMzB;;;;MAIE;AC/CN;;6EAE6E;AAE7E,8BAA8B;AAQ9B,yBAAyB;AAuBzB,yBAAyB;AAQzB,yBAAyB;AAuBrB,8CAA8C;AAI1C;EACI,aAAW;EACX,gBAAc;EACd,YAAU;EACV,QAAM;EACN,iBAAe;EACf,eAAa;EACb,aAAW;EACX,YAAU;EACV,uBAAqB;EACrB,kBAAgB;EAChB,eAAa;EACb,oBAAmB;EACnB,6BAA4B,EAC/B;;AAzBG;EAWJ;IAmBY,iBAAmB,EACtB,EAAA;;AA/BL;EAWJ;IAmBY,oBAAmB,EACtB,EAAA;;AA/BL;EAWJ;IAmBY,eAAmB,EACtB,EAAA;;AA/BL;EAWJ;IAmBY,gBAAmB,EACtB,EAAA;;AA/BL;EAWJ;IAmBY,sBAAmB,EACtB,EAAA;;AA/BL;EAWJ;IAmBY,yBAAmB,EACtB,EAAA;;AC1FjB;;gFAEgF;AAGhF;EACI,kBAAiB;EACjB,+BAAsB;UAAtB,uBAAsB;EACtB,eAAc;EACd,mBAAkB;EAClB,oBAAmB,EACtB;;AAED;EACI,eAAc,EAKjB;EDwCW;IC9CZ;MAIQ,qBAAa;MAAb,qBAAa;MAAb,cAAa,EAEpB,EAAA;;AAGD;;;;;;;;;;;;;;;;;;;;;;;;;;IA0BI;AChDJ;;gFAEgF;AAEhF;EACI,kBAAiB;EACjB,qBAAoB,EAMvB;EF+CW;IEvDZ;MAKO,mBAAkB;MAClB,sBAAqB,EAE3B,EAAA;;ACZD;;gFAEgF;AAE5E,MAAM;AASN;;;EAGC,+BAAsB;UAAtB,uBAAsB,EACtB;;APCL;EOEO,UAAS;EACT,WAAU;EACV,eAAc;EACd,6BAA6B,EAC/B;;AP2JL;EOxJQ,aAAY;EACZ,gBAAe;EACf,uBAAsB,EACzB;;AC9BL;;gFAEgF;AAEhF,qCAAqC;AACrC;EACG,gBAAe;EACf,eAAc,EAChB;;AAED,mCAAmC;AAEnC;EACG,YAAW;EACX,gBAAe;EACf,iBAAgB;EAChB,0BAAyB;EACzB,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,0BAAmB;MAAnB,uBAAmB;UAAnB,oBAAmB,EACrB;;AACD;EACG,YAAW;EACX,uBAAsB;EACtB,mBAAkB;EAClB,mBAAkB,EACpB;;AACD;EACG,UAAS,EACX;;AAGD,eAAe;AACf;EACG,gBAAe;EACf,kBAAiB;EACjB,iBAAgB,EAClB;;AAED;EACG,YAAW,EACb;;AAGD,wBAAwB;AAExB;EACI,aAAY,EACf;;AAED;EACI,4BAAgC;EAChC,6HAA6H;EAC7H,0DAAkD;UAAlD,kDAAkD,EACrD;;AACD;EACI,wBAAuB;EACvB,aAAY,EACf;;ACzDD;;gFAEgF;ACFhF;;gFAEgF;AAEhF;EACG,eAAc;EACd,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,oBAAe;MAAf,gBAAe,EAWjB;EATE;IACI,oBAAO;QAAP,YAAO;YAAP,QAAO;IACP,eAAc,EACjB;EAED;IACI,+BAAiB;QAAjB,kBAAiB;IACjB,oBAAY;QAAZ,qBAAY;YAAZ,aAAY,EACf;;AAGJ;EACI,qBAAoB;EAEpB,qBAAoB;EAEpB,cAAa;EACb,oBAAe;MAAf,gBAAe,EAalB;EAnBD;IASQ,mBAAkB;IAElB,YAAW;IACX,6BAAe;QAAf,gBAAe;IACf,oBAAO;QAAP,YAAO;YAAP,QAAO,EAKV;IAlBL;MAgBY,gBAAe,EAClB;;AVnBT;EWbQ,gBAAe;EACf,oBAAmB;EACnB,uQRCqK;EQArK,iBAAgB;EAChB,eAAc;EACd,oCAAmC;EACnC,mCAAkC;EAClC,YRgBW,EQfd;;AAED;EACI,uQRRqK;EQSrK,YRWW;EQVX,kBAAiB,EACpB;;AX+GL;EWtGQ,gBAAe;EACf,iBAAgB,EACnB;;AAED;EACI,gBAAe;EACf,iBAAgB,EACnB;;AAED;EACI,gBAAe;EACf,kBAAiB,EACpB;;AAED;EACI,gBAAe;EACf,oBAAmB,EACtB;;AHbL;EGsBQ,gBAAe;EACf,kBAAiB;EACjB,uQRhDqK,EQqDxK;EPFO;II3BZ;MG2BY,gBAAe,EAEtB,EAAA;;AXuBL;EWpBQ,eAAc;EACd,sBAAqB,EAKxB;EAPD;IAKQ,gBAAe,EAClB;;ACpET;EACI,mBAAkB;EAClB,+BAAsB;UAAtB,uBAAsB;EACtB,sDAA2C;UAA3C,8CAA2C;EAC3C,cAAa;EACb,iBAAgB;EAEhB,8BAA8B;EAO9B,gCAAgC,EAYnC;EAlBG;IACI,aAAY;IACZ,iBAAgB;IAChB,eAAc,EACjB;EAGD;IACI,aAAY;IACZ,iBAAgB;IAChB,eAAc,EACjB;EAED;IACI,uBAAsB;IACtB,oBAAmB;IACnB,YAAW,EACd;;AAGL;EACI,mBAAkB,EACrB;;AC9BD;EACI,WAAU;EACV,mBAAkB,EACrB;;AAED;EACI,mBAAkB;EAClB,uBAAsB;EACtB,sBAAqB;EACrB,kBAAiB,EACpB;;AACD;EACI,YAAW;EAAE,eAAe;EAC5B,gBAAe;EACf,0BAAyB,EAC5B;;AFqBG;EElBA,UAAS,EACZ;;ACpBD;;;;;;EAME;AAEF;EACI,eAAc;EACd,gBAAe;EACf,YAAW;EACX,aAAY;EACZ,cAAa;EACb,mBAAkB,EAIrB;EVyCW;IUnDZ;MAQQ,aAAY,EAEnB,EAAA;;AAED;EACI,YAAW;EACX,YAAW;EACX,gBAAe;EACf,uBXAY;EWCZ,cAAa;EACb,yBAAgB;EAAhB,iBAAgB,EACnB;;AAED;EACI,yDAAwD;EACxD,iDAAgD,EAKnD;EVuBW;IU9BZ;MAKQ,uBXVQ,EWYf,EAAA;;AAED;EAAiC,WAAU,EAAG;;AAE9C;EACI,uDAAsD;EACtD,+CAA8C,EAKjD;EVYW;IUnBZ;MAKQ,uBXrBQ,EWuBf,EAAA;;AC/CD;EACI,4BAA2B;EAC3B,aAAY;EACZ,oBAAmB;EACnB,eAAc;EACd,mBAAkB;EAClB,iBAAgB,EACnB;;AAED;EACI,YAAW;EACX,gBAAe,EAClB;;ACZD;EACI,YAAW;EACX,sBAAqB,EACxB;;AAED;EACI,eAAc;EACd,iBAAgB,EAQnB;EZ4CW;IYtDZ;MAIQ,qBAAa;MAAb,qBAAa;MAAb,cAAa;MACb,+BAA6B;UAA7B,4BAA6B;cAA7B,8BAA6B,EAKpC,EAAA;EZ4CW;IYtDZ;MAQQ,cAAa,EAEpB,EAAA;;AAED;EACI,6BAAsB;EAAtB,8BAAsB;MAAtB,2BAAsB;UAAtB,uBAAsB;EACtB,YAAW;EACX,gBAAe,EAIlB;EZmCW;IY1CZ;MAKQ,eAAc,EAErB,EAAA;;AAED;EACI,eAAc;EACd,iBAAgB,EACnB;;AAED;EACI,YAAW,EAId;EZuBW;IY5BZ;MAGQ,WAAU,EAEjB,EAAA;;AACD;EACI,UAAS;EACT,WAAU;EACV,gBAAe,EAClB;;AAED;EACI,0BAAyB;EACzB,gBAAe;EACf,eAAc,EACjB;;AAED;EACI,UAAS;EACT,gBAAe;EACf,mBAAkB,EACrB;;ACrDD,iBAAiB;AAEjB;EACI,YAAW,EAqCd;EAnCG;IACI,mBAAkB;IAClB,kBAAiB,EACpB;EAED;IACI,uBAAsB;IACtB,aAAY;IACZ,gBAAe,EAClB;EAZL;IAeQ,gBAAe;IACf,aAAY;IACZ,sBAAqB,EACxB;EAEA;IAEO,cAAa,EAIhB;Ib+BG;MarCP;QAIW,qBAAa;QAAb,qBAAa;QAAb,cAAa,EAEpB,EAAA;EANJ;IAQO,eAAc,EAIjB;IbyBG;MarCP;QAUW,cAAa,EAEpB,EAAA;EAhCT;IAmCQ,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB,EACtB;;ACvCL,6BAA6B;AAC7B;EACI,eAAc;EACd,YAAW;EACX,iBAAgB;EAChB,mBAAkB;EAClB,iBAAgB;EAChB,mBAAkB,EAoCrB;EAlCG;IACI,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,iBAAgB;IAChB,iBAAgB,EAKnB;Id0CO;MclDR;QAKQ,cAAa,EAGpB,EAAA;EAED;IACI,oBAAmB;IACnB,iBAAgB,EACnB;EAED;IACI,mBAAkB;IAClB,oBAAmB;IACnB,sBAAqB,EAWxB;IAdA;MAMO,gBAAe;MACf,iBAAgB,EACnB;Id2BG;McnCR;QAWQ,kBAAiB;QACjB,gBAAe,EAEtB,EAAA;EAED;IACI,2CAA0C,EAC7C;;AAGL;EAEQ,iBAAgB;EAChB,UAAS;EACT,WAAU,EACb;;AClDL;;;;;EAKE;AAEF,8DAA8D;AAC9D;EACI,cAAa;EACb,gBAAe;EACf,YAAW;EACX,mBAAkB;EAClB,OAAM;EACN,YAAW;EACX,uBhBSY;EgBRZ,0BAAiB;EAAjB,kBAAiB;EAAE,+CAA+C;EAClE,cAAa;EACb,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,6BAAsB;EAAtB,8BAAsB;MAAtB,2BAAsB;UAAtB,uBAAsB;EACtB,iBAAgB,EA+EnB;EfxCW;IenDZ;MAeQ,OAAM;MACN,YAAW;MACX,SAAQ;MACR,cAAa;MACb,mBAAkB;MAClB,mBAAkB;MAAE,+BAA+B;MACnD,yBAAgB;cAAhB,iBAAgB;MAChB,iDAAyC;cAAzC,yCAAyC,EAqEhD,EAAA;EfxCW;IenDZ;MA0BQ,cAAa,EAiEpB,EAAA;EA/DG;IACI,mBAAkB;IAClB,uBhBdQ;IgBeR,YAAW;IACX,8BAAoB;QAApB,qBAAoB;IACpB,mBAAkB,EAmBrB;IAxBA;MAQO,YhBpBI;MgBqBJ,iBAAgB;MAChB,kBAAgB;MAAhB,iBAAgB;MAChB,0BAAyB;MACzB,oBAAmB;MACnB,qBAAa;MAAb,qBAAa;MAAb,cAAa,EAKhB;MAlBJ;QAgBW,kBAAiB;QAAjB,kBAAiB,EACpB;IAjBR;MAqBO,YhB1BO;MgB2BP,gBAAe,EAClB;EAGL;IACI,eAAc;IACd,iBAAgB;IAChB,UAAS;IACT,0BAAyB,EAC5B;EAED;IACI,eAAc;IACd,iBAAgB;IAChB,UAAS;IACT,qBAAoB,EACvB;EAED;IACI,eAAc;IACd,eAAc;IACd,YAAW,EACd;EAED;IACI,YhBvDW;IgBwDX,gBAAe;IACf,iBAAgB;IAChB,sBAAqB;IACrB,eAAc,EAKjB;IAVA;MAQO,YhB3DO,EgB4DV;EAnFT;IAuFQ,gBAAe;IACf,iBAAgB;IAChB,YhBlEW,EgBmEd;;AAGL;EACI,mBAAkB;EAClB,YhB/EY,EgBgFf;;AAED;EACI,mBAAkB;EAClB,eAAc;EACd,YAAW;EACX,uBhBlFe,EgByFlB;EAXD;IAOQ,YAAW;IACX,aAAY;IACZ,iBAAgB,EACnB;;AAIL,wBAAwB;AACxB;EACI,cAAa;EACb,QAAO,EAMV;EftEW;Ie8DZ;MAKQ,YAAW;MACX,iBAAgB,EAEvB,EAAA;;AAED;EACI,mBAAkB;EAClB,iBAAgB;EAChB,cAAa,EAChB;;ACvID,iBAAiB;ACCjB;EACI,mBAAkB;EAClB,YAAW;EACX,cAAa;EACb,YAAW;EACX,6BAA4B;EAC5B,uBAAsB;EACtB,4BAA2B,EAC9B;;AAED;EACI,aAAY;EACZ,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,0BAAmB;MAAnB,uBAAmB;UAAnB,oBAAmB;EACnB,8BAA8B,EACjC;;AAED;EACI,iBAAgB;EAChB,YAAW,EACd;;AAED;EACI,gBAAe;EACf,iBAAgB;EAChB,aAAY;EACZ,yCAAsC,EACzC;;AAED;EACI,cAAa,EAChB;;AACD;EACI,gBAAe;EAAf,gBAAe;EACf,qBAAoB;EACpB,8BAA6B,EAChC;;ACrCD;;gFAEgF;AAEhF;EACI,gBAAe;EACf,YAAW;EACX,mBAAkB,EAOrB;EALG;IACI,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,mBAAkB;IAClB,iBAAgB,EACnB;;ACZL;EACI,YAAW;EACX,mBAAkB;EAClB,aAAY;EACZ,UAAS,EAUZ;EARG;IACI,cAAa;IACb,iBAAgB;IAChB,YAAW;IACX,mBAAkB;IAClB,iBAAgB,EACnB;;AAMD;EACI,gBAAe;EACf,iBAAgB;EAChB,mBAAkB;EAClB,YpBKW,EoBDd;EnBgCO;ImBxCR;MAMQ,gBAAe,EAEtB,EAAA;;AACD;EACI,gBAAe;EACf,iBAAgB;EAChB,YpBHW;EoBIX,iBAAgB,EACnB;;AACD;EACI,gBAAe;EACf,iBAAgB;EAChB,mBAAkB;EAClB,YpBVW;EoBWX,iBAAgB,EACnB;;AAED;EACI,sBAAqB;EACrB,uBAAsB;EACtB,cAAa;EACb,mBAAkB;EAClB,eAAc,EAIjB;EnBQO;ImBjBR;MAOQ,kBAAiB,EAExB,EAAA;;AAED;EACI,mBAAkB;EAClB,aAAY;EACZ,mBAAkB;EAClB,gBAAe,EAClB;;AAED;EACI,cAAa;EACb,gBAAe;EACf,mBAAkB;EAClB,YAAW;EACX,iBAAgB;EAChB,qBAAa;EAAb,qBAAa;EAAb,cAAa;EACb,0BAAmB;MAAnB,uBAAmB;UAAnB,oBAAmB;EACnB,aAAY;EACZ,6BAAsB;EAAtB,8BAAsB;MAAtB,2BAAsB;UAAtB,uBAAsB,EAIzB;EnBdO;ImBCR;MAWQ,gBAAe,EAEtB,EAAA;;AAED;EACI,aAAY,EACf;;AC7EL;EACI,4BAA2B;EAC3B,6BAA4B;EAC5B,uBAAsB;EACtB,kBAAiB;EACjB,mBAAkB,EA+CrB;EA7CG;IACI,mBAAkB,EACrB;EAED;IACI,YAAW,EAEd;IAHA;MAEuB,yBAAwB,EAAG;EAGnD;IACI,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,uBAAsB;IACtB,0BAAyB;IACzB,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,aAAY;IACZ,cAAa;IACb,WAAU;IACV,qDAA4C;YAA5C,6CAA4C,EAgB/C;IAxBA;MAWO,uHAAsH;MACtH,0DAAkD;cAAlD,kDAAkD;MAClD,WAAU,EACb;IpB6BG;MoB3CR;QAgBQ,WAAU,EAQjB,EAAA;IpBmBO;MoB3CR;QAmBQ,WAAU,EAKjB,EAAA;IpBmBO;MoB3CR;QAsBQ,WAAU,EAEjB,EAAA;EAED;IACI,4BAA2B;IAC3B,6BAA4B;IAC5B,uBAAsB;IACtB,aAAY;IACZ,aAAY;IACZ,iBAAgB;IAChB,mBAAkB;IAClB,aAAY,EACf;;ACnDL;EACI,4BAA2B;EAC3B,6BAA4B;EAC5B,uBAAsB;EACtB,mBAAkB;EAClB,kBAAiB;EACjB,YAAW,EAqBd;EAnBG;IACI,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,uBAAsB;IACtB,6BAAsB;IAAtB,8BAAsB;QAAtB,2BAAsB;YAAtB,uBAAsB;IACtB,YAAW;IACX,iBAAgB;IAChB,4BAA2B;IAC3B,aAAY;IACZ,kBAAiB;IACjB,mBAAkB;IAClB,mBAAkB,EACrB;EACD;IACI,eAAc;IACd,cAAa;IACb,4BAAkB;QAAlB,mBAAkB;IAClB,eAAc,EACjB;;AA1BL;EACI,4BAA2B;EAC3B,6BAA4B;EAC5B,uBAAsB;EACtB,mBAAkB;EAClB,kBAAiB;EACjB,YAAW,EAqBd;EAnBG;IACI,qBAAa;IAAb,qBAAa;IAAb,cAAa;IACb,0BAAmB;QAAnB,uBAAmB;YAAnB,oBAAmB;IACnB,uBAAsB;IACtB,6BAAsB;IAAtB,8BAAsB;QAAtB,2BAAsB;YAAtB,uBAAsB;IACtB,YAAW;IACX,iBAAgB;IAChB,4BAA2B;IAC3B,aAAY;IACZ,kBAAiB;IACjB,mBAAkB;IAClB,mBAAkB,EACrB;EACD;IACI,eAAc;IACd,cAAa;IACb,4BAAkB;QAAlB,mBAAkB;IAClB,eAAc,EACjB;;AC1BL;;gFAEgF;AAEhF;EACI,iBAAgB;EAChB,cAAa;EACb,mBAAkB,EACrB;;ACPD;EACI,wBAAuB,EAmD1B;EAlDG;IACI,uBxB2BW,EwB1Bd;EACD;IACI,mBAAkB;IAClB,uBxBoBW,EwBnBd;EACD;IACI,kBAAiB;IACjB,oBAAmB;IACnB,gBAAe;IACf,iBAAgB,EAInB;IARA;MAMO,iBAAgB,EACnB;EAEL;IACI,aAAY;IACZ,kBAAiB,EAKpB;IvBiCO;MuBxCR;QAIQ,WAAU;QACV,iBAAgB,EAEvB,EAAA;EACD;IACI,kBAAiB,EACpB;EACD;IACI,eAAc;IACd,YAAW;IACX,eAAc;IACd,iBAAgB,EAkBnB;IAjBG;MAEI,YAAW;MACX,cAAa,EAIhB;MvBiBG;QuBxBJ;UAKQ,WAAU,EAEjB,EAAA;IAZJ;MAcO,yBAAwB,EAI3B;MAlBJ;QAgBW,eAAc,EACjB;IvBYD;MuB7BR;QAoBQ,cAAa,EAEpB,EAAA","file":"main.scss","sourcesContent":["/*! normalize.css v3.0.0 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  -ms-text-size-adjust: 100%; /* 2 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined in IE 8/9.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; /* 1 */\n  vertical-align: baseline; /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background: transparent;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit; /* 1 */\n  font: inherit; /* 2 */\n  margin: 0; /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8+, and Opera\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"], /* 1 */\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n  cursor: pointer; /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box; /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n","/*! normalize.css v3.0.0 | MIT License | git.io/normalize */\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n@import url(~jquery.mmenu/dist/jquery.mmenu.all.css);\n@import url(~flickity/dist/flickity.min.css);\n@import url(~slick-carousel/slick/slick.css);\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/**\n * Remove default margin.\n */\nbody {\n  margin: 0; }\n\n/* HTML5 display definitions\n   ========================================================================== */\n/**\n * Correct `block` display not defined in IE 8/9.\n */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nnav,\nsection,\nsummary {\n  display: block; }\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Address `[hidden]` styling not present in IE 8/9.\n * Hide the `template` element in IE, Safari, and Firefox < 22.\n */\n[hidden],\ntemplate {\n  display: none; }\n\n/* Links\n   ========================================================================== */\n/**\n * Remove the gray background color from active links in IE 10.\n */\na {\n  background: transparent; }\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\na:active,\na:hover {\n  outline: 0; }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * Address styling not present in IE 8/9, Safari 5, and Chrome.\n */\nabbr[title] {\n  border-bottom: 1px dotted; }\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari 5, and Chrome.\n */\nb,\nstrong {\n  font-weight: bold; }\n\n/**\n * Address styling not present in Safari 5 and Chrome.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari 5, and Chrome.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/**\n * Address styling not present in IE 8/9.\n */\nmark {\n  background: #ff0;\n  color: #000; }\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Remove border when inside `a` element in IE 8/9.\n */\nimg {\n  border: 0; }\n\n/**\n * Correct overflow displayed oddly in IE 9.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Address margin not present in IE 8/9 and Safari 5.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * Address differences between Firefox and other browsers.\n */\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0; }\n\n/**\n * Contain overflow in all browsers.\n */\npre {\n  overflow: auto; }\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\n/* Forms\n   ========================================================================== */\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari 5, and Chrome.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */ }\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10.\n */\nbutton {\n  overflow: visible; }\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8+, and Opera\n * Correct `select` style inheritance in Firefox.\n */\nbutton,\nselect {\n  text-transform: none; }\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */ }\n\n/**\n * Re-set default cursor for disabled elements.\n */\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\ninput {\n  line-height: normal; }\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari 5 and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari 5 and Chrome\n *    (include `-moz` to future-proof).\n */\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box; }\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * Define consistent border, margin, and padding.\n */\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Remove default vertical scrollbar in IE 8/9.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\noptgroup {\n  font-weight: bold; }\n\n/* Tables\n   ========================================================================== */\n/**\n * Remove most spacing between table cells.\n */\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n\nbutton {\n  border: 0;\n  background: none;\n  padding: 0; }\n  button:focus {\n    outline: none; }\n\ninput:focus {\n  outline: none;\n  box-shadow: none; }\n\n/* ==========================================================================\n   Config Variables\n   ========================================================================== */\n/* $title-font: Menlo, Monaco, Consolas, \"Courier New\", monospace !default; */\n/* Base-Colours */\n/* body background colour */\n/* base content colour */\n/* Primary Colour */\n/* primary colour */\n/* Secondary Colour */\n/* secondary colour */\n/* Grey Shades */\n/* dark grey */\n/* light grey */\n/* Interaction Colours */\n/*\n    *\n    *    Colour Palette\n    *\n    */\n/* ==========================================================================\nMixins\n========================================================================== */\n/*--- Centering Elements ---*/\n/*--- Grid Elements ---*/\n/*--- List Elements ---*/\n/*--- Media Queries ---*/\n/*--- If Responsive: Show mq-breakpoints ---*/\nbody:before {\n  content: \"0\";\n  position: fixed;\n  bottom: 0px;\n  left: 0;\n  font-weight: 600;\n  font-size: 2em;\n  opacity: 0.3;\n  color: #FFF;\n  background-color: #000;\n  line-height: 100%;\n  z-index: 50001;\n  padding: .05em .2em;\n  border-top-right-radius: 3px; }\n\n@media only screen and (min-width: 480px) {\n  body:before {\n    content: \"thumb\"; } }\n\n@media only screen and (min-width: 560px) {\n  body:before {\n    content: \"handheld\"; } }\n\n@media only screen and (min-width: 768px) {\n  body:before {\n    content: \"lap\"; } }\n\n@media only screen and (min-width: 1024px) {\n  body:before {\n    content: \"desk\"; } }\n\n@media only screen and (min-width: 1248px) {\n  body:before {\n    content: \"widescreen\"; } }\n\n@media only screen and (min-width: 1440px) {\n  body:before {\n    content: \"widescreen-hd\"; } }\n\n/* ==========================================================================\n   Wrappers\n   ========================================================================== */\n.wrapper {\n  max-width: 1240px;\n  box-sizing: border-box;\n  margin: 0 auto;\n  padding-left: 25px;\n  padding-right: 25px; }\n\n.wrapper--flex {\n  display: block; }\n  @media only screen and (min-width: 1024px) {\n    .wrapper--flex {\n      display: flex; } }\n\n/* .wrapper {\n    max-width: 1366px;\n    margin: 0 5%;\n    width: auto;\n    box-sizing: border-box;\n\n    @include mq(handheld) {\n        margin: 0 10%;\n    }\n\n    @include mq(desk) {\n        padding: 0 2rem;\n        margin: 0 auto;\n    }\n\n    &--flex {\n        @extend .wrapper;\n        @include flex-justify;\n        flex-wrap: wrap;\n    }\n    &--medium {\n        max-width: 1140px;\n    }\n    &--medium.cards {\n        margin: 0 auto !important;\n    }\n} */\n/* ==========================================================================\n   Utilities\n   ========================================================================== */\n.container {\n  padding-top: 50px;\n  padding-bottom: 50px; }\n  @media only screen and (min-width: 1024px) {\n    .container {\n      padding-top: 175px;\n      padding-bottom: 175px; } }\n\n/* ==========================================================================\n   Body\n   ========================================================================== */\n/*  */\n*,\n*::before,\n*::after {\n  box-sizing: border-box; }\n\nbody {\n  margin: 0;\n  padding: 0;\n  overflow: auto;\n  /* box-sizing: border-box; */ }\n\nimg {\n  height: auto;\n  max-width: 100%;\n  vertical-align: middle; }\n\n/* ==========================================================================\n   Extra class names\n   ========================================================================== */\n/* H2 - EXTRA CLASS TO MAKE BIGGER */\n.block-title--h2 {\n  font-size: 36px;\n  margin: 30px 0; }\n\n/* SUBTITLE - FOR ABOVE HEADINGS */\n.subtitle {\n  color: #444;\n  font-size: 16px;\n  font-weight: 600;\n  text-transform: uppercase;\n  display: flex;\n  align-items: center; }\n\n.subtitle-dash {\n  width: 20px;\n  border: 2px solid #444;\n  margin: 0 20px 0 0;\n  border-radius: 2px; }\n\n.subtitle h4 {\n  margin: 0; }\n\n/* BODY Text */\np {\n  font-size: 16px;\n  line-height: 24px;\n  font-weight: 400; }\n\n.par-text--s {\n  color: #888; }\n\n/* 3rd Party Override */\n.flickity-viewport {\n  height: 100%; }\n\n.flickity-button {\n  background: #999 !important;\n  /* transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91); */\n  box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, 0.2); }\n\n.flickity-prev-next-button .flickity-button-icon {\n  color: white !important;\n  padding: 5px; }\n\n/* ==========================================================================\n   Core Fonts\n   ========================================================================== */\n/* ==========================================================================\n   Grid\n   ========================================================================== */\n.flex-grid {\n  margin: 0 auto;\n  display: flex;\n  flex-wrap: wrap; }\n  .flex-grid__col {\n    flex: 1;\n    display: block; }\n  .flex-grid__item {\n    flex-basis: 100px;\n    flex-grow: 1; }\n\n.row {\n  display: -webkit-box;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: -webkit-flex;\n  display: flex;\n  flex-wrap: wrap; }\n  .row .col {\n    position: relative;\n    width: auto;\n    flex-basis: 10%;\n    flex: 1; }\n    .row .col-m3 {\n      margin: 0 0.5em; }\n\nbody {\n  font-size: 12pt;\n  line-height: 1.25em;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  text-align: left;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  color: #444; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n  color: #444;\n  line-height: 120%; }\n\nh1 {\n  font-size: 38px;\n  line-height: 1.1; }\n\nh2 {\n  font-size: 27px;\n  line-height: 1.2; }\n\nh3 {\n  font-size: 20px;\n  line-height: 160%; }\n\nh4 {\n  font-size: 14px;\n  line-height: 1.25em; }\n\np {\n  font-size: 16px;\n  line-height: 160%;\n  font-family: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif; }\n  @media only screen and (min-width: 560px) {\n    p {\n      font-size: 17px; } }\n\na {\n  color: inherit;\n  text-decoration: none; }\n  a:hover {\n    cursor: pointer; }\n\n.btn {\n  padding: 12px 16px;\n  box-sizing: border-box;\n  box-shadow: 1px 1px 3px 0px rgba(0, 0, 0, 0.1);\n  outline: none;\n  font-weight: 500;\n  /* Primary Coloured Buttons */\n  /* Secondary Coloured Buttons */ }\n  .btn--p-solid {\n    border: none;\n    background: #444;\n    color: #f3f3f3; }\n  .btn--s-solid {\n    border: none;\n    background: #888;\n    color: #f3f3f3; }\n  .btn--s-border {\n    border: 2px solid #888;\n    background: #f3f3f3;\n    color: #888; }\n\n.item--margin-right {\n  margin-right: 16px; }\n\n.page-title {\n  top: -22px;\n  position: relative; }\n\n.page-title__container {\n  border-radius: 5px;\n  background-color: #333;\n  display: inline-block;\n  padding: 8px 16px; }\n\n.page-title__title {\n  color: #fff;\n  /* secondary */\n  font-size: 22px;\n  text-transform: uppercase; }\n\nh3 {\n  margin: 0; }\n\n/*\n*    hamburger styling, containing:\n*        - hamburger class\n*        - each line styling\n*        - hamburger animation\n*        - media queries\n*/\n.hamburger {\n  display: block;\n  cursor: pointer;\n  width: auto;\n  float: right;\n  z-index: 9999;\n  position: relative; }\n  @media only screen and (min-width: 480px) {\n    .hamburger {\n      margin: auto; } }\n\n.line {\n  width: 30px;\n  height: 2px;\n  max-width: 100%;\n  background-color: #fff;\n  margin: 6px 0;\n  transition: 0.4s; }\n\n.toggle-ico-active:nth-child(1) {\n  -webkit-transform: rotate(-45deg) translate(-4.5px, 6px);\n  transform: rotate(-45deg) translate(-4.5px, 6px); }\n  @media only screen and (min-width: 768px) {\n    .toggle-ico-active:nth-child(1) {\n      background-color: #fff; } }\n\n.toggle-ico-active:nth-child(2) {\n  opacity: 0; }\n\n.toggle-ico-active:nth-child(3) {\n  -webkit-transform: rotate(45deg) translate(-5px, -7px);\n  transform: rotate(45deg) translate(-5px, -7px); }\n  @media only screen and (min-width: 768px) {\n    .toggle-ico-active:nth-child(3) {\n      background-color: #fff; } }\n\n.bordered-image {\n  border: 1px solid gainsboro;\n  padding: 5px;\n  background: #f2f2f2;\n  display: block;\n  position: relative;\n  overflow: hidden; }\n\n.bordered-image caption {\n  color: #333;\n  font-size: 10px; }\n\n.glb-footer {\n  width: 100%;\n  background: gainsboro; }\n\n.glb-footer-nav {\n  display: block;\n  margin-top: 35px; }\n  @media only screen and (min-width: 560px) {\n    .glb-footer-nav {\n      display: flex;\n      justify-content: space-evenly; } }\n  @media only screen and (min-width: 1024px) {\n    .glb-footer-nav {\n      margin-top: 0; } }\n\n.glb-footer-nav > .site-nav__list {\n  flex-direction: column;\n  width: auto;\n  max-width: 100%; }\n  @media only screen and (min-width: 560px) {\n    .glb-footer-nav > .site-nav__list {\n      max-width: 35%; } }\n\n.glb-footer-logo {\n  display: block;\n  margin: 0 0 30px; }\n\n.glb-footer-content {\n  width: 100%; }\n  @media only screen and (min-width: 1024px) {\n    .glb-footer-content {\n      width: 30%; } }\n\n.glb-footer-content p {\n  margin: 0;\n  padding: 0;\n  font-size: 14px; }\n\n.glb-credits {\n  background-color: #cac9c9;\n  padding: 16px 0;\n  color: #ebebeb; }\n\n.glb-credits p {\n  margin: 0;\n  font-size: 14px;\n  text-align: center; }\n\n/* Header SCSS */\n.glb-header {\n  width: 100%; }\n  .glb-header--floating {\n    position: absolute;\n    padding-top: 50px; }\n  .glb-header--solid {\n    background-color: #444;\n    color: white;\n    padding: 32px 0; }\n  .glb-header a {\n    font-size: 18px;\n    color: white;\n    text-decoration: none; }\n  .glb-header-nav > .site-nav__list {\n    display: none; }\n    @media only screen and (min-width: 1024px) {\n      .glb-header-nav > .site-nav__list {\n        display: flex; } }\n  .glb-header-nav > .hamburger {\n    display: block; }\n    @media only screen and (min-width: 1024px) {\n      .glb-header-nav > .hamburger {\n        display: none; } }\n  .glb-header .wrapper--flex {\n    display: flex;\n    align-items: center; }\n\n/* Site Nav: Header+Footer */\n.site-nav {\n  display: block;\n  width: auto;\n  max-width: 768px;\n  margin: 0 0 0 auto;\n  font-weight: 600;\n  padding-left: 50px; }\n  .site-nav__list {\n    display: flex;\n    text-align: left;\n    margin-top: 30px; }\n    @media only screen and (min-width: 560px) {\n      .site-nav__list {\n        margin-top: 0; } }\n  .site-nav__subtitle {\n    padding-bottom: 5px;\n    font-weight: 600; }\n  .site-nav__item {\n    margin-right: 25px;\n    margin-bottom: 10px;\n    display: inline-block; }\n    .site-nav__item p {\n      font-size: 14px;\n      margin: 0 0 10px; }\n    @media only screen and (min-width: 1024px) {\n      .site-nav__item {\n        margin-left: 25px;\n        margin-right: 0; } }\n  .site-nav__link {\n    font-family: 'Source Sans Pro', sans-serif; }\n\nnav ul, nav li {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n/*\n*    main css for this project, containing:\n*        - slidenav\n*        - navigation content\n*        - media queries\n*/\n/* slidenav hidden until activated by clicking on sidepanel */\n.slidenav {\n  height: 100vh;\n  max-width: 100%;\n  width: 100%;\n  position: absolute;\n  top: 0;\n  left: -100%;\n  background-color: #fff;\n  transition: 250ms;\n  /* transition effect to slide in the sidenav */\n  z-index: 9998;\n  display: flex;\n  flex-direction: column;\n  overflow-y: auto; }\n  @media only screen and (min-width: 560px) {\n    .slidenav {\n      top: 0;\n      left: -100%;\n      width: 0;\n      height: 100vh;\n      position: absolute;\n      overflow-x: hidden;\n      /* Disable horizontal scroll */\n      box-shadow: none;\n      box-shadow: 8px 0 10px rgba(0, 0, 0, 0.1); } }\n  @media only screen and (min-width: 1024px) {\n    .slidenav {\n      display: none; } }\n  .slidenav__portal {\n    padding: 50px 25px;\n    background-color: #fff;\n    width: 100%;\n    align-self: baseline;\n    margin: auto 0 0 0; }\n    .slidenav__portal a {\n      color: #fff;\n      font-weight: 600;\n      font-size: .8rem;\n      text-transform: uppercase;\n      letter-spacing: 1px;\n      display: flex; }\n      .slidenav__portal a span {\n        margin-left: 1rem; }\n    .slidenav__portal:hover, .slidenav__portal:hover a, .slidenav__portal:hover .social-link__icon {\n      color: #999;\n      cursor: pointer; }\n  .slidenav__nav {\n    display: block;\n    list-style: none;\n    margin: 0;\n    padding: 0 70px 50px 35px; }\n  .slidenav__list {\n    display: block;\n    list-style: none;\n    margin: 0;\n    padding: 35px 0 60px; }\n  .slidenav__item {\n    display: block;\n    margin: 25px 0;\n    width: 100%; }\n  .slidenav__link {\n    color: #444;\n    font-size: 22px;\n    font-weight: 600;\n    text-decoration: none;\n    display: block; }\n    .slidenav__link:hover {\n      color: #999; }\n  .slidenav .subtitle {\n    font-size: 14px;\n    font-weight: 700;\n    color: #999; }\n\n.current {\n  font-style: italic;\n  color: #fff; }\n\n.slidenav .site-logo {\n  padding: 25px 35px;\n  display: block;\n  width: 100%;\n  background-color: #444; }\n  .slidenav .site-logo img {\n    width: 100%;\n    height: auto;\n    max-width: 176px; }\n\n/* CSS for javascript */\n.toggle-menu {\n  height: 100vh;\n  left: 0; }\n  @media only screen and (min-width: 768px) {\n    .toggle-menu {\n      width: auto;\n      min-width: 325px; } }\n\n.main-body--active {\n  position: relative;\n  overflow: hidden;\n  height: 100vh; }\n\n/* Main Layout */\n.banner {\n  position: relative;\n  z-index: -1;\n  height: 600px;\n  width: 100%;\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-position: center; }\n\n.banner__container {\n  height: 100%;\n  display: flex;\n  align-items: center;\n  background: rgba(0, 0, 0, 0.3); }\n\n.banner__text {\n  text-align: left;\n  width: 100%; }\n\n.banner__title {\n  font-size: 32px;\n  max-width: 460px;\n  color: white;\n  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); }\n\n.banner--large {\n  height: 800px; }\n\n.banner__title--large {\n  font-size: 3rem;\n  padding-bottom: 30px;\n  border-bottom: 5px solid #888; }\n\n/* ==========================================================================\n   Blocks\n   ========================================================================== */\n.block {\n  max-width: 100%;\n  width: 100%;\n  position: relative; }\n  .block__actions {\n    display: flex;\n    position: relative;\n    margin-top: 30px; }\n\n.testimonial-block {\n  width: 100%;\n  position: relative;\n  height: auto;\n  top: 50px; }\n  .testimonial-block__strip {\n    height: 325px;\n    background: #444;\n    width: 100%;\n    position: absolute;\n    margin-top: 50px; }\n\n.testimonial-slider__quote {\n  font-size: 16px;\n  font-weight: 600;\n  font-style: italic;\n  color: #444; }\n  @media only screen and (min-width: 768px) {\n    .testimonial-slider__quote {\n      font-size: 20px; } }\n\n.testimonial-slider__job {\n  font-size: 18px;\n  font-weight: 600;\n  color: #444;\n  margin: 32px 0 0; }\n\n.testimonial-slider__company {\n  font-size: 16px;\n  font-weight: 600;\n  font-style: italic;\n  color: #444;\n  margin: 16px 0 0; }\n\n.testimonial-slider__container {\n  background: gainsboro;\n  border: 2px solid #888;\n  height: 425px;\n  position: relative;\n  max-width: 90%; }\n  @media only screen and (min-width: 1248px) {\n    .testimonial-slider__container {\n      max-width: 1140px; } }\n\n.testimonial-slider__slider {\n  position: relative;\n  height: 100%;\n  padding: 25px 75px;\n  margin: 0 -60px; }\n\n.testimonial-slider__item {\n  margin: 0 15%;\n  padding: 50px 0;\n  text-align: center;\n  width: 100%;\n  max-width: 768px;\n  display: flex;\n  align-items: center;\n  height: 100%;\n  flex-direction: column; }\n  @media only screen and (min-width: 1248px) {\n    .testimonial-slider__item {\n      padding: 75px 0; } }\n\n.testimonial-slider__content {\n  margin: auto; }\n\n.brands-slider {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  min-height: 500px;\n  position: relative; }\n  .brands-slider-block {\n    position: relative; }\n  .brands-slider__container {\n    width: auto; }\n    .brands-slider__container .flickity-viewport {\n      height: 250px !important; }\n  .brands-slider__item {\n    align-items: center;\n    background-color: #fff;\n    border: 1px solid #dcdcdc;\n    display: flex;\n    height: 100%;\n    padding: 75px;\n    width: 90%;\n    box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08); }\n    .brands-slider__item.is-selected {\n      transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);\n      box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, 0.2);\n      z-index: 2; }\n    @media only screen and (min-width: 560px) {\n      .brands-slider__item {\n        width: 50%; } }\n    @media only screen and (min-width: 1024px) {\n      .brands-slider__item {\n        width: 30%; } }\n    @media only screen and (min-width: 1440px) {\n      .brands-slider__item {\n        width: 20%; } }\n  .brands-slider__logo {\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: cover;\n    height: auto;\n    margin: auto;\n    max-height: 100%;\n    position: relative;\n    width: 200px; }\n\n.casestudy {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n  min-height: 550px;\n  width: 100%; }\n  .casestudy__container {\n    display: flex;\n    align-items: center;\n    vertical-align: middle;\n    flex-direction: column;\n    width: auto;\n    max-width: 400px;\n    background-color: gainsboro;\n    height: auto;\n    min-height: 550px;\n    margin: 0 0 0 auto;\n    position: relative; }\n  .casestudy__content {\n    display: block;\n    padding: 50px;\n    align-self: center;\n    margin: auto 0; }\n\n.casestudy {\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  position: relative;\n  min-height: 550px;\n  width: 100%; }\n  .casestudy__container {\n    display: flex;\n    align-items: center;\n    vertical-align: middle;\n    flex-direction: column;\n    width: auto;\n    max-width: 400px;\n    background-color: gainsboro;\n    height: auto;\n    min-height: 550px;\n    margin: 0 0 0 auto;\n    position: relative; }\n  .casestudy__content {\n    display: block;\n    padding: 50px;\n    align-self: center;\n    margin: auto 0; }\n\n/* ==========================================================================\n   Hero Slider Block\n   ========================================================================== */\n.hero-slider {\n  background: pink;\n  height: 600px;\n  position: relative; }\n\n.text-block {\n  background-color: white; }\n  .text-block--bgsecondary {\n    background-color: #999; }\n  .text-block__list {\n    padding: 30px 50px;\n    border: 2px solid #444; }\n  .text-block__item {\n    line-height: 140%;\n    margin-bottom: 10px;\n    font-size: 14px;\n    font-weight: 600; }\n    .text-block__item:last-child {\n      margin-bottom: 0; }\n  .text-block__sidebar {\n    width: 350px;\n    margin: 50px auto; }\n    @media only screen and (min-width: 1024px) {\n      .text-block__sidebar {\n        width: 25%;\n        margin-left: 10%; } }\n  .text-block__body {\n    padding-top: 30px; }\n  .text-block__content, .text-block__content--large {\n    min-width: 50%;\n    width: auto;\n    display: block;\n    margin-top: 75px; }\n    .text-block__content--large {\n      width: 100%;\n      margin-top: 0; }\n      @media only screen and (min-width: 1024px) {\n        .text-block__content--large {\n          width: 65%; } }\n    .text-block__content p, .text-block__content--large p {\n      margin: 30px auto 0 auto; }\n      .text-block__content p:first-child, .text-block__content--large p:first-child {\n        margin: 0 auto; }\n    @media only screen and (min-width: 1024px) {\n      .text-block__content, .text-block__content--large {\n        margin-top: 0; } }\n","// ==========================================================================\n// Custom resets\n// ==========================================================================\n\nbutton {\n    border: 0;\n    background: none;\n    padding: 0;\n    \n    &:focus {\n        outline: none;\n    }\n}\n\ninput {\n    &:focus {\n        outline: none;\n        box-shadow: none;\n    }\n}\n","/* ==========================================================================\n   Config Variables\n   ========================================================================== */\n\n   ////////////////////////////////////////\n   //////////////// Fonts ////////////////\n   //////////////////////////////////////\n\n   $system-font: system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif;\n   $system-font-base: system-ui, BlinkMacSystemFont, -apple-system, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;\n\n   ////////////////////////////////////////\n   //////////////// Text /////////////////\n   //////////////////////////////////////\n\n    /* $title-font: Menlo, Monaco, Consolas, \"Courier New\", monospace !default; */\n    $base-font-size: 16px;\n    $base-line-height: 140%;\n\n    //////////////////////////////////////\n    ///////////// Colours ///////////////\n    ////////////////////////////////////\n\n    /* Base-Colours */\n    $white: #fff;                                   /* body background colour */\n    $base-colour: #222;                             /* base content colour */\n\n    /* Primary Colour */\n    $p-colour: #444;                             /* primary colour */\n\n    /* Secondary Colour */\n    $s-colour: #999;                             /* secondary colour */\n\n    /* Grey Shades */\n    $d-grey: #353e44;                               /* dark grey */\n    $l-grey: #f3f4f5;                                 /* light grey */\n\n    /* Interaction Colours */\n    $link-colour: #ec145a;\n    $visited-colour: darken(#ec145a, 20%);\n\n\n\n    /*\n    *\n    *    Colour Palette\n    *\n    */\n","/* ==========================================================================\nMixins\n========================================================================== */\n\n/*--- Centering Elements ---*/\n@mixin push--auto {\n    margin: {\n        left: auto;\n        right: auto;\n    }\n}\n\n/*--- Grid Elements ---*/\n@mixin row {\n    display: flex;\n    justify-content: space-between;\n}\n\n@mixin col {\n    display: flex;\n    flex-direction: column;\n}\n\n@mixin flex-center {\n    display: flex;\n    align-items: center;\n}\n\n@mixin flex-justify {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n}\n\n\n/*--- List Elements ---*/\n@mixin list {\n    list-style: none;\n    margin: 0;\n    padding: 0;\n}\n\n\n/*--- Media Queries ---*/\n$breakpoints: (\n    \"thumb\":            480px,\n    \"handheld\":         560px,\n    \"lap\":              768px,\n    \"desk\":             1024px,\n    \"widescreen\":       1248px,\n    \"widescreen-hd\":    1440px\n    );\n\n    @mixin mq($width, $type: min) {\n        @if map_has_key($breakpoints, $width) {\n            $width: map_get($breakpoints, $width);\n            @if $type == max {\n                $width: $width - 1px;\n            }\n            @media only screen and (#{$type}-width: $width) {\n                @content;\n            }\n        }\n    }\n\n\n    /*--- If Responsive: Show mq-breakpoints ---*/\n    $enable-responsive-aid: true;\n\n    @if $enable-responsive-aid {\n        body:before {\n            content:\"0\";\n            position:fixed;\n            bottom:0px;\n            left:0;\n            font-weight:600;\n            font-size:2em;\n            opacity:0.3;\n            color:#FFF;\n            background-color:#000;\n            line-height:100%;\n            z-index:50001;\n            padding: .05em .2em;\n            border-top-right-radius: 3px;\n        }\n\n        @each $alias, $query in $breakpoints{\n            @include mq($alias){\n                body:before {\n                    content:\"#{$alias}\";\n                }\n            }\n        }\n    }\n","/* ==========================================================================\n   Wrappers\n   ========================================================================== */\n\n\n.wrapper {\n    max-width: 1240px;\n    box-sizing: border-box;\n    margin: 0 auto;\n    padding-left: 25px;\n    padding-right: 25px;\n}\n\n.wrapper--flex {\n    display: block;\n\n    @include mq(desk) {\n        display: flex;        \n    }\n}\n\n\n/* .wrapper {\n    max-width: 1366px;\n    margin: 0 5%;\n    width: auto;\n    box-sizing: border-box;\n\n    @include mq(handheld) {\n        margin: 0 10%;\n    }\n\n    @include mq(desk) {\n        padding: 0 2rem;\n        margin: 0 auto;\n    }\n\n    &--flex {\n        @extend .wrapper;\n        @include flex-justify;\n        flex-wrap: wrap;\n    }\n    &--medium {\n        max-width: 1140px;\n    }\n    &--medium.cards {\n        margin: 0 auto !important;\n    }\n} */\n","/* ==========================================================================\n   Utilities\n   ========================================================================== */\n\n.container {\n    padding-top: 50px;\n    padding-bottom: 50px;\n\n   @include mq(desk) {\n       padding-top: 175px;\n       padding-bottom: 175px;\n   }\n}\n","/* ==========================================================================\n   Body\n   ========================================================================== */\n\n    /*  */\n    body,\n    html {\n    }\n\n    ////////////////////////////////////////\n    //////////////// Body //////////////////\n    ////////////////////////////////////////\n\n    *,\n    *::before,\n    *::after {\n     box-sizing: border-box;\n    }\n\n    body {\n       margin: 0;\n       padding: 0;\n       overflow: auto;\n       /* box-sizing: border-box; */\n    }\n\n    img {\n        height: auto;\n        max-width: 100%;\n        vertical-align: middle;\n    }\n","/* ==========================================================================\n   Extra class names\n   ========================================================================== */\n\n/* H2 - EXTRA CLASS TO MAKE BIGGER */\n.block-title--h2 {\n   font-size: 36px;\n   margin: 30px 0;\n}\n\n/* SUBTITLE - FOR ABOVE HEADINGS */\n\n.subtitle {\n   color: #444;\n   font-size: 16px;\n   font-weight: 600;\n   text-transform: uppercase;\n   display: flex;\n   align-items: center;\n}\n.subtitle-dash {\n   width: 20px;\n   border: 2px solid #444;\n   margin: 0 20px 0 0;\n   border-radius: 2px;\n}\n.subtitle h4 {\n   margin: 0;\n}\n\n\n/* BODY Text */\np {\n   font-size: 16px;\n   line-height: 24px;\n   font-weight: 400;\n}\n\n.par-text--s {\n   color: #888;\n}\n\n\n/* 3rd Party Override */\n\n.flickity-viewport {\n    height: 100%;\n}\n\n.flickity-button {\n    background: $s-colour !important;\n    /* transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91); */\n    box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, 0.2);\n}\n.flickity-prev-next-button .flickity-button-icon {\n    color: white !important;\n    padding: 5px;\n}\n","/* ==========================================================================\n   Core Fonts\n   ========================================================================== */\n","/* ==========================================================================\n   Grid\n   ========================================================================== */\n\n.flex-grid {\n   margin: 0 auto;\n   display: flex;\n   flex-wrap: wrap;\n\n   &__col {\n       flex: 1;\n       display: block;\n   }\n\n   &__item {\n       flex-basis: 100px;\n       flex-grow: 1;\n   }\n}\n\n.row {\n    display: -webkit-box;\n    display: -moz-box;\n    display: -ms-flexbox;\n    display: -webkit-flex;\n    display: flex;\n    flex-wrap: wrap;\n\n    .col {\n        position: relative;\n\n        width: auto;\n        flex-basis: 10%;\n        flex: 1;\n\n        &-m3 {\n            margin: 0 0.5em;\n        }\n    }\n}\n","// ==========================================================================\n// Typography\n// ==========================================================================\n\n    body {\n        font-size: 12pt;\n        line-height: 1.25em;\n        font-family: $system-font;\n        text-align: left;\n        line-height: 1;\n        -webkit-font-smoothing: antialiased;\n        -moz-osx-font-smoothing: grayscale;\n        color: $p-colour;\n    }\n\n    h1, h2, h3, h4, h5, h6 {\n        font-family: $system-font;\n        color: $p-colour;\n        line-height: 120%;\n    }\n\n\n    /////////////////////////////////////////\n    /////////////// Headings ////////////////\n    /////////////////////////////////////////\n\n\n    h1 {\n        font-size: 38px;\n        line-height: 1.1;\n    }\n\n    h2 {\n        font-size: 27px;\n        line-height: 1.2;\n    }\n\n    h3 {\n        font-size: 20px;\n        line-height: 160%;\n    }\n\n    h4 {\n        font-size: 14px;\n        line-height: 1.25em;\n    }\n\n\n    /////////////////////////////////////////\n    ////////////// Paragraphs ///////////////\n    /////////////////////////////////////////\n\n\n    p {\n        font-size: 16px;\n        line-height: 160%;\n        font-family: $system-font;\n\n        @include mq(handheld) {\n            font-size: 17px;\n        }\n    }\n\n    a {\n        color: inherit;\n        text-decoration: none;\n\n        &:hover {\n            cursor: pointer;\n        }\n    }\n","\r\n.btn {\r\n    padding: 12px 16px;\r\n    box-sizing: border-box;\r\n    box-shadow: 1px 1px 3px 0px rgba(0,0,0,0.1);\r\n    outline: none;\r\n    font-weight: 500;\r\n\r\n    /* Primary Coloured Buttons */\r\n    &--p-solid {\r\n        border: none;\r\n        background: #444;\r\n        color: #f3f3f3;\r\n    }\r\n\r\n    /* Secondary Coloured Buttons */\r\n    &--s-solid {\r\n        border: none;\r\n        background: #888;\r\n        color: #f3f3f3;\r\n    }\r\n\r\n    &--s-border {\r\n        border: 2px solid #888;\r\n        background: #f3f3f3;\r\n        color: #888;\r\n    }\r\n}\r\n\r\n.item--margin-right {\r\n    margin-right: 16px;\r\n}\r\n","\r\n.page-title {\r\n    top: -22px;\r\n    position: relative;\r\n}\r\n\r\n.page-title__container {\r\n    border-radius: 5px;\r\n    background-color: #333;\r\n    display: inline-block;\r\n    padding: 8px 16px;\r\n}\r\n.page-title__title {\r\n    color: #fff; /* secondary */\r\n    font-size: 22px;\r\n    text-transform: uppercase;\r\n}\r\n\r\nh3 {\r\n    margin: 0;\r\n}\r\n","/*\n*    hamburger styling, containing:\n*        - hamburger class\n*        - each line styling\n*        - hamburger animation\n*        - media queries\n*/\n\n.hamburger {\n    display: block;\n    cursor: pointer;\n    width: auto;\n    float: right;\n    z-index: 9999;\n    position: relative;\n    @include mq(thumb) {\n        margin: auto;\n    }\n}\n\n.line {\n    width: 30px;\n    height: 2px;\n    max-width: 100%;\n    background-color: $white;\n    margin: 6px 0;\n    transition: 0.4s;\n}\n\n.toggle-ico-active:nth-child(1) {\n    -webkit-transform: rotate(-45deg) translate(-4.5px, 6px);\n    transform: rotate(-45deg) translate(-4.5px, 6px);\n\n    @include mq(lap) {\n        background-color: $white;\n    }\n}\n\n.toggle-ico-active:nth-child(2) {opacity: 0;}\n\n.toggle-ico-active:nth-child(3) {\n    -webkit-transform: rotate(45deg) translate(-5px, -7px);\n    transform: rotate(45deg) translate(-5px, -7px);\n\n    @include mq(lap) {\n        background-color: $white;\n    }\n}\n",".bordered-image {\n    border: 1px solid gainsboro;\n    padding: 5px;\n    background: #f2f2f2;\n    display: block;\n    position: relative;\n    overflow: hidden;\n}\n\n.bordered-image caption {\n    color: #333;\n    font-size: 10px;\n}\n",".glb-footer {\r\n    width: 100%;\r\n    background: gainsboro;\r\n}\r\n\r\n.glb-footer-nav {\r\n    display: block;\r\n    margin-top: 35px;\r\n    @include mq(handheld) {\r\n        display: flex;\r\n        justify-content: space-evenly;\r\n    }\r\n    @include mq(desk) {\r\n        margin-top: 0;\r\n    }\r\n}\r\n\r\n.glb-footer-nav > .site-nav__list {\r\n    flex-direction: column;\r\n    width: auto;\r\n    max-width: 100%;\r\n    @include mq(handheld) {\r\n        max-width: 35%;\r\n    }\r\n}\r\n\r\n.glb-footer-logo {\r\n    display: block;\r\n    margin: 0 0 30px;\r\n}\r\n\r\n.glb-footer-content {\r\n    width: 100%;\r\n    @include mq(desk) {\r\n        width: 30%;\r\n    }\r\n}\r\n.glb-footer-content p {\r\n    margin: 0;\r\n    padding: 0;\r\n    font-size: 14px;\r\n}\r\n\r\n.glb-credits {\r\n    background-color: #cac9c9;\r\n    padding: 16px 0;\r\n    color: #ebebeb;\r\n}\r\n\r\n.glb-credits p {\r\n    margin: 0;\r\n    font-size: 14px;\r\n    text-align: center;\r\n}\r\n","/* Header SCSS */\n\n.glb-header {\n    width: 100%;\n\n    &--floating {\n        position: absolute;\n        padding-top: 50px;\n    }\n\n    &--solid {\n        background-color: #444;\n        color: white;\n        padding: 32px 0;\n    }\n\n    a {\n        font-size: 18px;\n        color: white;\n        text-decoration: none;\n    }\n\n    &-nav {\n        > .site-nav__list {\n            display: none;\n            @include mq(desk) {\n                display: flex;\n            }\n        }\n        > .hamburger {\n            display: block;\n            @include mq(desk) {\n                display: none;\n            }\n        }\n    }\n    .wrapper--flex {\n        display: flex;\n        align-items: center;\n    }\n}\n","/* Site Nav: Header+Footer */\n.site-nav {\n    display: block;\n    width: auto;\n    max-width: 768px;\n    margin: 0 0 0 auto;\n    font-weight: 600;\n    padding-left: 50px;\n\n    &__list {\n        display: flex;\n        text-align: left;\n        margin-top: 30px;\n        @include mq(handheld) {\n            margin-top: 0;\n\n        }\n    }\n\n    &__subtitle {\n        padding-bottom: 5px;\n        font-weight: 600;\n    }\n\n    &__item {\n        margin-right: 25px;\n        margin-bottom: 10px;\n        display: inline-block;\n\n        p {\n            font-size: 14px;\n            margin: 0 0 10px;\n        }\n\n        @include mq(desk) {\n            margin-left: 25px;\n            margin-right: 0;\n        }\n    }\n\n    &__link {\n        font-family: 'Source Sans Pro', sans-serif;\n    }\n}\n\nnav {\n    ul, li {\n        list-style: none;\n        margin: 0;\n        padding: 0;\n    }\n}\n","/*\n*    main css for this project, containing:\n*        - slidenav\n*        - navigation content\n*        - media queries\n*/\n\n/* slidenav hidden until activated by clicking on sidepanel */\n.slidenav {\n    height: 100vh;\n    max-width: 100%;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: -100%;\n    background-color: $white;\n    transition: 250ms; /* transition effect to slide in the sidenav */\n    z-index: 9998;\n    display: flex;\n    flex-direction: column;\n    overflow-y: auto;\n\n    @include mq(handheld) {\n        top: 0;\n        left: -100%;\n        width: 0;\n        height: 100vh;\n        position: absolute;\n        overflow-x: hidden; /* Disable horizontal scroll */\n        box-shadow: none;\n        box-shadow: 8px 0 10px rgba(0, 0, 0, 0.1);\n    }\n\n    @include mq(desk) {\n        display: none;\n    }\n    &__portal {\n        padding: 50px 25px;\n        background-color: $white;\n        width: 100%;\n        align-self: baseline;\n        margin: auto 0 0 0;\n\n        a {\n            color: $white;\n            font-weight: 600;\n            font-size: .8rem;\n            text-transform: uppercase;\n            letter-spacing: 1px;\n            display: flex;\n\n            span {\n                margin-left: 1rem;\n            }\n        }\n\n        &:hover, &:hover a, &:hover .social-link__icon {\n            color: $s-colour;\n            cursor: pointer;\n        }\n    }\n\n    &__nav  {\n        display: block;\n        list-style: none;\n        margin: 0;\n        padding: 0 70px 50px 35px;\n    }\n\n    &__list  {\n        display: block;\n        list-style: none;\n        margin: 0;\n        padding: 35px 0 60px;\n    }\n\n    &__item {\n        display: block;\n        margin: 25px 0;\n        width: 100%;\n    }\n\n    &__link {\n        color: $p-colour;\n        font-size: 22px;\n        font-weight: 600;\n        text-decoration: none;\n        display: block;\n\n        &:hover {\n            color: $s-colour;\n        }\n    }\n\n    .subtitle {\n        font-size: 14px;\n        font-weight: 700;\n        color: $s-colour;\n    }\n}\n\n.current {\n    font-style: italic;\n    color: $white;\n}\n\n.slidenav .site-logo {\n    padding: 25px 35px;\n    display: block;\n    width: 100%;\n    background-color: $p-colour;\n\n    img {\n        width: 100%;\n        height: auto;\n        max-width: 176px;\n    }\n}\n\n\n/* CSS for javascript */\n.toggle-menu {\n    height: 100vh;\n    left: 0;\n\n    @include mq(lap) {\n        width: auto;\n        min-width: 325px;\n    }\n}\n\n.main-body--active {\n    position: relative;\n    overflow: hidden;\n    height: 100vh;\n}\n","/* Main Layout */\n","\n.banner {\n    position: relative;\n    z-index: -1;\n    height: 600px;\n    width: 100%;\n    background-repeat: no-repeat;\n    background-size: cover;\n    background-position: center;\n}\n\n.banner__container {\n    height: 100%;\n    display: flex;\n    align-items: center;\n    background: rgba(0, 0, 0, 0.3);\n}\n\n.banner__text {\n    text-align: left;\n    width: 100%;\n}\n\n.banner__title {\n    font-size: 32px;\n    max-width: 460px;\n    color: white;\n    text-shadow: 0 4px 8px rgba(0,0,0,0.2);\n}\n\n.banner--large {\n    height: 800px;\n}\n.banner__title--large {\n    font-size: 3rem;\n    padding-bottom: 30px;\n    border-bottom: 5px solid #888;\n}\n","/* ==========================================================================\n   Blocks\n   ========================================================================== */\n\n.block {\n    max-width: 100%;\n    width: 100%;\n    position: relative;\n\n    &__actions {\n        display: flex;\n        position: relative;\n        margin-top: 30px;\n    }\n}\n","\r\n.testimonial-block {\r\n    width: 100%;\r\n    position: relative;\r\n    height: auto;\r\n    top: 50px;\r\n\r\n    &__strip {\r\n        height: 325px;\r\n        background: #444;\r\n        width: 100%;\r\n        position: absolute;\r\n        margin-top: 50px;\r\n    }\r\n    &__icon {}\r\n}\r\n\r\n\r\n.testimonial-slider {\r\n    &__quote {\r\n        font-size: 16px;\r\n        font-weight: 600;\r\n        font-style: italic;\r\n        color: $p-colour;\r\n        @include mq(lap) {\r\n            font-size: 20px;\r\n        }\r\n    }\r\n    &__job {\r\n        font-size: 18px;\r\n        font-weight: 600;\r\n        color: $p-colour;\r\n        margin: 32px 0 0;\r\n    }\r\n    &__company {\r\n        font-size: 16px;\r\n        font-weight: 600;\r\n        font-style: italic;\r\n        color: $p-colour;\r\n        margin: 16px 0 0;\r\n    }\r\n\r\n    &__container {\r\n        background: gainsboro;\r\n        border: 2px solid #888;\r\n        height: 425px;\r\n        position: relative;\r\n        max-width: 90%;\r\n        @include mq(widescreen) {\r\n            max-width: 1140px;\r\n        }\r\n    }\r\n\r\n    &__slider {\r\n        position: relative;\r\n        height: 100%;\r\n        padding: 25px 75px;\r\n        margin: 0 -60px;\r\n    }\r\n\r\n    &__item {\r\n        margin: 0 15%;\r\n        padding: 50px 0;\r\n        text-align: center;\r\n        width: 100%;\r\n        max-width: 768px;\r\n        display: flex;\r\n        align-items: center;\r\n        height: 100%;\r\n        flex-direction: column;\r\n        @include mq(widescreen) {\r\n            padding: 75px 0;\r\n        }\r\n    }\r\n\r\n    &__content {\r\n        margin: auto;\r\n    }\r\n\r\n    &__arrows {}\r\n}\r\n",".brands-slider {\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    min-height: 500px;\r\n    position: relative;\r\n\r\n    &-block {\r\n        position: relative;\r\n    }\r\n\r\n    &__container {\r\n        width: auto;\r\n        .flickity-viewport {height: 250px !important;}\r\n    }\r\n\r\n    &__item {\r\n        align-items: center;\r\n        background-color: #fff;\r\n        border: 1px solid #dcdcdc;\r\n        display: flex;\r\n        height: 100%;\r\n        padding: 75px;\r\n        width: 90%;\r\n        box-shadow: 0 6px 15px rgba(36, 37, 38, .08);\r\n\r\n        &.is-selected {\r\n            transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91), -webkit-filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);\r\n            box-shadow: 0px 0px 16px 4px rgba(47, 48, 49, 0.2);\r\n            z-index: 2;\r\n        }\r\n        @include mq(handheld) {\r\n            width: 50%;\r\n        }\r\n        @include mq(desk) {\r\n            width: 30%;\r\n        }\r\n        @include mq(widescreen-hd) {\r\n            width: 20%;\r\n        }\r\n    }\r\n\r\n    &__logo {\r\n        background-position: center;\r\n        background-repeat: no-repeat;\r\n        background-size: cover;\r\n        height: auto;\r\n        margin: auto;\r\n        max-height: 100%;\r\n        position: relative;\r\n        width: 200px;\r\n    }\r\n}\r\n",".casestudy {\r\n    background-position: center;\r\n    background-repeat: no-repeat;\r\n    background-size: cover;\r\n    position: relative;\r\n    min-height: 550px;\r\n    width: 100%;\r\n\r\n    &__container {\r\n        display: flex;\r\n        align-items: center;\r\n        vertical-align: middle;\r\n        flex-direction: column;\r\n        width: auto;\r\n        max-width: 400px;\r\n        background-color: gainsboro;\r\n        height: auto;\r\n        min-height: 550px;\r\n        margin: 0 0 0 auto;\r\n        position: relative;\r\n    }\r\n    &__content {\r\n        display: block;\r\n        padding: 50px;\r\n        align-self: center;\r\n        margin: auto 0;\r\n    }\r\n}\r\n","/* ==========================================================================\n   Hero Slider Block\n   ========================================================================== */\n\n.hero-slider {\n    background: pink;\n    height: 600px;\n    position: relative;\n}\n","\r\n.text-block {\r\n    background-color: white;\r\n    &--bgsecondary {\r\n        background-color: $s-colour;\r\n    }\r\n    &__list {\r\n        padding: 30px 50px;\r\n        border: 2px solid $p-colour;\r\n    }\r\n    &__item {\r\n        line-height: 140%;\r\n        margin-bottom: 10px;\r\n        font-size: 14px;\r\n        font-weight: 600;\r\n        &:last-child {\r\n            margin-bottom: 0;\r\n        }\r\n    }\r\n    &__sidebar {\r\n        width: 350px;\r\n        margin: 50px auto;\r\n        @include mq(desk) {\r\n            width: 25%;\r\n            margin-left: 10%;\r\n        }\r\n    }\r\n    &__body {\r\n        padding-top: 30px;\r\n    }\r\n    &__content {\r\n        min-width: 50%;\r\n        width: auto;\r\n        display: block;\r\n        margin-top: 75px;\r\n        &--large {\r\n            @extend .text-block__content;\r\n            width: 100%;\r\n            margin-top: 0;\r\n            @include mq(desk) {\r\n                width: 65%;\r\n            }\r\n        }\r\n        p {\r\n            margin: 30px auto 0 auto;\r\n            &:first-child {\r\n                margin: 0 auto;\r\n            }\r\n        }\r\n        @include mq(desk) {\r\n            margin-top: 0;\r\n        }\r\n    }\r\n}\r\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/*!\n * jQuery mmenu v7.2.2\n * @requires jQuery 1.7.0 or later\n *\n * mmenu.frebsite.nl\n *\t\n * Copyright (c) Fred Heusschen\n * www.frebsite.nl\n *\n * License: CC-BY-NC-4.0\n * http://creativecommons.org/licenses/by-nc/4.0/\n */.mm-menu{--mm-line-height:20px;--mm-listitem-size:44px;--mm-navbar-size:44px;--mm-offset-top:0;--mm-offset-right:0;--mm-offset-bottom:0;--mm-offset-left:0;--mm-color-border:rgba(0, 0, 0, 0.1);--mm-color-button:rgba(0, 0, 0, 0.3);--mm-color-text:rgba(0, 0, 0, 0.75);--mm-color-text-dimmed:rgba(0, 0, 0, 0.3);--mm-color-background:#f3f3f3;--mm-color-background-highlight:rgba(0, 0, 0, 0.05);--mm-color-background-emphasis:rgba(255, 255, 255, 0.4);--mm-shadow:0 0 10px rgba( 0,0,0, 0.3 )}.mm-hidden{display:none!important}.mm-wrapper{overflow-x:hidden;position:relative}.mm-menu{background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.75);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text);line-height:20px;line-height:var(--mm-line-height);-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:0;margin:0;position:absolute;z-index:0;top:0;right:0;bottom:0;left:0;top:var(--mm-offset-top);right:var(--mm-offset-right);bottom:var(--mm-offset-bottom);left:var(--mm-offset-left);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mm-menu a,.mm-menu a:active,.mm-menu a:hover,.mm-menu a:link,.mm-menu a:visited{color:inherit;text-decoration:none}[dir=rtl] .mm-menu{direction:rtl}.mm-panels,.mm-panels>.mm-panel{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.mm-panel,.mm-panels{-webkit-box-sizing:border-box;box-sizing:border-box;background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.75);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text)}.mm-panels{overflow:hidden}.mm-panel{-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;overflow-y:auto;width:100%;padding:0 20px;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-panel:not(.mm-hidden){display:block}.mm-panel:after,.mm-panel:before{content:'';display:block;height:20px}.mm-panel_has-navbar{padding-top:44px;padding-top:var(--mm-navbar-size)}.mm-panel_opened{z-index:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-panel_opened-parent{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}.mm-panel_highest{z-index:2}.mm-panel_noanimation{-webkit-transition:none!important;-o-transition:none!important;transition:none!important}.mm-panel_noanimation.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl] .mm-panel:not(.mm-panel_opened){-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}[dir=rtl] .mm-panel.mm-panel_opened-parent{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}.mm-listitem_vertical>.mm-panel{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;display:none;width:100%;padding:10px 0 10px 10px}.mm-listitem_vertical>.mm-panel:after,.mm-listitem_vertical>.mm-panel:before{content:none;display:none}.mm-listitem_opened>.mm-panel{display:block}.mm-listitem_vertical>.mm-listitem__btn{height:44px;height:var(--mm-listitem-size);bottom:auto}.mm-listitem_vertical .mm-listitem:last-child:after{border-color:transparent}.mm-listitem_opened>.mm-listitem__btn:after{-webkit-transform:rotate(225deg);-ms-transform:rotate(225deg);transform:rotate(225deg);right:19px}.mm-btn{-webkit-box-sizing:border-box;box-sizing:border-box;width:44px;padding:0}.mm-btn:after,.mm-btn:before{border-color:rgba(0,0,0,.1);border-color:var(--mm-color-button);border-width:2px;border-style:solid}.mm-btn_close:after,.mm-btn_close:before{content:'';-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:5px;height:5px;margin:auto;position:absolute;top:0;bottom:0;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.mm-btn_close:before{border-right:none;border-bottom:none;right:18px}.mm-btn_close:after{border-left:none;border-top:none;right:25px}.mm-btn_next:after,.mm-btn_prev:before{content:'';border-bottom:none;border-right:none;-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:8px;height:8px;margin:auto;position:absolute;top:0;bottom:0}.mm-btn_prev:before{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:23px;right:auto}.mm-btn_next:after{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);right:23px;left:auto}[dir=rtl] .mm-btn_next:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:23px;right:auto}[dir=rtl] .mm-btn_prev:before{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);right:23px;left:auto}[dir=rtl] .mm-btn_close:after,[dir=rtl] .mm-btn_close:before{right:auto}[dir=rtl] .mm-btn_close:before{left:25px}[dir=rtl] .mm-btn_close:after{left:18px}.mm-navbar{background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.3);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text-dimmed);border-bottom-width:1px;border-bottom-style:solid;text-align:center;display:none;height:44px;height:var(--mm-navbar-size);padding:0 44px;margin:0;position:absolute;top:0;left:0;right:0;opacity:1;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-navbar>*{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:12px;padding:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5);padding-left:0;padding-right:0}.mm-navbar a,.mm-navbar a:hover{text-decoration:none}.mm-navbar__title{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mm-navbar__btn{position:absolute;top:0;bottom:0;z-index:1}.mm-navbar__btn:first-child{text-align:left;left:0}.mm-navbar__btn:last-child{text-align:right;right:0}.mm-panel_has-navbar .mm-navbar{display:block}[dir=rtl] .mm-navbar__btn:first-child{text-align:right;right:0;left:auto}[dir=rtl] .mm-navbar__btn:last-child{text-align:left;left:0;right:auto}.mm-listitem,.mm-listview{list-style:none;display:block;padding:0;margin:0}.mm-listitem{color:rgba(0,0,0,.75);color:var(--mm-color-text);border-color:rgba(0,0,0,.1);border-color:var(--mm-color-border);position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.mm-listitem:after{content:'';border-color:inherit;border-bottom-width:1px;border-bottom-style:solid;display:block;position:absolute;left:20px;right:0;bottom:0}.mm-listitem a,.mm-listitem a:hover{text-decoration:none}.mm-listitem__btn,.mm-listitem__text{color:inherit;display:block;padding-top:12px;padding-top:calc((var(--mm-listitem-size) - var(--mm-line-height))/ 2);padding-bottom:12px;padding-bottom:calc((var(--mm-listitem-size) - var(--mm-line-height))/ 2)}.mm-listitem__text{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:20px;padding-right:10px;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:10%;flex-basis:10%}.mm-listitem__btn{-webkit-tap-highlight-color:rgba(255,255,255,.4);tap-highlight-color:rgba(255,255,255,.4);-webkit-tap-highlight-color:var(--mm-color-background-emphasis);tap-highlight-color:var(--mm-color-background-emphasis);background:rgba(3,2,1,0);border-color:inherit;width:auto;padding-right:54px;position:relative}.mm-listitem__btn:not(.mm-listitem__text){border-left-width:1px;border-left-style:solid}.mm-listitem_selected>.mm-listitem__text{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-listitem_opened>.mm-listitem__btn,.mm-listitem_opened>.mm-panel{background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight)}.mm-panels>.mm-panel>.mm-listview{margin:20px -20px}.mm-panels>.mm-panel>.mm-listview:first-child,.mm-panels>.mm-panel>.mm-navbar+.mm-listview{margin-top:-20px}.mm-listitem_divider{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight);font-size:75%;text-transform:uppercase;min-height:20px;min-height:var(--mm-line-height);padding:6.5px;padding:calc(((var(--mm-listitem-size) * .75) - var(--mm-line-height)) * .5);padding-right:10px;padding-left:20px}.mm-listitem_spacer{padding-top:44px;padding-top:var(--mm-listitem-size)}.mm-listitem_spacer>.mm-btn_next{top:44px;top:var(--mm-listitem-size)}[dir=rtl] .mm-listitem:after{left:0;right:20px}[dir=rtl] .mm-listitem__text{padding-left:10px;padding-right:20px}[dir=rtl] .mm-listitem__btn{padding-left:54px;border-left-width:0;border-left-style:none}[dir=rtl] .mm-listitem__btn:not(.mm-listitem__text){padding-right:0;border-right-width:1px;border-right-style:solid}\n.mm-page{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.mm-slideout{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease;z-index:1}.mm-wrapper_opened{overflow-x:hidden;position:relative}.mm-wrapper_background .mm-page{background:inherit}.mm-menu_offcanvas{display:none;position:fixed;right:auto;z-index:0}.mm-menu_offcanvas.mm-menu_opened{display:block}.mm-menu_offcanvas{width:80%;min-width:240px;max-width:440px}.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0)}}.mm-wrapper__blocker{background:rgba(3,2,1,0);overflow:hidden;display:none;width:100%;height:100%;position:fixed;top:0;left:0;z-index:2}.mm-wrapper_blocking{overflow:hidden}.mm-wrapper_blocking body{overflow:hidden}.mm-wrapper_blocking .mm-wrapper__blocker{display:block}\n.mm-sronly{border:0!important;clip:rect(1px,1px,1px,1px)!important;-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;white-space:nowrap!important;width:1px!important;min-width:1px!important;height:1px!important;min-height:1px!important;padding:0!important;overflow:hidden!important;position:absolute!important}\n.mm-menu_autoheight{-webkit-transition:none .4s ease;-o-transition:none .4s ease;transition:none .4s ease;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;-o-transition-property:transform,height;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.mm-menu_autoheight:not(.mm-menu_offcanvas){position:relative}.mm-menu_autoheight.mm-menu_position-bottom,.mm-menu_autoheight.mm-menu_position-top{max-height:80%}.mm-menu_autoheight-measuring .mm-panel{display:block!important}.mm-menu_autoheight-measuring .mm-listitem_vertical:not(.mm-listitem_opened) .mm-panel{display:none!important}.mm-menu_autoheight-measuring .mm-panels>.mm-panel{bottom:auto!important;height:auto!important}\n[class*=mm-menu_columns-]{-webkit-transition-property:width;-o-transition-property:width;transition-property:width}[class*=mm-menu_columns-] .mm-panels>.mm-panel{right:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:width,transform;transition-property:width,transform;transition-property:width,transform,-webkit-transform}[class*=mm-menu_columns-] .mm-panels>.mm-panel_opened,[class*=mm-menu_columns-] .mm-panels>.mm-panel_opened-parent{display:block!important}[class*=mm-panel_columns-]{border-right:1px solid;border-color:inherit}.mm-menu_columns-1 .mm-panel_columns-0,.mm-menu_columns-2 .mm-panel_columns-1,.mm-menu_columns-3 .mm-panel_columns-2,.mm-menu_columns-4 .mm-panel_columns-3{border-right:none}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-0{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_columns-0 .mm-panels>.mm-panel{z-index:0}.mm-menu_columns-0 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-0 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_columns-0{width:80%;min-width:240px;max-width:0}.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:0px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:0px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-1{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_columns-1 .mm-panels>.mm-panel{z-index:1;width:100%}.mm-menu_columns-1 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-1 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(200%,0,0);transform:translate3d(200%,0,0)}.mm-menu_columns-1{width:80%;min-width:240px;max-width:440px}.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0)}}.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-440px,0,0);transform:translate3d(-440px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-2{-webkit-transform:translate3d(200%,0,0);transform:translate3d(200%,0,0)}.mm-menu_columns-2 .mm-panels>.mm-panel{z-index:2;width:50%}.mm-menu_columns-2 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-2 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(300%,0,0);transform:translate3d(300%,0,0)}.mm-menu_columns-2{width:80%;min-width:240px;max-width:880px}.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:1100px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(880px,0,0);transform:translate3d(880px,0,0)}}.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:1100px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-880px,0,0);transform:translate3d(-880px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-3{-webkit-transform:translate3d(300%,0,0);transform:translate3d(300%,0,0)}.mm-menu_columns-3 .mm-panels>.mm-panel{z-index:3;width:33.34%}.mm-menu_columns-3 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-3 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(400%,0,0);transform:translate3d(400%,0,0)}.mm-menu_columns-3{width:80%;min-width:240px;max-width:1320px}.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:1650px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(1320px,0,0);transform:translate3d(1320px,0,0)}}.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:1650px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-1320px,0,0);transform:translate3d(-1320px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-4{-webkit-transform:translate3d(400%,0,0);transform:translate3d(400%,0,0)}.mm-menu_columns-4 .mm-panels>.mm-panel{z-index:4;width:25%}.mm-menu_columns-4 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-4 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(500%,0,0);transform:translate3d(500%,0,0)}.mm-menu_columns-4{width:80%;min-width:240px;max-width:1760px}.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:2200px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(1760px,0,0);transform:translate3d(1760px,0,0)}}.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:2200px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-1760px,0,0);transform:translate3d(-1760px,0,0)}}[class*=mm-menu_columns-].mm-menu_position-bottom,[class*=mm-menu_columns-].mm-menu_position-top{width:100%;max-width:100%;min-width:100%}.mm-wrapper_opening [class*=mm-menu_columns-].mm-menu_position-front{-webkit-transition-property:width,min-width,max-width,-webkit-transform;transition-property:width,min-width,max-width,-webkit-transform;-o-transition-property:width,min-width,max-width,transform;transition-property:width,min-width,max-width,transform;transition-property:width,min-width,max-width,transform,-webkit-transform}\n.mm-counter{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);text-align:right;display:block;min-width:44px;float:right}.mm-listitem_nosubitems>.mm-counter{display:none}[dir=rtl] .mm-counter{text-align:left;float:left}\n.mm-listitem_divider{opacity:1;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-menu_dividers-light .mm-listitem_divider{background:inherit;font-size:inherit;color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);padding-top:18px;padding-top:calc((var(--mm-listitem-size) - var(--mm-line-height)) * .75);padding-bottom:6px;padding-bottom:calc((var(--mm-listitem-size) - var(--mm-line-height)) * .25)}.mm-menu_border-none .mm-listitem_divider{border-top-width:1px;border-top-style:solid}.mm-listview_fixeddivider{background:inherit;display:none;width:100%;position:absolute;top:0;left:0;right:0;z-index:10}.mm-listview_fixeddivider:after{content:none!important;display:none!important}.mm-panel_dividers .mm-listview_fixeddivider{display:block}\n.mm-wrapper_opened.mm-dragging .mm-menu,.mm-wrapper_opened.mm-dragging .mm-slideout{-webkit-transition-duration:0s;-o-transition-duration:0s;transition-duration:0s}\n.mm-menu_dropdown{-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);height:80%}.mm-wrapper_dropdown .mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-wrapper_dropdown .mm-wrapper__blocker{-webkit-transition-delay:0s!important;-o-transition-delay:0s!important;transition-delay:0s!important;z-index:1}.mm-wrapper_dropdown .mm-menu_dropdown{z-index:2}.mm-wrapper_dropdown.mm-wrapper_opened:not(.mm-wrapper_opening) .mm-menu_dropdown{display:none}[class*=mm-menu_tip-]:before{content:'';background:inherit;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);display:block;width:15px;height:15px;position:absolute;z-index:0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.mm-menu_tip-left:before{left:22px}.mm-menu_tip-right:before{right:22px}.mm-menu_tip-top:before{top:-8px}.mm-menu_tip-bottom:before{bottom:-8px}\n.mm-menu{--mm-iconbar-size:44px}.mm-iconbar{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);border:0 solid rgba(0,0,0,.1);border-color:var(--mm-color-border);border-right-width:1px;text-align:center;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;width:44px;width:var(--mm-iconbar-size);position:absolute;top:0;left:0;bottom:0;z-index:2}.mm-menu_iconbar .mm-navbars_bottom,.mm-menu_iconbar .mm-navbars_top,.mm-menu_iconbar .mm-panels{left:44px;left:var(--mm-iconbar-size)}.mm-iconbar__bottom,.mm-iconbar__top{width:inherit;position:absolute}.mm-iconbar__bottom>*,.mm-iconbar__top>*{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:11px 0}.mm-iconbar__bottom a,.mm-iconbar__bottom a:hover,.mm-iconbar__top a,.mm-iconbar__top a:hover{text-decoration:none}.mm-iconbar__top{top:0}.mm-iconbar__bottom{bottom:0}.mm-iconbar__tab_selected{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}\n.mm-menu{--mm-iconpanel-size:44px}.mm-panel_iconpanel-1,.mm-panel_iconpanel-1.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 1));width:calc(100% - (var(--mm-iconpanel-size) * 1))}.mm-panel_iconpanel-2,.mm-panel_iconpanel-2.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 2));width:calc(100% - (var(--mm-iconpanel-size) * 2))}.mm-panel_iconpanel-3,.mm-panel_iconpanel-3.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 3));width:calc(100% - (var(--mm-iconpanel-size) * 3))}.mm-panel_iconpanel-first~.mm-panel,.mm-panel_iconpanel-first~.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - 44px);width:calc(100% - var(--mm-iconpanel-size))}.mm-menu_iconpanel .mm-panels>.mm-listview_fixeddivider,.mm-menu_iconpanel .mm-panels>.mm-panel{left:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:transform,width;transition-property:transform,width;transition-property:transform,width,-webkit-transform}.mm-menu_iconpanel .mm-panels>.mm-panel:not(.mm-panel_iconpanel-first):not(.mm-panel_iconpanel-0){border-left-width:1px;border-left-style:solid}.mm-menu_iconpanel .mm-panels>.mm-panel_opened,.mm-menu_iconpanel .mm-panels>.mm-panel_opened-parent{display:block!important}.mm-menu_iconpanel .mm-panels>.mm-panel_opened-parent{overflow-y:hidden;-webkit-transform:unset;-ms-transform:unset;transform:unset}.mm-menu_hidedivider .mm-panel_opened-parent .mm-listitem_divider,.mm-menu_hidenavbar .mm-panel_opened-parent .mm-navbar{opacity:0}.mm-panel__blocker{background:inherit;opacity:0;display:block;position:absolute;top:0;right:0;left:0;z-index:3;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-panel_opened-parent .mm-panel__blocker{opacity:.6;bottom:-100000px}[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-listview_fixeddivider,[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-panel{left:0;right:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:transform,width;transition-property:transform,width;transition-property:transform,width,-webkit-transform}[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-panel:not(.mm-panel_iconpanel-first):not(.mm-panel_iconpanel-0){border-left:none;border-right:1px solid;border-color:inherit}\n.mm-menu_keyboardfocus a:focus,.mm-menu_keyboardfocus.mm-menu_opened~.mm-wrapper__blocker a:focus{outline:0;background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-wrapper__blocker .mm-tabstart{cursor:default;display:block;width:100%;height:100%}.mm-wrapper__blocker .mm-tabend{opacity:0;position:absolute;bottom:0}\n.mm-navbars_bottom,.mm-navbars_top{background:inherit;border-color:inherit;border-width:0;position:absolute;left:0;right:0;z-index:1}.mm-navbars_bottom>.mm-navbar,.mm-navbars_top>.mm-navbar{border-width:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.mm-navbars_bottom>.mm-navbar:not(.mm-navbar_has-btns),.mm-navbars_top>.mm-navbar:not(.mm-navbar_has-btns){padding:0}.mm-navbars_bottom>.mm-navbar>:not(img):not(.mm-btn),.mm-navbars_top>.mm-navbar>:not(img):not(.mm-btn){-webkit-box-flex:1;-ms-flex:1;flex:1}.mm-navbars_top{border-bottom-style:solid;border-bottom-width:1px;top:0;bottom:auto}.mm-menu_navbar_top-1 .mm-panels{top:44px;top:calc(var(--mm-navbar-size) * 1)}.mm-menu_navbar_top-2 .mm-panels{top:88px;top:calc(var(--mm-navbar-size) * 2)}.mm-menu_navbar_top-3 .mm-panels{top:132px;top:calc(var(--mm-navbar-size) * 3)}.mm-menu_navbar_top-4 .mm-panels{top:176px;top:calc(var(--mm-navbar-size) * 4)}.mm-navbars_bottom{border-top-style:solid;border-top-width:1px;bottom:0;top:auto}.mm-menu_navbar_bottom-1 .mm-panels{bottom:44px;bottom:calc(var(--mm-navbar-size) * 1)}.mm-menu_navbar_bottom-2 .mm-panels{bottom:88px;bottom:calc(var(--mm-navbar-size) * 2)}.mm-menu_navbar_bottom-3 .mm-panels{bottom:132px;bottom:calc(var(--mm-navbar-size) * 3)}.mm-menu_navbar_bottom-4 .mm-panels{bottom:176px;bottom:calc(var(--mm-navbar-size) * 4)}.mm-navbar_size-2{height:88px;height:calc(var(--mm-navbar-size) * 2)}.mm-navbar_size-3{height:132px;height:calc(var(--mm-navbar-size) * 3)}.mm-navbar_size-4{height:176px;height:calc(var(--mm-navbar-size) * 4)}.mm-navbar__breadcrumbs{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-overflow-scrolling:touch;overflow-x:auto;text-align:left;padding:0 0 0 20px}.mm-navbar__breadcrumbs>*{display:inline-block;padding-right:6px;padding-top:12px;padding-top:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5);padding-bottom:12px;padding-bottom:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5)}.mm-navbar__breadcrumbs>a{text-decoration:underline}.mm-navbar_has-btns .mm-navbar__breadcrumbs{margin-left:-44px}.mm-navbar_has-btns .mm-btn:not(.mm-hidden)+.mm-navbar__breadcrumbs{margin-left:0;padding-left:0}.mm-navbar__tab_selected{background:inherit!important;color:inherit!important;border-width:1px;border-style:solid;border-color:inherit}.mm-navbar__tab_selected:first-child{border-left:none}.mm-navbar__tab_selected:last-child{border-right:none}.mm-navbars_top.mm-navbars_has-tabs .mm-navbar_tabs,.mm-navbars_top.mm-navbars_has-tabs .mm-navbar_tabs~.mm-navbar{background:inherit!important;color:inherit!important}.mm-navbars_top .mm-navbar_tabs:not(:last-child){border-bottom-width:1px;border-bottom-style:solid}.mm-navbars_top .mm-navbar__tab_selected{border-bottom:none;margin-bottom:-1px}.mm-navbars_top .mm-navbar_tabs:first-child .mm-navbar__tab_selected{border-top:none}.mm-navbars_bottom.mm-navbars_has-tabs .mm-navbar{background:inherit;color:inherit}.mm-navbars_bottom .mm-navbar_tabs:not(:first-child){border-top-width:1px;border-top-style:solid}.mm-navbars_bottom .mm-navbar__tab_selected{border-top:none;margin-top:-1px}.mm-navbars_bottom .mm-navbar_tabs:last-child .mm-navbar__tab_selected{border-bottom:none}.mm-navbar_tabs>a:not(.mm-navbar__tab_selected),.mm-navbars_bottom.mm-navbars_has-tabs .mm-navbar_tabs~.mm-navbar,.mm-navbars_top.mm-navbars_has-tabs>.mm-navbar:not(.mm-navbar_tabs){background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis);color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed)}\n.mm-searchfield{height:44px;height:var(--mm-navbar-size);padding:0;display:-webkit-box;display:-ms-flexbox;display:flex}.mm-searchfield input{border:none!important;outline:0!important;-webkit-box-shadow:none!important;box-shadow:none!important;border-radius:4px;background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight);color:rgba(0,0,0,.75);color:var(--mm-color-text);font:inherit;font-size:inherit;line-height:35.2px;line-height:calc(var(--mm-navbar-size) * .7);display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%;height:24px;height:calc(var(--mm-navbar-size) * .7);min-height:unset;max-height:unset;margin:0;padding:0 10px}.mm-searchfield input::-ms-clear{display:none}.mm-searchfield__input{padding:6.6px 10px 0 10px;padding-top:calc(var(--mm-navbar-size) * .15);position:relative}.mm-panel__noresultsmsg{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);text-align:center;font-size:150%;padding:44px 0}.mm-searchfield__btn{position:absolute;right:0;top:0;bottom:0}.mm-panel_search{left:0!important;right:0!important;width:100%!important;border-left:none!important}.mm-searchfield__input{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%}.mm-searchfield__cancel{line-height:44px;line-height:var(--mm-navbar-size);text-decoration:none;display:block;padding-right:10px;margin-right:-100px;-webkit-transition:margin .4s ease;-o-transition:margin .4s ease;transition:margin .4s ease}.mm-searchfield__cancel-active{margin-right:0}.mm-panel>.mm-searchfield{width:100%;position:absolute;top:0;left:0}.mm-panel_has-searchfield{padding-top:44px;padding-top:var(--mm-navbar-size)}.mm-panel_has-navbar.mm-panel_has-searchfield{padding-top:88px;padding-top:calc(var(--mm-navbar-size) * 2)}.mm-panel_has-navbar.mm-panel_has-searchfield>.mm-searchfield{top:44px;top:var(--mm-navbar-size)}.mm-listitem_nosubitems>.mm-listitem__btn{display:none}.mm-listitem_nosubitems>.mm-listitem__text{padding-right:10px}\n.mm-sectionindexer{background:inherit;text-align:center;font-size:12px;-webkit-box-sizing:border-box;box-sizing:border-box;width:20px;position:absolute;top:0;bottom:0;right:-20px;z-index:15;-webkit-transition:right .4s ease;-o-transition:right .4s ease;transition:right .4s ease;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly}.mm-sectionindexer a{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);line-height:1;text-decoration:none;display:block}.mm-sectionindexer~.mm-panels{-webkit-transition:right .4s ease;-o-transition:right .4s ease;transition:right .4s ease}.mm-menu_has-sectionindexer .mm-sectionindexer{right:0}.mm-menu_has-sectionindexer .mm-panels{right:20px}.mm-menu_navbar_top-1 .mm-sectionindexer{top:46px;top:calc((var(--mm-navbar-size) * 1) + 2px)}.mm-menu_navbar_top-2 .mm-sectionindexer{top:90px;top:calc((var(--mm-navbar-size) * 2) + 2px)}.mm-menu_navbar_top-3 .mm-sectionindexer{top:134px;top:calc((var(--mm-navbar-size) * 3) + 2px)}.mm-menu_navbar_top-4 .mm-sectionindexer{top:178px;top:calc((var(--mm-navbar-size) * 4) + 2px)}.mm-menu_navbar_bottom-1 .mm-sectionindexer{bottom:46px;bottom:calc((var(--mm-navbar-size) * 1) + 2px)}.mm-menu_navbar_bottom-2 .mm-sectionindexer{bottom:90px;bottom:calc((var(--mm-navbar-size) * 2) + 2px)}.mm-menu_navbar_bottom-3 .mm-sectionindexer{bottom:134px;bottom:calc((var(--mm-navbar-size) * 3) + 2px)}.mm-menu_navbar_bottom-4 .mm-sectionindexer{bottom:178px;bottom:calc((var(--mm-navbar-size) * 4) + 2px)}\n.mm-menu_selected-hover .mm-listitem>.mm-listitem__btn,.mm-menu_selected-hover .mm-listitem>.mm-listitem__text,.mm-menu_selected-parent .mm-listitem>.mm-listitem__btn,.mm-menu_selected-parent .mm-listitem>.mm-listitem__text{-webkit-transition:background .4s ease;-o-transition:background .4s ease;transition:background .4s ease}.mm-menu_selected-hover .mm-listview:hover>.mm-listitem_selected .mm-listitem__text{background:0 0}.mm-menu_selected-hover .mm-listitem__btn:hover,.mm-menu_selected-hover .mm-listitem__text:hover{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-menu_selected-parent .mm-panel_opened-parent .mm-listitem:not(.mm-listitem_selected-parent) .mm-listitem__text{background:0 0}.mm-menu_selected-parent .mm-listitem_selected-parent>.mm-listitem__btn,.mm-menu_selected-parent .mm-listitem_selected-parent>.mm-listitem__text{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}\n.mm-menu,.mm-slideout{--mm-sidebar-collapsed-size:44px;--mm-sidebar-expanded-size:440px}.mm-wrapper_sidebar-collapsed body,.mm-wrapper_sidebar-expanded body{position:relative}.mm-wrapper_sidebar-collapsed .mm-slideout,.mm-wrapper_sidebar-expanded .mm-slideout{-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:width,transform;transition-property:width,transform;transition-property:width,transform,-webkit-transform}.mm-wrapper_sidebar-collapsed .mm-page,.mm-wrapper_sidebar-expanded .mm-page{background:inherit;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:100vh}.mm-wrapper_sidebar-collapsed .mm-menu_sidebar-collapsed,.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{display:block!important;top:0!important;right:auto!important;bottom:0!important;left:0!important}.mm-wrapper_sidebar-collapsed:not(.mm-wrapper_opening) .mm-menu_hidedivider .mm-listitem_divider,.mm-wrapper_sidebar-collapsed:not(.mm-wrapper_opening) .mm-menu_hidenavbar .mm-navbar{opacity:0}.mm-wrapper_sidebar-collapsed .mm-slideout{width:calc(100% - 44px);width:calc(100% - var(--mm-sidebar-collapsed-size));-webkit-transform:translate3d(44px,0,0);transform:translate3d(44px,0,0);-webkit-transform:translate3d(var(--mm-sidebar-collapsed-size),0,0);transform:translate3d(var(--mm-sidebar-collapsed-size),0,0)}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{border-right-width:1px;border-right-style:solid;min-width:0!important;max-width:100000px!important}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded.mm-menu_pageshadow:after{content:none;display:none}.mm-wrapper_sidebar-expanded.mm-wrapper_blocking,.mm-wrapper_sidebar-expanded.mm-wrapper_blocking body{overflow:visible}.mm-wrapper_sidebar-expanded .mm-wrapper__blocker{display:none!important}.mm-wrapper_sidebar-expanded:not(.mm-wrapper_sidebar-closed) .mm-menu_sidebar-expanded.mm-menu_opened~.mm-slideout{width:calc(100% - 440px);width:calc(100% - var(--mm-sidebar-expanded-size));-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0);-webkit-transform:translate3d(var(--mm-sidebar-expanded-size),0,0);transform:translate3d(var(--mm-sidebar-expanded-size),0,0)}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{width:440px;width:var(--mm-sidebar-expanded-size)}.mm-menu__blocker{background:rgba(3,2,1,0);display:block;position:absolute;top:0;right:0;bottom:0;left:0;z-index:3}.mm-menu_opened .mm-menu__blocker{display:none}[dir=rtl].mm-wrapper_sidebar-collapsed .mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl].mm-wrapper_sidebar-expanded .mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl].mm-wrapper_sidebar-expanded:not(.mm-wrapper_sidebar-closed) .mm-menu_sidebar-expanded.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}\nlabel.mm-toggle{border-radius:34px;min-width:58px;width:58px;height:34px;margin:0 10px;margin-top:5px;margin-top:calc((var(--mm-listitem-size) - 34px)/ 2)}label.mm-toggle:before{content:'';display:block;border-radius:34px;width:32px;height:32px;margin:1px}input.mm-toggle{position:absolute;left:-10000px}input.mm-toggle:checked~label.mm-toggle:before{float:right}label.mm-toggle{background:rgba(0,0,0,.1);background:var(--mm-color-border)}label.mm-toggle:before{background:#f3f3f3;background:var(--mm-color-background)}input.mm-toggle:checked~label.mm-toggle{background:#4bd963}label.mm-check{width:34px;height:34px}label.mm-check:before{border-color:rgba(0,0,0,.75);border-color:var(--mm-color-text);content:'';display:block;border-left:3px solid;border-bottom:3px solid;width:40%;height:20%;margin:25% 0 0 20%;opacity:.1;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}input.mm-check{position:absolute;left:-10000px}input.mm-check:checked~label.mm-check:before{opacity:1}[dir=rtl] input.mm-toggle:checked~label.mm-toggle:before{float:left}\n.mm-menu_border-none .mm-listitem:after,.mm-panel_border-none .mm-listitem:after{content:none}.mm-menu_border-full .mm-listitem:after,.mm-panel_border-full .mm-listitem:after{left:0!important}.mm-menu_border-offset .mm-listitem:after,.mm-panel_border-offset .mm-listitem:after{right:20px}\n.mm-menu_fx-menu-zoom{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-wrapper_opened .mm-menu_fx-menu-zoom{-webkit-transform:scale(.7,.7) translate3d(-30%,0,0);transform:scale(.7,.7) translate3d(-30%,0,0);-webkit-transform-origin:left center;-ms-transform-origin:left center;transform-origin:left center}.mm-wrapper_opening .mm-menu_fx-menu-zoom{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-wrapper_opened .mm-menu_fx-menu-zoom.mm-menu_position-right{-webkit-transform:scale(.7,.7) translate3d(30%,0,0);transform:scale(.7,.7) translate3d(30%,0,0);-webkit-transform-origin:right center;-ms-transform-origin:right center;transform-origin:right center}.mm-wrapper_opening .mm-menu_fx-menu-zoom.mm-menu_position-right{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-menu_fx-menu-slide{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-wrapper_opened .mm-menu_fx-menu-slide{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}.mm-wrapper_opening .mm-menu_fx-menu-slide{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-wrapper_opened .mm-menu_fx-menu-slide.mm-menu_position-right{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}.mm-wrapper_opening .mm-menu_fx-menu-slide.mm-menu_position-right{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-menu-fade{opacity:0;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-wrapper_opening .mm-menu_fx-menu-fade{opacity:1}.mm-menu_fx-panels-none .mm-panel,.mm-panel_fx-none{-webkit-transition-property:none;-o-transition-property:none;transition-property:none}.mm-menu_fx-panels-none .mm-panel.mm-panel_opened-parent,.mm-panel_fx-none.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-zoom .mm-panel,.mm-panel_fx-zoom{-webkit-transform-origin:left center;-ms-transform-origin:left center;transform-origin:left center;-webkit-transform:scale(1.5,1.5) translate3d(100%,0,0);transform:scale(1.5,1.5) translate3d(100%,0,0)}.mm-menu_fx-panels-zoom .mm-panel.mm-panel_opened,.mm-panel_fx-zoom.mm-panel_opened{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-menu_fx-panels-zoom .mm-panel.mm-panel_opened-parent,.mm-panel_fx-zoom.mm-panel_opened-parent{-webkit-transform:scale(.7,.7) translate3d(-30%,0,0);transform:scale(.7,.7) translate3d(-30%,0,0)}.mm-menu_fx-panels-slide-0 .mm-panel_opened-parent,.mm-panel_fx-slide-0.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-slide-100 .mm-panel_opened-parent,.mm-panel_fx-slide-100.mm-panel_opened-parent{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_fx-panels-slide-up .mm-panel,.mm-panel_fx-slide-up{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.mm-menu_fx-panels-slide-up .mm-panel_opened,.mm-menu_fx-panels-slide-up .mm-panel_opened-parent,.mm-panel_fx-slide-up.mm-panel_opened{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-slide-right .mm-panel,.mm-panel_fx-slide-right{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_fx-panels-slide-right .mm-panel_opened,.mm-menu_fx-panels-slide-right .mm-panel_opened-parent,.mm-panel_fx-slide-right.mm-panel_opened{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[class*=mm-menu_fx-listitems-] .mm-listitem{-webkit-transition:none .4s ease;-o-transition:none .4s ease;transition:none .4s ease}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(1){-webkit-transition-delay:50ms;-o-transition-delay:50ms;transition-delay:50ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(2){-webkit-transition-delay:.1s;-o-transition-delay:.1s;transition-delay:.1s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(3){-webkit-transition-delay:150ms;-o-transition-delay:150ms;transition-delay:150ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(4){-webkit-transition-delay:.2s;-o-transition-delay:.2s;transition-delay:.2s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(5){-webkit-transition-delay:250ms;-o-transition-delay:250ms;transition-delay:250ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(6){-webkit-transition-delay:.3s;-o-transition-delay:.3s;transition-delay:.3s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(7){-webkit-transition-delay:350ms;-o-transition-delay:350ms;transition-delay:350ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(8){-webkit-transition-delay:.4s;-o-transition-delay:.4s;transition-delay:.4s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(9){-webkit-transition-delay:450ms;-o-transition-delay:450ms;transition-delay:450ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(10){-webkit-transition-delay:.5s;-o-transition-delay:.5s;transition-delay:.5s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(11){-webkit-transition-delay:550ms;-o-transition-delay:550ms;transition-delay:550ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(12){-webkit-transition-delay:.6s;-o-transition-delay:.6s;transition-delay:.6s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(13){-webkit-transition-delay:650ms;-o-transition-delay:650ms;transition-delay:650ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(14){-webkit-transition-delay:.7s;-o-transition-delay:.7s;transition-delay:.7s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(15){-webkit-transition-delay:750ms;-o-transition-delay:750ms;transition-delay:750ms}.mm-menu_fx-listitems-slide .mm-listitem{-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;-o-transition-property:transform,opacity;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transform:translate3d(50%,0,0);transform:translate3d(50%,0,0);opacity:0}.mm-wrapper_opening .mm-menu_fx-listitems-slide .mm-panel_opened .mm-listitem{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.mm-menu_fx-listitems-fade .mm-listitem{-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity;opacity:0}.mm-wrapper_opening .mm-menu_fx-listitems-fade .mm-panel_opened .mm-listitem{opacity:1}.mm-menu_fx-listitems-drop .mm-listitem{-webkit-transition-property:opacity,top;-o-transition-property:opacity,top;transition-property:opacity,top;opacity:0;top:-25%}.mm-wrapper_opening .mm-menu_fx-listitems-drop .mm-panel_opened .mm-listitem{opacity:1;top:0}\n.mm-menu_fullscreen{width:100%;min-width:140px;max-width:10000px}.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(100vw,0,0);transform:translate3d(100vw,0,0)}@media all and (max-width:140px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(140px,0,0);transform:translate3d(140px,0,0)}}@media all and (min-width:10000px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(10000px,0,0);transform:translate3d(10000px,0,0)}}.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-100vw,0,0);transform:translate3d(-100vw,0,0)}@media all and (max-width:140px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-140px,0,0);transform:translate3d(-140px,0,0)}}@media all and (min-width:10000px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-10000px,0,0);transform:translate3d(-10000px,0,0)}}.mm-menu_fullscreen.mm-menu_position-top{height:100vh;min-height:140px;max-height:10000px}.mm-menu_fullscreen.mm-menu_position-bottom{height:100vh;min-height:140px;max-height:10000px}\n.mm-menu_listview-justify .mm-panels>.mm-panel:after,.mm-menu_listview-justify .mm-panels>.mm-panel:before,.mm-panels>.mm-panel_listview-justify:after,.mm-panels>.mm-panel_listview-justify:before{content:none;display:none}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listview,.mm-panels>.mm-panel_listview-justify .mm-listview{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;margin-top:0;margin-bottom:0}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem,.mm-panels>.mm-panel_listview-justify .mm-listitem{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;min-height:44px}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem:not(.mm-listitem_divider),.mm-panels>.mm-panel_listview-justify .mm-listitem:not(.mm-listitem_divider){display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem__text,.mm-panels>.mm-panel_listview-justify .mm-listitem__text{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mm-listview_inset{list-style:inside disc;width:100%;padding:0 30px 15px 30px;margin:0}.mm-listview_inset .mm-listitem{padding:5px 0}\n.mm-menu_multiline .mm-listitem__text,.mm-panel_multiline .mm-listitem__text{-o-text-overflow:clip;text-overflow:clip;white-space:normal}\n[class*=mm-menu_pagedim].mm-menu_opened~.mm-wrapper__blocker{opacity:0}.mm-wrapper_opening [class*=mm-menu_pagedim].mm-menu_opened~.mm-wrapper__blocker{opacity:.3;-webkit-transition:opacity .4s ease .4s;-o-transition:opacity .4s ease .4s;transition:opacity .4s ease .4s}.mm-menu_opened.mm-menu_pagedim~.mm-wrapper__blocker{background:inherit}.mm-menu_opened.mm-menu_pagedim-black~.mm-wrapper__blocker{background:#000}.mm-menu_opened.mm-menu_pagedim-white~.mm-wrapper__blocker{background:#fff}\n.mm-menu_popup{-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease;opacity:0;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);height:80%;min-height:140px;max-height:880px;top:50%;left:50%;bottom:auto;right:auto;z-index:2;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.mm-menu_popup.mm-menu_opened~.mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-menu_popup.mm-menu_opened~.mm-wrapper__blocker{-webkit-transition-delay:0s!important;-o-transition-delay:0s!important;transition-delay:0s!important;z-index:1}.mm-wrapper_opening .mm-menu_popup{opacity:1}\n.mm-menu_position-right{left:auto;right:0}.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-440px,0,0);transform:translate3d(-440px,0,0)}}.mm-menu_position-bottom,.mm-menu_position-front,.mm-menu_position-top{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-menu_position-bottom.mm-menu_opened,.mm-menu_position-front.mm-menu_opened,.mm-menu_position-top.mm-menu_opened{z-index:2}.mm-menu_position-bottom.mm-menu_opened~.mm-slideout,.mm-menu_position-front.mm-menu_opened~.mm-slideout,.mm-menu_position-top.mm-menu_opened~.mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-menu_position-bottom.mm-menu_opened~.mm-wrapper__blocker,.mm-menu_position-front.mm-menu_opened~.mm-wrapper__blocker,.mm-menu_position-top.mm-menu_opened~.mm-wrapper__blocker{z-index:1}.mm-menu_position-front{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_position-front.mm-menu_position-right{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_position-bottom,.mm-menu_position-top{width:100%;min-width:100%;max-width:100%}.mm-menu_position-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}.mm-menu_position-top{height:80vh;min-height:140px;max-height:880px}.mm-menu_position-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);top:auto}.mm-menu_position-bottom{height:80vh;min-height:140px;max-height:880px}.mm-wrapper_opening .mm-menu_position-bottom,.mm-wrapper_opening .mm-menu_position-front,.mm-wrapper_opening .mm-menu_position-top{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}\n.mm-menu_shadow-page:after{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow);content:\"\";display:block;width:20px;height:120%;position:absolute;left:100%;top:-10%;z-index:100;-webkit-clip-path:polygon(-20px 0,0 0,0 100%,-20px 100%);clip-path:polygon(-20px 0,0 0,0 100%,-20px 100%)}.mm-menu_shadow-page.mm-menu_position-right:after{left:auto;right:100%;-webkit-clip-path:polygon(20px 0,40px 0,40px 100%,20px 100%);clip-path:polygon(20px 0,40px 0,40px 100%,20px 100%)}.mm-menu_shadow-page.mm-menu_position-front:after{content:none;display:none}.mm-menu_shadow-menu{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow)}.mm-menu_shadow-panels .mm-panels>.mm-panel{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow)}\n.mm-menu_theme-white{--mm-color-border:rgba( 0,0,0, 0.1 );--mm-color-button:rgba( 0,0,0, 0.3 );--mm-color-text:rgba( 0,0,0, 0.7 );--mm-color-text-dimmed:rgba( 0,0,0, 0.3 );--mm-color-background:#fff;--mm-color-background-highlight:rgba( 0,0,0, 0.06 );--mm-color-background-emphasis:rgba( 0,0,0, 0.03 );--mm-shadow:0 0 10px rgba( 0,0,0, 0.2 )}.mm-menu_theme-dark{--mm-color-border:rgba( 0,0,0, 0.3 );--mm-color-button:rgba( 255,255,255, 0.4 );--mm-color-text:rgba( 255,255,255, 0.85 );--mm-color-text-dimmed:rgba( 255,255,255, 0.4 );--mm-color-background:#333;--mm-color-background-highlight:rgba( 255,255,255, 0.08 );--mm-color-background-emphasis:rgba( 0,0,0, 0.1 );--mm-shadow:0 0 20px rgba( 0,0,0, 0.5 )}.mm-menu_theme-black{--mm-color-border:rgba( 255,255,255, 0.25 );--mm-color-button:rgba( 255,255,255, 0.4 );--mm-color-text:rgba( 255,255,255, 0.75 );--mm-color-text-dimmed:rgba( 255,255,255, 0.4 );--mm-color-background:#000;--mm-color-background-highlight:rgba( 255,255,255, 0.2 );--mm-color-background-emphasis:rgba( 255,255,255, 0.15 );--mm-shadow:none}\n.mm-menu_tileview .mm-listview,.mm-panel_tileview .mm-listview{margin:0!important}.mm-menu_tileview .mm-listview:after,.mm-panel_tileview .mm-listview:after{content:'';display:block;clear:both}.mm-menu_tileview .mm-listitem,.mm-panel_tileview .mm-listitem{padding:0;float:left;position:relative;width:50%;height:0;padding-top:50%}.mm-menu_tileview .mm-listitem:after,.mm-panel_tileview .mm-listitem:after{left:0;top:0;border-right-width:1px;border-right-style:solid;z-index:-1}.mm-menu_tileview .mm-listitem.mm-tile-xs,.mm-panel_tileview .mm-listitem.mm-tile-xs{width:12.5%;padding-top:12.5%}.mm-menu_tileview .mm-listitem.mm-tile-s,.mm-panel_tileview .mm-listitem.mm-tile-s{width:25%;padding-top:25%}.mm-menu_tileview .mm-listitem.mm-tile-l,.mm-panel_tileview .mm-listitem.mm-tile-l{width:75%;padding-top:75%}.mm-menu_tileview .mm-listitem.mm-tile-xl,.mm-panel_tileview .mm-listitem.mm-tile-xl{width:100%;padding-top:100%}.mm-menu_tileview .mm-listitem__text,.mm-panel_tileview .mm-listitem__text{line-height:1px;text-align:center;padding:50% 10px 0 10px;margin:0;position:absolute;top:0;right:1px;bottom:1px;left:0}.mm-menu_tileview .mm-listitem__btn,.mm-panel_tileview .mm-listitem__btn{width:auto}.mm-menu_tileview .mm-listitem__btn:after,.mm-menu_tileview .mm-listitem__btn:before,.mm-panel_tileview .mm-listitem__btn:after,.mm-panel_tileview .mm-listitem__btn:before{content:none;display:none}.mm-menu_tileview .mm-listitem_divider,.mm-panel_tileview .mm-listitem_divider{display:none}.mm-menu_tileview .mm-panel,.mm-panel_tileview{padding-left:0;padding-right:0}.mm-menu_tileview .mm-panel:after,.mm-menu_tileview .mm-panel:before,.mm-panel_tileview:after,.mm-panel_tileview:before{content:none;display:none}\nbody.modal-open .mm-slideout{z-index:unset}", "", {"version":3,"sources":["/Users/kirstynoble/Sites/ifm.com/node_modules/jquery.mmenu/dist/jquery.mmenu.all.css"],"names":[],"mappings":"AAAA;;;;;;;;;;;GAWG,SAAS,sBAAsB,wBAAwB,sBAAsB,kBAAkB,oBAAoB,qBAAqB,mBAAmB,qCAAqC,qCAAqC,oCAAoC,0CAA0C,8BAA8B,oDAAoD,wDAAwD,uCAAuC,CAAC,WAAW,sBAAsB,CAAC,YAAY,kBAAkB,iBAAiB,CAAC,SAAS,mBAAmB,4BAA4B,sBAAsB,sCAAsC,oCAAoC,2BAA2B,iBAAiB,kCAAkC,8BAA8B,sBAAsB,cAAc,UAAU,SAAS,kBAAkB,UAAU,MAAM,QAAQ,SAAS,OAAO,yBAAyB,6BAA6B,+BAA+B,2BAA2B,mCAAmC,iCAAiC,CAAC,iFAAiF,cAAc,oBAAoB,CAAC,mBAAmB,aAAa,CAAC,gCAAgC,kBAAkB,OAAO,QAAQ,MAAM,SAAS,SAAS,CAAC,qBAAqB,8BAA8B,sBAAsB,mBAAmB,4BAA4B,sBAAsB,sCAAsC,oCAAoC,0BAA0B,CAAC,WAAW,eAAe,CAAC,UAAU,iCAAiC,gBAAgB,kBAAkB,gBAAgB,WAAW,eAAe,wCAAwC,gCAAgC,8CAA8C,sCAAsC,iCAAiC,8BAA8B,wDAAwD,CAAC,0BAA0B,aAAa,CAAC,iCAAiC,WAAW,cAAc,WAAW,CAAC,qBAAqB,iBAAiB,iCAAiC,CAAC,iBAAiB,UAAU,qCAAqC,4BAA4B,CAAC,wBAAwB,wCAAwC,+BAA+B,CAAC,kBAAkB,SAAS,CAAC,sBAAsB,kCAAkC,6BAA6B,yBAAyB,CAAC,6CAA6C,qCAAqC,4BAA4B,CAAC,0CAA0C,yCAAyC,gCAAgC,CAAC,2CAA2C,uCAAuC,8BAA8B,CAAC,gCAAgC,iCAAiC,6BAA6B,yBAAyB,aAAa,WAAW,wBAAwB,CAAC,6EAA6E,aAAa,YAAY,CAAC,8BAA8B,aAAa,CAAC,wCAAwC,YAAY,+BAA+B,WAAW,CAAC,oDAAoD,wBAAwB,CAAC,4CAA4C,iCAAiC,6BAA6B,yBAAyB,UAAU,CAAC,QAAQ,8BAA8B,sBAAsB,WAAW,SAAS,CAAC,6BAA6B,4BAA4B,oCAAoC,iBAAiB,kBAAkB,CAAC,yCAAyC,WAAW,+BAA+B,uBAAuB,cAAc,UAAU,WAAW,YAAY,kBAAkB,MAAM,SAAS,iCAAiC,6BAA6B,wBAAwB,CAAC,qBAAqB,kBAAkB,mBAAmB,UAAU,CAAC,oBAAoB,iBAAiB,gBAAgB,UAAU,CAAC,uCAAuC,WAAW,mBAAmB,kBAAkB,+BAA+B,uBAAuB,cAAc,UAAU,WAAW,YAAY,kBAAkB,MAAM,QAAQ,CAAC,oBAAoB,iCAAiC,6BAA6B,yBAAyB,UAAU,UAAU,CAAC,mBAAmB,iCAAiC,6BAA6B,yBAAyB,WAAW,SAAS,CAAC,6BAA6B,iCAAiC,6BAA6B,yBAAyB,UAAU,UAAU,CAAC,8BAA8B,iCAAiC,6BAA6B,yBAAyB,WAAW,SAAS,CAAC,6DAA6D,UAAU,CAAC,+BAA+B,SAAS,CAAC,8BAA8B,SAAS,CAAC,WAAW,mBAAmB,4BAA4B,qBAAqB,sCAAsC,oCAAoC,kCAAkC,wBAAwB,0BAA0B,kBAAkB,aAAa,YAAY,6BAA6B,eAAe,SAAS,kBAAkB,MAAM,OAAO,QAAQ,UAAU,oCAAoC,+BAA+B,2BAA2B,CAAC,aAAa,8BAA8B,sBAAsB,cAAc,aAAa,mEAAmE,eAAe,eAAe,CAAC,gCAAgC,oBAAoB,CAAC,kBAAkB,0BAA0B,uBAAuB,mBAAmB,eAAe,CAAC,gBAAgB,kBAAkB,MAAM,SAAS,SAAS,CAAC,4BAA4B,gBAAgB,MAAM,CAAC,2BAA2B,iBAAiB,OAAO,CAAC,gCAAgC,aAAa,CAAC,sCAAsC,iBAAiB,QAAQ,SAAS,CAAC,qCAAqC,gBAAgB,OAAO,UAAU,CAAC,0BAA0B,gBAAgB,cAAc,UAAU,QAAQ,CAAC,aAAa,sBAAsB,2BAA2B,4BAA4B,oCAAoC,kBAAkB,oBAAoB,oBAAoB,aAAa,mBAAmB,cAAc,CAAC,mBAAmB,WAAW,qBAAqB,wBAAwB,0BAA0B,cAAc,kBAAkB,UAAU,QAAQ,QAAQ,CAAC,oCAAoC,oBAAoB,CAAC,qCAAqC,cAAc,cAAc,iBAAiB,uEAAuE,oBAAoB,yEAAyE,CAAC,mBAAmB,0BAA0B,uBAAuB,mBAAmB,gBAAgB,kBAAkB,mBAAmB,mBAAmB,oBAAoB,YAAY,4BAA4B,cAAc,CAAC,kBAAkB,iDAAiD,yCAAyC,gEAAgE,wDAAwD,yBAAyB,qBAAqB,WAAW,mBAAmB,iBAAiB,CAAC,0CAA0C,sBAAsB,uBAAuB,CAAC,yCAAyC,gCAAgC,8CAA8C,CAAC,oEAAoE,2BAA2B,+CAA+C,CAAC,kCAAkC,iBAAiB,CAAC,2FAA2F,gBAAgB,CAAC,qBAAqB,0BAA0B,uBAAuB,mBAAmB,gBAAgB,2BAA2B,gDAAgD,cAAc,yBAAyB,gBAAgB,iCAAiC,cAAc,6EAA6E,mBAAmB,iBAAiB,CAAC,oBAAoB,iBAAiB,mCAAmC,CAAC,iCAAiC,SAAS,2BAA2B,CAAC,6BAA6B,OAAO,UAAU,CAAC,6BAA6B,kBAAkB,kBAAkB,CAAC,4BAA4B,kBAAkB,oBAAoB,sBAAsB,CAAC,oDAAoD,gBAAgB,uBAAuB,wBAAwB,CAAC;AAC/rR,SAAS,8BAA8B,sBAAsB,iBAAiB,CAAC,aAAa,8CAA8C,sCAAsC,iCAAiC,8BAA8B,yDAAyD,SAAS,CAAC,mBAAmB,kBAAkB,iBAAiB,CAAC,gCAAgC,kBAAkB,CAAC,mBAAmB,aAAa,eAAe,WAAW,SAAS,CAAC,kCAAkC,aAAa,CAAC,mBAAmB,UAAU,gBAAgB,eAAe,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,qBAAqB,yBAAyB,gBAAgB,aAAa,WAAW,YAAY,eAAe,MAAM,OAAO,SAAS,CAAC,qBAAqB,eAAe,CAAC,0BAA0B,eAAe,CAAC,0CAA0C,aAAa,CAAC;AACr0C,WAAW,mBAAmB,qCAAqC,uCAAuC,+BAA+B,6BAA6B,oBAAoB,wBAAwB,qBAAqB,yBAAyB,oBAAoB,0BAA0B,2BAA2B,CAAC;AAC1U,oBAAoB,iCAAiC,4BAA4B,yBAAyB,qDAAqD,6CAA6C,wCAAwC,qCAAqC,sDAAsD,CAAC,4CAA4C,iBAAiB,CAAC,qFAAqF,cAAc,CAAC,wCAAwC,uBAAuB,CAAC,uFAAuF,sBAAsB,CAAC,mDAAmD,sBAAsB,qBAAqB,CAAC;AAC/vB,0BAA0B,kCAAkC,6BAA6B,yBAAyB,CAAC,+CAA+C,WAAW,oDAAoD,4CAA4C,uCAAuC,oCAAoC,qDAAqD,CAAC,mHAAmH,uBAAuB,CAAC,2BAA2B,uBAAuB,oBAAoB,CAAC,4JAA4J,iBAAiB,CAAC,yDAAyD,qCAAqC,4BAA4B,CAAC,wCAAwC,SAAS,CAAC,6CAA6C,UAAU,CAAC,2FAA2F,wCAAwC,+BAA+B,CAAC,mBAAmB,UAAU,gBAAgB,WAAW,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,+BAA+B,mEAAmE,qCAAqC,4BAA4B,CAAC,CAAC,0FAA0F,yCAAyC,gCAAgC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,+BAA+B,0FAA0F,qCAAqC,4BAA4B,CAAC,CAAC,yDAAyD,wCAAwC,+BAA+B,CAAC,wCAAwC,UAAU,UAAU,CAAC,6CAA6C,UAAU,CAAC,2FAA2F,wCAAwC,+BAA+B,CAAC,mBAAmB,UAAU,gBAAgB,eAAe,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,0FAA0F,yCAAyC,gCAAgC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,yDAAyD,wCAAwC,+BAA+B,CAAC,wCAAwC,UAAU,SAAS,CAAC,6CAA6C,UAAU,CAAC,2FAA2F,wCAAwC,+BAA+B,CAAC,mBAAmB,UAAU,gBAAgB,eAAe,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,kCAAkC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,0FAA0F,yCAAyC,gCAAgC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,kCAAkC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,yDAAyD,wCAAwC,+BAA+B,CAAC,wCAAwC,UAAU,YAAY,CAAC,6CAA6C,UAAU,CAAC,2FAA2F,wCAAwC,+BAA+B,CAAC,mBAAmB,UAAU,gBAAgB,gBAAgB,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,kCAAkC,mEAAmE,0CAA0C,iCAAiC,CAAC,CAAC,0FAA0F,yCAAyC,gCAAgC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,kCAAkC,0FAA0F,2CAA2C,kCAAkC,CAAC,CAAC,yDAAyD,wCAAwC,+BAA+B,CAAC,wCAAwC,UAAU,SAAS,CAAC,6CAA6C,UAAU,CAAC,2FAA2F,wCAAwC,+BAA+B,CAAC,mBAAmB,UAAU,gBAAgB,gBAAgB,CAAC,mEAAmE,wCAAwC,+BAA+B,CAAC,iCAAiC,mEAAmE,yCAAyC,gCAAgC,CAAC,CAAC,kCAAkC,mEAAmE,0CAA0C,iCAAiC,CAAC,CAAC,0FAA0F,yCAAyC,gCAAgC,CAAC,iCAAiC,0FAA0F,0CAA0C,iCAAiC,CAAC,CAAC,kCAAkC,0FAA0F,2CAA2C,kCAAkC,CAAC,CAAC,iGAAiG,WAAW,eAAe,cAAc,CAAC,qEAAqE,wEAAwE,gEAAgE,2DAA2D,wDAAwD,yEAAyE,CAAC;AACtsR,YAAY,qBAAqB,kCAAkC,iBAAiB,cAAc,eAAe,WAAW,CAAC,oCAAoC,YAAY,CAAC,sBAAsB,gBAAgB,UAAU,CAAC;AAC/N,qBAAqB,UAAU,oCAAoC,+BAA+B,2BAA2B,CAAC,6CAA6C,mBAAmB,kBAAkB,qBAAqB,kCAAkC,iBAAiB,0EAA0E,mBAAmB,4EAA4E,CAAC,0CAA0C,qBAAqB,sBAAsB,CAAC,0BAA0B,mBAAmB,aAAa,WAAW,kBAAkB,MAAM,OAAO,QAAQ,UAAU,CAAC,gCAAgC,uBAAuB,sBAAsB,CAAC,6CAA6C,aAAa,CAAC;AACxxB,oFAAoF,+BAA+B,0BAA0B,sBAAsB,CAAC;AACpK,kBAAkB,6CAA6C,qCAAqC,UAAU,CAAC,kCAAkC,iCAAiC,6BAA6B,yBAAyB,SAAS,CAAC,0CAA0C,sCAAsC,iCAAiC,8BAA8B,SAAS,CAAC,uCAAuC,SAAS,CAAC,kFAAkF,YAAY,CAAC,6BAA6B,WAAW,mBAAmB,6CAA6C,qCAAqC,cAAc,WAAW,YAAY,kBAAkB,UAAU,gCAAgC,4BAA4B,uBAAuB,CAAC,yBAAyB,SAAS,CAAC,0BAA0B,UAAU,CAAC,wBAAwB,QAAQ,CAAC,2BAA2B,WAAW,CAAC;AAC78B,SAAS,sBAAsB,CAAC,YAAY,qBAAqB,kCAAkC,8BAA8B,oCAAoC,uBAAuB,kBAAkB,gBAAgB,8BAA8B,sBAAsB,WAAW,6BAA6B,kBAAkB,MAAM,OAAO,SAAS,SAAS,CAAC,iGAAiG,UAAU,2BAA2B,CAAC,qCAAqC,cAAc,iBAAiB,CAAC,yCAAyC,8BAA8B,sBAAsB,cAAc,cAAc,CAAC,8FAA8F,oBAAoB,CAAC,iBAAiB,KAAK,CAAC,oBAAoB,QAAQ,CAAC,0BAA0B,gCAAgC,8CAA8C,CAAC;AACl8B,SAAS,wBAAwB,CAAC,sFAAsF,8BAA8B,iDAAiD,CAAC,sFAAsF,8BAA8B,iDAAiD,CAAC,sFAAsF,8BAA8B,iDAAiD,CAAC,yGAAyG,wBAAwB,2CAA2C,CAAC,gGAAgG,UAAU,oDAAoD,4CAA4C,uCAAuC,oCAAoC,qDAAqD,CAAC,kGAAkG,sBAAsB,uBAAuB,CAAC,qGAAqG,uBAAuB,CAAC,sDAAsD,kBAAkB,wBAAwB,oBAAoB,eAAe,CAAC,yHAAyH,SAAS,CAAC,mBAAmB,mBAAmB,UAAU,cAAc,kBAAkB,MAAM,QAAQ,OAAO,UAAU,oCAAoC,+BAA+B,2BAA2B,CAAC,2CAA2C,WAAW,gBAAgB,CAAC,oHAAoH,OAAO,WAAW,oDAAoD,4CAA4C,uCAAuC,oCAAoC,qDAAqD,CAAC,4GAA4G,iBAAiB,uBAAuB,oBAAoB,CAAC;AACr0E,kGAAkG,UAAU,gCAAgC,8CAA8C,CAAC,kCAAkC,eAAe,cAAc,WAAW,WAAW,CAAC,gCAAgC,UAAU,kBAAkB,QAAQ,CAAC;AACtV,mCAAmC,mBAAmB,qBAAqB,eAAe,kBAAkB,OAAO,QAAQ,SAAS,CAAC,yDAAyD,eAAe,oBAAoB,oBAAoB,aAAa,iBAAiB,CAAC,2GAA2G,SAAS,CAAC,uGAAuG,mBAAmB,WAAW,MAAM,CAAC,gBAAgB,0BAA0B,wBAAwB,MAAM,WAAW,CAAC,iCAAiC,SAAS,mCAAmC,CAAC,iCAAiC,SAAS,mCAAmC,CAAC,iCAAiC,UAAU,mCAAmC,CAAC,iCAAiC,UAAU,mCAAmC,CAAC,mBAAmB,uBAAuB,qBAAqB,SAAS,QAAQ,CAAC,oCAAoC,YAAY,sCAAsC,CAAC,oCAAoC,YAAY,sCAAsC,CAAC,oCAAoC,aAAa,sCAAsC,CAAC,oCAAoC,aAAa,sCAAsC,CAAC,kBAAkB,YAAY,sCAAsC,CAAC,kBAAkB,aAAa,sCAAsC,CAAC,kBAAkB,aAAa,sCAAsC,CAAC,wBAAwB,0BAA0B,uBAAuB,mBAAmB,gBAAgB,iCAAiC,gBAAgB,gBAAgB,kBAAkB,CAAC,0BAA0B,qBAAqB,kBAAkB,iBAAiB,uEAAuE,oBAAoB,yEAAyE,CAAC,0BAA0B,yBAAyB,CAAC,4CAA4C,iBAAiB,CAAC,oEAAoE,cAAc,cAAc,CAAC,yBAAyB,6BAA6B,wBAAwB,iBAAiB,mBAAmB,oBAAoB,CAAC,qCAAqC,gBAAgB,CAAC,oCAAoC,iBAAiB,CAAC,mHAAmH,6BAA6B,uBAAuB,CAAC,iDAAiD,wBAAwB,yBAAyB,CAAC,yCAAyC,mBAAmB,kBAAkB,CAAC,qEAAqE,eAAe,CAAC,kDAAkD,mBAAmB,aAAa,CAAC,qDAAqD,qBAAqB,sBAAsB,CAAC,4CAA4C,gBAAgB,eAAe,CAAC,uEAAuE,kBAAkB,CAAC,sLAAsL,gCAAgC,+CAA+C,qBAAqB,iCAAiC,CAAC;AACr+G,gBAAgB,YAAY,6BAA6B,UAAU,oBAAoB,oBAAoB,YAAY,CAAC,sBAAsB,sBAAsB,oBAAoB,kCAAkC,0BAA0B,kBAAkB,2BAA2B,gDAAgD,sBAAsB,2BAA2B,aAAa,kBAAkB,mBAAmB,6CAA6C,cAAc,8BAA8B,sBAAsB,WAAW,eAAe,YAAY,wCAAwC,iBAAiB,iBAAiB,SAAS,cAAc,CAAC,iCAAiC,YAAY,CAAC,uBAAuB,0BAA0B,8CAA8C,iBAAiB,CAAC,wBAAwB,qBAAqB,kCAAkC,kBAAkB,eAAe,cAAc,CAAC,qBAAqB,kBAAkB,QAAQ,MAAM,QAAQ,CAAC,iBAAiB,iBAAiB,kBAAkB,qBAAqB,0BAA0B,CAAC,uBAAuB,mBAAmB,WAAW,OAAO,8BAA8B,sBAAsB,WAAW,cAAc,CAAC,wBAAwB,iBAAiB,kCAAkC,qBAAqB,cAAc,mBAAmB,oBAAoB,mCAAmC,8BAA8B,0BAA0B,CAAC,+BAA+B,cAAc,CAAC,0BAA0B,WAAW,kBAAkB,MAAM,MAAM,CAAC,0BAA0B,iBAAiB,iCAAiC,CAAC,8CAA8C,iBAAiB,2CAA2C,CAAC,8DAA8D,SAAS,yBAAyB,CAAC,0CAA0C,YAAY,CAAC,2CAA2C,kBAAkB,CAAC;AACt+D,mBAAmB,mBAAmB,kBAAkB,eAAe,8BAA8B,sBAAsB,WAAW,kBAAkB,MAAM,SAAS,YAAY,WAAW,kCAAkC,6BAA6B,0BAA0B,oBAAoB,oBAAoB,aAAa,4BAA4B,6BAA6B,0BAA0B,sBAAsB,8BAA8B,2BAA2B,4BAA4B,CAAC,qBAAqB,qBAAqB,kCAAkC,cAAc,qBAAqB,aAAa,CAAC,8BAA8B,kCAAkC,6BAA6B,yBAAyB,CAAC,+CAA+C,OAAO,CAAC,uCAAuC,UAAU,CAAC,yCAAyC,SAAS,2CAA2C,CAAC,yCAAyC,SAAS,2CAA2C,CAAC,yCAAyC,UAAU,2CAA2C,CAAC,yCAAyC,UAAU,2CAA2C,CAAC,4CAA4C,YAAY,8CAA8C,CAAC,4CAA4C,YAAY,8CAA8C,CAAC,4CAA4C,aAAa,8CAA8C,CAAC,4CAA4C,aAAa,8CAA8C,CAAC;AAChoD,gOAAgO,uCAAuC,kCAAkC,8BAA8B,CAAC,oFAAoF,cAAc,CAAC,iGAAiG,gCAAgC,8CAA8C,CAAC,mHAAmH,cAAc,CAAC,iJAAiJ,gCAAgC,8CAA8C,CAAC;AAC77B,sBAAsB,iCAAiC,gCAAgC,CAAC,qEAAqE,iBAAiB,CAAC,qFAAqF,oDAAoD,4CAA4C,uCAAuC,oCAAoC,qDAAqD,CAAC,6EAA6E,mBAAmB,8BAA8B,sBAAsB,gBAAgB,CAAC,gHAAgH,wBAAwB,gBAAgB,qBAAqB,mBAAmB,gBAAgB,CAAC,uLAAuL,SAAS,CAAC,2CAA2C,wBAAwB,oDAAoD,wCAAwC,gCAAgC,oEAAoE,2DAA2D,CAAC,uDAAuD,uBAAuB,yBAAyB,sBAAsB,4BAA4B,CAAC,gFAAgF,aAAa,YAAY,CAAC,uGAAuG,gBAAgB,CAAC,kDAAkD,sBAAsB,CAAC,mHAAmH,yBAAyB,mDAAmD,yCAAyC,iCAAiC,mEAAmE,0DAA0D,CAAC,uDAAuD,YAAY,qCAAqC,CAAC,kBAAkB,yBAAyB,cAAc,kBAAkB,MAAM,QAAQ,SAAS,OAAO,SAAS,CAAC,kCAAkC,YAAY,CAAC,oDAAoD,qCAAqC,4BAA4B,CAAC,mDAAmD,qCAAqC,4BAA4B,CAAC,4HAA4H,qCAAqC,4BAA4B,CAAC;AAC31F,gBAAgB,mBAAmB,eAAe,WAAW,YAAY,cAAc,eAAe,oDAAoD,CAAC,uBAAuB,WAAW,cAAc,mBAAmB,WAAW,YAAY,UAAU,CAAC,gBAAgB,kBAAkB,aAAa,CAAC,+CAA+C,WAAW,CAAC,gBAAgB,0BAA0B,iCAAiC,CAAC,uBAAuB,mBAAmB,qCAAqC,CAAC,wCAAwC,kBAAkB,CAAC,eAAe,WAAW,WAAW,CAAC,sBAAsB,6BAA6B,kCAAkC,WAAW,cAAc,sBAAsB,wBAAwB,UAAU,WAAW,mBAAmB,WAAW,iCAAiC,6BAA6B,wBAAwB,CAAC,eAAe,kBAAkB,aAAa,CAAC,6CAA6C,SAAS,CAAC,yDAAyD,UAAU,CAAC;AACxjC,iFAAiF,YAAY,CAAC,iFAAiF,gBAAgB,CAAC,qFAAqF,UAAU,CAAC;AAChS,sBAAsB,8CAA8C,sCAAsC,iCAAiC,8BAA8B,wDAAwD,CAAC,yCAAyC,qDAAqD,6CAA6C,qCAAqC,iCAAiC,4BAA4B,CAAC,0CAA0C,gDAAgD,uCAAuC,CAAC,gEAAgE,oDAAoD,4CAA4C,sCAAsC,kCAAkC,6BAA6B,CAAC,iEAAiE,gDAAgD,uCAAuC,CAAC,uBAAuB,8CAA8C,sCAAsC,iCAAiC,8BAA8B,wDAAwD,CAAC,0CAA0C,wCAAwC,+BAA+B,CAAC,2CAA2C,qCAAqC,4BAA4B,CAAC,iEAAiE,uCAAuC,8BAA8B,CAAC,kEAAkE,qCAAqC,4BAA4B,CAAC,sBAAsB,UAAU,oCAAoC,+BAA+B,2BAA2B,CAAC,0CAA0C,SAAS,CAAC,oDAAoD,iCAAiC,4BAA4B,wBAAwB,CAAC,kGAAkG,qCAAqC,4BAA4B,CAAC,oDAAoD,qCAAqC,iCAAiC,6BAA6B,uDAAuD,8CAA8C,CAAC,oFAAoF,gDAAgD,uCAAuC,CAAC,kGAAkG,qDAAqD,4CAA4C,CAAC,+FAA+F,qCAAqC,4BAA4B,CAAC,mGAAmG,yCAAyC,gCAAgC,CAAC,4DAA4D,wCAAwC,+BAA+B,CAAC,uIAAuI,qCAAqC,4BAA4B,CAAC,kEAAkE,yCAAyC,gCAAgC,CAAC,gJAAgJ,qCAAqC,4BAA4B,CAAC,4CAA4C,iCAAiC,4BAA4B,wBAAwB,CAAC,yDAAyD,8BAA8B,yBAAyB,qBAAqB,CAAC,yDAAyD,6BAA6B,wBAAwB,oBAAoB,CAAC,yDAAyD,+BAA+B,0BAA0B,sBAAsB,CAAC,yDAAyD,6BAA6B,wBAAwB,oBAAoB,CAAC,yDAAyD,+BAA+B,0BAA0B,sBAAsB,CAAC,yDAAyD,6BAA6B,wBAAwB,oBAAoB,CAAC,yDAAyD,+BAA+B,0BAA0B,sBAAsB,CAAC,yDAAyD,6BAA6B,wBAAwB,oBAAoB,CAAC,yDAAyD,+BAA+B,0BAA0B,sBAAsB,CAAC,0DAA0D,6BAA6B,wBAAwB,oBAAoB,CAAC,0DAA0D,+BAA+B,0BAA0B,sBAAsB,CAAC,0DAA0D,6BAA6B,wBAAwB,oBAAoB,CAAC,0DAA0D,+BAA+B,0BAA0B,sBAAsB,CAAC,0DAA0D,6BAA6B,wBAAwB,oBAAoB,CAAC,0DAA0D,+BAA+B,0BAA0B,sBAAsB,CAAC,yCAAyC,sDAAsD,8CAA8C,yCAAyC,sCAAsC,wDAAwD,uCAAuC,+BAA+B,SAAS,CAAC,8EAA8E,qCAAqC,6BAA6B,SAAS,CAAC,wCAAwC,oCAAoC,+BAA+B,4BAA4B,SAAS,CAAC,6EAA6E,SAAS,CAAC,wCAAwC,wCAAwC,mCAAmC,gCAAgC,UAAU,QAAQ,CAAC,6EAA6E,UAAU,KAAK,CAAC;AACh1N,oBAAoB,WAAW,gBAAgB,iBAAiB,CAAC,oEAAoE,yCAAyC,gCAAgC,CAAC,iCAAiC,oEAAoE,yCAAyC,gCAAgC,CAAC,CAAC,mCAAmC,oEAAoE,2CAA2C,kCAAkC,CAAC,CAAC,2FAA2F,0CAA0C,iCAAiC,CAAC,iCAAiC,2FAA2F,0CAA0C,iCAAiC,CAAC,CAAC,mCAAmC,2FAA2F,4CAA4C,mCAAmC,CAAC,CAAC,yCAAyC,aAAa,iBAAiB,kBAAkB,CAAC,4CAA4C,aAAa,iBAAiB,kBAAkB,CAAC;AAC3yC,oMAAoM,aAAa,YAAY,CAAC,+GAA+G,oBAAoB,oBAAoB,aAAa,4BAA4B,6BAA6B,0BAA0B,sBAAsB,YAAY,aAAa,eAAe,CAAC,+GAA+G,mBAAmB,kBAAkB,cAAc,eAAe,CAAC,mKAAmK,oBAAoB,oBAAoB,aAAa,4BAA4B,6BAA6B,0BAA0B,qBAAqB,CAAC,2HAA2H,8BAA8B,sBAAsB,mBAAmB,kBAAkB,cAAc,oBAAoB,oBAAoB,aAAa,yBAAyB,sBAAsB,kBAAkB,CAAC,mBAAmB,uBAAuB,WAAW,yBAAyB,QAAQ,CAAC,gCAAgC,aAAa,CAAC;AACr+C,6EAA6E,sBAAsB,mBAAmB,kBAAkB,CAAC;AACzI,6DAA6D,SAAS,CAAC,iFAAiF,WAAW,wCAAwC,mCAAmC,+BAA+B,CAAC,qDAAqD,kBAAkB,CAAC,2DAA2D,eAAe,CAAC,2DAA2D,eAAe,CAAC;AAC5e,eAAe,oCAAoC,+BAA+B,4BAA4B,UAAU,6CAA6C,qCAAqC,WAAW,iBAAiB,iBAAiB,QAAQ,SAAS,YAAY,WAAW,UAAU,2CAA2C,kCAAkC,CAAC,2CAA2C,iCAAiC,6BAA6B,yBAAyB,SAAS,CAAC,mDAAmD,sCAAsC,iCAAiC,8BAA8B,SAAS,CAAC,mCAAmC,SAAS,CAAC;AACltB,wBAAwB,UAAU,OAAO,CAAC,wEAAwE,yCAAyC,gCAAgC,CAAC,iCAAiC,wEAAwE,0CAA0C,iCAAiC,CAAC,CAAC,iCAAiC,wEAAwE,0CAA0C,iCAAiC,CAAC,CAAC,uEAAuE,8CAA8C,sCAAsC,iCAAiC,8BAA8B,wDAAwD,CAAC,oHAAoH,SAAS,CAAC,2JAA2J,iCAAiC,6BAA6B,yBAAyB,SAAS,CAAC,mLAAmL,SAAS,CAAC,wBAAwB,yCAAyC,gCAAgC,CAAC,+CAA+C,wCAAwC,+BAA+B,CAAC,+CAA+C,WAAW,eAAe,cAAc,CAAC,sBAAsB,yCAAyC,gCAAgC,CAAC,sBAAsB,YAAY,iBAAiB,gBAAgB,CAAC,yBAAyB,wCAAwC,gCAAgC,QAAQ,CAAC,yBAAyB,YAAY,iBAAiB,gBAAgB,CAAC,mIAAmI,qCAAqC,4BAA4B,CAAC;AAC7rE,2BAA2B,2CAA2C,mCAAmC,oCAAoC,4BAA4B,WAAW,cAAc,WAAW,YAAY,kBAAkB,UAAU,SAAS,YAAY,yDAAyD,gDAAgD,CAAC,kDAAkD,UAAU,WAAW,6DAA6D,oDAAoD,CAAC,kDAAkD,aAAa,YAAY,CAAC,qBAAqB,2CAA2C,mCAAmC,oCAAoC,2BAA2B,CAAC,4CAA4C,2CAA2C,mCAAmC,oCAAoC,2BAA2B,CAAC;AACt9B,qBAAqB,qCAAqC,qCAAqC,mCAAmC,0CAA0C,2BAA2B,oDAAoD,mDAAmD,uCAAuC,CAAC,oBAAoB,qCAAqC,2CAA2C,0CAA0C,gDAAgD,2BAA2B,0DAA0D,kDAAkD,uCAAuC,CAAC,qBAAqB,4CAA4C,2CAA2C,0CAA0C,gDAAgD,2BAA2B,yDAAyD,yDAAyD,gBAAgB,CAAC;AACviC,+DAA+D,kBAAkB,CAAC,2EAA2E,WAAW,cAAc,UAAU,CAAC,+DAA+D,UAAU,WAAW,kBAAkB,UAAU,SAAS,eAAe,CAAC,2EAA2E,OAAO,MAAM,uBAAuB,yBAAyB,UAAU,CAAC,qFAAqF,YAAY,iBAAiB,CAAC,mFAAmF,UAAU,eAAe,CAAC,mFAAmF,UAAU,eAAe,CAAC,qFAAqF,WAAW,gBAAgB,CAAC,2EAA2E,gBAAgB,kBAAkB,wBAAwB,SAAS,kBAAkB,MAAM,UAAU,WAAW,MAAM,CAAC,yEAAyE,UAAU,CAAC,4KAA4K,aAAa,YAAY,CAAC,+EAA+E,YAAY,CAAC,+CAA+C,eAAe,eAAe,CAAC,wHAAwH,aAAa,YAAY,CAAC;AACnrD,6BAA6B,aAAa,CAAC","file":"jquery.mmenu.all.css","sourcesContent":["/*!\n * jQuery mmenu v7.2.2\n * @requires jQuery 1.7.0 or later\n *\n * mmenu.frebsite.nl\n *\t\n * Copyright (c) Fred Heusschen\n * www.frebsite.nl\n *\n * License: CC-BY-NC-4.0\n * http://creativecommons.org/licenses/by-nc/4.0/\n */.mm-menu{--mm-line-height:20px;--mm-listitem-size:44px;--mm-navbar-size:44px;--mm-offset-top:0;--mm-offset-right:0;--mm-offset-bottom:0;--mm-offset-left:0;--mm-color-border:rgba(0, 0, 0, 0.1);--mm-color-button:rgba(0, 0, 0, 0.3);--mm-color-text:rgba(0, 0, 0, 0.75);--mm-color-text-dimmed:rgba(0, 0, 0, 0.3);--mm-color-background:#f3f3f3;--mm-color-background-highlight:rgba(0, 0, 0, 0.05);--mm-color-background-emphasis:rgba(255, 255, 255, 0.4);--mm-shadow:0 0 10px rgba( 0,0,0, 0.3 )}.mm-hidden{display:none!important}.mm-wrapper{overflow-x:hidden;position:relative}.mm-menu{background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.75);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text);line-height:20px;line-height:var(--mm-line-height);-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:0;margin:0;position:absolute;z-index:0;top:0;right:0;bottom:0;left:0;top:var(--mm-offset-top);right:var(--mm-offset-right);bottom:var(--mm-offset-bottom);left:var(--mm-offset-left);-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.mm-menu a,.mm-menu a:active,.mm-menu a:hover,.mm-menu a:link,.mm-menu a:visited{color:inherit;text-decoration:none}[dir=rtl] .mm-menu{direction:rtl}.mm-panels,.mm-panels>.mm-panel{position:absolute;left:0;right:0;top:0;bottom:0;z-index:0}.mm-panel,.mm-panels{-webkit-box-sizing:border-box;box-sizing:border-box;background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.75);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text)}.mm-panels{overflow:hidden}.mm-panel{-webkit-overflow-scrolling:touch;overflow:scroll;overflow-x:hidden;overflow-y:auto;width:100%;padding:0 20px;-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0);-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-panel:not(.mm-hidden){display:block}.mm-panel:after,.mm-panel:before{content:'';display:block;height:20px}.mm-panel_has-navbar{padding-top:44px;padding-top:var(--mm-navbar-size)}.mm-panel_opened{z-index:1;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-panel_opened-parent{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}.mm-panel_highest{z-index:2}.mm-panel_noanimation{-webkit-transition:none!important;-o-transition:none!important;transition:none!important}.mm-panel_noanimation.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl] .mm-panel:not(.mm-panel_opened){-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}[dir=rtl] .mm-panel.mm-panel_opened-parent{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}.mm-listitem_vertical>.mm-panel{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;display:none;width:100%;padding:10px 0 10px 10px}.mm-listitem_vertical>.mm-panel:after,.mm-listitem_vertical>.mm-panel:before{content:none;display:none}.mm-listitem_opened>.mm-panel{display:block}.mm-listitem_vertical>.mm-listitem__btn{height:44px;height:var(--mm-listitem-size);bottom:auto}.mm-listitem_vertical .mm-listitem:last-child:after{border-color:transparent}.mm-listitem_opened>.mm-listitem__btn:after{-webkit-transform:rotate(225deg);-ms-transform:rotate(225deg);transform:rotate(225deg);right:19px}.mm-btn{-webkit-box-sizing:border-box;box-sizing:border-box;width:44px;padding:0}.mm-btn:after,.mm-btn:before{border-color:rgba(0,0,0,.1);border-color:var(--mm-color-button);border-width:2px;border-style:solid}.mm-btn_close:after,.mm-btn_close:before{content:'';-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:5px;height:5px;margin:auto;position:absolute;top:0;bottom:0;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}.mm-btn_close:before{border-right:none;border-bottom:none;right:18px}.mm-btn_close:after{border-left:none;border-top:none;right:25px}.mm-btn_next:after,.mm-btn_prev:before{content:'';border-bottom:none;border-right:none;-webkit-box-sizing:content-box;box-sizing:content-box;display:block;width:8px;height:8px;margin:auto;position:absolute;top:0;bottom:0}.mm-btn_prev:before{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:23px;right:auto}.mm-btn_next:after{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);right:23px;left:auto}[dir=rtl] .mm-btn_next:after{-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);left:23px;right:auto}[dir=rtl] .mm-btn_prev:before{-webkit-transform:rotate(135deg);-ms-transform:rotate(135deg);transform:rotate(135deg);right:23px;left:auto}[dir=rtl] .mm-btn_close:after,[dir=rtl] .mm-btn_close:before{right:auto}[dir=rtl] .mm-btn_close:before{left:25px}[dir=rtl] .mm-btn_close:after{left:18px}.mm-navbar{background:#f3f3f3;border-color:rgba(0,0,0,.1);color:rgba(0,0,0,.3);background:var(--mm-color-background);border-color:var(--mm-color-border);color:var(--mm-color-text-dimmed);border-bottom-width:1px;border-bottom-style:solid;text-align:center;display:none;height:44px;height:var(--mm-navbar-size);padding:0 44px;margin:0;position:absolute;top:0;left:0;right:0;opacity:1;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-navbar>*{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:12px;padding:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5);padding-left:0;padding-right:0}.mm-navbar a,.mm-navbar a:hover{text-decoration:none}.mm-navbar__title{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.mm-navbar__btn{position:absolute;top:0;bottom:0;z-index:1}.mm-navbar__btn:first-child{text-align:left;left:0}.mm-navbar__btn:last-child{text-align:right;right:0}.mm-panel_has-navbar .mm-navbar{display:block}[dir=rtl] .mm-navbar__btn:first-child{text-align:right;right:0;left:auto}[dir=rtl] .mm-navbar__btn:last-child{text-align:left;left:0;right:auto}.mm-listitem,.mm-listview{list-style:none;display:block;padding:0;margin:0}.mm-listitem{color:rgba(0,0,0,.75);color:var(--mm-color-text);border-color:rgba(0,0,0,.1);border-color:var(--mm-color-border);position:relative;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap}.mm-listitem:after{content:'';border-color:inherit;border-bottom-width:1px;border-bottom-style:solid;display:block;position:absolute;left:20px;right:0;bottom:0}.mm-listitem a,.mm-listitem a:hover{text-decoration:none}.mm-listitem__btn,.mm-listitem__text{color:inherit;display:block;padding-top:12px;padding-top:calc((var(--mm-listitem-size) - var(--mm-line-height))/ 2);padding-bottom:12px;padding-bottom:calc((var(--mm-listitem-size) - var(--mm-line-height))/ 2)}.mm-listitem__text{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;padding-left:20px;padding-right:10px;-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;-ms-flex-preferred-size:10%;flex-basis:10%}.mm-listitem__btn{-webkit-tap-highlight-color:rgba(255,255,255,.4);tap-highlight-color:rgba(255,255,255,.4);-webkit-tap-highlight-color:var(--mm-color-background-emphasis);tap-highlight-color:var(--mm-color-background-emphasis);background:rgba(3,2,1,0);border-color:inherit;width:auto;padding-right:54px;position:relative}.mm-listitem__btn:not(.mm-listitem__text){border-left-width:1px;border-left-style:solid}.mm-listitem_selected>.mm-listitem__text{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-listitem_opened>.mm-listitem__btn,.mm-listitem_opened>.mm-panel{background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight)}.mm-panels>.mm-panel>.mm-listview{margin:20px -20px}.mm-panels>.mm-panel>.mm-listview:first-child,.mm-panels>.mm-panel>.mm-navbar+.mm-listview{margin-top:-20px}.mm-listitem_divider{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight);font-size:75%;text-transform:uppercase;min-height:20px;min-height:var(--mm-line-height);padding:6.5px;padding:calc(((var(--mm-listitem-size) * .75) - var(--mm-line-height)) * .5);padding-right:10px;padding-left:20px}.mm-listitem_spacer{padding-top:44px;padding-top:var(--mm-listitem-size)}.mm-listitem_spacer>.mm-btn_next{top:44px;top:var(--mm-listitem-size)}[dir=rtl] .mm-listitem:after{left:0;right:20px}[dir=rtl] .mm-listitem__text{padding-left:10px;padding-right:20px}[dir=rtl] .mm-listitem__btn{padding-left:54px;border-left-width:0;border-left-style:none}[dir=rtl] .mm-listitem__btn:not(.mm-listitem__text){padding-right:0;border-right-width:1px;border-right-style:solid}\n.mm-page{-webkit-box-sizing:border-box;box-sizing:border-box;position:relative}.mm-slideout{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease;z-index:1}.mm-wrapper_opened{overflow-x:hidden;position:relative}.mm-wrapper_background .mm-page{background:inherit}.mm-menu_offcanvas{display:none;position:fixed;right:auto;z-index:0}.mm-menu_offcanvas.mm-menu_opened{display:block}.mm-menu_offcanvas{width:80%;min-width:240px;max-width:440px}.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_offcanvas.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0)}}.mm-wrapper__blocker{background:rgba(3,2,1,0);overflow:hidden;display:none;width:100%;height:100%;position:fixed;top:0;left:0;z-index:2}.mm-wrapper_blocking{overflow:hidden}.mm-wrapper_blocking body{overflow:hidden}.mm-wrapper_blocking .mm-wrapper__blocker{display:block}\n.mm-sronly{border:0!important;clip:rect(1px,1px,1px,1px)!important;-webkit-clip-path:inset(50%)!important;clip-path:inset(50%)!important;white-space:nowrap!important;width:1px!important;min-width:1px!important;height:1px!important;min-height:1px!important;padding:0!important;overflow:hidden!important;position:absolute!important}\n.mm-menu_autoheight{-webkit-transition:none .4s ease;-o-transition:none .4s ease;transition:none .4s ease;-webkit-transition-property:height,-webkit-transform;transition-property:height,-webkit-transform;-o-transition-property:transform,height;transition-property:transform,height;transition-property:transform,height,-webkit-transform}.mm-menu_autoheight:not(.mm-menu_offcanvas){position:relative}.mm-menu_autoheight.mm-menu_position-bottom,.mm-menu_autoheight.mm-menu_position-top{max-height:80%}.mm-menu_autoheight-measuring .mm-panel{display:block!important}.mm-menu_autoheight-measuring .mm-listitem_vertical:not(.mm-listitem_opened) .mm-panel{display:none!important}.mm-menu_autoheight-measuring .mm-panels>.mm-panel{bottom:auto!important;height:auto!important}\n[class*=mm-menu_columns-]{-webkit-transition-property:width;-o-transition-property:width;transition-property:width}[class*=mm-menu_columns-] .mm-panels>.mm-panel{right:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:width,transform;transition-property:width,transform;transition-property:width,transform,-webkit-transform}[class*=mm-menu_columns-] .mm-panels>.mm-panel_opened,[class*=mm-menu_columns-] .mm-panels>.mm-panel_opened-parent{display:block!important}[class*=mm-panel_columns-]{border-right:1px solid;border-color:inherit}.mm-menu_columns-1 .mm-panel_columns-0,.mm-menu_columns-2 .mm-panel_columns-1,.mm-menu_columns-3 .mm-panel_columns-2,.mm-menu_columns-4 .mm-panel_columns-3{border-right:none}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-0{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_columns-0 .mm-panels>.mm-panel{z-index:0}.mm-menu_columns-0 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-0 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_columns-0{width:80%;min-width:240px;max-width:0}.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:0px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:0px){.mm-wrapper_opening .mm-menu_columns-0.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-1{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_columns-1 .mm-panels>.mm-panel{z-index:1;width:100%}.mm-menu_columns-1 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-1 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(200%,0,0);transform:translate3d(200%,0,0)}.mm-menu_columns-1{width:80%;min-width:240px;max-width:440px}.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0)}}.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_columns-1.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-440px,0,0);transform:translate3d(-440px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-2{-webkit-transform:translate3d(200%,0,0);transform:translate3d(200%,0,0)}.mm-menu_columns-2 .mm-panels>.mm-panel{z-index:2;width:50%}.mm-menu_columns-2 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-2 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(300%,0,0);transform:translate3d(300%,0,0)}.mm-menu_columns-2{width:80%;min-width:240px;max-width:880px}.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:1100px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(880px,0,0);transform:translate3d(880px,0,0)}}.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:1100px){.mm-wrapper_opening .mm-menu_columns-2.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-880px,0,0);transform:translate3d(-880px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-3{-webkit-transform:translate3d(300%,0,0);transform:translate3d(300%,0,0)}.mm-menu_columns-3 .mm-panels>.mm-panel{z-index:3;width:33.34%}.mm-menu_columns-3 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-3 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(400%,0,0);transform:translate3d(400%,0,0)}.mm-menu_columns-3{width:80%;min-width:240px;max-width:1320px}.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:1650px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(1320px,0,0);transform:translate3d(1320px,0,0)}}.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:1650px){.mm-wrapper_opening .mm-menu_columns-3.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-1320px,0,0);transform:translate3d(-1320px,0,0)}}[class*=mm-menu_columns-] .mm-panels>.mm-panel_columns-4{-webkit-transform:translate3d(400%,0,0);transform:translate3d(400%,0,0)}.mm-menu_columns-4 .mm-panels>.mm-panel{z-index:4;width:25%}.mm-menu_columns-4 .mm-panels>.mm-panel else{width:100%}.mm-menu_columns-4 .mm-panels>.mm-panel:not(.mm-panel_opened):not(.mm-panel_opened-parent){-webkit-transform:translate3d(500%,0,0);transform:translate3d(500%,0,0)}.mm-menu_columns-4{width:80%;min-width:240px;max-width:1760px}.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(80vw,0,0);transform:translate3d(80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(240px,0,0);transform:translate3d(240px,0,0)}}@media all and (min-width:2200px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(1760px,0,0);transform:translate3d(1760px,0,0)}}.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:2200px){.mm-wrapper_opening .mm-menu_columns-4.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-1760px,0,0);transform:translate3d(-1760px,0,0)}}[class*=mm-menu_columns-].mm-menu_position-bottom,[class*=mm-menu_columns-].mm-menu_position-top{width:100%;max-width:100%;min-width:100%}.mm-wrapper_opening [class*=mm-menu_columns-].mm-menu_position-front{-webkit-transition-property:width,min-width,max-width,-webkit-transform;transition-property:width,min-width,max-width,-webkit-transform;-o-transition-property:width,min-width,max-width,transform;transition-property:width,min-width,max-width,transform;transition-property:width,min-width,max-width,transform,-webkit-transform}\n.mm-counter{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);text-align:right;display:block;min-width:44px;float:right}.mm-listitem_nosubitems>.mm-counter{display:none}[dir=rtl] .mm-counter{text-align:left;float:left}\n.mm-listitem_divider{opacity:1;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-menu_dividers-light .mm-listitem_divider{background:inherit;font-size:inherit;color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);padding-top:18px;padding-top:calc((var(--mm-listitem-size) - var(--mm-line-height)) * .75);padding-bottom:6px;padding-bottom:calc((var(--mm-listitem-size) - var(--mm-line-height)) * .25)}.mm-menu_border-none .mm-listitem_divider{border-top-width:1px;border-top-style:solid}.mm-listview_fixeddivider{background:inherit;display:none;width:100%;position:absolute;top:0;left:0;right:0;z-index:10}.mm-listview_fixeddivider:after{content:none!important;display:none!important}.mm-panel_dividers .mm-listview_fixeddivider{display:block}\n.mm-wrapper_opened.mm-dragging .mm-menu,.mm-wrapper_opened.mm-dragging .mm-slideout{-webkit-transition-duration:0s;-o-transition-duration:0s;transition-duration:0s}\n.mm-menu_dropdown{-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);height:80%}.mm-wrapper_dropdown .mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-wrapper_dropdown .mm-wrapper__blocker{-webkit-transition-delay:0s!important;-o-transition-delay:0s!important;transition-delay:0s!important;z-index:1}.mm-wrapper_dropdown .mm-menu_dropdown{z-index:2}.mm-wrapper_dropdown.mm-wrapper_opened:not(.mm-wrapper_opening) .mm-menu_dropdown{display:none}[class*=mm-menu_tip-]:before{content:'';background:inherit;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);display:block;width:15px;height:15px;position:absolute;z-index:0;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg)}.mm-menu_tip-left:before{left:22px}.mm-menu_tip-right:before{right:22px}.mm-menu_tip-top:before{top:-8px}.mm-menu_tip-bottom:before{bottom:-8px}\n.mm-menu{--mm-iconbar-size:44px}.mm-iconbar{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);border:0 solid rgba(0,0,0,.1);border-color:var(--mm-color-border);border-right-width:1px;text-align:center;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;width:44px;width:var(--mm-iconbar-size);position:absolute;top:0;left:0;bottom:0;z-index:2}.mm-menu_iconbar .mm-navbars_bottom,.mm-menu_iconbar .mm-navbars_top,.mm-menu_iconbar .mm-panels{left:44px;left:var(--mm-iconbar-size)}.mm-iconbar__bottom,.mm-iconbar__top{width:inherit;position:absolute}.mm-iconbar__bottom>*,.mm-iconbar__top>*{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;padding:11px 0}.mm-iconbar__bottom a,.mm-iconbar__bottom a:hover,.mm-iconbar__top a,.mm-iconbar__top a:hover{text-decoration:none}.mm-iconbar__top{top:0}.mm-iconbar__bottom{bottom:0}.mm-iconbar__tab_selected{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}\n.mm-menu{--mm-iconpanel-size:44px}.mm-panel_iconpanel-1,.mm-panel_iconpanel-1.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 1));width:calc(100% - (var(--mm-iconpanel-size) * 1))}.mm-panel_iconpanel-2,.mm-panel_iconpanel-2.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 2));width:calc(100% - (var(--mm-iconpanel-size) * 2))}.mm-panel_iconpanel-3,.mm-panel_iconpanel-3.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - (44px * 3));width:calc(100% - (var(--mm-iconpanel-size) * 3))}.mm-panel_iconpanel-first~.mm-panel,.mm-panel_iconpanel-first~.mm-panel_opened~.mm-listview_fixeddivider{width:calc(100% - 44px);width:calc(100% - var(--mm-iconpanel-size))}.mm-menu_iconpanel .mm-panels>.mm-listview_fixeddivider,.mm-menu_iconpanel .mm-panels>.mm-panel{left:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:transform,width;transition-property:transform,width;transition-property:transform,width,-webkit-transform}.mm-menu_iconpanel .mm-panels>.mm-panel:not(.mm-panel_iconpanel-first):not(.mm-panel_iconpanel-0){border-left-width:1px;border-left-style:solid}.mm-menu_iconpanel .mm-panels>.mm-panel_opened,.mm-menu_iconpanel .mm-panels>.mm-panel_opened-parent{display:block!important}.mm-menu_iconpanel .mm-panels>.mm-panel_opened-parent{overflow-y:hidden;-webkit-transform:unset;-ms-transform:unset;transform:unset}.mm-menu_hidedivider .mm-panel_opened-parent .mm-listitem_divider,.mm-menu_hidenavbar .mm-panel_opened-parent .mm-navbar{opacity:0}.mm-panel__blocker{background:inherit;opacity:0;display:block;position:absolute;top:0;right:0;left:0;z-index:3;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-panel_opened-parent .mm-panel__blocker{opacity:.6;bottom:-100000px}[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-listview_fixeddivider,[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-panel{left:0;right:auto;-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:transform,width;transition-property:transform,width;transition-property:transform,width,-webkit-transform}[dir=rtl] .mm-menu_iconpanel .mm-panels>.mm-panel:not(.mm-panel_iconpanel-first):not(.mm-panel_iconpanel-0){border-left:none;border-right:1px solid;border-color:inherit}\n.mm-menu_keyboardfocus a:focus,.mm-menu_keyboardfocus.mm-menu_opened~.mm-wrapper__blocker a:focus{outline:0;background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-wrapper__blocker .mm-tabstart{cursor:default;display:block;width:100%;height:100%}.mm-wrapper__blocker .mm-tabend{opacity:0;position:absolute;bottom:0}\n.mm-navbars_bottom,.mm-navbars_top{background:inherit;border-color:inherit;border-width:0;position:absolute;left:0;right:0;z-index:1}.mm-navbars_bottom>.mm-navbar,.mm-navbars_top>.mm-navbar{border-width:0;display:-webkit-box;display:-ms-flexbox;display:flex;position:relative}.mm-navbars_bottom>.mm-navbar:not(.mm-navbar_has-btns),.mm-navbars_top>.mm-navbar:not(.mm-navbar_has-btns){padding:0}.mm-navbars_bottom>.mm-navbar>:not(img):not(.mm-btn),.mm-navbars_top>.mm-navbar>:not(img):not(.mm-btn){-webkit-box-flex:1;-ms-flex:1;flex:1}.mm-navbars_top{border-bottom-style:solid;border-bottom-width:1px;top:0;bottom:auto}.mm-menu_navbar_top-1 .mm-panels{top:44px;top:calc(var(--mm-navbar-size) * 1)}.mm-menu_navbar_top-2 .mm-panels{top:88px;top:calc(var(--mm-navbar-size) * 2)}.mm-menu_navbar_top-3 .mm-panels{top:132px;top:calc(var(--mm-navbar-size) * 3)}.mm-menu_navbar_top-4 .mm-panels{top:176px;top:calc(var(--mm-navbar-size) * 4)}.mm-navbars_bottom{border-top-style:solid;border-top-width:1px;bottom:0;top:auto}.mm-menu_navbar_bottom-1 .mm-panels{bottom:44px;bottom:calc(var(--mm-navbar-size) * 1)}.mm-menu_navbar_bottom-2 .mm-panels{bottom:88px;bottom:calc(var(--mm-navbar-size) * 2)}.mm-menu_navbar_bottom-3 .mm-panels{bottom:132px;bottom:calc(var(--mm-navbar-size) * 3)}.mm-menu_navbar_bottom-4 .mm-panels{bottom:176px;bottom:calc(var(--mm-navbar-size) * 4)}.mm-navbar_size-2{height:88px;height:calc(var(--mm-navbar-size) * 2)}.mm-navbar_size-3{height:132px;height:calc(var(--mm-navbar-size) * 3)}.mm-navbar_size-4{height:176px;height:calc(var(--mm-navbar-size) * 4)}.mm-navbar__breadcrumbs{-o-text-overflow:ellipsis;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;-webkit-overflow-scrolling:touch;overflow-x:auto;text-align:left;padding:0 0 0 20px}.mm-navbar__breadcrumbs>*{display:inline-block;padding-right:6px;padding-top:12px;padding-top:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5);padding-bottom:12px;padding-bottom:calc((var(--mm-navbar-size) - var(--mm-line-height)) * .5)}.mm-navbar__breadcrumbs>a{text-decoration:underline}.mm-navbar_has-btns .mm-navbar__breadcrumbs{margin-left:-44px}.mm-navbar_has-btns .mm-btn:not(.mm-hidden)+.mm-navbar__breadcrumbs{margin-left:0;padding-left:0}.mm-navbar__tab_selected{background:inherit!important;color:inherit!important;border-width:1px;border-style:solid;border-color:inherit}.mm-navbar__tab_selected:first-child{border-left:none}.mm-navbar__tab_selected:last-child{border-right:none}.mm-navbars_top.mm-navbars_has-tabs .mm-navbar_tabs,.mm-navbars_top.mm-navbars_has-tabs .mm-navbar_tabs~.mm-navbar{background:inherit!important;color:inherit!important}.mm-navbars_top .mm-navbar_tabs:not(:last-child){border-bottom-width:1px;border-bottom-style:solid}.mm-navbars_top .mm-navbar__tab_selected{border-bottom:none;margin-bottom:-1px}.mm-navbars_top .mm-navbar_tabs:first-child .mm-navbar__tab_selected{border-top:none}.mm-navbars_bottom.mm-navbars_has-tabs .mm-navbar{background:inherit;color:inherit}.mm-navbars_bottom .mm-navbar_tabs:not(:first-child){border-top-width:1px;border-top-style:solid}.mm-navbars_bottom .mm-navbar__tab_selected{border-top:none;margin-top:-1px}.mm-navbars_bottom .mm-navbar_tabs:last-child .mm-navbar__tab_selected{border-bottom:none}.mm-navbar_tabs>a:not(.mm-navbar__tab_selected),.mm-navbars_bottom.mm-navbars_has-tabs .mm-navbar_tabs~.mm-navbar,.mm-navbars_top.mm-navbars_has-tabs>.mm-navbar:not(.mm-navbar_tabs){background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis);color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed)}\n.mm-searchfield{height:44px;height:var(--mm-navbar-size);padding:0;display:-webkit-box;display:-ms-flexbox;display:flex}.mm-searchfield input{border:none!important;outline:0!important;-webkit-box-shadow:none!important;box-shadow:none!important;border-radius:4px;background:rgba(0,0,0,.05);background:var(--mm-color-background-highlight);color:rgba(0,0,0,.75);color:var(--mm-color-text);font:inherit;font-size:inherit;line-height:35.2px;line-height:calc(var(--mm-navbar-size) * .7);display:block;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%;height:24px;height:calc(var(--mm-navbar-size) * .7);min-height:unset;max-height:unset;margin:0;padding:0 10px}.mm-searchfield input::-ms-clear{display:none}.mm-searchfield__input{padding:6.6px 10px 0 10px;padding-top:calc(var(--mm-navbar-size) * .15);position:relative}.mm-panel__noresultsmsg{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);text-align:center;font-size:150%;padding:44px 0}.mm-searchfield__btn{position:absolute;right:0;top:0;bottom:0}.mm-panel_search{left:0!important;right:0!important;width:100%!important;border-left:none!important}.mm-searchfield__input{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%;max-width:100%}.mm-searchfield__cancel{line-height:44px;line-height:var(--mm-navbar-size);text-decoration:none;display:block;padding-right:10px;margin-right:-100px;-webkit-transition:margin .4s ease;-o-transition:margin .4s ease;transition:margin .4s ease}.mm-searchfield__cancel-active{margin-right:0}.mm-panel>.mm-searchfield{width:100%;position:absolute;top:0;left:0}.mm-panel_has-searchfield{padding-top:44px;padding-top:var(--mm-navbar-size)}.mm-panel_has-navbar.mm-panel_has-searchfield{padding-top:88px;padding-top:calc(var(--mm-navbar-size) * 2)}.mm-panel_has-navbar.mm-panel_has-searchfield>.mm-searchfield{top:44px;top:var(--mm-navbar-size)}.mm-listitem_nosubitems>.mm-listitem__btn{display:none}.mm-listitem_nosubitems>.mm-listitem__text{padding-right:10px}\n.mm-sectionindexer{background:inherit;text-align:center;font-size:12px;-webkit-box-sizing:border-box;box-sizing:border-box;width:20px;position:absolute;top:0;bottom:0;right:-20px;z-index:15;-webkit-transition:right .4s ease;-o-transition:right .4s ease;transition:right .4s ease;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:space-evenly;-ms-flex-pack:space-evenly;justify-content:space-evenly}.mm-sectionindexer a{color:rgba(0,0,0,.3);color:var(--mm-color-text-dimmed);line-height:1;text-decoration:none;display:block}.mm-sectionindexer~.mm-panels{-webkit-transition:right .4s ease;-o-transition:right .4s ease;transition:right .4s ease}.mm-menu_has-sectionindexer .mm-sectionindexer{right:0}.mm-menu_has-sectionindexer .mm-panels{right:20px}.mm-menu_navbar_top-1 .mm-sectionindexer{top:46px;top:calc((var(--mm-navbar-size) * 1) + 2px)}.mm-menu_navbar_top-2 .mm-sectionindexer{top:90px;top:calc((var(--mm-navbar-size) * 2) + 2px)}.mm-menu_navbar_top-3 .mm-sectionindexer{top:134px;top:calc((var(--mm-navbar-size) * 3) + 2px)}.mm-menu_navbar_top-4 .mm-sectionindexer{top:178px;top:calc((var(--mm-navbar-size) * 4) + 2px)}.mm-menu_navbar_bottom-1 .mm-sectionindexer{bottom:46px;bottom:calc((var(--mm-navbar-size) * 1) + 2px)}.mm-menu_navbar_bottom-2 .mm-sectionindexer{bottom:90px;bottom:calc((var(--mm-navbar-size) * 2) + 2px)}.mm-menu_navbar_bottom-3 .mm-sectionindexer{bottom:134px;bottom:calc((var(--mm-navbar-size) * 3) + 2px)}.mm-menu_navbar_bottom-4 .mm-sectionindexer{bottom:178px;bottom:calc((var(--mm-navbar-size) * 4) + 2px)}\n.mm-menu_selected-hover .mm-listitem>.mm-listitem__btn,.mm-menu_selected-hover .mm-listitem>.mm-listitem__text,.mm-menu_selected-parent .mm-listitem>.mm-listitem__btn,.mm-menu_selected-parent .mm-listitem>.mm-listitem__text{-webkit-transition:background .4s ease;-o-transition:background .4s ease;transition:background .4s ease}.mm-menu_selected-hover .mm-listview:hover>.mm-listitem_selected .mm-listitem__text{background:0 0}.mm-menu_selected-hover .mm-listitem__btn:hover,.mm-menu_selected-hover .mm-listitem__text:hover{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}.mm-menu_selected-parent .mm-panel_opened-parent .mm-listitem:not(.mm-listitem_selected-parent) .mm-listitem__text{background:0 0}.mm-menu_selected-parent .mm-listitem_selected-parent>.mm-listitem__btn,.mm-menu_selected-parent .mm-listitem_selected-parent>.mm-listitem__text{background:rgba(255,255,255,.4);background:var(--mm-color-background-emphasis)}\n.mm-menu,.mm-slideout{--mm-sidebar-collapsed-size:44px;--mm-sidebar-expanded-size:440px}.mm-wrapper_sidebar-collapsed body,.mm-wrapper_sidebar-expanded body{position:relative}.mm-wrapper_sidebar-collapsed .mm-slideout,.mm-wrapper_sidebar-expanded .mm-slideout{-webkit-transition-property:width,-webkit-transform;transition-property:width,-webkit-transform;-o-transition-property:width,transform;transition-property:width,transform;transition-property:width,transform,-webkit-transform}.mm-wrapper_sidebar-collapsed .mm-page,.mm-wrapper_sidebar-expanded .mm-page{background:inherit;-webkit-box-sizing:border-box;box-sizing:border-box;min-height:100vh}.mm-wrapper_sidebar-collapsed .mm-menu_sidebar-collapsed,.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{display:block!important;top:0!important;right:auto!important;bottom:0!important;left:0!important}.mm-wrapper_sidebar-collapsed:not(.mm-wrapper_opening) .mm-menu_hidedivider .mm-listitem_divider,.mm-wrapper_sidebar-collapsed:not(.mm-wrapper_opening) .mm-menu_hidenavbar .mm-navbar{opacity:0}.mm-wrapper_sidebar-collapsed .mm-slideout{width:calc(100% - 44px);width:calc(100% - var(--mm-sidebar-collapsed-size));-webkit-transform:translate3d(44px,0,0);transform:translate3d(44px,0,0);-webkit-transform:translate3d(var(--mm-sidebar-collapsed-size),0,0);transform:translate3d(var(--mm-sidebar-collapsed-size),0,0)}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{border-right-width:1px;border-right-style:solid;min-width:0!important;max-width:100000px!important}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded.mm-menu_pageshadow:after{content:none;display:none}.mm-wrapper_sidebar-expanded.mm-wrapper_blocking,.mm-wrapper_sidebar-expanded.mm-wrapper_blocking body{overflow:visible}.mm-wrapper_sidebar-expanded .mm-wrapper__blocker{display:none!important}.mm-wrapper_sidebar-expanded:not(.mm-wrapper_sidebar-closed) .mm-menu_sidebar-expanded.mm-menu_opened~.mm-slideout{width:calc(100% - 440px);width:calc(100% - var(--mm-sidebar-expanded-size));-webkit-transform:translate3d(440px,0,0);transform:translate3d(440px,0,0);-webkit-transform:translate3d(var(--mm-sidebar-expanded-size),0,0);transform:translate3d(var(--mm-sidebar-expanded-size),0,0)}.mm-wrapper_sidebar-expanded .mm-menu_sidebar-expanded{width:440px;width:var(--mm-sidebar-expanded-size)}.mm-menu__blocker{background:rgba(3,2,1,0);display:block;position:absolute;top:0;right:0;bottom:0;left:0;z-index:3}.mm-menu_opened .mm-menu__blocker{display:none}[dir=rtl].mm-wrapper_sidebar-collapsed .mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl].mm-wrapper_sidebar-expanded .mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[dir=rtl].mm-wrapper_sidebar-expanded:not(.mm-wrapper_sidebar-closed) .mm-menu_sidebar-expanded.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}\nlabel.mm-toggle{border-radius:34px;min-width:58px;width:58px;height:34px;margin:0 10px;margin-top:5px;margin-top:calc((var(--mm-listitem-size) - 34px)/ 2)}label.mm-toggle:before{content:'';display:block;border-radius:34px;width:32px;height:32px;margin:1px}input.mm-toggle{position:absolute;left:-10000px}input.mm-toggle:checked~label.mm-toggle:before{float:right}label.mm-toggle{background:rgba(0,0,0,.1);background:var(--mm-color-border)}label.mm-toggle:before{background:#f3f3f3;background:var(--mm-color-background)}input.mm-toggle:checked~label.mm-toggle{background:#4bd963}label.mm-check{width:34px;height:34px}label.mm-check:before{border-color:rgba(0,0,0,.75);border-color:var(--mm-color-text);content:'';display:block;border-left:3px solid;border-bottom:3px solid;width:40%;height:20%;margin:25% 0 0 20%;opacity:.1;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg)}input.mm-check{position:absolute;left:-10000px}input.mm-check:checked~label.mm-check:before{opacity:1}[dir=rtl] input.mm-toggle:checked~label.mm-toggle:before{float:left}\n.mm-menu_border-none .mm-listitem:after,.mm-panel_border-none .mm-listitem:after{content:none}.mm-menu_border-full .mm-listitem:after,.mm-panel_border-full .mm-listitem:after{left:0!important}.mm-menu_border-offset .mm-listitem:after,.mm-panel_border-offset .mm-listitem:after{right:20px}\n.mm-menu_fx-menu-zoom{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-wrapper_opened .mm-menu_fx-menu-zoom{-webkit-transform:scale(.7,.7) translate3d(-30%,0,0);transform:scale(.7,.7) translate3d(-30%,0,0);-webkit-transform-origin:left center;-ms-transform-origin:left center;transform-origin:left center}.mm-wrapper_opening .mm-menu_fx-menu-zoom{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-wrapper_opened .mm-menu_fx-menu-zoom.mm-menu_position-right{-webkit-transform:scale(.7,.7) translate3d(30%,0,0);transform:scale(.7,.7) translate3d(30%,0,0);-webkit-transform-origin:right center;-ms-transform-origin:right center;transform-origin:right center}.mm-wrapper_opening .mm-menu_fx-menu-zoom.mm-menu_position-right{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-menu_fx-menu-slide{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-wrapper_opened .mm-menu_fx-menu-slide{-webkit-transform:translate3d(-30%,0,0);transform:translate3d(-30%,0,0)}.mm-wrapper_opening .mm-menu_fx-menu-slide{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-wrapper_opened .mm-menu_fx-menu-slide.mm-menu_position-right{-webkit-transform:translate3d(30%,0,0);transform:translate3d(30%,0,0)}.mm-wrapper_opening .mm-menu_fx-menu-slide.mm-menu_position-right{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-menu-fade{opacity:0;-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease}.mm-wrapper_opening .mm-menu_fx-menu-fade{opacity:1}.mm-menu_fx-panels-none .mm-panel,.mm-panel_fx-none{-webkit-transition-property:none;-o-transition-property:none;transition-property:none}.mm-menu_fx-panels-none .mm-panel.mm-panel_opened-parent,.mm-panel_fx-none.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-zoom .mm-panel,.mm-panel_fx-zoom{-webkit-transform-origin:left center;-ms-transform-origin:left center;transform-origin:left center;-webkit-transform:scale(1.5,1.5) translate3d(100%,0,0);transform:scale(1.5,1.5) translate3d(100%,0,0)}.mm-menu_fx-panels-zoom .mm-panel.mm-panel_opened,.mm-panel_fx-zoom.mm-panel_opened{-webkit-transform:scale(1,1) translate3d(0,0,0);transform:scale(1,1) translate3d(0,0,0)}.mm-menu_fx-panels-zoom .mm-panel.mm-panel_opened-parent,.mm-panel_fx-zoom.mm-panel_opened-parent{-webkit-transform:scale(.7,.7) translate3d(-30%,0,0);transform:scale(.7,.7) translate3d(-30%,0,0)}.mm-menu_fx-panels-slide-0 .mm-panel_opened-parent,.mm-panel_fx-slide-0.mm-panel_opened-parent{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-slide-100 .mm-panel_opened-parent,.mm-panel_fx-slide-100.mm-panel_opened-parent{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_fx-panels-slide-up .mm-panel,.mm-panel_fx-slide-up{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0)}.mm-menu_fx-panels-slide-up .mm-panel_opened,.mm-menu_fx-panels-slide-up .mm-panel_opened-parent,.mm-panel_fx-slide-up.mm-panel_opened{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.mm-menu_fx-panels-slide-right .mm-panel,.mm-panel_fx-slide-right{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_fx-panels-slide-right .mm-panel_opened,.mm-menu_fx-panels-slide-right .mm-panel_opened-parent,.mm-panel_fx-slide-right.mm-panel_opened{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}[class*=mm-menu_fx-listitems-] .mm-listitem{-webkit-transition:none .4s ease;-o-transition:none .4s ease;transition:none .4s ease}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(1){-webkit-transition-delay:50ms;-o-transition-delay:50ms;transition-delay:50ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(2){-webkit-transition-delay:.1s;-o-transition-delay:.1s;transition-delay:.1s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(3){-webkit-transition-delay:150ms;-o-transition-delay:150ms;transition-delay:150ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(4){-webkit-transition-delay:.2s;-o-transition-delay:.2s;transition-delay:.2s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(5){-webkit-transition-delay:250ms;-o-transition-delay:250ms;transition-delay:250ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(6){-webkit-transition-delay:.3s;-o-transition-delay:.3s;transition-delay:.3s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(7){-webkit-transition-delay:350ms;-o-transition-delay:350ms;transition-delay:350ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(8){-webkit-transition-delay:.4s;-o-transition-delay:.4s;transition-delay:.4s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(9){-webkit-transition-delay:450ms;-o-transition-delay:450ms;transition-delay:450ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(10){-webkit-transition-delay:.5s;-o-transition-delay:.5s;transition-delay:.5s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(11){-webkit-transition-delay:550ms;-o-transition-delay:550ms;transition-delay:550ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(12){-webkit-transition-delay:.6s;-o-transition-delay:.6s;transition-delay:.6s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(13){-webkit-transition-delay:650ms;-o-transition-delay:650ms;transition-delay:650ms}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(14){-webkit-transition-delay:.7s;-o-transition-delay:.7s;transition-delay:.7s}[class*=mm-menu_fx-listitems-] .mm-listitem:nth-child(15){-webkit-transition-delay:750ms;-o-transition-delay:750ms;transition-delay:750ms}.mm-menu_fx-listitems-slide .mm-listitem{-webkit-transition-property:opacity,-webkit-transform;transition-property:opacity,-webkit-transform;-o-transition-property:transform,opacity;transition-property:transform,opacity;transition-property:transform,opacity,-webkit-transform;-webkit-transform:translate3d(50%,0,0);transform:translate3d(50%,0,0);opacity:0}.mm-wrapper_opening .mm-menu_fx-listitems-slide .mm-panel_opened .mm-listitem{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0);opacity:1}.mm-menu_fx-listitems-fade .mm-listitem{-webkit-transition-property:opacity;-o-transition-property:opacity;transition-property:opacity;opacity:0}.mm-wrapper_opening .mm-menu_fx-listitems-fade .mm-panel_opened .mm-listitem{opacity:1}.mm-menu_fx-listitems-drop .mm-listitem{-webkit-transition-property:opacity,top;-o-transition-property:opacity,top;transition-property:opacity,top;opacity:0;top:-25%}.mm-wrapper_opening .mm-menu_fx-listitems-drop .mm-panel_opened .mm-listitem{opacity:1;top:0}\n.mm-menu_fullscreen{width:100%;min-width:140px;max-width:10000px}.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(100vw,0,0);transform:translate3d(100vw,0,0)}@media all and (max-width:140px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(140px,0,0);transform:translate3d(140px,0,0)}}@media all and (min-width:10000px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(10000px,0,0);transform:translate3d(10000px,0,0)}}.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-100vw,0,0);transform:translate3d(-100vw,0,0)}@media all and (max-width:140px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-140px,0,0);transform:translate3d(-140px,0,0)}}@media all and (min-width:10000px){.mm-wrapper_opening .mm-menu_fullscreen.mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-10000px,0,0);transform:translate3d(-10000px,0,0)}}.mm-menu_fullscreen.mm-menu_position-top{height:100vh;min-height:140px;max-height:10000px}.mm-menu_fullscreen.mm-menu_position-bottom{height:100vh;min-height:140px;max-height:10000px}\n.mm-menu_listview-justify .mm-panels>.mm-panel:after,.mm-menu_listview-justify .mm-panels>.mm-panel:before,.mm-panels>.mm-panel_listview-justify:after,.mm-panels>.mm-panel_listview-justify:before{content:none;display:none}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listview,.mm-panels>.mm-panel_listview-justify .mm-listview{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;height:100%;margin-top:0;margin-bottom:0}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem,.mm-panels>.mm-panel_listview-justify .mm-listitem{-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;min-height:44px}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem:not(.mm-listitem_divider),.mm-panels>.mm-panel_listview-justify .mm-listitem:not(.mm-listitem_divider){display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}.mm-menu_listview-justify .mm-panels>.mm-panel .mm-listitem__text,.mm-panels>.mm-panel_listview-justify .mm-listitem__text{-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-flex:1;-ms-flex:1 0 auto;flex:1 0 auto;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.mm-listview_inset{list-style:inside disc;width:100%;padding:0 30px 15px 30px;margin:0}.mm-listview_inset .mm-listitem{padding:5px 0}\n.mm-menu_multiline .mm-listitem__text,.mm-panel_multiline .mm-listitem__text{-o-text-overflow:clip;text-overflow:clip;white-space:normal}\n[class*=mm-menu_pagedim].mm-menu_opened~.mm-wrapper__blocker{opacity:0}.mm-wrapper_opening [class*=mm-menu_pagedim].mm-menu_opened~.mm-wrapper__blocker{opacity:.3;-webkit-transition:opacity .4s ease .4s;-o-transition:opacity .4s ease .4s;transition:opacity .4s ease .4s}.mm-menu_opened.mm-menu_pagedim~.mm-wrapper__blocker{background:inherit}.mm-menu_opened.mm-menu_pagedim-black~.mm-wrapper__blocker{background:#000}.mm-menu_opened.mm-menu_pagedim-white~.mm-wrapper__blocker{background:#fff}\n.mm-menu_popup{-webkit-transition:opacity .4s ease;-o-transition:opacity .4s ease;transition:opacity .4s ease;opacity:0;-webkit-box-shadow:0 2px 10px rgba(0,0,0,.3);box-shadow:0 2px 10px rgba(0,0,0,.3);height:80%;min-height:140px;max-height:880px;top:50%;left:50%;bottom:auto;right:auto;z-index:2;-webkit-transform:translate3d(-50%,-50%,0);transform:translate3d(-50%,-50%,0)}.mm-menu_popup.mm-menu_opened~.mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-menu_popup.mm-menu_opened~.mm-wrapper__blocker{-webkit-transition-delay:0s!important;-o-transition-delay:0s!important;transition-delay:0s!important;z-index:1}.mm-wrapper_opening .mm-menu_popup{opacity:1}\n.mm-menu_position-right{left:auto;right:0}.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-80vw,0,0);transform:translate3d(-80vw,0,0)}@media all and (max-width:300px){.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-240px,0,0);transform:translate3d(-240px,0,0)}}@media all and (min-width:550px){.mm-wrapper_opening .mm-menu_position-right.mm-menu_opened~.mm-slideout{-webkit-transform:translate3d(-440px,0,0);transform:translate3d(-440px,0,0)}}.mm-menu_position-bottom,.mm-menu_position-front,.mm-menu_position-top{-webkit-transition:-webkit-transform .4s ease;transition:-webkit-transform .4s ease;-o-transition:transform .4s ease;transition:transform .4s ease;transition:transform .4s ease,-webkit-transform .4s ease}.mm-menu_position-bottom.mm-menu_opened,.mm-menu_position-front.mm-menu_opened,.mm-menu_position-top.mm-menu_opened{z-index:2}.mm-menu_position-bottom.mm-menu_opened~.mm-slideout,.mm-menu_position-front.mm-menu_opened~.mm-slideout,.mm-menu_position-top.mm-menu_opened~.mm-slideout{-webkit-transform:none!important;-ms-transform:none!important;transform:none!important;z-index:0}.mm-menu_position-bottom.mm-menu_opened~.mm-wrapper__blocker,.mm-menu_position-front.mm-menu_opened~.mm-wrapper__blocker,.mm-menu_position-top.mm-menu_opened~.mm-wrapper__blocker{z-index:1}.mm-menu_position-front{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.mm-menu_position-front.mm-menu_position-right{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.mm-menu_position-bottom,.mm-menu_position-top{width:100%;min-width:100%;max-width:100%}.mm-menu_position-top{-webkit-transform:translate3d(0,-100%,0);transform:translate3d(0,-100%,0)}.mm-menu_position-top{height:80vh;min-height:140px;max-height:880px}.mm-menu_position-bottom{-webkit-transform:translate3d(0,100%,0);transform:translate3d(0,100%,0);top:auto}.mm-menu_position-bottom{height:80vh;min-height:140px;max-height:880px}.mm-wrapper_opening .mm-menu_position-bottom,.mm-wrapper_opening .mm-menu_position-front,.mm-wrapper_opening .mm-menu_position-top{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}\n.mm-menu_shadow-page:after{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow);content:\"\";display:block;width:20px;height:120%;position:absolute;left:100%;top:-10%;z-index:100;-webkit-clip-path:polygon(-20px 0,0 0,0 100%,-20px 100%);clip-path:polygon(-20px 0,0 0,0 100%,-20px 100%)}.mm-menu_shadow-page.mm-menu_position-right:after{left:auto;right:100%;-webkit-clip-path:polygon(20px 0,40px 0,40px 100%,20px 100%);clip-path:polygon(20px 0,40px 0,40px 100%,20px 100%)}.mm-menu_shadow-page.mm-menu_position-front:after{content:none;display:none}.mm-menu_shadow-menu{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow)}.mm-menu_shadow-panels .mm-panels>.mm-panel{-webkit-box-shadow:0 0 10px rgba(0,0,0,.3);box-shadow:0 0 10px rgba(0,0,0,.3);-webkit-box-shadow:var(--mm-shadow);box-shadow:var(--mm-shadow)}\n.mm-menu_theme-white{--mm-color-border:rgba( 0,0,0, 0.1 );--mm-color-button:rgba( 0,0,0, 0.3 );--mm-color-text:rgba( 0,0,0, 0.7 );--mm-color-text-dimmed:rgba( 0,0,0, 0.3 );--mm-color-background:#fff;--mm-color-background-highlight:rgba( 0,0,0, 0.06 );--mm-color-background-emphasis:rgba( 0,0,0, 0.03 );--mm-shadow:0 0 10px rgba( 0,0,0, 0.2 )}.mm-menu_theme-dark{--mm-color-border:rgba( 0,0,0, 0.3 );--mm-color-button:rgba( 255,255,255, 0.4 );--mm-color-text:rgba( 255,255,255, 0.85 );--mm-color-text-dimmed:rgba( 255,255,255, 0.4 );--mm-color-background:#333;--mm-color-background-highlight:rgba( 255,255,255, 0.08 );--mm-color-background-emphasis:rgba( 0,0,0, 0.1 );--mm-shadow:0 0 20px rgba( 0,0,0, 0.5 )}.mm-menu_theme-black{--mm-color-border:rgba( 255,255,255, 0.25 );--mm-color-button:rgba( 255,255,255, 0.4 );--mm-color-text:rgba( 255,255,255, 0.75 );--mm-color-text-dimmed:rgba( 255,255,255, 0.4 );--mm-color-background:#000;--mm-color-background-highlight:rgba( 255,255,255, 0.2 );--mm-color-background-emphasis:rgba( 255,255,255, 0.15 );--mm-shadow:none}\n.mm-menu_tileview .mm-listview,.mm-panel_tileview .mm-listview{margin:0!important}.mm-menu_tileview .mm-listview:after,.mm-panel_tileview .mm-listview:after{content:'';display:block;clear:both}.mm-menu_tileview .mm-listitem,.mm-panel_tileview .mm-listitem{padding:0;float:left;position:relative;width:50%;height:0;padding-top:50%}.mm-menu_tileview .mm-listitem:after,.mm-panel_tileview .mm-listitem:after{left:0;top:0;border-right-width:1px;border-right-style:solid;z-index:-1}.mm-menu_tileview .mm-listitem.mm-tile-xs,.mm-panel_tileview .mm-listitem.mm-tile-xs{width:12.5%;padding-top:12.5%}.mm-menu_tileview .mm-listitem.mm-tile-s,.mm-panel_tileview .mm-listitem.mm-tile-s{width:25%;padding-top:25%}.mm-menu_tileview .mm-listitem.mm-tile-l,.mm-panel_tileview .mm-listitem.mm-tile-l{width:75%;padding-top:75%}.mm-menu_tileview .mm-listitem.mm-tile-xl,.mm-panel_tileview .mm-listitem.mm-tile-xl{width:100%;padding-top:100%}.mm-menu_tileview .mm-listitem__text,.mm-panel_tileview .mm-listitem__text{line-height:1px;text-align:center;padding:50% 10px 0 10px;margin:0;position:absolute;top:0;right:1px;bottom:1px;left:0}.mm-menu_tileview .mm-listitem__btn,.mm-panel_tileview .mm-listitem__btn{width:auto}.mm-menu_tileview .mm-listitem__btn:after,.mm-menu_tileview .mm-listitem__btn:before,.mm-panel_tileview .mm-listitem__btn:after,.mm-panel_tileview .mm-listitem__btn:before{content:none;display:none}.mm-menu_tileview .mm-listitem_divider,.mm-panel_tileview .mm-listitem_divider{display:none}.mm-menu_tileview .mm-panel,.mm-panel_tileview{padding-left:0;padding-right:0}.mm-menu_tileview .mm-panel:after,.mm-menu_tileview .mm-panel:before,.mm-panel_tileview:after,.mm-panel_tileview:before{content:none;display:none}\nbody.modal-open .mm-slideout{z-index:unset}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/*! Flickity v2.2.0\nhttps://flickity.metafizzy.co\n---------------------------------------------- */\n.flickity-enabled{position:relative}.flickity-enabled:focus{outline:0}.flickity-viewport{overflow:hidden;position:relative;height:100%}.flickity-slider{position:absolute;width:100%;height:100%}.flickity-enabled.is-draggable{-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flickity-enabled.is-draggable .flickity-viewport{cursor:move;cursor:-webkit-grab;cursor:grab}.flickity-enabled.is-draggable .flickity-viewport.is-pointer-down{cursor:-webkit-grabbing;cursor:grabbing}.flickity-button{position:absolute;background:hsla(0,0%,100%,.75);border:none;color:#333}.flickity-button:hover{background:#fff;cursor:pointer}.flickity-button:focus{outline:0;box-shadow:0 0 0 5px #19F}.flickity-button:active{opacity:.6}.flickity-button:disabled{opacity:.3;cursor:auto;pointer-events:none}.flickity-button-icon{fill:currentColor}.flickity-prev-next-button{top:50%;width:44px;height:44px;border-radius:50%;transform:translateY(-50%)}.flickity-prev-next-button.previous{left:10px}.flickity-prev-next-button.next{right:10px}.flickity-rtl .flickity-prev-next-button.previous{left:auto;right:10px}.flickity-rtl .flickity-prev-next-button.next{right:auto;left:10px}.flickity-prev-next-button .flickity-button-icon{position:absolute;left:20%;top:20%;width:60%;height:60%}.flickity-page-dots{position:absolute;width:100%;bottom:-25px;padding:0;margin:0;list-style:none;text-align:center;line-height:1}.flickity-rtl .flickity-page-dots{direction:rtl}.flickity-page-dots .dot{display:inline-block;width:10px;height:10px;margin:0 8px;background:#333;border-radius:50%;opacity:.25;cursor:pointer}.flickity-page-dots .dot.is-selected{opacity:1}", "", {"version":3,"sources":["/Users/kirstynoble/Sites/ifm.com/node_modules/flickity/dist/flickity.min.css"],"names":[],"mappings":"AAAA;;iDAEiD;AACjD,kBAAkB,iBAAiB,CAAC,wBAAwB,SAAS,CAAC,mBAAmB,gBAAgB,kBAAkB,WAAW,CAAC,iBAAiB,kBAAkB,WAAW,WAAW,CAAC,+BAA+B,wCAAwC,gCAAgC,yBAAyB,sBAAsB,qBAAqB,gBAAgB,CAAC,kDAAkD,YAAY,oBAAoB,WAAW,CAAC,kEAAkE,wBAAwB,eAAe,CAAC,iBAAiB,kBAAkB,+BAA+B,YAAY,UAAU,CAAC,uBAAuB,gBAAgB,cAAc,CAAC,uBAAuB,UAAU,yBAAyB,CAAC,wBAAwB,UAAU,CAAC,0BAA0B,WAAW,YAAY,mBAAmB,CAAC,sBAAsB,iBAAiB,CAAC,2BAA2B,QAAQ,WAAW,YAAY,kBAAkB,0BAA0B,CAAC,oCAAoC,SAAS,CAAC,gCAAgC,UAAU,CAAC,kDAAkD,UAAU,UAAU,CAAC,8CAA8C,WAAW,SAAS,CAAC,iDAAiD,kBAAkB,SAAS,QAAQ,UAAU,UAAU,CAAC,oBAAoB,kBAAkB,WAAW,aAAa,UAAU,SAAS,gBAAgB,kBAAkB,aAAa,CAAC,kCAAkC,aAAa,CAAC,yBAAyB,qBAAqB,WAAW,YAAY,aAAa,gBAAgB,kBAAkB,YAAY,cAAc,CAAC,qCAAqC,SAAS,CAAC","file":"flickity.min.css","sourcesContent":["/*! Flickity v2.2.0\nhttps://flickity.metafizzy.co\n---------------------------------------------- */\n.flickity-enabled{position:relative}.flickity-enabled:focus{outline:0}.flickity-viewport{overflow:hidden;position:relative;height:100%}.flickity-slider{position:absolute;width:100%;height:100%}.flickity-enabled.is-draggable{-webkit-tap-highlight-color:transparent;tap-highlight-color:transparent;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.flickity-enabled.is-draggable .flickity-viewport{cursor:move;cursor:-webkit-grab;cursor:grab}.flickity-enabled.is-draggable .flickity-viewport.is-pointer-down{cursor:-webkit-grabbing;cursor:grabbing}.flickity-button{position:absolute;background:hsla(0,0%,100%,.75);border:none;color:#333}.flickity-button:hover{background:#fff;cursor:pointer}.flickity-button:focus{outline:0;box-shadow:0 0 0 5px #19F}.flickity-button:active{opacity:.6}.flickity-button:disabled{opacity:.3;cursor:auto;pointer-events:none}.flickity-button-icon{fill:currentColor}.flickity-prev-next-button{top:50%;width:44px;height:44px;border-radius:50%;transform:translateY(-50%)}.flickity-prev-next-button.previous{left:10px}.flickity-prev-next-button.next{right:10px}.flickity-rtl .flickity-prev-next-button.previous{left:auto;right:10px}.flickity-rtl .flickity-prev-next-button.next{right:auto;left:10px}.flickity-prev-next-button .flickity-button-icon{position:absolute;left:20%;top:20%;width:60%;height:60%}.flickity-page-dots{position:absolute;width:100%;bottom:-25px;padding:0;margin:0;list-style:none;text-align:center;line-height:1}.flickity-rtl .flickity-page-dots{direction:rtl}.flickity-page-dots .dot{display:inline-block;width:10px;height:10px;margin:0 8px;background:#333;border-radius:50%;opacity:.25;cursor:pointer}.flickity-page-dots .dot.is-selected{opacity:1}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(true);
// imports


// module
exports.push([module.i, "/* Slider */\n.slick-slider\n{\n    position: relative;\n\n    display: block;\n    box-sizing: border-box;\n\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n\n    -webkit-touch-callout: none;\n    -khtml-user-select: none;\n    -ms-touch-action: pan-y;\n        touch-action: pan-y;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.slick-list\n{\n    position: relative;\n\n    display: block;\n    overflow: hidden;\n\n    margin: 0;\n    padding: 0;\n}\n.slick-list:focus\n{\n    outline: none;\n}\n.slick-list.dragging\n{\n    cursor: pointer;\n    cursor: hand;\n}\n\n.slick-slider .slick-track,\n.slick-slider .slick-list\n{\n    -webkit-transform: translate3d(0, 0, 0);\n       -moz-transform: translate3d(0, 0, 0);\n        -ms-transform: translate3d(0, 0, 0);\n         -o-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n}\n\n.slick-track\n{\n    position: relative;\n    top: 0;\n    left: 0;\n\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n.slick-track:before,\n.slick-track:after\n{\n    display: table;\n\n    content: '';\n}\n.slick-track:after\n{\n    clear: both;\n}\n.slick-loading .slick-track\n{\n    visibility: hidden;\n}\n\n.slick-slide\n{\n    display: none;\n    float: left;\n\n    height: 100%;\n    min-height: 1px;\n}\n[dir='rtl'] .slick-slide\n{\n    float: right;\n}\n.slick-slide img\n{\n    display: block;\n}\n.slick-slide.slick-loading img\n{\n    display: none;\n}\n.slick-slide.dragging img\n{\n    pointer-events: none;\n}\n.slick-initialized .slick-slide\n{\n    display: block;\n}\n.slick-loading .slick-slide\n{\n    visibility: hidden;\n}\n.slick-vertical .slick-slide\n{\n    display: block;\n\n    height: auto;\n\n    border: 1px solid transparent;\n}\n.slick-arrow.slick-hidden {\n    display: none;\n}\n", "", {"version":3,"sources":["/Users/kirstynoble/Sites/ifm.com/node_modules/slick-carousel/slick/slick.css"],"names":[],"mappings":"AAAA,YAAY;AACZ;;IAEI,mBAAmB;;IAEnB,eAAe;IACf,uBAAuB;;IAEvB,0BAA0B;OACvB,uBAAuB;QACtB,sBAAsB;YAClB,kBAAkB;;IAE1B,4BAA4B;IAC5B,yBAAyB;IACzB,wBAAwB;QACpB,oBAAoB;IACxB,yCAAyC;CAC5C;;AAED;;IAEI,mBAAmB;;IAEnB,eAAe;IACf,iBAAiB;;IAEjB,UAAU;IACV,WAAW;CACd;AACD;;IAEI,cAAc;CACjB;AACD;;IAEI,gBAAgB;IAChB,aAAa;CAChB;;AAED;;;IAGI,wCAAwC;OACrC,qCAAqC;QACpC,oCAAoC;SACnC,mCAAmC;YAChC,gCAAgC;CAC3C;;AAED;;IAEI,mBAAmB;IACnB,OAAO;IACP,QAAQ;;IAER,eAAe;IACf,kBAAkB;IAClB,mBAAmB;CACtB;AACD;;;IAGI,eAAe;;IAEf,YAAY;CACf;AACD;;IAEI,YAAY;CACf;AACD;;IAEI,mBAAmB;CACtB;;AAED;;IAEI,cAAc;IACd,YAAY;;IAEZ,aAAa;IACb,gBAAgB;CACnB;AACD;;IAEI,aAAa;CAChB;AACD;;IAEI,eAAe;CAClB;AACD;;IAEI,cAAc;CACjB;AACD;;IAEI,qBAAqB;CACxB;AACD;;IAEI,eAAe;CAClB;AACD;;IAEI,mBAAmB;CACtB;AACD;;IAEI,eAAe;;IAEf,aAAa;;IAEb,8BAA8B;CACjC;AACD;IACI,cAAc;CACjB","file":"slick.css","sourcesContent":["/* Slider */\n.slick-slider\n{\n    position: relative;\n\n    display: block;\n    box-sizing: border-box;\n\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n\n    -webkit-touch-callout: none;\n    -khtml-user-select: none;\n    -ms-touch-action: pan-y;\n        touch-action: pan-y;\n    -webkit-tap-highlight-color: transparent;\n}\n\n.slick-list\n{\n    position: relative;\n\n    display: block;\n    overflow: hidden;\n\n    margin: 0;\n    padding: 0;\n}\n.slick-list:focus\n{\n    outline: none;\n}\n.slick-list.dragging\n{\n    cursor: pointer;\n    cursor: hand;\n}\n\n.slick-slider .slick-track,\n.slick-slider .slick-list\n{\n    -webkit-transform: translate3d(0, 0, 0);\n       -moz-transform: translate3d(0, 0, 0);\n        -ms-transform: translate3d(0, 0, 0);\n         -o-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n}\n\n.slick-track\n{\n    position: relative;\n    top: 0;\n    left: 0;\n\n    display: block;\n    margin-left: auto;\n    margin-right: auto;\n}\n.slick-track:before,\n.slick-track:after\n{\n    display: table;\n\n    content: '';\n}\n.slick-track:after\n{\n    clear: both;\n}\n.slick-loading .slick-track\n{\n    visibility: hidden;\n}\n\n.slick-slide\n{\n    display: none;\n    float: left;\n\n    height: 100%;\n    min-height: 1px;\n}\n[dir='rtl'] .slick-slide\n{\n    float: right;\n}\n.slick-slide img\n{\n    display: block;\n}\n.slick-slide.slick-loading img\n{\n    display: none;\n}\n.slick-slide.dragging img\n{\n    pointer-events: none;\n}\n.slick-initialized .slick-slide\n{\n    display: block;\n}\n.slick-loading .slick-slide\n{\n    visibility: hidden;\n}\n.slick-vertical .slick-slide\n{\n    display: block;\n\n    height: auto;\n\n    border: 1px solid transparent;\n}\n.slick-arrow.slick-hidden {\n    display: none;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			var styleTarget = fn.call(this, selector);
			// Special case to return head of iframe instead of iframe itself
			if (styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[selector] = styleTarget;
		}
		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(14);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


__webpack_require__(16);
__webpack_require__(17);
__webpack_require__(18);
__webpack_require__(19);


/***/ }),
/* 16 */
/***/ (function(module, exports) {

// Console-polyfill. MIT license.
// https://github.com/paulmillr/console-polyfill
// Make it safe to do console.log() always.
(function(global) {
  'use strict';
  if (!global.console) {
    global.console = {};
  }
  var con = global.console;
  var prop, method;
  var dummy = function() {};
  var properties = ['memory'];
  var methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,' +
     'show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn').split(',');
  while (prop = properties.pop()) if (!con[prop]) con[prop] = {};
  while (method = methods.pop()) if (!con[method]) con[method] = dummy;
  // Using `this` for web workers & supports Browserify / Webpack.
})(typeof window === 'undefined' ? this : window);


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
* jquery-match-height 0.7.2 by @liabru
* http://brm.io/jquery-match-height/
* License: MIT
*/

;(function(factory) { // eslint-disable-line no-extra-semi
    'use strict';
    if (true) {
        // AMD
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof module !== 'undefined' && module.exports) {
        // CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Global
        factory(jQuery);
    }
})(function($) {
    /*
    *  internal
    */

    var _previousResizeWidth = -1,
        _updateTimeout = -1;

    /*
    *  _parse
    *  value parse utility function
    */

    var _parse = function(value) {
        // parse value and convert NaN to 0
        return parseFloat(value) || 0;
    };

    /*
    *  _rows
    *  utility function returns array of jQuery selections representing each row
    *  (as displayed after float wrapping applied by browser)
    */

    var _rows = function(elements) {
        var tolerance = 1,
            $elements = $(elements),
            lastTop = null,
            rows = [];

        // group elements by their top position
        $elements.each(function(){
            var $that = $(this),
                top = $that.offset().top - _parse($that.css('margin-top')),
                lastRow = rows.length > 0 ? rows[rows.length - 1] : null;

            if (lastRow === null) {
                // first item on the row, so just push it
                rows.push($that);
            } else {
                // if the row top is the same, add to the row group
                if (Math.floor(Math.abs(lastTop - top)) <= tolerance) {
                    rows[rows.length - 1] = lastRow.add($that);
                } else {
                    // otherwise start a new row group
                    rows.push($that);
                }
            }

            // keep track of the last row top
            lastTop = top;
        });

        return rows;
    };

    /*
    *  _parseOptions
    *  handle plugin options
    */

    var _parseOptions = function(options) {
        var opts = {
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        };

        if (typeof options === 'object') {
            return $.extend(opts, options);
        }

        if (typeof options === 'boolean') {
            opts.byRow = options;
        } else if (options === 'remove') {
            opts.remove = true;
        }

        return opts;
    };

    /*
    *  matchHeight
    *  plugin definition
    */

    var matchHeight = $.fn.matchHeight = function(options) {
        var opts = _parseOptions(options);

        // handle remove
        if (opts.remove) {
            var that = this;

            // remove fixed height from all selected elements
            this.css(opts.property, '');

            // remove selected elements from all groups
            $.each(matchHeight._groups, function(key, group) {
                group.elements = group.elements.not(that);
            });

            // TODO: cleanup empty groups

            return this;
        }

        if (this.length <= 1 && !opts.target) {
            return this;
        }

        // keep track of this group so we can re-apply later on load and resize events
        matchHeight._groups.push({
            elements: this,
            options: opts
        });

        // match each element's height to the tallest element in the selection
        matchHeight._apply(this, opts);

        return this;
    };

    /*
    *  plugin global options
    */

    matchHeight.version = '0.7.2';
    matchHeight._groups = [];
    matchHeight._throttle = 80;
    matchHeight._maintainScroll = false;
    matchHeight._beforeUpdate = null;
    matchHeight._afterUpdate = null;
    matchHeight._rows = _rows;
    matchHeight._parse = _parse;
    matchHeight._parseOptions = _parseOptions;

    /*
    *  matchHeight._apply
    *  apply matchHeight to given elements
    */

    matchHeight._apply = function(elements, options) {
        var opts = _parseOptions(options),
            $elements = $(elements),
            rows = [$elements];

        // take note of scroll position
        var scrollTop = $(window).scrollTop(),
            htmlHeight = $('html').outerHeight(true);

        // get hidden parents
        var $hiddenParents = $elements.parents().filter(':hidden');

        // cache the original inline style
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.data('style-cache', $that.attr('style'));
        });

        // temporarily must force hidden parents visible
        $hiddenParents.css('display', 'block');

        // get rows if using byRow, otherwise assume one row
        if (opts.byRow && !opts.target) {

            // must first force an arbitrary equal height so floating elements break evenly
            $elements.each(function() {
                var $that = $(this),
                    display = $that.css('display');

                // temporarily force a usable display value
                if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                    display = 'block';
                }

                // cache the original inline style
                $that.data('style-cache', $that.attr('style'));

                $that.css({
                    'display': display,
                    'padding-top': '0',
                    'padding-bottom': '0',
                    'margin-top': '0',
                    'margin-bottom': '0',
                    'border-top-width': '0',
                    'border-bottom-width': '0',
                    'height': '100px',
                    'overflow': 'hidden'
                });
            });

            // get the array of rows (based on element top position)
            rows = _rows($elements);

            // revert original inline styles
            $elements.each(function() {
                var $that = $(this);
                $that.attr('style', $that.data('style-cache') || '');
            });
        }

        $.each(rows, function(key, row) {
            var $row = $(row),
                targetHeight = 0;

            if (!opts.target) {
                // skip apply to rows with only one item
                if (opts.byRow && $row.length <= 1) {
                    $row.css(opts.property, '');
                    return;
                }

                // iterate the row and find the max height
                $row.each(function(){
                    var $that = $(this),
                        style = $that.attr('style'),
                        display = $that.css('display');

                    // temporarily force a usable display value
                    if (display !== 'inline-block' && display !== 'flex' && display !== 'inline-flex') {
                        display = 'block';
                    }

                    // ensure we get the correct actual height (and not a previously set height value)
                    var css = { 'display': display };
                    css[opts.property] = '';
                    $that.css(css);

                    // find the max height (including padding, but not margin)
                    if ($that.outerHeight(false) > targetHeight) {
                        targetHeight = $that.outerHeight(false);
                    }

                    // revert styles
                    if (style) {
                        $that.attr('style', style);
                    } else {
                        $that.css('display', '');
                    }
                });
            } else {
                // if target set, use the height of the target element
                targetHeight = opts.target.outerHeight(false);
            }

            // iterate the row and apply the height to all elements
            $row.each(function(){
                var $that = $(this),
                    verticalPadding = 0;

                // don't apply to a target
                if (opts.target && $that.is(opts.target)) {
                    return;
                }

                // handle padding and border correctly (required when not using border-box)
                if ($that.css('box-sizing') !== 'border-box') {
                    verticalPadding += _parse($that.css('border-top-width')) + _parse($that.css('border-bottom-width'));
                    verticalPadding += _parse($that.css('padding-top')) + _parse($that.css('padding-bottom'));
                }

                // set the height (accounting for padding and border)
                $that.css(opts.property, (targetHeight - verticalPadding) + 'px');
            });
        });

        // revert hidden parents
        $hiddenParents.each(function() {
            var $that = $(this);
            $that.attr('style', $that.data('style-cache') || null);
        });

        // restore scroll position if enabled
        if (matchHeight._maintainScroll) {
            $(window).scrollTop((scrollTop / htmlHeight) * $('html').outerHeight(true));
        }

        return this;
    };

    /*
    *  matchHeight._applyDataApi
    *  applies matchHeight to all elements with a data-match-height attribute
    */

    matchHeight._applyDataApi = function() {
        var groups = {};

        // generate groups by their groupId set by elements using data-match-height
        $('[data-match-height], [data-mh]').each(function() {
            var $this = $(this),
                groupId = $this.attr('data-mh') || $this.attr('data-match-height');

            if (groupId in groups) {
                groups[groupId] = groups[groupId].add($this);
            } else {
                groups[groupId] = $this;
            }
        });

        // apply matchHeight to each group
        $.each(groups, function() {
            this.matchHeight(true);
        });
    };

    /*
    *  matchHeight._update
    *  updates matchHeight on all current groups with their correct options
    */

    var _update = function(event) {
        if (matchHeight._beforeUpdate) {
            matchHeight._beforeUpdate(event, matchHeight._groups);
        }

        $.each(matchHeight._groups, function() {
            matchHeight._apply(this.elements, this.options);
        });

        if (matchHeight._afterUpdate) {
            matchHeight._afterUpdate(event, matchHeight._groups);
        }
    };

    matchHeight._update = function(throttle, event) {
        // prevent update if fired from a resize event
        // where the viewport width hasn't actually changed
        // fixes an event looping bug in IE8
        if (event && event.type === 'resize') {
            var windowWidth = $(window).width();
            if (windowWidth === _previousResizeWidth) {
                return;
            }
            _previousResizeWidth = windowWidth;
        }

        // throttle updates
        if (!throttle) {
            _update(event);
        } else if (_updateTimeout === -1) {
            _updateTimeout = setTimeout(function() {
                _update(event);
                _updateTimeout = -1;
            }, matchHeight._throttle);
        }
    };

    /*
    *  bind events
    */

    // apply on DOM ready event
    $(matchHeight._applyDataApi);

    // use on or bind where supported
    var on = $.fn.on ? 'on' : 'bind';

    // update heights on load and resize events
    $(window)[on]('load', function(event) {
        matchHeight._update(false, event);
    });

    // throttled update heights on resize events
    $(window)[on]('resize orientationchange', function(event) {
        matchHeight._update(true, event);
    });

});


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;(function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'));
  } else {
    root.jquery_mmenu_all_js = factory(root.jQuery);
  }
}(this, function(jQuery) {
/*!
 * jQuery mmenu v7.2.2
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * License: CC-BY-NC-4.0
 * http://creativecommons.org/licenses/by-nc/4.0/
 */
!function(h){var n,p,o,a,t,f="mmenu",e="7.2.2";h[f]&&h[f].version>e||(h[f]=function(t,e,n){return this.$menu=t,this._api=["bind","getInstance","initPanels","openPanel","closePanel","closeAllPanels","setSelected"],this.opts=e,this.conf=n,this.vars={},this.cbck={},this.mtch={},"function"==typeof this.___deprecated&&this.___deprecated(),this._initWrappers(),this._initAddons(),this._initExtensions(),this._initHooks(),this._initMenu(),this._initPanels(),this._initOpened(),this._initAnchors(),this._initMatchMedia(),"function"==typeof this.___debug&&this.___debug(),this},h[f].version=e,h[f].uniqueId=0,h[f].wrappers={},h[f].addons={},h[f].defaults={hooks:{},extensions:[],wrappers:[],navbar:{add:!0,title:"Menu",titleLink:"parent"},onClick:{setSelected:!0},slidingSubmenus:!0},h[f].configuration={classNames:{divider:"Divider",inset:"Inset",nolistview:"NoListview",nopanel:"NoPanel",panel:"Panel",selected:"Selected",spacer:"Spacer",vertical:"Vertical"},clone:!1,language:null,openingInterval:25,panelNodetype:"ul, ol, div",transitionDuration:400},h[f].prototype={getInstance:function(){return this},initPanels:function(t){this._initPanels(t)},openPanel:function(t,e){if(this.trigger("openPanel:before",t),t&&t.length&&(t.is("."+p.panel)||(t=t.closest("."+p.panel)),t.is("."+p.panel))){var n=this;if("boolean"!=typeof e&&(e=!0),t.parent("."+p.listitem+"_vertical").length)t.parents("."+p.listitem+"_vertical").addClass(p.listitem+"_opened").children("."+p.panel).removeClass(p.hidden),this.openPanel(t.parents("."+p.panel).not(function(){return h(this).parent("."+p.listitem+"_vertical").length}).first()),this.trigger("openPanel:start",t),this.trigger("openPanel:finish",t);else{if(t.hasClass(p.panel+"_opened"))return;var i=this.$pnls.children("."+p.panel),s=this.$pnls.children("."+p.panel+"_opened");if(!h[f].support.csstransitions)return s.addClass(p.hidden).removeClass(p.panel+"_opened"),t.removeClass(p.hidden).addClass(p.panel+"_opened"),this.trigger("openPanel:start",t),void this.trigger("openPanel:finish",t);i.not(t).removeClass(p.panel+"_opened-parent");for(var a=t.data(o.parent);a;)(a=a.closest("."+p.panel)).parent("."+p.listitem+"_vertical").length||a.addClass(p.panel+"_opened-parent"),a=a.data(o.parent);i.removeClass(p.panel+"_highest").not(s).not(t).addClass(p.hidden),t.removeClass(p.hidden);var r=function(){s.removeClass(p.panel+"_opened"),t.addClass(p.panel+"_opened"),t.hasClass(p.panel+"_opened-parent")?(s.addClass(p.panel+"_highest"),t.removeClass(p.panel+"_opened-parent")):(s.addClass(p.panel+"_opened-parent"),t.addClass(p.panel+"_highest")),n.trigger("openPanel:start",t)},l=function(){s.removeClass(p.panel+"_highest").addClass(p.hidden),t.removeClass(p.panel+"_highest"),n.trigger("openPanel:finish",t)};e&&!t.hasClass(p.panel+"_noanimation")?setTimeout(function(){n.__transitionend(t,function(){l()},n.conf.transitionDuration),r()},n.conf.openingInterval):(r(),l())}this.trigger("openPanel:after",t)}},closePanel:function(t){this.trigger("closePanel:before",t);var e=t.parent();e.hasClass(p.listitem+"_vertical")&&(e.removeClass(p.listitem+"_opened"),t.addClass(p.hidden),this.trigger("closePanel",t)),this.trigger("closePanel:after",t)},closeAllPanels:function(t){this.trigger("closeAllPanels:before"),this.$pnls.find("."+p.listview).children().removeClass(p.listitem+"_selected").filter("."+p.listitem+"_vertical").removeClass(p.listitem+"_opened");var e=this.$pnls.children("."+p.panel),n=t&&t.length?t:e.first();this.$pnls.children("."+p.panel).not(n).removeClass(p.panel+"_opened").removeClass(p.panel+"_opened-parent").removeClass(p.panel+"_highest").addClass(p.hidden),this.openPanel(n,!1),this.trigger("closeAllPanels:after")},togglePanel:function(t){var e=t.parent();e.hasClass(p.listitem+"_vertical")&&this[e.hasClass(p.listitem+"_opened")?"closePanel":"openPanel"](t)},setSelected:function(t){this.trigger("setSelected:before",t),this.$menu.find("."+p.listitem+"_selected").removeClass(p.listitem+"_selected"),t.addClass(p.listitem+"_selected"),this.trigger("setSelected:after",t)},bind:function(t,e){this.cbck[t]=this.cbck[t]||[],this.cbck[t].push(e)},trigger:function(){var t=Array.prototype.slice.call(arguments),e=t.shift();if(this.cbck[e])for(var n=0,i=this.cbck[e].length;n<i;n++)this.cbck[e][n].apply(this,t)},matchMedia:function(t,e,n){var i={yes:e,no:n};this.mtch[t]=this.mtch[t]||[],this.mtch[t].push(i)},i18n:function(t){return h[f].i18n(t,this.conf.language)},_initHooks:function(){for(var t in this.opts.hooks)this.bind(t,this.opts.hooks[t])},_initWrappers:function(){this.trigger("initWrappers:before");for(var t=0;t<this.opts.wrappers.length;t++){var e=h[f].wrappers[this.opts.wrappers[t]];"function"==typeof e&&e.call(this)}this.trigger("initWrappers:after")},_initAddons:function(){var t;for(t in this.trigger("initAddons:before"),h[f].addons)h[f].addons[t].add.call(this),h[f].addons[t].add=function(){};for(t in h[f].addons)h[f].addons[t].setup.call(this);this.trigger("initAddons:after")},_initExtensions:function(){this.trigger("initExtensions:before");var e=this;for(var t in this.opts.extensions.constructor===Array&&(this.opts.extensions={all:this.opts.extensions}),this.opts.extensions)this.opts.extensions[t]=this.opts.extensions[t].length?p.menu+"_"+this.opts.extensions[t].join(" "+p.menu+"_"):"",this.opts.extensions[t]&&function(t){e.matchMedia(t,function(){this.$menu.addClass(this.opts.extensions[t])},function(){this.$menu.removeClass(this.opts.extensions[t])})}(t);this.trigger("initExtensions:after")},_initMenu:function(){this.trigger("initMenu:before");this.conf.clone&&(this.$orig=this.$menu,this.$menu=this.$orig.clone(),this.$menu.add(this.$menu.find("[id]")).filter("[id]").each(function(){h(this).attr("id",p.mm(h(this).attr("id")))})),this.$menu.attr("id",this.$menu.attr("id")||this.__getUniqueId()),this.$pnls=h('<div class="'+p.panels+'" />').append(this.$menu.children(this.conf.panelNodetype)).prependTo(this.$menu),this.$menu.addClass(p.menu).parent().addClass(p.wrapper),this.trigger("initMenu:after")},_initPanels:function(t){this.trigger("initPanels:before",t),t=t||this.$pnls.children(this.conf.panelNodetype);var i=h(),s=this,a=function(t){t.filter(s.conf.panelNodetype).each(function(t){var e=s._initPanel(h(this));if(e){s._initNavbar(e),s._initListview(e),i=i.add(e);var n=e.children("."+p.listview).children("li").children(s.conf.panelNodetype).add(e.children("."+s.conf.classNames.panel));n.length&&a(n)}})};a(t),this.trigger("initPanels:after",i)},_initPanel:function(t){this.trigger("initPanel:before",t);if(t.hasClass(p.panel))return t;if(this.__refactorClass(t,this.conf.classNames.panel,p.panel),this.__refactorClass(t,this.conf.classNames.nopanel,p.nopanel),this.__refactorClass(t,this.conf.classNames.inset,p.listview+"_inset"),t.filter("."+p.listview+"_inset").addClass(p.nopanel),t.hasClass(p.nopanel))return!1;var e=t.hasClass(this.conf.classNames.vertical)||!this.opts.slidingSubmenus;t.removeClass(this.conf.classNames.vertical);var n=t.attr("id")||this.__getUniqueId();t.is("ul, ol")&&(t.removeAttr("id"),t.wrap("<div />"),t=t.parent()),t.attr("id",n),t.addClass(p.panel+" "+p.hidden);var i=t.parent("li");return e?i.addClass(p.listitem+"_vertical"):t.appendTo(this.$pnls),i.length&&(i.data(o.child,t),t.data(o.parent,i)),this.trigger("initPanel:after",t),t},_initNavbar:function(t){if(this.trigger("initNavbar:before",t),!t.children("."+p.navbar).length){var e=t.data(o.parent),n=h('<div class="'+p.navbar+'" />'),i=this.__getPanelTitle(t,this.opts.navbar.title),s="";if(e&&e.length){if(e.hasClass(p.listitem+"_vertical"))return;if(e.parent().is("."+p.listview))var a=e.children("a, span").not("."+p.btn+"_next");else a=e.closest("."+p.panel).find('a[href="#'+t.attr("id")+'"]');var r=(e=(a=a.first()).closest("."+p.panel)).attr("id");switch(i=this.__getPanelTitle(t,h("<span>"+a.text()+"</span>").text()),this.opts.navbar.titleLink){case"anchor":s=a.attr("href");break;case"parent":s="#"+r}n.append('<a class="'+p.btn+" "+p.btn+"_prev "+p.navbar+'__btn" href="#'+r+'" />')}else if(!this.opts.navbar.title)return;this.opts.navbar.add&&t.addClass(p.panel+"_has-navbar"),n.append('<a class="'+p.navbar+'__title"'+(s.length?' href="'+s+'"':"")+">"+i+"</a>").prependTo(t),this.trigger("initNavbar:after",t)}},_initListview:function(t){this.trigger("initListview:before",t);var e=this.__childAddBack(t,"ul, ol");this.__refactorClass(e,this.conf.classNames.nolistview,p.nolistview);var n=e.not("."+p.nolistview).addClass(p.listview).children().addClass(p.listitem);this.__refactorClass(n,this.conf.classNames.selected,p.listitem+"_selected"),this.__refactorClass(n,this.conf.classNames.divider,p.listitem+"_divider"),this.__refactorClass(n,this.conf.classNames.spacer,p.listitem+"_spacer"),n.children("a, span").not("."+p.btn).addClass(p.listitem+"__text");var i=t.data(o.parent);if(i&&i.is("."+p.listitem)&&!i.children("."+p.btn).length){var s=i.children("a, span").first(),a=h('<a class="'+p.btn+" "+p.btn+"_next "+p.listitem+'__btn" href="#'+t.attr("id")+'" />');a.insertAfter(s),s.is("span")&&(a.addClass(p.listitem+"__text").html(s.html()),s.remove())}this.trigger("initListview:after",t)},_initOpened:function(){this.trigger("initOpened:before");var t=this.$pnls.find("."+p.listitem+"_selected").removeClass(p.listitem+"_selected").last().addClass(p.listitem+"_selected"),e=t.length?t.closest("."+p.panel):this.$pnls.children("."+p.panel).first();this.openPanel(e,!1),this.trigger("initOpened:after")},_initAnchors:function(){this.trigger("initAnchors:before");var c=this;t.$body.on(a.click+"-oncanvas","a[href]",function(t){var e=h(this),n=e.attr("href"),i=c.$menu.find(e).length,s=e.is("."+p.listitem+" > a"),a=e.is('[rel="external"]')||e.is('[target="_blank"]');if(i&&1<n.length&&"#"==n.slice(0,1))try{var r=c.$menu.find(n);if(r.is("."+p.panel))return c[e.parent().hasClass(p.listitem+"_vertical")?"togglePanel":"openPanel"](r),void t.preventDefault()}catch(t){}var l={close:null,setSelected:null,preventDefault:"#"==n.slice(0,1)};for(var o in h[f].addons){var d=h[f].addons[o].clickAnchor.call(c,e,i,s,a);if(d){if("boolean"==typeof d)return void t.preventDefault();"object"==typeof d&&(l=h.extend({},l,d))}}i&&s&&!a&&(c.__valueOrFn(e,c.opts.onClick.setSelected,l.setSelected)&&c.setSelected(h(t.target).parent()),c.__valueOrFn(e,c.opts.onClick.preventDefault,l.preventDefault)&&t.preventDefault(),c.__valueOrFn(e,c.opts.onClick.close,l.close)&&c.opts.offCanvas&&"function"==typeof c.close&&c.close())}),this.trigger("initAnchors:after")},_initMatchMedia:function(){var n=this;for(var i in this.mtch)!function(){var e=i,t=window.matchMedia(e);n._fireMatchMedia(e,t),t.addListener(function(t){n._fireMatchMedia(e,t)})}()},_fireMatchMedia:function(t,e){for(var n=e.matches?"yes":"no",i=0;i<this.mtch[t].length;i++)this.mtch[t][i][n].call(this)},_getOriginalMenuId:function(){var t=this.$menu.attr("id");return this.conf.clone&&t&&t.length&&(t=p.umm(t)),t},__api:function(){var n=this,i={};return h.each(this._api,function(t){var e=this;i[e]=function(){var t=n[e].apply(n,arguments);return void 0===t?i:t}}),i},__valueOrFn:function(t,e,n){if("function"==typeof e){var i=e.call(t[0]);if(void 0!==i)return i}return"function"!=typeof e&&void 0!==e||void 0===n?e:n},__getPanelTitle:function(t,e){var n;return"function"==typeof this.opts.navbar.title&&(n=this.opts.navbar.title.call(t[0])),void 0===n&&(n=t.data(o.title)),void 0!==n?n:"string"==typeof e?this.i18n(e):this.i18n(h[f].defaults.navbar.title)},__refactorClass:function(t,e,n){return t.filter("."+e).removeClass(e).addClass(n)},__findAddBack:function(t,e){return t.find(e).add(t.filter(e))},__childAddBack:function(t,e){return t.children(e).add(t.filter(e))},__filterListItems:function(t){return t.not("."+p.listitem+"_divider").not("."+p.hidden)},__filterListItemAnchors:function(t){return this.__filterListItems(t).children("a").not("."+p.btn+"_next")},__openPanelWoAnimation:function(t){t.hasClass(p.panel+"_noanimation")||(t.addClass(p.panel+"_noanimation"),this.__transitionend(t,function(){t.removeClass(p.panel+"_noanimation")},this.conf.openingInterval),this.openPanel(t))},__transitionend:function(e,n,t){var i=!1,s=function(t){void 0!==t&&t.target!=e[0]||(i||(e.off(a.transitionend),e.off(a.webkitTransitionEnd),n.call(e[0])),i=!0)};e.on(a.transitionend,s),e.on(a.webkitTransitionEnd,s),setTimeout(s,1.1*t)},__getUniqueId:function(){return p.mm(h[f].uniqueId++)}},h.fn[f]=function(n,i){!function(){if(h[f].glbl)return;t={$wndw:h(window),$docu:h(document),$html:h("html"),$body:h("body")},p={},o={},a={},h.each([p,o,a],function(t,i){i.add=function(t){t=t.split(" ");for(var e=0,n=t.length;e<n;e++)i[t[e]]=i.mm(t[e])}}),p.mm=function(t){return"mm-"+t},p.add("wrapper menu panels panel nopanel navbar listview nolistview listitem btn hidden"),p.umm=function(t){return"mm-"==t.slice(0,3)&&(t=t.slice(3)),t},o.mm=function(t){return"mm-"+t},o.add("parent child title"),a.mm=function(t){return t+".mm"},a.add("transitionend webkitTransitionEnd click scroll resize keydown mousedown mouseup touchstart touchmove touchend orientationchange"),h[f]._c=p,h[f]._d=o,h[f]._e=a,h[f].glbl=t}(),n=h.extend(!0,{},h[f].defaults,n),i=h.extend(!0,{},h[f].configuration,i);var s=h();return this.each(function(){var t=h(this);if(!t.data(f)){var e=new h[f](t,n,i);e.$menu.data(f,e.__api()),s=s.add(e.$menu)}}),s},h[f].i18n=(n={},function(t,e){switch(typeof t){case"object":return"string"==typeof e&&(void 0===n[e]&&(n[e]={}),h.extend(n[e],t)),n;case"string":return"string"==typeof e&&void 0!==n[e]&&n[e][t]||t;case"undefined":default:return n}}),h[f].support={touch:"ontouchstart"in window||navigator.msMaxTouchPoints||!1,csstransitions:"undefined"==typeof Modernizr||void 0===Modernizr.csstransitions||Modernizr.csstransitions})}(jQuery);
!function(r){var s,i,o,a,t="mmenu",p="offCanvas";r[t].addons[p]={setup:function(){if(this.opts[p]){var e=this.opts[p],i=this.conf[p];a=r[t].glbl,this._api=r.merge(this._api,["open","close","setPage"]),"object"!=typeof e&&(e={}),e=this.opts[p]=r.extend(!0,{},r[t].defaults[p],e),"string"!=typeof i.page.selector&&(i.page.selector="> "+i.page.nodetype),this.vars.opened=!1;var o=[s.menu+"_offcanvas"];this.bind("initMenu:after",function(){var e=this;this._initBlocker(),this.setPage(a.$page),this["_initWindow_"+p](),this.$menu.addClass(o.join(" ")).parent("."+s.wrapper).removeClass(s.wrapper),this.$menu[i.menu.insertMethod](i.menu.insertSelector);var t=window.location.hash;if(t){var n=this._getOriginalMenuId();n&&n==t.slice(1)&&setTimeout(function(){e.open()},1e3)}}),this.bind("setPage:after",function(e){a.$blck&&a.$blck.children("a").attr("href","#"+e.attr("id"))}),this.bind("open:start:sr-aria",function(){this.__sr_aria(this.$menu,"hidden",!1)}),this.bind("close:finish:sr-aria",function(){this.__sr_aria(this.$menu,"hidden",!0)}),this.bind("initMenu:after:sr-aria",function(){this.__sr_aria(this.$menu,"hidden",!0)}),this.bind("initBlocker:after:sr-text",function(){a.$blck.children("a").html(this.__sr_text(this.i18n(this.conf.screenReader.text.closeMenu)))})}},add:function(){s=r[t]._c,i=r[t]._d,o=r[t]._e,s.add("slideout page no-csstransforms3d"),i.add("style")},clickAnchor:function(e,t){var n=this;if(this.opts[p]){var i=this._getOriginalMenuId();if(i&&e.is('[href="#'+i+'"]')){if(t)return this.open(),!0;var o=e.closest("."+s.menu);if(o.length){var r=o.data("mmenu");if(r&&r.close)return r.close(),n.__transitionend(o,function(){n.open()},n.conf.transitionDuration),!0}return this.open(),!0}if(a.$page)return(i=a.$page.first().attr("id"))&&e.is('[href="#'+i+'"]')?(this.close(),!0):void 0}}},r[t].defaults[p]={blockUI:!0,moveBackground:!0},r[t].configuration[p]={menu:{insertMethod:"prependTo",insertSelector:"body"},page:{nodetype:"div",selector:null,noSelector:[],wrapIfNeeded:!0}},r[t].prototype.open=function(){if(this.trigger("open:before"),!this.vars.opened){var e=this;this._openSetup(),setTimeout(function(){e._openFinish()},this.conf.openingInterval),this.trigger("open:after")}},r[t].prototype._openSetup=function(){var e=this,t=this.opts[p];this.closeAllOthers(),a.$page.each(function(){r(this).data(i.style,r(this).attr("style")||"")}),a.$wndw.trigger(o.resize+"-"+p,[!0]);var n=[s.wrapper+"_opened"];t.blockUI&&n.push(s.wrapper+"_blocking"),"modal"==t.blockUI&&n.push(s.wrapper+"_modal"),t.moveBackground&&n.push(s.wrapper+"_background"),a.$html.addClass(n.join(" ")),setTimeout(function(){e.vars.opened=!0},this.conf.openingInterval),this.$menu.addClass(s.menu+"_opened")},r[t].prototype._openFinish=function(){var e=this;this.__transitionend(a.$page.first(),function(){e.trigger("open:finish")},this.conf.transitionDuration),this.trigger("open:start"),a.$html.addClass(s.wrapper+"_opening")},r[t].prototype.close=function(){if(this.trigger("close:before"),this.vars.opened){var t=this;this.__transitionend(a.$page.first(),function(){t.$menu.removeClass(s.menu+"_opened");var e=[s.wrapper+"_opened",s.wrapper+"_blocking",s.wrapper+"_modal",s.wrapper+"_background"];a.$html.removeClass(e.join(" ")),a.$page.each(function(){var e=r(this).data(i.style);r(this).attr("style",e)}),t.vars.opened=!1,t.trigger("close:finish")},this.conf.transitionDuration),this.trigger("close:start"),a.$html.removeClass(s.wrapper+"_opening"),this.trigger("close:after")}},r[t].prototype.closeAllOthers=function(){a.$body.find("."+s.menu+"_offcanvas").not(this.$menu).each(function(){var e=r(this).data(t);e&&e.close&&e.close()})},r[t].prototype.setPage=function(e){this.trigger("setPage:before",e);var t=this,n=this.conf[p];e&&e.length||(e=a.$body.find(n.page.selector).not("."+s.menu).not("."+s.wrapper+"__blocker"),n.page.noSelector.length&&(e=e.not(n.page.noSelector.join(", "))),1<e.length&&n.page.wrapIfNeeded&&(e=e.wrapAll("<"+this.conf[p].page.nodetype+" />").parent())),e.addClass(s.page+" "+s.slideout).each(function(){r(this).attr("id",r(this).attr("id")||t.__getUniqueId())}),a.$page=e,this.trigger("setPage:after",e)},r[t].prototype["_initWindow_"+p]=function(){a.$wndw.off(o.keydown+"-"+p).on(o.keydown+"-"+p,function(e){if(a.$html.hasClass(s.wrapper+"_opened")&&9==e.keyCode)return e.preventDefault(),!1});var i=0;a.$wndw.off(o.resize+"-"+p).on(o.resize+"-"+p,function(e,t){if(1==a.$page.length&&(t||a.$html.hasClass(s.wrapper+"_opened"))){var n=a.$wndw.height();(t||n!=i)&&(i=n,a.$page.css("minHeight",n))}})},r[t].prototype._initBlocker=function(){var t=this,e=this.opts[p],n=this.conf[p];this.trigger("initBlocker:before"),e.blockUI&&(a.$blck||(a.$blck=r('<div class="'+s.wrapper+"__blocker "+s.slideout+'" />').append("<a />")),a.$blck.appendTo(n.menu.insertSelector).off(o.touchstart+"-"+p+" "+o.touchmove+"-"+p).on(o.touchstart+"-"+p+" "+o.touchmove+"-"+p,function(e){e.preventDefault(),e.stopPropagation(),a.$blck.trigger(o.mousedown+"-"+p)}).off(o.mousedown+"-"+p).on(o.mousedown+"-"+p,function(e){e.preventDefault(),a.$html.hasClass(s.wrapper+"_modal")||(t.closeAllOthers(),t.close())}),this.trigger("initBlocker:after"))}}(jQuery);
!function(n){var s,o,i="mmenu",e="screenReader";n[i].addons[e]={setup:function(){var r=this,t=this.opts[e],a=this.conf[e];n[i].glbl,"boolean"==typeof t&&(t={aria:t,text:t}),"object"!=typeof t&&(t={}),(t=this.opts[e]=n.extend(!0,{},n[i].defaults[e],t)).aria&&(this.bind("initAddons:after",function(){this.bind("initMenu:after",function(){this.trigger("initMenu:after:sr-aria")}),this.bind("initNavbar:after",function(){this.trigger("initNavbar:after:sr-aria",arguments[0])}),this.bind("openPanel:start",function(){this.trigger("openPanel:start:sr-aria",arguments[0])}),this.bind("close:start",function(){this.trigger("close:start:sr-aria")}),this.bind("close:finish",function(){this.trigger("close:finish:sr-aria")}),this.bind("open:start",function(){this.trigger("open:start:sr-aria")}),this.bind("initOpened:after",function(){this.trigger("initOpened:after:sr-aria")})}),this.bind("updateListview",function(){this.$pnls.find("."+s.listview).children().each(function(){r.__sr_aria(n(this),"hidden",n(this).is("."+s.hidden))})}),this.bind("openPanel:start",function(t){var i=this.$menu.find("."+s.panel).not(t).not(t.parents("."+s.panel)),n=t.add(t.find("."+s.listitem+"_vertical ."+s.listitem+"_opened").children("."+s.panel));this.__sr_aria(i,"hidden",!0),this.__sr_aria(n,"hidden",!1)}),this.bind("closePanel",function(t){this.__sr_aria(t,"hidden",!0)}),this.bind("initPanels:after",function(t){var i=t.find("."+s.btn).each(function(){r.__sr_aria(n(this),"owns",n(this).attr("href").replace("#",""))});this.__sr_aria(i,"haspopup",!0)}),this.bind("initNavbar:after",function(t){var i=t.children("."+s.navbar);this.__sr_aria(i,"hidden",!t.hasClass(s.panel+"_has-navbar"))}),t.text&&"parent"==this.opts.navbar.titleLink&&this.bind("initNavbar:after",function(t){var i=t.children("."+s.navbar),n=!!i.children("."+s.btn+"_prev").length;this.__sr_aria(i.children("."+s.title),"hidden",n)})),t.text&&(this.bind("initAddons:after",function(){this.bind("setPage:after",function(){this.trigger("setPage:after:sr-text",arguments[0])}),this.bind("initBlocker:after",function(){this.trigger("initBlocker:after:sr-text")})}),this.bind("initNavbar:after",function(t){var i=t.children("."+s.navbar),n=this.i18n(a.text.closeSubmenu);i.children("."+s.btn+"_prev").html(this.__sr_text(n))}),this.bind("initListview:after",function(t){var i=t.data(o.parent);if(i&&i.length){var n=i.children("."+s.btn+"_next"),e=this.i18n(a.text[n.parent().is("."+s.listitem+"_vertical")?"toggleSubmenu":"openSubmenu"]);n.append(r.__sr_text(e))}}))},add:function(){s=n[i]._c,o=n[i]._d,n[i]._e,s.add("sronly")},clickAnchor:function(t,i){}},n[i].defaults[e]={aria:!0,text:!0},n[i].configuration[e]={text:{closeMenu:"Close menu",closeSubmenu:"Close submenu",openSubmenu:"Open submenu",toggleSubmenu:"Toggle submenu"}},n[i].prototype.__sr_aria=function(t,i,n){t.prop("aria-"+i,n)[n?"attr":"removeAttr"]("aria-"+i,n)},n[i].prototype.__sr_role=function(t,i){t.prop("role",i)[i?"attr":"removeAttr"]("role",i)},n[i].prototype.__sr_text=function(t){return'<span class="'+s.sronly+'">'+t+"</span>"}}(jQuery);
!function(n){var e,r,s,t="mmenu",i="scrollBugFix";n[t].addons[i]={setup:function(){var o=this.opts[i];this.conf[i];s=n[t].glbl,n[t].support.touch&&this.opts.offCanvas&&this.opts.offCanvas.blockUI&&("boolean"==typeof o&&(o={fix:o}),"object"!=typeof o&&(o={}),(o=this.opts[i]=n.extend(!0,{},n[t].defaults[i],o)).fix&&(this.bind("open:start",function(){this.$pnls.children("."+e.panel+"_opened").scrollTop(0)}),this.bind("initMenu:after",function(){this["_initWindow_"+i]()})))},add:function(){e=n[t]._c,n[t]._d,r=n[t]._e},clickAnchor:function(o,t){}},n[t].defaults[i]={fix:!0},n[t].prototype["_initWindow_"+i]=function(){var o=this;n(document).off(r.touchmove+"-"+i).on(r.touchmove+"-"+i,function(o){s.$html.hasClass(e.wrapper+"_opened")&&o.preventDefault()});var t=!1;s.$body.off(r.touchstart+"-"+i).on(r.touchstart+"-"+i,"."+e.panels+"> ."+e.panel,function(o){s.$html.hasClass(e.wrapper+"_opened")&&(t||(t=!0,0===o.currentTarget.scrollTop?o.currentTarget.scrollTop=1:o.currentTarget.scrollHeight===o.currentTarget.scrollTop+o.currentTarget.offsetHeight&&(o.currentTarget.scrollTop-=1),t=!1))}).off(r.touchmove+"-"+i).on(r.touchmove+"-"+i,"."+e.panels+"> ."+e.panel,function(o){s.$html.hasClass(e.wrapper+"_opened")&&n(this)[0].scrollHeight>n(this).innerHeight()&&o.stopPropagation()}),s.$wndw.off(r.orientationchange+"-"+i).on(r.orientationchange+"-"+i,function(){o.$pnls.children("."+e.panel+"_opened").scrollTop(0).css({"-webkit-overflow-scrolling":"auto"}).css({"-webkit-overflow-scrolling":"touch"})})}}(jQuery);
!function(s){var a,e="mmenu",i="autoHeight";s[e].addons[i]={setup:function(){var h=this.opts[i];this.conf[i];if(s[e].glbl,"boolean"==typeof h&&h&&(h={height:"auto"}),"string"==typeof h&&(h={height:h}),"object"!=typeof h&&(h={}),"auto"==(h=this.opts[i]=s.extend(!0,{},s[e].defaults[i],h)).height||"highest"==h.height){this.bind("initMenu:after",function(){this.$menu.addClass(a.menu+"_autoheight")});var t=function(t){if(!this.opts.offCanvas||this.vars.opened){var e=Math.max(parseInt(this.$pnls.css("top"),10),0)||0,i=Math.max(parseInt(this.$pnls.css("bottom"),10),0)||0,n=0;this.$menu.addClass(a.menu+"_autoheight-measuring"),"auto"==h.height?((t=t||this.$pnls.children("."+a.panel+"_opened")).parent("."+a.listitem+"_vertical").length&&(t=t.parents("."+a.panel).not(function(){return s(this).parent("."+a.listitem+"_vertical").length})),t.length||(t=this.$pnls.children("."+a.panel)),n=t.first().outerHeight()):"highest"==h.height&&this.$pnls.children("."+a.panel).each(function(){var t=s(this);t.parent("."+a.listitem+"_vertical").length&&(t=t.parents("."+a.panel).not(function(){return s(this).parent("."+a.listitem+"_vertical").length})),n=Math.max(n,t.first().outerHeight())}),this.$menu.height(n+e+i).removeClass(a.menu+"_autoheight-measuring")}};this.opts.offCanvas&&this.bind("open:start",t),"highest"==h.height&&this.bind("initPanels:after",t),"auto"==h.height&&(this.bind("updateListview",t),this.bind("openPanel:start",t),this.bind("closePanel",t))}},add:function(){a=s[e]._c,s[e]._d,s[e]._e.add("resize")},clickAnchor:function(t,e){}},s[e].defaults[i]={height:"default"}}(jQuery);
!function(s){var a,h="mmenu",c="backButton";s[h].addons[c]={setup:function(){if(this.opts.offCanvas){var o=this,n=this.opts[c];this.conf[c];s[h].glbl,"boolean"==typeof n&&(n={close:n}),"object"!=typeof n&&(n={}),n=s.extend(!0,{},s[h].defaults[c],n);var e="#"+this.$menu.attr("id");if(n.close){var i=[];function t(){i=[e],this.$pnls.children("."+a.panel+"_opened-parent").add(o.$pnls.children("."+a.panel+"_opened")).each(function(){i.push("#"+s(this).attr("id"))})}this.bind("open:finish",function(){history.pushState(null,document.title,e)}),this.bind("open:finish",t),this.bind("openPanel:finish",t),this.bind("close:finish",function(){i=[],history.back(),history.pushState(null,document.title,location.pathname+location.search)}),s(window).on("popstate",function(n){if(o.vars.opened&&i.length){var t=(i=i.slice(0,-1))[i.length-1];t==e?o.close():(o.openPanel(s(t)),history.pushState(null,document.title,e))}})}n.open&&s(window).on("popstate",function(n){o.vars.opened||location.hash!=e||o.open()})}},add:function(){window.history&&window.history.pushState?(a=s[h]._c,s[h]._d,s[h]._e):s[h].addons[c].setup=function(){}},clickAnchor:function(n,t){}},s[h].defaults[c]={close:!1,open:!1}}(jQuery);
!function(t){var o,d,n="mmenu",p="columns";t[n].addons[p]={setup:function(){var i=this.opts[p];this.conf[p];if(t[n].glbl,"boolean"==typeof i&&(i={add:i}),"number"==typeof i&&(i={add:!0,visible:i}),"object"!=typeof i&&(i={}),"number"==typeof i.visible&&(i.visible={min:i.visible,max:i.visible}),(i=this.opts[p]=t.extend(!0,{},t[n].defaults[p],i)).add){i.visible.min=Math.max(1,Math.min(6,i.visible.min)),i.visible.max=Math.max(i.visible.min,Math.min(6,i.visible.max));for(var a="",s="",e=0;e<=i.visible.max;e++)a+=" "+o.menu+"_columns-"+e,s+=" "+o.panel+"_columns-"+e;a.length&&(a=a.slice(1),s=s.slice(1));var l=s+" "+o.panel+"_opened "+o.panel+"_opened-parent "+o.panel+"_highest";this.bind("openPanel:before",function(e){var n=e.data(d.parent);if(n&&(n=n.closest("."+o.panel)).length){var i=n.attr("class");if(i&&(i=i.split(o.panel+"_columns-")[1]))for(i=parseInt(i.split(" ")[0],10)+1;0<i;){var a=this.$pnls.children("."+o.panel+"_columns-"+i);if(!a.length){i=-1;break}i++,a.removeClass(l).addClass(o.hidden)}}}),this.bind("openPanel:start",function(e){var n=this.$pnls.children("."+o.panel+"_opened-parent").length;e.hasClass(o.panel+"_opened-parent")||n++,n=Math.min(i.visible.max,Math.max(i.visible.min,n)),this.$menu.removeClass(a).addClass(o.menu+"_columns-"+n),this.$pnls.children("."+o.panel).removeClass(s).filter("."+o.panel+"_opened-parent").add(e).slice(-i.visible.max).each(function(e){t(this).addClass(o.panel+"_columns-"+e)})})}},add:function(){o=t[n]._c,d=t[n]._d,t[n]._e},clickAnchor:function(e,n){}},t[n].defaults[p]={add:!1,visible:{min:1,max:3}}}(jQuery);
!function(a){var s,d,n="mmenu",c="counters";a[n].addons[c]={setup:function(){var i=this,e=this.opts[c];this.conf[c];if(a[n].glbl,"boolean"==typeof e&&(e={add:e,update:e}),"object"!=typeof e&&(e={}),e=this.opts[c]=a.extend(!0,{},a[n].defaults[c],e),this.bind("initListview:after",function(t){var n=this.conf.classNames[c].counter;this.__refactorClass(t.find("."+n),n,s.counter)}),e.add&&this.bind("initListview:after",function(t){var n;switch(e.addTo){case"panels":n=t;break;default:n=t.filter(e.addTo)}n.each(function(){var t=a(this).data(d.parent);t&&(t.find("."+s.counter).length||t.children("."+s.btn).prepend(a('<span class="'+s.counter+'" />')))})}),e.update){var t=function(t){(t=t||this.$pnls.children("."+s.panel)).each(function(){var t=a(this),n=t.data(d.parent);if(n){var e=n.find("."+s.counter);e.length&&(t=t.children("."+s.listview)).length&&e.html(i.__filterListItems(t.children()).length)}})};this.bind("initListview:after",t),this.bind("updateListview",t)}},add:function(){s=a[n]._c,d=a[n]._d,a[n]._e,s.add("counter")},clickAnchor:function(t,n){}},a[n].defaults[c]={add:!1,addTo:"panels",count:!1},a[n].configuration.classNames[c]={counter:"Counter"}}(jQuery);
!function(d){var l,i,t="mmenu",a="dividers";d[t].addons[a]={setup:function(){var e=this,n=this.opts[a];this.conf[a];if(d[t].glbl,"boolean"==typeof n&&(n={add:n,fixed:n}),"object"!=typeof n&&(n={}),(n=this.opts[a]=d.extend(!0,{},d[t].defaults[a],n)).type&&this.bind("initMenu:after",function(){this.$menu.addClass(l.menu+"_"+a+"-"+n.type)}),n.add&&this.bind("initListview:after",function(i){var t;switch(n.addTo){case"panels":t=i;break;default:t=i.filter(n.addTo)}t.length&&(t.children("."+l.listitem+"_divider").remove(),t.find("."+l.listview).each(function(){var t="";e.__filterListItems(d(this).children()).each(function(){var i=d.trim(d(this).children("a, span").text()).slice(0,1).toLowerCase();i!=t&&i.length&&(t=i,d('<li class="'+l.listitem+" "+l.listitem+'_divider">'+i+"</li>").insertBefore(this))})}))}),n.fixed){this.bind("initPanels:after",function(){void 0===this.$fixeddivider&&(this.$fixeddivider=d('<ul class="'+l.listview+" "+l.listview+'_fixeddivider"><li class="'+l.listitem+" "+l.listitem+'_divider"></li></ul>').appendTo(this.$pnls).children())});var s=function(i){if(!(i=i||this.$pnls.children("."+l.panel+"_opened")).is(":hidden")){var t=i.find("."+l.listitem+"_divider").not("."+l.hidden),e=i.scrollTop()||0,n="";t.each(function(){d(this).position().top+e<e+1&&(n=d(this).text())}),this.$fixeddivider.text(n),this.$pnls[n.length?"addClass":"removeClass"](l.panel+"_dividers")}};this.bind("open:start",s),this.bind("openPanel:start",s),this.bind("updateListview",s),this.bind("initPanel:after",function(t){t.off(i.scroll+"-"+a+" "+i.touchmove+"-"+a).on(i.scroll+"-"+a+" "+i.touchmove+"-"+a,function(i){t.hasClass(l.panel+"_opened")&&s.call(e,t)})})}},add:function(){l=d[t]._c,d[t]._d,(i=d[t]._e).add("scroll")},clickAnchor:function(i,t){}},d[t].defaults[a]={add:!1,addTo:"panels",fixed:!1,type:null}}(jQuery);
!function(y){var x,p,o,n="mmenu",O="drag";function $(n,e,t){return n<e&&(n=e),t<n&&(n=t),n}y[n].addons[O]={setup:function(){if(this.opts.offCanvas){var e=this.opts[O],t=this.conf[O];o=y[n].glbl,"boolean"==typeof e&&(e={menu:e,panels:e}),"object"!=typeof e&&(e={}),"boolean"==typeof e.menu&&(e.menu={open:e.menu}),"object"!=typeof e.menu&&(e.menu={}),"boolean"==typeof e.panels&&(e.panels={close:e.panels}),"object"!=typeof e.panels&&(e.panels={}),(e=this.opts[O]=y.extend(!0,{},y[n].defaults[O],e)).menu.open&&this.bind("setPage:after",function(){(function(e,t,o){var i,a,s,r,p=this,c={events:"panleft panright",typeLower:"x",typeUpper:"X",open_dir:"right",close_dir:"left",negative:!1},d="width",u=c.open_dir,f=function(n){n<=e.maxStartPos&&(m=1)},l=function(){return y("."+x.slideout)},m=0,h=0,g=0,n=this.opts.extensions.all,_=void 0===n?"left":-1<n.indexOf(x.menu+"_position-right")?"right":-1<n.indexOf(x.menu+"_position-top")?"top":-1<n.indexOf(x.menu+"_position-bottom")?"bottom":"left",v=void 0===n?"back":-1<n.indexOf(x.menu+"_position-top")||-1<n.indexOf(x.menu+"_position-bottom")||-1<n.indexOf(x.menu+"_position-front")?"front":"back";switch(_){case"top":case"bottom":c.events="panup pandown",c.typeLower="y",c.typeUpper="Y",d="height"}switch(_){case"right":case"bottom":c.negative=!0,f=function(n){n>=o.$wndw[d]()-e.maxStartPos&&(m=1)}}switch(_){case"right":c.open_dir="left",c.close_dir="right";break;case"top":c.open_dir="down",c.close_dir="up";break;case"bottom":c.open_dir="up",c.close_dir="down"}switch(v){case"front":l=function(){return p.$menu}}var b=this.__valueOrFn(this.$menu,e.node,o.$page);"string"==typeof b&&(b=y(b));var w=new Hammer(b[0],this.opts[O].vendors.hammer);w.on("panstart",function(n){f(n.center[c.typeLower]),r=l(),u=c.open_dir}),w.on(c.events+" panend",function(n){0<m&&n.preventDefault()}),w.on(c.events,function(n){if(i=n["delta"+c.typeUpper],c.negative&&(i=-i),i!=h&&(u=h<=i?c.open_dir:c.close_dir),(h=i)>e.threshold&&1==m){if(o.$html.hasClass(x.wrapper+"_opened"))return;m=2,p._openSetup(),p.trigger("open:start"),o.$html.addClass(x.dragging),g=$(o.$wndw[d]()*t[d].perc,t[d].min,t[d].max)}2==m&&(a=$(h,10,g)-("front"==v?g:0),c.negative&&(a=-a),s="translate"+c.typeUpper+"("+a+"px )",r.css({"-webkit-transform":"-webkit-"+s,transform:s}))}),w.on("panend",function(n){2==m&&(o.$html.removeClass(x.dragging),r.css("transform",""),p[u==c.open_dir?"_openFinish":"close"]()),m=0})}).call(this,e.menu,t.menu,o)}),e.panels.close&&this.bind("initPanel:after",function(n){(function(n,e,t,o){var i=this,a=n.data(p.parent);if(a){a=a.closest("."+x.panel);var s=new Hammer(n[0],i.opts[O].vendors.hammer),r=null;s.on("panright",function(n){r||(i.openPanel(a),r=setTimeout(function(){clearTimeout(r),r=null},i.conf.openingInterval+i.conf.transitionDuration))})}}).call(this,n,e.panels,t.panels,o)})}},add:function(){if("function"!=typeof Hammer||Hammer.VERSION<2)return y[n].addons[O].add=function(){},void(y[n].addons[O].setup=function(){});x=y[n]._c,p=y[n]._d,y[n]._e,x.add("dragging")},clickAnchor:function(n,e){}},y[n].defaults[O]={menu:{open:!1,maxStartPos:100,threshold:50},panels:{close:!1},vendors:{hammer:{}}},y[n].configuration[O]={menu:{width:{perc:.8,min:140,max:440},height:{perc:.8,min:140,max:880}},panels:{}}}(jQuery);
!function(n){var $,s,a,y,t="mmenu",f="dropdown";n[t].addons[f]={setup:function(){if(this.opts.offCanvas){var o=this,x=this.opts[f],b=this.conf[f];if(y=n[t].glbl,"boolean"==typeof x&&x&&(x={drop:x}),"object"!=typeof x&&(x={}),"string"==typeof x.position&&(x.position={of:x.position}),(x=this.opts[f]=n.extend(!0,{},n[t].defaults[f],x)).drop){var g;this.bind("initMenu:after",function(){if(this.$menu.addClass($.menu+"_"+f),"string"!=typeof x.position.of){var t=this._getOriginalMenuId();t&&t.length&&(x.position.of='[href="#'+t+'"]')}"string"==typeof x.position.of&&(g=n(x.position.of),x.event=x.event.split(" "),1==x.event.length&&(x.event[1]=x.event[0]),"hover"==x.event[0]&&g.on(a.mouseenter+"-"+f,function(){o.open()}),"hover"==x.event[1]&&this.$menu.on(a.mouseleave+"-"+f,function(){o.close()}))}),this.bind("open:start",function(){this.$menu.data(s.style,this.$menu.attr("style")||""),y.$html.addClass($.wrapper+"_dropdown")}),this.bind("close:finish",function(){this.$menu.attr("style",this.$menu.data(s.style)),y.$html.removeClass($.wrapper+"_dropdown")});var e=function(t,o){var e,i,n=o[0],s=o[1],a="x"==t?"scrollLeft":"scrollTop",f="x"==t?"outerWidth":"outerHeight",r="x"==t?"left":"top",p="x"==t?"right":"bottom",l="x"==t?"width":"height",h="x"==t?"maxWidth":"maxHeight",u=null,d=y.$wndw[a](),c=g.offset()[r]-=d,m=c+g[f](),v=y.$wndw[l](),w=b.offset.button[t]+b.offset.viewport[t];if(x.position[t])switch(x.position[t]){case"left":case"bottom":u="after";break;case"right":case"top":u="before"}return null===u&&(u=c+(m-c)/2<v/2?"after":"before"),"after"==u?(i=v-((e="x"==t?c:m)+w),n[r]=e+b.offset.button[t],n[p]="auto",x.tip&&s.push($.menu+"_tip-"+("x"==t?"left":"top"))):(i=(e="x"==t?m:c)-w,n[p]="calc( 100% - "+(e-b.offset.button[t])+"px )",n[r]="auto",x.tip&&s.push($.menu+"_tip-"+("x"==t?"right":"bottom"))),x.fitViewport&&(n[h]=Math.min(b[l].max,i)),[n,s]},i=function(t){if(this.vars.opened){this.$menu.attr("style",this.$menu.data(s.style));var o=[{},[]];o=e.call(this,"y",o),o=e.call(this,"x",o),this.$menu.css(o[0]),x.tip&&this.$menu.removeClass($.tipleft+" "+$.tipright+" "+$.tiptop+" "+$.tipbottom).addClass(o[1].join(" "))}};this.bind("open:start",i),y.$wndw.on(a.resize+"-"+f,function(t){i.call(o)}),this.opts.offCanvas.blockUI||y.$wndw.on(a.scroll+"-"+f,function(t){i.call(o)})}}},add:function(){$=n[t]._c,s=n[t]._d,a=n[t]._e,$.add("dropdown"),a.add("mouseenter mouseleave resize scroll")},clickAnchor:function(t,o){}},n[t].defaults[f]={drop:!1,fitViewport:!0,event:"click",position:{},tip:!0},n[t].configuration[f]={offset:{button:{x:-5,y:5},viewport:{x:20,y:20}},height:{max:880},width:{max:440}}}(jQuery);
!function(c){var f,a,s="mmenu",d="fixedElements";c[s].addons[d]={setup:function(){if(this.opts.offCanvas){this.opts[d];var o=this.conf[d];a=c[s].glbl;this.bind("setPage:after",function(s){var t=this.conf.classNames[d].fixed,i=s.find("."+t);this.__refactorClass(i,t,f.slideout),i[o.elemInsertMethod](o.elemInsertSelector);var e=this.conf.classNames[d].sticky,n=s.find("."+e);this.__refactorClass(n,e,f.sticky),(n=s.find("."+f.sticky)).length&&(this.bind("open:start",function(){if("hidden"==a.$html.css("overflow")){var s=a.$wndw.scrollTop()+o.sticky.offset;n.each(function(){c(this).css("top",parseInt(c(this).css("top"),10)+s)})}}),this.bind("close:finish",function(){n.css("top","")}))})}},add:function(){f=c[s]._c,c[s]._d,c[s]._e,f.add("sticky")},clickAnchor:function(s,t){}},c[s].configuration[d]={sticky:{offset:0},elemInsertMethod:"appendTo",elemInsertSelector:"body"},c[s].configuration.classNames[d]={fixed:"Fixed",sticky:"Sticky"}}(jQuery);
!function(c){var d,s,a,n="mmenu",t="iconbar";c[n].addons[t]={setup:function(){var e=this,o=this.opts[t];this.conf[t];if(c[n].glbl,o instanceof Array&&(o={add:!0,top:o}),o.add){var r=null;if(c.each(["top","bottom"],function(a,n){var t=o[n];t instanceof Array||(t=[t]);for(var e=c('<div class="'+d.iconbar+"__"+n+'" />'),i=0,s=t.length;i<s;i++)e.append(t[i]);e.children().length&&(r||(r=c('<div class="'+d.iconbar+'" />')),r.append(e))}),r&&(this.bind("initMenu:after",function(){var a=d.menu+"_iconbar";o.size&&(a+=" "+d.menu+"_iconbar-"+o.size),this.$menu.addClass(a).prepend(r)}),"tabs"==o.type)){r.addClass(d.iconbar+"_tabs");var i=r.find("a");i.on(a.click+"-"+t,function(a){var n=c(this);if(n.hasClass(d.iconbar+"__tab_selected"))a.stopImmediatePropagation();else try{var t=c(n.attr("href"));t.hasClass(d.panel)&&(a.preventDefault(),a.stopImmediatePropagation(),e.openPanel(t,!1))}catch(a){}}),this.bind("openPanel:start",function a(n){i.removeClass(d.iconbar+"__tab_selected");var t=i.filter('[href="#'+n.attr("id")+'"]');if(t.length)t.addClass(d.iconbar+"__tab_selected");else{var e=n.data(s.parent);e&&e.length&&a(e.closest("."+d.panel))}})}}},add:function(){d=c[n]._c,s=c[n]._d,a=c[n]._e,d.add(t)},clickAnchor:function(a,n){}},c[n].defaults[t]={add:!1,top:[],bottom:[]},c[n].configuration[t]={}}(jQuery);
!function(s){var d,r="mmenu",o="iconPanels";s[r].addons[o]={setup:function(){var n=this,a=this.opts[o],t=(this.conf[o],!1);s[r].glbl,"boolean"==typeof a&&(a={add:a}),"number"!=typeof a&&"string"!=typeof a||(a={add:!0,visible:a}),"object"!=typeof a&&(a={}),"first"==a.visible&&(t=!0,a.visible=1),(a=this.opts[o]=s.extend(!0,{},s[r].defaults[o],a)).visible=Math.min(3,Math.max(1,a.visible)),a.visible++;var l="";if(!t){for(var e=0;e<=a.visible;e++)l+=" "+d.panel+"_iconpanel-"+e;l.length&&(l=l.slice(1))}if(a.add){var i=function(e){if(!e.parent("."+d.listitem+"_vertical").length){var i=n.$pnls.children("."+d.panel);t?i.removeClass(d.panel+"_iconpanel-first").first().addClass(d.panel+"_iconpanel-first"):i.removeClass(l).filter("."+d.panel+"_opened-parent").removeClass(d.hidden).not(function(){return s(this).parent("."+d.listitem+"_vertical").length}).add(e).slice(-a.visible).each(function(e){s(this).addClass(d.panel+"_iconpanel-"+e)})}};this.bind("initMenu:after",function(){var e=[d.menu+"_iconpanel"];a.size&&e.push(d.menu+"_iconpanel-"+a.size),a.hideNavbar&&e.push(d.menu+"_hidenavbar"),a.hideDivider&&e.push(d.menu+"_hidedivider"),this.$menu.addClass(e.join(" "))}),this.bind("openPanel:start",i),this.bind("initPanels:after",function(e){i.call(n,n.$pnls.children("."+d.panel+"_opened"))}),this.bind("initListview:after",function(e){!a.blockPanel||e.parent("."+d.listitem+"_vertical").length||e.children("."+d.panel+"__blocker").length||e.prepend('<a href="#'+e.closest("."+d.panel).attr("id")+'" class="'+d.panel+'__blocker" />')})}},add:function(){d=s[r]._c,s[r]._d,s[r]._e},clickAnchor:function(e,i){}},s[r].defaults[o]={add:!1,blockPanel:!0,hideDivider:!1,hideNavbar:!0,visible:3}}(jQuery);
!function(s){var o,d,a,i,r="mmenu",c="keyboardNavigation";s[r].addons[c]={setup:function(){if(!s[r].support.touch){var e=this.opts[c];this.conf[c];if(i=s[r].glbl,"boolean"!=typeof e&&"string"!=typeof e||(e={enable:e}),"object"!=typeof e&&(e={}),(e=this.opts[c]=s.extend(!0,{},s[r].defaults[c],e)).enable){var n=s('<button class="'+o.tabstart+'" />'),t=s('<button class="'+o.tabend+'" />'),a=s('<button class="'+o.tabend+'" />');this.bind("initMenu:after",function(){e.enhance&&this.$menu.addClass(o.menu+"_keyboardfocus"),this["_initWindow_"+c](e.enhance)}),this.bind("initOpened:before",function(){this.$menu.prepend(n).append(t).children("."+o.mm("navbars-top")+", ."+o.mm("navbars-bottom")).children("."+o.navbar).children("a."+o.title).attr("tabindex",-1)}),this.bind("initBlocker:after",function(){i.$blck.append(a).children("a").addClass(o.tabstart)}),this.bind("open:finish",function(){f.call(this,null,e.enable)}),this.bind("openPanel:finish",function(n){f.call(this,n,e.enable)}),this.bind("initOpened:after:sr-aria",function(){var n=this.$menu.add(i.$blck).children("."+o.tabstart+", ."+o.tabend);this.__sr_aria(n,"hidden",!0),this.__sr_role(n,"presentation")})}}},add:function(){o=s[r]._c,d=s[r]._d,a=s[r]._e,o.add("tabstart tabend"),a.add("focusin keydown")},clickAnchor:function(n,e){}},s[r].defaults[c]={enable:!1,enhance:!1},s[r].configuration[c]={},s[r].prototype["_initWindow_"+c]=function(n){i.$wndw.off(a.keydown+"-offCanvas"),i.$wndw.off(a.focusin+"-"+c).on(a.focusin+"-"+c,function(n){if(i.$html.hasClass(o.wrapper+"_opened")){var e=s(n.target);if(e.is("."+o.tabend)){var t=s();e.parent().is("."+o.menu)&&i.$blck&&(t=i.$blck),e.parent().is("."+o.wrapper+"__blocker")&&(t=i.$body.find("."+o.menu+"_offcanvas").filter("."+o.menu+"_opened")),t.length||(t=e.parent()),t.children("."+o.tabstart).focus()}}}),i.$wndw.off(a.keydown+"-"+c).on(a.keydown+"-"+c,function(n){var e=s(n.target),t=e.closest("."+o.menu);if(t.length){t.data("mmenu");if(e.is("input, textarea"));else switch(n.keyCode){case 13:(e.is(".mm-toggle")||e.is(".mm-check"))&&e.trigger(a.click);break;case 32:case 37:case 38:case 39:case 40:n.preventDefault()}}}),n&&i.$wndw.off(a.keydown+"-"+c).on(a.keydown+"-"+c,function(n){var e=s(n.target),t=e.closest("."+o.menu);if(t.length){var a=t.data("mmenu");if(e.is("input"))switch(n.keyCode){case 27:e.val("")}else switch(n.keyCode){case 8:var i=t.find("."+o.panel+"_opened").data(d.parent);i&&i.length&&a.openPanel(i.closest("."+o.panel));break;case 27:t.hasClass(o.menu+"_offcanvas")&&a.close()}}})};var l="input, select, textarea, button, label, a[href]";function f(n,e){n=n||this.$pnls.children("."+o.panel+"_opened");var t=s(),a=this.$menu.children("."+o.mm("navbars_top")+", ."+o.mm("navbars_bottom")).children("."+o.navbar);a.find(l).filter(":focus").length||("default"==e&&((t=n.children("."+o.listview).find("a[href]").not("."+o.hidden)).length||(t=n.find(l).not("."+o.hidden)),t.length||(t=a.find(l).not("."+o.hidden))),t.length||(t=this.$menu.children("."+o.tabstart)),t.first().focus())}}(jQuery);
!function(e){var i,l="mmenu",t="lazySubmenus";e[l].addons[t]={setup:function(){var n=this.opts[t];this.conf[t];e[l].glbl,"boolean"==typeof n&&(n={load:n}),"object"!=typeof n&&(n={}),(n=this.opts[t]=e.extend(!0,{},e[l].defaults[t],n)).load&&(this.bind("initMenu:after",function(){this.$pnls.find("li").children(this.conf.panelNodetype).not("."+i.inset).not("."+i.nolistview).not("."+i.nopanel).addClass(i.panel+"_lazysubmenu "+i.nolistview+" "+i.nopanel)}),this.bind("initPanels:before",function(n){n=n||this.$pnls.children(this.conf.panelNodetype),this.__findAddBack(n,"."+i.panel+"_lazysubmenu").not("."+i.panel+"_lazysubmenu ."+i.panel+"_lazysubmenu").removeClass(i.panel+"_lazysubmenu "+i.nolistview+" "+i.nopanel)}),this.bind("initOpened:before",function(){var n=this.$pnls.find("."+this.conf.classNames.selected).parents("."+i.panel+"_lazysubmenu");n.length&&(n.removeClass(i.panel+"_lazysubmenu "+i.nolistview+" "+i.nopanel),this.initPanels(n.last()))}),this.bind("openPanel:before",function(n){var e=this.__findAddBack(n,"."+i.panel+"_lazysubmenu").not("."+i.panel+"_lazysubmenu ."+i.panel+"_lazysubmenu");e.length&&this.initPanels(e)}))},add:function(){i=e[l]._c,e[l]._d,e[l]._e},clickAnchor:function(n,e){}},e[l].defaults[t]={load:!1},e[l].configuration[t]={}}(jQuery);
!function(b){var p,h="mmenu",m="navbars";b[h].addons[m]={setup:function(){var d=this,l=this.opts[m],v=this.conf[m];if(b[h].glbl,void 0!==l){l instanceof Array||(l=[l]);var f={},u={};l.length&&(b.each(l,function(n){var t=l[n];"boolean"==typeof t&&t&&(t={}),"object"!=typeof t&&(t={}),void 0===t.content&&(t.content=["prev","title"]),t.content instanceof Array||(t.content=[t.content]),t=b.extend(!0,{},d.opts.navbar,t);var a=b('<div class="'+p.navbar+'" />'),e=t.height;"number"!=typeof e?e=1:1<(e=Math.min(4,Math.max(1,e)))&&a.addClass(p.navbar+"_size-"+e);var o=t.position;switch(o){case"bottom":break;default:o="top"}f[o]||(f[o]=0),f[o]+=e,u[o]||(u[o]=b('<div class="'+p.navbars+"_"+o+'" />')),u[o].append(a);for(var r=0,s=t.content.length;r<s;r++){var i=b[h].addons[m][t.content[r]]||null;i?i.call(d,a,t,v):((i=t.content[r])instanceof b||(i=b(t.content[r])),a.append(i))}var c=b[h].addons[m][t.type]||null;c&&c.call(d,a,t,v),a.children("."+p.btn).length&&a.addClass(p.navbar+"_has-btns")}),this.bind("initMenu:after",function(){for(var n in f)this.$menu.addClass(p.menu+"_navbar_"+n+"-"+f[n]),this.$menu["bottom"==n?"append":"prepend"](u[n])}))}},add:function(){p=b[h]._c,b[h]._d,b[h]._e,p.add(m)},clickAnchor:function(n,t){}},b[h].configuration[m]={breadcrumbs:{separator:"/",removeFirst:!1}},b[h].configuration.classNames[m]={}}(jQuery);
!function(f){var o,i,a,c="mmenu",d="pageScroll";f[c].addons[d]={setup:function(){var n=this,t=this.opts[d],s=this.conf[d];if(a=f[c].glbl,"boolean"==typeof t&&(t={scroll:t}),(t=this.opts[d]=f.extend(!0,{},f[c].defaults[d],t)).scroll&&this.bind("close:finish",function(){h(s.scrollOffset)}),t.update){var e=[],r=[];(n=this).bind("initListview:after",function(t){n.__filterListItemAnchors(t.find("."+o.listview).children("li")).each(function(){var t=f(this).attr("href");p(t)&&e.push(t)}),r=e.reverse()});var l=-1;a.$wndw.on(i.scroll+"-"+d,function(t){for(var e=a.$wndw.scrollTop(),i=0;i<r.length;i++)if(f(r[i]).offset().top<e+s.updateOffset){l!==i&&(l=i,n.setSelected(n.__filterListItemAnchors(n.$pnls.children("."+o.panel+"_opened").find("."+o.listview).children("li")).filter('[href="'+r[i]+'"]').parent()));break}})}},add:function(){o=f[c]._c,f[c]._d,i=f[c]._e},clickAnchor:function(t,e,i){if(s=!1,e&&i&&this.opts.offCanvas&&this.opts[d].scroll&&a.$page&&a.$page.length){var n=t.attr("href");if(p(n)){if(s=f(n),!this.$menu.is("."+o.menu+"_sidebar-expanded")||!a.$html.is("."+o.wrapper+"_sidebar-expanded"))return{close:!0};h(this.conf[d].scrollOffset)}}}},f[c].defaults[d]={scroll:!1,update:!1};var s=!(f[c].configuration[d]={scrollOffset:0,updateOffset:50});function h(t){s&&s.length&&s.is(":visible")&&a.$html.add(a.$body).animate({scrollTop:s.offset().top+t}),s=!1}function p(t){try{return!("#"==t||"#"!=t.slice(0,1)||!a.$page.find(t).length)}catch(t){return!1}}}(jQuery);
!function(o){var f,u,h,n="mmenu",_="searchfield";function l(e,n){if(n)for(var s in n)e.attr(s,n[s])}o[n].addons[_]={setup:function(){var a=this,t=this.opts[_],e=this.conf[_];o[n].glbl,"boolean"==typeof t&&(t={add:t}),"object"!=typeof t&&(t={}),"boolean"==typeof t.panel&&(t.panel={add:t.panel}),"object"!=typeof t.panel&&(t.panel={}),t.add&&("panel"==t.addTo&&(t.panel.add=!0),t.panel.add&&(t.showSubPanels=!1,t.panel.splash&&(t.cancel=!0)),t=this.opts[_]=o.extend(!0,{},o[n].defaults[_],t),e=this.conf[_]=o.extend(!0,{},o[n].configuration[_],e),this.bind("close:start",function(){this.$menu.find("."+f.searchfield).children("input").blur()}),this.bind("initPanels:after",function(e){var n,s=o();switch(t.panel.add&&(s=this._initSearchPanel(e)),t.addTo){case"panels":n=e;break;case"panel":n=s;break;default:n=this.$menu.find(t.addTo)}(n.each(function(){var e=a._initSearchfield(o(this));t.search&&e.length&&a._initSearching(e)}),t.noResults)&&(t.panel.add?s:e).each(function(){a._initNoResultsMsg(o(this))})}))},add:function(){f=o[n]._c,u=o[n]._d,h=o[n]._e,f.add("searchfield"),u.add("searchfield"),h.add("input focus blur")},clickAnchor:function(e,n){if(e.hasClass(f.searchfield+"__btn")){if(e.hasClass(f.btn+"_close")){var s=e.closest("."+f.searchfield).find("input");return s.val(""),this.search(s),!0}if(e.hasClass(f.btn+"_next"))return e.closest("."+f.searchfield).submit(),!0}}},o[n].defaults[_]={add:!1,addTo:"panels",noResults:"No results found.",placeholder:"Search",panel:{add:!1,dividers:!0,fx:"none",id:null,splash:null,title:"Search"},search:!0,showTextItems:!1,showSubPanels:!0},o[n].configuration[_]={clear:!1,form:!1,input:!1,submit:!1},o[n].prototype._initSearchPanel=function(e){var n=this.opts[_];this.conf[_];if(this.$pnls.children("."+f.panel+"_search").length)return o();var s=o('<div class="'+f.panel+'_search " />').append("<ul />").appendTo(this.$pnls);switch(n.panel.id&&s.attr("id",n.panel.id),n.panel.title&&s.attr("data-mm-title",n.panel.title),n.panel.fx){case!1:break;case"none":s.addClass(f.panel+"_noanimation");break;default:s.addClass(f.panel+"_fx-"+n.panel.fx)}return n.panel.splash&&s.append('<div class="'+f.panel+'__searchsplash">'+n.panel.splash+"</div>"),this._initPanels(s),s},o[n].prototype._initSearchfield=function(e){var n=this.opts[_],s=this.conf[_];if(e.parent("."+f.listitem+"_vertical").length)return o();if(e.find("."+f.searchfield).length)return e.find("."+f.searchfield);var a=o("<"+(s.form?"form":"div")+' class="'+f.searchfield+'" />'),t=o('<div class="'+f.searchfield+'__input" />'),i=o('<input placeholder="'+this.i18n(n.placeholder)+'" type="text" autocomplete="off" />');return t.append(i).appendTo(a),e.prepend(a),e.hasClass(f.panel)&&e.addClass(f.panel+"_has-searchfield"),l(i,s.input),s.clear&&o('<a class="'+f.btn+" "+f.btn+"_close "+f.searchfield+'__btn" href="#" />').appendTo(t),l(a,s.form),s.form&&s.submit&&!s.clear&&o('<a class="'+f.btn+" "+f.btn+"_next "+f.searchfield+'__btn" href="#" />').appendTo(t),n.cancel&&o('<a href="#" class="'+f.searchfield+'__cancel">'+this.i18n("cancel")+"</a>").appendTo(a),a},o[n].prototype._initSearching=function(e){var n=this,s=this.opts[_],a=(this.conf[_],{});e.closest("."+f.panel+"_search").length?(a.$pnls=this.$pnls.find("."+f.panel),a.$nrsp=e.closest("."+f.panel)):e.closest("."+f.panel).length?(a.$pnls=e.closest("."+f.panel),a.$nrsp=a.$pnls):(a.$pnls=this.$pnls.find("."+f.panel),a.$nrsp=this.$menu),a.$pnls=a.$pnls.not(function(){return o(this).parent("."+f.listitem+"_vertical").length}),s.panel.add&&(a.$pnls=a.$pnls.not("."+f.panel+"_search"));var t=e.find("input"),i=e.find("."+f.searchfield+"__cancel"),l=this.$pnls.children("."+f.panel+"_search"),d=a.$pnls.find("."+f.listitem);a.$itms=d.not("."+f.listitem+"_divider"),a.$dvdr=d.filter("."+f.listitem+"_divider"),s.panel.add&&s.panel.splash&&t.off(h.focus+"-"+_+"-splash").on(h.focus+"-"+_+"-splash",function(e){n.openPanel(l)}),s.cancel&&(t.off(h.focus+"-"+_+"-cancel").on(h.focus+"-"+_+"-cancel",function(e){i.addClass(f.searchfield+"__cancel-active")}),i.off(h.click+"-"+_+"-splash").on(h.click+"-"+_+"-splash",function(e){e.preventDefault(),o(this).removeClass(f.searchfield+"__cancel-active"),l.hasClass(f.panel+"_opened")&&n.openPanel(n.$pnls.children("."+f.panel+"_opened-parent").last())})),s.panel.add&&"panel"==s.addTo&&this.bind("openPanel:finish",function(e){e[0]===l[0]&&t.focus()}),t.data(u.searchfield,a).off(h.input+"-"+_).on(h.input+"-"+_,function(e){(function(e){switch(e){case 9:case 16:case 17:case 18:case 37:case 38:case 39:case 40:return!0}return!1})(e.keyCode)||n.search(t)}),this.search(t)},o[n].prototype._initNoResultsMsg=function(e){var n=this.opts[_];this.conf[_];if(e.closest("."+f.panel).length||(e=this.$pnls.children("."+f.panel).first()),!e.children("."+f.panel+"__noresultsmsg").length){var s=e.children("."+f.listview).first(),a=o('<div class="'+f.panel+"__noresultsmsg "+f.hidden+'" />').append(this.i18n(n.noResults));s.length?a.insertAfter(s):a.prependTo(e)}},o[n].prototype.search=function(a,s){var t=this,i=this.opts[_];this.conf[_];a=a||this.$menu.find("."+f.searchfield).chidren("input").first(),s=(s=s||a.val()).toLowerCase().trim();var e=a.data(u.searchfield),n=a.closest("."+f.searchfield).find("."+f.btn),l=this.$pnls.children("."+f.panel+"_search"),d=e.$pnls,h=e.$itms,r=e.$dvdr,c=e.$nrsp;if(h.removeClass(f.listitem+"_nosubitems").find("."+f.btn+"_fullwidth-search").removeClass(f.btn+"_fullwidth-search "+f.btn+"_fullwidth"),l.children("."+f.listview).empty(),d.scrollTop(0),s.length){if(h.add(r).addClass(f.hidden),h.each(function(){var e=o(this),n="a";(i.showTextItems||i.showSubPanels&&e.find("."+f.btn+"_next"))&&(n="a, span"),-1<e.children(n).not("."+f.btn+"_next").text().toLowerCase().indexOf(s)&&e.removeClass(f.hidden)}),i.panel.add){var p=o();d.each(function(){var e=t.__filterListItems(o(this).find("."+f.listitem)).clone(!0);e.length&&(i.panel.dividers&&(p=p.add('<li class="'+f.listitem+" "+f.listitem+'_divider">'+o(this).find("."+f.navbar+"__title").text()+"</li>")),p=p.add(e))}),p.find("."+f.mm("toggle")).remove().end().find("."+f.mm("check")).remove().end().find("."+f.btn).remove(),l.children("."+f.listview).append(p),this.openPanel(l)}else i.showSubPanels&&d.each(function(e){var n=o(this);t.__filterListItems(n.find("."+f.listitem)).each(function(){var e=o(this).data(u.child);e&&e.find("."+f.listview).children().removeClass(f.hidden)})}),o(d.get().reverse()).each(function(e){var n=o(this),s=n.data(u.parent);s&&(t.__filterListItems(n.find("."+f.listitem)).length?s.hasClass(f.hidden)&&s.removeClass(f.hidden).children("."+f.btn+"_next").not("."+f.btn+"_fullwidth").addClass(f.btn+"_fullwidth").addClass(f.btn+"_fullwidth-search"):a.closest("."+f.panel).length||((n.hasClass(f.panel+"_opened")||n.hasClass(f.panel+"_opened-parent"))&&setTimeout(function(){t.openPanel(s.closest("."+f.panel))},(e+1)*(1.5*t.conf.openingInterval)),s.addClass(f.listitem+"_nosubitems")))}),this.__filterListItems(d.find("."+f.listitem)).each(function(){o(this).prevAll("."+f.listitem+"_divider").first().removeClass(f.hidden)});n.removeClass(f.hidden),c.find("."+f.panel+"__noresultsmsg")[h.not("."+f.hidden).length?"addClass":"removeClass"](f.hidden),i.panel.add&&(i.panel.splash&&l.find("."+f.panel+"__searchsplash").addClass(f.hidden),h.add(r).removeClass(f.hidden))}else h.add(r).removeClass(f.hidden),n.addClass(f.hidden),c.find("."+f.panel+"__noresultsmsg").addClass(f.hidden),i.panel.add&&(i.panel.splash?l.find("."+f.panel+"__searchsplash").removeClass(f.hidden):a.closest("."+f.panel+"_search").length||this.openPanel(this.$pnls.children("."+f.panel+"_opened-parent").last()));this.trigger("updateListview")}}(jQuery);
!function(d){var h,t,e="mmenu",o="sectionIndexer";d[e].addons[o]={setup:function(){var s=this,i=this.opts[o];this.conf[o];d[e].glbl,"boolean"==typeof i&&(i={add:i}),"object"!=typeof i&&(i={}),i=this.opts[o]=d.extend(!0,{},d[e].defaults[o],i);var r=null;this.bind("initPanels:after",function(e){if(i.add){var a;switch(i.addTo){case"panels":a=e;break;default:a=(a=d(i.addTo,this.$menu)).filter("."+h.panel)}a.find("."+h.listitem+"_divider").closest("."+h.panel).addClass(h.panel+"_has-sectionindexer"),r||(r=d('<div class="'+h.sectionindexer+'" />').prependTo(this.$menu).append('<a href="#a">a</a><a href="#b">b</a><a href="#c">c</a><a href="#d">d</a><a href="#e">e</a><a href="#f">f</a><a href="#g">g</a><a href="#h">h</a><a href="#i">i</a><a href="#j">j</a><a href="#k">k</a><a href="#l">l</a><a href="#m">m</a><a href="#n">n</a><a href="#o">o</a><a href="#p">p</a><a href="#q">q</a><a href="#r">r</a><a href="#s">s</a><a href="#t">t</a><a href="#u">u</a><a href="#v">v</a><a href="#w">w</a><a href="#x">x</a><a href="#y">y</a><a href="#z">z</a>')).on(t.mouseover+"-"+o+" "+t.touchstart+"-"+o,"a",function(e){var a=d(e.target).attr("href").slice(1),n=s.$pnls.children("."+h.panel+"_opened"),i=n.find("."+h.listview),r=-1,t=n.scrollTop();n.scrollTop(0),i.children("."+h.listitem+"_divider").not("."+h.hidden).each(function(){r<0&&a==d(this).text().slice(0,1).toLowerCase()&&(r=d(this).position().top)}),n.scrollTop(-1<r?r:t)});var n=function(e){e=e||this.$pnls.children("."+h.panel+"_opened"),this.$menu[(e.hasClass(h.panel+"_has-sectionindexer")?"add":"remove")+"Class"](h.menu+"_has-sectionindexer")};this.bind("openPanel:start",n),this.bind("initPanels:after",n)}})},add:function(){h=d[e]._c,d[e]._d,t=d[e]._e,h.add("sectionindexer"),t.add("mouseover")},clickAnchor:function(e,a){if(e.parent().is("."+h.indexer))return!0}},d[e].defaults[o]={add:!1,addTo:"panels"}}(jQuery);
!function(t){var s,a,l="mmenu",r="setSelected";t[l].addons[r]={setup:function(){var n=this,e=this.opts[r];this.conf[r];if(t[l].glbl,"boolean"==typeof e&&(e={hover:e,parent:e}),"object"!=typeof e&&(e={}),"detect"==(e=this.opts[r]=t.extend(!0,{},t[l].defaults[r],e)).current){var i=function(e){e=e.split("?")[0].split("#")[0];var t=n.$menu.find('a[href="'+e+'"], a[href="'+e+'/"]');t.length?n.setSelected(t.parent(),!0):(e=e.split("/").slice(0,-1)).length&&i(e.join("/"))};this.bind("initMenu:after",function(){i(window.location.href)})}else e.current||this.bind("initListview:after",function(e){e.find("."+s.listview).children("."+s.listitem+"_selected").removeClass(s.listitem+"_selected")});e.hover&&this.bind("initMenu:after",function(){this.$menu.addClass(s.menu+"_selected-hover")}),e.parent&&(this.bind("openPanel:finish",function(e){this.$pnls.find("."+s.listview).find("."+s.listitem+"_selected-parent").removeClass(s.listitem+"_selected-parent");for(var t=e.data(a.parent);t;)t.not("."+s.listitem+"_vertical").addClass(s.listitem+"_selected-parent"),t=t.closest("."+s.panel).data(a.parent)}),this.bind("initMenu:after",function(){this.$menu.addClass(s.menu+"_selected-parent")}))},add:function(){s=t[l]._c,a=t[l]._d,t[l]._e},clickAnchor:function(e,t){}},t[l].defaults[r]={current:!0,hover:!1,parent:!1}}(jQuery);
!function(a){var n,t,l="mmenu",i="sidebar";a[l].addons[i]={setup:function(){if(this.opts.offCanvas){var e=this.opts[i];this.conf[i];t=a[l].glbl,("string"==typeof e||"boolean"==typeof e&&e||"number"==typeof e)&&(e={expanded:e}),"object"!=typeof e&&(e={}),"boolean"==typeof e.collapsed&&e.collapsed&&(e.collapsed="all"),"string"!=typeof e.collapsed&&"number"!=typeof e.collapsed||(e.collapsed={use:e.collapsed}),"object"!=typeof e.collapsed&&(e.collapsed={}),"number"==typeof e.collapsed.use&&(e.collapsed.use="(min-width: "+e.collapsed.use+"px)"),"boolean"==typeof e.expanded&&e.expanded&&(e.expanded="all"),"string"!=typeof e.expanded&&"number"!=typeof e.expanded||(e.expanded={use:e.expanded}),"object"!=typeof e.expanded&&(e.expanded={}),"number"==typeof e.expanded.use&&(e.expanded.use="(min-width: "+e.expanded.use+"px)"),e=this.opts[i]=a.extend(!0,{},a[l].defaults[i],e);var d=n.wrapper+"_sidebar-collapsed";e.collapsed.size&&(d+=" "+n.wrapper+"_sidebar-collapsed-"+e.collapsed.size);var s=n.wrapper+"_sidebar-expanded";e.expanded.size&&(s+=" "+n.wrapper+"_sidebar-expanded-"+e.expanded.size),e.collapsed.use&&(this.bind("initMenu:after",function(){this.$menu.addClass(n.menu+"_sidebar-collapsed"),e.collapsed.blockMenu&&this.opts.offCanvas&&!this.$menu.children("."+n.menu+"__blocker").length&&this.$menu.prepend('<a class="'+n.menu+'__blocker" href="#'+this.$menu.attr("id")+'" />'),e.collapsed.hideNavbar&&this.$menu.addClass(n.menu+"_hidenavbar"),e.collapsed.hideDivider&&this.$menu.addClass(n.menu+"_hidedivider")}),"boolean"==typeof e.collapsed.use?this.bind("initMenu:after",function(){t.$html.addClass(d)}):this.matchMedia(e.collapsed.use,function(){t.$html.addClass(d)},function(){t.$html.removeClass(d)})),e.expanded.use&&(this.bind("initMenu:after",function(){this.$menu.addClass(n.menu+"_sidebar-expanded")}),"boolean"==typeof e.expanded.use?this.bind("initMenu:after",function(){t.$html.addClass(s),this.open()}):this.matchMedia(e.expanded.use,function(){t.$html.addClass(s),t.$html.hasClass(n.wrapper+"_sidebar-closed")||this.open()},function(){t.$html.removeClass(s),this.close()}),this.bind("close:start",function(){t.$html.hasClass(s)&&t.$html.addClass(n.wrapper+"_sidebar-closed")}),this.bind("open:start",function(){t.$html.removeClass(n.wrapper+"_sidebar-closed")}))}},add:function(){n=a[l]._c,a[l]._d,a[l]._e},clickAnchor:function(e,d,s){if(this.opts[i].expanded.use&&t.$html.is("."+n.wrapper+"_sidebar-expanded")&&d&&s)return{close:!1}}},a[l].defaults[i]={collapsed:{use:!1,blockMenu:!0,hideDivider:!1,hideNavbar:!0},expanded:{use:!1}},a[l].configuration[i]={}}(jQuery);
!function(n){var l,t="mmenu",e="toggles";n[t].addons[e]={setup:function(){var s=this;this.opts[e],this.conf[e];n[t].glbl,this.bind("initPanels:after",function(t){this.__refactorClass(t.find("input"),this.conf.classNames[e].toggle,l.toggle),this.__refactorClass(t.find("input"),this.conf.classNames[e].check,l.check),t.find("input."+l.toggle+", input."+l.check).each(function(){var t=n(this),e=t.closest("li"),c=t.hasClass(l.toggle)?"toggle":"check",i=t.attr("id")||s.__getUniqueId();e.children('label[for="'+i+'"]').length||(t.attr("id",i),e.prepend(t),n('<label for="'+i+'" class="'+l[c]+'"></label>').insertAfter(e.children("."+l.listitem+"__text").last()))})})},add:function(){l=n[t]._c,n[t]._d,n[t]._e,l.add("toggle check")},clickAnchor:function(t,e){}},n[t].configuration.classNames[e]={toggle:"Toggle",check:"Check"}}(jQuery);
!function(d){var s="mmenu";d[s].addons.navbars.breadcrumbs=function(a,r,i){var n=this,b=d[s]._c,c=d[s]._d;b.add("separator");var e=d('<span class="'+b.navbar+'__breadcrumbs" />').appendTo(a);this.bind("initNavbar:after",function(a){if(!a.children("."+b.navbar).children("."+b.navbar+"__breadcrumbs").length){a.removeClass(b.panel+"_has-navbar");for(var r=[],n=d('<span class="'+b.navbar+'__breadcrumbs"></span>'),e=a,s=!0;e&&e.length;){if(e.is("."+b.panel)||(e=e.closest("."+b.panel)),!e.parent("."+b.listitem+"_vertical").length){var t=e.children("."+b.navbar).children("."+b.navbar+"__title").text();t.length&&r.unshift(s?"<span>"+t+"</span>":'<a href="#'+e.attr("id")+'">'+t+"</a>"),s=!1}e=e.data(c.parent)}i.breadcrumbs.removeFirst&&r.shift(),n.append(r.join('<span class="'+b.separator+'">'+i.breadcrumbs.separator+"</span>")).appendTo(a.children("."+b.navbar))}}),this.bind("openPanel:start",function(a){var r=a.find("."+b.navbar+"__breadcrumbs");r.length&&e.html(r.html()||"")}),this.bind("initNavbar:after:sr-aria",function(a){a.children("."+b.navbar).children("."+b.breadcrumbs).children("a").each(function(){n.__sr_aria(d(this),"owns",d(this).attr("href").slice(1))})})}}(jQuery);
!function(s){var r="mmenu";s[r].addons.navbars.close=function(t,e){var n=s[r]._c;s[r].glbl;n.add("close");var a=s('<a class="'+n.btn+" "+n.btn+"_close "+n.navbar+'__btn" href="#" />').appendTo(t);this.bind("setPage:after",function(t){a.attr("href","#"+t.attr("id"))}),this.bind("setPage:after:sr-text",function(t){a.html(this.__sr_text(this.i18n(this.conf.screenReader.text.closeMenu))),this.__sr_aria(a,"owns",a.attr("href").slice(1))})}}(jQuery);
!function(h){var d="mmenu",o="navbars";h[d].addons[o].next=function(a,n){var t,e,s,r=h[d]._c,i=h('<a class="'+r.btn+" "+r.btn+"_next "+r.navbar+'__btn" href="#" />').appendTo(a);this.bind("openPanel:start",function(a){t=a.find("."+this.conf.classNames[o].panelNext),e=t.attr("href"),s=t.html(),e?i.attr("href",e):i.removeAttr("href"),i[e||s?"removeClass":"addClass"](r.hidden),i.html(s)}),this.bind("openPanel:start:sr-aria",function(a){this.__sr_aria(i,"hidden",i.hasClass(r.hidden)),this.__sr_aria(i,"owns",(i.attr("href")||"").slice(1))})},h[d].configuration.classNames[o].panelNext="Next"}(jQuery);
!function(h){var l="mmenu",d="navbars";h[l].addons[d].prev=function(a,n){var r,e,t,i=h[l]._c,s=h('<a class="'+i.btn+" "+i.btn+"_prev "+i.navbar+'__btn" href="#" />').appendTo(a);this.bind("initNavbar:after",function(a){a.removeClass(i.panel+"_has-navbar")}),this.bind("openPanel:start",function(a){a.parent("."+i.listitem+"_vertical").length||((r=a.find("."+this.conf.classNames[d].panelPrev)).length||(r=a.children("."+i.navbar).children("."+i.btn+"_prev")),e=r.attr("href"),t=r.html(),e?s.attr("href",e):s.removeAttr("href"),s[e||t?"removeClass":"addClass"](i.hidden),s.html(t))}),this.bind("initNavbar:after:sr-aria",function(a){var n=a.children("."+i.navbar);this.__sr_aria(n,"hidden",!0)}),this.bind("openPanel:start:sr-aria",function(a){this.__sr_aria(s,"hidden",s.hasClass(i.hidden)),this.__sr_aria(s,"owns",(s.attr("href")||"").slice(1))})},h[l].configuration.classNames[d].panelPrev="Prev"}(jQuery);
!function(t){var a="mmenu";t[a].addons.navbars.searchfield=function(s,e){t[a]._c;"object"!=typeof this.opts.searchfield&&(this.opts.searchfield={}),this.opts.searchfield.add=!0,this.opts.searchfield.addTo=s}}(jQuery);
!function(i){var o="mmenu",c="navbars";i[o].addons[c].tabs=function(a,e,t){var s=i[o]._c,r=i[o]._d,n=i[o]._e,l=this,d=a.children("a");a.addClass(s.navbar+"_tabs").parent().addClass(s.navbars+"_has-tabs"),d.on(n.click+"-"+c,function(a){a.preventDefault();var e=i(this);if(e.hasClass(s.navbar+"__tab_selected"))a.stopImmediatePropagation();else try{l.openPanel(i(e.attr("href")),!1),a.stopImmediatePropagation()}catch(a){}}),this.bind("openPanel:start",function a(e){d.removeClass(s.navbar+"__tab_selected");var t=d.filter('[href="#'+e.attr("id")+'"]');if(t.length)t.addClass(s.navbar+"__tab_selected");else{var n=e.data(r.parent);n&&n.length&&a(n.closest("."+s.panel))}})}}(jQuery);
!function(h){var d="mmenu",o="navbars";h[d].addons[o].title=function(t,a){var e,n,i,r,s=h[d]._c,l=h('<a class="'+s.navbar+'__title" />').appendTo(t);this.bind("openPanel:start",function(t){t.parent("."+s.listitem+"_vertical").length||((i=t.find("."+this.conf.classNames[o].panelTitle)).length||(i=t.children("."+s.navbar).children("."+s.navbar+"__title")),e=i.attr("href"),n=i.html()||a.title,e?l.attr("href",e):l.removeAttr("href"),l[e||n?"removeClass":"addClass"](s.hidden),l.html(n))}),this.bind("openPanel:start:sr-aria",function(t){if(this.opts.screenReader.text&&(r||(r=this.$menu.children("."+s.navbars+"_top, ."+s.navbars+"_bottom").children("."+s.navbar).children("."+s.btn+"_prev")),r.length)){var a=!0;"parent"==this.opts.navbar.titleLink&&(a=!r.hasClass(s.hidden)),this.__sr_aria(l,"hidden",a)}})},h[d].configuration.classNames[o].panelTitle="Title"}(jQuery);
jQuery.mmenu.wrappers.angular=function(){this.opts.onClick={close:!0,preventDefault:!1,setSelected:!0}};
!function(a){a.mmenu.wrappers.bootstrap3=function(){if(this.$menu.hasClass("navbar-collapse")){this.conf.classNames.selected="active",this.conf.classNames.divider="divider",this.conf.clone=!0,this.opts.hooks=this.opts.hooks||{};for(var n="",a=["nav-tabs","nav-pills","navbar-nav"],e=0;e<a.length;e++)if(this.$menu.find("."+a[e]).length){n=a[e];break}n.length&&(this.opts.hooks["initMenu:before"]=function(){"navbar-nav"==n&&this.$menu.wrapInner("<div />")},this.opts.hooks["initMenu:after"]=function(){t.menu.call(this),t.dropdown.call(this),t[n.split("nav-").join("").split("-nav").join("")].call(this)})}};var t={menu:function(){this.$menu.find(".nav").removeClass("nav").end().find(".sr-only").remove().end().find(".divider:empty").remove();for(var n=["role","aria-haspopup","aria-expanded"],a=0;a<n.length;a++)this.$menu.find("["+n[a]+"]").removeAttr(n[a])},dropdown:function(){var n=this.$menu.find(".dropdown");n.removeClass("dropdown"),n.children(".dropdown-toggle").find(".caret").remove().end().each(function(){a(this).replaceWith("<span>"+a(this).html()+"</span>")}),n.children(".dropdown-menu").removeClass("dropdown-menu")},tabs:function(){this.$menu.find(".nav-tabs").removeClass("nav-tabs")},pills:function(){this.$menu.find(".nav-pills").removeClass("nav-pills")},navbar:function(){var a=this;this.$menu.removeClass("collapse navbar-collapse").find('[class*="navbar-"]').removeClass("navbar-left navbar-right navbar-nav navbar-text navbar-btn");var n=this.$menu.find(".navbar-form");this.conf.searchform={form:{action:n.attr("action"),method:n.attr("method")},input:{name:n.find("input").attr("name")},submit:!0},n.remove(),(this.$orig||this.$menu).closest(".navbar").find(".navbar-header").find(".navbar-toggle").off("click").on("click",function(n){a.open(),n.stopImmediatePropagation(),n.preventDefault()})}}}(jQuery);
!function(i){function s(n){for(var a=i("<a />"),e=["href","title","target"],t=0;t<e.length;t++)void 0!==n.attr(e[t])&&a.attr(e[t],n.attr(e[t]));return a.html(n.html()),a.find(".sr-only").remove(),a}function o(n){var e=i("<ul />");return n.children().each(function(){var n=i(this),a=i("<li />");n.hasClass("dropdown-divider")?a.addClass("Divider"):n.hasClass("dropdown-item")&&a.append(s(n)),e.append(a)}),e}i.mmenu.wrappers.bootstrap4=function(){var e=this;if(this.$menu.hasClass("navbar-collapse")){this.conf.clone=!1;var n=i("<nav />"),r=i("<div />");n.append(r),this.$menu.children().each(function(){var n,t,a=i(this);switch(!0){case a.hasClass("navbar-nav"):r.append((n=a,t=i("<ul />"),n.find(".nav-item").each(function(){var n=i(this),a=i("<li />");if(n.hasClass("active")&&a.addClass("Selected"),!n.hasClass("nav-link")){var e=n.children(".dropdown-menu");e.length&&a.append(o(e)),n=n.children(".nav-link")}a.prepend(s(n)),t.append(a)}),t));break;case a.hasClass("dropdown-menu"):r.append(o(a));break;case a.hasClass("form-inline"):e.conf.searchfield.form={action:a.attr("action")||null,method:a.attr("method")||null},e.conf.searchfield.input={name:a.find("input").attr("name")||null},e.conf.searchfield.clear=!1,e.conf.searchfield.submit=!0;break;default:r.append(a.clone(!0))}}),this.bind("initMenu:before",function(){n.prependTo("body"),this.$menu=n}),this.$menu.parent().find(".navbar-toggler").removeAttr("data-target").removeAttr("aria-controls").off("click").on("click",function(n){n.preventDefault(),n.stopImmediatePropagation(),e[e.vars.opened?"close":"open"]()})}}}(jQuery);
!function(n){n.mmenu.wrappers.jqueryMobile=function(){var t=this;this.opts.onClick.close=!1,this.conf.offCanvas.page.selector="div.ui-page-active",n("body").on("pagecontainerchange",function(e,n){"function"==typeof t.close&&(t.close(),t.setPage(n.toPage))}),this.bind("initAnchors:after",function(){n("body").on("click",".mm-listview a",function(e){e.isDefaultPrevented()||(e.preventDefault(),n("body").pagecontainer("change",n(this).attr("href")))})})}}(jQuery);
jQuery.mmenu.wrappers.magento=function(){this.conf.classNames.selected="active"};
jQuery.mmenu.wrappers.olark=function(){this.conf.offCanvas.page.noSelector.push("#olark")};
!function(o){var r="mmenu";o[r].wrappers.turbolinks=function(){var n,t;o(document).on("turbolinks:before-visit",function(){t=o("html"),n=t.attr("class"),n=o.grep(n.split(/\s+/),function(n){return!/mm-/.test(n)}).join(" ")}).on("turbolinks:load",function(){void 0!==t&&(t.attr("class",n),o[r].glbl=!1)})}}(jQuery);
!function(s){s.mmenu.wrappers.wordpress=function(){this.conf.classNames.selected="current-menu-item",s("#wpadminbar").css("position","fixed").addClass("mm-slideout")}}(jQuery);
jQuery.mmenu.i18n({Menu:"Menü"},"de");
jQuery.mmenu.i18n({"Close menu":"Menü schließen","Close submenu":"Untermenü schließen","Open submenu":"Untermenü öffnen","Toggle submenu":"Untermenü wechseln"},"de");
jQuery.mmenu.i18n({Search:"Suche","No results found.":"Keine Ergebnisse gefunden.",cancel:"beenden"},"de");
jQuery.mmenu.i18n({Menu:"Menu"},"nl");
jQuery.mmenu.i18n({"Close menu":"Menu sluiten","Close submenu":"Submenu sluiten","Open submenu":"Submenu openen","Toggle submenu":"Submenu wisselen"},"nl");
jQuery.mmenu.i18n({Search:"Zoeken","No results found.":"Geen resultaten gevonden.",cancel:"annuleren"},"nl");
jQuery.mmenu.i18n({Menu:"Меню"},"ru");
jQuery.mmenu.i18n({"Close menu":"Закрыть меню","Close submenu":"Закрыть подменю","Open submenu":"Открыть подменю","Toggle submenu":"Переключить подменю"},"ru");
jQuery.mmenu.i18n({Search:"Найти","No results found.":"Ничего не найдено.","Search results":"Результаты поиска"},"ru");
return true;
}));


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.1
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(21);


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flickity_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__flickity_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__flickity_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__smoothscroll_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__smoothscroll_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__smoothscroll_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobile_nav_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mobile_nav_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__mobile_nav_js__);
// import './_sidebar.js';





/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {var Flickity = __webpack_require__(23);

// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    // NOTE: Brands-Slider
    var item_brand = document.querySelector('.brands-slider__container');

    var flkty = new Flickity(item_brand, ({
        // options
        prevNextButtons: false,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        autoPlay: 3000,
        imagesLoaded: true,
    }), 'groupCells', 4);

    // NOTE: Feature-Slider
    var item_feature = document.querySelector('.casestudy-block__list');

    var flkty = new Flickity(item_feature, ({
        // options
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        draggable: false,
        autoPlay: 10000,
        imagesLoaded: true,
    }), 'groupCells', 1);

    // NOTE: Testimonial-Slider
    var item_testimonial = document.querySelector('.testimonial-slider__slider');

    var flkty = new Flickity(item_testimonial, ({
        // options
        prevNextButtons: true,
        pageDots: false,
        contain: true,
        freeScroll: true,
        wrapAround: true,
        draggable: false,
        autoPlay: 10000,
        imagesLoaded: true,
    }), 'groupCells', 1);
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Flickity v2.2.0
 * Touch, responsive, flickable carousels
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * https://flickity.metafizzy.co
 * Copyright 2015-2018 Metafizzy
 */

( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(28),
      __webpack_require__(30),
      __webpack_require__(31),
      __webpack_require__(32),
      __webpack_require__(33),
      __webpack_require__(34)
    ], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('./flickity'),
      require('./drag'),
      require('./prev-next-button'),
      require('./page-dots'),
      require('./player'),
      require('./add-remove-cell'),
      require('./lazyload')
    );
  }

})( window, function factory( Flickity ) {
  /*jshint strict: false*/
  return Flickity;
});


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * matchesSelector v2.0.2
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */

( function( window, factory ) {
  /*global define: false, module: false */
  'use strict';
  // universal module definition
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.matchesSelector = factory();
  }

}( window, function factory() {
  'use strict';

  var matchesMethod = ( function() {
    var ElemProto = window.Element.prototype;
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0; i < prefixes.length; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  return function matchesSelector( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  };

}));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Flickity.Cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(6)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( getSize ) {
      return factory( window, getSize );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('get-size')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Cell = factory(
      window,
      window.getSize
    );
  }

}( window, function factory( window, getSize ) {

'use strict';

function Cell( elem, parent ) {
  this.element = elem;
  this.parent = parent;

  this.create();
}

var proto = Cell.prototype;

proto.create = function() {
  this.element.style.position = 'absolute';
  this.element.setAttribute( 'aria-hidden', 'true' );
  this.x = 0;
  this.shift = 0;
};

proto.destroy = function() {
  // reset style
  this.unselect();
  this.element.style.position = '';
  var side = this.parent.originSide;
  this.element.style[ side ] = '';
};

proto.getSize = function() {
  this.size = getSize( this.element );
};

proto.setPosition = function( x ) {
  this.x = x;
  this.updateTarget();
  this.renderPosition( x );
};

// setDefaultTarget v1 method, backwards compatibility, remove in v3
proto.updateTarget = proto.setDefaultTarget = function() {
  var marginProperty = this.parent.originSide == 'left' ? 'marginLeft' : 'marginRight';
  this.target = this.x + this.size[ marginProperty ] +
    this.size.width * this.parent.cellAlign;
};

proto.renderPosition = function( x ) {
  // render position of cell with in slider
  var side = this.parent.originSide;
  this.element.style[ side ] = this.parent.getPositionValue( x );
};

proto.select = function() {
  this.element.classList.add('is-selected');
  this.element.removeAttribute('aria-hidden');
};

proto.unselect = function() {
  this.element.classList.remove('is-selected');
  this.element.setAttribute( 'aria-hidden', 'true' );
};

/**
 * @param {Integer} factor - 0, 1, or -1
**/
proto.wrapShift = function( shift ) {
  this.shift = shift;
  this.renderPosition( this.x + this.parent.slideableWidth * shift );
};

proto.remove = function() {
  this.element.parentNode.removeChild( this.element );
};

return Cell;

}));


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// slide
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.Slide = factory();
  }

}( window, function factory() {
'use strict';

function Slide( parent ) {
  this.parent = parent;
  this.isOriginLeft = parent.originSide == 'left';
  this.cells = [];
  this.outerWidth = 0;
  this.height = 0;
}

var proto = Slide.prototype;

proto.addCell = function( cell ) {
  this.cells.push( cell );
  this.outerWidth += cell.size.outerWidth;
  this.height = Math.max( cell.size.outerHeight, this.height );
  // first cell stuff
  if ( this.cells.length == 1 ) {
    this.x = cell.x; // x comes from first cell
    var beginMargin = this.isOriginLeft ? 'marginLeft' : 'marginRight';
    this.firstMargin = cell.size[ beginMargin ];
  }
};

proto.updateTarget = function() {
  var endMargin = this.isOriginLeft ? 'marginRight' : 'marginLeft';
  var lastCell = this.getLastCell();
  var lastMargin = lastCell ? lastCell.size[ endMargin ] : 0;
  var slideWidth = this.outerWidth - ( this.firstMargin + lastMargin );
  this.target = this.x + this.firstMargin + slideWidth * this.parent.cellAlign;
};

proto.getLastCell = function() {
  return this.cells[ this.cells.length - 1 ];
};

proto.select = function() {
  this.cells.forEach( function( cell ) {
    cell.select();
  });
};

proto.unselect = function() {
  this.cells.forEach( function( cell ) {
    cell.unselect();
  });
};

proto.getCellElements = function() {
  return this.cells.map( function( cell ) {
    return cell.element;
  });
};

return Slide;

}));


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// animate
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( utils ) {
      return factory( window, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = window.Flickity || {};
    window.Flickity.animatePrototype = factory(
      window,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, utils ) {

'use strict';

// -------------------------- animate -------------------------- //

var proto = {};

proto.startAnimation = function() {
  if ( this.isAnimating ) {
    return;
  }

  this.isAnimating = true;
  this.restingFrames = 0;
  this.animate();
};

proto.animate = function() {
  this.applyDragForce();
  this.applySelectedAttraction();

  var previousX = this.x;

  this.integratePhysics();
  this.positionSlider();
  this.settle( previousX );
  // animate next frame
  if ( this.isAnimating ) {
    var _this = this;
    requestAnimationFrame( function animateFrame() {
      _this.animate();
    });
  }
};

proto.positionSlider = function() {
  var x = this.x;
  // wrap position around
  if ( this.options.wrapAround && this.cells.length > 1 ) {
    x = utils.modulo( x, this.slideableWidth );
    x = x - this.slideableWidth;
    this.shiftWrapCells( x );
  }

  this.setTranslateX( x, this.isAnimating );
  this.dispatchScrollEvent();
};

proto.setTranslateX = function( x, is3d ) {
  x += this.cursorPosition;
  // reverse if right-to-left and using transform
  x = this.options.rightToLeft ? -x : x;
  var translateX = this.getPositionValue( x );
  // use 3D tranforms for hardware acceleration on iOS
  // but use 2D when settled, for better font-rendering
  this.slider.style.transform = is3d ?
    'translate3d(' + translateX + ',0,0)' : 'translateX(' + translateX + ')';
};

proto.dispatchScrollEvent = function() {
  var firstSlide = this.slides[0];
  if ( !firstSlide ) {
    return;
  }
  var positionX = -this.x - firstSlide.target;
  var progress = positionX / this.slidesWidth;
  this.dispatchEvent( 'scroll', null, [ progress, positionX ] );
};

proto.positionSliderAtSelected = function() {
  if ( !this.cells.length ) {
    return;
  }
  this.x = -this.selectedSlide.target;
  this.velocity = 0; // stop wobble
  this.positionSlider();
};

proto.getPositionValue = function( position ) {
  if ( this.options.percentPosition ) {
    // percent position, round to 2 digits, like 12.34%
    return ( Math.round( ( position / this.size.innerWidth ) * 10000 ) * 0.01 )+ '%';
  } else {
    // pixel positioning
    return Math.round( position ) + 'px';
  }
};

proto.settle = function( previousX ) {
  // keep track of frames where x hasn't moved
  if ( !this.isPointerDown && Math.round( this.x * 100 ) == Math.round( previousX * 100 ) ) {
    this.restingFrames++;
  }
  // stop animating if resting for 3 or more frames
  if ( this.restingFrames > 2 ) {
    this.isAnimating = false;
    delete this.isFreeScrolling;
    // render position with translateX when settled
    this.positionSlider();
    this.dispatchEvent( 'settle', null, [ this.selectedIndex ] );
  }
};

proto.shiftWrapCells = function( x ) {
  // shift before cells
  var beforeGap = this.cursorPosition + x;
  this._shiftCells( this.beforeShiftCells, beforeGap, -1 );
  // shift after cells
  var afterGap = this.size.innerWidth - ( x + this.slideableWidth + this.cursorPosition );
  this._shiftCells( this.afterShiftCells, afterGap, 1 );
};

proto._shiftCells = function( cells, gap, shift ) {
  for ( var i=0; i < cells.length; i++ ) {
    var cell = cells[i];
    var cellShift = gap > 0 ? shift : 0;
    cell.wrapShift( cellShift );
    gap -= cell.size.outerWidth;
  }
};

proto._unshiftCells = function( cells ) {
  if ( !cells || !cells.length ) {
    return;
  }
  for ( var i=0; i < cells.length; i++ ) {
    cells[i].wrapShift( 0 );
  }
};

// -------------------------- physics -------------------------- //

proto.integratePhysics = function() {
  this.x += this.velocity;
  this.velocity *= this.getFrictionFactor();
};

proto.applyForce = function( force ) {
  this.velocity += force;
};

proto.getFrictionFactor = function() {
  return 1 - this.options[ this.isFreeScrolling ? 'freeScrollFriction' : 'friction' ];
};

proto.getRestingPosition = function() {
  // my thanks to Steven Wittens, who simplified this math greatly
  return this.x + this.velocity / ( 1 - this.getFrictionFactor() );
};

proto.applyDragForce = function() {
  if ( !this.isDraggable || !this.isPointerDown ) {
    return;
  }
  // change the position to drag position by applying force
  var dragVelocity = this.dragX - this.x;
  var dragForce = dragVelocity - this.velocity;
  this.applyForce( dragForce );
};

proto.applySelectedAttraction = function() {
  // do not attract if pointer down or no slides
  var dragDown = this.isDraggable && this.isPointerDown;
  if ( dragDown || this.isFreeScrolling || !this.slides.length ) {
    return;
  }
  var distance = this.selectedSlide.target * -1 - this.x;
  var force = distance * this.options.selectedAttraction;
  this.applyForce( force );
};

return proto;

}));


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// drag
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(29),
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Flickity, Unidragger, utils ) {
      return factory( window, Flickity, Unidragger, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unidragger'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Flickity = factory(
      window,
      window.Flickity,
      window.Unidragger,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unidragger, utils ) {

'use strict';

// ----- defaults ----- //

utils.extend( Flickity.defaults, {
  draggable: '>1',
  dragThreshold: 3,
});

// ----- create ----- //

Flickity.createMethods.push('_createDrag');

// -------------------------- drag prototype -------------------------- //

var proto = Flickity.prototype;
utils.extend( proto, Unidragger.prototype );
proto._touchActionValue = 'pan-y';

// --------------------------  -------------------------- //

var isTouch = 'createTouch' in document;
var isTouchmoveScrollCanceled = false;

proto._createDrag = function() {
  this.on( 'activate', this.onActivateDrag );
  this.on( 'uiChange', this._uiChangeDrag );
  this.on( 'deactivate', this.onDeactivateDrag );
  this.on( 'cellChange', this.updateDraggable );
  // TODO updateDraggable on resize? if groupCells & slides change
  // HACK - add seemingly innocuous handler to fix iOS 10 scroll behavior
  // #457, RubaXa/Sortable#973
  if ( isTouch && !isTouchmoveScrollCanceled ) {
    window.addEventListener( 'touchmove', function() {});
    isTouchmoveScrollCanceled = true;
  }
};

proto.onActivateDrag = function() {
  this.handles = [ this.viewport ];
  this.bindHandles();
  this.updateDraggable();
};

proto.onDeactivateDrag = function() {
  this.unbindHandles();
  this.element.classList.remove('is-draggable');
};

proto.updateDraggable = function() {
  // disable dragging if less than 2 slides. #278
  if ( this.options.draggable == '>1' ) {
    this.isDraggable = this.slides.length > 1;
  } else {
    this.isDraggable = this.options.draggable;
  }
  if ( this.isDraggable ) {
    this.element.classList.add('is-draggable');
  } else {
    this.element.classList.remove('is-draggable');
  }
};

// backwards compatibility
proto.bindDrag = function() {
  this.options.draggable = true;
  this.updateDraggable();
};

proto.unbindDrag = function() {
  this.options.draggable = false;
  this.updateDraggable();
};

proto._uiChangeDrag = function() {
  delete this.isFreeScrolling;
};

// -------------------------- pointer events -------------------------- //

proto.pointerDown = function( event, pointer ) {
  if ( !this.isDraggable ) {
    this._pointerDownDefault( event, pointer );
    return;
  }
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }

  this._pointerDownPreventDefault( event );
  this.pointerDownFocus( event );
  // blur
  if ( document.activeElement != this.element ) {
    // do not blur if already focused
    this.pointerDownBlur();
  }

  // stop if it was moving
  this.dragX = this.x;
  this.viewport.classList.add('is-pointer-down');
  // track scrolling
  this.pointerDownScroll = getScrollPosition();
  window.addEventListener( 'scroll', this );

  this._pointerDownDefault( event, pointer );
};

// default pointerDown logic, used for staticClick
proto._pointerDownDefault = function( event, pointer ) {
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. #779
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };
  // bind move and end events
  this._bindPostStartEvents( event );
  this.dispatchEvent( 'pointerDown', event, [ pointer ] );
};

var focusNodes = {
  INPUT: true,
  TEXTAREA: true,
  SELECT: true,
};

proto.pointerDownFocus = function( event ) {
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isFocusNode ) {
    this.focus();
  }
};

proto._pointerDownPreventDefault = function( event ) {
  var isTouchStart = event.type == 'touchstart';
  var isTouchPointer = event.pointerType == 'touch';
  var isFocusNode = focusNodes[ event.target.nodeName ];
  if ( !isTouchStart && !isTouchPointer && !isFocusNode ) {
    event.preventDefault();
  }
};

// ----- move ----- //

proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > this.options.dragThreshold;
};

// ----- up ----- //

proto.pointerUp = function( event, pointer ) {
  delete this.isTouchScrolling;
  this.viewport.classList.remove('is-pointer-down');
  this.dispatchEvent( 'pointerUp', event, [ pointer ] );
  this._dragPointerUp( event, pointer );
};

proto.pointerDone = function() {
  window.removeEventListener( 'scroll', this );
  delete this.pointerDownScroll;
};

// -------------------------- dragging -------------------------- //

proto.dragStart = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  this.dragStartPosition = this.x;
  this.startAnimation();
  window.removeEventListener( 'scroll', this );
  this.dispatchEvent( 'dragStart', event, [ pointer ] );
};

proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.dispatchEvent( 'pointerMove', event, [ pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  if ( !this.isDraggable ) {
    return;
  }
  event.preventDefault();

  this.previousDragX = this.dragX;
  // reverse if right-to-left
  var direction = this.options.rightToLeft ? -1 : 1;
  if ( this.options.wrapAround ) {
    // wrap around move. #589
    moveVector.x = moveVector.x % this.slideableWidth;
  }
  var dragX = this.dragStartPosition + moveVector.x * direction;

  if ( !this.options.wrapAround && this.slides.length ) {
    // slow drag
    var originBound = Math.max( -this.slides[0].target, this.dragStartPosition );
    dragX = dragX > originBound ? ( dragX + originBound ) * 0.5 : dragX;
    var endBound = Math.min( -this.getLastSlide().target, this.dragStartPosition );
    dragX = dragX < endBound ? ( dragX + endBound ) * 0.5 : dragX;
  }

  this.dragX = dragX;

  this.dragMoveTime = new Date();
  this.dispatchEvent( 'dragMove', event, [ pointer, moveVector ] );
};

proto.dragEnd = function( event, pointer ) {
  if ( !this.isDraggable ) {
    return;
  }
  if ( this.options.freeScroll ) {
    this.isFreeScrolling = true;
  }
  // set selectedIndex based on where flick will end up
  var index = this.dragEndRestingSelect();

  if ( this.options.freeScroll && !this.options.wrapAround ) {
    // if free-scroll & not wrap around
    // do not free-scroll if going outside of bounding slides
    // so bounding slides can attract slider, and keep it in bounds
    var restingX = this.getRestingPosition();
    this.isFreeScrolling = -restingX > this.slides[0].target &&
      -restingX < this.getLastSlide().target;
  } else if ( !this.options.freeScroll && index == this.selectedIndex ) {
    // boost selection if selected index has not changed
    index += this.dragEndBoostSelect();
  }
  delete this.previousDragX;
  // apply selection
  // TODO refactor this, selecting here feels weird
  // HACK, set flag so dragging stays in correct direction
  this.isDragSelect = this.options.wrapAround;
  this.select( index );
  delete this.isDragSelect;
  this.dispatchEvent( 'dragEnd', event, [ pointer ] );
};

proto.dragEndRestingSelect = function() {
  var restingX = this.getRestingPosition();
  // how far away from selected slide
  var distance = Math.abs( this.getSlideDistance( -restingX, this.selectedIndex ) );
  // get closet resting going up and going down
  var positiveResting = this._getClosestResting( restingX, distance, 1 );
  var negativeResting = this._getClosestResting( restingX, distance, -1 );
  // use closer resting for wrap-around
  var index = positiveResting.distance < negativeResting.distance ?
    positiveResting.index : negativeResting.index;
  return index;
};

/**
 * given resting X and distance to selected cell
 * get the distance and index of the closest cell
 * @param {Number} restingX - estimated post-flick resting position
 * @param {Number} distance - distance to selected cell
 * @param {Integer} increment - +1 or -1, going up or down
 * @returns {Object} - { distance: {Number}, index: {Integer} }
 */
proto._getClosestResting = function( restingX, distance, increment ) {
  var index = this.selectedIndex;
  var minDistance = Infinity;
  var condition = this.options.contain && !this.options.wrapAround ?
    // if contain, keep going if distance is equal to minDistance
    function( d, md ) { return d <= md; } : function( d, md ) { return d < md; };
  while ( condition( distance, minDistance ) ) {
    // measure distance to next cell
    index += increment;
    minDistance = distance;
    distance = this.getSlideDistance( -restingX, index );
    if ( distance === null ) {
      break;
    }
    distance = Math.abs( distance );
  }
  return {
    distance: minDistance,
    // selected was previous index
    index: index - increment
  };
};

/**
 * measure distance between x and a slide target
 * @param {Number} x
 * @param {Integer} index - slide index
 */
proto.getSlideDistance = function( x, index ) {
  var len = this.slides.length;
  // wrap around if at least 2 slides
  var isWrapAround = this.options.wrapAround && len > 1;
  var slideIndex = isWrapAround ? utils.modulo( index, len ) : index;
  var slide = this.slides[ slideIndex ];
  if ( !slide ) {
    return null;
  }
  // add distance for wrap-around slides
  var wrap = isWrapAround ? this.slideableWidth * Math.floor( index / len ) : 0;
  return x - ( slide.target + wrap );
};

proto.dragEndBoostSelect = function() {
  // do not boost if no previousDragX or dragMoveTime
  if ( this.previousDragX === undefined || !this.dragMoveTime ||
    // or if drag was held for 100 ms
    new Date() - this.dragMoveTime > 100 ) {
    return 0;
  }

  var distance = this.getSlideDistance( -this.dragX, this.selectedIndex );
  var delta = this.previousDragX - this.dragX;
  if ( distance > 0 && delta > 0 ) {
    // boost to next if moving towards the right, and positive velocity
    return 1;
  } else if ( distance < 0 && delta < 0 ) {
    // boost to previous if moving towards the left, and negative velocity
    return -1;
  }
  return 0;
};

// ----- staticClick ----- //

proto.staticClick = function( event, pointer ) {
  // get clickedCell, if cell was clicked
  var clickedCell = this.getParentCell( event.target );
  var cellElem = clickedCell && clickedCell.element;
  var cellIndex = clickedCell && this.cells.indexOf( clickedCell );
  this.dispatchEvent( 'staticClick', event, [ pointer, cellElem, cellIndex ] );
};

// ----- scroll ----- //

proto.onscroll = function() {
  var scroll = getScrollPosition();
  var scrollMoveX = this.pointerDownScroll.x - scroll.x;
  var scrollMoveY = this.pointerDownScroll.y - scroll.y;
  // cancel click/tap if scroll is too much
  if ( Math.abs( scrollMoveX ) > 3 || Math.abs( scrollMoveY ) > 3 ) {
    this._pointerDone();
  }
};

// ----- utils ----- //

function getScrollPosition() {
  return {
    x: window.pageXOffset,
    y: window.pageYOffset
  };
}

// -----  ----- //

return Flickity;

}));


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * Unidragger v2.3.0
 * Draggable base class
 * MIT license
 */

/*jshint browser: true, unused: true, undef: true, strict: true */

( function( window, factory ) {
  // universal module definition
  /*jshint strict: false */ /*globals define, module, require */

  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(5)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Unipointer ) {
      return factory( window, Unipointer );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('unipointer')
    );
  } else {
    // browser global
    window.Unidragger = factory(
      window,
      window.Unipointer
    );
  }

}( window, function factory( window, Unipointer ) {

'use strict';

// -------------------------- Unidragger -------------------------- //

function Unidragger() {}

// inherit Unipointer & EvEmitter
var proto = Unidragger.prototype = Object.create( Unipointer.prototype );

// ----- bind start ----- //

proto.bindHandles = function() {
  this._bindHandles( true );
};

proto.unbindHandles = function() {
  this._bindHandles( false );
};

/**
 * Add or remove start event
 * @param {Boolean} isAdd
 */
proto._bindHandles = function( isAdd ) {
  // munge isAdd, default to true
  isAdd = isAdd === undefined ? true : isAdd;
  // bind each handle
  var bindMethod = isAdd ? 'addEventListener' : 'removeEventListener';
  var touchAction = isAdd ? this._touchActionValue : '';
  for ( var i=0; i < this.handles.length; i++ ) {
    var handle = this.handles[i];
    this._bindStartEvent( handle, isAdd );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) {
      handle.style.touchAction = touchAction;
    }
  }
};

// prototype so it can be overwriteable by Flickity
proto._touchActionValue = 'none';

// ----- start event ----- //

/**
 * pointer start
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  var isOkay = this.okayPointerDown( event );
  if ( !isOkay ) {
    return;
  }
  // track start event position
  this.pointerDownPointer = pointer;

  event.preventDefault();
  this.pointerDownBlur();
  // bind move and end events
  this._bindPostStartEvents( event );
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// nodes that have text fields
var cursorNodes = {
  TEXTAREA: true,
  INPUT: true,
  SELECT: true,
  OPTION: true,
};

// input types that do not have text fields
var clickTypes = {
  radio: true,
  checkbox: true,
  button: true,
  submit: true,
  image: true,
  file: true,
};

// dismiss inputs with text fields. flickity#403, flickity#404
proto.okayPointerDown = function( event ) {
  var isCursorNode = cursorNodes[ event.target.nodeName ];
  var isClickType = clickTypes[ event.target.type ];
  var isOkay = !isCursorNode || isClickType;
  if ( !isOkay ) {
    this._pointerReset();
  }
  return isOkay;
};

// kludge to blur previously focused input
proto.pointerDownBlur = function() {
  var focused = document.activeElement;
  // do not blur body for IE10, metafizzy/flickity#117
  var canBlur = focused && focused.blur && focused != document.body;
  if ( canBlur ) {
    focused.blur();
  }
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerMove = function( event, pointer ) {
  var moveVector = this._dragPointerMove( event, pointer );
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  this._dragMove( event, pointer, moveVector );
};

// base pointer move logic
proto._dragPointerMove = function( event, pointer ) {
  var moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY
  };
  // start drag if pointer has moved far enough to start drag
  if ( !this.isDragging && this.hasDragStarted( moveVector ) ) {
    this._dragStart( event, pointer );
  }
  return moveVector;
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- end event ----- //

/**
 * pointer up
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
proto.pointerUp = function( event, pointer ) {
  this.emitEvent( 'pointerUp', [ event, pointer ] );
  this._dragPointerUp( event, pointer );
};

proto._dragPointerUp = function( event, pointer ) {
  if ( this.isDragging ) {
    this._dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this._staticClick( event, pointer );
  }
};

// -------------------------- drag -------------------------- //

// dragStart
proto._dragStart = function( event, pointer ) {
  this.isDragging = true;
  // prevent clicks
  this.isPreventingClicks = true;
  this.dragStart( event, pointer );
};

proto.dragStart = function( event, pointer ) {
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

// dragMove
proto._dragMove = function( event, pointer, moveVector ) {
  // do not drag if not dragging yet
  if ( !this.isDragging ) {
    return;
  }

  this.dragMove( event, pointer, moveVector );
};

proto.dragMove = function( event, pointer, moveVector ) {
  event.preventDefault();
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// dragEnd
proto._dragEnd = function( event, pointer ) {
  // set flags
  this.isDragging = false;
  // re-enable clicking async
  setTimeout( function() {
    delete this.isPreventingClicks;
  }.bind( this ) );

  this.dragEnd( event, pointer );
};

proto.dragEnd = function( event, pointer ) {
  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// ----- onclick ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) {
    event.preventDefault();
  }
};

// ----- staticClick ----- //

// triggered after pointer down & up with no/tiny movement
proto._staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  if ( this.isIgnoringMouseUp && event.type == 'mouseup' ) {
    return;
  }

  this.staticClick( event, pointer );

  // set flag for emulated clicks 300ms after touchend
  if ( event.type != 'mouseup' ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 300ms
    setTimeout( function() {
      delete this.isIgnoringMouseUp;
    }.bind( this ), 400 );
  }
};

proto.staticClick = function( event, pointer ) {
  this.emitEvent( 'staticClick', [ event, pointer ] );
};

// ----- utils ----- //

Unidragger.getPointerPoint = Unipointer.getPointerPoint;

// -----  ----- //

return Unidragger;

}));


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// prev/next buttons
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(5),
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {
'use strict';

var svgURI = 'http://www.w3.org/2000/svg';

// -------------------------- PrevNextButton -------------------------- //

function PrevNextButton( direction, parent ) {
  this.direction = direction;
  this.parent = parent;
  this._create();
}

PrevNextButton.prototype = Object.create( Unipointer.prototype );

PrevNextButton.prototype._create = function() {
  // properties
  this.isEnabled = true;
  this.isPrevious = this.direction == -1;
  var leftDirection = this.parent.options.rightToLeft ? 1 : -1;
  this.isLeft = this.direction == leftDirection;

  var element = this.element = document.createElement('button');
  element.className = 'flickity-button flickity-prev-next-button';
  element.className += this.isPrevious ? ' previous' : ' next';
  // prevent button from submitting form http://stackoverflow.com/a/10836076/182183
  element.setAttribute( 'type', 'button' );
  // init as disabled
  this.disable();

  element.setAttribute( 'aria-label', this.isPrevious ? 'Previous' : 'Next' );

  // create arrow
  var svg = this.createSVG();
  element.appendChild( svg );
  // events
  this.parent.on( 'select', this.update.bind( this ) );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PrevNextButton.prototype.activate = function() {
  this.bindStartEvent( this.element );
  this.element.addEventListener( 'click', this );
  // add to DOM
  this.parent.element.appendChild( this.element );
};

PrevNextButton.prototype.deactivate = function() {
  // remove from DOM
  this.parent.element.removeChild( this.element );
  // click events
  this.unbindStartEvent( this.element );
  this.element.removeEventListener( 'click', this );
};

PrevNextButton.prototype.createSVG = function() {
  var svg = document.createElementNS( svgURI, 'svg');
  svg.setAttribute( 'class', 'flickity-button-icon' );
  svg.setAttribute( 'viewBox', '0 0 100 100' );
  var path = document.createElementNS( svgURI, 'path');
  var pathMovements = getArrowMovements( this.parent.options.arrowShape );
  path.setAttribute( 'd', pathMovements );
  path.setAttribute( 'class', 'arrow' );
  // rotate arrow
  if ( !this.isLeft ) {
    path.setAttribute( 'transform', 'translate(100, 100) rotate(180) ' );
  }
  svg.appendChild( path );
  return svg;
};

// get SVG path movmement
function getArrowMovements( shape ) {
  // use shape as movement if string
  if ( typeof shape == 'string' ) {
    return shape;
  }
  // create movement string
  return 'M ' + shape.x0 + ',50' +
    ' L ' + shape.x1 + ',' + ( shape.y1 + 50 ) +
    ' L ' + shape.x2 + ',' + ( shape.y2 + 50 ) +
    ' L ' + shape.x3 + ',50 ' +
    ' L ' + shape.x2 + ',' + ( 50 - shape.y2 ) +
    ' L ' + shape.x1 + ',' + ( 50 - shape.y1 ) +
    ' Z';
}

PrevNextButton.prototype.handleEvent = utils.handleEvent;

PrevNextButton.prototype.onclick = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.parent.uiChange();
  var method = this.isPrevious ? 'previous' : 'next';
  this.parent[ method ]();
};

// -----  ----- //

PrevNextButton.prototype.enable = function() {
  if ( this.isEnabled ) {
    return;
  }
  this.element.disabled = false;
  this.isEnabled = true;
};

PrevNextButton.prototype.disable = function() {
  if ( !this.isEnabled ) {
    return;
  }
  this.element.disabled = true;
  this.isEnabled = false;
};

PrevNextButton.prototype.update = function() {
  // index of first or last slide, if previous or next
  var slides = this.parent.slides;
  // enable is wrapAround and at least 2 slides
  if ( this.parent.options.wrapAround && slides.length > 1 ) {
    this.enable();
    return;
  }
  var lastIndex = slides.length ? slides.length - 1 : 0;
  var boundIndex = this.isPrevious ? 0 : lastIndex;
  var method = this.parent.selectedIndex == boundIndex ? 'disable' : 'enable';
  this[ method ]();
};

PrevNextButton.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

// -------------------------- Flickity prototype -------------------------- //

utils.extend( Flickity.defaults, {
  prevNextButtons: true,
  arrowShape: {
    x0: 10,
    x1: 60, y1: 50,
    x2: 70, y2: 40,
    x3: 30
  }
});

Flickity.createMethods.push('_createPrevNextButtons');
var proto = Flickity.prototype;

proto._createPrevNextButtons = function() {
  if ( !this.options.prevNextButtons ) {
    return;
  }

  this.prevButton = new PrevNextButton( -1, this );
  this.nextButton = new PrevNextButton( 1, this );

  this.on( 'activate', this.activatePrevNextButtons );
};

proto.activatePrevNextButtons = function() {
  this.prevButton.activate();
  this.nextButton.activate();
  this.on( 'deactivate', this.deactivatePrevNextButtons );
};

proto.deactivatePrevNextButtons = function() {
  this.prevButton.deactivate();
  this.nextButton.deactivate();
  this.off( 'deactivate', this.deactivatePrevNextButtons );
};

// --------------------------  -------------------------- //

Flickity.PrevNextButton = PrevNextButton;

return Flickity;

}));


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// page dots
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(5),
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Flickity, Unipointer, utils ) {
      return factory( window, Flickity, Unipointer, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('unipointer'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.Unipointer,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, Unipointer, utils ) {

// -------------------------- PageDots -------------------------- //

'use strict';

function PageDots( parent ) {
  this.parent = parent;
  this._create();
}

PageDots.prototype = Object.create( Unipointer.prototype );

PageDots.prototype._create = function() {
  // create holder element
  this.holder = document.createElement('ol');
  this.holder.className = 'flickity-page-dots';
  // create dots, array of elements
  this.dots = [];
  // events
  this.handleClick = this.onClick.bind( this );
  this.on( 'pointerDown', this.parent.childUIPointerDown.bind( this.parent ) );
};

PageDots.prototype.activate = function() {
  this.setDots();
  this.holder.addEventListener( 'click', this.handleClick );
  this.bindStartEvent( this.holder );
  // add to DOM
  this.parent.element.appendChild( this.holder );
};

PageDots.prototype.deactivate = function() {
  this.holder.removeEventListener( 'click', this.handleClick );
  this.unbindStartEvent( this.holder );
  // remove from DOM
  this.parent.element.removeChild( this.holder );
};

PageDots.prototype.setDots = function() {
  // get difference between number of slides and number of dots
  var delta = this.parent.slides.length - this.dots.length;
  if ( delta > 0 ) {
    this.addDots( delta );
  } else if ( delta < 0 ) {
    this.removeDots( -delta );
  }
};

PageDots.prototype.addDots = function( count ) {
  var fragment = document.createDocumentFragment();
  var newDots = [];
  var length = this.dots.length;
  var max = length + count;

  for ( var i = length; i < max; i++ ) {
    var dot = document.createElement('li');
    dot.className = 'dot';
    dot.setAttribute( 'aria-label', 'Page dot ' + ( i + 1 ) );
    fragment.appendChild( dot );
    newDots.push( dot );
  }

  this.holder.appendChild( fragment );
  this.dots = this.dots.concat( newDots );
};

PageDots.prototype.removeDots = function( count ) {
  // remove from this.dots collection
  var removeDots = this.dots.splice( this.dots.length - count, count );
  // remove from DOM
  removeDots.forEach( function( dot ) {
    this.holder.removeChild( dot );
  }, this );
};

PageDots.prototype.updateSelected = function() {
  // remove selected class on previous
  if ( this.selectedDot ) {
    this.selectedDot.className = 'dot';
    this.selectedDot.removeAttribute('aria-current');
  }
  // don't proceed if no dots
  if ( !this.dots.length ) {
    return;
  }
  this.selectedDot = this.dots[ this.parent.selectedIndex ];
  this.selectedDot.className = 'dot is-selected';
  this.selectedDot.setAttribute( 'aria-current', 'step' );
};

PageDots.prototype.onTap = // old method name, backwards-compatible
PageDots.prototype.onClick = function( event ) {
  var target = event.target;
  // only care about dot clicks
  if ( target.nodeName != 'LI' ) {
    return;
  }

  this.parent.uiChange();
  var index = this.dots.indexOf( target );
  this.parent.select( index );
};

PageDots.prototype.destroy = function() {
  this.deactivate();
  this.allOff();
};

Flickity.PageDots = PageDots;

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pageDots: true
});

Flickity.createMethods.push('_createPageDots');

var proto = Flickity.prototype;

proto._createPageDots = function() {
  if ( !this.options.pageDots ) {
    return;
  }
  this.pageDots = new PageDots( this );
  // events
  this.on( 'activate', this.activatePageDots );
  this.on( 'select', this.updateSelectedPageDots );
  this.on( 'cellChange', this.updatePageDots );
  this.on( 'resize', this.updatePageDots );
  this.on( 'deactivate', this.deactivatePageDots );
};

proto.activatePageDots = function() {
  this.pageDots.activate();
};

proto.updateSelectedPageDots = function() {
  this.pageDots.updateSelected();
};

proto.updatePageDots = function() {
  this.pageDots.setDots();
};

proto.deactivatePageDots = function() {
  this.pageDots.deactivate();
};

// -----  ----- //

Flickity.PageDots = PageDots;

return Flickity;

}));


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// player & autoPlay
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(4),
      __webpack_require__(0),
      __webpack_require__(1)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( EvEmitter, utils, Flickity ) {
      return factory( EvEmitter, utils, Flickity );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      require('ev-emitter'),
      require('fizzy-ui-utils'),
      require('./flickity')
    );
  } else {
    // browser global
    factory(
      window.EvEmitter,
      window.fizzyUIUtils,
      window.Flickity
    );
  }

}( window, function factory( EvEmitter, utils, Flickity ) {

'use strict';

// -------------------------- Player -------------------------- //

function Player( parent ) {
  this.parent = parent;
  this.state = 'stopped';
  // visibility change event handler
  this.onVisibilityChange = this.visibilityChange.bind( this );
  this.onVisibilityPlay = this.visibilityPlay.bind( this );
}

Player.prototype = Object.create( EvEmitter.prototype );

// start play
Player.prototype.play = function() {
  if ( this.state == 'playing' ) {
    return;
  }
  // do not play if page is hidden, start playing when page is visible
  var isPageHidden = document.hidden;
  if ( isPageHidden ) {
    document.addEventListener( 'visibilitychange', this.onVisibilityPlay );
    return;
  }

  this.state = 'playing';
  // listen to visibility change
  document.addEventListener( 'visibilitychange', this.onVisibilityChange );
  // start ticking
  this.tick();
};

Player.prototype.tick = function() {
  // do not tick if not playing
  if ( this.state != 'playing' ) {
    return;
  }

  var time = this.parent.options.autoPlay;
  // default to 3 seconds
  time = typeof time == 'number' ? time : 3000;
  var _this = this;
  // HACK: reset ticks if stopped and started within interval
  this.clear();
  this.timeout = setTimeout( function() {
    _this.parent.next( true );
    _this.tick();
  }, time );
};

Player.prototype.stop = function() {
  this.state = 'stopped';
  this.clear();
  // remove visibility change event
  document.removeEventListener( 'visibilitychange', this.onVisibilityChange );
};

Player.prototype.clear = function() {
  clearTimeout( this.timeout );
};

Player.prototype.pause = function() {
  if ( this.state == 'playing' ) {
    this.state = 'paused';
    this.clear();
  }
};

Player.prototype.unpause = function() {
  // re-start play if paused
  if ( this.state == 'paused' ) {
    this.play();
  }
};

// pause if page visibility is hidden, unpause if visible
Player.prototype.visibilityChange = function() {
  var isPageHidden = document.hidden;
  this[ isPageHidden ? 'pause' : 'unpause' ]();
};

Player.prototype.visibilityPlay = function() {
  this.play();
  document.removeEventListener( 'visibilitychange', this.onVisibilityPlay );
};

// -------------------------- Flickity -------------------------- //

utils.extend( Flickity.defaults, {
  pauseAutoPlayOnHover: true
});

Flickity.createMethods.push('_createPlayer');
var proto = Flickity.prototype;

proto._createPlayer = function() {
  this.player = new Player( this );

  this.on( 'activate', this.activatePlayer );
  this.on( 'uiChange', this.stopPlayer );
  this.on( 'pointerDown', this.stopPlayer );
  this.on( 'deactivate', this.deactivatePlayer );
};

proto.activatePlayer = function() {
  if ( !this.options.autoPlay ) {
    return;
  }
  this.player.play();
  this.element.addEventListener( 'mouseenter', this );
};

// Player API, don't hate the ... thanks I know where the door is

proto.playPlayer = function() {
  this.player.play();
};

proto.stopPlayer = function() {
  this.player.stop();
};

proto.pausePlayer = function() {
  this.player.pause();
};

proto.unpausePlayer = function() {
  this.player.unpause();
};

proto.deactivatePlayer = function() {
  this.player.stop();
  this.element.removeEventListener( 'mouseenter', this );
};

// ----- mouseenter/leave ----- //

// pause auto-play on hover
proto.onmouseenter = function() {
  if ( !this.options.pauseAutoPlayOnHover ) {
    return;
  }
  this.player.pause();
  this.element.addEventListener( 'mouseleave', this );
};

// resume auto-play on hover off
proto.onmouseleave = function() {
  this.player.unpause();
  this.element.removeEventListener( 'mouseleave', this );
};

// -----  ----- //

Flickity.Player = Player;

return Flickity;

}));


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// add, remove cell
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {

'use strict';

// append cells to a document fragment
function getCellsFragment( cells ) {
  var fragment = document.createDocumentFragment();
  cells.forEach( function( cell ) {
    fragment.appendChild( cell.element );
  });
  return fragment;
}

// -------------------------- add/remove cell prototype -------------------------- //

var proto = Flickity.prototype;

/**
 * Insert, prepend, or append cells
 * @param {Element, Array, NodeList} elems
 * @param {Integer} index
 */
proto.insert = function( elems, index ) {
  var cells = this._makeCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }
  var len = this.cells.length;
  // default to append
  index = index === undefined ? len : index;
  // add cells with document fragment
  var fragment = getCellsFragment( cells );
  // append to slider
  var isAppend = index == len;
  if ( isAppend ) {
    this.slider.appendChild( fragment );
  } else {
    var insertCellElement = this.cells[ index ].element;
    this.slider.insertBefore( fragment, insertCellElement );
  }
  // add to this.cells
  if ( index === 0 ) {
    // prepend, add to start
    this.cells = cells.concat( this.cells );
  } else if ( isAppend ) {
    // append, add to end
    this.cells = this.cells.concat( cells );
  } else {
    // insert in this.cells
    var endCells = this.cells.splice( index, len - index );
    this.cells = this.cells.concat( cells ).concat( endCells );
  }

  this._sizeCells( cells );
  this.cellChange( index, true );
};

proto.append = function( elems ) {
  this.insert( elems, this.cells.length );
};

proto.prepend = function( elems ) {
  this.insert( elems, 0 );
};

/**
 * Remove cells
 * @param {Element, Array, NodeList} elems
 */
proto.remove = function( elems ) {
  var cells = this.getCells( elems );
  if ( !cells || !cells.length ) {
    return;
  }

  var minCellIndex = this.cells.length - 1;
  // remove cells from collection & DOM
  cells.forEach( function( cell ) {
    cell.remove();
    var index = this.cells.indexOf( cell );
    minCellIndex = Math.min( index, minCellIndex );
    utils.removeFrom( this.cells, cell );
  }, this );

  this.cellChange( minCellIndex, true );
};

/**
 * logic to be run after a cell's size changes
 * @param {Element} elem - cell's element
 */
proto.cellSizeChange = function( elem ) {
  var cell = this.getCell( elem );
  if ( !cell ) {
    return;
  }
  cell.getSize();

  var index = this.cells.indexOf( cell );
  this.cellChange( index );
};

/**
 * logic any time a cell is changed: added, removed, or size changed
 * @param {Integer} changedCellIndex - index of the changed cell, optional
 */
proto.cellChange = function( changedCellIndex, isPositioningSlider ) {
  var prevSelectedElem = this.selectedElement;
  this._positionCells( changedCellIndex );
  this._getWrapShiftCells();
  this.setGallerySize();
  // update selectedIndex
  // try to maintain position & select previous selected element
  var cell = this.getCell( prevSelectedElem );
  if ( cell ) {
    this.selectedIndex = this.getCellSlideIndex( cell );
  }
  this.selectedIndex = Math.min( this.slides.length - 1, this.selectedIndex );

  this.emitEvent( 'cellChange', [ changedCellIndex ] );
  // position slider
  this.select( this.selectedIndex );
  // do not position slider after lazy load
  if ( isPositioningSlider ) {
    this.positionSliderAtSelected();
  }
};

// -----  ----- //

return Flickity;

}));


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// lazyload
( function( window, factory ) {
  // universal module definition
  /* jshint strict: false */
  if ( true ) {
    // AMD
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [
      __webpack_require__(1),
      __webpack_require__(0)
    ], __WEBPACK_AMD_DEFINE_RESULT__ = (function( Flickity, utils ) {
      return factory( window, Flickity, utils );
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
      window,
      require('./flickity'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    factory(
      window,
      window.Flickity,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, Flickity, utils ) {
'use strict';

Flickity.createMethods.push('_createLazyload');
var proto = Flickity.prototype;

proto._createLazyload = function() {
  this.on( 'select', this.lazyLoad );
};

proto.lazyLoad = function() {
  var lazyLoad = this.options.lazyLoad;
  if ( !lazyLoad ) {
    return;
  }
  // get adjacent cells, use lazyLoad option for adjacent count
  var adjCount = typeof lazyLoad == 'number' ? lazyLoad : 0;
  var cellElems = this.getAdjacentCellElements( adjCount );
  // get lazy images in those cells
  var lazyImages = [];
  cellElems.forEach( function( cellElem ) {
    var lazyCellImages = getCellLazyImages( cellElem );
    lazyImages = lazyImages.concat( lazyCellImages );
  });
  // load lazy images
  lazyImages.forEach( function( img ) {
    new LazyLoader( img, this );
  }, this );
};

function getCellLazyImages( cellElem ) {
  // check if cell element is lazy image
  if ( cellElem.nodeName == 'IMG' ) {
    var lazyloadAttr = cellElem.getAttribute('data-flickity-lazyload');
    var srcAttr = cellElem.getAttribute('data-flickity-lazyload-src');
    var srcsetAttr = cellElem.getAttribute('data-flickity-lazyload-srcset');
    if ( lazyloadAttr || srcAttr || srcsetAttr ) {
      return [ cellElem ];
    }
  }
  // select lazy images in cell
  var lazySelector = 'img[data-flickity-lazyload], ' +
    'img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]';
  var imgs = cellElem.querySelectorAll( lazySelector );
  return utils.makeArray( imgs );
}

// -------------------------- LazyLoader -------------------------- //

/**
 * class to handle loading images
 */
function LazyLoader( img, flickity ) {
  this.img = img;
  this.flickity = flickity;
  this.load();
}

LazyLoader.prototype.handleEvent = utils.handleEvent;

LazyLoader.prototype.load = function() {
  this.img.addEventListener( 'load', this );
  this.img.addEventListener( 'error', this );
  // get src & srcset
  var src = this.img.getAttribute('data-flickity-lazyload') ||
    this.img.getAttribute('data-flickity-lazyload-src');
  var srcset = this.img.getAttribute('data-flickity-lazyload-srcset');
  // set src & serset
  this.img.src = src;
  if ( srcset ) {
    this.img.setAttribute( 'srcset', srcset );
  }
  // remove attr
  this.img.removeAttribute('data-flickity-lazyload');
  this.img.removeAttribute('data-flickity-lazyload-src');
  this.img.removeAttribute('data-flickity-lazyload-srcset');
};

LazyLoader.prototype.onload = function( event ) {
  this.complete( event, 'flickity-lazyloaded' );
};

LazyLoader.prototype.onerror = function( event ) {
  this.complete( event, 'flickity-lazyerror' );
};

LazyLoader.prototype.complete = function( event, className ) {
  // unbind events
  this.img.removeEventListener( 'load', this );
  this.img.removeEventListener( 'error', this );

  var cell = this.flickity.getParentCell( this.img );
  var cellElem = cell && cell.element;
  this.flickity.cellSizeChange( cellElem );

  this.img.classList.add( className );
  this.flickity.dispatchEvent( 'lazyLoad', event, cellElem );
};

// -----  ----- //

Flickity.LazyLoader = LazyLoader;

return Flickity;

}));


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {
$('a[href^="#"]').on('click', function(event) {
    var target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        $('html, body').stop().animate({
            scrollTop: target.offset().top
        }, 1000);
    }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {
var hamburger = $(".line"); // hamburger individual line class
// var sidepanel = $(".sidepanel"); // hamburger individual line class
var menu = $(".slidenav"); // site navigation
var main = $(".main-body"); // site body content

$(document).ready(function(){

    $('.hamburger').on( "click", function() {
        $(hamburger).toggleClass("toggle-ico-active");
        $(menu).toggleClass("toggle-menu");
        // $(sidepanel).toggleClass("toggle-active");
        $(main).toggleClass("main-body--active");
    });

    $(".banner").on( "click", function() {

        if ($(menu).hasClass("toggle-menu")) {
            menu.removeClass('toggle-menu');
        }

        if ($(main).hasClass("main--active")) {
            main.removeClass('main--active');
        }

        if ($(hamburger).hasClass("toggle-ico-active")) {
            hamburger.removeClass('toggle-ico-active');
        }
    });
    //
    // if ($('body').hasClass("HomePage")) {
    //     $(main).scroll(function() {
    //         var scroll = $('.main').scrollTop();
    //         if (scroll >= 500) {
    //             sidepanel.removeClass('hide').addClass("show");
    //         } else {
    //             menu.removeClass('toggle-menu');
    //             main.removeClass('main--active');
    //             hamburger.removeClass('toggle-ico-active');
    //             sidepanel.removeClass("show").addClass('hide');
    //             sidepanel.removeClass("toggle-active").addClass('hide');
    //         }
    //     });
    // }
});

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ })
/******/ ]);