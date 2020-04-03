// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/Models/Current.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getCurrentLocation(options) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, ({
      code,
      message
    }) => reject(Object.assign(new Error(message), {
      name: 'PositionError',
      code
    })), options);
  });
}

class Current {
  constructor() {
    this.coords = [];
  } // TODO: IF this is called from the controller handle the error over there


  async getCoords() {
    const data = await getCurrentLocation({
      enableHighAccuracy: true,
      maximumAge: 0
    });
    this.coords = [data.coords.latitude, data.coords.longitude];
  }

  availableCoords() {
    return this.coords.length;
  }

  async getWeather() {
    const api = "6d3b43aab36f5d57f9d8671c01cef53c";
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather'; // TODO: Move .catch if you want to catch the error on so other place.  Ex When the function is called
    // TODO: Remove Units= Metric if you decide to do calculation for C and F

    const response = await fetch(`${endpoint}?lat=${this.coords[0]}&lon=${this.coords[1]}&units=metric&appid=${api}`).catch(handleError);
    this.results = await response.json();
    this.name = this.results.name;
    this.weather = {
      temp: Math.round(this.results.main.temp),
      temp_max: Math.round(this.results.main.temp_max),
      temp_min: Math.round(this.results.main.temp_min),
      description: this.results.weather[0].main,
      icon: this.results.weather[0].icon
    };
  }

}

exports.default = Current;

function handleError(err) {
  console.log('Ups... Something went wrong 💩');
  console.log(err);
}
},{}],"src/js/Models/Search.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Search {
  constructor(query) {
    this.query = query;
  }

  async getWeather() {
    const api = "6d3b43aab36f5d57f9d8671c01cef53c";
    const endpoint = 'http://api.openweathermap.org/data/2.5/weather'; // TODO: Move .catch if you want to catch the error on so other place.  Ex When the function is called

    const response = await fetch(`${endpoint}?q=${this.query}&appid=${api}`).catch(handleError);
    this.results = await response.json(); // console.log(data);
    // console.log(`Your location is ${this.name} and the weather is `);
  }

}

exports.default = Search;

function handleError(err) {
  console.log('Ups... Something went wrong 💩');
  console.log(err);
}
},{}],"src/js/Views/loaderView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearLoader = exports.renderLoader = void 0;

const renderLoader = parent => {
  const html = `
	<div class="loader">
        <div class="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
	`;
  parent.insertAdjacentHTML('afterbegin', html);
};

exports.renderLoader = renderLoader;

const clearLoader = parent => {
  const loader = parent.querySelector('.loader');
  parent.removeChild(loader);
};

exports.clearLoader = clearLoader;
},{}],"src/img/weather/01d.svg":[function(require,module,exports) {
module.exports = "/01d.b9bbb2b9.svg";
},{}],"src/img/weather/01n.svg":[function(require,module,exports) {
module.exports = "/01n.2290e7c6.svg";
},{}],"src/img/weather/02d.svg":[function(require,module,exports) {
module.exports = "/02d.ac486e56.svg";
},{}],"src/img/weather/02n.svg":[function(require,module,exports) {
module.exports = "/02n.259589cf.svg";
},{}],"src/img/weather/03d.svg":[function(require,module,exports) {
module.exports = "/03d.3b6477cc.svg";
},{}],"src/img/weather/03n.svg":[function(require,module,exports) {
module.exports = "/03n.e738d1c9.svg";
},{}],"src/img/weather/04d.svg":[function(require,module,exports) {
module.exports = "/04d.ba777544.svg";
},{}],"src/img/weather/04n.svg":[function(require,module,exports) {
module.exports = "/04n.b521b8fb.svg";
},{}],"src/img/weather/09d.svg":[function(require,module,exports) {
module.exports = "/09d.1c0f43b0.svg";
},{}],"src/img/weather/09n.svg":[function(require,module,exports) {
module.exports = "/09n.a9cec1cf.svg";
},{}],"src/img/weather/10d.svg":[function(require,module,exports) {
module.exports = "/10d.c34c1c43.svg";
},{}],"src/img/weather/10n.svg":[function(require,module,exports) {
module.exports = "/10n.1bf80f05.svg";
},{}],"src/img/weather/11d.svg":[function(require,module,exports) {
module.exports = "/11d.ec065761.svg";
},{}],"src/img/weather/11n.svg":[function(require,module,exports) {
module.exports = "/11n.548174a6.svg";
},{}],"src/img/weather/13d.svg":[function(require,module,exports) {
module.exports = "/13d.32d7ae36.svg";
},{}],"src/img/weather/13n.svg":[function(require,module,exports) {
module.exports = "/13n.40dbd931.svg";
},{}],"src/img/weather/50d.svg":[function(require,module,exports) {
module.exports = "/50d.f89f5290.svg";
},{}],"src/img/weather/50n.svg":[function(require,module,exports) {
module.exports = "/50n.d5bb9ca1.svg";
},{}],"src/img/weather/*.svg":[function(require,module,exports) {
module.exports = {
  "01d": require("./01d.svg"),
  "01n": require("./01n.svg"),
  "02d": require("./02d.svg"),
  "02n": require("./02n.svg"),
  "03d": require("./03d.svg"),
  "03n": require("./03n.svg"),
  "04d": require("./04d.svg"),
  "04n": require("./04n.svg"),
  "09d": require("./09d.svg"),
  "09n": require("./09n.svg"),
  "10d": require("./10d.svg"),
  "10n": require("./10n.svg"),
  "11d": require("./11d.svg"),
  "11n": require("./11n.svg"),
  "13d": require("./13d.svg"),
  "13n": require("./13n.svg"),
  "50d": require("./50d.svg"),
  "50n": require("./50n.svg")
};
},{"./01d.svg":"src/img/weather/01d.svg","./01n.svg":"src/img/weather/01n.svg","./02d.svg":"src/img/weather/02d.svg","./02n.svg":"src/img/weather/02n.svg","./03d.svg":"src/img/weather/03d.svg","./03n.svg":"src/img/weather/03n.svg","./04d.svg":"src/img/weather/04d.svg","./04n.svg":"src/img/weather/04n.svg","./09d.svg":"src/img/weather/09d.svg","./09n.svg":"src/img/weather/09n.svg","./10d.svg":"src/img/weather/10d.svg","./10n.svg":"src/img/weather/10n.svg","./11d.svg":"src/img/weather/11d.svg","./11n.svg":"src/img/weather/11n.svg","./13d.svg":"src/img/weather/13d.svg","./13n.svg":"src/img/weather/13n.svg","./50d.svg":"src/img/weather/50d.svg","./50n.svg":"src/img/weather/50n.svg"}],"src/js/Views/currentView.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderCurrent = void 0;

var _ = _interopRequireDefault(require("../../img/weather/*.svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderCurrent = (result, parent) => {
  const allIcons = Object.keys(_.default).map(key => {
    return [_.default[key]];
  });
  const iconsArray = allIcons.flat();
  let icon = iconsArray.find(icon => icon.match(result.weather.icon));
  const html = `
	<div class="current-location">
	<?xml version="1.0" encoding="UTF-8"?>
	<svg width="64px" height="90px" viewBox="0 0 64 90" version="1.1" xmlns="http://www.w3.org/2000/svg"
		xmlns:xlink="http://www.w3.org/1999/xlink">
		<path
			d="M31.99994,0 C23.67139,0 15.6839543,3.30849594 9.7947801,9.1976701 C3.90560594,15.0868443 0.59711,23.07428 0.59711,31.40283 C0.59711,51.64417 24.49042,81.92902 30.59393,89.33502 C30.9394271,89.755965 31.4553541,89.999964 31.99993,89.999964 C32.5445059,89.999964 33.0604329,89.755965 33.40593,89.33502 C39.50945,81.92902 63.40276,51.64417 63.40276,31.40283 C63.40276,23.0742818 60.0942654,15.0868475 54.2050934,9.19767364 C48.3159214,3.30849976 40.3284882,0 31.99994,0 Z M31.99994,46.9762 C25.7010813,46.9762 20.0224404,43.1818861 17.6119631,37.362503 C15.2014858,31.5431198 16.5338755,24.8447139 20.9878397,20.3907468 C25.441804,15.9367797 32.140209,14.6043857 37.9595937,17.0148593 C43.7789784,19.4253328 47.5733,25.1039713 47.5733,31.40283 C47.5733,40.003754 40.600864,46.9762 31.99994,46.9762 L31.99994,46.9762 Z"
			id="Shape" fill="#FF6D6D" fill-rule="nonzero"></path>
	</svg>Current Location
</div>
<div class="condition">
	<img src="${icon}" alt="" class="weather--icon" />
</div>
<div class="location">${result.name}</div>
<div class="temperature">${result.weather.temp}<span>ºC</span></div>
<div class="condition_text">${result.weather.description}</div>
<div class="minmax">min ${result.weather.temp_min} ºC / max ${result.weather.temp_max} ºC</div>
<div class="next_days">Next 5 days</div>
</div>

	`;
  parent.insertAdjacentHTML('afterbegin', html);
};

exports.renderCurrent = renderCurrent;
},{"../../img/weather/*.svg":"src/img/weather/*.svg"}],"src/js/app.js":[function(require,module,exports) {
"use strict";

var _Current = _interopRequireDefault(require("./Models/Current"));

var _Search = _interopRequireDefault(require("./Models/Search"));

var loader = _interopRequireWildcard(require("./Views/loaderView"));

var currentView = _interopRequireWildcard(require("./Views/currentView"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// MODELS
// VIEWS
const state = {}; // console.log(state);

const search = new _Search.default('Ajax');
search.getWeather(); // ---CURRENT LOCATION CONTROLLER---

const currentController = async () => {
  const parent = document.querySelector('.main');
  loader.renderLoader(parent);
  if (!state.current) state.current = new _Current.default();

  if (state.current.availableCoords() < 2) {
    await state.current.getCoords();
  } // Get weather for current location


  if (state.current.availableCoords() === 2) {
    await state.current.getWeather();
    loader.clearLoader(parent);
    currentView.renderCurrent(state.current, parent);
  }
};

currentController(); // ---SEARCH CONTROLLER---

const controlSearch = async e => {
  e.preventDefault();
  const query = 'Saskatoon';

  if (query) {
    state.search = new _Search.default(query);
    await state.search.getWeather(); // console.log(state.search.results);
  }
}; // Add Event Listeners


const form = document.querySelector('.search--form');
form.addEventListener('submit', controlSearch); // This one is here to make sure to see it when everything is loaded, development purpose
// console.log(state.current);
},{"./Models/Current":"src/js/Models/Current.js","./Models/Search":"src/js/Models/Search.js","./Views/loaderView":"src/js/Views/loaderView.js","./Views/currentView":"src/js/Views/currentView.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55418" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/app.js"], null)
//# sourceMappingURL=/app.77c12427.js.map