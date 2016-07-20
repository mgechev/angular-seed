!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in g||(g[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==m.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=g[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(m.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=g[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return D[e]||(D[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=g[s],f=D[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=v(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=g[e];if(t)t.declarative?p(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=v(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=g[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(e){var r={};if("object"==typeof e||"function"==typeof e){var t=e&&e.hasOwnProperty;if(h)for(var n in e)f(r,e,n)||c(r,e,n,t);else for(var n in e)c(r,e,n,t)}return r["default"]=e,y(r,"__useDefault",{value:!0}),r}function c(e,r,t,n){(!n||r.hasOwnProperty(t))&&(e[t]=r[t])}function f(e,r,t){try{var n;return(n=Object.getOwnPropertyDescriptor(r,t))&&y(e,t,n),!0}catch(o){return!1}}function p(r,t){var n=g[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==m.call(t,u)&&(g[u]?p(u,t):v(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function v(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return _(e.substr(6));var r=g[e];if(!r)throw"Module "+e+" not present.";return a(e),p(e,[]),g[e]=void 0,r.declarative&&y(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var g={},m=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},h=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(x){h=!1}var y;!function(){try{Object.defineProperty({},"a",{})&&(y=Object.defineProperty)}catch(e){y=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var D={},_="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:_,register:r,registerDynamic:t,get:v,set:function(e,r){I[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[d],arguments[d]);o(u);var i=v(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)v(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
$__System.registerDynamic("2", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    var Reflect = this["Reflect"];
    "use strict";
    var Reflect;
    (function(Reflect) {
      var functionPrototype = Object.getPrototypeOf(Function);
      var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
      var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
      var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
      var __Metadata__ = new _WeakMap();
      function decorate(decorators, target, targetKey, targetDescriptor) {
        if (!IsUndefined(targetDescriptor)) {
          if (!IsArray(decorators)) {
            throw new TypeError();
          } else if (!IsObject(target)) {
            throw new TypeError();
          } else if (IsUndefined(targetKey)) {
            throw new TypeError();
          } else if (!IsObject(targetDescriptor)) {
            throw new TypeError();
          }
          targetKey = ToPropertyKey(targetKey);
          return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
        } else if (!IsUndefined(targetKey)) {
          if (!IsArray(decorators)) {
            throw new TypeError();
          } else if (!IsObject(target)) {
            throw new TypeError();
          }
          targetKey = ToPropertyKey(targetKey);
          return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
        } else {
          if (!IsArray(decorators)) {
            throw new TypeError();
          } else if (!IsConstructor(target)) {
            throw new TypeError();
          }
          return DecorateConstructor(decorators, target);
        }
      }
      Reflect.decorate = decorate;
      function metadata(metadataKey, metadataValue) {
        function decorator(target, targetKey) {
          if (!IsUndefined(targetKey)) {
            if (!IsObject(target)) {
              throw new TypeError();
            }
            targetKey = ToPropertyKey(targetKey);
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
          } else {
            if (!IsConstructor(target)) {
              throw new TypeError();
            }
            OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, undefined);
          }
        }
        return decorator;
      }
      Reflect.metadata = metadata;
      function defineMetadata(metadataKey, metadataValue, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
      }
      Reflect.defineMetadata = defineMetadata;
      function hasMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasMetadata(metadataKey, target, targetKey);
      }
      Reflect.hasMetadata = hasMetadata;
      function hasOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
      }
      Reflect.hasOwnMetadata = hasOwnMetadata;
      function getMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetMetadata(metadataKey, target, targetKey);
      }
      Reflect.getMetadata = getMetadata;
      function getOwnMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
      }
      Reflect.getOwnMetadata = getOwnMetadata;
      function getMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryMetadataKeys(target, targetKey);
      }
      Reflect.getMetadataKeys = getMetadataKeys;
      function getOwnMetadataKeys(target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        return OrdinaryOwnMetadataKeys(target, targetKey);
      }
      Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
      function deleteMetadata(metadataKey, target, targetKey) {
        if (!IsObject(target)) {
          throw new TypeError();
        } else if (!IsUndefined(targetKey)) {
          targetKey = ToPropertyKey(targetKey);
        }
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        if (IsUndefined(metadataMap)) {
          return false;
        }
        if (!metadataMap.delete(metadataKey)) {
          return false;
        }
        if (metadataMap.size > 0) {
          return true;
        }
        var targetMetadata = __Metadata__.get(target);
        targetMetadata.delete(targetKey);
        if (targetMetadata.size > 0) {
          return true;
        }
        __Metadata__.delete(target);
        return true;
      }
      Reflect.deleteMetadata = deleteMetadata;
      function DecorateConstructor(decorators, target) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target);
          if (!IsUndefined(decorated)) {
            if (!IsConstructor(decorated)) {
              throw new TypeError();
            }
            target = decorated;
          }
        }
        return target;
      }
      function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          var decorated = decorator(target, propertyKey, descriptor);
          if (!IsUndefined(decorated)) {
            if (!IsObject(decorated)) {
              throw new TypeError();
            }
            descriptor = decorated;
          }
        }
        return descriptor;
      }
      function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
        for (var i = decorators.length - 1; i >= 0; --i) {
          var decorator = decorators[i];
          decorator(target, propertyKey);
        }
      }
      function GetOrCreateMetadataMap(target, targetKey, create) {
        var targetMetadata = __Metadata__.get(target);
        if (!targetMetadata) {
          if (!create) {
            return undefined;
          }
          targetMetadata = new _Map();
          __Metadata__.set(target, targetMetadata);
        }
        var keyMetadata = targetMetadata.get(targetKey);
        if (!keyMetadata) {
          if (!create) {
            return undefined;
          }
          keyMetadata = new _Map();
          targetMetadata.set(targetKey, keyMetadata);
        }
        return keyMetadata;
      }
      function OrdinaryHasMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
          return true;
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
          return OrdinaryHasMetadata(MetadataKey, parent, P);
        }
        return false;
      }
      function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
          return false;
        }
        return Boolean(metadataMap.has(MetadataKey));
      }
      function OrdinaryGetMetadata(MetadataKey, O, P) {
        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
        if (hasOwn) {
          return OrdinaryGetOwnMetadata(MetadataKey, O, P);
        }
        var parent = GetPrototypeOf(O);
        if (parent !== null) {
          return OrdinaryGetMetadata(MetadataKey, parent, P);
        }
        return undefined;
      }
      function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, false);
        if (metadataMap === undefined) {
          return undefined;
        }
        return metadataMap.get(MetadataKey);
      }
      function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
        var metadataMap = GetOrCreateMetadataMap(O, P, true);
        metadataMap.set(MetadataKey, MetadataValue);
      }
      function OrdinaryMetadataKeys(O, P) {
        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
        var parent = GetPrototypeOf(O);
        if (parent === null) {
          return ownKeys;
        }
        var parentKeys = OrdinaryMetadataKeys(parent, P);
        if (parentKeys.length <= 0) {
          return ownKeys;
        }
        if (ownKeys.length <= 0) {
          return parentKeys;
        }
        var set = new _Set();
        var keys = [];
        for (var _i = 0; _i < ownKeys.length; _i++) {
          var key = ownKeys[_i];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        for (var _a = 0; _a < parentKeys.length; _a++) {
          var key = parentKeys[_a];
          var hasKey = set.has(key);
          if (!hasKey) {
            set.add(key);
            keys.push(key);
          }
        }
        return keys;
      }
      function OrdinaryOwnMetadataKeys(target, targetKey) {
        var metadataMap = GetOrCreateMetadataMap(target, targetKey, false);
        var keys = [];
        if (metadataMap) {
          metadataMap.forEach(function(_, key) {
            return keys.push(key);
          });
        }
        return keys;
      }
      function IsUndefined(x) {
        return x === undefined;
      }
      function IsArray(x) {
        return Array.isArray(x);
      }
      function IsObject(x) {
        return typeof x === "object" ? x !== null : typeof x === "function";
      }
      function IsConstructor(x) {
        return typeof x === "function";
      }
      function IsSymbol(x) {
        return typeof x === "symbol";
      }
      function ToPropertyKey(value) {
        if (IsSymbol(value)) {
          return value;
        }
        return String(value);
      }
      function GetPrototypeOf(O) {
        var proto = Object.getPrototypeOf(O);
        if (typeof O !== "function" || O === functionPrototype) {
          return proto;
        }
        if (proto !== functionPrototype) {
          return proto;
        }
        var prototype = O.prototype;
        var prototypeProto = Object.getPrototypeOf(prototype);
        if (prototypeProto == null || prototypeProto === Object.prototype) {
          return proto;
        }
        var constructor = prototypeProto.constructor;
        if (typeof constructor !== "function") {
          return proto;
        }
        if (constructor === O) {
          return proto;
        }
        return constructor;
      }
      function CreateMapPolyfill() {
        var cacheSentinel = {};
        function Map() {
          this._keys = [];
          this._values = [];
          this._cache = cacheSentinel;
        }
        Map.prototype = {
          get size() {
            return this._keys.length;
          },
          has: function(key) {
            if (key === this._cache) {
              return true;
            }
            if (this._find(key) >= 0) {
              this._cache = key;
              return true;
            }
            return false;
          },
          get: function(key) {
            var index = this._find(key);
            if (index >= 0) {
              this._cache = key;
              return this._values[index];
            }
            return undefined;
          },
          set: function(key, value) {
            this.delete(key);
            this._keys.push(key);
            this._values.push(value);
            this._cache = key;
            return this;
          },
          delete: function(key) {
            var index = this._find(key);
            if (index >= 0) {
              this._keys.splice(index, 1);
              this._values.splice(index, 1);
              this._cache = cacheSentinel;
              return true;
            }
            return false;
          },
          clear: function() {
            this._keys.length = 0;
            this._values.length = 0;
            this._cache = cacheSentinel;
          },
          forEach: function(callback, thisArg) {
            var size = this.size;
            for (var i = 0; i < size; ++i) {
              var key = this._keys[i];
              var value = this._values[i];
              this._cache = key;
              callback.call(this, value, key, this);
            }
          },
          _find: function(key) {
            var keys = this._keys;
            var size = keys.length;
            for (var i = 0; i < size; ++i) {
              if (keys[i] === key) {
                return i;
              }
            }
            return -1;
          }
        };
        return Map;
      }
      function CreateSetPolyfill() {
        var cacheSentinel = {};
        function Set() {
          this._map = new _Map();
        }
        Set.prototype = {
          get size() {
            return this._map.length;
          },
          has: function(value) {
            return this._map.has(value);
          },
          add: function(value) {
            this._map.set(value, value);
            return this;
          },
          delete: function(value) {
            return this._map.delete(value);
          },
          clear: function() {
            this._map.clear();
          },
          forEach: function(callback, thisArg) {
            this._map.forEach(callback, thisArg);
          }
        };
        return Set;
      }
      function CreateWeakMapPolyfill() {
        var UUID_SIZE = 16;
        var isNode = typeof global !== "undefined" && typeof module === "object" && typeof module.exports === "object" && typeof require === "function";
        var nodeCrypto = isNode && require("crypto");
        var hasOwn = Object.prototype.hasOwnProperty;
        var keys = {};
        var rootKey = CreateUniqueKey();
        function WeakMap() {
          this._key = CreateUniqueKey();
        }
        WeakMap.prototype = {
          has: function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            if (table) {
              return this._key in table;
            }
            return false;
          },
          get: function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            if (table) {
              return table[this._key];
            }
            return undefined;
          },
          set: function(target, value) {
            var table = GetOrCreateWeakMapTable(target, true);
            table[this._key] = value;
            return this;
          },
          delete: function(target) {
            var table = GetOrCreateWeakMapTable(target, false);
            if (table && this._key in table) {
              return delete table[this._key];
            }
            return false;
          },
          clear: function() {
            this._key = CreateUniqueKey();
          }
        };
        function FillRandomBytes(buffer, size) {
          for (var i = 0; i < size; ++i) {
            buffer[i] = Math.random() * 255 | 0;
          }
        }
        function GenRandomBytes(size) {
          if (nodeCrypto) {
            var data = nodeCrypto.randomBytes(size);
            return data;
          } else if (typeof Uint8Array === "function") {
            var data = new Uint8Array(size);
            if (typeof crypto !== "undefined") {
              crypto.getRandomValues(data);
            } else if (typeof msCrypto !== "undefined") {
              msCrypto.getRandomValues(data);
            } else {
              FillRandomBytes(data, size);
            }
            return data;
          } else {
            var data = new Array(size);
            FillRandomBytes(data, size);
            return data;
          }
        }
        function CreateUUID() {
          var data = GenRandomBytes(UUID_SIZE);
          data[6] = data[6] & 0x4f | 0x40;
          data[8] = data[8] & 0xbf | 0x80;
          var result = "";
          for (var offset = 0; offset < UUID_SIZE; ++offset) {
            var byte = data[offset];
            if (offset === 4 || offset === 6 || offset === 8) {
              result += "-";
            }
            if (byte < 16) {
              result += "0";
            }
            result += byte.toString(16).toLowerCase();
          }
          return result;
        }
        function CreateUniqueKey() {
          var key;
          do {
            key = "@@WeakMap@@" + CreateUUID();
          } while (hasOwn.call(keys, key));
          keys[key] = true;
          return key;
        }
        function GetOrCreateWeakMapTable(target, create) {
          if (!hasOwn.call(target, rootKey)) {
            if (!create) {
              return undefined;
            }
            Object.defineProperty(target, rootKey, {value: Object.create(null)});
          }
          return target[rootKey];
        }
        return WeakMap;
      }
      (function(__global) {
        if (typeof __global.Reflect !== "undefined") {
          if (__global.Reflect !== Reflect) {
            for (var p in Reflect) {
              __global.Reflect[p] = Reflect[p];
            }
          }
        } else {
          __global.Reflect = Reflect;
        }
      })(typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" ? self : typeof global !== "undefined" ? global : Function("return this;")());
    })(Reflect || (Reflect = {}));
    this["Reflect"] = Reflect;
  })();
  return _retrieveGlobal();
});

$__System.register("3", ["4", "5", "6", "7", "8", "9"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var context_2,
      manifest_1,
      worker_1,
      fetch_1,
      cache_1;
  var SW_PROVIDERS;
  var exportedNames_1 = {'SW_PROVIDERS': true};
  function exportStar_1(m) {
    var exports = {};
    for (var n in m) {
      if (n !== "default" && !exportedNames_1.hasOwnProperty(n))
        exports[n] = m[n];
    }
    exports_1(exports);
  }
  return {
    setters: [function(context_2_1) {
      context_2 = context_2_1;
      exportStar_1(context_2_1);
    }, function(manifest_1_1) {
      manifest_1 = manifest_1_1;
      exportStar_1(manifest_1_1);
    }, function(worker_1_1) {
      worker_1 = worker_1_1;
      exportStar_1(worker_1_1);
    }, function(fetch_1_1) {
      fetch_1 = fetch_1_1;
      exportStar_1(fetch_1_1);
    }, function(cache_1_1) {
      cache_1 = cache_1_1;
      exportStar_1(cache_1_1);
    }, function(_1) {}],
    execute: function() {
      exports_1("SW_PROVIDERS", SW_PROVIDERS = [cache_1.CacheManager, context_2.Events, fetch_1.Fetch, manifest_1.ManifestParser, worker_1.ServiceWorker]);
    }
  };
});

$__System.register("7", ["a", "b", "4", "c"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Observable_1,
      context_2,
      operator_1;
  var Fetch;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(context_2_1) {
      context_2 = context_2_1;
    }, function(operator_1_1) {
      operator_1 = operator_1_1;
    }],
    execute: function() {
      Fetch = (function() {
        function Fetch(scope, adapter) {
          this.scope = scope;
          this.adapter = adapter;
        }
        Fetch.prototype.request = function(req, timeout) {
          var _this = this;
          if (timeout === void 0) {
            timeout = null;
          }
          var result = Observable_1.Observable.defer(function() {
            return Observable_1.Observable.fromPromise(_this.scope.fetch(req));
          });
          if (timeout !== null) {
            result = result.let(operator_1.timeoutTo(timeout, undefined));
          }
          return result;
        };
        Fetch.prototype.refresh = function(req, timeout) {
          if (timeout === void 0) {
            timeout = null;
          }
          var request;
          if (typeof req == 'string') {
            request = this.adapter.newRequest(this._cacheBust(req));
          } else {
            request = this.adapter.newRequest(this._cacheBust(req.url), req);
          }
          return this.request(request, timeout);
        };
        Fetch.prototype._cacheBust = function(url) {
          var bust = Math.random();
          if (url.indexOf('?') == -1) {
            return url + "?ngsw-cache-bust=" + bust;
          }
          return url + "&ngsw-cache-bust=" + bust;
        };
        Fetch = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [context_2.WorkerScope, context_2.WorkerAdapter])], Fetch);
        return Fetch;
      }());
      exports_1("Fetch", Fetch);
    }
  };
});

$__System.register("4", ["a", "b"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Observable_1;
  var WorkerScope,
      WorkerAdapter,
      Events;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }],
    execute: function() {
      WorkerScope = (function() {
        function WorkerScope() {}
        return WorkerScope;
      }());
      exports_1("WorkerScope", WorkerScope);
      WorkerAdapter = (function() {
        function WorkerAdapter() {}
        return WorkerAdapter;
      }());
      exports_1("WorkerAdapter", WorkerAdapter);
      Events = (function() {
        function Events(scope) {
          var req;
          this.install = Observable_1.Observable.fromEvent(scope, 'install');
          this.activate = Observable_1.Observable.fromEvent(scope, 'activate');
          this.fetch = Observable_1.Observable.fromEvent(scope, 'fetch');
        }
        Events = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [WorkerScope])], Events);
        return Events;
      }());
      exports_1("Events", Events);
    }
  };
});

$__System.register("8", ["a", "b", "4"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Observable_1,
      context_2;
  var CacheManager;
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(context_2_1) {
      context_2 = context_2_1;
    }],
    execute: function() {
      CacheManager = (function() {
        function CacheManager(scope, adapter) {
          this.adapter = adapter;
          this.caches = scope.caches;
        }
        CacheManager.prototype.normalize = function(req) {
          if (typeof req == 'string') {
            return this.adapter.newRequest(req);
          }
          return req;
        };
        CacheManager.prototype.load = function(cache, req) {
          var _this = this;
          return Observable_1.Observable.defer(function() {
            return Observable_1.Observable.fromPromise(_this.caches.open(cache).then(function(cache) {
              return cache.match(_this.normalize(req));
            }));
          });
        };
        CacheManager.prototype.store = function(cache, req, resp) {
          var _this = this;
          return Observable_1.Observable.defer(function() {
            return Observable_1.Observable.fromPromise(_this.caches.open(cache).then(function(cache) {
              return cache.put(_this.normalize(req), resp);
            }));
          });
        };
        CacheManager.prototype.remove = function(cache) {
          var _this = this;
          return Observable_1.Observable.defer(function() {
            return Observable_1.Observable.fromPromise(_this.caches.delete(cache));
          });
        };
        CacheManager = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [context_2.WorkerScope, context_2.WorkerAdapter])], CacheManager);
        return CacheManager;
      }());
      exports_1("CacheManager", CacheManager);
    }
  };
});

$__System.registerDynamic("d", ["e", "f", "10"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var metadata_1 = $__require('f');
  var forward_ref_1 = $__require('10');
  var AttributeMetadata = (function(_super) {
    __extends(AttributeMetadata, _super);
    function AttributeMetadata(attributeName) {
      _super.call(this);
      this.attributeName = attributeName;
    }
    Object.defineProperty(AttributeMetadata.prototype, "token", {
      get: function() {
        return this;
      },
      enumerable: true,
      configurable: true
    });
    AttributeMetadata.prototype.toString = function() {
      return "@Attribute(" + lang_1.stringify(this.attributeName) + ")";
    };
    return AttributeMetadata;
  }(metadata_1.DependencyMetadata));
  exports.AttributeMetadata = AttributeMetadata;
  var QueryMetadata = (function(_super) {
    __extends(QueryMetadata, _super);
    function QueryMetadata(_selector, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.descendants,
          descendants = _c === void 0 ? false : _c,
          _d = _b.first,
          first = _d === void 0 ? false : _d,
          _e = _b.read,
          read = _e === void 0 ? null : _e;
      _super.call(this);
      this._selector = _selector;
      this.descendants = descendants;
      this.first = first;
      this.read = read;
    }
    Object.defineProperty(QueryMetadata.prototype, "isViewQuery", {
      get: function() {
        return false;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "selector", {
      get: function() {
        return forward_ref_1.resolveForwardRef(this._selector);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "isVarBindingQuery", {
      get: function() {
        return lang_1.isString(this.selector);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryMetadata.prototype, "varBindings", {
      get: function() {
        return this.selector.split(',');
      },
      enumerable: true,
      configurable: true
    });
    QueryMetadata.prototype.toString = function() {
      return "@Query(" + lang_1.stringify(this.selector) + ")";
    };
    return QueryMetadata;
  }(metadata_1.DependencyMetadata));
  exports.QueryMetadata = QueryMetadata;
  var ContentChildrenMetadata = (function(_super) {
    __extends(ContentChildrenMetadata, _super);
    function ContentChildrenMetadata(_selector, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.descendants,
          descendants = _c === void 0 ? false : _c,
          _d = _b.read,
          read = _d === void 0 ? null : _d;
      _super.call(this, _selector, {
        descendants: descendants,
        read: read
      });
    }
    return ContentChildrenMetadata;
  }(QueryMetadata));
  exports.ContentChildrenMetadata = ContentChildrenMetadata;
  var ContentChildMetadata = (function(_super) {
    __extends(ContentChildMetadata, _super);
    function ContentChildMetadata(_selector, _a) {
      var _b = (_a === void 0 ? {} : _a).read,
          read = _b === void 0 ? null : _b;
      _super.call(this, _selector, {
        descendants: true,
        first: true,
        read: read
      });
    }
    return ContentChildMetadata;
  }(QueryMetadata));
  exports.ContentChildMetadata = ContentChildMetadata;
  var ViewQueryMetadata = (function(_super) {
    __extends(ViewQueryMetadata, _super);
    function ViewQueryMetadata(_selector, _a) {
      var _b = _a === void 0 ? {} : _a,
          _c = _b.descendants,
          descendants = _c === void 0 ? false : _c,
          _d = _b.first,
          first = _d === void 0 ? false : _d,
          _e = _b.read,
          read = _e === void 0 ? null : _e;
      _super.call(this, _selector, {
        descendants: descendants,
        first: first,
        read: read
      });
    }
    Object.defineProperty(ViewQueryMetadata.prototype, "isViewQuery", {
      get: function() {
        return true;
      },
      enumerable: true,
      configurable: true
    });
    ViewQueryMetadata.prototype.toString = function() {
      return "@ViewQuery(" + lang_1.stringify(this.selector) + ")";
    };
    return ViewQueryMetadata;
  }(QueryMetadata));
  exports.ViewQueryMetadata = ViewQueryMetadata;
  var ViewChildrenMetadata = (function(_super) {
    __extends(ViewChildrenMetadata, _super);
    function ViewChildrenMetadata(_selector, _a) {
      var _b = (_a === void 0 ? {} : _a).read,
          read = _b === void 0 ? null : _b;
      _super.call(this, _selector, {
        descendants: true,
        read: read
      });
    }
    return ViewChildrenMetadata;
  }(ViewQueryMetadata));
  exports.ViewChildrenMetadata = ViewChildrenMetadata;
  var ViewChildMetadata = (function(_super) {
    __extends(ViewChildMetadata, _super);
    function ViewChildMetadata(_selector, _a) {
      var _b = (_a === void 0 ? {} : _a).read,
          read = _b === void 0 ? null : _b;
      _super.call(this, _selector, {
        descendants: true,
        first: true,
        read: read
      });
    }
    return ViewChildMetadata;
  }(ViewQueryMetadata));
  exports.ViewChildMetadata = ViewChildMetadata;
  return module.exports;
});

$__System.registerDynamic("11", ["e", "f", "12"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var metadata_1 = $__require('f');
  var constants_1 = $__require('12');
  var DirectiveMetadata = (function(_super) {
    __extends(DirectiveMetadata, _super);
    function DirectiveMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          selector = _b.selector,
          inputs = _b.inputs,
          outputs = _b.outputs,
          properties = _b.properties,
          events = _b.events,
          host = _b.host,
          bindings = _b.bindings,
          providers = _b.providers,
          exportAs = _b.exportAs,
          queries = _b.queries;
      _super.call(this);
      this.selector = selector;
      this._inputs = inputs;
      this._properties = properties;
      this._outputs = outputs;
      this._events = events;
      this.host = host;
      this.exportAs = exportAs;
      this.queries = queries;
      this._providers = providers;
      this._bindings = bindings;
    }
    Object.defineProperty(DirectiveMetadata.prototype, "inputs", {
      get: function() {
        return lang_1.isPresent(this._properties) && this._properties.length > 0 ? this._properties : this._inputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "properties", {
      get: function() {
        return this.inputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "outputs", {
      get: function() {
        return lang_1.isPresent(this._events) && this._events.length > 0 ? this._events : this._outputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "events", {
      get: function() {
        return this.outputs;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "providers", {
      get: function() {
        return lang_1.isPresent(this._bindings) && this._bindings.length > 0 ? this._bindings : this._providers;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DirectiveMetadata.prototype, "bindings", {
      get: function() {
        return this.providers;
      },
      enumerable: true,
      configurable: true
    });
    return DirectiveMetadata;
  }(metadata_1.InjectableMetadata));
  exports.DirectiveMetadata = DirectiveMetadata;
  var ComponentMetadata = (function(_super) {
    __extends(ComponentMetadata, _super);
    function ComponentMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          selector = _b.selector,
          inputs = _b.inputs,
          outputs = _b.outputs,
          properties = _b.properties,
          events = _b.events,
          host = _b.host,
          exportAs = _b.exportAs,
          moduleId = _b.moduleId,
          bindings = _b.bindings,
          providers = _b.providers,
          viewBindings = _b.viewBindings,
          viewProviders = _b.viewProviders,
          _c = _b.changeDetection,
          changeDetection = _c === void 0 ? constants_1.ChangeDetectionStrategy.Default : _c,
          queries = _b.queries,
          templateUrl = _b.templateUrl,
          template = _b.template,
          styleUrls = _b.styleUrls,
          styles = _b.styles,
          directives = _b.directives,
          pipes = _b.pipes,
          encapsulation = _b.encapsulation;
      _super.call(this, {
        selector: selector,
        inputs: inputs,
        outputs: outputs,
        properties: properties,
        events: events,
        host: host,
        exportAs: exportAs,
        bindings: bindings,
        providers: providers,
        queries: queries
      });
      this.changeDetection = changeDetection;
      this._viewProviders = viewProviders;
      this._viewBindings = viewBindings;
      this.templateUrl = templateUrl;
      this.template = template;
      this.styleUrls = styleUrls;
      this.styles = styles;
      this.directives = directives;
      this.pipes = pipes;
      this.encapsulation = encapsulation;
      this.moduleId = moduleId;
    }
    Object.defineProperty(ComponentMetadata.prototype, "viewProviders", {
      get: function() {
        return lang_1.isPresent(this._viewBindings) && this._viewBindings.length > 0 ? this._viewBindings : this._viewProviders;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentMetadata.prototype, "viewBindings", {
      get: function() {
        return this.viewProviders;
      },
      enumerable: true,
      configurable: true
    });
    return ComponentMetadata;
  }(DirectiveMetadata));
  exports.ComponentMetadata = ComponentMetadata;
  var PipeMetadata = (function(_super) {
    __extends(PipeMetadata, _super);
    function PipeMetadata(_a) {
      var name = _a.name,
          pure = _a.pure;
      _super.call(this);
      this.name = name;
      this._pure = pure;
    }
    Object.defineProperty(PipeMetadata.prototype, "pure", {
      get: function() {
        return lang_1.isPresent(this._pure) ? this._pure : true;
      },
      enumerable: true,
      configurable: true
    });
    return PipeMetadata;
  }(metadata_1.InjectableMetadata));
  exports.PipeMetadata = PipeMetadata;
  var InputMetadata = (function() {
    function InputMetadata(bindingPropertyName) {
      this.bindingPropertyName = bindingPropertyName;
    }
    return InputMetadata;
  }());
  exports.InputMetadata = InputMetadata;
  var OutputMetadata = (function() {
    function OutputMetadata(bindingPropertyName) {
      this.bindingPropertyName = bindingPropertyName;
    }
    return OutputMetadata;
  }());
  exports.OutputMetadata = OutputMetadata;
  var HostBindingMetadata = (function() {
    function HostBindingMetadata(hostPropertyName) {
      this.hostPropertyName = hostPropertyName;
    }
    return HostBindingMetadata;
  }());
  exports.HostBindingMetadata = HostBindingMetadata;
  var HostListenerMetadata = (function() {
    function HostListenerMetadata(eventName, args) {
      this.eventName = eventName;
      this.args = args;
    }
    return HostListenerMetadata;
  }());
  exports.HostListenerMetadata = HostListenerMetadata;
  return module.exports;
});

$__System.registerDynamic("13", ["d", "11", "14", "15"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var di_1 = $__require('d');
  exports.QueryMetadata = di_1.QueryMetadata;
  exports.ContentChildrenMetadata = di_1.ContentChildrenMetadata;
  exports.ContentChildMetadata = di_1.ContentChildMetadata;
  exports.ViewChildrenMetadata = di_1.ViewChildrenMetadata;
  exports.ViewQueryMetadata = di_1.ViewQueryMetadata;
  exports.ViewChildMetadata = di_1.ViewChildMetadata;
  exports.AttributeMetadata = di_1.AttributeMetadata;
  var directives_1 = $__require('11');
  exports.ComponentMetadata = directives_1.ComponentMetadata;
  exports.DirectiveMetadata = directives_1.DirectiveMetadata;
  exports.PipeMetadata = directives_1.PipeMetadata;
  exports.InputMetadata = directives_1.InputMetadata;
  exports.OutputMetadata = directives_1.OutputMetadata;
  exports.HostBindingMetadata = directives_1.HostBindingMetadata;
  exports.HostListenerMetadata = directives_1.HostListenerMetadata;
  var view_1 = $__require('14');
  exports.ViewMetadata = view_1.ViewMetadata;
  exports.ViewEncapsulation = view_1.ViewEncapsulation;
  var di_2 = $__require('d');
  var directives_2 = $__require('11');
  var view_2 = $__require('14');
  var decorators_1 = $__require('15');
  exports.Component = decorators_1.makeDecorator(directives_2.ComponentMetadata, function(fn) {
    return fn.View = View;
  });
  exports.Directive = decorators_1.makeDecorator(directives_2.DirectiveMetadata);
  var View = decorators_1.makeDecorator(view_2.ViewMetadata, function(fn) {
    return fn.View = View;
  });
  exports.Attribute = decorators_1.makeParamDecorator(di_2.AttributeMetadata);
  exports.Query = decorators_1.makeParamDecorator(di_2.QueryMetadata);
  exports.ContentChildren = decorators_1.makePropDecorator(di_2.ContentChildrenMetadata);
  exports.ContentChild = decorators_1.makePropDecorator(di_2.ContentChildMetadata);
  exports.ViewChildren = decorators_1.makePropDecorator(di_2.ViewChildrenMetadata);
  exports.ViewChild = decorators_1.makePropDecorator(di_2.ViewChildMetadata);
  exports.ViewQuery = decorators_1.makeParamDecorator(di_2.ViewQueryMetadata);
  exports.Pipe = decorators_1.makeDecorator(directives_2.PipeMetadata);
  exports.Input = decorators_1.makePropDecorator(directives_2.InputMetadata);
  exports.Output = decorators_1.makePropDecorator(directives_2.OutputMetadata);
  exports.HostBinding = decorators_1.makePropDecorator(directives_2.HostBindingMetadata);
  exports.HostListener = decorators_1.makePropDecorator(directives_2.HostListenerMetadata);
  return module.exports;
});

$__System.registerDynamic("16", ["15"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var decorators_1 = $__require('15');
  exports.Class = decorators_1.Class;
  return module.exports;
});

$__System.registerDynamic("17", ["18"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ng_zone_1 = $__require('18');
  exports.NgZone = ng_zone_1.NgZone;
  exports.NgZoneError = ng_zone_1.NgZoneError;
  return module.exports;
});

$__System.registerDynamic("19", ["1a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var api_1 = $__require('1a');
  exports.RootRenderer = api_1.RootRenderer;
  exports.Renderer = api_1.Renderer;
  exports.RenderComponentType = api_1.RenderComponentType;
  return module.exports;
});

$__System.registerDynamic("1b", ["1c", "e", "1d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collection_1 = $__require('1c');
  var lang_1 = $__require('e');
  var async_1 = $__require('1d');
  var QueryList = (function() {
    function QueryList() {
      this._dirty = true;
      this._results = [];
      this._emitter = new async_1.EventEmitter();
    }
    Object.defineProperty(QueryList.prototype, "changes", {
      get: function() {
        return this._emitter;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "length", {
      get: function() {
        return this._results.length;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "first", {
      get: function() {
        return collection_1.ListWrapper.first(this._results);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(QueryList.prototype, "last", {
      get: function() {
        return collection_1.ListWrapper.last(this._results);
      },
      enumerable: true,
      configurable: true
    });
    QueryList.prototype.map = function(fn) {
      return this._results.map(fn);
    };
    QueryList.prototype.filter = function(fn) {
      return this._results.filter(fn);
    };
    QueryList.prototype.reduce = function(fn, init) {
      return this._results.reduce(fn, init);
    };
    QueryList.prototype.forEach = function(fn) {
      this._results.forEach(fn);
    };
    QueryList.prototype.toArray = function() {
      return collection_1.ListWrapper.clone(this._results);
    };
    QueryList.prototype[lang_1.getSymbolIterator()] = function() {
      return this._results[lang_1.getSymbolIterator()]();
    };
    QueryList.prototype.toString = function() {
      return this._results.toString();
    };
    QueryList.prototype.reset = function(res) {
      this._results = collection_1.ListWrapper.flatten(res);
      this._dirty = false;
    };
    QueryList.prototype.notifyOnChanges = function() {
      this._emitter.emit(this);
    };
    QueryList.prototype.setDirty = function() {
      this._dirty = true;
    };
    Object.defineProperty(QueryList.prototype, "dirty", {
      get: function() {
        return this._dirty;
      },
      enumerable: true,
      configurable: true
    });
    return QueryList;
  }());
  exports.QueryList = QueryList;
  return module.exports;
});

$__System.registerDynamic("1e", ["1f", "1b", "20", "21", "22", "23", "24", "25", "26"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var component_resolver_1 = $__require('1f');
  exports.ComponentResolver = component_resolver_1.ComponentResolver;
  var query_list_1 = $__require('1b');
  exports.QueryList = query_list_1.QueryList;
  var dynamic_component_loader_1 = $__require('20');
  exports.DynamicComponentLoader = dynamic_component_loader_1.DynamicComponentLoader;
  var element_ref_1 = $__require('21');
  exports.ElementRef = element_ref_1.ElementRef;
  var template_ref_1 = $__require('22');
  exports.TemplateRef = template_ref_1.TemplateRef;
  var view_ref_1 = $__require('23');
  exports.EmbeddedViewRef = view_ref_1.EmbeddedViewRef;
  exports.ViewRef = view_ref_1.ViewRef;
  var view_container_ref_1 = $__require('24');
  exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
  var component_factory_1 = $__require('25');
  exports.ComponentRef = component_factory_1.ComponentRef;
  exports.ComponentFactory = component_factory_1.ComponentFactory;
  var exceptions_1 = $__require('26');
  exports.ExpressionChangedAfterItHasBeenCheckedException = exceptions_1.ExpressionChangedAfterItHasBeenCheckedException;
  return module.exports;
});

$__System.registerDynamic("27", ["28"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var change_detection_1 = $__require('28');
  exports.ChangeDetectionStrategy = change_detection_1.ChangeDetectionStrategy;
  exports.ChangeDetectorRef = change_detection_1.ChangeDetectorRef;
  exports.WrappedValue = change_detection_1.WrappedValue;
  exports.SimpleChange = change_detection_1.SimpleChange;
  exports.DefaultIterableDiffer = change_detection_1.DefaultIterableDiffer;
  exports.IterableDiffers = change_detection_1.IterableDiffers;
  exports.KeyValueDiffers = change_detection_1.KeyValueDiffers;
  exports.CollectionChangeRecord = change_detection_1.CollectionChangeRecord;
  exports.KeyValueChangeRecord = change_detection_1.KeyValueChangeRecord;
  return module.exports;
});

$__System.registerDynamic("29", ["2a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var di_1 = $__require('2a');
  exports.PLATFORM_DIRECTIVES = new di_1.OpaqueToken("Platform Directives");
  exports.PLATFORM_PIPES = new di_1.OpaqueToken("Platform Pipes");
  return module.exports;
});

$__System.registerDynamic("2b", ["2c", "2d", "2e", "2f", "30"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var console_1 = $__require('2c');
  var reflection_1 = $__require('2d');
  var reflector_reader_1 = $__require('2e');
  var testability_1 = $__require('2f');
  var application_ref_1 = $__require('30');
  function _reflector() {
    return reflection_1.reflector;
  }
  var __unused;
  exports.PLATFORM_COMMON_PROVIDERS = [application_ref_1.PLATFORM_CORE_PROVIDERS, {
    provide: reflection_1.Reflector,
    useFactory: _reflector,
    deps: []
  }, {
    provide: reflector_reader_1.ReflectorReader,
    useExisting: reflection_1.Reflector
  }, testability_1.TestabilityRegistry, console_1.Console];
  return module.exports;
});

$__System.registerDynamic("31", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var NgZoneError = (function() {
    function NgZoneError(error, stackTrace) {
      this.error = error;
      this.stackTrace = stackTrace;
    }
    return NgZoneError;
  }());
  exports.NgZoneError = NgZoneError;
  var NgZoneImpl = (function() {
    function NgZoneImpl(_a) {
      var _this = this;
      var trace = _a.trace,
          onEnter = _a.onEnter,
          onLeave = _a.onLeave,
          setMicrotask = _a.setMicrotask,
          setMacrotask = _a.setMacrotask,
          onError = _a.onError;
      this.onEnter = onEnter;
      this.onLeave = onLeave;
      this.setMicrotask = setMicrotask;
      this.setMacrotask = setMacrotask;
      this.onError = onError;
      if (Zone) {
        this.outer = this.inner = Zone.current;
        if (Zone['wtfZoneSpec']) {
          this.inner = this.inner.fork(Zone['wtfZoneSpec']);
        }
        if (trace && Zone['longStackTraceZoneSpec']) {
          this.inner = this.inner.fork(Zone['longStackTraceZoneSpec']);
        }
        this.inner = this.inner.fork({
          name: 'angular',
          properties: {'isAngularZone': true},
          onInvokeTask: function(delegate, current, target, task, applyThis, applyArgs) {
            try {
              _this.onEnter();
              return delegate.invokeTask(target, task, applyThis, applyArgs);
            } finally {
              _this.onLeave();
            }
          },
          onInvoke: function(delegate, current, target, callback, applyThis, applyArgs, source) {
            try {
              _this.onEnter();
              return delegate.invoke(target, callback, applyThis, applyArgs, source);
            } finally {
              _this.onLeave();
            }
          },
          onHasTask: function(delegate, current, target, hasTaskState) {
            delegate.hasTask(target, hasTaskState);
            if (current == target) {
              if (hasTaskState.change == 'microTask') {
                _this.setMicrotask(hasTaskState.microTask);
              } else if (hasTaskState.change == 'macroTask') {
                _this.setMacrotask(hasTaskState.macroTask);
              }
            }
          },
          onHandleError: function(delegate, current, target, error) {
            delegate.handleError(target, error);
            _this.onError(new NgZoneError(error, error.stack));
            return false;
          }
        });
      } else {
        throw new Error('Angular requires Zone.js polyfill.');
      }
    }
    NgZoneImpl.isInAngularZone = function() {
      return Zone.current.get('isAngularZone') === true;
    };
    NgZoneImpl.prototype.runInner = function(fn) {
      return this.inner.run(fn);
    };
    ;
    NgZoneImpl.prototype.runInnerGuarded = function(fn) {
      return this.inner.runGuarded(fn);
    };
    ;
    NgZoneImpl.prototype.runOuter = function(fn) {
      return this.outer.run(fn);
    };
    ;
    return NgZoneImpl;
  }());
  exports.NgZoneImpl = NgZoneImpl;
  return module.exports;
});

$__System.registerDynamic("18", ["1d", "31", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var async_1 = $__require('1d');
  var ng_zone_impl_1 = $__require('31');
  var exceptions_1 = $__require('32');
  var ng_zone_impl_2 = $__require('31');
  exports.NgZoneError = ng_zone_impl_2.NgZoneError;
  var NgZone = (function() {
    function NgZone(_a) {
      var _this = this;
      var _b = _a.enableLongStackTrace,
          enableLongStackTrace = _b === void 0 ? false : _b;
      this._hasPendingMicrotasks = false;
      this._hasPendingMacrotasks = false;
      this._isStable = true;
      this._nesting = 0;
      this._onUnstable = new async_1.EventEmitter(false);
      this._onMicrotaskEmpty = new async_1.EventEmitter(false);
      this._onStable = new async_1.EventEmitter(false);
      this._onErrorEvents = new async_1.EventEmitter(false);
      this._zoneImpl = new ng_zone_impl_1.NgZoneImpl({
        trace: enableLongStackTrace,
        onEnter: function() {
          _this._nesting++;
          if (_this._isStable) {
            _this._isStable = false;
            _this._onUnstable.emit(null);
          }
        },
        onLeave: function() {
          _this._nesting--;
          _this._checkStable();
        },
        setMicrotask: function(hasMicrotasks) {
          _this._hasPendingMicrotasks = hasMicrotasks;
          _this._checkStable();
        },
        setMacrotask: function(hasMacrotasks) {
          _this._hasPendingMacrotasks = hasMacrotasks;
        },
        onError: function(error) {
          return _this._onErrorEvents.emit(error);
        }
      });
    }
    NgZone.isInAngularZone = function() {
      return ng_zone_impl_1.NgZoneImpl.isInAngularZone();
    };
    NgZone.assertInAngularZone = function() {
      if (!ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
        throw new exceptions_1.BaseException('Expected to be in Angular Zone, but it is not!');
      }
    };
    NgZone.assertNotInAngularZone = function() {
      if (ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
        throw new exceptions_1.BaseException('Expected to not be in Angular Zone, but it is!');
      }
    };
    NgZone.prototype._checkStable = function() {
      var _this = this;
      if (this._nesting == 0) {
        if (!this._hasPendingMicrotasks && !this._isStable) {
          try {
            this._nesting++;
            this._onMicrotaskEmpty.emit(null);
          } finally {
            this._nesting--;
            if (!this._hasPendingMicrotasks) {
              try {
                this.runOutsideAngular(function() {
                  return _this._onStable.emit(null);
                });
              } finally {
                this._isStable = true;
              }
            }
          }
        }
      }
    };
    ;
    Object.defineProperty(NgZone.prototype, "onUnstable", {
      get: function() {
        return this._onUnstable;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
      get: function() {
        return this._onMicrotaskEmpty;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onStable", {
      get: function() {
        return this._onStable;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onError", {
      get: function() {
        return this._onErrorEvents;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
      get: function() {
        return this._hasPendingMicrotasks;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
      get: function() {
        return this._hasPendingMacrotasks;
      },
      enumerable: true,
      configurable: true
    });
    NgZone.prototype.run = function(fn) {
      return this._zoneImpl.runInner(fn);
    };
    NgZone.prototype.runGuarded = function(fn) {
      return this._zoneImpl.runInnerGuarded(fn);
    };
    NgZone.prototype.runOutsideAngular = function(fn) {
      return this._zoneImpl.runOuter(fn);
    };
    return NgZone;
  }());
  exports.NgZone = NgZone;
  return module.exports;
});

$__System.registerDynamic("2f", ["1c", "e", "32", "18", "1d", "33"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collection_1 = $__require('1c');
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var ng_zone_1 = $__require('18');
  var async_1 = $__require('1d');
  var decorators_1 = $__require('33');
  var Testability = (function() {
    function Testability(_ngZone) {
      this._ngZone = _ngZone;
      this._pendingCount = 0;
      this._isZoneStable = true;
      this._didWork = false;
      this._callbacks = [];
      this._watchAngularEvents();
    }
    Testability.prototype._watchAngularEvents = function() {
      var _this = this;
      async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, function(_) {
        _this._didWork = true;
        _this._isZoneStable = false;
      });
      this._ngZone.runOutsideAngular(function() {
        async_1.ObservableWrapper.subscribe(_this._ngZone.onStable, function(_) {
          ng_zone_1.NgZone.assertNotInAngularZone();
          lang_1.scheduleMicroTask(function() {
            _this._isZoneStable = true;
            _this._runCallbacksIfReady();
          });
        });
      });
    };
    Testability.prototype.increasePendingRequestCount = function() {
      this._pendingCount += 1;
      this._didWork = true;
      return this._pendingCount;
    };
    Testability.prototype.decreasePendingRequestCount = function() {
      this._pendingCount -= 1;
      if (this._pendingCount < 0) {
        throw new exceptions_1.BaseException('pending async requests below zero');
      }
      this._runCallbacksIfReady();
      return this._pendingCount;
    };
    Testability.prototype.isStable = function() {
      return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    };
    Testability.prototype._runCallbacksIfReady = function() {
      var _this = this;
      if (this.isStable()) {
        lang_1.scheduleMicroTask(function() {
          while (_this._callbacks.length !== 0) {
            (_this._callbacks.pop())(_this._didWork);
          }
          _this._didWork = false;
        });
      } else {
        this._didWork = true;
      }
    };
    Testability.prototype.whenStable = function(callback) {
      this._callbacks.push(callback);
      this._runCallbacksIfReady();
    };
    Testability.prototype.getPendingRequestCount = function() {
      return this._pendingCount;
    };
    Testability.prototype.findBindings = function(using, provider, exactMatch) {
      return [];
    };
    Testability.prototype.findProviders = function(using, provider, exactMatch) {
      return [];
    };
    Testability.decorators = [{type: decorators_1.Injectable}];
    Testability.ctorParameters = [{type: ng_zone_1.NgZone}];
    return Testability;
  }());
  exports.Testability = Testability;
  var TestabilityRegistry = (function() {
    function TestabilityRegistry() {
      this._applications = new collection_1.Map();
      _testabilityGetter.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function(token, testability) {
      this._applications.set(token, testability);
    };
    TestabilityRegistry.prototype.getTestability = function(elem) {
      return this._applications.get(elem);
    };
    TestabilityRegistry.prototype.getAllTestabilities = function() {
      return collection_1.MapWrapper.values(this._applications);
    };
    TestabilityRegistry.prototype.getAllRootElements = function() {
      return collection_1.MapWrapper.keys(this._applications);
    };
    TestabilityRegistry.prototype.findTestabilityInTree = function(elem, findInAncestors) {
      if (findInAncestors === void 0) {
        findInAncestors = true;
      }
      return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    TestabilityRegistry.decorators = [{type: decorators_1.Injectable}];
    TestabilityRegistry.ctorParameters = [];
    return TestabilityRegistry;
  }());
  exports.TestabilityRegistry = TestabilityRegistry;
  var _NoopGetTestability = (function() {
    function _NoopGetTestability() {}
    _NoopGetTestability.prototype.addToWindow = function(registry) {};
    _NoopGetTestability.prototype.findTestabilityInTree = function(registry, elem, findInAncestors) {
      return null;
    };
    return _NoopGetTestability;
  }());
  function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
  }
  exports.setTestabilityGetter = setTestabilityGetter;
  var _testabilityGetter = new _NoopGetTestability();
  return module.exports;
});

$__System.registerDynamic("30", ["18", "e", "2a", "34", "1d", "1c", "2f", "1f", "32", "2c", "35"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ng_zone_1 = $__require('18');
  var lang_1 = $__require('e');
  var di_1 = $__require('2a');
  var application_tokens_1 = $__require('34');
  var async_1 = $__require('1d');
  var collection_1 = $__require('1c');
  var testability_1 = $__require('2f');
  var component_resolver_1 = $__require('1f');
  var exceptions_1 = $__require('32');
  var console_1 = $__require('2c');
  var profile_1 = $__require('35');
  function createNgZone() {
    return new ng_zone_1.NgZone({enableLongStackTrace: lang_1.assertionsEnabled()});
  }
  exports.createNgZone = createNgZone;
  var _platform;
  var _inPlatformCreate = false;
  function createPlatform(injector) {
    if (_inPlatformCreate) {
      throw new exceptions_1.BaseException('Already creating a platform...');
    }
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
      throw new exceptions_1.BaseException("There can be only one platform. Destroy the previous one to create a new one.");
    }
    lang_1.lockMode();
    _inPlatformCreate = true;
    try {
      _platform = injector.get(PlatformRef);
    } finally {
      _inPlatformCreate = false;
    }
    return _platform;
  }
  exports.createPlatform = createPlatform;
  function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (lang_1.isBlank(platform)) {
      throw new exceptions_1.BaseException('Not platform exists!');
    }
    if (lang_1.isPresent(platform) && lang_1.isBlank(platform.injector.get(requiredToken, null))) {
      throw new exceptions_1.BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
  }
  exports.assertPlatform = assertPlatform;
  function disposePlatform() {
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
      _platform.dispose();
    }
  }
  exports.disposePlatform = disposePlatform;
  function getPlatform() {
    return lang_1.isPresent(_platform) && !_platform.disposed ? _platform : null;
  }
  exports.getPlatform = getPlatform;
  function coreBootstrap(injector, componentFactory) {
    var appRef = injector.get(ApplicationRef);
    return appRef.bootstrap(componentFactory);
  }
  exports.coreBootstrap = coreBootstrap;
  function coreLoadAndBootstrap(injector, componentType) {
    var appRef = injector.get(ApplicationRef);
    return appRef.run(function() {
      var componentResolver = injector.get(component_resolver_1.ComponentResolver);
      return async_1.PromiseWrapper.all([componentResolver.resolveComponent(componentType), appRef.waitForAsyncInitializers()]).then(function(arr) {
        return appRef.bootstrap(arr[0]);
      });
    });
  }
  exports.coreLoadAndBootstrap = coreLoadAndBootstrap;
  var PlatformRef = (function() {
    function PlatformRef() {}
    Object.defineProperty(PlatformRef.prototype, "injector", {
      get: function() {
        throw exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(PlatformRef.prototype, "disposed", {
      get: function() {
        throw exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return PlatformRef;
  }());
  exports.PlatformRef = PlatformRef;
  var PlatformRef_ = (function(_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector) {
      _super.call(this);
      this._injector = _injector;
      this._applications = [];
      this._disposeListeners = [];
      this._disposed = false;
      if (!_inPlatformCreate) {
        throw new exceptions_1.BaseException('Platforms have to be created via `createPlatform`!');
      }
      var inits = _injector.get(application_tokens_1.PLATFORM_INITIALIZER, null);
      if (lang_1.isPresent(inits))
        inits.forEach(function(init) {
          return init();
        });
    }
    PlatformRef_.prototype.registerDisposeListener = function(dispose) {
      this._disposeListeners.push(dispose);
    };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
      get: function() {
        return this._injector;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "disposed", {
      get: function() {
        return this._disposed;
      },
      enumerable: true,
      configurable: true
    });
    PlatformRef_.prototype.addApplication = function(appRef) {
      this._applications.push(appRef);
    };
    PlatformRef_.prototype.dispose = function() {
      collection_1.ListWrapper.clone(this._applications).forEach(function(app) {
        return app.dispose();
      });
      this._disposeListeners.forEach(function(dispose) {
        return dispose();
      });
      this._disposed = true;
    };
    PlatformRef_.prototype._applicationDisposed = function(app) {
      collection_1.ListWrapper.remove(this._applications, app);
    };
    PlatformRef_.decorators = [{type: di_1.Injectable}];
    PlatformRef_.ctorParameters = [{type: di_1.Injector}];
    return PlatformRef_;
  }(PlatformRef));
  exports.PlatformRef_ = PlatformRef_;
  var ApplicationRef = (function() {
    function ApplicationRef() {}
    Object.defineProperty(ApplicationRef.prototype, "injector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return ApplicationRef;
  }());
  exports.ApplicationRef = ApplicationRef;
  var ApplicationRef_ = (function(_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_platform, _zone, _injector) {
      var _this = this;
      _super.call(this);
      this._platform = _platform;
      this._zone = _zone;
      this._injector = _injector;
      this._bootstrapListeners = [];
      this._disposeListeners = [];
      this._rootComponents = [];
      this._rootComponentTypes = [];
      this._changeDetectorRefs = [];
      this._runningTick = false;
      this._enforceNoNewChanges = false;
      var zone = _injector.get(ng_zone_1.NgZone);
      this._enforceNoNewChanges = lang_1.assertionsEnabled();
      zone.run(function() {
        _this._exceptionHandler = _injector.get(exceptions_1.ExceptionHandler);
      });
      this._asyncInitDonePromise = this.run(function() {
        var inits = _injector.get(application_tokens_1.APP_INITIALIZER, null);
        var asyncInitResults = [];
        var asyncInitDonePromise;
        if (lang_1.isPresent(inits)) {
          for (var i = 0; i < inits.length; i++) {
            var initResult = inits[i]();
            if (lang_1.isPromise(initResult)) {
              asyncInitResults.push(initResult);
            }
          }
        }
        if (asyncInitResults.length > 0) {
          asyncInitDonePromise = async_1.PromiseWrapper.all(asyncInitResults).then(function(_) {
            return _this._asyncInitDone = true;
          });
          _this._asyncInitDone = false;
        } else {
          _this._asyncInitDone = true;
          asyncInitDonePromise = async_1.PromiseWrapper.resolve(true);
        }
        return asyncInitDonePromise;
      });
      async_1.ObservableWrapper.subscribe(zone.onError, function(error) {
        _this._exceptionHandler.call(error.error, error.stackTrace);
      });
      async_1.ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, function(_) {
        _this._zone.run(function() {
          _this.tick();
        });
      });
    }
    ApplicationRef_.prototype.registerBootstrapListener = function(listener) {
      this._bootstrapListeners.push(listener);
    };
    ApplicationRef_.prototype.registerDisposeListener = function(dispose) {
      this._disposeListeners.push(dispose);
    };
    ApplicationRef_.prototype.registerChangeDetector = function(changeDetector) {
      this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function(changeDetector) {
      collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    ApplicationRef_.prototype.waitForAsyncInitializers = function() {
      return this._asyncInitDonePromise;
    };
    ApplicationRef_.prototype.run = function(callback) {
      var _this = this;
      var zone = this.injector.get(ng_zone_1.NgZone);
      var result;
      var completer = async_1.PromiseWrapper.completer();
      zone.run(function() {
        try {
          result = callback();
          if (lang_1.isPromise(result)) {
            async_1.PromiseWrapper.then(result, function(ref) {
              completer.resolve(ref);
            }, function(err, stackTrace) {
              completer.reject(err, stackTrace);
              _this._exceptionHandler.call(err, stackTrace);
            });
          }
        } catch (e) {
          _this._exceptionHandler.call(e, e.stack);
          throw e;
        }
      });
      return lang_1.isPromise(result) ? completer.promise : result;
    };
    ApplicationRef_.prototype.bootstrap = function(componentFactory) {
      var _this = this;
      if (!this._asyncInitDone) {
        throw new exceptions_1.BaseException('Cannot bootstrap as there are still asynchronous initializers running. Wait for them using waitForAsyncInitializers().');
      }
      return this.run(function() {
        _this._rootComponentTypes.push(componentFactory.componentType);
        var compRef = componentFactory.create(_this._injector, [], componentFactory.selector);
        compRef.onDestroy(function() {
          _this._unloadComponent(compRef);
        });
        var testability = compRef.injector.get(testability_1.Testability, null);
        if (lang_1.isPresent(testability)) {
          compRef.injector.get(testability_1.TestabilityRegistry).registerApplication(compRef.location.nativeElement, testability);
        }
        _this._loadComponent(compRef);
        var c = _this._injector.get(console_1.Console);
        if (lang_1.assertionsEnabled()) {
          c.log("Angular 2 is running in the development mode. Call enableProdMode() to enable the production mode.");
        }
        return compRef;
      });
    };
    ApplicationRef_.prototype._loadComponent = function(componentRef) {
      this._changeDetectorRefs.push(componentRef.changeDetectorRef);
      this.tick();
      this._rootComponents.push(componentRef);
      this._bootstrapListeners.forEach(function(listener) {
        return listener(componentRef);
      });
    };
    ApplicationRef_.prototype._unloadComponent = function(componentRef) {
      if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
        return;
      }
      this.unregisterChangeDetector(componentRef.changeDetectorRef);
      collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
      get: function() {
        return this._injector;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
      get: function() {
        return this._zone;
      },
      enumerable: true,
      configurable: true
    });
    ApplicationRef_.prototype.tick = function() {
      if (this._runningTick) {
        throw new exceptions_1.BaseException("ApplicationRef.tick is called recursively");
      }
      var s = ApplicationRef_._tickScope();
      try {
        this._runningTick = true;
        this._changeDetectorRefs.forEach(function(detector) {
          return detector.detectChanges();
        });
        if (this._enforceNoNewChanges) {
          this._changeDetectorRefs.forEach(function(detector) {
            return detector.checkNoChanges();
          });
        }
      } finally {
        this._runningTick = false;
        profile_1.wtfLeave(s);
      }
    };
    ApplicationRef_.prototype.dispose = function() {
      collection_1.ListWrapper.clone(this._rootComponents).forEach(function(ref) {
        return ref.destroy();
      });
      this._disposeListeners.forEach(function(dispose) {
        return dispose();
      });
      this._platform._applicationDisposed(this);
    };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
      get: function() {
        return this._rootComponentTypes;
      },
      enumerable: true,
      configurable: true
    });
    ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
    ApplicationRef_.decorators = [{type: di_1.Injectable}];
    ApplicationRef_.ctorParameters = [{type: PlatformRef_}, {type: ng_zone_1.NgZone}, {type: di_1.Injector}];
    return ApplicationRef_;
  }(ApplicationRef));
  exports.ApplicationRef_ = ApplicationRef_;
  exports.PLATFORM_CORE_PROVIDERS = [PlatformRef_, ({
    provide: PlatformRef,
    useExisting: PlatformRef_
  })];
  exports.APPLICATION_CORE_PROVIDERS = [{
    provide: ng_zone_1.NgZone,
    useFactory: createNgZone,
    deps: []
  }, ApplicationRef_, {
    provide: ApplicationRef,
    useExisting: ApplicationRef_
  }];
  return module.exports;
});

$__System.registerDynamic("20", ["1f", "e", "36", "33"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var component_resolver_1 = $__require('1f');
  var lang_1 = $__require('e');
  var reflective_injector_1 = $__require('36');
  var decorators_1 = $__require('33');
  var DynamicComponentLoader = (function() {
    function DynamicComponentLoader() {}
    return DynamicComponentLoader;
  }());
  exports.DynamicComponentLoader = DynamicComponentLoader;
  var DynamicComponentLoader_ = (function(_super) {
    __extends(DynamicComponentLoader_, _super);
    function DynamicComponentLoader_(_compiler) {
      _super.call(this);
      this._compiler = _compiler;
    }
    DynamicComponentLoader_.prototype.loadAsRoot = function(type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
      return this._compiler.resolveComponent(type).then(function(componentFactory) {
        var componentRef = componentFactory.create(injector, projectableNodes, lang_1.isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
        if (lang_1.isPresent(onDispose)) {
          componentRef.onDestroy(onDispose);
        }
        return componentRef;
      });
    };
    DynamicComponentLoader_.prototype.loadNextToLocation = function(type, location, providers, projectableNodes) {
      if (providers === void 0) {
        providers = null;
      }
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      return this._compiler.resolveComponent(type).then(function(componentFactory) {
        var contextInjector = location.parentInjector;
        var childInjector = lang_1.isPresent(providers) && providers.length > 0 ? reflective_injector_1.ReflectiveInjector.fromResolvedProviders(providers, contextInjector) : contextInjector;
        return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
      });
    };
    DynamicComponentLoader_.decorators = [{type: decorators_1.Injectable}];
    DynamicComponentLoader_.ctorParameters = [{type: component_resolver_1.ComponentResolver}];
    return DynamicComponentLoader_;
  }(DynamicComponentLoader));
  exports.DynamicComponentLoader_ = DynamicComponentLoader_;
  return module.exports;
});

$__System.registerDynamic("37", ["34", "30", "28", "38", "1f", "20"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var application_tokens_1 = $__require('34');
  var application_ref_1 = $__require('30');
  var change_detection_1 = $__require('28');
  var view_utils_1 = $__require('38');
  var component_resolver_1 = $__require('1f');
  var dynamic_component_loader_1 = $__require('20');
  var __unused;
  exports.APPLICATION_COMMON_PROVIDERS = [application_ref_1.APPLICATION_CORE_PROVIDERS, {
    provide: component_resolver_1.ComponentResolver,
    useClass: component_resolver_1.ReflectorComponentResolver
  }, application_tokens_1.APP_ID_RANDOM_PROVIDER, view_utils_1.ViewUtils, {
    provide: change_detection_1.IterableDiffers,
    useValue: change_detection_1.defaultIterableDiffers
  }, {
    provide: change_detection_1.KeyValueDiffers,
    useValue: change_detection_1.defaultKeyValueDiffers
  }, {
    provide: dynamic_component_loader_1.DynamicComponentLoader,
    useClass: dynamic_component_loader_1.DynamicComponentLoader_
  }];
  return module.exports;
});

$__System.registerDynamic("39", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(LifecycleHooks) {
    LifecycleHooks[LifecycleHooks["OnInit"] = 0] = "OnInit";
    LifecycleHooks[LifecycleHooks["OnDestroy"] = 1] = "OnDestroy";
    LifecycleHooks[LifecycleHooks["DoCheck"] = 2] = "DoCheck";
    LifecycleHooks[LifecycleHooks["OnChanges"] = 3] = "OnChanges";
    LifecycleHooks[LifecycleHooks["AfterContentInit"] = 4] = "AfterContentInit";
    LifecycleHooks[LifecycleHooks["AfterContentChecked"] = 5] = "AfterContentChecked";
    LifecycleHooks[LifecycleHooks["AfterViewInit"] = 6] = "AfterViewInit";
    LifecycleHooks[LifecycleHooks["AfterViewChecked"] = 7] = "AfterViewChecked";
  })(exports.LifecycleHooks || (exports.LifecycleHooks = {}));
  var LifecycleHooks = exports.LifecycleHooks;
  exports.LIFECYCLE_HOOKS_VALUES = [LifecycleHooks.OnInit, LifecycleHooks.OnDestroy, LifecycleHooks.DoCheck, LifecycleHooks.OnChanges, LifecycleHooks.AfterContentInit, LifecycleHooks.AfterContentChecked, LifecycleHooks.AfterViewInit, LifecycleHooks.AfterViewChecked];
  return module.exports;
});

$__System.registerDynamic("25", ["e", "32", "38"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var view_utils_1 = $__require('38');
  var ComponentRef = (function() {
    function ComponentRef() {}
    Object.defineProperty(ComponentRef.prototype, "location", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "injector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "instance", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ComponentRef.prototype, "hostView", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ComponentRef.prototype, "changeDetectorRef", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef.prototype, "componentType", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return ComponentRef;
  }());
  exports.ComponentRef = ComponentRef;
  var ComponentRef_ = (function(_super) {
    __extends(ComponentRef_, _super);
    function ComponentRef_(_hostElement, _componentType) {
      _super.call(this);
      this._hostElement = _hostElement;
      this._componentType = _componentType;
    }
    Object.defineProperty(ComponentRef_.prototype, "location", {
      get: function() {
        return this._hostElement.elementRef;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "injector", {
      get: function() {
        return this._hostElement.injector;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ComponentRef_.prototype, "instance", {
      get: function() {
        return this._hostElement.component;
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "hostView", {
      get: function() {
        return this._hostElement.parentView.ref;
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "changeDetectorRef", {
      get: function() {
        return this._hostElement.parentView.ref;
      },
      enumerable: true,
      configurable: true
    });
    ;
    Object.defineProperty(ComponentRef_.prototype, "componentType", {
      get: function() {
        return this._componentType;
      },
      enumerable: true,
      configurable: true
    });
    ComponentRef_.prototype.destroy = function() {
      this._hostElement.parentView.destroy();
    };
    ComponentRef_.prototype.onDestroy = function(callback) {
      this.hostView.onDestroy(callback);
    };
    return ComponentRef_;
  }(ComponentRef));
  exports.ComponentRef_ = ComponentRef_;
  var EMPTY_CONTEXT = new Object();
  var ComponentFactory = (function() {
    function ComponentFactory(selector, _viewFactory, _componentType) {
      this.selector = selector;
      this._viewFactory = _viewFactory;
      this._componentType = _componentType;
    }
    Object.defineProperty(ComponentFactory.prototype, "componentType", {
      get: function() {
        return this._componentType;
      },
      enumerable: true,
      configurable: true
    });
    ComponentFactory.prototype.create = function(injector, projectableNodes, rootSelectorOrNode) {
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      if (rootSelectorOrNode === void 0) {
        rootSelectorOrNode = null;
      }
      var vu = injector.get(view_utils_1.ViewUtils);
      if (lang_1.isBlank(projectableNodes)) {
        projectableNodes = [];
      }
      var hostView = this._viewFactory(vu, injector, null);
      var hostElement = hostView.create(EMPTY_CONTEXT, projectableNodes, rootSelectorOrNode);
      return new ComponentRef_(hostElement, this._componentType);
    };
    return ComponentFactory;
  }());
  exports.ComponentFactory = ComponentFactory;
  return module.exports;
});

$__System.registerDynamic("1f", ["e", "32", "1d", "2d", "25", "33"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var async_1 = $__require('1d');
  var reflection_1 = $__require('2d');
  var component_factory_1 = $__require('25');
  var decorators_1 = $__require('33');
  var ComponentResolver = (function() {
    function ComponentResolver() {}
    return ComponentResolver;
  }());
  exports.ComponentResolver = ComponentResolver;
  function _isComponentFactory(type) {
    return type instanceof component_factory_1.ComponentFactory;
  }
  var ReflectorComponentResolver = (function(_super) {
    __extends(ReflectorComponentResolver, _super);
    function ReflectorComponentResolver() {
      _super.apply(this, arguments);
    }
    ReflectorComponentResolver.prototype.resolveComponent = function(componentType) {
      var metadatas = reflection_1.reflector.annotations(componentType);
      var componentFactory = metadatas.find(_isComponentFactory);
      if (lang_1.isBlank(componentFactory)) {
        throw new exceptions_1.BaseException("No precompiled component " + lang_1.stringify(componentType) + " found");
      }
      return async_1.PromiseWrapper.resolve(componentFactory);
    };
    ReflectorComponentResolver.prototype.clearCache = function() {};
    ReflectorComponentResolver.decorators = [{type: decorators_1.Injectable}];
    return ReflectorComponentResolver;
  }(ComponentResolver));
  exports.ReflectorComponentResolver = ReflectorComponentResolver;
  return module.exports;
});

$__System.registerDynamic("3a", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PromiseCompleter = (function() {
    function PromiseCompleter() {
      var _this = this;
      this.promise = new Promise(function(res, rej) {
        _this.resolve = res;
        _this.reject = rej;
      });
    }
    return PromiseCompleter;
  }());
  exports.PromiseCompleter = PromiseCompleter;
  var PromiseWrapper = (function() {
    function PromiseWrapper() {}
    PromiseWrapper.resolve = function(obj) {
      return Promise.resolve(obj);
    };
    PromiseWrapper.reject = function(obj, _) {
      return Promise.reject(obj);
    };
    PromiseWrapper.catchError = function(promise, onError) {
      return promise.catch(onError);
    };
    PromiseWrapper.all = function(promises) {
      if (promises.length == 0)
        return Promise.resolve([]);
      return Promise.all(promises);
    };
    PromiseWrapper.then = function(promise, success, rejection) {
      return promise.then(success, rejection);
    };
    PromiseWrapper.wrap = function(computation) {
      return new Promise(function(res, rej) {
        try {
          res(computation());
        } catch (e) {
          rej(e);
        }
      });
    };
    PromiseWrapper.scheduleMicrotask = function(computation) {
      PromiseWrapper.then(PromiseWrapper.resolve(null), computation, function(_) {});
    };
    PromiseWrapper.isPromise = function(obj) {
      return obj instanceof Promise;
    };
    PromiseWrapper.completer = function() {
      return new PromiseCompleter();
    };
    return PromiseWrapper;
  }());
  exports.PromiseWrapper = PromiseWrapper;
  return module.exports;
});

$__System.registerDynamic("1d", ["e", "3a", "3b", "3c", "3d", "b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var promise_1 = $__require('3a');
  exports.PromiseWrapper = promise_1.PromiseWrapper;
  exports.PromiseCompleter = promise_1.PromiseCompleter;
  var Subject_1 = $__require('3b');
  var PromiseObservable_1 = $__require('3c');
  var toPromise_1 = $__require('3d');
  var Observable_1 = $__require('b');
  exports.Observable = Observable_1.Observable;
  var Subject_2 = $__require('3b');
  exports.Subject = Subject_2.Subject;
  var TimerWrapper = (function() {
    function TimerWrapper() {}
    TimerWrapper.setTimeout = function(fn, millis) {
      return lang_1.global.setTimeout(fn, millis);
    };
    TimerWrapper.clearTimeout = function(id) {
      lang_1.global.clearTimeout(id);
    };
    TimerWrapper.setInterval = function(fn, millis) {
      return lang_1.global.setInterval(fn, millis);
    };
    TimerWrapper.clearInterval = function(id) {
      lang_1.global.clearInterval(id);
    };
    return TimerWrapper;
  }());
  exports.TimerWrapper = TimerWrapper;
  var ObservableWrapper = (function() {
    function ObservableWrapper() {}
    ObservableWrapper.subscribe = function(emitter, onNext, onError, onComplete) {
      if (onComplete === void 0) {
        onComplete = function() {};
      }
      onError = (typeof onError === "function") && onError || lang_1.noop;
      onComplete = (typeof onComplete === "function") && onComplete || lang_1.noop;
      return emitter.subscribe({
        next: onNext,
        error: onError,
        complete: onComplete
      });
    };
    ObservableWrapper.isObservable = function(obs) {
      return !!obs.subscribe;
    };
    ObservableWrapper.hasSubscribers = function(obs) {
      return obs.observers.length > 0;
    };
    ObservableWrapper.dispose = function(subscription) {
      subscription.unsubscribe();
    };
    ObservableWrapper.callNext = function(emitter, value) {
      emitter.next(value);
    };
    ObservableWrapper.callEmit = function(emitter, value) {
      emitter.emit(value);
    };
    ObservableWrapper.callError = function(emitter, error) {
      emitter.error(error);
    };
    ObservableWrapper.callComplete = function(emitter) {
      emitter.complete();
    };
    ObservableWrapper.fromPromise = function(promise) {
      return PromiseObservable_1.PromiseObservable.create(promise);
    };
    ObservableWrapper.toPromise = function(obj) {
      return toPromise_1.toPromise.call(obj);
    };
    return ObservableWrapper;
  }());
  exports.ObservableWrapper = ObservableWrapper;
  var EventEmitter = (function(_super) {
    __extends(EventEmitter, _super);
    function EventEmitter(isAsync) {
      if (isAsync === void 0) {
        isAsync = true;
      }
      _super.call(this);
      this._isAsync = isAsync;
    }
    EventEmitter.prototype.emit = function(value) {
      _super.prototype.next.call(this, value);
    };
    EventEmitter.prototype.next = function(value) {
      _super.prototype.next.call(this, value);
    };
    EventEmitter.prototype.subscribe = function(generatorOrNext, error, complete) {
      var schedulerFn;
      var errorFn = function(err) {
        return null;
      };
      var completeFn = function() {
        return null;
      };
      if (generatorOrNext && typeof generatorOrNext === 'object') {
        schedulerFn = this._isAsync ? function(value) {
          setTimeout(function() {
            return generatorOrNext.next(value);
          });
        } : function(value) {
          generatorOrNext.next(value);
        };
        if (generatorOrNext.error) {
          errorFn = this._isAsync ? function(err) {
            setTimeout(function() {
              return generatorOrNext.error(err);
            });
          } : function(err) {
            generatorOrNext.error(err);
          };
        }
        if (generatorOrNext.complete) {
          completeFn = this._isAsync ? function() {
            setTimeout(function() {
              return generatorOrNext.complete();
            });
          } : function() {
            generatorOrNext.complete();
          };
        }
      } else {
        schedulerFn = this._isAsync ? function(value) {
          setTimeout(function() {
            return generatorOrNext(value);
          });
        } : function(value) {
          generatorOrNext(value);
        };
        if (error) {
          errorFn = this._isAsync ? function(err) {
            setTimeout(function() {
              return error(err);
            });
          } : function(err) {
            error(err);
          };
        }
        if (complete) {
          completeFn = this._isAsync ? function() {
            setTimeout(function() {
              return complete();
            });
          } : function() {
            complete();
          };
        }
      }
      return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
  }(Subject_1.Subject));
  exports.EventEmitter = EventEmitter;
  return module.exports;
});

$__System.registerDynamic("23", ["32", "12"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var exceptions_1 = $__require('32');
  var constants_1 = $__require('12');
  var ViewRef = (function() {
    function ViewRef() {}
    Object.defineProperty(ViewRef.prototype, "destroyed", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return ViewRef;
  }());
  exports.ViewRef = ViewRef;
  var EmbeddedViewRef = (function(_super) {
    __extends(EmbeddedViewRef, _super);
    function EmbeddedViewRef() {
      _super.apply(this, arguments);
    }
    Object.defineProperty(EmbeddedViewRef.prototype, "context", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(EmbeddedViewRef.prototype, "rootNodes", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return EmbeddedViewRef;
  }(ViewRef));
  exports.EmbeddedViewRef = EmbeddedViewRef;
  var ViewRef_ = (function() {
    function ViewRef_(_view) {
      this._view = _view;
      this._view = _view;
    }
    Object.defineProperty(ViewRef_.prototype, "internalView", {
      get: function() {
        return this._view;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "rootNodes", {
      get: function() {
        return this._view.flatRootNodes;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "context", {
      get: function() {
        return this._view.context;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewRef_.prototype, "destroyed", {
      get: function() {
        return this._view.destroyed;
      },
      enumerable: true,
      configurable: true
    });
    ViewRef_.prototype.markForCheck = function() {
      this._view.markPathToRootAsCheckOnce();
    };
    ViewRef_.prototype.detach = function() {
      this._view.cdMode = constants_1.ChangeDetectionStrategy.Detached;
    };
    ViewRef_.prototype.detectChanges = function() {
      this._view.detectChanges(false);
    };
    ViewRef_.prototype.checkNoChanges = function() {
      this._view.detectChanges(true);
    };
    ViewRef_.prototype.reattach = function() {
      this._view.cdMode = constants_1.ChangeDetectionStrategy.CheckAlways;
      this.markForCheck();
    };
    ViewRef_.prototype.onDestroy = function(callback) {
      this._view.disposables.push(callback);
    };
    ViewRef_.prototype.destroy = function() {
      this._view.destroy();
    };
    return ViewRef_;
  }());
  exports.ViewRef_ = ViewRef_;
  return module.exports;
});

$__System.registerDynamic("3e", ["3f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var injector_1 = $__require('3f');
  var _UNDEFINED = new Object();
  var ElementInjector = (function(_super) {
    __extends(ElementInjector, _super);
    function ElementInjector(_view, _nodeIndex) {
      _super.call(this);
      this._view = _view;
      this._nodeIndex = _nodeIndex;
    }
    ElementInjector.prototype.get = function(token, notFoundValue) {
      if (notFoundValue === void 0) {
        notFoundValue = injector_1.THROW_IF_NOT_FOUND;
      }
      var result = _UNDEFINED;
      if (result === _UNDEFINED) {
        result = this._view.injectorGet(token, this._nodeIndex, _UNDEFINED);
      }
      if (result === _UNDEFINED) {
        result = this._view.parentInjector.get(token, notFoundValue);
      }
      return result;
    };
    return ElementInjector;
  }(injector_1.Injector));
  exports.ElementInjector = ElementInjector;
  return module.exports;
});

$__System.registerDynamic("40", ["1c", "41", "e", "1d", "23", "42", "38", "28", "35", "26", "43", "3e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = $__require('1c');
  var element_1 = $__require('41');
  var lang_1 = $__require('e');
  var async_1 = $__require('1d');
  var view_ref_1 = $__require('23');
  var view_type_1 = $__require('42');
  var view_utils_1 = $__require('38');
  var change_detection_1 = $__require('28');
  var profile_1 = $__require('35');
  var exceptions_1 = $__require('26');
  var debug_context_1 = $__require('43');
  var element_injector_1 = $__require('3e');
  var _scope_check = profile_1.wtfCreateScope("AppView#check(ascii id)");
  var AppView = (function() {
    function AppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode) {
      this.clazz = clazz;
      this.componentType = componentType;
      this.type = type;
      this.viewUtils = viewUtils;
      this.parentInjector = parentInjector;
      this.declarationAppElement = declarationAppElement;
      this.cdMode = cdMode;
      this.contentChildren = [];
      this.viewChildren = [];
      this.viewContainerElement = null;
      this.cdState = change_detection_1.ChangeDetectorState.NeverChecked;
      this.destroyed = false;
      this.ref = new view_ref_1.ViewRef_(this);
      if (type === view_type_1.ViewType.COMPONENT || type === view_type_1.ViewType.HOST) {
        this.renderer = viewUtils.renderComponent(componentType);
      } else {
        this.renderer = declarationAppElement.parentView.renderer;
      }
    }
    AppView.prototype.create = function(context, givenProjectableNodes, rootSelectorOrNode) {
      this.context = context;
      var projectableNodes;
      switch (this.type) {
        case view_type_1.ViewType.COMPONENT:
          projectableNodes = view_utils_1.ensureSlotCount(givenProjectableNodes, this.componentType.slotCount);
          break;
        case view_type_1.ViewType.EMBEDDED:
          projectableNodes = this.declarationAppElement.parentView.projectableNodes;
          break;
        case view_type_1.ViewType.HOST:
          projectableNodes = givenProjectableNodes;
          break;
      }
      this._hasExternalHostElement = lang_1.isPresent(rootSelectorOrNode);
      this.projectableNodes = projectableNodes;
      return this.createInternal(rootSelectorOrNode);
    };
    AppView.prototype.createInternal = function(rootSelectorOrNode) {
      return null;
    };
    AppView.prototype.init = function(rootNodesOrAppElements, allNodes, disposables, subscriptions) {
      this.rootNodesOrAppElements = rootNodesOrAppElements;
      this.allNodes = allNodes;
      this.disposables = disposables;
      this.subscriptions = subscriptions;
      if (this.type === view_type_1.ViewType.COMPONENT) {
        this.declarationAppElement.parentView.viewChildren.push(this);
        this.dirtyParentQueriesInternal();
      }
    };
    AppView.prototype.selectOrCreateHostElement = function(elementName, rootSelectorOrNode, debugInfo) {
      var hostElement;
      if (lang_1.isPresent(rootSelectorOrNode)) {
        hostElement = this.renderer.selectRootElement(rootSelectorOrNode, debugInfo);
      } else {
        hostElement = this.renderer.createElement(null, elementName, debugInfo);
      }
      return hostElement;
    };
    AppView.prototype.injectorGet = function(token, nodeIndex, notFoundResult) {
      return this.injectorGetInternal(token, nodeIndex, notFoundResult);
    };
    AppView.prototype.injectorGetInternal = function(token, nodeIndex, notFoundResult) {
      return notFoundResult;
    };
    AppView.prototype.injector = function(nodeIndex) {
      if (lang_1.isPresent(nodeIndex)) {
        return new element_injector_1.ElementInjector(this, nodeIndex);
      } else {
        return this.parentInjector;
      }
    };
    AppView.prototype.destroy = function() {
      if (this._hasExternalHostElement) {
        this.renderer.detachView(this.flatRootNodes);
      } else if (lang_1.isPresent(this.viewContainerElement)) {
        this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
      }
      this._destroyRecurse();
    };
    AppView.prototype._destroyRecurse = function() {
      if (this.destroyed) {
        return;
      }
      var children = this.contentChildren;
      for (var i = 0; i < children.length; i++) {
        children[i]._destroyRecurse();
      }
      children = this.viewChildren;
      for (var i = 0; i < children.length; i++) {
        children[i]._destroyRecurse();
      }
      this.destroyLocal();
      this.destroyed = true;
    };
    AppView.prototype.destroyLocal = function() {
      var hostElement = this.type === view_type_1.ViewType.COMPONENT ? this.declarationAppElement.nativeElement : null;
      for (var i = 0; i < this.disposables.length; i++) {
        this.disposables[i]();
      }
      for (var i = 0; i < this.subscriptions.length; i++) {
        async_1.ObservableWrapper.dispose(this.subscriptions[i]);
      }
      this.destroyInternal();
      if (this._hasExternalHostElement) {
        this.renderer.detachView(this.flatRootNodes);
      } else if (lang_1.isPresent(this.viewContainerElement)) {
        this.viewContainerElement.detachView(this.viewContainerElement.nestedViews.indexOf(this));
      } else {
        this.dirtyParentQueriesInternal();
      }
      this.renderer.destroyView(hostElement, this.allNodes);
    };
    AppView.prototype.destroyInternal = function() {};
    Object.defineProperty(AppView.prototype, "changeDetectorRef", {
      get: function() {
        return this.ref;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppView.prototype, "parent", {
      get: function() {
        return lang_1.isPresent(this.declarationAppElement) ? this.declarationAppElement.parentView : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppView.prototype, "flatRootNodes", {
      get: function() {
        return view_utils_1.flattenNestedViewRenderNodes(this.rootNodesOrAppElements);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppView.prototype, "lastRootNode", {
      get: function() {
        var lastNode = this.rootNodesOrAppElements.length > 0 ? this.rootNodesOrAppElements[this.rootNodesOrAppElements.length - 1] : null;
        return _findLastRenderNode(lastNode);
      },
      enumerable: true,
      configurable: true
    });
    AppView.prototype.dirtyParentQueriesInternal = function() {};
    AppView.prototype.detectChanges = function(throwOnChange) {
      var s = _scope_check(this.clazz);
      if (this.cdMode === change_detection_1.ChangeDetectionStrategy.Detached || this.cdMode === change_detection_1.ChangeDetectionStrategy.Checked || this.cdState === change_detection_1.ChangeDetectorState.Errored)
        return;
      if (this.destroyed) {
        this.throwDestroyedError('detectChanges');
      }
      this.detectChangesInternal(throwOnChange);
      if (this.cdMode === change_detection_1.ChangeDetectionStrategy.CheckOnce)
        this.cdMode = change_detection_1.ChangeDetectionStrategy.Checked;
      this.cdState = change_detection_1.ChangeDetectorState.CheckedBefore;
      profile_1.wtfLeave(s);
    };
    AppView.prototype.detectChangesInternal = function(throwOnChange) {
      this.detectContentChildrenChanges(throwOnChange);
      this.detectViewChildrenChanges(throwOnChange);
    };
    AppView.prototype.detectContentChildrenChanges = function(throwOnChange) {
      for (var i = 0; i < this.contentChildren.length; ++i) {
        this.contentChildren[i].detectChanges(throwOnChange);
      }
    };
    AppView.prototype.detectViewChildrenChanges = function(throwOnChange) {
      for (var i = 0; i < this.viewChildren.length; ++i) {
        this.viewChildren[i].detectChanges(throwOnChange);
      }
    };
    AppView.prototype.addToContentChildren = function(renderAppElement) {
      renderAppElement.parentView.contentChildren.push(this);
      this.viewContainerElement = renderAppElement;
      this.dirtyParentQueriesInternal();
    };
    AppView.prototype.removeFromContentChildren = function(renderAppElement) {
      collection_1.ListWrapper.remove(renderAppElement.parentView.contentChildren, this);
      this.dirtyParentQueriesInternal();
      this.viewContainerElement = null;
    };
    AppView.prototype.markAsCheckOnce = function() {
      this.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
    };
    AppView.prototype.markPathToRootAsCheckOnce = function() {
      var c = this;
      while (lang_1.isPresent(c) && c.cdMode !== change_detection_1.ChangeDetectionStrategy.Detached) {
        if (c.cdMode === change_detection_1.ChangeDetectionStrategy.Checked) {
          c.cdMode = change_detection_1.ChangeDetectionStrategy.CheckOnce;
        }
        var parentEl = c.type === view_type_1.ViewType.COMPONENT ? c.declarationAppElement : c.viewContainerElement;
        c = lang_1.isPresent(parentEl) ? parentEl.parentView : null;
      }
    };
    AppView.prototype.eventHandler = function(cb) {
      return cb;
    };
    AppView.prototype.throwDestroyedError = function(details) {
      throw new exceptions_1.ViewDestroyedException(details);
    };
    return AppView;
  }());
  exports.AppView = AppView;
  var DebugAppView = (function(_super) {
    __extends(DebugAppView, _super);
    function DebugAppView(clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode, staticNodeDebugInfos) {
      _super.call(this, clazz, componentType, type, viewUtils, parentInjector, declarationAppElement, cdMode);
      this.staticNodeDebugInfos = staticNodeDebugInfos;
      this._currentDebugContext = null;
    }
    DebugAppView.prototype.create = function(context, givenProjectableNodes, rootSelectorOrNode) {
      this._resetDebug();
      try {
        return _super.prototype.create.call(this, context, givenProjectableNodes, rootSelectorOrNode);
      } catch (e) {
        this._rethrowWithContext(e, e.stack);
        throw e;
      }
    };
    DebugAppView.prototype.injectorGet = function(token, nodeIndex, notFoundResult) {
      this._resetDebug();
      try {
        return _super.prototype.injectorGet.call(this, token, nodeIndex, notFoundResult);
      } catch (e) {
        this._rethrowWithContext(e, e.stack);
        throw e;
      }
    };
    DebugAppView.prototype.destroyLocal = function() {
      this._resetDebug();
      try {
        _super.prototype.destroyLocal.call(this);
      } catch (e) {
        this._rethrowWithContext(e, e.stack);
        throw e;
      }
    };
    DebugAppView.prototype.detectChanges = function(throwOnChange) {
      this._resetDebug();
      try {
        _super.prototype.detectChanges.call(this, throwOnChange);
      } catch (e) {
        this._rethrowWithContext(e, e.stack);
        throw e;
      }
    };
    DebugAppView.prototype._resetDebug = function() {
      this._currentDebugContext = null;
    };
    DebugAppView.prototype.debug = function(nodeIndex, rowNum, colNum) {
      return this._currentDebugContext = new debug_context_1.DebugContext(this, nodeIndex, rowNum, colNum);
    };
    DebugAppView.prototype._rethrowWithContext = function(e, stack) {
      if (!(e instanceof exceptions_1.ViewWrappedException)) {
        if (!(e instanceof exceptions_1.ExpressionChangedAfterItHasBeenCheckedException)) {
          this.cdState = change_detection_1.ChangeDetectorState.Errored;
        }
        if (lang_1.isPresent(this._currentDebugContext)) {
          throw new exceptions_1.ViewWrappedException(e, stack, this._currentDebugContext);
        }
      }
    };
    DebugAppView.prototype.eventHandler = function(cb) {
      var _this = this;
      var superHandler = _super.prototype.eventHandler.call(this, cb);
      return function(event) {
        _this._resetDebug();
        try {
          return superHandler(event);
        } catch (e) {
          _this._rethrowWithContext(e, e.stack);
          throw e;
        }
      };
    };
    return DebugAppView;
  }(AppView));
  exports.DebugAppView = DebugAppView;
  function _findLastRenderNode(node) {
    var lastNode;
    if (node instanceof element_1.AppElement) {
      var appEl = node;
      lastNode = appEl.nativeElement;
      if (lang_1.isPresent(appEl.nestedViews)) {
        for (var i = appEl.nestedViews.length - 1; i >= 0; i--) {
          var nestedView = appEl.nestedViews[i];
          if (nestedView.rootNodesOrAppElements.length > 0) {
            lastNode = _findLastRenderNode(nestedView.rootNodesOrAppElements[nestedView.rootNodesOrAppElements.length - 1]);
          }
        }
      }
    } else {
      lastNode = node;
    }
    return lastNode;
  }
  return module.exports;
});

$__System.registerDynamic("44", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(SecurityContext) {
    SecurityContext[SecurityContext["NONE"] = 0] = "NONE";
    SecurityContext[SecurityContext["HTML"] = 1] = "HTML";
    SecurityContext[SecurityContext["STYLE"] = 2] = "STYLE";
    SecurityContext[SecurityContext["SCRIPT"] = 3] = "SCRIPT";
    SecurityContext[SecurityContext["URL"] = 4] = "URL";
    SecurityContext[SecurityContext["RESOURCE_URL"] = 5] = "RESOURCE_URL";
  })(exports.SecurityContext || (exports.SecurityContext = {}));
  var SecurityContext = exports.SecurityContext;
  var SanitizationService = (function() {
    function SanitizationService() {}
    return SanitizationService;
  }());
  exports.SanitizationService = SanitizationService;
  return module.exports;
});

$__System.registerDynamic("21", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ElementRef = (function() {
    function ElementRef(nativeElement) {
      this.nativeElement = nativeElement;
    }
    return ElementRef;
  }());
  exports.ElementRef = ElementRef;
  return module.exports;
});

$__System.registerDynamic("45", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var trace;
  var events;
  function detectWTF() {
    var wtf = lang_1.global['wtf'];
    if (wtf) {
      trace = wtf['trace'];
      if (trace) {
        events = trace['events'];
        return true;
      }
    }
    return false;
  }
  exports.detectWTF = detectWTF;
  function createScope(signature, flags) {
    if (flags === void 0) {
      flags = null;
    }
    return events.createScope(signature, flags);
  }
  exports.createScope = createScope;
  function leave(scope, returnValue) {
    trace.leaveScope(scope, returnValue);
    return returnValue;
  }
  exports.leave = leave;
  function startTimeRange(rangeType, action) {
    return trace.beginTimeRange(rangeType, action);
  }
  exports.startTimeRange = startTimeRange;
  function endTimeRange(range) {
    trace.endTimeRange(range);
  }
  exports.endTimeRange = endTimeRange;
  return module.exports;
});

$__System.registerDynamic("35", ["45"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var impl = $__require('45');
  exports.wtfEnabled = impl.detectWTF();
  function noopScope(arg0, arg1) {
    return null;
  }
  exports.wtfCreateScope = exports.wtfEnabled ? impl.createScope : function(signature, flags) {
    return noopScope;
  };
  exports.wtfLeave = exports.wtfEnabled ? impl.leave : function(s, r) {
    return r;
  };
  exports.wtfStartTimeRange = exports.wtfEnabled ? impl.startTimeRange : function(rangeType, action) {
    return null;
  };
  exports.wtfEndTimeRange = exports.wtfEnabled ? impl.endTimeRange : function(r) {
    return null;
  };
  return module.exports;
});

$__System.registerDynamic("24", ["1c", "32", "e", "35"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collection_1 = $__require('1c');
  var exceptions_1 = $__require('32');
  var lang_1 = $__require('e');
  var profile_1 = $__require('35');
  var ViewContainerRef = (function() {
    function ViewContainerRef() {}
    Object.defineProperty(ViewContainerRef.prototype, "element", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "injector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "parentInjector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef.prototype, "length", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ;
    return ViewContainerRef;
  }());
  exports.ViewContainerRef = ViewContainerRef;
  var ViewContainerRef_ = (function() {
    function ViewContainerRef_(_element) {
      this._element = _element;
      this._createComponentInContainerScope = profile_1.wtfCreateScope('ViewContainerRef#createComponent()');
      this._insertScope = profile_1.wtfCreateScope('ViewContainerRef#insert()');
      this._removeScope = profile_1.wtfCreateScope('ViewContainerRef#remove()');
      this._detachScope = profile_1.wtfCreateScope('ViewContainerRef#detach()');
    }
    ViewContainerRef_.prototype.get = function(index) {
      return this._element.nestedViews[index].ref;
    };
    Object.defineProperty(ViewContainerRef_.prototype, "length", {
      get: function() {
        var views = this._element.nestedViews;
        return lang_1.isPresent(views) ? views.length : 0;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "element", {
      get: function() {
        return this._element.elementRef;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "injector", {
      get: function() {
        return this._element.injector;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ViewContainerRef_.prototype, "parentInjector", {
      get: function() {
        return this._element.parentInjector;
      },
      enumerable: true,
      configurable: true
    });
    ViewContainerRef_.prototype.createEmbeddedView = function(templateRef, context, index) {
      if (context === void 0) {
        context = null;
      }
      if (index === void 0) {
        index = -1;
      }
      var viewRef = templateRef.createEmbeddedView(context);
      this.insert(viewRef, index);
      return viewRef;
    };
    ViewContainerRef_.prototype.createComponent = function(componentFactory, index, injector, projectableNodes) {
      if (index === void 0) {
        index = -1;
      }
      if (injector === void 0) {
        injector = null;
      }
      if (projectableNodes === void 0) {
        projectableNodes = null;
      }
      var s = this._createComponentInContainerScope();
      var contextInjector = lang_1.isPresent(injector) ? injector : this._element.parentInjector;
      var componentRef = componentFactory.create(contextInjector, projectableNodes);
      this.insert(componentRef.hostView, index);
      return profile_1.wtfLeave(s, componentRef);
    };
    ViewContainerRef_.prototype.insert = function(viewRef, index) {
      if (index === void 0) {
        index = -1;
      }
      var s = this._insertScope();
      if (index == -1)
        index = this.length;
      var viewRef_ = viewRef;
      this._element.attachView(viewRef_.internalView, index);
      return profile_1.wtfLeave(s, viewRef_);
    };
    ViewContainerRef_.prototype.indexOf = function(viewRef) {
      return collection_1.ListWrapper.indexOf(this._element.nestedViews, viewRef.internalView);
    };
    ViewContainerRef_.prototype.remove = function(index) {
      if (index === void 0) {
        index = -1;
      }
      var s = this._removeScope();
      if (index == -1)
        index = this.length - 1;
      var view = this._element.detachView(index);
      view.destroy();
      profile_1.wtfLeave(s);
    };
    ViewContainerRef_.prototype.detach = function(index) {
      if (index === void 0) {
        index = -1;
      }
      var s = this._detachScope();
      if (index == -1)
        index = this.length - 1;
      var view = this._element.detachView(index);
      return profile_1.wtfLeave(s, view.ref);
    };
    ViewContainerRef_.prototype.clear = function() {
      for (var i = this.length - 1; i >= 0; i--) {
        this.remove(i);
      }
    };
    return ViewContainerRef_;
  }());
  exports.ViewContainerRef_ = ViewContainerRef_;
  return module.exports;
});

$__System.registerDynamic("41", ["e", "1c", "32", "42", "21", "24"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var exceptions_1 = $__require('32');
  var view_type_1 = $__require('42');
  var element_ref_1 = $__require('21');
  var view_container_ref_1 = $__require('24');
  var AppElement = (function() {
    function AppElement(index, parentIndex, parentView, nativeElement) {
      this.index = index;
      this.parentIndex = parentIndex;
      this.parentView = parentView;
      this.nativeElement = nativeElement;
      this.nestedViews = null;
      this.componentView = null;
    }
    Object.defineProperty(AppElement.prototype, "elementRef", {
      get: function() {
        return new element_ref_1.ElementRef(this.nativeElement);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppElement.prototype, "vcRef", {
      get: function() {
        return new view_container_ref_1.ViewContainerRef_(this);
      },
      enumerable: true,
      configurable: true
    });
    AppElement.prototype.initComponent = function(component, componentConstructorViewQueries, view) {
      this.component = component;
      this.componentConstructorViewQueries = componentConstructorViewQueries;
      this.componentView = view;
    };
    Object.defineProperty(AppElement.prototype, "parentInjector", {
      get: function() {
        return this.parentView.injector(this.parentIndex);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(AppElement.prototype, "injector", {
      get: function() {
        return this.parentView.injector(this.index);
      },
      enumerable: true,
      configurable: true
    });
    AppElement.prototype.mapNestedViews = function(nestedViewClass, callback) {
      var result = [];
      if (lang_1.isPresent(this.nestedViews)) {
        this.nestedViews.forEach(function(nestedView) {
          if (nestedView.clazz === nestedViewClass) {
            result.push(callback(nestedView));
          }
        });
      }
      return result;
    };
    AppElement.prototype.attachView = function(view, viewIndex) {
      if (view.type === view_type_1.ViewType.COMPONENT) {
        throw new exceptions_1.BaseException("Component views can't be moved!");
      }
      var nestedViews = this.nestedViews;
      if (nestedViews == null) {
        nestedViews = [];
        this.nestedViews = nestedViews;
      }
      collection_1.ListWrapper.insert(nestedViews, viewIndex, view);
      var refRenderNode;
      if (viewIndex > 0) {
        var prevView = nestedViews[viewIndex - 1];
        refRenderNode = prevView.lastRootNode;
      } else {
        refRenderNode = this.nativeElement;
      }
      if (lang_1.isPresent(refRenderNode)) {
        view.renderer.attachViewAfter(refRenderNode, view.flatRootNodes);
      }
      view.addToContentChildren(this);
    };
    AppElement.prototype.detachView = function(viewIndex) {
      var view = collection_1.ListWrapper.removeAt(this.nestedViews, viewIndex);
      if (view.type === view_type_1.ViewType.COMPONENT) {
        throw new exceptions_1.BaseException("Component views can't be moved!");
      }
      view.renderer.detachView(view.flatRootNodes);
      view.removeFromContentChildren(this);
      return view;
    };
    return AppElement;
  }());
  exports.AppElement = AppElement;
  return module.exports;
});

$__System.registerDynamic("26", ["32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var exceptions_1 = $__require('32');
  var ExpressionChangedAfterItHasBeenCheckedException = (function(_super) {
    __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
    function ExpressionChangedAfterItHasBeenCheckedException(oldValue, currValue, context) {
      _super.call(this, "Expression has changed after it was checked. " + ("Previous value: '" + oldValue + "'. Current value: '" + currValue + "'"));
    }
    return ExpressionChangedAfterItHasBeenCheckedException;
  }(exceptions_1.BaseException));
  exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
  var ViewWrappedException = (function(_super) {
    __extends(ViewWrappedException, _super);
    function ViewWrappedException(originalException, originalStack, context) {
      _super.call(this, "Error in " + context.source, originalException, originalStack, context);
    }
    return ViewWrappedException;
  }(exceptions_1.WrappedException));
  exports.ViewWrappedException = ViewWrappedException;
  var ViewDestroyedException = (function(_super) {
    __extends(ViewDestroyedException, _super);
    function ViewDestroyedException(details) {
      _super.call(this, "Attempt to use a destroyed view: " + details);
    }
    return ViewDestroyedException;
  }(exceptions_1.BaseException));
  exports.ViewDestroyedException = ViewDestroyedException;
  return module.exports;
});

$__System.registerDynamic("46", ["e", "32", "1c", "2a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var collection_1 = $__require('1c');
  var di_1 = $__require('2a');
  var IterableDiffers = (function() {
    function IterableDiffers(factories) {
      this.factories = factories;
    }
    IterableDiffers.create = function(factories, parent) {
      if (lang_1.isPresent(parent)) {
        var copied = collection_1.ListWrapper.clone(parent.factories);
        factories = factories.concat(copied);
        return new IterableDiffers(factories);
      } else {
        return new IterableDiffers(factories);
      }
    };
    IterableDiffers.extend = function(factories) {
      return new di_1.Provider(IterableDiffers, {
        useFactory: function(parent) {
          if (lang_1.isBlank(parent)) {
            throw new exceptions_1.BaseException('Cannot extend IterableDiffers without a parent injector');
          }
          return IterableDiffers.create(factories, parent);
        },
        deps: [[IterableDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
      });
    };
    IterableDiffers.prototype.find = function(iterable) {
      var factory = this.factories.find(function(f) {
        return f.supports(iterable);
      });
      if (lang_1.isPresent(factory)) {
        return factory;
      } else {
        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + iterable + "' of type '" + lang_1.getTypeNameForDebugging(iterable) + "'");
      }
    };
    return IterableDiffers;
  }());
  exports.IterableDiffers = IterableDiffers;
  return module.exports;
});

$__System.registerDynamic("47", ["32", "1c", "e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var exceptions_1 = $__require('32');
  var collection_1 = $__require('1c');
  var lang_1 = $__require('e');
  var DefaultIterableDifferFactory = (function() {
    function DefaultIterableDifferFactory() {}
    DefaultIterableDifferFactory.prototype.supports = function(obj) {
      return collection_1.isListLikeIterable(obj);
    };
    DefaultIterableDifferFactory.prototype.create = function(cdRef, trackByFn) {
      return new DefaultIterableDiffer(trackByFn);
    };
    return DefaultIterableDifferFactory;
  }());
  exports.DefaultIterableDifferFactory = DefaultIterableDifferFactory;
  var trackByIdentity = function(index, item) {
    return item;
  };
  var DefaultIterableDiffer = (function() {
    function DefaultIterableDiffer(_trackByFn) {
      this._trackByFn = _trackByFn;
      this._length = null;
      this._collection = null;
      this._linkedRecords = null;
      this._unlinkedRecords = null;
      this._previousItHead = null;
      this._itHead = null;
      this._itTail = null;
      this._additionsHead = null;
      this._additionsTail = null;
      this._movesHead = null;
      this._movesTail = null;
      this._removalsHead = null;
      this._removalsTail = null;
      this._identityChangesHead = null;
      this._identityChangesTail = null;
      this._trackByFn = lang_1.isPresent(this._trackByFn) ? this._trackByFn : trackByIdentity;
    }
    Object.defineProperty(DefaultIterableDiffer.prototype, "collection", {
      get: function() {
        return this._collection;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DefaultIterableDiffer.prototype, "length", {
      get: function() {
        return this._length;
      },
      enumerable: true,
      configurable: true
    });
    DefaultIterableDiffer.prototype.forEachItem = function(fn) {
      var record;
      for (record = this._itHead; record !== null; record = record._next) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachPreviousItem = function(fn) {
      var record;
      for (record = this._previousItHead; record !== null; record = record._nextPrevious) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachAddedItem = function(fn) {
      var record;
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachMovedItem = function(fn) {
      var record;
      for (record = this._movesHead; record !== null; record = record._nextMoved) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachRemovedItem = function(fn) {
      var record;
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.forEachIdentityChange = function(fn) {
      var record;
      for (record = this._identityChangesHead; record !== null; record = record._nextIdentityChange) {
        fn(record);
      }
    };
    DefaultIterableDiffer.prototype.diff = function(collection) {
      if (lang_1.isBlank(collection))
        collection = [];
      if (!collection_1.isListLikeIterable(collection)) {
        throw new exceptions_1.BaseException("Error trying to diff '" + collection + "'");
      }
      if (this.check(collection)) {
        return this;
      } else {
        return null;
      }
    };
    DefaultIterableDiffer.prototype.onDestroy = function() {};
    DefaultIterableDiffer.prototype.check = function(collection) {
      var _this = this;
      this._reset();
      var record = this._itHead;
      var mayBeDirty = false;
      var index;
      var item;
      var itemTrackBy;
      if (lang_1.isArray(collection)) {
        var list = collection;
        this._length = collection.length;
        for (index = 0; index < this._length; index++) {
          item = list[index];
          itemTrackBy = this._trackByFn(index, item);
          if (record === null || !lang_1.looseIdentical(record.trackById, itemTrackBy)) {
            record = this._mismatch(record, item, itemTrackBy, index);
            mayBeDirty = true;
          } else {
            if (mayBeDirty) {
              record = this._verifyReinsertion(record, item, itemTrackBy, index);
            }
            if (!lang_1.looseIdentical(record.item, item))
              this._addIdentityChange(record, item);
          }
          record = record._next;
        }
      } else {
        index = 0;
        collection_1.iterateListLike(collection, function(item) {
          itemTrackBy = _this._trackByFn(index, item);
          if (record === null || !lang_1.looseIdentical(record.trackById, itemTrackBy)) {
            record = _this._mismatch(record, item, itemTrackBy, index);
            mayBeDirty = true;
          } else {
            if (mayBeDirty) {
              record = _this._verifyReinsertion(record, item, itemTrackBy, index);
            }
            if (!lang_1.looseIdentical(record.item, item))
              _this._addIdentityChange(record, item);
          }
          record = record._next;
          index++;
        });
        this._length = index;
      }
      this._truncate(record);
      this._collection = collection;
      return this.isDirty;
    };
    Object.defineProperty(DefaultIterableDiffer.prototype, "isDirty", {
      get: function() {
        return this._additionsHead !== null || this._movesHead !== null || this._removalsHead !== null || this._identityChangesHead !== null;
      },
      enumerable: true,
      configurable: true
    });
    DefaultIterableDiffer.prototype._reset = function() {
      if (this.isDirty) {
        var record;
        var nextRecord;
        for (record = this._previousItHead = this._itHead; record !== null; record = record._next) {
          record._nextPrevious = record._next;
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
          record.previousIndex = record.currentIndex;
        }
        this._additionsHead = this._additionsTail = null;
        for (record = this._movesHead; record !== null; record = nextRecord) {
          record.previousIndex = record.currentIndex;
          nextRecord = record._nextMoved;
        }
        this._movesHead = this._movesTail = null;
        this._removalsHead = this._removalsTail = null;
        this._identityChangesHead = this._identityChangesTail = null;
      }
    };
    DefaultIterableDiffer.prototype._mismatch = function(record, item, itemTrackBy, index) {
      var previousRecord;
      if (record === null) {
        previousRecord = this._itTail;
      } else {
        previousRecord = record._prev;
        this._remove(record);
      }
      record = this._linkedRecords === null ? null : this._linkedRecords.get(itemTrackBy, index);
      if (record !== null) {
        if (!lang_1.looseIdentical(record.item, item))
          this._addIdentityChange(record, item);
        this._moveAfter(record, previousRecord, index);
      } else {
        record = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
        if (record !== null) {
          if (!lang_1.looseIdentical(record.item, item))
            this._addIdentityChange(record, item);
          this._reinsertAfter(record, previousRecord, index);
        } else {
          record = this._addAfter(new CollectionChangeRecord(item, itemTrackBy), previousRecord, index);
        }
      }
      return record;
    };
    DefaultIterableDiffer.prototype._verifyReinsertion = function(record, item, itemTrackBy, index) {
      var reinsertRecord = this._unlinkedRecords === null ? null : this._unlinkedRecords.get(itemTrackBy);
      if (reinsertRecord !== null) {
        record = this._reinsertAfter(reinsertRecord, record._prev, index);
      } else if (record.currentIndex != index) {
        record.currentIndex = index;
        this._addToMoves(record, index);
      }
      return record;
    };
    DefaultIterableDiffer.prototype._truncate = function(record) {
      while (record !== null) {
        var nextRecord = record._next;
        this._addToRemovals(this._unlink(record));
        record = nextRecord;
      }
      if (this._unlinkedRecords !== null) {
        this._unlinkedRecords.clear();
      }
      if (this._additionsTail !== null) {
        this._additionsTail._nextAdded = null;
      }
      if (this._movesTail !== null) {
        this._movesTail._nextMoved = null;
      }
      if (this._itTail !== null) {
        this._itTail._next = null;
      }
      if (this._removalsTail !== null) {
        this._removalsTail._nextRemoved = null;
      }
      if (this._identityChangesTail !== null) {
        this._identityChangesTail._nextIdentityChange = null;
      }
    };
    DefaultIterableDiffer.prototype._reinsertAfter = function(record, prevRecord, index) {
      if (this._unlinkedRecords !== null) {
        this._unlinkedRecords.remove(record);
      }
      var prev = record._prevRemoved;
      var next = record._nextRemoved;
      if (prev === null) {
        this._removalsHead = next;
      } else {
        prev._nextRemoved = next;
      }
      if (next === null) {
        this._removalsTail = prev;
      } else {
        next._prevRemoved = prev;
      }
      this._insertAfter(record, prevRecord, index);
      this._addToMoves(record, index);
      return record;
    };
    DefaultIterableDiffer.prototype._moveAfter = function(record, prevRecord, index) {
      this._unlink(record);
      this._insertAfter(record, prevRecord, index);
      this._addToMoves(record, index);
      return record;
    };
    DefaultIterableDiffer.prototype._addAfter = function(record, prevRecord, index) {
      this._insertAfter(record, prevRecord, index);
      if (this._additionsTail === null) {
        this._additionsTail = this._additionsHead = record;
      } else {
        this._additionsTail = this._additionsTail._nextAdded = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._insertAfter = function(record, prevRecord, index) {
      var next = prevRecord === null ? this._itHead : prevRecord._next;
      record._next = next;
      record._prev = prevRecord;
      if (next === null) {
        this._itTail = record;
      } else {
        next._prev = record;
      }
      if (prevRecord === null) {
        this._itHead = record;
      } else {
        prevRecord._next = record;
      }
      if (this._linkedRecords === null) {
        this._linkedRecords = new _DuplicateMap();
      }
      this._linkedRecords.put(record);
      record.currentIndex = index;
      return record;
    };
    DefaultIterableDiffer.prototype._remove = function(record) {
      return this._addToRemovals(this._unlink(record));
    };
    DefaultIterableDiffer.prototype._unlink = function(record) {
      if (this._linkedRecords !== null) {
        this._linkedRecords.remove(record);
      }
      var prev = record._prev;
      var next = record._next;
      if (prev === null) {
        this._itHead = next;
      } else {
        prev._next = next;
      }
      if (next === null) {
        this._itTail = prev;
      } else {
        next._prev = prev;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addToMoves = function(record, toIndex) {
      if (record.previousIndex === toIndex) {
        return record;
      }
      if (this._movesTail === null) {
        this._movesTail = this._movesHead = record;
      } else {
        this._movesTail = this._movesTail._nextMoved = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addToRemovals = function(record) {
      if (this._unlinkedRecords === null) {
        this._unlinkedRecords = new _DuplicateMap();
      }
      this._unlinkedRecords.put(record);
      record.currentIndex = null;
      record._nextRemoved = null;
      if (this._removalsTail === null) {
        this._removalsTail = this._removalsHead = record;
        record._prevRemoved = null;
      } else {
        record._prevRemoved = this._removalsTail;
        this._removalsTail = this._removalsTail._nextRemoved = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype._addIdentityChange = function(record, item) {
      record.item = item;
      if (this._identityChangesTail === null) {
        this._identityChangesTail = this._identityChangesHead = record;
      } else {
        this._identityChangesTail = this._identityChangesTail._nextIdentityChange = record;
      }
      return record;
    };
    DefaultIterableDiffer.prototype.toString = function() {
      var list = [];
      this.forEachItem(function(record) {
        return list.push(record);
      });
      var previous = [];
      this.forEachPreviousItem(function(record) {
        return previous.push(record);
      });
      var additions = [];
      this.forEachAddedItem(function(record) {
        return additions.push(record);
      });
      var moves = [];
      this.forEachMovedItem(function(record) {
        return moves.push(record);
      });
      var removals = [];
      this.forEachRemovedItem(function(record) {
        return removals.push(record);
      });
      var identityChanges = [];
      this.forEachIdentityChange(function(record) {
        return identityChanges.push(record);
      });
      return "collection: " + list.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "moves: " + moves.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n" + "identityChanges: " + identityChanges.join(', ') + "\n";
    };
    return DefaultIterableDiffer;
  }());
  exports.DefaultIterableDiffer = DefaultIterableDiffer;
  var CollectionChangeRecord = (function() {
    function CollectionChangeRecord(item, trackById) {
      this.item = item;
      this.trackById = trackById;
      this.currentIndex = null;
      this.previousIndex = null;
      this._nextPrevious = null;
      this._prev = null;
      this._next = null;
      this._prevDup = null;
      this._nextDup = null;
      this._prevRemoved = null;
      this._nextRemoved = null;
      this._nextAdded = null;
      this._nextMoved = null;
      this._nextIdentityChange = null;
    }
    CollectionChangeRecord.prototype.toString = function() {
      return this.previousIndex === this.currentIndex ? lang_1.stringify(this.item) : lang_1.stringify(this.item) + '[' + lang_1.stringify(this.previousIndex) + '->' + lang_1.stringify(this.currentIndex) + ']';
    };
    return CollectionChangeRecord;
  }());
  exports.CollectionChangeRecord = CollectionChangeRecord;
  var _DuplicateItemRecordList = (function() {
    function _DuplicateItemRecordList() {
      this._head = null;
      this._tail = null;
    }
    _DuplicateItemRecordList.prototype.add = function(record) {
      if (this._head === null) {
        this._head = this._tail = record;
        record._nextDup = null;
        record._prevDup = null;
      } else {
        this._tail._nextDup = record;
        record._prevDup = this._tail;
        record._nextDup = null;
        this._tail = record;
      }
    };
    _DuplicateItemRecordList.prototype.get = function(trackById, afterIndex) {
      var record;
      for (record = this._head; record !== null; record = record._nextDup) {
        if ((afterIndex === null || afterIndex < record.currentIndex) && lang_1.looseIdentical(record.trackById, trackById)) {
          return record;
        }
      }
      return null;
    };
    _DuplicateItemRecordList.prototype.remove = function(record) {
      var prev = record._prevDup;
      var next = record._nextDup;
      if (prev === null) {
        this._head = next;
      } else {
        prev._nextDup = next;
      }
      if (next === null) {
        this._tail = prev;
      } else {
        next._prevDup = prev;
      }
      return this._head === null;
    };
    return _DuplicateItemRecordList;
  }());
  var _DuplicateMap = (function() {
    function _DuplicateMap() {
      this.map = new Map();
    }
    _DuplicateMap.prototype.put = function(record) {
      var key = lang_1.getMapKey(record.trackById);
      var duplicates = this.map.get(key);
      if (!lang_1.isPresent(duplicates)) {
        duplicates = new _DuplicateItemRecordList();
        this.map.set(key, duplicates);
      }
      duplicates.add(record);
    };
    _DuplicateMap.prototype.get = function(trackById, afterIndex) {
      if (afterIndex === void 0) {
        afterIndex = null;
      }
      var key = lang_1.getMapKey(trackById);
      var recordList = this.map.get(key);
      return lang_1.isBlank(recordList) ? null : recordList.get(trackById, afterIndex);
    };
    _DuplicateMap.prototype.remove = function(record) {
      var key = lang_1.getMapKey(record.trackById);
      var recordList = this.map.get(key);
      if (recordList.remove(record)) {
        this.map.delete(key);
      }
      return record;
    };
    Object.defineProperty(_DuplicateMap.prototype, "isEmpty", {
      get: function() {
        return this.map.size === 0;
      },
      enumerable: true,
      configurable: true
    });
    _DuplicateMap.prototype.clear = function() {
      this.map.clear();
    };
    _DuplicateMap.prototype.toString = function() {
      return '_DuplicateMap(' + lang_1.stringify(this.map) + ')';
    };
    return _DuplicateMap;
  }());
  return module.exports;
});

$__System.registerDynamic("48", ["e", "32", "1c", "2a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var collection_1 = $__require('1c');
  var di_1 = $__require('2a');
  var KeyValueDiffers = (function() {
    function KeyValueDiffers(factories) {
      this.factories = factories;
    }
    KeyValueDiffers.create = function(factories, parent) {
      if (lang_1.isPresent(parent)) {
        var copied = collection_1.ListWrapper.clone(parent.factories);
        factories = factories.concat(copied);
        return new KeyValueDiffers(factories);
      } else {
        return new KeyValueDiffers(factories);
      }
    };
    KeyValueDiffers.extend = function(factories) {
      return new di_1.Provider(KeyValueDiffers, {
        useFactory: function(parent) {
          if (lang_1.isBlank(parent)) {
            throw new exceptions_1.BaseException('Cannot extend KeyValueDiffers without a parent injector');
          }
          return KeyValueDiffers.create(factories, parent);
        },
        deps: [[KeyValueDiffers, new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata()]]
      });
    };
    KeyValueDiffers.prototype.find = function(kv) {
      var factory = this.factories.find(function(f) {
        return f.supports(kv);
      });
      if (lang_1.isPresent(factory)) {
        return factory;
      } else {
        throw new exceptions_1.BaseException("Cannot find a differ supporting object '" + kv + "'");
      }
    };
    return KeyValueDiffers;
  }());
  exports.KeyValueDiffers = KeyValueDiffers;
  return module.exports;
});

$__System.registerDynamic("49", ["1c", "e", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collection_1 = $__require('1c');
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var DefaultKeyValueDifferFactory = (function() {
    function DefaultKeyValueDifferFactory() {}
    DefaultKeyValueDifferFactory.prototype.supports = function(obj) {
      return obj instanceof Map || lang_1.isJsObject(obj);
    };
    DefaultKeyValueDifferFactory.prototype.create = function(cdRef) {
      return new DefaultKeyValueDiffer();
    };
    return DefaultKeyValueDifferFactory;
  }());
  exports.DefaultKeyValueDifferFactory = DefaultKeyValueDifferFactory;
  var DefaultKeyValueDiffer = (function() {
    function DefaultKeyValueDiffer() {
      this._records = new Map();
      this._mapHead = null;
      this._previousMapHead = null;
      this._changesHead = null;
      this._changesTail = null;
      this._additionsHead = null;
      this._additionsTail = null;
      this._removalsHead = null;
      this._removalsTail = null;
    }
    Object.defineProperty(DefaultKeyValueDiffer.prototype, "isDirty", {
      get: function() {
        return this._additionsHead !== null || this._changesHead !== null || this._removalsHead !== null;
      },
      enumerable: true,
      configurable: true
    });
    DefaultKeyValueDiffer.prototype.forEachItem = function(fn) {
      var record;
      for (record = this._mapHead; record !== null; record = record._next) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachPreviousItem = function(fn) {
      var record;
      for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachChangedItem = function(fn) {
      var record;
      for (record = this._changesHead; record !== null; record = record._nextChanged) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachAddedItem = function(fn) {
      var record;
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.forEachRemovedItem = function(fn) {
      var record;
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        fn(record);
      }
    };
    DefaultKeyValueDiffer.prototype.diff = function(map) {
      if (lang_1.isBlank(map))
        map = collection_1.MapWrapper.createFromPairs([]);
      if (!(map instanceof Map || lang_1.isJsObject(map))) {
        throw new exceptions_1.BaseException("Error trying to diff '" + map + "'");
      }
      if (this.check(map)) {
        return this;
      } else {
        return null;
      }
    };
    DefaultKeyValueDiffer.prototype.onDestroy = function() {};
    DefaultKeyValueDiffer.prototype.check = function(map) {
      var _this = this;
      this._reset();
      var records = this._records;
      var oldSeqRecord = this._mapHead;
      var lastOldSeqRecord = null;
      var lastNewSeqRecord = null;
      var seqChanged = false;
      this._forEach(map, function(value, key) {
        var newSeqRecord;
        if (oldSeqRecord !== null && key === oldSeqRecord.key) {
          newSeqRecord = oldSeqRecord;
          if (!lang_1.looseIdentical(value, oldSeqRecord.currentValue)) {
            oldSeqRecord.previousValue = oldSeqRecord.currentValue;
            oldSeqRecord.currentValue = value;
            _this._addToChanges(oldSeqRecord);
          }
        } else {
          seqChanged = true;
          if (oldSeqRecord !== null) {
            oldSeqRecord._next = null;
            _this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
            _this._addToRemovals(oldSeqRecord);
          }
          if (records.has(key)) {
            newSeqRecord = records.get(key);
          } else {
            newSeqRecord = new KeyValueChangeRecord(key);
            records.set(key, newSeqRecord);
            newSeqRecord.currentValue = value;
            _this._addToAdditions(newSeqRecord);
          }
        }
        if (seqChanged) {
          if (_this._isInRemovals(newSeqRecord)) {
            _this._removeFromRemovals(newSeqRecord);
          }
          if (lastNewSeqRecord == null) {
            _this._mapHead = newSeqRecord;
          } else {
            lastNewSeqRecord._next = newSeqRecord;
          }
        }
        lastOldSeqRecord = oldSeqRecord;
        lastNewSeqRecord = newSeqRecord;
        oldSeqRecord = oldSeqRecord === null ? null : oldSeqRecord._next;
      });
      this._truncate(lastOldSeqRecord, oldSeqRecord);
      return this.isDirty;
    };
    DefaultKeyValueDiffer.prototype._reset = function() {
      if (this.isDirty) {
        var record;
        for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
          record._nextPrevious = record._next;
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
          record.previousValue = record.currentValue;
        }
        for (record = this._additionsHead; record != null; record = record._nextAdded) {
          record.previousValue = record.currentValue;
        }
        this._changesHead = this._changesTail = null;
        this._additionsHead = this._additionsTail = null;
        this._removalsHead = this._removalsTail = null;
      }
    };
    DefaultKeyValueDiffer.prototype._truncate = function(lastRecord, record) {
      while (record !== null) {
        if (lastRecord === null) {
          this._mapHead = null;
        } else {
          lastRecord._next = null;
        }
        var nextRecord = record._next;
        this._addToRemovals(record);
        lastRecord = record;
        record = nextRecord;
      }
      for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
        rec.previousValue = rec.currentValue;
        rec.currentValue = null;
        this._records.delete(rec.key);
      }
    };
    DefaultKeyValueDiffer.prototype._isInRemovals = function(record) {
      return record === this._removalsHead || record._nextRemoved !== null || record._prevRemoved !== null;
    };
    DefaultKeyValueDiffer.prototype._addToRemovals = function(record) {
      if (this._removalsHead === null) {
        this._removalsHead = this._removalsTail = record;
      } else {
        this._removalsTail._nextRemoved = record;
        record._prevRemoved = this._removalsTail;
        this._removalsTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype._removeFromSeq = function(prev, record) {
      var next = record._next;
      if (prev === null) {
        this._mapHead = next;
      } else {
        prev._next = next;
      }
    };
    DefaultKeyValueDiffer.prototype._removeFromRemovals = function(record) {
      var prev = record._prevRemoved;
      var next = record._nextRemoved;
      if (prev === null) {
        this._removalsHead = next;
      } else {
        prev._nextRemoved = next;
      }
      if (next === null) {
        this._removalsTail = prev;
      } else {
        next._prevRemoved = prev;
      }
      record._prevRemoved = record._nextRemoved = null;
    };
    DefaultKeyValueDiffer.prototype._addToAdditions = function(record) {
      if (this._additionsHead === null) {
        this._additionsHead = this._additionsTail = record;
      } else {
        this._additionsTail._nextAdded = record;
        this._additionsTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype._addToChanges = function(record) {
      if (this._changesHead === null) {
        this._changesHead = this._changesTail = record;
      } else {
        this._changesTail._nextChanged = record;
        this._changesTail = record;
      }
    };
    DefaultKeyValueDiffer.prototype.toString = function() {
      var items = [];
      var previous = [];
      var changes = [];
      var additions = [];
      var removals = [];
      var record;
      for (record = this._mapHead; record !== null; record = record._next) {
        items.push(lang_1.stringify(record));
      }
      for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
        previous.push(lang_1.stringify(record));
      }
      for (record = this._changesHead; record !== null; record = record._nextChanged) {
        changes.push(lang_1.stringify(record));
      }
      for (record = this._additionsHead; record !== null; record = record._nextAdded) {
        additions.push(lang_1.stringify(record));
      }
      for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
        removals.push(lang_1.stringify(record));
      }
      return "map: " + items.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" + "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" + "removals: " + removals.join(', ') + "\n";
    };
    DefaultKeyValueDiffer.prototype._forEach = function(obj, fn) {
      if (obj instanceof Map) {
        obj.forEach(fn);
      } else {
        collection_1.StringMapWrapper.forEach(obj, fn);
      }
    };
    return DefaultKeyValueDiffer;
  }());
  exports.DefaultKeyValueDiffer = DefaultKeyValueDiffer;
  var KeyValueChangeRecord = (function() {
    function KeyValueChangeRecord(key) {
      this.key = key;
      this.previousValue = null;
      this.currentValue = null;
      this._nextPrevious = null;
      this._next = null;
      this._nextAdded = null;
      this._nextRemoved = null;
      this._prevRemoved = null;
      this._nextChanged = null;
    }
    KeyValueChangeRecord.prototype.toString = function() {
      return lang_1.looseIdentical(this.previousValue, this.currentValue) ? lang_1.stringify(this.key) : (lang_1.stringify(this.key) + '[' + lang_1.stringify(this.previousValue) + '->' + lang_1.stringify(this.currentValue) + ']');
    };
    return KeyValueChangeRecord;
  }());
  exports.KeyValueChangeRecord = KeyValueChangeRecord;
  return module.exports;
});

$__System.registerDynamic("12", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  (function(ChangeDetectorState) {
    ChangeDetectorState[ChangeDetectorState["NeverChecked"] = 0] = "NeverChecked";
    ChangeDetectorState[ChangeDetectorState["CheckedBefore"] = 1] = "CheckedBefore";
    ChangeDetectorState[ChangeDetectorState["Errored"] = 2] = "Errored";
  })(exports.ChangeDetectorState || (exports.ChangeDetectorState = {}));
  var ChangeDetectorState = exports.ChangeDetectorState;
  (function(ChangeDetectionStrategy) {
    ChangeDetectionStrategy[ChangeDetectionStrategy["CheckOnce"] = 0] = "CheckOnce";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Checked"] = 1] = "Checked";
    ChangeDetectionStrategy[ChangeDetectionStrategy["CheckAlways"] = 2] = "CheckAlways";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Detached"] = 3] = "Detached";
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 4] = "OnPush";
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 5] = "Default";
  })(exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
  var ChangeDetectionStrategy = exports.ChangeDetectionStrategy;
  exports.CHANGE_DETECTION_STRATEGY_VALUES = [ChangeDetectionStrategy.CheckOnce, ChangeDetectionStrategy.Checked, ChangeDetectionStrategy.CheckAlways, ChangeDetectionStrategy.Detached, ChangeDetectionStrategy.OnPush, ChangeDetectionStrategy.Default];
  exports.CHANGE_DETECTOR_STATE_VALUES = [ChangeDetectorState.NeverChecked, ChangeDetectorState.CheckedBefore, ChangeDetectorState.Errored];
  function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return lang_1.isBlank(changeDetectionStrategy) || changeDetectionStrategy === ChangeDetectionStrategy.Default;
  }
  exports.isDefaultChangeDetectionStrategy = isDefaultChangeDetectionStrategy;
  return module.exports;
});

$__System.registerDynamic("4a", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ChangeDetectorRef = (function() {
    function ChangeDetectorRef() {}
    return ChangeDetectorRef;
  }());
  exports.ChangeDetectorRef = ChangeDetectorRef;
  return module.exports;
});

$__System.registerDynamic("28", ["46", "47", "48", "49", "12", "4a", "4b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var iterable_differs_1 = $__require('46');
  var default_iterable_differ_1 = $__require('47');
  var keyvalue_differs_1 = $__require('48');
  var default_keyvalue_differ_1 = $__require('49');
  var default_keyvalue_differ_2 = $__require('49');
  exports.DefaultKeyValueDifferFactory = default_keyvalue_differ_2.DefaultKeyValueDifferFactory;
  exports.KeyValueChangeRecord = default_keyvalue_differ_2.KeyValueChangeRecord;
  var default_iterable_differ_2 = $__require('47');
  exports.DefaultIterableDifferFactory = default_iterable_differ_2.DefaultIterableDifferFactory;
  exports.CollectionChangeRecord = default_iterable_differ_2.CollectionChangeRecord;
  var constants_1 = $__require('12');
  exports.ChangeDetectionStrategy = constants_1.ChangeDetectionStrategy;
  exports.CHANGE_DETECTION_STRATEGY_VALUES = constants_1.CHANGE_DETECTION_STRATEGY_VALUES;
  exports.ChangeDetectorState = constants_1.ChangeDetectorState;
  exports.CHANGE_DETECTOR_STATE_VALUES = constants_1.CHANGE_DETECTOR_STATE_VALUES;
  exports.isDefaultChangeDetectionStrategy = constants_1.isDefaultChangeDetectionStrategy;
  var change_detector_ref_1 = $__require('4a');
  exports.ChangeDetectorRef = change_detector_ref_1.ChangeDetectorRef;
  var iterable_differs_2 = $__require('46');
  exports.IterableDiffers = iterable_differs_2.IterableDiffers;
  var keyvalue_differs_2 = $__require('48');
  exports.KeyValueDiffers = keyvalue_differs_2.KeyValueDiffers;
  var default_iterable_differ_3 = $__require('47');
  exports.DefaultIterableDiffer = default_iterable_differ_3.DefaultIterableDiffer;
  var change_detection_util_1 = $__require('4b');
  exports.WrappedValue = change_detection_util_1.WrappedValue;
  exports.ValueUnwrapper = change_detection_util_1.ValueUnwrapper;
  exports.SimpleChange = change_detection_util_1.SimpleChange;
  exports.devModeEqual = change_detection_util_1.devModeEqual;
  exports.looseIdentical = change_detection_util_1.looseIdentical;
  exports.uninitialized = change_detection_util_1.uninitialized;
  exports.keyValDiff = [new default_keyvalue_differ_1.DefaultKeyValueDifferFactory()];
  exports.iterableDiff = [new default_iterable_differ_1.DefaultIterableDifferFactory()];
  exports.defaultIterableDiffers = new iterable_differs_1.IterableDiffers(exports.iterableDiff);
  exports.defaultKeyValueDiffers = new keyvalue_differs_1.KeyValueDiffers(exports.keyValDiff);
  return module.exports;
});

$__System.registerDynamic("3f", ["32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var exceptions_1 = $__require('32');
  var _THROW_IF_NOT_FOUND = new Object();
  exports.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
  var Injector = (function() {
    function Injector() {}
    Injector.prototype.get = function(token, notFoundValue) {
      return exceptions_1.unimplemented();
    };
    Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    return Injector;
  }());
  exports.Injector = Injector;
  return module.exports;
});

$__System.registerDynamic("36", ["1c", "4c", "4d", "32", "4e", "f", "3f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var collection_1 = $__require('1c');
  var reflective_provider_1 = $__require('4c');
  var reflective_exceptions_1 = $__require('4d');
  var exceptions_1 = $__require('32');
  var reflective_key_1 = $__require('4e');
  var metadata_1 = $__require('f');
  var injector_1 = $__require('3f');
  var __unused;
  var _MAX_CONSTRUCTION_COUNTER = 10;
  var UNDEFINED = new Object();
  var ReflectiveProtoInjectorInlineStrategy = (function() {
    function ReflectiveProtoInjectorInlineStrategy(protoEI, providers) {
      this.provider0 = null;
      this.provider1 = null;
      this.provider2 = null;
      this.provider3 = null;
      this.provider4 = null;
      this.provider5 = null;
      this.provider6 = null;
      this.provider7 = null;
      this.provider8 = null;
      this.provider9 = null;
      this.keyId0 = null;
      this.keyId1 = null;
      this.keyId2 = null;
      this.keyId3 = null;
      this.keyId4 = null;
      this.keyId5 = null;
      this.keyId6 = null;
      this.keyId7 = null;
      this.keyId8 = null;
      this.keyId9 = null;
      var length = providers.length;
      if (length > 0) {
        this.provider0 = providers[0];
        this.keyId0 = providers[0].key.id;
      }
      if (length > 1) {
        this.provider1 = providers[1];
        this.keyId1 = providers[1].key.id;
      }
      if (length > 2) {
        this.provider2 = providers[2];
        this.keyId2 = providers[2].key.id;
      }
      if (length > 3) {
        this.provider3 = providers[3];
        this.keyId3 = providers[3].key.id;
      }
      if (length > 4) {
        this.provider4 = providers[4];
        this.keyId4 = providers[4].key.id;
      }
      if (length > 5) {
        this.provider5 = providers[5];
        this.keyId5 = providers[5].key.id;
      }
      if (length > 6) {
        this.provider6 = providers[6];
        this.keyId6 = providers[6].key.id;
      }
      if (length > 7) {
        this.provider7 = providers[7];
        this.keyId7 = providers[7].key.id;
      }
      if (length > 8) {
        this.provider8 = providers[8];
        this.keyId8 = providers[8].key.id;
      }
      if (length > 9) {
        this.provider9 = providers[9];
        this.keyId9 = providers[9].key.id;
      }
    }
    ReflectiveProtoInjectorInlineStrategy.prototype.getProviderAtIndex = function(index) {
      if (index == 0)
        return this.provider0;
      if (index == 1)
        return this.provider1;
      if (index == 2)
        return this.provider2;
      if (index == 3)
        return this.provider3;
      if (index == 4)
        return this.provider4;
      if (index == 5)
        return this.provider5;
      if (index == 6)
        return this.provider6;
      if (index == 7)
        return this.provider7;
      if (index == 8)
        return this.provider8;
      if (index == 9)
        return this.provider9;
      throw new reflective_exceptions_1.OutOfBoundsError(index);
    };
    ReflectiveProtoInjectorInlineStrategy.prototype.createInjectorStrategy = function(injector) {
      return new ReflectiveInjectorInlineStrategy(injector, this);
    };
    return ReflectiveProtoInjectorInlineStrategy;
  }());
  exports.ReflectiveProtoInjectorInlineStrategy = ReflectiveProtoInjectorInlineStrategy;
  var ReflectiveProtoInjectorDynamicStrategy = (function() {
    function ReflectiveProtoInjectorDynamicStrategy(protoInj, providers) {
      this.providers = providers;
      var len = providers.length;
      this.keyIds = collection_1.ListWrapper.createFixedSize(len);
      for (var i = 0; i < len; i++) {
        this.keyIds[i] = providers[i].key.id;
      }
    }
    ReflectiveProtoInjectorDynamicStrategy.prototype.getProviderAtIndex = function(index) {
      if (index < 0 || index >= this.providers.length) {
        throw new reflective_exceptions_1.OutOfBoundsError(index);
      }
      return this.providers[index];
    };
    ReflectiveProtoInjectorDynamicStrategy.prototype.createInjectorStrategy = function(ei) {
      return new ReflectiveInjectorDynamicStrategy(this, ei);
    };
    return ReflectiveProtoInjectorDynamicStrategy;
  }());
  exports.ReflectiveProtoInjectorDynamicStrategy = ReflectiveProtoInjectorDynamicStrategy;
  var ReflectiveProtoInjector = (function() {
    function ReflectiveProtoInjector(providers) {
      this.numberOfProviders = providers.length;
      this._strategy = providers.length > _MAX_CONSTRUCTION_COUNTER ? new ReflectiveProtoInjectorDynamicStrategy(this, providers) : new ReflectiveProtoInjectorInlineStrategy(this, providers);
    }
    ReflectiveProtoInjector.fromResolvedProviders = function(providers) {
      return new ReflectiveProtoInjector(providers);
    };
    ReflectiveProtoInjector.prototype.getProviderAtIndex = function(index) {
      return this._strategy.getProviderAtIndex(index);
    };
    return ReflectiveProtoInjector;
  }());
  exports.ReflectiveProtoInjector = ReflectiveProtoInjector;
  var ReflectiveInjectorInlineStrategy = (function() {
    function ReflectiveInjectorInlineStrategy(injector, protoStrategy) {
      this.injector = injector;
      this.protoStrategy = protoStrategy;
      this.obj0 = UNDEFINED;
      this.obj1 = UNDEFINED;
      this.obj2 = UNDEFINED;
      this.obj3 = UNDEFINED;
      this.obj4 = UNDEFINED;
      this.obj5 = UNDEFINED;
      this.obj6 = UNDEFINED;
      this.obj7 = UNDEFINED;
      this.obj8 = UNDEFINED;
      this.obj9 = UNDEFINED;
    }
    ReflectiveInjectorInlineStrategy.prototype.resetConstructionCounter = function() {
      this.injector._constructionCounter = 0;
    };
    ReflectiveInjectorInlineStrategy.prototype.instantiateProvider = function(provider) {
      return this.injector._new(provider);
    };
    ReflectiveInjectorInlineStrategy.prototype.getObjByKeyId = function(keyId) {
      var p = this.protoStrategy;
      var inj = this.injector;
      if (p.keyId0 === keyId) {
        if (this.obj0 === UNDEFINED) {
          this.obj0 = inj._new(p.provider0);
        }
        return this.obj0;
      }
      if (p.keyId1 === keyId) {
        if (this.obj1 === UNDEFINED) {
          this.obj1 = inj._new(p.provider1);
        }
        return this.obj1;
      }
      if (p.keyId2 === keyId) {
        if (this.obj2 === UNDEFINED) {
          this.obj2 = inj._new(p.provider2);
        }
        return this.obj2;
      }
      if (p.keyId3 === keyId) {
        if (this.obj3 === UNDEFINED) {
          this.obj3 = inj._new(p.provider3);
        }
        return this.obj3;
      }
      if (p.keyId4 === keyId) {
        if (this.obj4 === UNDEFINED) {
          this.obj4 = inj._new(p.provider4);
        }
        return this.obj4;
      }
      if (p.keyId5 === keyId) {
        if (this.obj5 === UNDEFINED) {
          this.obj5 = inj._new(p.provider5);
        }
        return this.obj5;
      }
      if (p.keyId6 === keyId) {
        if (this.obj6 === UNDEFINED) {
          this.obj6 = inj._new(p.provider6);
        }
        return this.obj6;
      }
      if (p.keyId7 === keyId) {
        if (this.obj7 === UNDEFINED) {
          this.obj7 = inj._new(p.provider7);
        }
        return this.obj7;
      }
      if (p.keyId8 === keyId) {
        if (this.obj8 === UNDEFINED) {
          this.obj8 = inj._new(p.provider8);
        }
        return this.obj8;
      }
      if (p.keyId9 === keyId) {
        if (this.obj9 === UNDEFINED) {
          this.obj9 = inj._new(p.provider9);
        }
        return this.obj9;
      }
      return UNDEFINED;
    };
    ReflectiveInjectorInlineStrategy.prototype.getObjAtIndex = function(index) {
      if (index == 0)
        return this.obj0;
      if (index == 1)
        return this.obj1;
      if (index == 2)
        return this.obj2;
      if (index == 3)
        return this.obj3;
      if (index == 4)
        return this.obj4;
      if (index == 5)
        return this.obj5;
      if (index == 6)
        return this.obj6;
      if (index == 7)
        return this.obj7;
      if (index == 8)
        return this.obj8;
      if (index == 9)
        return this.obj9;
      throw new reflective_exceptions_1.OutOfBoundsError(index);
    };
    ReflectiveInjectorInlineStrategy.prototype.getMaxNumberOfObjects = function() {
      return _MAX_CONSTRUCTION_COUNTER;
    };
    return ReflectiveInjectorInlineStrategy;
  }());
  exports.ReflectiveInjectorInlineStrategy = ReflectiveInjectorInlineStrategy;
  var ReflectiveInjectorDynamicStrategy = (function() {
    function ReflectiveInjectorDynamicStrategy(protoStrategy, injector) {
      this.protoStrategy = protoStrategy;
      this.injector = injector;
      this.objs = collection_1.ListWrapper.createFixedSize(protoStrategy.providers.length);
      collection_1.ListWrapper.fill(this.objs, UNDEFINED);
    }
    ReflectiveInjectorDynamicStrategy.prototype.resetConstructionCounter = function() {
      this.injector._constructionCounter = 0;
    };
    ReflectiveInjectorDynamicStrategy.prototype.instantiateProvider = function(provider) {
      return this.injector._new(provider);
    };
    ReflectiveInjectorDynamicStrategy.prototype.getObjByKeyId = function(keyId) {
      var p = this.protoStrategy;
      for (var i = 0; i < p.keyIds.length; i++) {
        if (p.keyIds[i] === keyId) {
          if (this.objs[i] === UNDEFINED) {
            this.objs[i] = this.injector._new(p.providers[i]);
          }
          return this.objs[i];
        }
      }
      return UNDEFINED;
    };
    ReflectiveInjectorDynamicStrategy.prototype.getObjAtIndex = function(index) {
      if (index < 0 || index >= this.objs.length) {
        throw new reflective_exceptions_1.OutOfBoundsError(index);
      }
      return this.objs[index];
    };
    ReflectiveInjectorDynamicStrategy.prototype.getMaxNumberOfObjects = function() {
      return this.objs.length;
    };
    return ReflectiveInjectorDynamicStrategy;
  }());
  exports.ReflectiveInjectorDynamicStrategy = ReflectiveInjectorDynamicStrategy;
  var ReflectiveInjector = (function() {
    function ReflectiveInjector() {}
    ReflectiveInjector.resolve = function(providers) {
      return reflective_provider_1.resolveReflectiveProviders(providers);
    };
    ReflectiveInjector.resolveAndCreate = function(providers, parent) {
      if (parent === void 0) {
        parent = null;
      }
      var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
      return ReflectiveInjector.fromResolvedProviders(ResolvedReflectiveProviders, parent);
    };
    ReflectiveInjector.fromResolvedProviders = function(providers, parent) {
      if (parent === void 0) {
        parent = null;
      }
      return new ReflectiveInjector_(ReflectiveProtoInjector.fromResolvedProviders(providers), parent);
    };
    ReflectiveInjector.fromResolvedBindings = function(providers) {
      return ReflectiveInjector.fromResolvedProviders(providers);
    };
    Object.defineProperty(ReflectiveInjector.prototype, "parent", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    ReflectiveInjector.prototype.debugContext = function() {
      return null;
    };
    ReflectiveInjector.prototype.resolveAndCreateChild = function(providers) {
      return exceptions_1.unimplemented();
    };
    ReflectiveInjector.prototype.createChildFromResolved = function(providers) {
      return exceptions_1.unimplemented();
    };
    ReflectiveInjector.prototype.resolveAndInstantiate = function(provider) {
      return exceptions_1.unimplemented();
    };
    ReflectiveInjector.prototype.instantiateResolved = function(provider) {
      return exceptions_1.unimplemented();
    };
    return ReflectiveInjector;
  }());
  exports.ReflectiveInjector = ReflectiveInjector;
  var ReflectiveInjector_ = (function() {
    function ReflectiveInjector_(_proto, _parent, _debugContext) {
      if (_parent === void 0) {
        _parent = null;
      }
      if (_debugContext === void 0) {
        _debugContext = null;
      }
      this._debugContext = _debugContext;
      this._constructionCounter = 0;
      this._proto = _proto;
      this._parent = _parent;
      this._strategy = _proto._strategy.createInjectorStrategy(this);
    }
    ReflectiveInjector_.prototype.debugContext = function() {
      return this._debugContext();
    };
    ReflectiveInjector_.prototype.get = function(token, notFoundValue) {
      if (notFoundValue === void 0) {
        notFoundValue = injector_1.THROW_IF_NOT_FOUND;
      }
      return this._getByKey(reflective_key_1.ReflectiveKey.get(token), null, null, notFoundValue);
    };
    ReflectiveInjector_.prototype.getAt = function(index) {
      return this._strategy.getObjAtIndex(index);
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "parent", {
      get: function() {
        return this._parent;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(ReflectiveInjector_.prototype, "internalStrategy", {
      get: function() {
        return this._strategy;
      },
      enumerable: true,
      configurable: true
    });
    ReflectiveInjector_.prototype.resolveAndCreateChild = function(providers) {
      var ResolvedReflectiveProviders = ReflectiveInjector.resolve(providers);
      return this.createChildFromResolved(ResolvedReflectiveProviders);
    };
    ReflectiveInjector_.prototype.createChildFromResolved = function(providers) {
      var proto = new ReflectiveProtoInjector(providers);
      var inj = new ReflectiveInjector_(proto);
      inj._parent = this;
      return inj;
    };
    ReflectiveInjector_.prototype.resolveAndInstantiate = function(provider) {
      return this.instantiateResolved(ReflectiveInjector.resolve([provider])[0]);
    };
    ReflectiveInjector_.prototype.instantiateResolved = function(provider) {
      return this._instantiateProvider(provider);
    };
    ReflectiveInjector_.prototype._new = function(provider) {
      if (this._constructionCounter++ > this._strategy.getMaxNumberOfObjects()) {
        throw new reflective_exceptions_1.CyclicDependencyError(this, provider.key);
      }
      return this._instantiateProvider(provider);
    };
    ReflectiveInjector_.prototype._instantiateProvider = function(provider) {
      if (provider.multiProvider) {
        var res = collection_1.ListWrapper.createFixedSize(provider.resolvedFactories.length);
        for (var i = 0; i < provider.resolvedFactories.length; ++i) {
          res[i] = this._instantiate(provider, provider.resolvedFactories[i]);
        }
        return res;
      } else {
        return this._instantiate(provider, provider.resolvedFactories[0]);
      }
    };
    ReflectiveInjector_.prototype._instantiate = function(provider, ResolvedReflectiveFactory) {
      var factory = ResolvedReflectiveFactory.factory;
      var deps = ResolvedReflectiveFactory.dependencies;
      var length = deps.length;
      var d0;
      var d1;
      var d2;
      var d3;
      var d4;
      var d5;
      var d6;
      var d7;
      var d8;
      var d9;
      var d10;
      var d11;
      var d12;
      var d13;
      var d14;
      var d15;
      var d16;
      var d17;
      var d18;
      var d19;
      try {
        d0 = length > 0 ? this._getByReflectiveDependency(provider, deps[0]) : null;
        d1 = length > 1 ? this._getByReflectiveDependency(provider, deps[1]) : null;
        d2 = length > 2 ? this._getByReflectiveDependency(provider, deps[2]) : null;
        d3 = length > 3 ? this._getByReflectiveDependency(provider, deps[3]) : null;
        d4 = length > 4 ? this._getByReflectiveDependency(provider, deps[4]) : null;
        d5 = length > 5 ? this._getByReflectiveDependency(provider, deps[5]) : null;
        d6 = length > 6 ? this._getByReflectiveDependency(provider, deps[6]) : null;
        d7 = length > 7 ? this._getByReflectiveDependency(provider, deps[7]) : null;
        d8 = length > 8 ? this._getByReflectiveDependency(provider, deps[8]) : null;
        d9 = length > 9 ? this._getByReflectiveDependency(provider, deps[9]) : null;
        d10 = length > 10 ? this._getByReflectiveDependency(provider, deps[10]) : null;
        d11 = length > 11 ? this._getByReflectiveDependency(provider, deps[11]) : null;
        d12 = length > 12 ? this._getByReflectiveDependency(provider, deps[12]) : null;
        d13 = length > 13 ? this._getByReflectiveDependency(provider, deps[13]) : null;
        d14 = length > 14 ? this._getByReflectiveDependency(provider, deps[14]) : null;
        d15 = length > 15 ? this._getByReflectiveDependency(provider, deps[15]) : null;
        d16 = length > 16 ? this._getByReflectiveDependency(provider, deps[16]) : null;
        d17 = length > 17 ? this._getByReflectiveDependency(provider, deps[17]) : null;
        d18 = length > 18 ? this._getByReflectiveDependency(provider, deps[18]) : null;
        d19 = length > 19 ? this._getByReflectiveDependency(provider, deps[19]) : null;
      } catch (e) {
        if (e instanceof reflective_exceptions_1.AbstractProviderError || e instanceof reflective_exceptions_1.InstantiationError) {
          e.addKey(this, provider.key);
        }
        throw e;
      }
      var obj;
      try {
        switch (length) {
          case 0:
            obj = factory();
            break;
          case 1:
            obj = factory(d0);
            break;
          case 2:
            obj = factory(d0, d1);
            break;
          case 3:
            obj = factory(d0, d1, d2);
            break;
          case 4:
            obj = factory(d0, d1, d2, d3);
            break;
          case 5:
            obj = factory(d0, d1, d2, d3, d4);
            break;
          case 6:
            obj = factory(d0, d1, d2, d3, d4, d5);
            break;
          case 7:
            obj = factory(d0, d1, d2, d3, d4, d5, d6);
            break;
          case 8:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7);
            break;
          case 9:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8);
            break;
          case 10:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9);
            break;
          case 11:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10);
            break;
          case 12:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11);
            break;
          case 13:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12);
            break;
          case 14:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13);
            break;
          case 15:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14);
            break;
          case 16:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15);
            break;
          case 17:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16);
            break;
          case 18:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17);
            break;
          case 19:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18);
            break;
          case 20:
            obj = factory(d0, d1, d2, d3, d4, d5, d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19);
            break;
          default:
            throw new exceptions_1.BaseException("Cannot instantiate '" + provider.key.displayName + "' because it has more than 20 dependencies");
        }
      } catch (e) {
        throw new reflective_exceptions_1.InstantiationError(this, e, e.stack, provider.key);
      }
      return obj;
    };
    ReflectiveInjector_.prototype._getByReflectiveDependency = function(provider, dep) {
      return this._getByKey(dep.key, dep.lowerBoundVisibility, dep.upperBoundVisibility, dep.optional ? null : injector_1.THROW_IF_NOT_FOUND);
    };
    ReflectiveInjector_.prototype._getByKey = function(key, lowerBoundVisibility, upperBoundVisibility, notFoundValue) {
      if (key === INJECTOR_KEY) {
        return this;
      }
      if (upperBoundVisibility instanceof metadata_1.SelfMetadata) {
        return this._getByKeySelf(key, notFoundValue);
      } else {
        return this._getByKeyDefault(key, notFoundValue, lowerBoundVisibility);
      }
    };
    ReflectiveInjector_.prototype._throwOrNull = function(key, notFoundValue) {
      if (notFoundValue !== injector_1.THROW_IF_NOT_FOUND) {
        return notFoundValue;
      } else {
        throw new reflective_exceptions_1.NoProviderError(this, key);
      }
    };
    ReflectiveInjector_.prototype._getByKeySelf = function(key, notFoundValue) {
      var obj = this._strategy.getObjByKeyId(key.id);
      return (obj !== UNDEFINED) ? obj : this._throwOrNull(key, notFoundValue);
    };
    ReflectiveInjector_.prototype._getByKeyDefault = function(key, notFoundValue, lowerBoundVisibility) {
      var inj;
      if (lowerBoundVisibility instanceof metadata_1.SkipSelfMetadata) {
        inj = this._parent;
      } else {
        inj = this;
      }
      while (inj instanceof ReflectiveInjector_) {
        var inj_ = inj;
        var obj = inj_._strategy.getObjByKeyId(key.id);
        if (obj !== UNDEFINED)
          return obj;
        inj = inj_._parent;
      }
      if (inj !== null) {
        return inj.get(key.token, notFoundValue);
      } else {
        return this._throwOrNull(key, notFoundValue);
      }
    };
    Object.defineProperty(ReflectiveInjector_.prototype, "displayName", {
      get: function() {
        return "ReflectiveInjector(providers: [" + _mapProviders(this, function(b) {
          return (" \"" + b.key.displayName + "\" ");
        }).join(", ") + "])";
      },
      enumerable: true,
      configurable: true
    });
    ReflectiveInjector_.prototype.toString = function() {
      return this.displayName;
    };
    return ReflectiveInjector_;
  }());
  exports.ReflectiveInjector_ = ReflectiveInjector_;
  var INJECTOR_KEY = reflective_key_1.ReflectiveKey.get(injector_1.Injector);
  function _mapProviders(injector, fn) {
    var res = [];
    for (var i = 0; i < injector._proto.numberOfProviders; ++i) {
      res.push(fn(injector._proto.getProviderAtIndex(i)));
    }
    return res;
  }
  return module.exports;
});

$__System.registerDynamic("2e", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReflectorReader = (function() {
    function ReflectorReader() {}
    return ReflectorReader;
  }());
  exports.ReflectorReader = ReflectorReader;
  return module.exports;
});

$__System.registerDynamic("4f", ["e", "32", "1c", "2e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var collection_1 = $__require('1c');
  var reflector_reader_1 = $__require('2e');
  var ReflectionInfo = (function() {
    function ReflectionInfo(annotations, parameters, factory, interfaces, propMetadata) {
      this.annotations = annotations;
      this.parameters = parameters;
      this.factory = factory;
      this.interfaces = interfaces;
      this.propMetadata = propMetadata;
    }
    return ReflectionInfo;
  }());
  exports.ReflectionInfo = ReflectionInfo;
  var Reflector = (function(_super) {
    __extends(Reflector, _super);
    function Reflector(reflectionCapabilities) {
      _super.call(this);
      this._injectableInfo = new collection_1.Map();
      this._getters = new collection_1.Map();
      this._setters = new collection_1.Map();
      this._methods = new collection_1.Map();
      this._usedKeys = null;
      this.reflectionCapabilities = reflectionCapabilities;
    }
    Reflector.prototype.isReflectionEnabled = function() {
      return this.reflectionCapabilities.isReflectionEnabled();
    };
    Reflector.prototype.trackUsage = function() {
      this._usedKeys = new collection_1.Set();
    };
    Reflector.prototype.listUnusedKeys = function() {
      var _this = this;
      if (this._usedKeys == null) {
        throw new exceptions_1.BaseException('Usage tracking is disabled');
      }
      var allTypes = collection_1.MapWrapper.keys(this._injectableInfo);
      return allTypes.filter(function(key) {
        return !collection_1.SetWrapper.has(_this._usedKeys, key);
      });
    };
    Reflector.prototype.registerFunction = function(func, funcInfo) {
      this._injectableInfo.set(func, funcInfo);
    };
    Reflector.prototype.registerType = function(type, typeInfo) {
      this._injectableInfo.set(type, typeInfo);
    };
    Reflector.prototype.registerGetters = function(getters) {
      _mergeMaps(this._getters, getters);
    };
    Reflector.prototype.registerSetters = function(setters) {
      _mergeMaps(this._setters, setters);
    };
    Reflector.prototype.registerMethods = function(methods) {
      _mergeMaps(this._methods, methods);
    };
    Reflector.prototype.factory = function(type) {
      if (this._containsReflectionInfo(type)) {
        var res = this._getReflectionInfo(type).factory;
        return lang_1.isPresent(res) ? res : null;
      } else {
        return this.reflectionCapabilities.factory(type);
      }
    };
    Reflector.prototype.parameters = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).parameters;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.parameters(typeOrFunc);
      }
    };
    Reflector.prototype.annotations = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).annotations;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.annotations(typeOrFunc);
      }
    };
    Reflector.prototype.propMetadata = function(typeOrFunc) {
      if (this._injectableInfo.has(typeOrFunc)) {
        var res = this._getReflectionInfo(typeOrFunc).propMetadata;
        return lang_1.isPresent(res) ? res : {};
      } else {
        return this.reflectionCapabilities.propMetadata(typeOrFunc);
      }
    };
    Reflector.prototype.interfaces = function(type) {
      if (this._injectableInfo.has(type)) {
        var res = this._getReflectionInfo(type).interfaces;
        return lang_1.isPresent(res) ? res : [];
      } else {
        return this.reflectionCapabilities.interfaces(type);
      }
    };
    Reflector.prototype.getter = function(name) {
      if (this._getters.has(name)) {
        return this._getters.get(name);
      } else {
        return this.reflectionCapabilities.getter(name);
      }
    };
    Reflector.prototype.setter = function(name) {
      if (this._setters.has(name)) {
        return this._setters.get(name);
      } else {
        return this.reflectionCapabilities.setter(name);
      }
    };
    Reflector.prototype.method = function(name) {
      if (this._methods.has(name)) {
        return this._methods.get(name);
      } else {
        return this.reflectionCapabilities.method(name);
      }
    };
    Reflector.prototype._getReflectionInfo = function(typeOrFunc) {
      if (lang_1.isPresent(this._usedKeys)) {
        this._usedKeys.add(typeOrFunc);
      }
      return this._injectableInfo.get(typeOrFunc);
    };
    Reflector.prototype._containsReflectionInfo = function(typeOrFunc) {
      return this._injectableInfo.has(typeOrFunc);
    };
    Reflector.prototype.importUri = function(type) {
      return this.reflectionCapabilities.importUri(type);
    };
    return Reflector;
  }(reflector_reader_1.ReflectorReader));
  exports.Reflector = Reflector;
  function _mergeMaps(target, config) {
    collection_1.StringMapWrapper.forEach(config, function(v, k) {
      return target.set(k, v);
    });
  }
  return module.exports;
});

$__System.registerDynamic("2d", ["4f", "50"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var reflector_1 = $__require('4f');
  var reflector_2 = $__require('4f');
  exports.Reflector = reflector_2.Reflector;
  exports.ReflectionInfo = reflector_2.ReflectionInfo;
  var reflection_capabilities_1 = $__require('50');
  exports.reflector = new reflector_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities());
  return module.exports;
});

$__System.registerDynamic("4c", ["e", "1c", "2d", "4e", "f", "4d", "10", "51", "52"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var reflection_1 = $__require('2d');
  var reflective_key_1 = $__require('4e');
  var metadata_1 = $__require('f');
  var reflective_exceptions_1 = $__require('4d');
  var forward_ref_1 = $__require('10');
  var provider_1 = $__require('51');
  var provider_util_1 = $__require('52');
  var ReflectiveDependency = (function() {
    function ReflectiveDependency(key, optional, lowerBoundVisibility, upperBoundVisibility, properties) {
      this.key = key;
      this.optional = optional;
      this.lowerBoundVisibility = lowerBoundVisibility;
      this.upperBoundVisibility = upperBoundVisibility;
      this.properties = properties;
    }
    ReflectiveDependency.fromKey = function(key) {
      return new ReflectiveDependency(key, false, null, null, []);
    };
    return ReflectiveDependency;
  }());
  exports.ReflectiveDependency = ReflectiveDependency;
  var _EMPTY_LIST = [];
  var ResolvedReflectiveProvider_ = (function() {
    function ResolvedReflectiveProvider_(key, resolvedFactories, multiProvider) {
      this.key = key;
      this.resolvedFactories = resolvedFactories;
      this.multiProvider = multiProvider;
    }
    Object.defineProperty(ResolvedReflectiveProvider_.prototype, "resolvedFactory", {
      get: function() {
        return this.resolvedFactories[0];
      },
      enumerable: true,
      configurable: true
    });
    return ResolvedReflectiveProvider_;
  }());
  exports.ResolvedReflectiveProvider_ = ResolvedReflectiveProvider_;
  var ResolvedReflectiveFactory = (function() {
    function ResolvedReflectiveFactory(factory, dependencies) {
      this.factory = factory;
      this.dependencies = dependencies;
    }
    return ResolvedReflectiveFactory;
  }());
  exports.ResolvedReflectiveFactory = ResolvedReflectiveFactory;
  function resolveReflectiveFactory(provider) {
    var factoryFn;
    var resolvedDeps;
    if (lang_1.isPresent(provider.useClass)) {
      var useClass = forward_ref_1.resolveForwardRef(provider.useClass);
      factoryFn = reflection_1.reflector.factory(useClass);
      resolvedDeps = _dependenciesFor(useClass);
    } else if (lang_1.isPresent(provider.useExisting)) {
      factoryFn = function(aliasInstance) {
        return aliasInstance;
      };
      resolvedDeps = [ReflectiveDependency.fromKey(reflective_key_1.ReflectiveKey.get(provider.useExisting))];
    } else if (lang_1.isPresent(provider.useFactory)) {
      factoryFn = provider.useFactory;
      resolvedDeps = constructDependencies(provider.useFactory, provider.dependencies);
    } else {
      factoryFn = function() {
        return provider.useValue;
      };
      resolvedDeps = _EMPTY_LIST;
    }
    return new ResolvedReflectiveFactory(factoryFn, resolvedDeps);
  }
  exports.resolveReflectiveFactory = resolveReflectiveFactory;
  function resolveReflectiveProvider(provider) {
    return new ResolvedReflectiveProvider_(reflective_key_1.ReflectiveKey.get(provider.token), [resolveReflectiveFactory(provider)], provider.multi);
  }
  exports.resolveReflectiveProvider = resolveReflectiveProvider;
  function resolveReflectiveProviders(providers) {
    var normalized = _normalizeProviders(providers, []);
    var resolved = normalized.map(resolveReflectiveProvider);
    return collection_1.MapWrapper.values(mergeResolvedReflectiveProviders(resolved, new Map()));
  }
  exports.resolveReflectiveProviders = resolveReflectiveProviders;
  function mergeResolvedReflectiveProviders(providers, normalizedProvidersMap) {
    for (var i = 0; i < providers.length; i++) {
      var provider = providers[i];
      var existing = normalizedProvidersMap.get(provider.key.id);
      if (lang_1.isPresent(existing)) {
        if (provider.multiProvider !== existing.multiProvider) {
          throw new reflective_exceptions_1.MixingMultiProvidersWithRegularProvidersError(existing, provider);
        }
        if (provider.multiProvider) {
          for (var j = 0; j < provider.resolvedFactories.length; j++) {
            existing.resolvedFactories.push(provider.resolvedFactories[j]);
          }
        } else {
          normalizedProvidersMap.set(provider.key.id, provider);
        }
      } else {
        var resolvedProvider;
        if (provider.multiProvider) {
          resolvedProvider = new ResolvedReflectiveProvider_(provider.key, collection_1.ListWrapper.clone(provider.resolvedFactories), provider.multiProvider);
        } else {
          resolvedProvider = provider;
        }
        normalizedProvidersMap.set(provider.key.id, resolvedProvider);
      }
    }
    return normalizedProvidersMap;
  }
  exports.mergeResolvedReflectiveProviders = mergeResolvedReflectiveProviders;
  function _normalizeProviders(providers, res) {
    providers.forEach(function(b) {
      if (b instanceof lang_1.Type) {
        res.push(provider_1.provide(b, {useClass: b}));
      } else if (b instanceof provider_1.Provider) {
        res.push(b);
      } else if (provider_util_1.isProviderLiteral(b)) {
        res.push(provider_util_1.createProvider(b));
      } else if (b instanceof Array) {
        _normalizeProviders(b, res);
      } else if (b instanceof provider_1.ProviderBuilder) {
        throw new reflective_exceptions_1.InvalidProviderError(b.token);
      } else {
        throw new reflective_exceptions_1.InvalidProviderError(b);
      }
    });
    return res;
  }
  function constructDependencies(typeOrFunc, dependencies) {
    if (lang_1.isBlank(dependencies)) {
      return _dependenciesFor(typeOrFunc);
    } else {
      var params = dependencies.map(function(t) {
        return [t];
      });
      return dependencies.map(function(t) {
        return _extractToken(typeOrFunc, t, params);
      });
    }
  }
  exports.constructDependencies = constructDependencies;
  function _dependenciesFor(typeOrFunc) {
    var params = reflection_1.reflector.parameters(typeOrFunc);
    if (lang_1.isBlank(params))
      return [];
    if (params.some(lang_1.isBlank)) {
      throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
    return params.map(function(p) {
      return _extractToken(typeOrFunc, p, params);
    });
  }
  function _extractToken(typeOrFunc, metadata, params) {
    var depProps = [];
    var token = null;
    var optional = false;
    if (!lang_1.isArray(metadata)) {
      if (metadata instanceof metadata_1.InjectMetadata) {
        return _createDependency(metadata.token, optional, null, null, depProps);
      } else {
        return _createDependency(metadata, optional, null, null, depProps);
      }
    }
    var lowerBoundVisibility = null;
    var upperBoundVisibility = null;
    for (var i = 0; i < metadata.length; ++i) {
      var paramMetadata = metadata[i];
      if (paramMetadata instanceof lang_1.Type) {
        token = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.InjectMetadata) {
        token = paramMetadata.token;
      } else if (paramMetadata instanceof metadata_1.OptionalMetadata) {
        optional = true;
      } else if (paramMetadata instanceof metadata_1.SelfMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.HostMetadata) {
        upperBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.SkipSelfMetadata) {
        lowerBoundVisibility = paramMetadata;
      } else if (paramMetadata instanceof metadata_1.DependencyMetadata) {
        if (lang_1.isPresent(paramMetadata.token)) {
          token = paramMetadata.token;
        }
        depProps.push(paramMetadata);
      }
    }
    token = forward_ref_1.resolveForwardRef(token);
    if (lang_1.isPresent(token)) {
      return _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps);
    } else {
      throw new reflective_exceptions_1.NoAnnotationError(typeOrFunc, params);
    }
  }
  function _createDependency(token, optional, lowerBoundVisibility, upperBoundVisibility, depProps) {
    return new ReflectiveDependency(reflective_key_1.ReflectiveKey.get(token), optional, lowerBoundVisibility, upperBoundVisibility, depProps);
  }
  return module.exports;
});

$__System.registerDynamic("10", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  function forwardRef(forwardRefFn) {
    forwardRefFn.__forward_ref__ = forwardRef;
    forwardRefFn.toString = function() {
      return lang_1.stringify(this());
    };
    return forwardRefFn;
  }
  exports.forwardRef = forwardRef;
  function resolveForwardRef(type) {
    if (lang_1.isFunction(type) && type.hasOwnProperty('__forward_ref__') && type.__forward_ref__ === forwardRef) {
      return type();
    } else {
      return type;
    }
  }
  exports.resolveForwardRef = resolveForwardRef;
  return module.exports;
});

$__System.registerDynamic("4e", ["e", "32", "10"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var forward_ref_1 = $__require('10');
  var ReflectiveKey = (function() {
    function ReflectiveKey(token, id) {
      this.token = token;
      this.id = id;
      if (lang_1.isBlank(token)) {
        throw new exceptions_1.BaseException('Token must be defined!');
      }
    }
    Object.defineProperty(ReflectiveKey.prototype, "displayName", {
      get: function() {
        return lang_1.stringify(this.token);
      },
      enumerable: true,
      configurable: true
    });
    ReflectiveKey.get = function(token) {
      return _globalKeyRegistry.get(forward_ref_1.resolveForwardRef(token));
    };
    Object.defineProperty(ReflectiveKey, "numberOfKeys", {
      get: function() {
        return _globalKeyRegistry.numberOfKeys;
      },
      enumerable: true,
      configurable: true
    });
    return ReflectiveKey;
  }());
  exports.ReflectiveKey = ReflectiveKey;
  var KeyRegistry = (function() {
    function KeyRegistry() {
      this._allKeys = new Map();
    }
    KeyRegistry.prototype.get = function(token) {
      if (token instanceof ReflectiveKey)
        return token;
      if (this._allKeys.has(token)) {
        return this._allKeys.get(token);
      }
      var newKey = new ReflectiveKey(token, ReflectiveKey.numberOfKeys);
      this._allKeys.set(token, newKey);
      return newKey;
    };
    Object.defineProperty(KeyRegistry.prototype, "numberOfKeys", {
      get: function() {
        return this._allKeys.size;
      },
      enumerable: true,
      configurable: true
    });
    return KeyRegistry;
  }());
  exports.KeyRegistry = KeyRegistry;
  var _globalKeyRegistry = new KeyRegistry();
  return module.exports;
});

$__System.registerDynamic("4d", ["1c", "e", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var collection_1 = $__require('1c');
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  function findFirstClosedCycle(keys) {
    var res = [];
    for (var i = 0; i < keys.length; ++i) {
      if (collection_1.ListWrapper.contains(res, keys[i])) {
        res.push(keys[i]);
        return res;
      } else {
        res.push(keys[i]);
      }
    }
    return res;
  }
  function constructResolvingPath(keys) {
    if (keys.length > 1) {
      var reversed = findFirstClosedCycle(collection_1.ListWrapper.reversed(keys));
      var tokenStrs = reversed.map(function(k) {
        return lang_1.stringify(k.token);
      });
      return " (" + tokenStrs.join(' -> ') + ")";
    } else {
      return "";
    }
  }
  var AbstractProviderError = (function(_super) {
    __extends(AbstractProviderError, _super);
    function AbstractProviderError(injector, key, constructResolvingMessage) {
      _super.call(this, "DI Exception");
      this.keys = [key];
      this.injectors = [injector];
      this.constructResolvingMessage = constructResolvingMessage;
      this.message = this.constructResolvingMessage(this.keys);
    }
    AbstractProviderError.prototype.addKey = function(injector, key) {
      this.injectors.push(injector);
      this.keys.push(key);
      this.message = this.constructResolvingMessage(this.keys);
    };
    Object.defineProperty(AbstractProviderError.prototype, "context", {
      get: function() {
        return this.injectors[this.injectors.length - 1].debugContext();
      },
      enumerable: true,
      configurable: true
    });
    return AbstractProviderError;
  }(exceptions_1.BaseException));
  exports.AbstractProviderError = AbstractProviderError;
  var NoProviderError = (function(_super) {
    __extends(NoProviderError, _super);
    function NoProviderError(injector, key) {
      _super.call(this, injector, key, function(keys) {
        var first = lang_1.stringify(collection_1.ListWrapper.first(keys).token);
        return "No provider for " + first + "!" + constructResolvingPath(keys);
      });
    }
    return NoProviderError;
  }(AbstractProviderError));
  exports.NoProviderError = NoProviderError;
  var CyclicDependencyError = (function(_super) {
    __extends(CyclicDependencyError, _super);
    function CyclicDependencyError(injector, key) {
      _super.call(this, injector, key, function(keys) {
        return "Cannot instantiate cyclic dependency!" + constructResolvingPath(keys);
      });
    }
    return CyclicDependencyError;
  }(AbstractProviderError));
  exports.CyclicDependencyError = CyclicDependencyError;
  var InstantiationError = (function(_super) {
    __extends(InstantiationError, _super);
    function InstantiationError(injector, originalException, originalStack, key) {
      _super.call(this, "DI Exception", originalException, originalStack, null);
      this.keys = [key];
      this.injectors = [injector];
    }
    InstantiationError.prototype.addKey = function(injector, key) {
      this.injectors.push(injector);
      this.keys.push(key);
    };
    Object.defineProperty(InstantiationError.prototype, "wrapperMessage", {
      get: function() {
        var first = lang_1.stringify(collection_1.ListWrapper.first(this.keys).token);
        return "Error during instantiation of " + first + "!" + constructResolvingPath(this.keys) + ".";
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "causeKey", {
      get: function() {
        return this.keys[0];
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(InstantiationError.prototype, "context", {
      get: function() {
        return this.injectors[this.injectors.length - 1].debugContext();
      },
      enumerable: true,
      configurable: true
    });
    return InstantiationError;
  }(exceptions_1.WrappedException));
  exports.InstantiationError = InstantiationError;
  var InvalidProviderError = (function(_super) {
    __extends(InvalidProviderError, _super);
    function InvalidProviderError(provider) {
      _super.call(this, "Invalid provider - only instances of Provider and Type are allowed, got: " + provider.toString());
    }
    return InvalidProviderError;
  }(exceptions_1.BaseException));
  exports.InvalidProviderError = InvalidProviderError;
  var NoAnnotationError = (function(_super) {
    __extends(NoAnnotationError, _super);
    function NoAnnotationError(typeOrFunc, params) {
      _super.call(this, NoAnnotationError._genMessage(typeOrFunc, params));
    }
    NoAnnotationError._genMessage = function(typeOrFunc, params) {
      var signature = [];
      for (var i = 0,
          ii = params.length; i < ii; i++) {
        var parameter = params[i];
        if (lang_1.isBlank(parameter) || parameter.length == 0) {
          signature.push('?');
        } else {
          signature.push(parameter.map(lang_1.stringify).join(' '));
        }
      }
      return "Cannot resolve all parameters for '" + lang_1.stringify(typeOrFunc) + "'(" + signature.join(', ') + "). " + "Make sure that all the parameters are decorated with Inject or have valid type annotations and that '" + lang_1.stringify(typeOrFunc) + "' is decorated with Injectable.";
    };
    return NoAnnotationError;
  }(exceptions_1.BaseException));
  exports.NoAnnotationError = NoAnnotationError;
  var OutOfBoundsError = (function(_super) {
    __extends(OutOfBoundsError, _super);
    function OutOfBoundsError(index) {
      _super.call(this, "Index " + index + " is out-of-bounds.");
    }
    return OutOfBoundsError;
  }(exceptions_1.BaseException));
  exports.OutOfBoundsError = OutOfBoundsError;
  var MixingMultiProvidersWithRegularProvidersError = (function(_super) {
    __extends(MixingMultiProvidersWithRegularProvidersError, _super);
    function MixingMultiProvidersWithRegularProvidersError(provider1, provider2) {
      _super.call(this, "Cannot mix multi providers and regular providers, got: " + provider1.toString() + " " + provider2.toString());
    }
    return MixingMultiProvidersWithRegularProvidersError;
  }(exceptions_1.BaseException));
  exports.MixingMultiProvidersWithRegularProvidersError = MixingMultiProvidersWithRegularProvidersError;
  return module.exports;
});

$__System.registerDynamic("53", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var OpaqueToken = (function() {
    function OpaqueToken(_desc) {
      this._desc = _desc;
    }
    OpaqueToken.prototype.toString = function() {
      return "Token " + this._desc;
    };
    return OpaqueToken;
  }());
  exports.OpaqueToken = OpaqueToken;
  return module.exports;
});

$__System.registerDynamic("2a", ["f", "33", "10", "3f", "36", "51", "4c", "4e", "4d", "53"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  var metadata_1 = $__require('f');
  exports.InjectMetadata = metadata_1.InjectMetadata;
  exports.OptionalMetadata = metadata_1.OptionalMetadata;
  exports.InjectableMetadata = metadata_1.InjectableMetadata;
  exports.SelfMetadata = metadata_1.SelfMetadata;
  exports.HostMetadata = metadata_1.HostMetadata;
  exports.SkipSelfMetadata = metadata_1.SkipSelfMetadata;
  exports.DependencyMetadata = metadata_1.DependencyMetadata;
  __export($__require('33'));
  var forward_ref_1 = $__require('10');
  exports.forwardRef = forward_ref_1.forwardRef;
  exports.resolveForwardRef = forward_ref_1.resolveForwardRef;
  var injector_1 = $__require('3f');
  exports.Injector = injector_1.Injector;
  var reflective_injector_1 = $__require('36');
  exports.ReflectiveInjector = reflective_injector_1.ReflectiveInjector;
  var provider_1 = $__require('51');
  exports.Binding = provider_1.Binding;
  exports.ProviderBuilder = provider_1.ProviderBuilder;
  exports.bind = provider_1.bind;
  exports.Provider = provider_1.Provider;
  exports.provide = provider_1.provide;
  var reflective_provider_1 = $__require('4c');
  exports.ResolvedReflectiveFactory = reflective_provider_1.ResolvedReflectiveFactory;
  exports.ReflectiveDependency = reflective_provider_1.ReflectiveDependency;
  var reflective_key_1 = $__require('4e');
  exports.ReflectiveKey = reflective_key_1.ReflectiveKey;
  var reflective_exceptions_1 = $__require('4d');
  exports.NoProviderError = reflective_exceptions_1.NoProviderError;
  exports.AbstractProviderError = reflective_exceptions_1.AbstractProviderError;
  exports.CyclicDependencyError = reflective_exceptions_1.CyclicDependencyError;
  exports.InstantiationError = reflective_exceptions_1.InstantiationError;
  exports.InvalidProviderError = reflective_exceptions_1.InvalidProviderError;
  exports.NoAnnotationError = reflective_exceptions_1.NoAnnotationError;
  exports.OutOfBoundsError = reflective_exceptions_1.OutOfBoundsError;
  var opaque_token_1 = $__require('53');
  exports.OpaqueToken = opaque_token_1.OpaqueToken;
  return module.exports;
});

$__System.registerDynamic("34", ["2a", "e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var di_1 = $__require('2a');
  var lang_1 = $__require('e');
  exports.APP_ID = new di_1.OpaqueToken('AppId');
  function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
  }
  exports.APP_ID_RANDOM_PROVIDER = {
    provide: exports.APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: []
  };
  function _randomChar() {
    return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
  }
  exports.PLATFORM_INITIALIZER = new di_1.OpaqueToken("Platform Initializer");
  exports.APP_INITIALIZER = new di_1.OpaqueToken("Application Initializer");
  exports.PACKAGE_ROOT_URL = new di_1.OpaqueToken("Application Packages Root URL");
  return module.exports;
});

$__System.registerDynamic("38", ["44", "e", "1c", "32", "41", "26", "28", "1a", "34", "33", "4b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var security_1 = $__require('44');
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var exceptions_1 = $__require('32');
  var element_1 = $__require('41');
  var exceptions_2 = $__require('26');
  var change_detection_1 = $__require('28');
  var api_1 = $__require('1a');
  var application_tokens_1 = $__require('34');
  var decorators_1 = $__require('33');
  var change_detection_util_1 = $__require('4b');
  var ViewUtils = (function() {
    function ViewUtils(_renderer, _appId, sanitizer) {
      this._renderer = _renderer;
      this._appId = _appId;
      this._nextCompTypeId = 0;
      this.sanitizer = sanitizer;
    }
    ViewUtils.prototype.createRenderComponentType = function(templateUrl, slotCount, encapsulation, styles) {
      return new api_1.RenderComponentType(this._appId + "-" + this._nextCompTypeId++, templateUrl, slotCount, encapsulation, styles);
    };
    ViewUtils.prototype.renderComponent = function(renderComponentType) {
      return this._renderer.renderComponent(renderComponentType);
    };
    ViewUtils.decorators = [{type: decorators_1.Injectable}];
    ViewUtils.ctorParameters = [{type: api_1.RootRenderer}, {
      type: undefined,
      decorators: [{
        type: decorators_1.Inject,
        args: [application_tokens_1.APP_ID]
      }]
    }, {type: security_1.SanitizationService}];
    return ViewUtils;
  }());
  exports.ViewUtils = ViewUtils;
  function flattenNestedViewRenderNodes(nodes) {
    return _flattenNestedViewRenderNodes(nodes, []);
  }
  exports.flattenNestedViewRenderNodes = flattenNestedViewRenderNodes;
  function _flattenNestedViewRenderNodes(nodes, renderNodes) {
    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      if (node instanceof element_1.AppElement) {
        var appEl = node;
        renderNodes.push(appEl.nativeElement);
        if (lang_1.isPresent(appEl.nestedViews)) {
          for (var k = 0; k < appEl.nestedViews.length; k++) {
            _flattenNestedViewRenderNodes(appEl.nestedViews[k].rootNodesOrAppElements, renderNodes);
          }
        }
      } else {
        renderNodes.push(node);
      }
    }
    return renderNodes;
  }
  var EMPTY_ARR = [];
  function ensureSlotCount(projectableNodes, expectedSlotCount) {
    var res;
    if (lang_1.isBlank(projectableNodes)) {
      res = EMPTY_ARR;
    } else if (projectableNodes.length < expectedSlotCount) {
      var givenSlotCount = projectableNodes.length;
      res = collection_1.ListWrapper.createFixedSize(expectedSlotCount);
      for (var i = 0; i < expectedSlotCount; i++) {
        res[i] = (i < givenSlotCount) ? projectableNodes[i] : EMPTY_ARR;
      }
    } else {
      res = projectableNodes;
    }
    return res;
  }
  exports.ensureSlotCount = ensureSlotCount;
  exports.MAX_INTERPOLATION_VALUES = 9;
  function interpolate(valueCount, c0, a1, c1, a2, c2, a3, c3, a4, c4, a5, c5, a6, c6, a7, c7, a8, c8, a9, c9) {
    switch (valueCount) {
      case 1:
        return c0 + _toStringWithNull(a1) + c1;
      case 2:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2;
      case 3:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3;
      case 4:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4;
      case 5:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5;
      case 6:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6;
      case 7:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7;
      case 8:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8;
      case 9:
        return c0 + _toStringWithNull(a1) + c1 + _toStringWithNull(a2) + c2 + _toStringWithNull(a3) + c3 + _toStringWithNull(a4) + c4 + _toStringWithNull(a5) + c5 + _toStringWithNull(a6) + c6 + _toStringWithNull(a7) + c7 + _toStringWithNull(a8) + c8 + _toStringWithNull(a9) + c9;
      default:
        throw new exceptions_1.BaseException("Does not support more than 9 expressions");
    }
  }
  exports.interpolate = interpolate;
  function _toStringWithNull(v) {
    return v != null ? v.toString() : '';
  }
  function checkBinding(throwOnChange, oldValue, newValue) {
    if (throwOnChange) {
      if (!change_detection_1.devModeEqual(oldValue, newValue)) {
        throw new exceptions_2.ExpressionChangedAfterItHasBeenCheckedException(oldValue, newValue, null);
      }
      return false;
    } else {
      return !lang_1.looseIdentical(oldValue, newValue);
    }
  }
  exports.checkBinding = checkBinding;
  function arrayLooseIdentical(a, b) {
    if (a.length != b.length)
      return false;
    for (var i = 0; i < a.length; ++i) {
      if (!lang_1.looseIdentical(a[i], b[i]))
        return false;
    }
    return true;
  }
  exports.arrayLooseIdentical = arrayLooseIdentical;
  function mapLooseIdentical(m1, m2) {
    var k1 = collection_1.StringMapWrapper.keys(m1);
    var k2 = collection_1.StringMapWrapper.keys(m2);
    if (k1.length != k2.length) {
      return false;
    }
    var key;
    for (var i = 0; i < k1.length; i++) {
      key = k1[i];
      if (!lang_1.looseIdentical(m1[key], m2[key])) {
        return false;
      }
    }
    return true;
  }
  exports.mapLooseIdentical = mapLooseIdentical;
  function castByValue(input, value) {
    return input;
  }
  exports.castByValue = castByValue;
  exports.EMPTY_ARRAY = [];
  exports.EMPTY_MAP = {};
  function pureProxy1(fn) {
    var result;
    var v0;
    v0 = change_detection_util_1.uninitialized;
    return function(p0) {
      if (!lang_1.looseIdentical(v0, p0)) {
        v0 = p0;
        result = fn(p0);
      }
      return result;
    };
  }
  exports.pureProxy1 = pureProxy1;
  function pureProxy2(fn) {
    var result;
    var v0,
        v1;
    v0 = v1 = change_detection_util_1.uninitialized;
    return function(p0, p1) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1)) {
        v0 = p0;
        v1 = p1;
        result = fn(p0, p1);
      }
      return result;
    };
  }
  exports.pureProxy2 = pureProxy2;
  function pureProxy3(fn) {
    var result;
    var v0,
        v1,
        v2;
    v0 = v1 = v2 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        result = fn(p0, p1, p2);
      }
      return result;
    };
  }
  exports.pureProxy3 = pureProxy3;
  function pureProxy4(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3;
    v0 = v1 = v2 = v3 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        result = fn(p0, p1, p2, p3);
      }
      return result;
    };
  }
  exports.pureProxy4 = pureProxy4;
  function pureProxy5(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4;
    v0 = v1 = v2 = v3 = v4 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        result = fn(p0, p1, p2, p3, p4);
      }
      return result;
    };
  }
  exports.pureProxy5 = pureProxy5;
  function pureProxy6(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4,
        v5;
    v0 = v1 = v2 = v3 = v4 = v5 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4, p5) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        v5 = p5;
        result = fn(p0, p1, p2, p3, p4, p5);
      }
      return result;
    };
  }
  exports.pureProxy6 = pureProxy6;
  function pureProxy7(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4,
        v5,
        v6;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4, p5, p6) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) || !lang_1.looseIdentical(v6, p6)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        v5 = p5;
        v6 = p6;
        result = fn(p0, p1, p2, p3, p4, p5, p6);
      }
      return result;
    };
  }
  exports.pureProxy7 = pureProxy7;
  function pureProxy8(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4, p5, p6, p7) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) || !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        v5 = p5;
        v6 = p6;
        v7 = p7;
        result = fn(p0, p1, p2, p3, p4, p5, p6, p7);
      }
      return result;
    };
  }
  exports.pureProxy8 = pureProxy8;
  function pureProxy9(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4, p5, p6, p7, p8) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) || !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7) || !lang_1.looseIdentical(v8, p8)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        v5 = p5;
        v6 = p6;
        v7 = p7;
        v8 = p8;
        result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8);
      }
      return result;
    };
  }
  exports.pureProxy9 = pureProxy9;
  function pureProxy10(fn) {
    var result;
    var v0,
        v1,
        v2,
        v3,
        v4,
        v5,
        v6,
        v7,
        v8,
        v9;
    v0 = v1 = v2 = v3 = v4 = v5 = v6 = v7 = v8 = v9 = change_detection_util_1.uninitialized;
    return function(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9) {
      if (!lang_1.looseIdentical(v0, p0) || !lang_1.looseIdentical(v1, p1) || !lang_1.looseIdentical(v2, p2) || !lang_1.looseIdentical(v3, p3) || !lang_1.looseIdentical(v4, p4) || !lang_1.looseIdentical(v5, p5) || !lang_1.looseIdentical(v6, p6) || !lang_1.looseIdentical(v7, p7) || !lang_1.looseIdentical(v8, p8) || !lang_1.looseIdentical(v9, p9)) {
        v0 = p0;
        v1 = p1;
        v2 = p2;
        v3 = p3;
        v4 = p4;
        v5 = p5;
        v6 = p6;
        v7 = p7;
        v8 = p8;
        v9 = p9;
        result = fn(p0, p1, p2, p3, p4, p5, p6, p7, p8, p9);
      }
      return result;
    };
  }
  exports.pureProxy10 = pureProxy10;
  return module.exports;
});

$__System.registerDynamic("14", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(ViewEncapsulation) {
    ViewEncapsulation[ViewEncapsulation["Emulated"] = 0] = "Emulated";
    ViewEncapsulation[ViewEncapsulation["Native"] = 1] = "Native";
    ViewEncapsulation[ViewEncapsulation["None"] = 2] = "None";
  })(exports.ViewEncapsulation || (exports.ViewEncapsulation = {}));
  var ViewEncapsulation = exports.ViewEncapsulation;
  exports.VIEW_ENCAPSULATION_VALUES = [ViewEncapsulation.Emulated, ViewEncapsulation.Native, ViewEncapsulation.None];
  var ViewMetadata = (function() {
    function ViewMetadata(_a) {
      var _b = _a === void 0 ? {} : _a,
          templateUrl = _b.templateUrl,
          template = _b.template,
          directives = _b.directives,
          pipes = _b.pipes,
          encapsulation = _b.encapsulation,
          styles = _b.styles,
          styleUrls = _b.styleUrls;
      this.templateUrl = templateUrl;
      this.template = template;
      this.styleUrls = styleUrls;
      this.styles = styles;
      this.directives = directives;
      this.pipes = pipes;
      this.encapsulation = encapsulation;
    }
    return ViewMetadata;
  }());
  exports.ViewMetadata = ViewMetadata;
  return module.exports;
});

$__System.registerDynamic("42", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(ViewType) {
    ViewType[ViewType["HOST"] = 0] = "HOST";
    ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
    ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
  })(exports.ViewType || (exports.ViewType = {}));
  var ViewType = exports.ViewType;
  return module.exports;
});

$__System.registerDynamic("43", ["e", "1c", "42"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var view_type_1 = $__require('42');
  var StaticNodeDebugInfo = (function() {
    function StaticNodeDebugInfo(providerTokens, componentToken, refTokens) {
      this.providerTokens = providerTokens;
      this.componentToken = componentToken;
      this.refTokens = refTokens;
    }
    return StaticNodeDebugInfo;
  }());
  exports.StaticNodeDebugInfo = StaticNodeDebugInfo;
  var DebugContext = (function() {
    function DebugContext(_view, _nodeIndex, _tplRow, _tplCol) {
      this._view = _view;
      this._nodeIndex = _nodeIndex;
      this._tplRow = _tplRow;
      this._tplCol = _tplCol;
    }
    Object.defineProperty(DebugContext.prototype, "_staticNodeInfo", {
      get: function() {
        return lang_1.isPresent(this._nodeIndex) ? this._view.staticNodeDebugInfos[this._nodeIndex] : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "context", {
      get: function() {
        return this._view.context;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "component", {
      get: function() {
        var staticNodeInfo = this._staticNodeInfo;
        if (lang_1.isPresent(staticNodeInfo) && lang_1.isPresent(staticNodeInfo.componentToken)) {
          return this.injector.get(staticNodeInfo.componentToken);
        }
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "componentRenderElement", {
      get: function() {
        var componentView = this._view;
        while (lang_1.isPresent(componentView.declarationAppElement) && componentView.type !== view_type_1.ViewType.COMPONENT) {
          componentView = componentView.declarationAppElement.parentView;
        }
        return lang_1.isPresent(componentView.declarationAppElement) ? componentView.declarationAppElement.nativeElement : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "injector", {
      get: function() {
        return this._view.injector(this._nodeIndex);
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "renderNode", {
      get: function() {
        if (lang_1.isPresent(this._nodeIndex) && lang_1.isPresent(this._view.allNodes)) {
          return this._view.allNodes[this._nodeIndex];
        } else {
          return null;
        }
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "providerTokens", {
      get: function() {
        var staticNodeInfo = this._staticNodeInfo;
        return lang_1.isPresent(staticNodeInfo) ? staticNodeInfo.providerTokens : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "source", {
      get: function() {
        return this._view.componentType.templateUrl + ":" + this._tplRow + ":" + this._tplCol;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugContext.prototype, "references", {
      get: function() {
        var _this = this;
        var varValues = {};
        var staticNodeInfo = this._staticNodeInfo;
        if (lang_1.isPresent(staticNodeInfo)) {
          var refs = staticNodeInfo.refTokens;
          collection_1.StringMapWrapper.forEach(refs, function(refToken, refName) {
            var varValue;
            if (lang_1.isBlank(refToken)) {
              varValue = lang_1.isPresent(_this._view.allNodes) ? _this._view.allNodes[_this._nodeIndex] : null;
            } else {
              varValue = _this._view.injectorGet(refToken, _this._nodeIndex, null);
            }
            varValues[refName] = varValue;
          });
        }
        return varValues;
      },
      enumerable: true,
      configurable: true
    });
    return DebugContext;
  }());
  exports.DebugContext = DebugContext;
  return module.exports;
});

$__System.registerDynamic("4b", ["e", "1c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var lang_2 = $__require('e');
  exports.looseIdentical = lang_2.looseIdentical;
  exports.uninitialized = new Object();
  function devModeEqual(a, b) {
    if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
      return collection_1.areIterablesEqual(a, b, devModeEqual);
    } else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) && !lang_1.isPrimitive(b)) {
      return true;
    } else {
      return lang_1.looseIdentical(a, b);
    }
  }
  exports.devModeEqual = devModeEqual;
  var WrappedValue = (function() {
    function WrappedValue(wrapped) {
      this.wrapped = wrapped;
    }
    WrappedValue.wrap = function(value) {
      return new WrappedValue(value);
    };
    return WrappedValue;
  }());
  exports.WrappedValue = WrappedValue;
  var ValueUnwrapper = (function() {
    function ValueUnwrapper() {
      this.hasWrappedValue = false;
    }
    ValueUnwrapper.prototype.unwrap = function(value) {
      if (value instanceof WrappedValue) {
        this.hasWrappedValue = true;
        return value.wrapped;
      }
      return value;
    };
    ValueUnwrapper.prototype.reset = function() {
      this.hasWrappedValue = false;
    };
    return ValueUnwrapper;
  }());
  exports.ValueUnwrapper = ValueUnwrapper;
  var SimpleChange = (function() {
    function SimpleChange(previousValue, currentValue) {
      this.previousValue = previousValue;
      this.currentValue = currentValue;
    }
    SimpleChange.prototype.isFirstChange = function() {
      return this.previousValue === exports.uninitialized;
    };
    return SimpleChange;
  }());
  exports.SimpleChange = SimpleChange;
  return module.exports;
});

$__System.registerDynamic("1a", ["32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var exceptions_1 = $__require('32');
  var RenderComponentType = (function() {
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles) {
      this.id = id;
      this.templateUrl = templateUrl;
      this.slotCount = slotCount;
      this.encapsulation = encapsulation;
      this.styles = styles;
    }
    return RenderComponentType;
  }());
  exports.RenderComponentType = RenderComponentType;
  var RenderDebugInfo = (function() {
    function RenderDebugInfo() {}
    Object.defineProperty(RenderDebugInfo.prototype, "injector", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "component", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "providerTokens", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "references", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "context", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "source", {
      get: function() {
        return exceptions_1.unimplemented();
      },
      enumerable: true,
      configurable: true
    });
    return RenderDebugInfo;
  }());
  exports.RenderDebugInfo = RenderDebugInfo;
  var Renderer = (function() {
    function Renderer() {}
    return Renderer;
  }());
  exports.Renderer = Renderer;
  var RootRenderer = (function() {
    function RootRenderer() {}
    return RootRenderer;
  }());
  exports.RootRenderer = RootRenderer;
  return module.exports;
});

$__System.registerDynamic("22", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var EMPTY_CONTEXT = new Object();
  var TemplateRef = (function() {
    function TemplateRef() {}
    Object.defineProperty(TemplateRef.prototype, "elementRef", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    return TemplateRef;
  }());
  exports.TemplateRef = TemplateRef;
  var TemplateRef_ = (function(_super) {
    __extends(TemplateRef_, _super);
    function TemplateRef_(_appElement, _viewFactory) {
      _super.call(this);
      this._appElement = _appElement;
      this._viewFactory = _viewFactory;
    }
    TemplateRef_.prototype.createEmbeddedView = function(context) {
      var view = this._viewFactory(this._appElement.parentView.viewUtils, this._appElement.parentInjector, this._appElement);
      if (lang_1.isBlank(context)) {
        context = EMPTY_CONTEXT;
      }
      view.create(context, null, null);
      return view.ref;
    };
    Object.defineProperty(TemplateRef_.prototype, "elementRef", {
      get: function() {
        return this._appElement.elementRef;
      },
      enumerable: true,
      configurable: true
    });
    return TemplateRef_;
  }(TemplateRef));
  exports.TemplateRef_ = TemplateRef_;
  return module.exports;
});

$__System.registerDynamic("54", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function wtfInit() {}
  exports.wtfInit = wtfInit;
  return module.exports;
});

$__System.registerDynamic("50", ["e", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var ReflectionCapabilities = (function() {
    function ReflectionCapabilities(reflect) {
      this._reflect = lang_1.isPresent(reflect) ? reflect : lang_1.global.Reflect;
    }
    ReflectionCapabilities.prototype.isReflectionEnabled = function() {
      return true;
    };
    ReflectionCapabilities.prototype.factory = function(t) {
      switch (t.length) {
        case 0:
          return function() {
            return new t();
          };
        case 1:
          return function(a1) {
            return new t(a1);
          };
        case 2:
          return function(a1, a2) {
            return new t(a1, a2);
          };
        case 3:
          return function(a1, a2, a3) {
            return new t(a1, a2, a3);
          };
        case 4:
          return function(a1, a2, a3, a4) {
            return new t(a1, a2, a3, a4);
          };
        case 5:
          return function(a1, a2, a3, a4, a5) {
            return new t(a1, a2, a3, a4, a5);
          };
        case 6:
          return function(a1, a2, a3, a4, a5, a6) {
            return new t(a1, a2, a3, a4, a5, a6);
          };
        case 7:
          return function(a1, a2, a3, a4, a5, a6, a7) {
            return new t(a1, a2, a3, a4, a5, a6, a7);
          };
        case 8:
          return function(a1, a2, a3, a4, a5, a6, a7, a8) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8);
          };
        case 9:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9);
          };
        case 10:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
          };
        case 11:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
          };
        case 12:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
          };
        case 13:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
          };
        case 14:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14);
          };
        case 15:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
          };
        case 16:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16);
          };
        case 17:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17);
          };
        case 18:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18);
          };
        case 19:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19);
          };
        case 20:
          return function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20) {
            return new t(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16, a17, a18, a19, a20);
          };
      }
      ;
      throw new Error("Cannot create a factory for '" + lang_1.stringify(t) + "' because its constructor has more than 20 arguments");
    };
    ReflectionCapabilities.prototype._zipTypesAndAnnotations = function(paramTypes, paramAnnotations) {
      var result;
      if (typeof paramTypes === 'undefined') {
        result = new Array(paramAnnotations.length);
      } else {
        result = new Array(paramTypes.length);
      }
      for (var i = 0; i < result.length; i++) {
        if (typeof paramTypes === 'undefined') {
          result[i] = [];
        } else if (paramTypes[i] != Object) {
          result[i] = [paramTypes[i]];
        } else {
          result[i] = [];
        }
        if (lang_1.isPresent(paramAnnotations) && lang_1.isPresent(paramAnnotations[i])) {
          result[i] = result[i].concat(paramAnnotations[i]);
        }
      }
      return result;
    };
    ReflectionCapabilities.prototype.parameters = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.parameters)) {
        return typeOrFunc.parameters;
      }
      if (lang_1.isPresent(typeOrFunc.ctorParameters)) {
        var ctorParameters = typeOrFunc.ctorParameters;
        var paramTypes_1 = ctorParameters.map(function(ctorParam) {
          return ctorParam && ctorParam.type;
        });
        var paramAnnotations_1 = ctorParameters.map(function(ctorParam) {
          return ctorParam && convertTsickleDecoratorIntoMetadata(ctorParam.decorators);
        });
        return this._zipTypesAndAnnotations(paramTypes_1, paramAnnotations_1);
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var paramAnnotations = this._reflect.getMetadata('parameters', typeOrFunc);
        var paramTypes = this._reflect.getMetadata('design:paramtypes', typeOrFunc);
        if (lang_1.isPresent(paramTypes) || lang_1.isPresent(paramAnnotations)) {
          return this._zipTypesAndAnnotations(paramTypes, paramAnnotations);
        }
      }
      var parameters = new Array(typeOrFunc.length);
      parameters.fill(undefined);
      return parameters;
    };
    ReflectionCapabilities.prototype.annotations = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.annotations)) {
        var annotations = typeOrFunc.annotations;
        if (lang_1.isFunction(annotations) && annotations.annotations) {
          annotations = annotations.annotations;
        }
        return annotations;
      }
      if (lang_1.isPresent(typeOrFunc.decorators)) {
        return convertTsickleDecoratorIntoMetadata(typeOrFunc.decorators);
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var annotations = this._reflect.getMetadata('annotations', typeOrFunc);
        if (lang_1.isPresent(annotations))
          return annotations;
      }
      return [];
    };
    ReflectionCapabilities.prototype.propMetadata = function(typeOrFunc) {
      if (lang_1.isPresent(typeOrFunc.propMetadata)) {
        var propMetadata = typeOrFunc.propMetadata;
        if (lang_1.isFunction(propMetadata) && propMetadata.propMetadata) {
          propMetadata = propMetadata.propMetadata;
        }
        return propMetadata;
      }
      if (lang_1.isPresent(typeOrFunc.propDecorators)) {
        var propDecorators_1 = typeOrFunc.propDecorators;
        var propMetadata_1 = {};
        Object.keys(propDecorators_1).forEach(function(prop) {
          propMetadata_1[prop] = convertTsickleDecoratorIntoMetadata(propDecorators_1[prop]);
        });
        return propMetadata_1;
      }
      if (lang_1.isPresent(this._reflect) && lang_1.isPresent(this._reflect.getMetadata)) {
        var propMetadata = this._reflect.getMetadata('propMetadata', typeOrFunc);
        if (lang_1.isPresent(propMetadata))
          return propMetadata;
      }
      return {};
    };
    ReflectionCapabilities.prototype.interfaces = function(type) {
      throw new exceptions_1.BaseException("JavaScript does not support interfaces");
    };
    ReflectionCapabilities.prototype.getter = function(name) {
      return new Function('o', 'return o.' + name + ';');
    };
    ReflectionCapabilities.prototype.setter = function(name) {
      return new Function('o', 'v', 'return o.' + name + ' = v;');
    };
    ReflectionCapabilities.prototype.method = function(name) {
      var functionBody = "if (!o." + name + ") throw new Error('\"" + name + "\" is undefined');\n        return o." + name + ".apply(o, args);";
      return new Function('o', 'args', functionBody);
    };
    ReflectionCapabilities.prototype.importUri = function(type) {
      return "./" + lang_1.stringify(type);
    };
    return ReflectionCapabilities;
  }());
  exports.ReflectionCapabilities = ReflectionCapabilities;
  function convertTsickleDecoratorIntoMetadata(decoratorInvocations) {
    if (!decoratorInvocations) {
      return [];
    }
    return decoratorInvocations.map(function(decoratorInvocation) {
      var decoratorType = decoratorInvocation.type;
      var annotationCls = decoratorType.annotationCls;
      var annotationArgs = decoratorInvocation.args ? decoratorInvocation.args : [];
      var annotation = Object.create(annotationCls.prototype);
      annotationCls.apply(annotation, annotationArgs);
      return annotation;
    });
  }
  return module.exports;
});

$__System.registerDynamic("55", ["e", "1c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var collection_1 = $__require('1c');
  var EventListener = (function() {
    function EventListener(name, callback) {
      this.name = name;
      this.callback = callback;
    }
    ;
    return EventListener;
  }());
  exports.EventListener = EventListener;
  var DebugNode = (function() {
    function DebugNode(nativeNode, parent, _debugInfo) {
      this._debugInfo = _debugInfo;
      this.nativeNode = nativeNode;
      if (lang_1.isPresent(parent) && parent instanceof DebugElement) {
        parent.addChild(this);
      } else {
        this.parent = null;
      }
      this.listeners = [];
    }
    Object.defineProperty(DebugNode.prototype, "injector", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.injector : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "componentInstance", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.component : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "context", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.context : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "references", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.references : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "providerTokens", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.providerTokens : null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(DebugNode.prototype, "source", {
      get: function() {
        return lang_1.isPresent(this._debugInfo) ? this._debugInfo.source : null;
      },
      enumerable: true,
      configurable: true
    });
    DebugNode.prototype.inject = function(token) {
      return this.injector.get(token);
    };
    return DebugNode;
  }());
  exports.DebugNode = DebugNode;
  var DebugElement = (function(_super) {
    __extends(DebugElement, _super);
    function DebugElement(nativeNode, parent, _debugInfo) {
      _super.call(this, nativeNode, parent, _debugInfo);
      this.properties = {};
      this.attributes = {};
      this.childNodes = [];
      this.nativeElement = nativeNode;
    }
    DebugElement.prototype.addChild = function(child) {
      if (lang_1.isPresent(child)) {
        this.childNodes.push(child);
        child.parent = this;
      }
    };
    DebugElement.prototype.removeChild = function(child) {
      var childIndex = this.childNodes.indexOf(child);
      if (childIndex !== -1) {
        child.parent = null;
        this.childNodes.splice(childIndex, 1);
      }
    };
    DebugElement.prototype.insertChildrenAfter = function(child, newChildren) {
      var siblingIndex = this.childNodes.indexOf(child);
      if (siblingIndex !== -1) {
        var previousChildren = this.childNodes.slice(0, siblingIndex + 1);
        var nextChildren = this.childNodes.slice(siblingIndex + 1);
        this.childNodes = collection_1.ListWrapper.concat(collection_1.ListWrapper.concat(previousChildren, newChildren), nextChildren);
        for (var i = 0; i < newChildren.length; ++i) {
          var newChild = newChildren[i];
          if (lang_1.isPresent(newChild.parent)) {
            newChild.parent.removeChild(newChild);
          }
          newChild.parent = this;
        }
      }
    };
    DebugElement.prototype.query = function(predicate) {
      var results = this.queryAll(predicate);
      return results.length > 0 ? results[0] : null;
    };
    DebugElement.prototype.queryAll = function(predicate) {
      var matches = [];
      _queryElementChildren(this, predicate, matches);
      return matches;
    };
    DebugElement.prototype.queryAllNodes = function(predicate) {
      var matches = [];
      _queryNodeChildren(this, predicate, matches);
      return matches;
    };
    Object.defineProperty(DebugElement.prototype, "children", {
      get: function() {
        var children = [];
        this.childNodes.forEach(function(node) {
          if (node instanceof DebugElement) {
            children.push(node);
          }
        });
        return children;
      },
      enumerable: true,
      configurable: true
    });
    DebugElement.prototype.triggerEventHandler = function(eventName, eventObj) {
      this.listeners.forEach(function(listener) {
        if (listener.name == eventName) {
          listener.callback(eventObj);
        }
      });
    };
    return DebugElement;
  }(DebugNode));
  exports.DebugElement = DebugElement;
  function asNativeElements(debugEls) {
    return debugEls.map(function(el) {
      return el.nativeElement;
    });
  }
  exports.asNativeElements = asNativeElements;
  function _queryElementChildren(element, predicate, matches) {
    element.childNodes.forEach(function(node) {
      if (node instanceof DebugElement) {
        if (predicate(node)) {
          matches.push(node);
        }
        _queryElementChildren(node, predicate, matches);
      }
    });
  }
  function _queryNodeChildren(parentNode, predicate, matches) {
    if (parentNode instanceof DebugElement) {
      parentNode.childNodes.forEach(function(node) {
        if (predicate(node)) {
          matches.push(node);
        }
        if (node instanceof DebugElement) {
          _queryNodeChildren(node, predicate, matches);
        }
      });
    }
  }
  var _nativeNodeToDebugNode = new Map();
  function getDebugNode(nativeNode) {
    return _nativeNodeToDebugNode.get(nativeNode);
  }
  exports.getDebugNode = getDebugNode;
  function getAllDebugNodes() {
    return collection_1.MapWrapper.values(_nativeNodeToDebugNode);
  }
  exports.getAllDebugNodes = getAllDebugNodes;
  function indexDebugNode(node) {
    _nativeNodeToDebugNode.set(node.nativeNode, node);
  }
  exports.indexDebugNode = indexDebugNode;
  function removeDebugNodeFromIndex(node) {
    _nativeNodeToDebugNode.delete(node.nativeNode);
  }
  exports.removeDebugNodeFromIndex = removeDebugNodeFromIndex;
  return module.exports;
});

$__System.registerDynamic("56", ["e", "55"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var debug_node_1 = $__require('55');
  var DebugDomRootRenderer = (function() {
    function DebugDomRootRenderer(_delegate) {
      this._delegate = _delegate;
    }
    DebugDomRootRenderer.prototype.renderComponent = function(componentProto) {
      return new DebugDomRenderer(this._delegate.renderComponent(componentProto));
    };
    return DebugDomRootRenderer;
  }());
  exports.DebugDomRootRenderer = DebugDomRootRenderer;
  var DebugDomRenderer = (function() {
    function DebugDomRenderer(_delegate) {
      this._delegate = _delegate;
    }
    DebugDomRenderer.prototype.selectRootElement = function(selectorOrNode, debugInfo) {
      var nativeEl = this._delegate.selectRootElement(selectorOrNode, debugInfo);
      var debugEl = new debug_node_1.DebugElement(nativeEl, null, debugInfo);
      debug_node_1.indexDebugNode(debugEl);
      return nativeEl;
    };
    DebugDomRenderer.prototype.createElement = function(parentElement, name, debugInfo) {
      var nativeEl = this._delegate.createElement(parentElement, name, debugInfo);
      var debugEl = new debug_node_1.DebugElement(nativeEl, debug_node_1.getDebugNode(parentElement), debugInfo);
      debugEl.name = name;
      debug_node_1.indexDebugNode(debugEl);
      return nativeEl;
    };
    DebugDomRenderer.prototype.createViewRoot = function(hostElement) {
      return this._delegate.createViewRoot(hostElement);
    };
    DebugDomRenderer.prototype.createTemplateAnchor = function(parentElement, debugInfo) {
      var comment = this._delegate.createTemplateAnchor(parentElement, debugInfo);
      var debugEl = new debug_node_1.DebugNode(comment, debug_node_1.getDebugNode(parentElement), debugInfo);
      debug_node_1.indexDebugNode(debugEl);
      return comment;
    };
    DebugDomRenderer.prototype.createText = function(parentElement, value, debugInfo) {
      var text = this._delegate.createText(parentElement, value, debugInfo);
      var debugEl = new debug_node_1.DebugNode(text, debug_node_1.getDebugNode(parentElement), debugInfo);
      debug_node_1.indexDebugNode(debugEl);
      return text;
    };
    DebugDomRenderer.prototype.projectNodes = function(parentElement, nodes) {
      var debugParent = debug_node_1.getDebugNode(parentElement);
      if (lang_1.isPresent(debugParent) && debugParent instanceof debug_node_1.DebugElement) {
        var debugElement_1 = debugParent;
        nodes.forEach(function(node) {
          debugElement_1.addChild(debug_node_1.getDebugNode(node));
        });
      }
      this._delegate.projectNodes(parentElement, nodes);
    };
    DebugDomRenderer.prototype.attachViewAfter = function(node, viewRootNodes) {
      var debugNode = debug_node_1.getDebugNode(node);
      if (lang_1.isPresent(debugNode)) {
        var debugParent = debugNode.parent;
        if (viewRootNodes.length > 0 && lang_1.isPresent(debugParent)) {
          var debugViewRootNodes = [];
          viewRootNodes.forEach(function(rootNode) {
            return debugViewRootNodes.push(debug_node_1.getDebugNode(rootNode));
          });
          debugParent.insertChildrenAfter(debugNode, debugViewRootNodes);
        }
      }
      this._delegate.attachViewAfter(node, viewRootNodes);
    };
    DebugDomRenderer.prototype.detachView = function(viewRootNodes) {
      viewRootNodes.forEach(function(node) {
        var debugNode = debug_node_1.getDebugNode(node);
        if (lang_1.isPresent(debugNode) && lang_1.isPresent(debugNode.parent)) {
          debugNode.parent.removeChild(debugNode);
        }
      });
      this._delegate.detachView(viewRootNodes);
    };
    DebugDomRenderer.prototype.destroyView = function(hostElement, viewAllNodes) {
      viewAllNodes.forEach(function(node) {
        debug_node_1.removeDebugNodeFromIndex(debug_node_1.getDebugNode(node));
      });
      this._delegate.destroyView(hostElement, viewAllNodes);
    };
    DebugDomRenderer.prototype.listen = function(renderElement, name, callback) {
      var debugEl = debug_node_1.getDebugNode(renderElement);
      if (lang_1.isPresent(debugEl)) {
        debugEl.listeners.push(new debug_node_1.EventListener(name, callback));
      }
      return this._delegate.listen(renderElement, name, callback);
    };
    DebugDomRenderer.prototype.listenGlobal = function(target, name, callback) {
      return this._delegate.listenGlobal(target, name, callback);
    };
    DebugDomRenderer.prototype.setElementProperty = function(renderElement, propertyName, propertyValue) {
      var debugEl = debug_node_1.getDebugNode(renderElement);
      if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
        debugEl.properties[propertyName] = propertyValue;
      }
      this._delegate.setElementProperty(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementAttribute = function(renderElement, attributeName, attributeValue) {
      var debugEl = debug_node_1.getDebugNode(renderElement);
      if (lang_1.isPresent(debugEl) && debugEl instanceof debug_node_1.DebugElement) {
        debugEl.attributes[attributeName] = attributeValue;
      }
      this._delegate.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    DebugDomRenderer.prototype.setBindingDebugInfo = function(renderElement, propertyName, propertyValue) {
      this._delegate.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    DebugDomRenderer.prototype.setElementClass = function(renderElement, className, isAdd) {
      this._delegate.setElementClass(renderElement, className, isAdd);
    };
    DebugDomRenderer.prototype.setElementStyle = function(renderElement, styleName, styleValue) {
      this._delegate.setElementStyle(renderElement, styleName, styleValue);
    };
    DebugDomRenderer.prototype.invokeElementMethod = function(renderElement, methodName, args) {
      this._delegate.invokeElementMethod(renderElement, methodName, args);
    };
    DebugDomRenderer.prototype.setText = function(renderNode, text) {
      this._delegate.setText(renderNode, text);
    };
    return DebugDomRenderer;
  }());
  exports.DebugDomRenderer = DebugDomRenderer;
  return module.exports;
});

$__System.registerDynamic("57", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var BaseWrappedException = (function(_super) {
    __extends(BaseWrappedException, _super);
    function BaseWrappedException(message) {
      _super.call(this, message);
    }
    Object.defineProperty(BaseWrappedException.prototype, "wrapperMessage", {
      get: function() {
        return '';
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "wrapperStack", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalException", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "originalStack", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "context", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(BaseWrappedException.prototype, "message", {
      get: function() {
        return '';
      },
      enumerable: true,
      configurable: true
    });
    return BaseWrappedException;
  }(Error));
  exports.BaseWrappedException = BaseWrappedException;
  return module.exports;
});

$__System.registerDynamic("1c", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  exports.Map = lang_1.global.Map;
  exports.Set = lang_1.global.Set;
  var createMapFromPairs = (function() {
    try {
      if (new exports.Map([[1, 2]]).size === 1) {
        return function createMapFromPairs(pairs) {
          return new exports.Map(pairs);
        };
      }
    } catch (e) {}
    return function createMapAndPopulateFromPairs(pairs) {
      var map = new exports.Map();
      for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i];
        map.set(pair[0], pair[1]);
      }
      return map;
    };
  })();
  var createMapFromMap = (function() {
    try {
      if (new exports.Map(new exports.Map())) {
        return function createMapFromMap(m) {
          return new exports.Map(m);
        };
      }
    } catch (e) {}
    return function createMapAndPopulateFromMap(m) {
      var map = new exports.Map();
      m.forEach(function(v, k) {
        map.set(k, v);
      });
      return map;
    };
  })();
  var _clearValues = (function() {
    if ((new exports.Map()).keys().next) {
      return function _clearValues(m) {
        var keyIterator = m.keys();
        var k;
        while (!((k = keyIterator.next()).done)) {
          m.set(k.value, null);
        }
      };
    } else {
      return function _clearValuesWithForeEach(m) {
        m.forEach(function(v, k) {
          m.set(k, null);
        });
      };
    }
  })();
  var _arrayFromMap = (function() {
    try {
      if ((new exports.Map()).values().next) {
        return function createArrayFromMap(m, getValues) {
          return getValues ? Array.from(m.values()) : Array.from(m.keys());
        };
      }
    } catch (e) {}
    return function createArrayFromMapWithForeach(m, getValues) {
      var res = ListWrapper.createFixedSize(m.size),
          i = 0;
      m.forEach(function(v, k) {
        res[i] = getValues ? v : k;
        i++;
      });
      return res;
    };
  })();
  var MapWrapper = (function() {
    function MapWrapper() {}
    MapWrapper.clone = function(m) {
      return createMapFromMap(m);
    };
    MapWrapper.createFromStringMap = function(stringMap) {
      var result = new exports.Map();
      for (var prop in stringMap) {
        result.set(prop, stringMap[prop]);
      }
      return result;
    };
    MapWrapper.toStringMap = function(m) {
      var r = {};
      m.forEach(function(v, k) {
        return r[k] = v;
      });
      return r;
    };
    MapWrapper.createFromPairs = function(pairs) {
      return createMapFromPairs(pairs);
    };
    MapWrapper.clearValues = function(m) {
      _clearValues(m);
    };
    MapWrapper.iterable = function(m) {
      return m;
    };
    MapWrapper.keys = function(m) {
      return _arrayFromMap(m, false);
    };
    MapWrapper.values = function(m) {
      return _arrayFromMap(m, true);
    };
    return MapWrapper;
  }());
  exports.MapWrapper = MapWrapper;
  var StringMapWrapper = (function() {
    function StringMapWrapper() {}
    StringMapWrapper.create = function() {
      return {};
    };
    StringMapWrapper.contains = function(map, key) {
      return map.hasOwnProperty(key);
    };
    StringMapWrapper.get = function(map, key) {
      return map.hasOwnProperty(key) ? map[key] : undefined;
    };
    StringMapWrapper.set = function(map, key, value) {
      map[key] = value;
    };
    StringMapWrapper.keys = function(map) {
      return Object.keys(map);
    };
    StringMapWrapper.values = function(map) {
      return Object.keys(map).reduce(function(r, a) {
        r.push(map[a]);
        return r;
      }, []);
    };
    StringMapWrapper.isEmpty = function(map) {
      for (var prop in map) {
        return false;
      }
      return true;
    };
    StringMapWrapper.delete = function(map, key) {
      delete map[key];
    };
    StringMapWrapper.forEach = function(map, callback) {
      for (var prop in map) {
        if (map.hasOwnProperty(prop)) {
          callback(map[prop], prop);
        }
      }
    };
    StringMapWrapper.merge = function(m1, m2) {
      var m = {};
      for (var attr in m1) {
        if (m1.hasOwnProperty(attr)) {
          m[attr] = m1[attr];
        }
      }
      for (var attr in m2) {
        if (m2.hasOwnProperty(attr)) {
          m[attr] = m2[attr];
        }
      }
      return m;
    };
    StringMapWrapper.equals = function(m1, m2) {
      var k1 = Object.keys(m1);
      var k2 = Object.keys(m2);
      if (k1.length != k2.length) {
        return false;
      }
      var key;
      for (var i = 0; i < k1.length; i++) {
        key = k1[i];
        if (m1[key] !== m2[key]) {
          return false;
        }
      }
      return true;
    };
    return StringMapWrapper;
  }());
  exports.StringMapWrapper = StringMapWrapper;
  var ListWrapper = (function() {
    function ListWrapper() {}
    ListWrapper.createFixedSize = function(size) {
      return new Array(size);
    };
    ListWrapper.createGrowableSize = function(size) {
      return new Array(size);
    };
    ListWrapper.clone = function(array) {
      return array.slice(0);
    };
    ListWrapper.forEachWithIndex = function(array, fn) {
      for (var i = 0; i < array.length; i++) {
        fn(array[i], i);
      }
    };
    ListWrapper.first = function(array) {
      if (!array)
        return null;
      return array[0];
    };
    ListWrapper.last = function(array) {
      if (!array || array.length == 0)
        return null;
      return array[array.length - 1];
    };
    ListWrapper.indexOf = function(array, value, startIndex) {
      if (startIndex === void 0) {
        startIndex = 0;
      }
      return array.indexOf(value, startIndex);
    };
    ListWrapper.contains = function(list, el) {
      return list.indexOf(el) !== -1;
    };
    ListWrapper.reversed = function(array) {
      var a = ListWrapper.clone(array);
      return a.reverse();
    };
    ListWrapper.concat = function(a, b) {
      return a.concat(b);
    };
    ListWrapper.insert = function(list, index, value) {
      list.splice(index, 0, value);
    };
    ListWrapper.removeAt = function(list, index) {
      var res = list[index];
      list.splice(index, 1);
      return res;
    };
    ListWrapper.removeAll = function(list, items) {
      for (var i = 0; i < items.length; ++i) {
        var index = list.indexOf(items[i]);
        list.splice(index, 1);
      }
    };
    ListWrapper.remove = function(list, el) {
      var index = list.indexOf(el);
      if (index > -1) {
        list.splice(index, 1);
        return true;
      }
      return false;
    };
    ListWrapper.clear = function(list) {
      list.length = 0;
    };
    ListWrapper.isEmpty = function(list) {
      return list.length == 0;
    };
    ListWrapper.fill = function(list, value, start, end) {
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = null;
      }
      list.fill(value, start, end === null ? list.length : end);
    };
    ListWrapper.equals = function(a, b) {
      if (a.length != b.length)
        return false;
      for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i])
          return false;
      }
      return true;
    };
    ListWrapper.slice = function(l, from, to) {
      if (from === void 0) {
        from = 0;
      }
      if (to === void 0) {
        to = null;
      }
      return l.slice(from, to === null ? undefined : to);
    };
    ListWrapper.splice = function(l, from, length) {
      return l.splice(from, length);
    };
    ListWrapper.sort = function(l, compareFn) {
      if (lang_1.isPresent(compareFn)) {
        l.sort(compareFn);
      } else {
        l.sort();
      }
    };
    ListWrapper.toString = function(l) {
      return l.toString();
    };
    ListWrapper.toJSON = function(l) {
      return JSON.stringify(l);
    };
    ListWrapper.maximum = function(list, predicate) {
      if (list.length == 0) {
        return null;
      }
      var solution = null;
      var maxValue = -Infinity;
      for (var index = 0; index < list.length; index++) {
        var candidate = list[index];
        if (lang_1.isBlank(candidate)) {
          continue;
        }
        var candidateValue = predicate(candidate);
        if (candidateValue > maxValue) {
          solution = candidate;
          maxValue = candidateValue;
        }
      }
      return solution;
    };
    ListWrapper.flatten = function(list) {
      var target = [];
      _flattenArray(list, target);
      return target;
    };
    ListWrapper.addAll = function(list, source) {
      for (var i = 0; i < source.length; i++) {
        list.push(source[i]);
      }
    };
    return ListWrapper;
  }());
  exports.ListWrapper = ListWrapper;
  function _flattenArray(source, target) {
    if (lang_1.isPresent(source)) {
      for (var i = 0; i < source.length; i++) {
        var item = source[i];
        if (lang_1.isArray(item)) {
          _flattenArray(item, target);
        } else {
          target.push(item);
        }
      }
    }
    return target;
  }
  function isListLikeIterable(obj) {
    if (!lang_1.isJsObject(obj))
      return false;
    return lang_1.isArray(obj) || (!(obj instanceof exports.Map) && lang_1.getSymbolIterator() in obj);
  }
  exports.isListLikeIterable = isListLikeIterable;
  function areIterablesEqual(a, b, comparator) {
    var iterator1 = a[lang_1.getSymbolIterator()]();
    var iterator2 = b[lang_1.getSymbolIterator()]();
    while (true) {
      var item1 = iterator1.next();
      var item2 = iterator2.next();
      if (item1.done && item2.done)
        return true;
      if (item1.done || item2.done)
        return false;
      if (!comparator(item1.value, item2.value))
        return false;
    }
  }
  exports.areIterablesEqual = areIterablesEqual;
  function iterateListLike(obj, fn) {
    if (lang_1.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        fn(obj[i]);
      }
    } else {
      var iterator = obj[lang_1.getSymbolIterator()]();
      var item;
      while (!((item = iterator.next()).done)) {
        fn(item.value);
      }
    }
  }
  exports.iterateListLike = iterateListLike;
  var createSetFromList = (function() {
    var test = new exports.Set([1, 2, 3]);
    if (test.size === 3) {
      return function createSetFromList(lst) {
        return new exports.Set(lst);
      };
    } else {
      return function createSetAndPopulateFromList(lst) {
        var res = new exports.Set(lst);
        if (res.size !== lst.length) {
          for (var i = 0; i < lst.length; i++) {
            res.add(lst[i]);
          }
        }
        return res;
      };
    }
  })();
  var SetWrapper = (function() {
    function SetWrapper() {}
    SetWrapper.createFromList = function(lst) {
      return createSetFromList(lst);
    };
    SetWrapper.has = function(s, key) {
      return s.has(key);
    };
    SetWrapper.delete = function(m, k) {
      m.delete(k);
    };
    return SetWrapper;
  }());
  exports.SetWrapper = SetWrapper;
  return module.exports;
});

$__System.registerDynamic("58", ["e", "57", "1c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var base_wrapped_exception_1 = $__require('57');
  var collection_1 = $__require('1c');
  var _ArrayLogger = (function() {
    function _ArrayLogger() {
      this.res = [];
    }
    _ArrayLogger.prototype.log = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logError = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logGroup = function(s) {
      this.res.push(s);
    };
    _ArrayLogger.prototype.logGroupEnd = function() {};
    ;
    return _ArrayLogger;
  }());
  var ExceptionHandler = (function() {
    function ExceptionHandler(_logger, _rethrowException) {
      if (_rethrowException === void 0) {
        _rethrowException = true;
      }
      this._logger = _logger;
      this._rethrowException = _rethrowException;
    }
    ExceptionHandler.exceptionToString = function(exception, stackTrace, reason) {
      if (stackTrace === void 0) {
        stackTrace = null;
      }
      if (reason === void 0) {
        reason = null;
      }
      var l = new _ArrayLogger();
      var e = new ExceptionHandler(l, false);
      e.call(exception, stackTrace, reason);
      return l.res.join("\n");
    };
    ExceptionHandler.prototype.call = function(exception, stackTrace, reason) {
      if (stackTrace === void 0) {
        stackTrace = null;
      }
      if (reason === void 0) {
        reason = null;
      }
      var originalException = this._findOriginalException(exception);
      var originalStack = this._findOriginalStack(exception);
      var context = this._findContext(exception);
      this._logger.logGroup("EXCEPTION: " + this._extractMessage(exception));
      if (lang_1.isPresent(stackTrace) && lang_1.isBlank(originalStack)) {
        this._logger.logError("STACKTRACE:");
        this._logger.logError(this._longStackTrace(stackTrace));
      }
      if (lang_1.isPresent(reason)) {
        this._logger.logError("REASON: " + reason);
      }
      if (lang_1.isPresent(originalException)) {
        this._logger.logError("ORIGINAL EXCEPTION: " + this._extractMessage(originalException));
      }
      if (lang_1.isPresent(originalStack)) {
        this._logger.logError("ORIGINAL STACKTRACE:");
        this._logger.logError(this._longStackTrace(originalStack));
      }
      if (lang_1.isPresent(context)) {
        this._logger.logError("ERROR CONTEXT:");
        this._logger.logError(context);
      }
      this._logger.logGroupEnd();
      if (this._rethrowException)
        throw exception;
    };
    ExceptionHandler.prototype._extractMessage = function(exception) {
      return exception instanceof base_wrapped_exception_1.BaseWrappedException ? exception.wrapperMessage : exception.toString();
    };
    ExceptionHandler.prototype._longStackTrace = function(stackTrace) {
      return collection_1.isListLikeIterable(stackTrace) ? stackTrace.join("\n\n-----async gap-----\n") : stackTrace.toString();
    };
    ExceptionHandler.prototype._findContext = function(exception) {
      try {
        if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
          return null;
        return lang_1.isPresent(exception.context) ? exception.context : this._findContext(exception.originalException);
      } catch (e) {
        return null;
      }
    };
    ExceptionHandler.prototype._findOriginalException = function(exception) {
      if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
        return null;
      var e = exception.originalException;
      while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
        e = e.originalException;
      }
      return e;
    };
    ExceptionHandler.prototype._findOriginalStack = function(exception) {
      if (!(exception instanceof base_wrapped_exception_1.BaseWrappedException))
        return null;
      var e = exception;
      var stack = exception.originalStack;
      while (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
        e = e.originalException;
        if (e instanceof base_wrapped_exception_1.BaseWrappedException && lang_1.isPresent(e.originalException)) {
          stack = e.originalStack;
        }
      }
      return stack;
    };
    return ExceptionHandler;
  }());
  exports.ExceptionHandler = ExceptionHandler;
  return module.exports;
});

$__System.registerDynamic("32", ["57", "58"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var base_wrapped_exception_1 = $__require('57');
  var exception_handler_1 = $__require('58');
  var exception_handler_2 = $__require('58');
  exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
  var BaseException = (function(_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
      if (message === void 0) {
        message = "--";
      }
      _super.call(this, message);
      this.message = message;
      this.stack = (new Error(message)).stack;
    }
    BaseException.prototype.toString = function() {
      return this.message;
    };
    return BaseException;
  }(Error));
  exports.BaseException = BaseException;
  var WrappedException = (function(_super) {
    __extends(WrappedException, _super);
    function WrappedException(_wrapperMessage, _originalException, _originalStack, _context) {
      _super.call(this, _wrapperMessage);
      this._wrapperMessage = _wrapperMessage;
      this._originalException = _originalException;
      this._originalStack = _originalStack;
      this._context = _context;
      this._wrapperStack = (new Error(_wrapperMessage)).stack;
    }
    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
      get: function() {
        return this._wrapperMessage;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
      get: function() {
        return this._wrapperStack;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalException", {
      get: function() {
        return this._originalException;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalStack", {
      get: function() {
        return this._originalStack;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "context", {
      get: function() {
        return this._context;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "message", {
      get: function() {
        return exception_handler_1.ExceptionHandler.exceptionToString(this);
      },
      enumerable: true,
      configurable: true
    });
    WrappedException.prototype.toString = function() {
      return this.message;
    };
    return WrappedException;
  }(base_wrapped_exception_1.BaseWrappedException));
  exports.WrappedException = WrappedException;
  function makeTypeError(message) {
    return new TypeError(message);
  }
  exports.makeTypeError = makeTypeError;
  function unimplemented() {
    throw new BaseException('unimplemented');
  }
  exports.unimplemented = unimplemented;
  return module.exports;
});

$__System.registerDynamic("51", ["e", "32"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var lang_1 = $__require('e');
  var exceptions_1 = $__require('32');
  var Provider = (function() {
    function Provider(token, _a) {
      var useClass = _a.useClass,
          useValue = _a.useValue,
          useExisting = _a.useExisting,
          useFactory = _a.useFactory,
          deps = _a.deps,
          multi = _a.multi;
      this.token = token;
      this.useClass = useClass;
      this.useValue = useValue;
      this.useExisting = useExisting;
      this.useFactory = useFactory;
      this.dependencies = deps;
      this._multi = multi;
    }
    Object.defineProperty(Provider.prototype, "multi", {
      get: function() {
        return lang_1.normalizeBool(this._multi);
      },
      enumerable: true,
      configurable: true
    });
    return Provider;
  }());
  exports.Provider = Provider;
  var Binding = (function(_super) {
    __extends(Binding, _super);
    function Binding(token, _a) {
      var toClass = _a.toClass,
          toValue = _a.toValue,
          toAlias = _a.toAlias,
          toFactory = _a.toFactory,
          deps = _a.deps,
          multi = _a.multi;
      _super.call(this, token, {
        useClass: toClass,
        useValue: toValue,
        useExisting: toAlias,
        useFactory: toFactory,
        deps: deps,
        multi: multi
      });
    }
    Object.defineProperty(Binding.prototype, "toClass", {
      get: function() {
        return this.useClass;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toAlias", {
      get: function() {
        return this.useExisting;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toFactory", {
      get: function() {
        return this.useFactory;
      },
      enumerable: true,
      configurable: true
    });
    Object.defineProperty(Binding.prototype, "toValue", {
      get: function() {
        return this.useValue;
      },
      enumerable: true,
      configurable: true
    });
    return Binding;
  }(Provider));
  exports.Binding = Binding;
  function bind(token) {
    return new ProviderBuilder(token);
  }
  exports.bind = bind;
  var ProviderBuilder = (function() {
    function ProviderBuilder(token) {
      this.token = token;
    }
    ProviderBuilder.prototype.toClass = function(type) {
      if (!lang_1.isType(type)) {
        throw new exceptions_1.BaseException("Trying to create a class provider but \"" + lang_1.stringify(type) + "\" is not a class!");
      }
      return new Provider(this.token, {useClass: type});
    };
    ProviderBuilder.prototype.toValue = function(value) {
      return new Provider(this.token, {useValue: value});
    };
    ProviderBuilder.prototype.toAlias = function(aliasToken) {
      if (lang_1.isBlank(aliasToken)) {
        throw new exceptions_1.BaseException("Can not alias " + lang_1.stringify(this.token) + " to a blank value!");
      }
      return new Provider(this.token, {useExisting: aliasToken});
    };
    ProviderBuilder.prototype.toFactory = function(factory, dependencies) {
      if (!lang_1.isFunction(factory)) {
        throw new exceptions_1.BaseException("Trying to create a factory provider but \"" + lang_1.stringify(factory) + "\" is not a function!");
      }
      return new Provider(this.token, {
        useFactory: factory,
        deps: dependencies
      });
    };
    return ProviderBuilder;
  }());
  exports.ProviderBuilder = ProviderBuilder;
  function provide(token, _a) {
    var useClass = _a.useClass,
        useValue = _a.useValue,
        useExisting = _a.useExisting,
        useFactory = _a.useFactory,
        deps = _a.deps,
        multi = _a.multi;
    return new Provider(token, {
      useClass: useClass,
      useValue: useValue,
      useExisting: useExisting,
      useFactory: useFactory,
      deps: deps,
      multi: multi
    });
  }
  exports.provide = provide;
  return module.exports;
});

$__System.registerDynamic("52", ["51"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var provider_1 = $__require('51');
  function isProviderLiteral(obj) {
    return obj && typeof obj == 'object' && obj.provide;
  }
  exports.isProviderLiteral = isProviderLiteral;
  function createProvider(obj) {
    return new provider_1.Provider(obj.provide, obj);
  }
  exports.createProvider = createProvider;
  return module.exports;
});

$__System.registerDynamic("f", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var InjectMetadata = (function() {
    function InjectMetadata(token) {
      this.token = token;
    }
    InjectMetadata.prototype.toString = function() {
      return "@Inject(" + lang_1.stringify(this.token) + ")";
    };
    return InjectMetadata;
  }());
  exports.InjectMetadata = InjectMetadata;
  var OptionalMetadata = (function() {
    function OptionalMetadata() {}
    OptionalMetadata.prototype.toString = function() {
      return "@Optional()";
    };
    return OptionalMetadata;
  }());
  exports.OptionalMetadata = OptionalMetadata;
  var DependencyMetadata = (function() {
    function DependencyMetadata() {}
    Object.defineProperty(DependencyMetadata.prototype, "token", {
      get: function() {
        return null;
      },
      enumerable: true,
      configurable: true
    });
    return DependencyMetadata;
  }());
  exports.DependencyMetadata = DependencyMetadata;
  var InjectableMetadata = (function() {
    function InjectableMetadata() {}
    return InjectableMetadata;
  }());
  exports.InjectableMetadata = InjectableMetadata;
  var SelfMetadata = (function() {
    function SelfMetadata() {}
    SelfMetadata.prototype.toString = function() {
      return "@Self()";
    };
    return SelfMetadata;
  }());
  exports.SelfMetadata = SelfMetadata;
  var SkipSelfMetadata = (function() {
    function SkipSelfMetadata() {}
    SkipSelfMetadata.prototype.toString = function() {
      return "@SkipSelf()";
    };
    return SkipSelfMetadata;
  }());
  exports.SkipSelfMetadata = SkipSelfMetadata;
  var HostMetadata = (function() {
    function HostMetadata() {}
    HostMetadata.prototype.toString = function() {
      return "@Host()";
    };
    return HostMetadata;
  }());
  exports.HostMetadata = HostMetadata;
  return module.exports;
});

$__System.registerDynamic("e", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var globalScope;
  if (typeof window === 'undefined') {
    if (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope) {
      globalScope = self;
    } else {
      globalScope = global;
    }
  } else {
    globalScope = window;
  }
  function scheduleMicroTask(fn) {
    Zone.current.scheduleMicroTask('scheduleMicrotask', fn);
  }
  exports.scheduleMicroTask = scheduleMicroTask;
  exports.IS_DART = false;
  var _global = globalScope;
  exports.global = _global;
  exports.Type = Function;
  function getTypeNameForDebugging(type) {
    if (type['name']) {
      return type['name'];
    }
    return typeof type;
  }
  exports.getTypeNameForDebugging = getTypeNameForDebugging;
  exports.Math = _global.Math;
  exports.Date = _global.Date;
  var _devMode = true;
  var _modeLocked = false;
  function lockMode() {
    _modeLocked = true;
  }
  exports.lockMode = lockMode;
  function enableProdMode() {
    if (_modeLocked) {
      throw 'Cannot enable prod mode after platform setup.';
    }
    _devMode = false;
  }
  exports.enableProdMode = enableProdMode;
  function assertionsEnabled() {
    return _devMode;
  }
  exports.assertionsEnabled = assertionsEnabled;
  _global.assert = function assert(condition) {};
  function isPresent(obj) {
    return obj !== undefined && obj !== null;
  }
  exports.isPresent = isPresent;
  function isBlank(obj) {
    return obj === undefined || obj === null;
  }
  exports.isBlank = isBlank;
  function isBoolean(obj) {
    return typeof obj === "boolean";
  }
  exports.isBoolean = isBoolean;
  function isNumber(obj) {
    return typeof obj === "number";
  }
  exports.isNumber = isNumber;
  function isString(obj) {
    return typeof obj === "string";
  }
  exports.isString = isString;
  function isFunction(obj) {
    return typeof obj === "function";
  }
  exports.isFunction = isFunction;
  function isType(obj) {
    return isFunction(obj);
  }
  exports.isType = isType;
  function isStringMap(obj) {
    return typeof obj === 'object' && obj !== null;
  }
  exports.isStringMap = isStringMap;
  var STRING_MAP_PROTO = Object.getPrototypeOf({});
  function isStrictStringMap(obj) {
    return isStringMap(obj) && Object.getPrototypeOf(obj) === STRING_MAP_PROTO;
  }
  exports.isStrictStringMap = isStrictStringMap;
  function isPromise(obj) {
    return obj instanceof _global.Promise;
  }
  exports.isPromise = isPromise;
  function isArray(obj) {
    return Array.isArray(obj);
  }
  exports.isArray = isArray;
  function isDate(obj) {
    return obj instanceof exports.Date && !isNaN(obj.valueOf());
  }
  exports.isDate = isDate;
  function noop() {}
  exports.noop = noop;
  function stringify(token) {
    if (typeof token === 'string') {
      return token;
    }
    if (token === undefined || token === null) {
      return '' + token;
    }
    if (token.name) {
      return token.name;
    }
    if (token.overriddenName) {
      return token.overriddenName;
    }
    var res = token.toString();
    var newLineIndex = res.indexOf("\n");
    return (newLineIndex === -1) ? res : res.substring(0, newLineIndex);
  }
  exports.stringify = stringify;
  function serializeEnum(val) {
    return val;
  }
  exports.serializeEnum = serializeEnum;
  function deserializeEnum(val, values) {
    return val;
  }
  exports.deserializeEnum = deserializeEnum;
  function resolveEnumToken(enumValue, val) {
    return enumValue[val];
  }
  exports.resolveEnumToken = resolveEnumToken;
  var StringWrapper = (function() {
    function StringWrapper() {}
    StringWrapper.fromCharCode = function(code) {
      return String.fromCharCode(code);
    };
    StringWrapper.charCodeAt = function(s, index) {
      return s.charCodeAt(index);
    };
    StringWrapper.split = function(s, regExp) {
      return s.split(regExp);
    };
    StringWrapper.equals = function(s, s2) {
      return s === s2;
    };
    StringWrapper.stripLeft = function(s, charVal) {
      if (s && s.length) {
        var pos = 0;
        for (var i = 0; i < s.length; i++) {
          if (s[i] != charVal)
            break;
          pos++;
        }
        s = s.substring(pos);
      }
      return s;
    };
    StringWrapper.stripRight = function(s, charVal) {
      if (s && s.length) {
        var pos = s.length;
        for (var i = s.length - 1; i >= 0; i--) {
          if (s[i] != charVal)
            break;
          pos--;
        }
        s = s.substring(0, pos);
      }
      return s;
    };
    StringWrapper.replace = function(s, from, replace) {
      return s.replace(from, replace);
    };
    StringWrapper.replaceAll = function(s, from, replace) {
      return s.replace(from, replace);
    };
    StringWrapper.slice = function(s, from, to) {
      if (from === void 0) {
        from = 0;
      }
      if (to === void 0) {
        to = null;
      }
      return s.slice(from, to === null ? undefined : to);
    };
    StringWrapper.replaceAllMapped = function(s, from, cb) {
      return s.replace(from, function() {
        var matches = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          matches[_i - 0] = arguments[_i];
        }
        matches.splice(-2, 2);
        return cb(matches);
      });
    };
    StringWrapper.contains = function(s, substr) {
      return s.indexOf(substr) != -1;
    };
    StringWrapper.compare = function(a, b) {
      if (a < b) {
        return -1;
      } else if (a > b) {
        return 1;
      } else {
        return 0;
      }
    };
    return StringWrapper;
  }());
  exports.StringWrapper = StringWrapper;
  var StringJoiner = (function() {
    function StringJoiner(parts) {
      if (parts === void 0) {
        parts = [];
      }
      this.parts = parts;
    }
    StringJoiner.prototype.add = function(part) {
      this.parts.push(part);
    };
    StringJoiner.prototype.toString = function() {
      return this.parts.join("");
    };
    return StringJoiner;
  }());
  exports.StringJoiner = StringJoiner;
  var NumberParseError = (function(_super) {
    __extends(NumberParseError, _super);
    function NumberParseError(message) {
      _super.call(this);
      this.message = message;
    }
    NumberParseError.prototype.toString = function() {
      return this.message;
    };
    return NumberParseError;
  }(Error));
  exports.NumberParseError = NumberParseError;
  var NumberWrapper = (function() {
    function NumberWrapper() {}
    NumberWrapper.toFixed = function(n, fractionDigits) {
      return n.toFixed(fractionDigits);
    };
    NumberWrapper.equal = function(a, b) {
      return a === b;
    };
    NumberWrapper.parseIntAutoRadix = function(text) {
      var result = parseInt(text);
      if (isNaN(result)) {
        throw new NumberParseError("Invalid integer literal when parsing " + text);
      }
      return result;
    };
    NumberWrapper.parseInt = function(text, radix) {
      if (radix == 10) {
        if (/^(\-|\+)?[0-9]+$/.test(text)) {
          return parseInt(text, radix);
        }
      } else if (radix == 16) {
        if (/^(\-|\+)?[0-9ABCDEFabcdef]+$/.test(text)) {
          return parseInt(text, radix);
        }
      } else {
        var result = parseInt(text, radix);
        if (!isNaN(result)) {
          return result;
        }
      }
      throw new NumberParseError("Invalid integer literal when parsing " + text + " in base " + radix);
    };
    NumberWrapper.parseFloat = function(text) {
      return parseFloat(text);
    };
    Object.defineProperty(NumberWrapper, "NaN", {
      get: function() {
        return NaN;
      },
      enumerable: true,
      configurable: true
    });
    NumberWrapper.isNaN = function(value) {
      return isNaN(value);
    };
    NumberWrapper.isInteger = function(value) {
      return Number.isInteger(value);
    };
    return NumberWrapper;
  }());
  exports.NumberWrapper = NumberWrapper;
  exports.RegExp = _global.RegExp;
  var RegExpWrapper = (function() {
    function RegExpWrapper() {}
    RegExpWrapper.create = function(regExpStr, flags) {
      if (flags === void 0) {
        flags = '';
      }
      flags = flags.replace(/g/g, '');
      return new _global.RegExp(regExpStr, flags + 'g');
    };
    RegExpWrapper.firstMatch = function(regExp, input) {
      regExp.lastIndex = 0;
      return regExp.exec(input);
    };
    RegExpWrapper.test = function(regExp, input) {
      regExp.lastIndex = 0;
      return regExp.test(input);
    };
    RegExpWrapper.matcher = function(regExp, input) {
      regExp.lastIndex = 0;
      return {
        re: regExp,
        input: input
      };
    };
    RegExpWrapper.replaceAll = function(regExp, input, replace) {
      var c = regExp.exec(input);
      var res = '';
      regExp.lastIndex = 0;
      var prev = 0;
      while (c) {
        res += input.substring(prev, c.index);
        res += replace(c);
        prev = c.index + c[0].length;
        regExp.lastIndex = prev;
        c = regExp.exec(input);
      }
      res += input.substring(prev);
      return res;
    };
    return RegExpWrapper;
  }());
  exports.RegExpWrapper = RegExpWrapper;
  var RegExpMatcherWrapper = (function() {
    function RegExpMatcherWrapper() {}
    RegExpMatcherWrapper.next = function(matcher) {
      return matcher.re.exec(matcher.input);
    };
    return RegExpMatcherWrapper;
  }());
  exports.RegExpMatcherWrapper = RegExpMatcherWrapper;
  var FunctionWrapper = (function() {
    function FunctionWrapper() {}
    FunctionWrapper.apply = function(fn, posArgs) {
      return fn.apply(null, posArgs);
    };
    return FunctionWrapper;
  }());
  exports.FunctionWrapper = FunctionWrapper;
  function looseIdentical(a, b) {
    return a === b || typeof a === "number" && typeof b === "number" && isNaN(a) && isNaN(b);
  }
  exports.looseIdentical = looseIdentical;
  function getMapKey(value) {
    return value;
  }
  exports.getMapKey = getMapKey;
  function normalizeBlank(obj) {
    return isBlank(obj) ? null : obj;
  }
  exports.normalizeBlank = normalizeBlank;
  function normalizeBool(obj) {
    return isBlank(obj) ? false : obj;
  }
  exports.normalizeBool = normalizeBool;
  function isJsObject(o) {
    return o !== null && (typeof o === "function" || typeof o === "object");
  }
  exports.isJsObject = isJsObject;
  function print(obj) {
    console.log(obj);
  }
  exports.print = print;
  function warn(obj) {
    console.warn(obj);
  }
  exports.warn = warn;
  var Json = (function() {
    function Json() {}
    Json.parse = function(s) {
      return _global.JSON.parse(s);
    };
    Json.stringify = function(data) {
      return _global.JSON.stringify(data, null, 2);
    };
    return Json;
  }());
  exports.Json = Json;
  var DateWrapper = (function() {
    function DateWrapper() {}
    DateWrapper.create = function(year, month, day, hour, minutes, seconds, milliseconds) {
      if (month === void 0) {
        month = 1;
      }
      if (day === void 0) {
        day = 1;
      }
      if (hour === void 0) {
        hour = 0;
      }
      if (minutes === void 0) {
        minutes = 0;
      }
      if (seconds === void 0) {
        seconds = 0;
      }
      if (milliseconds === void 0) {
        milliseconds = 0;
      }
      return new exports.Date(year, month - 1, day, hour, minutes, seconds, milliseconds);
    };
    DateWrapper.fromISOString = function(str) {
      return new exports.Date(str);
    };
    DateWrapper.fromMillis = function(ms) {
      return new exports.Date(ms);
    };
    DateWrapper.toMillis = function(date) {
      return date.getTime();
    };
    DateWrapper.now = function() {
      return new exports.Date();
    };
    DateWrapper.toJson = function(date) {
      return date.toJSON();
    };
    return DateWrapper;
  }());
  exports.DateWrapper = DateWrapper;
  function setValueOnPath(global, path, value) {
    var parts = path.split('.');
    var obj = global;
    while (parts.length > 1) {
      var name = parts.shift();
      if (obj.hasOwnProperty(name) && isPresent(obj[name])) {
        obj = obj[name];
      } else {
        obj = obj[name] = {};
      }
    }
    if (obj === undefined || obj === null) {
      obj = {};
    }
    obj[parts.shift()] = value;
  }
  exports.setValueOnPath = setValueOnPath;
  var _symbolIterator = null;
  function getSymbolIterator() {
    if (isBlank(_symbolIterator)) {
      if (isPresent(globalScope.Symbol) && isPresent(Symbol.iterator)) {
        _symbolIterator = Symbol.iterator;
      } else {
        var keys = Object.getOwnPropertyNames(Map.prototype);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          if (key !== 'entries' && key !== 'size' && Map.prototype[key] === Map.prototype['entries']) {
            _symbolIterator = key;
          }
        }
      }
    }
    return _symbolIterator;
  }
  exports.getSymbolIterator = getSymbolIterator;
  function evalExpression(sourceUrl, expr, declarations, vars) {
    var fnBody = declarations + "\nreturn " + expr + "\n//# sourceURL=" + sourceUrl;
    var fnArgNames = [];
    var fnArgValues = [];
    for (var argName in vars) {
      fnArgNames.push(argName);
      fnArgValues.push(vars[argName]);
    }
    return new (Function.bind.apply(Function, [void 0].concat(fnArgNames.concat(fnBody))))().apply(void 0, fnArgValues);
  }
  exports.evalExpression = evalExpression;
  function isPrimitive(obj) {
    return !isJsObject(obj);
  }
  exports.isPrimitive = isPrimitive;
  function hasConstructor(value, type) {
    return value.constructor === type;
  }
  exports.hasConstructor = hasConstructor;
  function bitWiseOr(values) {
    return values.reduce(function(a, b) {
      return a | b;
    });
  }
  exports.bitWiseOr = bitWiseOr;
  function bitWiseAnd(values) {
    return values.reduce(function(a, b) {
      return a & b;
    });
  }
  exports.bitWiseAnd = bitWiseAnd;
  function escape(s) {
    return _global.encodeURI(s);
  }
  exports.escape = escape;
  return module.exports;
});

$__System.registerDynamic("15", ["e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var _nextClassId = 0;
  function extractAnnotation(annotation) {
    if (lang_1.isFunction(annotation) && annotation.hasOwnProperty('annotation')) {
      annotation = annotation.annotation;
    }
    return annotation;
  }
  function applyParams(fnOrArray, key) {
    if (fnOrArray === Object || fnOrArray === String || fnOrArray === Function || fnOrArray === Number || fnOrArray === Array) {
      throw new Error("Can not use native " + lang_1.stringify(fnOrArray) + " as constructor");
    }
    if (lang_1.isFunction(fnOrArray)) {
      return fnOrArray;
    } else if (fnOrArray instanceof Array) {
      var annotations = fnOrArray;
      var fn = fnOrArray[fnOrArray.length - 1];
      if (!lang_1.isFunction(fn)) {
        throw new Error("Last position of Class method array must be Function in key " + key + " was '" + lang_1.stringify(fn) + "'");
      }
      var annoLength = annotations.length - 1;
      if (annoLength != fn.length) {
        throw new Error("Number of annotations (" + annoLength + ") does not match number of arguments (" + fn.length + ") in the function: " + lang_1.stringify(fn));
      }
      var paramsAnnotations = [];
      for (var i = 0,
          ii = annotations.length - 1; i < ii; i++) {
        var paramAnnotations = [];
        paramsAnnotations.push(paramAnnotations);
        var annotation = annotations[i];
        if (annotation instanceof Array) {
          for (var j = 0; j < annotation.length; j++) {
            paramAnnotations.push(extractAnnotation(annotation[j]));
          }
        } else if (lang_1.isFunction(annotation)) {
          paramAnnotations.push(extractAnnotation(annotation));
        } else {
          paramAnnotations.push(annotation);
        }
      }
      Reflect.defineMetadata('parameters', paramsAnnotations, fn);
      return fn;
    } else {
      throw new Error("Only Function or Array is supported in Class definition for key '" + key + "' is '" + lang_1.stringify(fnOrArray) + "'");
    }
  }
  function Class(clsDef) {
    var constructor = applyParams(clsDef.hasOwnProperty('constructor') ? clsDef.constructor : undefined, 'constructor');
    var proto = constructor.prototype;
    if (clsDef.hasOwnProperty('extends')) {
      if (lang_1.isFunction(clsDef.extends)) {
        constructor.prototype = proto = Object.create(clsDef.extends.prototype);
      } else {
        throw new Error("Class definition 'extends' property must be a constructor function was: " + lang_1.stringify(clsDef.extends));
      }
    }
    for (var key in clsDef) {
      if (key != 'extends' && key != 'prototype' && clsDef.hasOwnProperty(key)) {
        proto[key] = applyParams(clsDef[key], key);
      }
    }
    if (this && this.annotations instanceof Array) {
      Reflect.defineMetadata('annotations', this.annotations, constructor);
    }
    if (!constructor['name']) {
      constructor['overriddenName'] = "class" + _nextClassId++;
    }
    return constructor;
  }
  exports.Class = Class;
  var Reflect = lang_1.global.Reflect;
  (function checkReflect() {
    if (!(Reflect && Reflect.getMetadata)) {
      throw 'reflect-metadata shim is required when using class decorators';
    }
  })();
  function makeDecorator(annotationCls, chainFn) {
    if (chainFn === void 0) {
      chainFn = null;
    }
    function DecoratorFactory(objOrType) {
      var annotationInstance = new annotationCls(objOrType);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        var chainAnnotation = lang_1.isFunction(this) && this.annotations instanceof Array ? this.annotations : [];
        chainAnnotation.push(annotationInstance);
        var TypeDecorator = function TypeDecorator(cls) {
          var annotations = Reflect.getOwnMetadata('annotations', cls);
          annotations = annotations || [];
          annotations.push(annotationInstance);
          Reflect.defineMetadata('annotations', annotations, cls);
          return cls;
        };
        TypeDecorator.annotations = chainAnnotation;
        TypeDecorator.Class = Class;
        if (chainFn)
          chainFn(TypeDecorator);
        return TypeDecorator;
      }
    }
    DecoratorFactory.prototype = Object.create(annotationCls.prototype);
    DecoratorFactory.annotationCls = annotationCls;
    return DecoratorFactory;
  }
  exports.makeDecorator = makeDecorator;
  function makeParamDecorator(annotationCls) {
    function ParamDecoratorFactory() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var annotationInstance = Object.create(annotationCls.prototype);
      annotationCls.apply(annotationInstance, args);
      if (this instanceof annotationCls) {
        return annotationInstance;
      } else {
        ParamDecorator.annotation = annotationInstance;
        return ParamDecorator;
      }
      function ParamDecorator(cls, unusedKey, index) {
        var parameters = Reflect.getMetadata('parameters', cls);
        parameters = parameters || [];
        while (parameters.length <= index) {
          parameters.push(null);
        }
        parameters[index] = parameters[index] || [];
        var annotationsForParam = parameters[index];
        annotationsForParam.push(annotationInstance);
        Reflect.defineMetadata('parameters', parameters, cls);
        return cls;
      }
    }
    ParamDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    ParamDecoratorFactory.annotationCls = annotationCls;
    return ParamDecoratorFactory;
  }
  exports.makeParamDecorator = makeParamDecorator;
  function makePropDecorator(annotationCls) {
    function PropDecoratorFactory() {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
      }
      var decoratorInstance = Object.create(annotationCls.prototype);
      annotationCls.apply(decoratorInstance, args);
      if (this instanceof annotationCls) {
        return decoratorInstance;
      } else {
        return function PropDecorator(target, name) {
          var meta = Reflect.getOwnMetadata('propMetadata', target.constructor);
          meta = meta || {};
          meta[name] = meta[name] || [];
          meta[name].unshift(decoratorInstance);
          Reflect.defineMetadata('propMetadata', meta, target.constructor);
        };
      }
    }
    PropDecoratorFactory.prototype = Object.create(annotationCls.prototype);
    PropDecoratorFactory.annotationCls = annotationCls;
    return PropDecoratorFactory;
  }
  exports.makePropDecorator = makePropDecorator;
  return module.exports;
});

$__System.registerDynamic("33", ["f", "15"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var metadata_1 = $__require('f');
  var decorators_1 = $__require('15');
  exports.Inject = decorators_1.makeParamDecorator(metadata_1.InjectMetadata);
  exports.Optional = decorators_1.makeParamDecorator(metadata_1.OptionalMetadata);
  exports.Injectable = decorators_1.makeDecorator(metadata_1.InjectableMetadata);
  exports.Self = decorators_1.makeParamDecorator(metadata_1.SelfMetadata);
  exports.Host = decorators_1.makeParamDecorator(metadata_1.HostMetadata);
  exports.SkipSelf = decorators_1.makeParamDecorator(metadata_1.SkipSelfMetadata);
  return module.exports;
});

$__System.registerDynamic("2c", ["e", "33"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var lang_1 = $__require('e');
  var decorators_1 = $__require('33');
  var _warnImpl = lang_1.warn;
  var Console = (function() {
    function Console() {}
    Console.prototype.log = function(message) {
      lang_1.print(message);
    };
    Console.prototype.warn = function(message) {
      _warnImpl(message);
    };
    Console.decorators = [{type: decorators_1.Injectable}];
    return Console;
  }());
  exports.Console = Console;
  return module.exports;
});

$__System.registerDynamic("59", ["12", "44", "4c", "39", "2e", "1f", "41", "40", "42", "38", "14", "43", "4b", "1a", "22", "54", "50", "15", "56", "52", "2c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var constants = $__require('12');
  var security = $__require('44');
  var reflective_provider = $__require('4c');
  var lifecycle_hooks = $__require('39');
  var reflector_reader = $__require('2e');
  var component_resolver = $__require('1f');
  var element = $__require('41');
  var view = $__require('40');
  var view_type = $__require('42');
  var view_utils = $__require('38');
  var metadata_view = $__require('14');
  var debug_context = $__require('43');
  var change_detection_util = $__require('4b');
  var api = $__require('1a');
  var template_ref = $__require('22');
  var wtf_init = $__require('54');
  var reflection_capabilities = $__require('50');
  var decorators = $__require('15');
  var debug = $__require('56');
  var provider_util = $__require('52');
  var console = $__require('2c');
  exports.__core_private__ = {
    isDefaultChangeDetectionStrategy: constants.isDefaultChangeDetectionStrategy,
    ChangeDetectorState: constants.ChangeDetectorState,
    CHANGE_DETECTION_STRATEGY_VALUES: constants.CHANGE_DETECTION_STRATEGY_VALUES,
    constructDependencies: reflective_provider.constructDependencies,
    LifecycleHooks: lifecycle_hooks.LifecycleHooks,
    LIFECYCLE_HOOKS_VALUES: lifecycle_hooks.LIFECYCLE_HOOKS_VALUES,
    ReflectorReader: reflector_reader.ReflectorReader,
    ReflectorComponentResolver: component_resolver.ReflectorComponentResolver,
    AppElement: element.AppElement,
    AppView: view.AppView,
    DebugAppView: view.DebugAppView,
    ViewType: view_type.ViewType,
    MAX_INTERPOLATION_VALUES: view_utils.MAX_INTERPOLATION_VALUES,
    checkBinding: view_utils.checkBinding,
    flattenNestedViewRenderNodes: view_utils.flattenNestedViewRenderNodes,
    interpolate: view_utils.interpolate,
    ViewUtils: view_utils.ViewUtils,
    VIEW_ENCAPSULATION_VALUES: metadata_view.VIEW_ENCAPSULATION_VALUES,
    DebugContext: debug_context.DebugContext,
    StaticNodeDebugInfo: debug_context.StaticNodeDebugInfo,
    devModeEqual: change_detection_util.devModeEqual,
    uninitialized: change_detection_util.uninitialized,
    ValueUnwrapper: change_detection_util.ValueUnwrapper,
    RenderDebugInfo: api.RenderDebugInfo,
    SecurityContext: security.SecurityContext,
    SanitizationService: security.SanitizationService,
    TemplateRef_: template_ref.TemplateRef_,
    wtfInit: wtf_init.wtfInit,
    ReflectionCapabilities: reflection_capabilities.ReflectionCapabilities,
    makeDecorator: decorators.makeDecorator,
    DebugDomRootRenderer: debug.DebugDomRootRenderer,
    createProvider: provider_util.createProvider,
    isProviderLiteral: provider_util.isProviderLiteral,
    EMPTY_ARRAY: view_utils.EMPTY_ARRAY,
    EMPTY_MAP: view_utils.EMPTY_MAP,
    pureProxy1: view_utils.pureProxy1,
    pureProxy2: view_utils.pureProxy2,
    pureProxy3: view_utils.pureProxy3,
    pureProxy4: view_utils.pureProxy4,
    pureProxy5: view_utils.pureProxy5,
    pureProxy6: view_utils.pureProxy6,
    pureProxy7: view_utils.pureProxy7,
    pureProxy8: view_utils.pureProxy8,
    pureProxy9: view_utils.pureProxy9,
    pureProxy10: view_utils.pureProxy10,
    castByValue: view_utils.castByValue,
    Console: console.Console
  };
  return module.exports;
});

$__System.registerDynamic("a", ["13", "16", "2a", "30", "34", "17", "19", "1e", "55", "2f", "27", "29", "2b", "37", "2d", "35", "e", "1d", "32", "59"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function __export(m) {
    for (var p in m)
      if (!exports.hasOwnProperty(p))
        exports[p] = m[p];
  }
  __export($__require('13'));
  __export($__require('16'));
  __export($__require('2a'));
  var application_ref_1 = $__require('30');
  exports.createPlatform = application_ref_1.createPlatform;
  exports.assertPlatform = application_ref_1.assertPlatform;
  exports.disposePlatform = application_ref_1.disposePlatform;
  exports.getPlatform = application_ref_1.getPlatform;
  exports.coreBootstrap = application_ref_1.coreBootstrap;
  exports.coreLoadAndBootstrap = application_ref_1.coreLoadAndBootstrap;
  exports.createNgZone = application_ref_1.createNgZone;
  exports.PlatformRef = application_ref_1.PlatformRef;
  exports.ApplicationRef = application_ref_1.ApplicationRef;
  var application_tokens_1 = $__require('34');
  exports.APP_ID = application_tokens_1.APP_ID;
  exports.APP_INITIALIZER = application_tokens_1.APP_INITIALIZER;
  exports.PACKAGE_ROOT_URL = application_tokens_1.PACKAGE_ROOT_URL;
  exports.PLATFORM_INITIALIZER = application_tokens_1.PLATFORM_INITIALIZER;
  __export($__require('17'));
  __export($__require('19'));
  __export($__require('1e'));
  var debug_node_1 = $__require('55');
  exports.DebugElement = debug_node_1.DebugElement;
  exports.DebugNode = debug_node_1.DebugNode;
  exports.asNativeElements = debug_node_1.asNativeElements;
  exports.getDebugNode = debug_node_1.getDebugNode;
  __export($__require('2f'));
  __export($__require('27'));
  __export($__require('29'));
  __export($__require('2b'));
  __export($__require('37'));
  __export($__require('2d'));
  var profile_1 = $__require('35');
  exports.wtfCreateScope = profile_1.wtfCreateScope;
  exports.wtfLeave = profile_1.wtfLeave;
  exports.wtfStartTimeRange = profile_1.wtfStartTimeRange;
  exports.wtfEndTimeRange = profile_1.wtfEndTimeRange;
  var lang_1 = $__require('e');
  exports.Type = lang_1.Type;
  exports.enableProdMode = lang_1.enableProdMode;
  var async_1 = $__require('1d');
  exports.EventEmitter = async_1.EventEmitter;
  var exceptions_1 = $__require('32');
  exports.ExceptionHandler = exceptions_1.ExceptionHandler;
  exports.WrappedException = exceptions_1.WrappedException;
  exports.BaseException = exceptions_1.BaseException;
  __export($__require('59'));
  return module.exports;
});

$__System.register("5a", [], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  function stringStartsWith(str, prefix) {
    return str.indexOf(prefix) === 0;
  }
  exports_1("stringStartsWith", stringStartsWith);
  return {
    setters: [],
    execute: function() {}
  };
});

(function() {
var define = $__System.amdDefine;
(function() {
  var Hashes;
  function utf8Encode(str) {
    var x,
        y,
        output = '',
        i = -1,
        l;
    if (str && str.length) {
      l = str.length;
      while ((i += 1) < l) {
        x = str.charCodeAt(i);
        y = i + 1 < l ? str.charCodeAt(i + 1) : 0;
        if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
          x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
          i += 1;
        }
        if (x <= 0x7F) {
          output += String.fromCharCode(x);
        } else if (x <= 0x7FF) {
          output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F), 0x80 | (x & 0x3F));
        } else if (x <= 0xFFFF) {
          output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        } else if (x <= 0x1FFFFF) {
          output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07), 0x80 | ((x >>> 12) & 0x3F), 0x80 | ((x >>> 6) & 0x3F), 0x80 | (x & 0x3F));
        }
      }
    }
    return output;
  }
  function utf8Decode(str) {
    var i,
        ac,
        c1,
        c2,
        c3,
        arr = [],
        l;
    i = ac = c1 = c2 = c3 = 0;
    if (str && str.length) {
      l = str.length;
      str += '';
      while (i < l) {
        c1 = str.charCodeAt(i);
        ac += 1;
        if (c1 < 128) {
          arr[ac] = String.fromCharCode(c1);
          i += 1;
        } else if (c1 > 191 && c1 < 224) {
          c2 = str.charCodeAt(i + 1);
          arr[ac] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
          i += 2;
        } else {
          c2 = str.charCodeAt(i + 1);
          c3 = str.charCodeAt(i + 2);
          arr[ac] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
          i += 3;
        }
      }
    }
    return arr.join('');
  }
  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
        msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
  function rstr2hex(input, hexcase) {
    var hex_tab = hexcase ? '0123456789ABCDEF' : '0123456789abcdef',
        output = '',
        x,
        i = 0,
        l = input.length;
    for (; i < l; i += 1) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F) + hex_tab.charAt(x & 0x0F);
    }
    return output;
  }
  function str2rstr_utf16le(input) {
    var i,
        l = input.length,
        output = '';
    for (i = 0; i < l; i += 1) {
      output += String.fromCharCode(input.charCodeAt(i) & 0xFF, (input.charCodeAt(i) >>> 8) & 0xFF);
    }
    return output;
  }
  function str2rstr_utf16be(input) {
    var i,
        l = input.length,
        output = '';
    for (i = 0; i < l; i += 1) {
      output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF, input.charCodeAt(i) & 0xFF);
    }
    return output;
  }
  function binb2rstr(input) {
    var i,
        l = input.length * 32,
        output = '';
    for (i = 0; i < l; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (24 - i % 32)) & 0xFF);
    }
    return output;
  }
  function binl2rstr(input) {
    var i,
        l = input.length * 32,
        output = '';
    for (i = 0; i < l; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    }
    return output;
  }
  function rstr2binl(input) {
    var i,
        l = input.length * 8,
        output = Array(input.length >> 2),
        lo = output.length;
    for (i = 0; i < lo; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < l; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    }
    return output;
  }
  function rstr2binb(input) {
    var i,
        l = input.length * 8,
        output = Array(input.length >> 2),
        lo = output.length;
    for (i = 0; i < lo; i += 1) {
      output[i] = 0;
    }
    for (i = 0; i < l; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (24 - i % 32);
    }
    return output;
  }
  function rstr2any(input, encoding) {
    var divisor = encoding.length,
        remainders = Array(),
        i,
        q,
        x,
        ld,
        quotient,
        dividend,
        output,
        full_length;
    dividend = Array(Math.ceil(input.length / 2));
    ld = dividend.length;
    for (i = 0; i < ld; i += 1) {
      dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
    }
    while (dividend.length > 0) {
      quotient = Array();
      x = 0;
      for (i = 0; i < dividend.length; i += 1) {
        x = (x << 16) + dividend[i];
        q = Math.floor(x / divisor);
        x -= q * divisor;
        if (quotient.length > 0 || q > 0) {
          quotient[quotient.length] = q;
        }
      }
      remainders[remainders.length] = x;
      dividend = quotient;
    }
    output = '';
    for (i = remainders.length - 1; i >= 0; i--) {
      output += encoding.charAt(remainders[i]);
    }
    full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
    for (i = output.length; i < full_length; i += 1) {
      output = encoding[0] + output;
    }
    return output;
  }
  function rstr2b64(input, b64pad) {
    var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        output = '',
        len = input.length,
        i,
        j,
        triplet;
    b64pad = b64pad || '=';
    for (i = 0; i < len; i += 3) {
      triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
      for (j = 0; j < 4; j += 1) {
        if (i * 8 + j * 6 > input.length * 8) {
          output += b64pad;
        } else {
          output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
        }
      }
    }
    return output;
  }
  Hashes = {
    VERSION: '1.0.5',
    Base64: function() {
      var tab = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
          pad = '=',
          url = false,
          utf8 = true;
      this.encode = function(input) {
        var i,
            j,
            triplet,
            output = '',
            len = input.length;
        pad = pad || '=';
        input = (utf8) ? utf8Encode(input) : input;
        for (i = 0; i < len; i += 3) {
          triplet = (input.charCodeAt(i) << 16) | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
          for (j = 0; j < 4; j += 1) {
            if (i * 8 + j * 6 > len * 8) {
              output += pad;
            } else {
              output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
            }
          }
        }
        return output;
      };
      this.decode = function(input) {
        var i,
            o1,
            o2,
            o3,
            h1,
            h2,
            h3,
            h4,
            bits,
            ac,
            dec = '',
            arr = [];
        if (!input) {
          return input;
        }
        i = ac = 0;
        input = input.replace(new RegExp('\\' + pad, 'gi'), '');
        do {
          h1 = tab.indexOf(input.charAt(i += 1));
          h2 = tab.indexOf(input.charAt(i += 1));
          h3 = tab.indexOf(input.charAt(i += 1));
          h4 = tab.indexOf(input.charAt(i += 1));
          bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;
          o1 = bits >> 16 & 0xff;
          o2 = bits >> 8 & 0xff;
          o3 = bits & 0xff;
          ac += 1;
          if (h3 === 64) {
            arr[ac] = String.fromCharCode(o1);
          } else if (h4 === 64) {
            arr[ac] = String.fromCharCode(o1, o2);
          } else {
            arr[ac] = String.fromCharCode(o1, o2, o3);
          }
        } while (i < input.length);
        dec = arr.join('');
        dec = (utf8) ? utf8Decode(dec) : dec;
        return dec;
      };
      this.setPad = function(str) {
        pad = str || pad;
        return this;
      };
      this.setTab = function(str) {
        tab = str || tab;
        return this;
      };
      this.setUTF8 = function(bool) {
        if (typeof bool === 'boolean') {
          utf8 = bool;
        }
        return this;
      };
    },
    CRC32: function(str) {
      var crc = 0,
          x = 0,
          y = 0,
          table,
          i,
          iTop;
      str = utf8Encode(str);
      table = ['00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 ', '79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 ', '84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F ', '63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD ', 'A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC ', '51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 ', 'B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 ', '06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 ', 'E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 ', '12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 ', 'D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 ', '33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 ', 'CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 ', '9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E ', '7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D ', '806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 ', '60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA ', 'AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 ', '5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 ', 'B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 ', '05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 ', 'F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA ', '11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 ', 'D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F ', '30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E ', 'C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D'].join('');
      crc = crc ^ (-1);
      for (i = 0, iTop = str.length; i < iTop; i += 1) {
        y = (crc ^ str.charCodeAt(i)) & 0xFF;
        x = '0x' + table.substr(y * 9, 8);
        crc = (crc >>> 8) ^ x;
      }
      return (crc ^ (-1)) >>> 0;
    },
    MD5: function(options) {
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false,
          b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
          utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true;
      this.hex = function(s) {
        return rstr2hex(rstr(s, utf8), hexcase);
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s, utf8), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d), hexcase);
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      this.setPad = function(a) {
        b64pad = a || b64pad;
        return this;
      };
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };
      function rstr(s) {
        s = (utf8) ? utf8Encode(s) : s;
        return binl2rstr(binl(rstr2binl(s), s.length * 8));
      }
      function rstr_hmac(key, data) {
        var bkey,
            ipad,
            opad,
            hash,
            i;
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        bkey = rstr2binl(key);
        if (bkey.length > 16) {
          bkey = binl(bkey, key.length * 8);
        }
        ipad = Array(16), opad = Array(16);
        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl(opad.concat(hash), 512 + 128));
      }
      function binl(x, len) {
        var i,
            olda,
            oldb,
            oldc,
            oldd,
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878;
        x[len >> 5] |= 0x80 << ((len) % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        for (i = 0; i < x.length; i += 16) {
          olda = a;
          oldb = b;
          oldc = c;
          oldd = d;
          a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
          d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
          c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
          b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
          a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
          d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
          c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
          b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
          a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
          d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
          c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
          b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
          a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
          d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
          c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
          b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);
          a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
          d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
          c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
          b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
          a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
          d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
          c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
          b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
          a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
          d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
          c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
          b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
          a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
          d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
          c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
          b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);
          a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
          d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
          c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
          b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
          a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
          d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
          c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
          b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
          a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
          d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
          c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
          b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
          a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
          d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
          c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
          b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);
          a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
          d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
          c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
          b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
          a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
          d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
          c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
          b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
          a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
          d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
          c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
          b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
          a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
          d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
          c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
          b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
        }
        return Array(a, b, c, d);
      }
      function md5_cmn(q, a, b, x, s, t) {
        return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
      }
      function md5_ff(a, b, c, d, x, s, t) {
        return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
      }
      function md5_gg(a, b, c, d, x, s, t) {
        return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
      }
      function md5_hh(a, b, c, d, x, s, t) {
        return md5_cmn(b ^ c ^ d, a, b, x, s, t);
      }
      function md5_ii(a, b, c, d, x, s, t) {
        return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
      }
    },
    SHA1: function(options) {
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false,
          b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
          utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true;
      this.hex = function(s) {
        return rstr2hex(rstr(s, utf8), hexcase);
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s, utf8), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s, utf8), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d));
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      this.setPad = function(a) {
        b64pad = a || b64pad;
        return this;
      };
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };
      function rstr(s) {
        s = (utf8) ? utf8Encode(s) : s;
        return binb2rstr(binb(rstr2binb(s), s.length * 8));
      }
      function rstr_hmac(key, data) {
        var bkey,
            ipad,
            opad,
            i,
            hash;
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        bkey = rstr2binb(key);
        if (bkey.length > 16) {
          bkey = binb(bkey, key.length * 8);
        }
        ipad = Array(16), opad = Array(16);
        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binb(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
        return binb2rstr(binb(opad.concat(hash), 512 + 160));
      }
      function binb(x, len) {
        var i,
            j,
            t,
            olda,
            oldb,
            oldc,
            oldd,
            olde,
            w = Array(80),
            a = 1732584193,
            b = -271733879,
            c = -1732584194,
            d = 271733878,
            e = -1009589776;
        x[len >> 5] |= 0x80 << (24 - len % 32);
        x[((len + 64 >> 9) << 4) + 15] = len;
        for (i = 0; i < x.length; i += 16) {
          olda = a, oldb = b;
          oldc = c;
          oldd = d;
          olde = e;
          for (j = 0; j < 80; j += 1) {
            if (j < 16) {
              w[j] = x[i + j];
            } else {
              w[j] = bit_rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            }
            t = safe_add(safe_add(bit_rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = bit_rol(b, 30);
            b = a;
            a = t;
          }
          a = safe_add(a, olda);
          b = safe_add(b, oldb);
          c = safe_add(c, oldc);
          d = safe_add(d, oldd);
          e = safe_add(e, olde);
        }
        return Array(a, b, c, d, e);
      }
      function sha1_ft(t, b, c, d) {
        if (t < 20) {
          return (b & c) | ((~b) & d);
        }
        if (t < 40) {
          return b ^ c ^ d;
        }
        if (t < 60) {
          return (b & c) | (b & d) | (c & d);
        }
        return b ^ c ^ d;
      }
      function sha1_kt(t) {
        return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
      }
    },
    SHA256: function(options) {
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false,
          b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
          utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true,
          sha256_K;
      this.hex = function(s) {
        return rstr2hex(rstr(s, utf8));
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s, utf8), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s, utf8), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d));
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      this.setPad = function(a) {
        b64pad = a || b64pad;
        return this;
      };
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };
      function rstr(s, utf8) {
        s = (utf8) ? utf8Encode(s) : s;
        return binb2rstr(binb(rstr2binb(s), s.length * 8));
      }
      function rstr_hmac(key, data) {
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        var hash,
            i = 0,
            bkey = rstr2binb(key),
            ipad = Array(16),
            opad = Array(16);
        if (bkey.length > 16) {
          bkey = binb(bkey, key.length * 8);
        }
        for (; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binb(ipad.concat(rstr2binb(data)), 512 + data.length * 8);
        return binb2rstr(binb(opad.concat(hash), 512 + 256));
      }
      function sha256_S(X, n) {
        return (X >>> n) | (X << (32 - n));
      }
      function sha256_R(X, n) {
        return (X >>> n);
      }
      function sha256_Ch(x, y, z) {
        return ((x & y) ^ ((~x) & z));
      }
      function sha256_Maj(x, y, z) {
        return ((x & y) ^ (x & z) ^ (y & z));
      }
      function sha256_Sigma0256(x) {
        return (sha256_S(x, 2) ^ sha256_S(x, 13) ^ sha256_S(x, 22));
      }
      function sha256_Sigma1256(x) {
        return (sha256_S(x, 6) ^ sha256_S(x, 11) ^ sha256_S(x, 25));
      }
      function sha256_Gamma0256(x) {
        return (sha256_S(x, 7) ^ sha256_S(x, 18) ^ sha256_R(x, 3));
      }
      function sha256_Gamma1256(x) {
        return (sha256_S(x, 17) ^ sha256_S(x, 19) ^ sha256_R(x, 10));
      }
      function sha256_Sigma0512(x) {
        return (sha256_S(x, 28) ^ sha256_S(x, 34) ^ sha256_S(x, 39));
      }
      function sha256_Sigma1512(x) {
        return (sha256_S(x, 14) ^ sha256_S(x, 18) ^ sha256_S(x, 41));
      }
      function sha256_Gamma0512(x) {
        return (sha256_S(x, 1) ^ sha256_S(x, 8) ^ sha256_R(x, 7));
      }
      function sha256_Gamma1512(x) {
        return (sha256_S(x, 19) ^ sha256_S(x, 61) ^ sha256_R(x, 6));
      }
      sha256_K = [1116352408, 1899447441, -1245643825, -373957723, 961987163, 1508970993, -1841331548, -1424204075, -670586216, 310598401, 607225278, 1426881987, 1925078388, -2132889090, -1680079193, -1046744716, -459576895, -272742522, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, -1740746414, -1473132947, -1341970488, -1084653625, -958395405, -710438585, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, -2117940946, -1838011259, -1564481375, -1474664885, -1035236496, -949202525, -778901479, -694614492, -200395387, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, -2067236844, -1933114872, -1866530822, -1538233109, -1090935817, -965641998];
      function binb(m, l) {
        var HASH = [1779033703, -1150833019, 1013904242, -1521486534, 1359893119, -1694144372, 528734635, 1541459225];
        var W = new Array(64);
        var a,
            b,
            c,
            d,
            e,
            f,
            g,
            h;
        var i,
            j,
            T1,
            T2;
        m[l >> 5] |= 0x80 << (24 - l % 32);
        m[((l + 64 >> 9) << 4) + 15] = l;
        for (i = 0; i < m.length; i += 16) {
          a = HASH[0];
          b = HASH[1];
          c = HASH[2];
          d = HASH[3];
          e = HASH[4];
          f = HASH[5];
          g = HASH[6];
          h = HASH[7];
          for (j = 0; j < 64; j += 1) {
            if (j < 16) {
              W[j] = m[j + i];
            } else {
              W[j] = safe_add(safe_add(safe_add(sha256_Gamma1256(W[j - 2]), W[j - 7]), sha256_Gamma0256(W[j - 15])), W[j - 16]);
            }
            T1 = safe_add(safe_add(safe_add(safe_add(h, sha256_Sigma1256(e)), sha256_Ch(e, f, g)), sha256_K[j]), W[j]);
            T2 = safe_add(sha256_Sigma0256(a), sha256_Maj(a, b, c));
            h = g;
            g = f;
            f = e;
            e = safe_add(d, T1);
            d = c;
            c = b;
            b = a;
            a = safe_add(T1, T2);
          }
          HASH[0] = safe_add(a, HASH[0]);
          HASH[1] = safe_add(b, HASH[1]);
          HASH[2] = safe_add(c, HASH[2]);
          HASH[3] = safe_add(d, HASH[3]);
          HASH[4] = safe_add(e, HASH[4]);
          HASH[5] = safe_add(f, HASH[5]);
          HASH[6] = safe_add(g, HASH[6]);
          HASH[7] = safe_add(h, HASH[7]);
        }
        return HASH;
      }
    },
    SHA512: function(options) {
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false,
          b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
          utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true,
          sha512_k;
      this.hex = function(s) {
        return rstr2hex(rstr(s));
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d));
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      this.setPad = function(a) {
        b64pad = a || b64pad;
        return this;
      };
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };
      function rstr(s) {
        s = (utf8) ? utf8Encode(s) : s;
        return binb2rstr(binb(rstr2binb(s), s.length * 8));
      }
      function rstr_hmac(key, data) {
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        var hash,
            i = 0,
            bkey = rstr2binb(key),
            ipad = Array(32),
            opad = Array(32);
        if (bkey.length > 32) {
          bkey = binb(bkey, key.length * 8);
        }
        for (; i < 32; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binb(ipad.concat(rstr2binb(data)), 1024 + data.length * 8);
        return binb2rstr(binb(opad.concat(hash), 1024 + 512));
      }
      function binb(x, len) {
        var j,
            i,
            l,
            W = new Array(80),
            hash = new Array(16),
            H = [new int64(0x6a09e667, -205731576), new int64(-1150833019, -2067093701), new int64(0x3c6ef372, -23791573), new int64(-1521486534, 0x5f1d36f1), new int64(0x510e527f, -1377402159), new int64(-1694144372, 0x2b3e6c1f), new int64(0x1f83d9ab, -79577749), new int64(0x5be0cd19, 0x137e2179)],
            T1 = new int64(0, 0),
            T2 = new int64(0, 0),
            a = new int64(0, 0),
            b = new int64(0, 0),
            c = new int64(0, 0),
            d = new int64(0, 0),
            e = new int64(0, 0),
            f = new int64(0, 0),
            g = new int64(0, 0),
            h = new int64(0, 0),
            s0 = new int64(0, 0),
            s1 = new int64(0, 0),
            Ch = new int64(0, 0),
            Maj = new int64(0, 0),
            r1 = new int64(0, 0),
            r2 = new int64(0, 0),
            r3 = new int64(0, 0);
        if (sha512_k === undefined) {
          sha512_k = [new int64(0x428a2f98, -685199838), new int64(0x71374491, 0x23ef65cd), new int64(-1245643825, -330482897), new int64(-373957723, -2121671748), new int64(0x3956c25b, -213338824), new int64(0x59f111f1, -1241133031), new int64(-1841331548, -1357295717), new int64(-1424204075, -630357736), new int64(-670586216, -1560083902), new int64(0x12835b01, 0x45706fbe), new int64(0x243185be, 0x4ee4b28c), new int64(0x550c7dc3, -704662302), new int64(0x72be5d74, -226784913), new int64(-2132889090, 0x3b1696b1), new int64(-1680079193, 0x25c71235), new int64(-1046744716, -815192428), new int64(-459576895, -1628353838), new int64(-272742522, 0x384f25e3), new int64(0xfc19dc6, -1953704523), new int64(0x240ca1cc, 0x77ac9c65), new int64(0x2de92c6f, 0x592b0275), new int64(0x4a7484aa, 0x6ea6e483), new int64(0x5cb0a9dc, -1119749164), new int64(0x76f988da, -2096016459), new int64(-1740746414, -295247957), new int64(-1473132947, 0x2db43210), new int64(-1341970488, -1728372417), new int64(-1084653625, -1091629340), new int64(-958395405, 0x3da88fc2), new int64(-710438585, -1828018395), new int64(0x6ca6351, -536640913), new int64(0x14292967, 0xa0e6e70), new int64(0x27b70a85, 0x46d22ffc), new int64(0x2e1b2138, 0x5c26c926), new int64(0x4d2c6dfc, 0x5ac42aed), new int64(0x53380d13, -1651133473), new int64(0x650a7354, -1951439906), new int64(0x766a0abb, 0x3c77b2a8), new int64(-2117940946, 0x47edaee6), new int64(-1838011259, 0x1482353b), new int64(-1564481375, 0x4cf10364), new int64(-1474664885, -1136513023), new int64(-1035236496, -789014639), new int64(-949202525, 0x654be30), new int64(-778901479, -688958952), new int64(-694614492, 0x5565a910), new int64(-200395387, 0x5771202a), new int64(0x106aa070, 0x32bbd1b8), new int64(0x19a4c116, -1194143544), new int64(0x1e376c08, 0x5141ab53), new int64(0x2748774c, -544281703), new int64(0x34b0bcb5, -509917016), new int64(0x391c0cb3, -976659869), new int64(0x4ed8aa4a, -482243893), new int64(0x5b9cca4f, 0x7763e373), new int64(0x682e6ff3, -692930397), new int64(0x748f82ee, 0x5defb2fc), new int64(0x78a5636f, 0x43172f60), new int64(-2067236844, -1578062990), new int64(-1933114872, 0x1a6439ec), new int64(-1866530822, 0x23631e28), new int64(-1538233109, -561857047), new int64(-1090935817, -1295615723), new int64(-965641998, -479046869), new int64(-903397682, -366583396), new int64(-779700025, 0x21c0c207), new int64(-354779690, -840897762), new int64(-176337025, -294727304), new int64(0x6f067aa, 0x72176fba), new int64(0xa637dc5, -1563912026), new int64(0x113f9804, -1090974290), new int64(0x1b710b35, 0x131c471b), new int64(0x28db77f5, 0x23047d84), new int64(0x32caab7b, 0x40c72493), new int64(0x3c9ebe0a, 0x15c9bebc), new int64(0x431d67c4, -1676669620), new int64(0x4cc5d4be, -885112138), new int64(0x597f299c, -60457430), new int64(0x5fcb6fab, 0x3ad6faec), new int64(0x6c44198c, 0x4a475817)];
        }
        for (i = 0; i < 80; i += 1) {
          W[i] = new int64(0, 0);
        }
        x[len >> 5] |= 0x80 << (24 - (len & 0x1f));
        x[((len + 128 >> 10) << 5) + 31] = len;
        l = x.length;
        for (i = 0; i < l; i += 32) {
          int64copy(a, H[0]);
          int64copy(b, H[1]);
          int64copy(c, H[2]);
          int64copy(d, H[3]);
          int64copy(e, H[4]);
          int64copy(f, H[5]);
          int64copy(g, H[6]);
          int64copy(h, H[7]);
          for (j = 0; j < 16; j += 1) {
            W[j].h = x[i + 2 * j];
            W[j].l = x[i + 2 * j + 1];
          }
          for (j = 16; j < 80; j += 1) {
            int64rrot(r1, W[j - 2], 19);
            int64revrrot(r2, W[j - 2], 29);
            int64shr(r3, W[j - 2], 6);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            int64rrot(r1, W[j - 15], 1);
            int64rrot(r2, W[j - 15], 8);
            int64shr(r3, W[j - 15], 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;
            int64add4(W[j], s1, W[j - 7], s0, W[j - 16]);
          }
          for (j = 0; j < 80; j += 1) {
            Ch.l = (e.l & f.l) ^ (~e.l & g.l);
            Ch.h = (e.h & f.h) ^ (~e.h & g.h);
            int64rrot(r1, e, 14);
            int64rrot(r2, e, 18);
            int64revrrot(r3, e, 9);
            s1.l = r1.l ^ r2.l ^ r3.l;
            s1.h = r1.h ^ r2.h ^ r3.h;
            int64rrot(r1, a, 28);
            int64revrrot(r2, a, 2);
            int64revrrot(r3, a, 7);
            s0.l = r1.l ^ r2.l ^ r3.l;
            s0.h = r1.h ^ r2.h ^ r3.h;
            Maj.l = (a.l & b.l) ^ (a.l & c.l) ^ (b.l & c.l);
            Maj.h = (a.h & b.h) ^ (a.h & c.h) ^ (b.h & c.h);
            int64add5(T1, h, s1, Ch, sha512_k[j], W[j]);
            int64add(T2, s0, Maj);
            int64copy(h, g);
            int64copy(g, f);
            int64copy(f, e);
            int64add(e, d, T1);
            int64copy(d, c);
            int64copy(c, b);
            int64copy(b, a);
            int64add(a, T1, T2);
          }
          int64add(H[0], H[0], a);
          int64add(H[1], H[1], b);
          int64add(H[2], H[2], c);
          int64add(H[3], H[3], d);
          int64add(H[4], H[4], e);
          int64add(H[5], H[5], f);
          int64add(H[6], H[6], g);
          int64add(H[7], H[7], h);
        }
        for (i = 0; i < 8; i += 1) {
          hash[2 * i] = H[i].h;
          hash[2 * i + 1] = H[i].l;
        }
        return hash;
      }
      function int64(h, l) {
        this.h = h;
        this.l = l;
      }
      function int64copy(dst, src) {
        dst.h = src.h;
        dst.l = src.l;
      }
      function int64rrot(dst, x, shift) {
        dst.l = (x.l >>> shift) | (x.h << (32 - shift));
        dst.h = (x.h >>> shift) | (x.l << (32 - shift));
      }
      function int64revrrot(dst, x, shift) {
        dst.l = (x.h >>> shift) | (x.l << (32 - shift));
        dst.h = (x.l >>> shift) | (x.h << (32 - shift));
      }
      function int64shr(dst, x, shift) {
        dst.l = (x.l >>> shift) | (x.h << (32 - shift));
        dst.h = (x.h >>> shift);
      }
      function int64add(dst, x, y) {
        var w0 = (x.l & 0xffff) + (y.l & 0xffff);
        var w1 = (x.l >>> 16) + (y.l >>> 16) + (w0 >>> 16);
        var w2 = (x.h & 0xffff) + (y.h & 0xffff) + (w1 >>> 16);
        var w3 = (x.h >>> 16) + (y.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
      }
      function int64add4(dst, a, b, c, d) {
        var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff);
        var w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (w0 >>> 16);
        var w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (w1 >>> 16);
        var w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
      }
      function int64add5(dst, a, b, c, d, e) {
        var w0 = (a.l & 0xffff) + (b.l & 0xffff) + (c.l & 0xffff) + (d.l & 0xffff) + (e.l & 0xffff),
            w1 = (a.l >>> 16) + (b.l >>> 16) + (c.l >>> 16) + (d.l >>> 16) + (e.l >>> 16) + (w0 >>> 16),
            w2 = (a.h & 0xffff) + (b.h & 0xffff) + (c.h & 0xffff) + (d.h & 0xffff) + (e.h & 0xffff) + (w1 >>> 16),
            w3 = (a.h >>> 16) + (b.h >>> 16) + (c.h >>> 16) + (d.h >>> 16) + (e.h >>> 16) + (w2 >>> 16);
        dst.l = (w0 & 0xffff) | (w1 << 16);
        dst.h = (w2 & 0xffff) | (w3 << 16);
      }
    },
    RMD160: function(options) {
      var hexcase = (options && typeof options.uppercase === 'boolean') ? options.uppercase : false,
          b64pad = (options && typeof options.pad === 'string') ? options.pda : '=',
          utf8 = (options && typeof options.utf8 === 'boolean') ? options.utf8 : true,
          rmd160_r1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8, 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12, 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2, 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13],
          rmd160_r2 = [5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12, 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2, 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13, 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14, 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11],
          rmd160_s1 = [11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8, 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12, 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5, 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12, 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6],
          rmd160_s2 = [8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6, 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11, 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5, 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8, 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11];
      this.hex = function(s) {
        return rstr2hex(rstr(s, utf8));
      };
      this.b64 = function(s) {
        return rstr2b64(rstr(s, utf8), b64pad);
      };
      this.any = function(s, e) {
        return rstr2any(rstr(s, utf8), e);
      };
      this.raw = function(s) {
        return rstr(s, utf8);
      };
      this.hex_hmac = function(k, d) {
        return rstr2hex(rstr_hmac(k, d));
      };
      this.b64_hmac = function(k, d) {
        return rstr2b64(rstr_hmac(k, d), b64pad);
      };
      this.any_hmac = function(k, d, e) {
        return rstr2any(rstr_hmac(k, d), e);
      };
      this.vm_test = function() {
        return hex('abc').toLowerCase() === '900150983cd24fb0d6963f7d28e17f72';
      };
      this.setUpperCase = function(a) {
        if (typeof a === 'boolean') {
          hexcase = a;
        }
        return this;
      };
      this.setPad = function(a) {
        if (typeof a !== 'undefined') {
          b64pad = a;
        }
        return this;
      };
      this.setUTF8 = function(a) {
        if (typeof a === 'boolean') {
          utf8 = a;
        }
        return this;
      };
      function rstr(s) {
        s = (utf8) ? utf8Encode(s) : s;
        return binl2rstr(binl(rstr2binl(s), s.length * 8));
      }
      function rstr_hmac(key, data) {
        key = (utf8) ? utf8Encode(key) : key;
        data = (utf8) ? utf8Encode(data) : data;
        var i,
            hash,
            bkey = rstr2binl(key),
            ipad = Array(16),
            opad = Array(16);
        if (bkey.length > 16) {
          bkey = binl(bkey, key.length * 8);
        }
        for (i = 0; i < 16; i += 1) {
          ipad[i] = bkey[i] ^ 0x36363636;
          opad[i] = bkey[i] ^ 0x5C5C5C5C;
        }
        hash = binl(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
        return binl2rstr(binl(opad.concat(hash), 512 + 160));
      }
      function binl2rstr(input) {
        var i,
            output = '',
            l = input.length * 32;
        for (i = 0; i < l; i += 8) {
          output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
        }
        return output;
      }
      function binl(x, len) {
        var T,
            j,
            i,
            l,
            h0 = 0x67452301,
            h1 = 0xefcdab89,
            h2 = 0x98badcfe,
            h3 = 0x10325476,
            h4 = 0xc3d2e1f0,
            A1,
            B1,
            C1,
            D1,
            E1,
            A2,
            B2,
            C2,
            D2,
            E2;
        x[len >> 5] |= 0x80 << (len % 32);
        x[(((len + 64) >>> 9) << 4) + 14] = len;
        l = x.length;
        for (i = 0; i < l; i += 16) {
          A1 = A2 = h0;
          B1 = B2 = h1;
          C1 = C2 = h2;
          D1 = D2 = h3;
          E1 = E2 = h4;
          for (j = 0; j <= 79; j += 1) {
            T = safe_add(A1, rmd160_f(j, B1, C1, D1));
            T = safe_add(T, x[i + rmd160_r1[j]]);
            T = safe_add(T, rmd160_K1(j));
            T = safe_add(bit_rol(T, rmd160_s1[j]), E1);
            A1 = E1;
            E1 = D1;
            D1 = bit_rol(C1, 10);
            C1 = B1;
            B1 = T;
            T = safe_add(A2, rmd160_f(79 - j, B2, C2, D2));
            T = safe_add(T, x[i + rmd160_r2[j]]);
            T = safe_add(T, rmd160_K2(j));
            T = safe_add(bit_rol(T, rmd160_s2[j]), E2);
            A2 = E2;
            E2 = D2;
            D2 = bit_rol(C2, 10);
            C2 = B2;
            B2 = T;
          }
          T = safe_add(h1, safe_add(C1, D2));
          h1 = safe_add(h2, safe_add(D1, E2));
          h2 = safe_add(h3, safe_add(E1, A2));
          h3 = safe_add(h4, safe_add(A1, B2));
          h4 = safe_add(h0, safe_add(B1, C2));
          h0 = T;
        }
        return [h0, h1, h2, h3, h4];
      }
      function rmd160_f(j, x, y, z) {
        return (0 <= j && j <= 15) ? (x ^ y ^ z) : (16 <= j && j <= 31) ? (x & y) | (~x & z) : (32 <= j && j <= 47) ? (x | ~y) ^ z : (48 <= j && j <= 63) ? (x & z) | (y & ~z) : (64 <= j && j <= 79) ? x ^ (y | ~z) : 'rmd160_f: j out of range';
      }
      function rmd160_K1(j) {
        return (0 <= j && j <= 15) ? 0x00000000 : (16 <= j && j <= 31) ? 0x5a827999 : (32 <= j && j <= 47) ? 0x6ed9eba1 : (48 <= j && j <= 63) ? 0x8f1bbcdc : (64 <= j && j <= 79) ? 0xa953fd4e : 'rmd160_K1: j out of range';
      }
      function rmd160_K2(j) {
        return (0 <= j && j <= 15) ? 0x50a28be6 : (16 <= j && j <= 31) ? 0x5c4dd124 : (32 <= j && j <= 47) ? 0x6d703ef3 : (48 <= j && j <= 63) ? 0x7a6d76e9 : (64 <= j && j <= 79) ? 0x00000000 : 'rmd160_K2: j out of range';
      }
    }
  };
  (function(window, undefined) {
    var freeExports = false;
    if (typeof exports === 'object') {
      freeExports = exports;
      if (exports && typeof global === 'object' && global && global === global.global) {
        window = global;
      }
    }
    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
      define("5b", [], function() {
        return Hashes;
      });
    } else if (freeExports) {
      if (typeof module === 'object' && module && module.exports === freeExports) {
        module.exports = Hashes;
      } else {
        freeExports.Hashes = Hashes;
      }
    } else {
      window.Hashes = Hashes;
    }
  }(this));
}());

})();
$__System.register("5", ["a", "5a", "5b"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      builtins_1,
      jshashes_1;
  var SW_CONTROL_PREFIX,
      ParserState,
      ManifestGroup,
      Manifest,
      ManifestDelta,
      ManifestParser;
  function _entryVersion(entry) {
    var version = entry.url;
    if (entry.metadata.hasOwnProperty('hash')) {
      version = version + ":" + entry['hash'];
    }
    return version;
  }
  function _computeAndSetVersion(group) {
    var files = [];
    var allFilesHaveHash = Object.keys(group.cache).map(function(key) {
      return group.cache[key].metadata.hasOwnProperty('hash');
    }).reduce(function(state, hasHash) {
      return state && hasHash;
    }, true);
    if (group.metadata.hasOwnProperty('version')) {
      group.version = group.metadata['version'];
      return;
    } else if (!allFilesHaveHash) {
      throw 'All files must have a hash, or the group must be versioned as a whole';
    }
    files.push.apply(files, Object.keys(group.cache).map(function(key) {
      return group.cache[key];
    }).map(function(entry) {
      return _entryVersion(entry);
    }));
    files.sort();
    group.version = (new jshashes_1.SHA1()).hex(files.join('::'));
  }
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(builtins_1_1) {
      builtins_1 = builtins_1_1;
    }, function(jshashes_1_1) {
      jshashes_1 = jshashes_1_1;
    }],
    execute: function() {
      SW_CONTROL_PREFIX = '# sw.';
      (function(ParserState) {
        ParserState[ParserState["START"] = 0] = "START";
        ParserState[ParserState["GLOBAL"] = 1] = "GLOBAL";
        ParserState[ParserState["CACHE"] = 2] = "CACHE";
        ParserState[ParserState["NETWORK"] = 3] = "NETWORK";
        ParserState[ParserState["FALLBACK"] = 4] = "FALLBACK";
      })(ParserState || (ParserState = {}));
      ManifestGroup = (function() {
        function ManifestGroup() {
          this.cache = {};
          this.network = {};
          this.fallback = {};
        }
        return ManifestGroup;
      }());
      exports_1("ManifestGroup", ManifestGroup);
      Manifest = (function() {
        function Manifest() {
          this.metadata = {};
          this.group = {};
        }
        return Manifest;
      }());
      exports_1("Manifest", Manifest);
      ManifestDelta = (function() {
        function ManifestDelta(currentStr) {
          this.currentStr = currentStr;
          this.delta = {};
        }
        return ManifestDelta;
      }());
      exports_1("ManifestDelta", ManifestDelta);
      ManifestParser = (function() {
        function ManifestParser() {}
        ManifestParser.prototype._processComment = function(manifest, state, entryMetadata, groupMetadata, line) {
          var assign = line.split(': ', 2);
          if (assign.length !== 2) {
            throw "Invalid SW comment directive: '" + line + "', missing value. Expected format 'sw.key: value'";
          }
          var value = assign[1];
          switch (assign[0].toLowerCase()) {
            case 'dev':
              manifest.metadata['dev'] = value.toLowerCase() == 'true';
            case 'group':
              return {name: value};
            case 'group.version':
              groupMetadata['version'] = value;
              break;
            case 'group.timeout':
              groupMetadata['timeout'] = +value;
            case 'hash':
              entryMetadata['hash'] = value;
              break;
            case 'index':
              manifest.metadata['index'] = value;
              break;
            default:
              throw "Unrecognized SW comment directive: '" + assign[0] + "'";
          }
          return groupMetadata;
        };
        ManifestParser.prototype._parseFallbackEntry = function(entry) {
          var split = entry.url.split(' ', 2);
          if (split.length !== 2) {
            throw "Invalid FALLBACK entry: " + entry.url;
          }
          return {
            url: split[0],
            metadata: entry.metadata,
            fallbackTo: split[1],
            group: entry.group
          };
        };
        ManifestParser.prototype._throwIfDefinedMetadata = function(metadata) {
          if (Object.keys(metadata).length !== 0) {
            throw 'Orphan metadata!';
          }
        };
        ManifestParser.prototype._group = function(manifest, name, metadata) {
          if (!manifest.group.hasOwnProperty(name)) {
            var group = new ManifestGroup();
            group.name = name;
            group.metadata = metadata;
            manifest.group[name] = group;
          }
          return manifest.group[name];
        };
        ManifestParser.prototype.parse = function(manifest) {
          var _this = this;
          var parsed = new Manifest();
          if (manifest === undefined) {
            return parsed;
          }
          var state = ParserState.START;
          var entryMetadata = {};
          var groupMetadata = {};
          manifest.split('\n').map(function(line) {
            return line.trim();
          }).forEach(function(line) {
            if (state == ParserState.START && line != 'CACHE MANIFEST') {
              throw "Expected \"CACHE MANIFEST\" magic token, got '" + line + "'";
            }
            switch (line) {
              case 'CACHE MANIFEST':
                if (state != ParserState.START) {
                  throw 'Unexpected "CACHE MANIFEST" magic token';
                }
                state = ParserState.GLOBAL;
                break;
              case 'CACHE:':
                state = ParserState.CACHE;
                _this._throwIfDefinedMetadata(entryMetadata);
                entryMetadata = {};
                groupMetadata = {};
                break;
              case 'NETWORK:':
                state = ParserState.NETWORK;
                _this._throwIfDefinedMetadata(entryMetadata);
                entryMetadata = {};
                groupMetadata = {};
                break;
              case 'FALLBACK:':
                state = ParserState.FALLBACK;
                _this._throwIfDefinedMetadata(entryMetadata);
                entryMetadata = {};
                groupMetadata = {};
                break;
              case '':
                break;
              default:
                if (builtins_1.stringStartsWith(line, SW_CONTROL_PREFIX)) {
                  groupMetadata = _this._processComment(parsed, state, entryMetadata, groupMetadata, line.substring(SW_CONTROL_PREFIX.length).trim());
                } else if (builtins_1.stringStartsWith(line, '#')) {
                  break;
                } else {
                  var entry = {
                    url: line,
                    metadata: entryMetadata,
                    group: null
                  };
                  entryMetadata = {};
                  var groupName = groupMetadata.hasOwnProperty('name') ? groupMetadata['name'] : 'default';
                  var group = _this._group(parsed, groupName, groupMetadata);
                  entry.group = group;
                  switch (state) {
                    case ParserState.CACHE:
                    case ParserState.GLOBAL:
                      if (group.cache.hasOwnProperty(entry.url)) {
                        throw "Duplicate CACHE entry: " + entry.url;
                      }
                      group.cache[entry.url] = entry;
                      break;
                    case ParserState.NETWORK:
                      if (group.network.hasOwnProperty(entry.url)) {
                        throw "Duplicate NETWORK entry: " + entry.url;
                      }
                      group.network[entry.url] = entry;
                      break;
                    case ParserState.FALLBACK:
                      var fallbackEntry = _this._parseFallbackEntry(entry);
                      if (group.cache.hasOwnProperty(fallbackEntry.url)) {
                        throw "Duplicate FALLBACK entry: " + fallbackEntry.url;
                      }
                      group.fallback[fallbackEntry.url] = fallbackEntry;
                      break;
                  }
                }
                break;
            }
          });
          Object.keys(parsed.group).map(function(name) {
            return parsed.group[name];
          }).forEach(_computeAndSetVersion);
          parsed.group;
          return parsed;
        };
        ManifestParser = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], ManifestParser);
        return ManifestParser;
      }());
      exports_1("ManifestParser", ManifestParser);
    }
  };
});

$__System.register("5c", ["b", "5", "c"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Observable_1,
      manifest_1,
      operator_1;
  var EMPTY_GROUP,
      FetchFromCacheInstruction,
      FetchFromNetworkInstruction;
  function _keys() {
    var objs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      objs[_i - 0] = arguments[_i];
    }
    var keys = {};
    objs.forEach(function(obj) {
      return Object.keys(obj).forEach(function(key) {
        return keys[key] = true;
      });
    });
    return Object.keys(keys);
  }
  function _groupOrEmpty(manifest, name) {
    if (!manifest.group.hasOwnProperty(name)) {
      return EMPTY_GROUP;
    }
    return manifest.group[name];
  }
  function _diffArray(prev, curr) {
    return {
      added: curr.filter(function(value) {
        return prev.indexOf(value) == -1;
      }),
      removed: prev.filter(function(value) {
        return curr.indexOf(value) == -1;
      })
    };
  }
  function _diffGroups(prev, curr) {
    var cacheDiff = _diffArray(_keys(prev.cache), _keys(curr.cache));
    var networkDiff = _diffArray(_keys(prev.network), _keys(curr.network));
    var fallbackDiff = _diffArray(_keys(prev.fallback), _keys(curr.fallback));
    return {
      cacheAdded: cacheDiff.added,
      cacheRemoved: cacheDiff.removed,
      networkAdded: networkDiff.added,
      networkRemoved: networkDiff.removed,
      fallbackAdded: fallbackDiff.added,
      fallbackRemoved: fallbackDiff.removed
    };
  }
  function diffManifests(obs) {
    var parser = new manifest_1.ManifestParser();
    return obs.map(function(manifests) {
      var liveManifestData = manifests[0],
          cachedManifestData = manifests[1];
      var delta = new manifest_1.ManifestDelta(liveManifestData);
      var current = parser.parse(liveManifestData);
      delta.current = current;
      if (cachedManifestData && cachedManifestData == liveManifestData) {
        delta.changed = false;
        return delta;
      }
      delta.changed = true;
      var previous = parser.parse(cachedManifestData);
      delta.previous = previous;
      var groups = _keys(current.group, previous.group);
      groups.forEach(function(name) {
        var prevGroup = _groupOrEmpty(previous, name);
        var currGroup = _groupOrEmpty(current, name);
        delta.delta[name] = _diffGroups(prevGroup, currGroup);
      });
      return delta;
    });
  }
  exports_1("diffManifests", diffManifests);
  function cacheFor(group) {
    return group.name + ":" + group.version;
  }
  exports_1("cacheFor", cacheFor);
  function _presentAndEqual(prop, a, b) {
    return a.hasOwnProperty(prop) && b.hasOwnProperty(prop) && a[prop] == b[prop];
  }
  function _entryHasNotChanged(previous, current) {
    var sameHash = _presentAndEqual('hash', previous.metadata, current.metadata);
    var sameVersion = _presentAndEqual('version', previous.group.metadata, current.group.metadata);
    return sameHash || sameVersion;
  }
  function buildCaches(cache, fetch) {
    return (function(obs) {
      return obs.let(operator_1.doAsync(function(delta) {
        return Observable_1.Observable.from(Object.keys(delta.current.group)).map(function(key) {
          return delta.current.group[key];
        }).mergeMap(function(group) {
          var prevGroup = EMPTY_GROUP;
          if (delta.changed && delta.previous.group.hasOwnProperty(group.name)) {
            prevGroup = delta.previous.group[group.name];
          }
          return Observable_1.Observable.from(Object.keys(group.cache)).map(function(key) {
            return group.cache[key];
          }).mergeMap(function(entry) {
            var action = new FetchFromNetworkInstruction(entry.url, cacheFor(group));
            if (prevGroup.cache.hasOwnProperty(entry.url)) {
              var prevEntry = prevGroup.cache[entry.url];
              if (_entryHasNotChanged(prevEntry, entry)) {
                action = new FetchFromCacheInstruction(entry.url, cacheFor(prevGroup), cacheFor(group));
              }
            }
            return Observable_1.Observable.of(action);
          }).do(function(action) {
            return console.log('setup', action.describe());
          }).mergeMap(function(action) {
            return action.execute(cache, fetch);
          });
        });
      }));
    });
  }
  exports_1("buildCaches", buildCaches);
  function cleanupCaches(cache) {
    return (function(obs) {
      return obs.let(operator_1.doAsync(function(delta) {
        return !!delta.previous ? Observable_1.Observable.from(Object.keys(delta.previous.group)).mergeMap(function(name) {
          var prevCache = cacheFor(delta.previous.group[name]);
          var currCache = '';
          if (delta.current.group.hasOwnProperty(name)) {
            currCache = cacheFor(delta.current.group[name]);
          }
          if (currCache != prevCache) {
            return cache.remove(prevCache);
          }
          return Observable_1.Observable.empty();
        }).ignoreElements() : Observable_1.Observable.empty();
      }));
    });
  }
  exports_1("cleanupCaches", cleanupCaches);
  return {
    setters: [function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(manifest_1_1) {
      manifest_1 = manifest_1_1;
    }, function(operator_1_1) {
      operator_1 = operator_1_1;
    }],
    execute: function() {
      EMPTY_GROUP = new manifest_1.ManifestGroup();
      FetchFromCacheInstruction = (function() {
        function FetchFromCacheInstruction(url, fromCache, toCache) {
          this.url = url;
          this.fromCache = fromCache;
          this.toCache = toCache;
        }
        FetchFromCacheInstruction.prototype.execute = function(cache, fetch) {
          var _this = this;
          return cache.load(this.fromCache, this.url).flatMap(function(resp) {
            return cache.store(_this.toCache, _this.url, resp);
          });
        };
        FetchFromCacheInstruction.prototype.describe = function() {
          return "fetchFromCache(" + this.url + ", " + this.fromCache + ", " + this.toCache + ")";
        };
        return FetchFromCacheInstruction;
      }());
      FetchFromNetworkInstruction = (function() {
        function FetchFromNetworkInstruction(url, toCache) {
          this.url = url;
          this.toCache = toCache;
        }
        FetchFromNetworkInstruction.prototype.execute = function(cache, fetch) {
          var _this = this;
          return fetch.refresh(this.url).flatMap(function(resp) {
            return cache.store(_this.toCache, _this.url, resp);
          });
        };
        FetchFromNetworkInstruction.prototype.describe = function() {
          return "fetchFromNetwork(" + this.url + ", " + this.toCache + ")";
        };
        return FetchFromNetworkInstruction;
      }());
      ;
    }
  };
});

$__System.register("c", ["b"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var Observable_1;
  function extractBody(obs) {
    return obs.flatMap(function(resp) {
      return resp != undefined ? resp.text() : Observable_1.Observable.of(undefined);
    });
  }
  exports_1("extractBody", extractBody);
  function doAsync(fn) {
    return function(obs) {
      return obs.concatMap(function(value) {
        return fn(value).reduce(function() {
          return value;
        }, value);
      });
    };
  }
  exports_1("doAsync", doAsync);
  function concatLet() {
    var operators = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      operators[_i - 0] = arguments[_i];
    }
    return function(obs) {
      return obs.concatMap(function(value) {
        return operators.map(function(op) {
          return Observable_1.Observable.of(value).let(op);
        });
      }).concatMap(function(v) {
        return v;
      });
    };
  }
  exports_1("concatLet", concatLet);
  function timeoutTo(timeout, value) {
    return function(obs) {
      return Observable_1.Observable.merge(obs, Observable_1.Observable.timer(timeout, 1).map(function(_) {
        return value;
      })).first();
    };
  }
  exports_1("timeoutTo", timeoutTo);
  return {
    setters: [function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }],
    execute: function() {}
  };
});

$__System.register("6", ["a", "b", "4", "5", "7", "8", "5c", "c"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      Observable_1,
      context_2,
      manifest_1,
      fetch_1,
      cache_1,
      setup_1,
      operator_1;
  var MANIFEST_URL,
      CACHE_ACTIVE,
      CACHE_INSTALLING,
      ManifestSource,
      FetchFromCacheInstruction,
      FetchFromNetworkInstruction,
      FallbackInstruction,
      IndexInstruction,
      ServiceWorker;
  function _cacheInstruction(request, group) {
    return new FetchFromCacheInstruction(setup_1.cacheFor(group), request);
  }
  function _devMode(request, manifest) {
    if (!manifest.metadata.hasOwnProperty('dev') || !manifest.metadata['dev']) {
      return Observable_1.Observable.empty();
    }
    return Observable_1.Observable.of(new FetchFromNetworkInstruction(request));
  }
  function _handleRequest(request, options) {
    return function(obs) {
      return obs.flatMap(function(manifest) {
        var groups = Observable_1.Observable.from(Object.keys(manifest.group)).map(function(key) {
          return manifest.group[key];
        }).cache();
        return Observable_1.Observable.concat(_devMode(request, manifest), Observable_1.Observable.of(new IndexInstruction(request, manifest)), groups.map(function(group) {
          return new FallbackInstruction(request, group);
        }), groups.map(function(group) {
          return _cacheInstruction(request, group);
        }), groups.map(function(group) {
          return new FetchFromNetworkInstruction(request, undefined, options['timeout']);
        }));
      });
    };
  }
  return {
    setters: [function(core_1_1) {
      core_1 = core_1_1;
    }, function(Observable_1_1) {
      Observable_1 = Observable_1_1;
    }, function(context_2_1) {
      context_2 = context_2_1;
    }, function(manifest_1_1) {
      manifest_1 = manifest_1_1;
    }, function(fetch_1_1) {
      fetch_1 = fetch_1_1;
    }, function(cache_1_1) {
      cache_1 = cache_1_1;
    }, function(setup_1_1) {
      setup_1 = setup_1_1;
    }, function(operator_1_1) {
      operator_1 = operator_1_1;
    }],
    execute: function() {
      exports_1("MANIFEST_URL", MANIFEST_URL = '/manifest.appcache');
      exports_1("CACHE_ACTIVE", CACHE_ACTIVE = 'ngsw.active');
      exports_1("CACHE_INSTALLING", CACHE_INSTALLING = 'ngsw.installing');
      (function(ManifestSource) {
        ManifestSource[ManifestSource["NETWORK"] = 0] = "NETWORK";
        ManifestSource[ManifestSource["INSTALLING"] = 1] = "INSTALLING";
        ManifestSource[ManifestSource["ACTIVE"] = 2] = "ACTIVE";
      })(ManifestSource || (ManifestSource = {}));
      FetchFromCacheInstruction = (function() {
        function FetchFromCacheInstruction(cache, request) {
          this.cache = cache;
          this.request = request;
        }
        FetchFromCacheInstruction.prototype.execute = function(sw) {
          return sw.cache.load(this.cache, this.request);
        };
        FetchFromCacheInstruction.prototype.describe = function() {
          return "fetchFromCache(" + this.cache + ", " + this.request.url + ")";
        };
        return FetchFromCacheInstruction;
      }());
      exports_1("FetchFromCacheInstruction", FetchFromCacheInstruction);
      FetchFromNetworkInstruction = (function() {
        function FetchFromNetworkInstruction(request, useHttpCache, timeout) {
          if (useHttpCache === void 0) {
            useHttpCache = true;
          }
          if (timeout === void 0) {
            timeout = null;
          }
          this.request = request;
          this.useHttpCache = useHttpCache;
          this.timeout = timeout;
        }
        FetchFromNetworkInstruction.prototype.execute = function(sw) {
          var result = sw.fetch.request(this.request);
          if (!this.useHttpCache) {
            result = sw.fetch.refresh(this.request);
          }
          if (this.timeout !== null) {
            result = Observable_1.Observable.merge(result, Observable_1.Observable.timer(this.timeout, 1).map(function(v) {
              return undefined;
            })).first();
          }
          return result;
        };
        FetchFromNetworkInstruction.prototype.describe = function() {
          return "fetchFromNetwork(" + this.request.url + ")";
        };
        return FetchFromNetworkInstruction;
      }());
      exports_1("FetchFromNetworkInstruction", FetchFromNetworkInstruction);
      FallbackInstruction = (function() {
        function FallbackInstruction(request, group) {
          this.request = request;
          this.group = group;
        }
        FallbackInstruction.prototype.execute = function(sw) {
          var _this = this;
          return Observable_1.Observable.from(Object.keys(this.group.fallback)).filter(function(url) {
            return _this.request.url.indexOf(url) === 0;
          }).map(function(url) {
            return _this.group.fallback[url];
          }).filter(function(entry) {
            if (entry.fallbackTo === _this.request.url) {
              console.error("ngsw: fallback loop! " + _this.request.url);
              return false;
            }
            return true;
          }).map(function(entry) {
            return sw.adapter.newRequest(_this.request, {url: entry.fallbackTo});
          }).concatMap(function(req) {
            return sw.handleFetch(req, {});
          });
        };
        FallbackInstruction.prototype.describe = function() {
          return "fallback(" + this.request.url + ")";
        };
        return FallbackInstruction;
      }());
      exports_1("FallbackInstruction", FallbackInstruction);
      IndexInstruction = (function() {
        function IndexInstruction(request, manifest) {
          this.request = request;
          this.manifest = manifest;
        }
        IndexInstruction.prototype.execute = function(sw) {
          if (this.request.url !== '/' || !this.manifest.metadata.hasOwnProperty('index')) {
            return Observable_1.Observable.empty();
          }
          return sw.handleFetch(sw.adapter.newRequest(this.request, {url: this.manifest.metadata['index']}), {});
        };
        IndexInstruction.prototype.describe = function() {
          return "index(" + this.request.url + ", " + this.manifest.metadata['index'] + ")";
        };
        return IndexInstruction;
      }());
      exports_1("IndexInstruction", IndexInstruction);
      ServiceWorker = (function() {
        function ServiceWorker(events, fetch, cache, adapter) {
          var _this = this;
          this.events = events;
          this.fetch = fetch;
          this.cache = cache;
          this.adapter = adapter;
          this._manifest = null;
          this.manifestReq = adapter.newRequest(MANIFEST_URL);
          events.install.subscribe(function(ev) {
            console.log('ngsw: Event - install');
            var init = _this.checkDiffs(ManifestSource.NETWORK).let(setup_1.buildCaches(cache, fetch)).let(operator_1.doAsync(function(delta) {
              return cache.store(CACHE_INSTALLING, MANIFEST_URL, adapter.newResponse(delta.currentStr));
            })).map(function(delta) {
              return delta.current;
            }).do(function(manifest) {
              return _this._manifest = manifest;
            }).do(function() {
              return console.log('ngsw: Event - install complete');
            });
            ev.waitUntil(init.toPromise());
          });
          events.activate.subscribe(function(ev) {
            console.log('ngsw: Event - activate');
            var init = _this.checkDiffs(ManifestSource.INSTALLING).let(setup_1.cleanupCaches(cache)).let(operator_1.doAsync(function(delta) {
              return cache.store(CACHE_ACTIVE, MANIFEST_URL, adapter.newResponse(delta.currentStr));
            })).map(function(delta) {
              return delta.current;
            }).do(function(manifest) {
              return _this._manifest = manifest;
            });
            ev.waitUntil(init.toPromise());
          });
          events.fetch.subscribe(function(ev) {
            var request = ev.request;
            ev.respondWith(_this.handleFetch(request, {}).toPromise());
          });
        }
        Object.defineProperty(ServiceWorker.prototype, "init", {
          get: function() {
            if (this._manifest != null) {
              return Observable_1.Observable.of(this._manifest);
            }
            return this.normalInit();
          },
          enumerable: true,
          configurable: true
        });
        ServiceWorker.prototype.handleFetch = function(request, options) {
          var _this = this;
          return this.init.let(_handleRequest(request, options)).do(function(instruction) {
            return console.log("ngsw: executing " + instruction.describe());
          }).concatMap(function(instruction) {
            return instruction.execute(_this);
          }).filter(function(resp) {
            return resp !== undefined;
          }).first();
        };
        ServiceWorker.prototype.normalInit = function() {
          var _this = this;
          return this.loadFreshManifest(ManifestSource.ACTIVE).do(function(data) {
            if (!data) {
              throw 'Unable to load manifest!';
            }
          }).map(function(data) {
            return (new manifest_1.ManifestParser()).parse(data);
          }).do(function(manifest) {
            return _this._manifest = manifest;
          });
        };
        ServiceWorker.prototype.checkDiffs = function(source) {
          return Observable_1.Observable.combineLatest(this.loadFreshManifest(source), this.loadCachedManifest()).let(setup_1.diffManifests);
        };
        ServiceWorker.prototype.loadFreshManifest = function(source) {
          var respSource;
          switch (source) {
            case ManifestSource.NETWORK:
              respSource = this.fetch.refresh(this.manifestReq);
              break;
            case ManifestSource.INSTALLING:
              respSource = this.cache.load(CACHE_INSTALLING, MANIFEST_URL);
              break;
            case ManifestSource.ACTIVE:
              respSource = this.cache.load(CACHE_ACTIVE, MANIFEST_URL);
              break;
            default:
              throw "Unknown diff source: " + source;
          }
          return respSource.do(function(resp) {
            if (resp && !resp.ok) {
              throw 'Failed to load fresh manifest.';
            }
          }).let(operator_1.extractBody);
        };
        ServiceWorker.prototype.loadCachedManifest = function() {
          return this.cache.load(CACHE_ACTIVE, MANIFEST_URL).let(operator_1.extractBody);
        };
        ServiceWorker.prototype.bodyFn = function(obs) {
          return obs.flatMap(function(resp) {
            return resp != undefined ? resp.text() : Observable_1.Observable.from(undefined);
          });
        };
        ServiceWorker = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [context_2.Events, fetch_1.Fetch, cache_1.CacheManager, context_2.WorkerAdapter])], ServiceWorker);
        return ServiceWorker;
      }());
      exports_1("ServiceWorker", ServiceWorker);
    }
  };
});

$__System.registerDynamic("5d", ["5e", "5f", "60", "61", "62"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ArrayObservable_1 = $__require('5e');
  var isArray_1 = $__require('5f');
  var isScheduler_1 = $__require('60');
  var OuterSubscriber_1 = $__require('61');
  var subscribeToResult_1 = $__require('62');
  function combineLatest() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = null;
    if (typeof observables[observables.length - 1] === 'function') {
      project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    observables.unshift(this);
    return new ArrayObservable_1.ArrayObservable(observables).lift(new CombineLatestOperator(project));
  }
  exports.combineLatest = combineLatest;
  function combineLatestStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var project = null;
    var scheduler = null;
    if (isScheduler_1.isScheduler(observables[observables.length - 1])) {
      scheduler = observables.pop();
    }
    if (typeof observables[observables.length - 1] === 'function') {
      project = observables.pop();
    }
    if (observables.length === 1 && isArray_1.isArray(observables[0])) {
      observables = observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new CombineLatestOperator(project));
  }
  exports.combineLatestStatic = combineLatestStatic;
  var CombineLatestOperator = (function() {
    function CombineLatestOperator(project) {
      this.project = project;
    }
    CombineLatestOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new CombineLatestSubscriber(subscriber, this.project));
    };
    return CombineLatestOperator;
  }());
  exports.CombineLatestOperator = CombineLatestOperator;
  var CombineLatestSubscriber = (function(_super) {
    __extends(CombineLatestSubscriber, _super);
    function CombineLatestSubscriber(destination, project) {
      _super.call(this, destination);
      this.project = project;
      this.active = 0;
      this.values = [];
      this.observables = [];
      this.toRespond = [];
    }
    CombineLatestSubscriber.prototype._next = function(observable) {
      var toRespond = this.toRespond;
      toRespond.push(toRespond.length);
      this.observables.push(observable);
    };
    CombineLatestSubscriber.prototype._complete = function() {
      var observables = this.observables;
      var len = observables.length;
      if (len === 0) {
        this.destination.complete();
      } else {
        this.active = len;
        for (var i = 0; i < len; i++) {
          var observable = observables[i];
          this.add(subscribeToResult_1.subscribeToResult(this, observable, observable, i));
        }
      }
    };
    CombineLatestSubscriber.prototype.notifyComplete = function(unused) {
      if ((this.active -= 1) === 0) {
        this.destination.complete();
      }
    };
    CombineLatestSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      var values = this.values;
      values[outerIndex] = innerValue;
      var toRespond = this.toRespond;
      if (toRespond.length > 0) {
        var found = toRespond.indexOf(outerIndex);
        if (found !== -1) {
          toRespond.splice(found, 1);
        }
      }
      if (toRespond.length === 0) {
        if (this.project) {
          this._tryProject(values);
        } else {
          this.destination.next(values);
        }
      }
    };
    CombineLatestSubscriber.prototype._tryProject = function(values) {
      var result;
      try {
        result = this.project.apply(this, values);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return CombineLatestSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.CombineLatestSubscriber = CombineLatestSubscriber;
  return module.exports;
});

$__System.registerDynamic("63", ["b", "5d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var combineLatest_1 = $__require('5d');
  Observable_1.Observable.combineLatest = combineLatest_1.combineLatestStatic;
  return module.exports;
});

$__System.registerDynamic("64", ["60", "5e", "65"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isScheduler_1 = $__require('60');
  var ArrayObservable_1 = $__require('5e');
  var mergeAll_1 = $__require('65');
  function concat() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    return concatStatic.apply(void 0, [this].concat(observables));
  }
  exports.concat = concat;
  function concatStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var scheduler = null;
    var args = observables;
    if (isScheduler_1.isScheduler(args[observables.length - 1])) {
      scheduler = args.pop();
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(1));
  }
  exports.concatStatic = concatStatic;
  return module.exports;
});

$__System.registerDynamic("66", ["64"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var concat_1 = $__require('64');
  exports.concat = concat_1.concatStatic;
  return module.exports;
});

$__System.registerDynamic("67", ["b", "66"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var concat_1 = $__require('66');
  Observable_1.Observable.concat = concat_1.concat;
  return module.exports;
});

$__System.registerDynamic("68", ["b", "62", "61"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var subscribeToResult_1 = $__require('62');
  var OuterSubscriber_1 = $__require('61');
  var DeferObservable = (function(_super) {
    __extends(DeferObservable, _super);
    function DeferObservable(observableFactory) {
      _super.call(this);
      this.observableFactory = observableFactory;
    }
    DeferObservable.create = function(observableFactory) {
      return new DeferObservable(observableFactory);
    };
    DeferObservable.prototype._subscribe = function(subscriber) {
      return new DeferSubscriber(subscriber, this.observableFactory);
    };
    return DeferObservable;
  }(Observable_1.Observable));
  exports.DeferObservable = DeferObservable;
  var DeferSubscriber = (function(_super) {
    __extends(DeferSubscriber, _super);
    function DeferSubscriber(destination, factory) {
      _super.call(this, destination);
      this.factory = factory;
      this.tryDefer();
    }
    DeferSubscriber.prototype.tryDefer = function() {
      try {
        this._callFactory();
      } catch (err) {
        this._error(err);
      }
    };
    DeferSubscriber.prototype._callFactory = function() {
      var result = this.factory();
      if (result) {
        this.add(subscribeToResult_1.subscribeToResult(this, result));
      }
    };
    return DeferSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  return module.exports;
});

$__System.registerDynamic("69", ["68"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var DeferObservable_1 = $__require('68');
  exports.defer = DeferObservable_1.DeferObservable.create;
  return module.exports;
});

$__System.registerDynamic("6a", ["b", "69"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var defer_1 = $__require('69');
  Observable_1.Observable.defer = defer_1.defer;
  return module.exports;
});

$__System.registerDynamic("6b", ["6c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var EmptyObservable_1 = $__require('6c');
  exports.empty = EmptyObservable_1.EmptyObservable.create;
  return module.exports;
});

$__System.registerDynamic("6d", ["b", "6b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var empty_1 = $__require('6b');
  Observable_1.Observable.empty = empty_1.empty;
  return module.exports;
});

$__System.registerDynamic("6e", ["6f", "70", "71", "b", "72", "73", "74"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('6f');
  var isObject_1 = $__require('70');
  var tryCatch_1 = $__require('71');
  var Observable_1 = $__require('b');
  var isFunction_1 = $__require('72');
  var iterator_1 = $__require('73');
  var errorObject_1 = $__require('74');
  var IteratorObservable = (function(_super) {
    __extends(IteratorObservable, _super);
    function IteratorObservable(iterator, project, thisArg, scheduler) {
      _super.call(this);
      if (iterator == null) {
        throw new Error('iterator cannot be null.');
      }
      if (isObject_1.isObject(project)) {
        this.thisArg = project;
        this.scheduler = thisArg;
      } else if (isFunction_1.isFunction(project)) {
        this.project = project;
        this.thisArg = thisArg;
        this.scheduler = scheduler;
      } else if (project != null) {
        throw new Error('When provided, `project` must be a function.');
      }
      this.iterator = getIterator(iterator);
    }
    IteratorObservable.create = function(iterator, project, thisArg, scheduler) {
      return new IteratorObservable(iterator, project, thisArg, scheduler);
    };
    IteratorObservable.dispatch = function(state) {
      var index = state.index,
          hasError = state.hasError,
          thisArg = state.thisArg,
          project = state.project,
          iterator = state.iterator,
          subscriber = state.subscriber;
      if (hasError) {
        subscriber.error(state.error);
        return;
      }
      var result = iterator.next();
      if (result.done) {
        subscriber.complete();
        return;
      }
      if (project) {
        result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index);
        if (result === errorObject_1.errorObject) {
          state.error = errorObject_1.errorObject.e;
          state.hasError = true;
        } else {
          subscriber.next(result);
          state.index = index + 1;
        }
      } else {
        subscriber.next(result.value);
        state.index = index + 1;
      }
      if (subscriber.isUnsubscribed) {
        return;
      }
      this.schedule(state);
    };
    IteratorObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          iterator = _a.iterator,
          project = _a.project,
          thisArg = _a.thisArg,
          scheduler = _a.scheduler;
      if (scheduler) {
        return scheduler.schedule(IteratorObservable.dispatch, 0, {
          index: index,
          thisArg: thisArg,
          project: project,
          iterator: iterator,
          subscriber: subscriber
        });
      } else {
        do {
          var result = iterator.next();
          if (result.done) {
            subscriber.complete();
            break;
          } else if (project) {
            result = tryCatch_1.tryCatch(project).call(thisArg, result.value, index++);
            if (result === errorObject_1.errorObject) {
              subscriber.error(errorObject_1.errorObject.e);
              break;
            }
            subscriber.next(result);
          } else {
            subscriber.next(result.value);
          }
          if (subscriber.isUnsubscribed) {
            break;
          }
        } while (true);
      }
    };
    return IteratorObservable;
  }(Observable_1.Observable));
  exports.IteratorObservable = IteratorObservable;
  var StringIterator = (function() {
    function StringIterator(str, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = str.length;
      }
      this.str = str;
      this.idx = idx;
      this.len = len;
    }
    StringIterator.prototype[iterator_1.$$iterator] = function() {
      return (this);
    };
    StringIterator.prototype.next = function() {
      return this.idx < this.len ? {
        done: false,
        value: this.str.charAt(this.idx++)
      } : {
        done: true,
        value: undefined
      };
    };
    return StringIterator;
  }());
  var ArrayIterator = (function() {
    function ArrayIterator(arr, idx, len) {
      if (idx === void 0) {
        idx = 0;
      }
      if (len === void 0) {
        len = toLength(arr);
      }
      this.arr = arr;
      this.idx = idx;
      this.len = len;
    }
    ArrayIterator.prototype[iterator_1.$$iterator] = function() {
      return this;
    };
    ArrayIterator.prototype.next = function() {
      return this.idx < this.len ? {
        done: false,
        value: this.arr[this.idx++]
      } : {
        done: true,
        value: undefined
      };
    };
    return ArrayIterator;
  }());
  function getIterator(obj) {
    var i = obj[iterator_1.$$iterator];
    if (!i && typeof obj === 'string') {
      return new StringIterator(obj);
    }
    if (!i && obj.length !== undefined) {
      return new ArrayIterator(obj);
    }
    if (!i) {
      throw new TypeError('Object is not iterable');
    }
    return obj[iterator_1.$$iterator]();
  }
  var maxSafeInteger = Math.pow(2, 53) - 1;
  function toLength(o) {
    var len = +o.length;
    if (isNaN(len)) {
      return 0;
    }
    if (len === 0 || !numberIsFinite(len)) {
      return len;
    }
    len = sign(len) * Math.floor(Math.abs(len));
    if (len <= 0) {
      return 0;
    }
    if (len > maxSafeInteger) {
      return maxSafeInteger;
    }
    return len;
  }
  function numberIsFinite(value) {
    return typeof value === 'number' && root_1.root.isFinite(value);
  }
  function sign(value) {
    var valueAsNumber = +value;
    if (valueAsNumber === 0) {
      return valueAsNumber;
    }
    if (isNaN(valueAsNumber)) {
      return valueAsNumber;
    }
    return valueAsNumber < 0 ? -1 : 1;
  }
  return module.exports;
});

$__System.registerDynamic("75", ["b", "76", "6c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var ScalarObservable_1 = $__require('76');
  var EmptyObservable_1 = $__require('6c');
  var ArrayLikeObservable = (function(_super) {
    __extends(ArrayLikeObservable, _super);
    function ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler) {
      _super.call(this);
      this.arrayLike = arrayLike;
      this.scheduler = scheduler;
      if (!mapFn && !scheduler && arrayLike.length === 1) {
        this._isScalar = true;
        this.value = arrayLike[0];
      }
      if (mapFn) {
        this.mapFn = mapFn.bind(thisArg);
      }
    }
    ArrayLikeObservable.create = function(arrayLike, mapFn, thisArg, scheduler) {
      var length = arrayLike.length;
      if (length === 0) {
        return new EmptyObservable_1.EmptyObservable();
      } else if (length === 1 && !mapFn) {
        return new ScalarObservable_1.ScalarObservable(arrayLike[0], scheduler);
      } else {
        return new ArrayLikeObservable(arrayLike, mapFn, thisArg, scheduler);
      }
    };
    ArrayLikeObservable.dispatch = function(state) {
      var arrayLike = state.arrayLike,
          index = state.index,
          length = state.length,
          mapFn = state.mapFn,
          subscriber = state.subscriber;
      if (subscriber.isUnsubscribed) {
        return;
      }
      if (index >= length) {
        subscriber.complete();
        return;
      }
      var result = mapFn ? mapFn(arrayLike[index], index) : arrayLike[index];
      subscriber.next(result);
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayLikeObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          arrayLike = _a.arrayLike,
          mapFn = _a.mapFn,
          scheduler = _a.scheduler;
      var length = arrayLike.length;
      if (scheduler) {
        return scheduler.schedule(ArrayLikeObservable.dispatch, 0, {
          arrayLike: arrayLike,
          index: index,
          length: length,
          mapFn: mapFn,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < length && !subscriber.isUnsubscribed; i++) {
          var result = mapFn ? mapFn(arrayLike[i], i) : arrayLike[i];
          subscriber.next(result);
        }
        subscriber.complete();
      }
    };
    return ArrayLikeObservable;
  }(Observable_1.Observable));
  exports.ArrayLikeObservable = ArrayLikeObservable;
  return module.exports;
});

$__System.registerDynamic("77", ["5f", "72", "78", "60", "3c", "6e", "5e", "75", "79", "73", "b", "7a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isArray_1 = $__require('5f');
  var isFunction_1 = $__require('72');
  var isPromise_1 = $__require('78');
  var isScheduler_1 = $__require('60');
  var PromiseObservable_1 = $__require('3c');
  var IteratorObservable_1 = $__require('6e');
  var ArrayObservable_1 = $__require('5e');
  var ArrayLikeObservable_1 = $__require('75');
  var observable_1 = $__require('79');
  var iterator_1 = $__require('73');
  var Observable_1 = $__require('b');
  var observeOn_1 = $__require('7a');
  var isArrayLike = (function(x) {
    return x && typeof x.length === 'number';
  });
  var FromObservable = (function(_super) {
    __extends(FromObservable, _super);
    function FromObservable(ish, scheduler) {
      _super.call(this, null);
      this.ish = ish;
      this.scheduler = scheduler;
    }
    FromObservable.create = function(ish, mapFnOrScheduler, thisArg, lastScheduler) {
      var scheduler = null;
      var mapFn = null;
      if (isFunction_1.isFunction(mapFnOrScheduler)) {
        scheduler = lastScheduler || null;
        mapFn = mapFnOrScheduler;
      } else if (isScheduler_1.isScheduler(scheduler)) {
        scheduler = mapFnOrScheduler;
      }
      if (ish != null) {
        if (typeof ish[observable_1.$$observable] === 'function') {
          if (ish instanceof Observable_1.Observable && !scheduler) {
            return ish;
          }
          return new FromObservable(ish, scheduler);
        } else if (isArray_1.isArray(ish)) {
          return new ArrayObservable_1.ArrayObservable(ish, scheduler);
        } else if (isPromise_1.isPromise(ish)) {
          return new PromiseObservable_1.PromiseObservable(ish, scheduler);
        } else if (typeof ish[iterator_1.$$iterator] === 'function' || typeof ish === 'string') {
          return new IteratorObservable_1.IteratorObservable(ish, null, null, scheduler);
        } else if (isArrayLike(ish)) {
          return new ArrayLikeObservable_1.ArrayLikeObservable(ish, mapFn, thisArg, scheduler);
        }
      }
      throw new TypeError((ish !== null && typeof ish || ish) + ' is not observable');
    };
    FromObservable.prototype._subscribe = function(subscriber) {
      var ish = this.ish;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        return ish[observable_1.$$observable]().subscribe(subscriber);
      } else {
        return ish[observable_1.$$observable]().subscribe(new observeOn_1.ObserveOnSubscriber(subscriber, scheduler, 0));
      }
    };
    return FromObservable;
  }(Observable_1.Observable));
  exports.FromObservable = FromObservable;
  return module.exports;
});

$__System.registerDynamic("7b", ["77"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FromObservable_1 = $__require('77');
  exports.from = FromObservable_1.FromObservable.create;
  return module.exports;
});

$__System.registerDynamic("7c", ["b", "7b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var from_1 = $__require('7b');
  Observable_1.Observable.from = from_1.from;
  return module.exports;
});

$__System.registerDynamic("7d", ["b", "71", "74", "7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var tryCatch_1 = $__require('71');
  var errorObject_1 = $__require('74');
  var Subscription_1 = $__require('7e');
  function isNodeStyleEventEmmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
  }
  function isJQueryStyleEventEmitter(sourceObj) {
    return !!sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
  }
  function isNodeList(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object NodeList]';
  }
  function isHTMLCollection(sourceObj) {
    return !!sourceObj && sourceObj.toString() === '[object HTMLCollection]';
  }
  function isEventTarget(sourceObj) {
    return !!sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
  }
  var FromEventObservable = (function(_super) {
    __extends(FromEventObservable, _super);
    function FromEventObservable(sourceObj, eventName, selector) {
      _super.call(this);
      this.sourceObj = sourceObj;
      this.eventName = eventName;
      this.selector = selector;
    }
    FromEventObservable.create = function(sourceObj, eventName, selector) {
      return new FromEventObservable(sourceObj, eventName, selector);
    };
    FromEventObservable.setupSubscription = function(sourceObj, eventName, handler, subscriber) {
      var unsubscribe;
      if (isNodeList(sourceObj) || isHTMLCollection(sourceObj)) {
        for (var i = 0,
            len = sourceObj.length; i < len; i++) {
          FromEventObservable.setupSubscription(sourceObj[i], eventName, handler, subscriber);
        }
      } else if (isEventTarget(sourceObj)) {
        sourceObj.addEventListener(eventName, handler);
        unsubscribe = function() {
          return sourceObj.removeEventListener(eventName, handler);
        };
      } else if (isJQueryStyleEventEmitter(sourceObj)) {
        sourceObj.on(eventName, handler);
        unsubscribe = function() {
          return sourceObj.off(eventName, handler);
        };
      } else if (isNodeStyleEventEmmitter(sourceObj)) {
        sourceObj.addListener(eventName, handler);
        unsubscribe = function() {
          return sourceObj.removeListener(eventName, handler);
        };
      }
      subscriber.add(new Subscription_1.Subscription(unsubscribe));
    };
    FromEventObservable.prototype._subscribe = function(subscriber) {
      var sourceObj = this.sourceObj;
      var eventName = this.eventName;
      var selector = this.selector;
      var handler = selector ? function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i - 0] = arguments[_i];
        }
        var result = tryCatch_1.tryCatch(selector).apply(void 0, args);
        if (result === errorObject_1.errorObject) {
          subscriber.error(errorObject_1.errorObject.e);
        } else {
          subscriber.next(result);
        }
      } : function(e) {
        return subscriber.next(e);
      };
      FromEventObservable.setupSubscription(sourceObj, eventName, handler, subscriber);
    };
    return FromEventObservable;
  }(Observable_1.Observable));
  exports.FromEventObservable = FromEventObservable;
  return module.exports;
});

$__System.registerDynamic("7f", ["7d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var FromEventObservable_1 = $__require('7d');
  exports.fromEvent = FromEventObservable_1.FromEventObservable.create;
  return module.exports;
});

$__System.registerDynamic("80", ["b", "7f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var fromEvent_1 = $__require('7f');
  Observable_1.Observable.fromEvent = fromEvent_1.fromEvent;
  return module.exports;
});

$__System.registerDynamic("3c", ["6f", "b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('6f');
  var Observable_1 = $__require('b');
  var PromiseObservable = (function(_super) {
    __extends(PromiseObservable, _super);
    function PromiseObservable(promise, scheduler) {
      if (scheduler === void 0) {
        scheduler = null;
      }
      _super.call(this);
      this.promise = promise;
      this.scheduler = scheduler;
    }
    PromiseObservable.create = function(promise, scheduler) {
      if (scheduler === void 0) {
        scheduler = null;
      }
      return new PromiseObservable(promise, scheduler);
    };
    PromiseObservable.prototype._subscribe = function(subscriber) {
      var _this = this;
      var promise = this.promise;
      var scheduler = this.scheduler;
      if (scheduler == null) {
        if (this._isScalar) {
          if (!subscriber.isUnsubscribed) {
            subscriber.next(this.value);
            subscriber.complete();
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.isUnsubscribed) {
              subscriber.next(value);
              subscriber.complete();
            }
          }, function(err) {
            if (!subscriber.isUnsubscribed) {
              subscriber.error(err);
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      } else {
        if (this._isScalar) {
          if (!subscriber.isUnsubscribed) {
            return scheduler.schedule(dispatchNext, 0, {
              value: this.value,
              subscriber: subscriber
            });
          }
        } else {
          promise.then(function(value) {
            _this.value = value;
            _this._isScalar = true;
            if (!subscriber.isUnsubscribed) {
              subscriber.add(scheduler.schedule(dispatchNext, 0, {
                value: value,
                subscriber: subscriber
              }));
            }
          }, function(err) {
            if (!subscriber.isUnsubscribed) {
              subscriber.add(scheduler.schedule(dispatchError, 0, {
                err: err,
                subscriber: subscriber
              }));
            }
          }).then(null, function(err) {
            root_1.root.setTimeout(function() {
              throw err;
            });
          });
        }
      }
    };
    return PromiseObservable;
  }(Observable_1.Observable));
  exports.PromiseObservable = PromiseObservable;
  function dispatchNext(arg) {
    var value = arg.value,
        subscriber = arg.subscriber;
    if (!subscriber.isUnsubscribed) {
      subscriber.next(value);
      subscriber.complete();
    }
  }
  function dispatchError(arg) {
    var err = arg.err,
        subscriber = arg.subscriber;
    if (!subscriber.isUnsubscribed) {
      subscriber.error(err);
    }
  }
  return module.exports;
});

$__System.registerDynamic("81", ["3c"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var PromiseObservable_1 = $__require('3c');
  exports.fromPromise = PromiseObservable_1.PromiseObservable.create;
  return module.exports;
});

$__System.registerDynamic("82", ["b", "81"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var fromPromise_1 = $__require('81');
  Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
  return module.exports;
});

$__System.registerDynamic("65", ["61", "62"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var OuterSubscriber_1 = $__require('61');
  var subscribeToResult_1 = $__require('62');
  function mergeAll(concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    return this.lift(new MergeAllOperator(concurrent));
  }
  exports.mergeAll = mergeAll;
  var MergeAllOperator = (function() {
    function MergeAllOperator(concurrent) {
      this.concurrent = concurrent;
    }
    MergeAllOperator.prototype.call = function(observer, source) {
      return source._subscribe(new MergeAllSubscriber(observer, this.concurrent));
    };
    return MergeAllOperator;
  }());
  exports.MergeAllOperator = MergeAllOperator;
  var MergeAllSubscriber = (function(_super) {
    __extends(MergeAllSubscriber, _super);
    function MergeAllSubscriber(destination, concurrent) {
      _super.call(this, destination);
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
    }
    MergeAllSubscriber.prototype._next = function(observable) {
      if (this.active < this.concurrent) {
        this.active++;
        this.add(subscribeToResult_1.subscribeToResult(this, observable));
      } else {
        this.buffer.push(observable);
      }
    };
    MergeAllSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeAllSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeAllSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeAllSubscriber = MergeAllSubscriber;
  return module.exports;
});

$__System.registerDynamic("83", ["5e", "65", "60"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ArrayObservable_1 = $__require('5e');
  var mergeAll_1 = $__require('65');
  var isScheduler_1 = $__require('60');
  function merge() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    observables.unshift(this);
    return mergeStatic.apply(this, observables);
  }
  exports.merge = merge;
  function mergeStatic() {
    var observables = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      observables[_i - 0] = arguments[_i];
    }
    var concurrent = Number.POSITIVE_INFINITY;
    var scheduler = null;
    var last = observables[observables.length - 1];
    if (isScheduler_1.isScheduler(last)) {
      scheduler = observables.pop();
      if (observables.length > 1 && typeof observables[observables.length - 1] === 'number') {
        concurrent = observables.pop();
      }
    } else if (typeof last === 'number') {
      concurrent = observables.pop();
    }
    if (observables.length === 1) {
      return observables[0];
    }
    return new ArrayObservable_1.ArrayObservable(observables, scheduler).lift(new mergeAll_1.MergeAllOperator(concurrent));
  }
  exports.mergeStatic = mergeStatic;
  return module.exports;
});

$__System.registerDynamic("84", ["83"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var merge_1 = $__require('83');
  exports.merge = merge_1.mergeStatic;
  return module.exports;
});

$__System.registerDynamic("85", ["b", "84"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var merge_1 = $__require('84');
  Observable_1.Observable.merge = merge_1.merge;
  return module.exports;
});

$__System.registerDynamic("76", ["b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var ScalarObservable = (function(_super) {
    __extends(ScalarObservable, _super);
    function ScalarObservable(value, scheduler) {
      _super.call(this);
      this.value = value;
      this.scheduler = scheduler;
      this._isScalar = true;
    }
    ScalarObservable.create = function(value, scheduler) {
      return new ScalarObservable(value, scheduler);
    };
    ScalarObservable.dispatch = function(state) {
      var done = state.done,
          value = state.value,
          subscriber = state.subscriber;
      if (done) {
        subscriber.complete();
        return;
      }
      subscriber.next(value);
      if (subscriber.isUnsubscribed) {
        return;
      }
      state.done = true;
      this.schedule(state);
    };
    ScalarObservable.prototype._subscribe = function(subscriber) {
      var value = this.value;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ScalarObservable.dispatch, 0, {
          done: false,
          value: value,
          subscriber: subscriber
        });
      } else {
        subscriber.next(value);
        if (!subscriber.isUnsubscribed) {
          subscriber.complete();
        }
      }
    };
    return ScalarObservable;
  }(Observable_1.Observable));
  exports.ScalarObservable = ScalarObservable;
  return module.exports;
});

$__System.registerDynamic("6c", ["b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var EmptyObservable = (function(_super) {
    __extends(EmptyObservable, _super);
    function EmptyObservable(scheduler) {
      _super.call(this);
      this.scheduler = scheduler;
    }
    EmptyObservable.create = function(scheduler) {
      return new EmptyObservable(scheduler);
    };
    EmptyObservable.dispatch = function(arg) {
      var subscriber = arg.subscriber;
      subscriber.complete();
    };
    EmptyObservable.prototype._subscribe = function(subscriber) {
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(EmptyObservable.dispatch, 0, {subscriber: subscriber});
      } else {
        subscriber.complete();
      }
    };
    return EmptyObservable;
  }(Observable_1.Observable));
  exports.EmptyObservable = EmptyObservable;
  return module.exports;
});

$__System.registerDynamic("5e", ["b", "76", "6c", "60"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var ScalarObservable_1 = $__require('76');
  var EmptyObservable_1 = $__require('6c');
  var isScheduler_1 = $__require('60');
  var ArrayObservable = (function(_super) {
    __extends(ArrayObservable, _super);
    function ArrayObservable(array, scheduler) {
      _super.call(this);
      this.array = array;
      this.scheduler = scheduler;
      if (!scheduler && array.length === 1) {
        this._isScalar = true;
        this.value = array[0];
      }
    }
    ArrayObservable.create = function(array, scheduler) {
      return new ArrayObservable(array, scheduler);
    };
    ArrayObservable.of = function() {
      var array = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        array[_i - 0] = arguments[_i];
      }
      var scheduler = array[array.length - 1];
      if (isScheduler_1.isScheduler(scheduler)) {
        array.pop();
      } else {
        scheduler = null;
      }
      var len = array.length;
      if (len > 1) {
        return new ArrayObservable(array, scheduler);
      } else if (len === 1) {
        return new ScalarObservable_1.ScalarObservable(array[0], scheduler);
      } else {
        return new EmptyObservable_1.EmptyObservable(scheduler);
      }
    };
    ArrayObservable.dispatch = function(state) {
      var array = state.array,
          index = state.index,
          count = state.count,
          subscriber = state.subscriber;
      if (index >= count) {
        subscriber.complete();
        return;
      }
      subscriber.next(array[index]);
      if (subscriber.isUnsubscribed) {
        return;
      }
      state.index = index + 1;
      this.schedule(state);
    };
    ArrayObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var array = this.array;
      var count = array.length;
      var scheduler = this.scheduler;
      if (scheduler) {
        return scheduler.schedule(ArrayObservable.dispatch, 0, {
          array: array,
          index: index,
          count: count,
          subscriber: subscriber
        });
      } else {
        for (var i = 0; i < count && !subscriber.isUnsubscribed; i++) {
          subscriber.next(array[i]);
        }
        subscriber.complete();
      }
    };
    return ArrayObservable;
  }(Observable_1.Observable));
  exports.ArrayObservable = ArrayObservable;
  return module.exports;
});

$__System.registerDynamic("86", ["5e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ArrayObservable_1 = $__require('5e');
  exports.of = ArrayObservable_1.ArrayObservable.of;
  return module.exports;
});

$__System.registerDynamic("87", ["b", "86"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var of_1 = $__require('86');
  Observable_1.Observable.of = of_1.of;
  return module.exports;
});

$__System.registerDynamic("88", ["5f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray_1 = $__require('5f');
  function isNumeric(val) {
    return !isArray_1.isArray(val) && (val - parseFloat(val) + 1) >= 0;
  }
  exports.isNumeric = isNumeric;
  ;
  return module.exports;
});

$__System.registerDynamic("89", ["8a", "8b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var FutureAction_1 = $__require('8a');
  var QueueScheduler_1 = $__require('8b');
  var AsyncScheduler = (function(_super) {
    __extends(AsyncScheduler, _super);
    function AsyncScheduler() {
      _super.apply(this, arguments);
    }
    AsyncScheduler.prototype.scheduleNow = function(work, state) {
      return new FutureAction_1.FutureAction(this, work).schedule(state, 0);
    };
    return AsyncScheduler;
  }(QueueScheduler_1.QueueScheduler));
  exports.AsyncScheduler = AsyncScheduler;
  return module.exports;
});

$__System.registerDynamic("8c", ["89"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var AsyncScheduler_1 = $__require('89');
  exports.async = new AsyncScheduler_1.AsyncScheduler();
  return module.exports;
});

$__System.registerDynamic("60", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isScheduler(value) {
    return value && typeof value.schedule === 'function';
  }
  exports.isScheduler = isScheduler;
  return module.exports;
});

$__System.registerDynamic("8d", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isDate(value) {
    return value instanceof Date && !isNaN(+value);
  }
  exports.isDate = isDate;
  return module.exports;
});

$__System.registerDynamic("8e", ["88", "b", "8c", "60", "8d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isNumeric_1 = $__require('88');
  var Observable_1 = $__require('b');
  var async_1 = $__require('8c');
  var isScheduler_1 = $__require('60');
  var isDate_1 = $__require('8d');
  var TimerObservable = (function(_super) {
    __extends(TimerObservable, _super);
    function TimerObservable(dueTime, period, scheduler) {
      if (dueTime === void 0) {
        dueTime = 0;
      }
      _super.call(this);
      this.period = -1;
      this.dueTime = 0;
      if (isNumeric_1.isNumeric(period)) {
        this.period = Number(period) < 1 && 1 || Number(period);
      } else if (isScheduler_1.isScheduler(period)) {
        scheduler = period;
      }
      if (!isScheduler_1.isScheduler(scheduler)) {
        scheduler = async_1.async;
      }
      this.scheduler = scheduler;
      this.dueTime = isDate_1.isDate(dueTime) ? (+dueTime - this.scheduler.now()) : dueTime;
    }
    TimerObservable.create = function(initialDelay, period, scheduler) {
      if (initialDelay === void 0) {
        initialDelay = 0;
      }
      return new TimerObservable(initialDelay, period, scheduler);
    };
    TimerObservable.dispatch = function(state) {
      var index = state.index,
          period = state.period,
          subscriber = state.subscriber;
      var action = this;
      subscriber.next(index);
      if (subscriber.isUnsubscribed) {
        return;
      } else if (period === -1) {
        return subscriber.complete();
      }
      state.index = index + 1;
      action.schedule(state, period);
    };
    TimerObservable.prototype._subscribe = function(subscriber) {
      var index = 0;
      var _a = this,
          period = _a.period,
          dueTime = _a.dueTime,
          scheduler = _a.scheduler;
      return scheduler.schedule(TimerObservable.dispatch, dueTime, {
        index: index,
        period: period,
        subscriber: subscriber
      });
    };
    return TimerObservable;
  }(Observable_1.Observable));
  exports.TimerObservable = TimerObservable;
  return module.exports;
});

$__System.registerDynamic("8f", ["8e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var TimerObservable_1 = $__require('8e');
  exports.timer = TimerObservable_1.TimerObservable.create;
  return module.exports;
});

$__System.registerDynamic("90", ["b", "8f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var timer_1 = $__require('8f');
  Observable_1.Observable.timer = timer_1.timer;
  return module.exports;
});

$__System.registerDynamic("91", ["8a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var FutureAction_1 = $__require('8a');
  var QueueAction = (function(_super) {
    __extends(QueueAction, _super);
    function QueueAction() {
      _super.apply(this, arguments);
    }
    QueueAction.prototype._schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (delay > 0) {
        return _super.prototype._schedule.call(this, state, delay);
      }
      this.delay = delay;
      this.state = state;
      var scheduler = this.scheduler;
      scheduler.actions.push(this);
      scheduler.flush();
      return this;
    };
    return QueueAction;
  }(FutureAction_1.FutureAction));
  exports.QueueAction = QueueAction;
  return module.exports;
});

$__System.registerDynamic("8a", ["6f", "7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var root_1 = $__require('6f');
  var Subscription_1 = $__require('7e');
  var FutureAction = (function(_super) {
    __extends(FutureAction, _super);
    function FutureAction(scheduler, work) {
      _super.call(this);
      this.scheduler = scheduler;
      this.work = work;
      this.pending = false;
    }
    FutureAction.prototype.execute = function() {
      if (this.isUnsubscribed) {
        this.error = new Error('executing a cancelled action');
      } else {
        try {
          this.work(this.state);
        } catch (e) {
          this.unsubscribe();
          this.error = e;
        }
      }
    };
    FutureAction.prototype.schedule = function(state, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      if (this.isUnsubscribed) {
        return this;
      }
      return this._schedule(state, delay);
    };
    FutureAction.prototype._schedule = function(state, delay) {
      var _this = this;
      if (delay === void 0) {
        delay = 0;
      }
      this.state = state;
      this.pending = true;
      var id = this.id;
      if (id != null && this.delay === delay) {
        return this;
      }
      this.delay = delay;
      if (id != null) {
        this.id = null;
        root_1.root.clearInterval(id);
      }
      this.id = root_1.root.setInterval(function() {
        _this.pending = false;
        var _a = _this,
            id = _a.id,
            scheduler = _a.scheduler;
        scheduler.actions.push(_this);
        scheduler.flush();
        if (_this.pending === false && id != null) {
          _this.id = null;
          root_1.root.clearInterval(id);
        }
      }, delay);
      return this;
    };
    FutureAction.prototype._unsubscribe = function() {
      this.pending = false;
      var _a = this,
          id = _a.id,
          scheduler = _a.scheduler;
      var actions = scheduler.actions;
      var index = actions.indexOf(this);
      if (id != null) {
        this.id = null;
        root_1.root.clearInterval(id);
      }
      if (index !== -1) {
        actions.splice(index, 1);
      }
      this.work = null;
      this.state = null;
      this.scheduler = null;
    };
    return FutureAction;
  }(Subscription_1.Subscription));
  exports.FutureAction = FutureAction;
  return module.exports;
});

$__System.registerDynamic("8b", ["91", "8a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var QueueAction_1 = $__require('91');
  var FutureAction_1 = $__require('8a');
  var QueueScheduler = (function() {
    function QueueScheduler() {
      this.active = false;
      this.actions = [];
      this.scheduledId = null;
    }
    QueueScheduler.prototype.now = function() {
      return Date.now();
    };
    QueueScheduler.prototype.flush = function() {
      if (this.active || this.scheduledId) {
        return;
      }
      this.active = true;
      var actions = this.actions;
      for (var action = null; action = actions.shift(); ) {
        action.execute();
        if (action.error) {
          this.active = false;
          throw action.error;
        }
      }
      this.active = false;
    };
    QueueScheduler.prototype.schedule = function(work, delay, state) {
      if (delay === void 0) {
        delay = 0;
      }
      return (delay <= 0) ? this.scheduleNow(work, state) : this.scheduleLater(work, delay, state);
    };
    QueueScheduler.prototype.scheduleNow = function(work, state) {
      return new QueueAction_1.QueueAction(this, work).schedule(state);
    };
    QueueScheduler.prototype.scheduleLater = function(work, delay, state) {
      return new FutureAction_1.FutureAction(this, work).schedule(state, delay);
    };
    return QueueScheduler;
  }());
  exports.QueueScheduler = QueueScheduler;
  return module.exports;
});

$__System.registerDynamic("92", ["8b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var QueueScheduler_1 = $__require('8b');
  exports.queue = new QueueScheduler_1.QueueScheduler();
  return module.exports;
});

$__System.registerDynamic("93", ["b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var Notification = (function() {
    function Notification(kind, value, exception) {
      this.kind = kind;
      this.value = value;
      this.exception = exception;
      this.hasValue = kind === 'N';
    }
    Notification.prototype.observe = function(observer) {
      switch (this.kind) {
        case 'N':
          return observer.next && observer.next(this.value);
        case 'E':
          return observer.error && observer.error(this.exception);
        case 'C':
          return observer.complete && observer.complete();
      }
    };
    Notification.prototype.do = function(next, error, complete) {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return next && next(this.value);
        case 'E':
          return error && error(this.exception);
        case 'C':
          return complete && complete();
      }
    };
    Notification.prototype.accept = function(nextOrObserver, error, complete) {
      if (nextOrObserver && typeof nextOrObserver.next === 'function') {
        return this.observe(nextOrObserver);
      } else {
        return this.do(nextOrObserver, error, complete);
      }
    };
    Notification.prototype.toObservable = function() {
      var kind = this.kind;
      switch (kind) {
        case 'N':
          return Observable_1.Observable.of(this.value);
        case 'E':
          return Observable_1.Observable.throw(this.exception);
        case 'C':
          return Observable_1.Observable.empty();
      }
    };
    Notification.createNext = function(value) {
      if (typeof value !== 'undefined') {
        return new Notification('N', value);
      }
      return this.undefinedValueNotification;
    };
    Notification.createError = function(err) {
      return new Notification('E', undefined, err);
    };
    Notification.createComplete = function() {
      return this.completeNotification;
    };
    Notification.completeNotification = new Notification('C');
    Notification.undefinedValueNotification = new Notification('N', undefined);
    return Notification;
  }());
  exports.Notification = Notification;
  return module.exports;
});

$__System.registerDynamic("7a", ["94", "93"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  var Notification_1 = $__require('93');
  function observeOn(scheduler, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return this.lift(new ObserveOnOperator(scheduler, delay));
  }
  exports.observeOn = observeOn;
  var ObserveOnOperator = (function() {
    function ObserveOnOperator(scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ObserveOnSubscriber(subscriber, this.scheduler, this.delay));
    };
    return ObserveOnOperator;
  }());
  exports.ObserveOnOperator = ObserveOnOperator;
  var ObserveOnSubscriber = (function(_super) {
    __extends(ObserveOnSubscriber, _super);
    function ObserveOnSubscriber(destination, scheduler, delay) {
      if (delay === void 0) {
        delay = 0;
      }
      _super.call(this, destination);
      this.scheduler = scheduler;
      this.delay = delay;
    }
    ObserveOnSubscriber.dispatch = function(arg) {
      var notification = arg.notification,
          destination = arg.destination;
      notification.observe(destination);
    };
    ObserveOnSubscriber.prototype.scheduleMessage = function(notification) {
      this.add(this.scheduler.schedule(ObserveOnSubscriber.dispatch, this.delay, new ObserveOnMessage(notification, this.destination)));
    };
    ObserveOnSubscriber.prototype._next = function(value) {
      this.scheduleMessage(Notification_1.Notification.createNext(value));
    };
    ObserveOnSubscriber.prototype._error = function(err) {
      this.scheduleMessage(Notification_1.Notification.createError(err));
    };
    ObserveOnSubscriber.prototype._complete = function() {
      this.scheduleMessage(Notification_1.Notification.createComplete());
    };
    return ObserveOnSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ObserveOnSubscriber = ObserveOnSubscriber;
  var ObserveOnMessage = (function() {
    function ObserveOnMessage(notification, destination) {
      this.notification = notification;
      this.destination = destination;
    }
    return ObserveOnMessage;
  }());
  exports.ObserveOnMessage = ObserveOnMessage;
  return module.exports;
});

$__System.registerDynamic("95", ["3b", "92", "7a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subject_1 = $__require('3b');
  var queue_1 = $__require('92');
  var observeOn_1 = $__require('7a');
  var ReplaySubject = (function(_super) {
    __extends(ReplaySubject, _super);
    function ReplaySubject(bufferSize, windowTime, scheduler) {
      if (bufferSize === void 0) {
        bufferSize = Number.POSITIVE_INFINITY;
      }
      if (windowTime === void 0) {
        windowTime = Number.POSITIVE_INFINITY;
      }
      _super.call(this);
      this.events = [];
      this.scheduler = scheduler;
      this.bufferSize = bufferSize < 1 ? 1 : bufferSize;
      this._windowTime = windowTime < 1 ? 1 : windowTime;
    }
    ReplaySubject.prototype._next = function(value) {
      var now = this._getNow();
      this.events.push(new ReplayEvent(now, value));
      this._trimBufferThenGetEvents(now);
      _super.prototype._next.call(this, value);
    };
    ReplaySubject.prototype._subscribe = function(subscriber) {
      var events = this._trimBufferThenGetEvents(this._getNow());
      var scheduler = this.scheduler;
      if (scheduler) {
        subscriber.add(subscriber = new observeOn_1.ObserveOnSubscriber(subscriber, scheduler));
      }
      var index = -1;
      var len = events.length;
      while (++index < len && !subscriber.isUnsubscribed) {
        subscriber.next(events[index].value);
      }
      return _super.prototype._subscribe.call(this, subscriber);
    };
    ReplaySubject.prototype._getNow = function() {
      return (this.scheduler || queue_1.queue).now();
    };
    ReplaySubject.prototype._trimBufferThenGetEvents = function(now) {
      var bufferSize = this.bufferSize;
      var _windowTime = this._windowTime;
      var events = this.events;
      var eventsCount = events.length;
      var spliceCount = 0;
      while (spliceCount < eventsCount) {
        if ((now - events[spliceCount].time) < _windowTime) {
          break;
        }
        spliceCount += 1;
      }
      if (eventsCount > bufferSize) {
        spliceCount = Math.max(spliceCount, eventsCount - bufferSize);
      }
      if (spliceCount > 0) {
        events.splice(0, spliceCount);
      }
      return events;
    };
    return ReplaySubject;
  }(Subject_1.Subject));
  exports.ReplaySubject = ReplaySubject;
  var ReplayEvent = (function() {
    function ReplayEvent(time, value) {
      this.time = time;
      this.value = value;
    }
    return ReplayEvent;
  }());
  return module.exports;
});

$__System.registerDynamic("96", ["95", "97"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ReplaySubject_1 = $__require('95');
  var multicast_1 = $__require('97');
  function publishReplay(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }
    return multicast_1.multicast.call(this, new ReplaySubject_1.ReplaySubject(bufferSize, windowTime, scheduler));
  }
  exports.publishReplay = publishReplay;
  return module.exports;
});

$__System.registerDynamic("98", ["96"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var publishReplay_1 = $__require('96');
  function cache(bufferSize, windowTime, scheduler) {
    if (bufferSize === void 0) {
      bufferSize = Number.POSITIVE_INFINITY;
    }
    if (windowTime === void 0) {
      windowTime = Number.POSITIVE_INFINITY;
    }
    return publishReplay_1.publishReplay.call(this, bufferSize, windowTime, scheduler).refCount();
  }
  exports.cache = cache;
  return module.exports;
});

$__System.registerDynamic("99", ["b", "98"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var cache_1 = $__require('98');
  Observable_1.Observable.prototype.cache = cache_1.cache;
  return module.exports;
});

$__System.registerDynamic("9a", ["9b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var mergeMap_1 = $__require('9b');
  function concatMap(project, resultSelector) {
    return this.lift(new mergeMap_1.MergeMapOperator(project, resultSelector, 1));
  }
  exports.concatMap = concatMap;
  return module.exports;
});

$__System.registerDynamic("9c", ["b", "9a"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var concatMap_1 = $__require('9a');
  Observable_1.Observable.prototype.concatMap = concatMap_1.concatMap;
  return module.exports;
});

$__System.registerDynamic("9d", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  function _do(nextOrObserver, error, complete) {
    return this.lift(new DoOperator(nextOrObserver, error, complete));
  }
  exports._do = _do;
  var DoOperator = (function() {
    function DoOperator(nextOrObserver, error, complete) {
      this.nextOrObserver = nextOrObserver;
      this.error = error;
      this.complete = complete;
    }
    DoOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new DoSubscriber(subscriber, this.nextOrObserver, this.error, this.complete));
    };
    return DoOperator;
  }());
  var DoSubscriber = (function(_super) {
    __extends(DoSubscriber, _super);
    function DoSubscriber(destination, nextOrObserver, error, complete) {
      _super.call(this, destination);
      var safeSubscriber = new Subscriber_1.Subscriber(nextOrObserver, error, complete);
      safeSubscriber.syncErrorThrowable = true;
      this.add(safeSubscriber);
      this.safeSubscriber = safeSubscriber;
    }
    DoSubscriber.prototype._next = function(value) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.next(value);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.next(value);
      }
    };
    DoSubscriber.prototype._error = function(err) {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.error(err);
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.error(err);
      }
    };
    DoSubscriber.prototype._complete = function() {
      var safeSubscriber = this.safeSubscriber;
      safeSubscriber.complete();
      if (safeSubscriber.syncErrorThrown) {
        this.destination.error(safeSubscriber.syncErrorValue);
      } else {
        this.destination.complete();
      }
    };
    return DoSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("9e", ["b", "9d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var do_1 = $__require('9d');
  Observable_1.Observable.prototype.do = do_1._do;
  return module.exports;
});

$__System.registerDynamic("9f", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  function filter(predicate, thisArg) {
    return this.lift(new FilterOperator(predicate, thisArg));
  }
  exports.filter = filter;
  var FilterOperator = (function() {
    function FilterOperator(predicate, thisArg) {
      this.predicate = predicate;
      this.thisArg = thisArg;
    }
    FilterOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new FilterSubscriber(subscriber, this.predicate, this.thisArg));
    };
    return FilterOperator;
  }());
  var FilterSubscriber = (function(_super) {
    __extends(FilterSubscriber, _super);
    function FilterSubscriber(destination, predicate, thisArg) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.thisArg = thisArg;
      this.count = 0;
      this.predicate = predicate;
    }
    FilterSubscriber.prototype._next = function(value) {
      var result;
      try {
        result = this.predicate.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this.destination.next(value);
      }
    };
    return FilterSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a0", ["b", "9f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var filter_1 = $__require('9f');
  Observable_1.Observable.prototype.filter = filter_1.filter;
  return module.exports;
});

$__System.registerDynamic("a1", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var EmptyError = (function(_super) {
    __extends(EmptyError, _super);
    function EmptyError() {
      _super.call(this, 'no elements in sequence');
      this.name = 'EmptyError';
    }
    return EmptyError;
  }(Error));
  exports.EmptyError = EmptyError;
  return module.exports;
});

$__System.registerDynamic("a2", ["94", "a1"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  var EmptyError_1 = $__require('a1');
  function first(predicate, resultSelector, defaultValue) {
    return this.lift(new FirstOperator(predicate, resultSelector, defaultValue, this));
  }
  exports.first = first;
  var FirstOperator = (function() {
    function FirstOperator(predicate, resultSelector, defaultValue, source) {
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
    }
    FirstOperator.prototype.call = function(observer, source) {
      return source._subscribe(new FirstSubscriber(observer, this.predicate, this.resultSelector, this.defaultValue, this.source));
    };
    return FirstOperator;
  }());
  var FirstSubscriber = (function(_super) {
    __extends(FirstSubscriber, _super);
    function FirstSubscriber(destination, predicate, resultSelector, defaultValue, source) {
      _super.call(this, destination);
      this.predicate = predicate;
      this.resultSelector = resultSelector;
      this.defaultValue = defaultValue;
      this.source = source;
      this.index = 0;
      this.hasCompleted = false;
    }
    FirstSubscriber.prototype._next = function(value) {
      var index = this.index++;
      if (this.predicate) {
        this._tryPredicate(value, index);
      } else {
        this._emit(value, index);
      }
    };
    FirstSubscriber.prototype._tryPredicate = function(value, index) {
      var result;
      try {
        result = this.predicate(value, index, this.source);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      if (result) {
        this._emit(value, index);
      }
    };
    FirstSubscriber.prototype._emit = function(value, index) {
      if (this.resultSelector) {
        this._tryResultSelector(value, index);
        return;
      }
      this._emitFinal(value);
    };
    FirstSubscriber.prototype._tryResultSelector = function(value, index) {
      var result;
      try {
        result = this.resultSelector(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this._emitFinal(result);
    };
    FirstSubscriber.prototype._emitFinal = function(value) {
      var destination = this.destination;
      destination.next(value);
      destination.complete();
      this.hasCompleted = true;
    };
    FirstSubscriber.prototype._complete = function() {
      var destination = this.destination;
      if (!this.hasCompleted && typeof this.defaultValue !== 'undefined') {
        destination.next(this.defaultValue);
        destination.complete();
      } else if (!this.hasCompleted) {
        destination.error(new EmptyError_1.EmptyError);
      }
    };
    return FirstSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a3", ["b", "a2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var first_1 = $__require('a2');
  Observable_1.Observable.prototype.first = first_1.first;
  return module.exports;
});

$__System.registerDynamic("a4", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function noop() {}
  exports.noop = noop;
  return module.exports;
});

$__System.registerDynamic("a5", ["94", "a4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  var noop_1 = $__require('a4');
  function ignoreElements() {
    return this.lift(new IgnoreElementsOperator());
  }
  exports.ignoreElements = ignoreElements;
  ;
  var IgnoreElementsOperator = (function() {
    function IgnoreElementsOperator() {}
    IgnoreElementsOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new IgnoreElementsSubscriber(subscriber));
    };
    return IgnoreElementsOperator;
  }());
  var IgnoreElementsSubscriber = (function(_super) {
    __extends(IgnoreElementsSubscriber, _super);
    function IgnoreElementsSubscriber() {
      _super.apply(this, arguments);
    }
    IgnoreElementsSubscriber.prototype._next = function(unused) {
      noop_1.noop();
    };
    return IgnoreElementsSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("a6", ["b", "a5"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var ignoreElements_1 = $__require('a5');
  Observable_1.Observable.prototype.ignoreElements = ignoreElements_1.ignoreElements;
  return module.exports;
});

$__System.registerDynamic("a7", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function letProto(func) {
    return func(this);
  }
  exports.letProto = letProto;
  return module.exports;
});

$__System.registerDynamic("a8", ["b", "a7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var let_1 = $__require('a7');
  Observable_1.Observable.prototype.let = let_1.letProto;
  Observable_1.Observable.prototype.letBind = let_1.letProto;
  return module.exports;
});

$__System.registerDynamic("a9", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  function map(project, thisArg) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }
    return this.lift(new MapOperator(project, thisArg));
  }
  exports.map = map;
  var MapOperator = (function() {
    function MapOperator(project, thisArg) {
      this.project = project;
      this.thisArg = thisArg;
    }
    MapOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
    };
    return MapOperator;
  }());
  var MapSubscriber = (function(_super) {
    __extends(MapSubscriber, _super);
    function MapSubscriber(destination, project, thisArg) {
      _super.call(this, destination);
      this.project = project;
      this.count = 0;
      this.thisArg = thisArg || this;
    }
    MapSubscriber.prototype._next = function(value) {
      var result;
      try {
        result = this.project.call(this.thisArg, value, this.count++);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    return MapSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("aa", ["b", "a9"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var map_1 = $__require('a9');
  Observable_1.Observable.prototype.map = map_1.map;
  return module.exports;
});

$__System.registerDynamic("78", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isPromise(value) {
    return value && typeof value.subscribe !== 'function' && typeof value.then === 'function';
  }
  exports.isPromise = isPromise;
  return module.exports;
});

$__System.registerDynamic("73", ["6f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  var Symbol = root_1.root.Symbol;
  if (typeof Symbol === 'function') {
    if (Symbol.iterator) {
      exports.$$iterator = Symbol.iterator;
    } else if (typeof Symbol.for === 'function') {
      exports.$$iterator = Symbol.for('iterator');
    }
  } else {
    if (root_1.root.Set && typeof new root_1.root.Set()['@@iterator'] === 'function') {
      exports.$$iterator = '@@iterator';
    } else if (root_1.root.Map) {
      var keys = Object.getOwnPropertyNames(root_1.root.Map.prototype);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        if (key !== 'entries' && key !== 'size' && root_1.root.Map.prototype[key] === root_1.root.Map.prototype['entries']) {
          exports.$$iterator = key;
          break;
        }
      }
    } else {
      exports.$$iterator = '@@iterator';
    }
  }
  return module.exports;
});

$__System.registerDynamic("ab", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  var InnerSubscriber = (function(_super) {
    __extends(InnerSubscriber, _super);
    function InnerSubscriber(parent, outerValue, outerIndex) {
      _super.call(this);
      this.parent = parent;
      this.outerValue = outerValue;
      this.outerIndex = outerIndex;
      this.index = 0;
    }
    InnerSubscriber.prototype._next = function(value) {
      this.parent.notifyNext(this.outerValue, value, this.outerIndex, this.index++, this);
    };
    InnerSubscriber.prototype._error = function(error) {
      this.parent.notifyError(error, this);
      this.unsubscribe();
    };
    InnerSubscriber.prototype._complete = function() {
      this.parent.notifyComplete(this);
      this.unsubscribe();
    };
    return InnerSubscriber;
  }(Subscriber_1.Subscriber));
  exports.InnerSubscriber = InnerSubscriber;
  return module.exports;
});

$__System.registerDynamic("62", ["6f", "5f", "78", "b", "73", "79", "ab"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  var isArray_1 = $__require('5f');
  var isPromise_1 = $__require('78');
  var Observable_1 = $__require('b');
  var iterator_1 = $__require('73');
  var observable_1 = $__require('79');
  var InnerSubscriber_1 = $__require('ab');
  function subscribeToResult(outerSubscriber, result, outerValue, outerIndex) {
    var destination = new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex);
    if (destination.isUnsubscribed) {
      return;
    }
    if (result instanceof Observable_1.Observable) {
      if (result._isScalar) {
        destination.next(result.value);
        destination.complete();
        return;
      } else {
        return result.subscribe(destination);
      }
    }
    if (isArray_1.isArray(result)) {
      for (var i = 0,
          len = result.length; i < len && !destination.isUnsubscribed; i++) {
        destination.next(result[i]);
      }
      if (!destination.isUnsubscribed) {
        destination.complete();
      }
    } else if (isPromise_1.isPromise(result)) {
      result.then(function(value) {
        if (!destination.isUnsubscribed) {
          destination.next(value);
          destination.complete();
        }
      }, function(err) {
        return destination.error(err);
      }).then(null, function(err) {
        root_1.root.setTimeout(function() {
          throw err;
        });
      });
      return destination;
    } else if (typeof result[iterator_1.$$iterator] === 'function') {
      for (var _i = 0,
          _a = result; _i < _a.length; _i++) {
        var item = _a[_i];
        destination.next(item);
        if (destination.isUnsubscribed) {
          break;
        }
      }
      if (!destination.isUnsubscribed) {
        destination.complete();
      }
    } else if (typeof result[observable_1.$$observable] === 'function') {
      var obs = result[observable_1.$$observable]();
      if (typeof obs.subscribe !== 'function') {
        destination.error('invalid observable');
      } else {
        return obs.subscribe(new InnerSubscriber_1.InnerSubscriber(outerSubscriber, outerValue, outerIndex));
      }
    } else {
      destination.error(new TypeError('unknown type returned'));
    }
  }
  exports.subscribeToResult = subscribeToResult;
  return module.exports;
});

$__System.registerDynamic("61", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  var OuterSubscriber = (function(_super) {
    __extends(OuterSubscriber, _super);
    function OuterSubscriber() {
      _super.apply(this, arguments);
    }
    OuterSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      this.destination.next(innerValue);
    };
    OuterSubscriber.prototype.notifyError = function(error, innerSub) {
      this.destination.error(error);
    };
    OuterSubscriber.prototype.notifyComplete = function(innerSub) {
      this.destination.complete();
    };
    return OuterSubscriber;
  }(Subscriber_1.Subscriber));
  exports.OuterSubscriber = OuterSubscriber;
  return module.exports;
});

$__System.registerDynamic("9b", ["62", "61"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var subscribeToResult_1 = $__require('62');
  var OuterSubscriber_1 = $__require('61');
  function mergeMap(project, resultSelector, concurrent) {
    if (concurrent === void 0) {
      concurrent = Number.POSITIVE_INFINITY;
    }
    if (typeof resultSelector === 'number') {
      concurrent = resultSelector;
      resultSelector = null;
    }
    return this.lift(new MergeMapOperator(project, resultSelector, concurrent));
  }
  exports.mergeMap = mergeMap;
  var MergeMapOperator = (function() {
    function MergeMapOperator(project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
    }
    MergeMapOperator.prototype.call = function(observer, source) {
      return source._subscribe(new MergeMapSubscriber(observer, this.project, this.resultSelector, this.concurrent));
    };
    return MergeMapOperator;
  }());
  exports.MergeMapOperator = MergeMapOperator;
  var MergeMapSubscriber = (function(_super) {
    __extends(MergeMapSubscriber, _super);
    function MergeMapSubscriber(destination, project, resultSelector, concurrent) {
      if (concurrent === void 0) {
        concurrent = Number.POSITIVE_INFINITY;
      }
      _super.call(this, destination);
      this.project = project;
      this.resultSelector = resultSelector;
      this.concurrent = concurrent;
      this.hasCompleted = false;
      this.buffer = [];
      this.active = 0;
      this.index = 0;
    }
    MergeMapSubscriber.prototype._next = function(value) {
      if (this.active < this.concurrent) {
        this._tryNext(value);
      } else {
        this.buffer.push(value);
      }
    };
    MergeMapSubscriber.prototype._tryNext = function(value) {
      var result;
      var index = this.index++;
      try {
        result = this.project(value, index);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.active++;
      this._innerSub(result, value, index);
    };
    MergeMapSubscriber.prototype._innerSub = function(ish, value, index) {
      this.add(subscribeToResult_1.subscribeToResult(this, ish, value, index));
    };
    MergeMapSubscriber.prototype._complete = function() {
      this.hasCompleted = true;
      if (this.active === 0 && this.buffer.length === 0) {
        this.destination.complete();
      }
    };
    MergeMapSubscriber.prototype.notifyNext = function(outerValue, innerValue, outerIndex, innerIndex, innerSub) {
      if (this.resultSelector) {
        this._notifyResultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } else {
        this.destination.next(innerValue);
      }
    };
    MergeMapSubscriber.prototype._notifyResultSelector = function(outerValue, innerValue, outerIndex, innerIndex) {
      var result;
      try {
        result = this.resultSelector(outerValue, innerValue, outerIndex, innerIndex);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.destination.next(result);
    };
    MergeMapSubscriber.prototype.notifyComplete = function(innerSub) {
      var buffer = this.buffer;
      this.remove(innerSub);
      this.active--;
      if (buffer.length > 0) {
        this._next(buffer.shift());
      } else if (this.active === 0 && this.hasCompleted) {
        this.destination.complete();
      }
    };
    return MergeMapSubscriber;
  }(OuterSubscriber_1.OuterSubscriber));
  exports.MergeMapSubscriber = MergeMapSubscriber;
  return module.exports;
});

$__System.registerDynamic("ac", ["b", "9b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var mergeMap_1 = $__require('9b');
  Observable_1.Observable.prototype.mergeMap = mergeMap_1.mergeMap;
  Observable_1.Observable.prototype.flatMap = mergeMap_1.mergeMap;
  return module.exports;
});

$__System.registerDynamic("ad", ["94"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscriber_1 = $__require('94');
  function reduce(project, seed) {
    return this.lift(new ReduceOperator(project, seed));
  }
  exports.reduce = reduce;
  var ReduceOperator = (function() {
    function ReduceOperator(project, seed) {
      this.project = project;
      this.seed = seed;
    }
    ReduceOperator.prototype.call = function(subscriber, source) {
      return source._subscribe(new ReduceSubscriber(subscriber, this.project, this.seed));
    };
    return ReduceOperator;
  }());
  exports.ReduceOperator = ReduceOperator;
  var ReduceSubscriber = (function(_super) {
    __extends(ReduceSubscriber, _super);
    function ReduceSubscriber(destination, project, seed) {
      _super.call(this, destination);
      this.hasValue = false;
      this.acc = seed;
      this.project = project;
      this.hasSeed = typeof seed !== 'undefined';
    }
    ReduceSubscriber.prototype._next = function(value) {
      if (this.hasValue || (this.hasValue = this.hasSeed)) {
        this._tryReduce(value);
      } else {
        this.acc = value;
        this.hasValue = true;
      }
    };
    ReduceSubscriber.prototype._tryReduce = function(value) {
      var result;
      try {
        result = this.project(this.acc, value);
      } catch (err) {
        this.destination.error(err);
        return;
      }
      this.acc = result;
    };
    ReduceSubscriber.prototype._complete = function() {
      if (this.hasValue || this.hasSeed) {
        this.destination.next(this.acc);
      }
      this.destination.complete();
    };
    return ReduceSubscriber;
  }(Subscriber_1.Subscriber));
  exports.ReduceSubscriber = ReduceSubscriber;
  return module.exports;
});

$__System.registerDynamic("ae", ["b", "ad"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var reduce_1 = $__require('ad');
  Observable_1.Observable.prototype.reduce = reduce_1.reduce;
  return module.exports;
});

$__System.registerDynamic("af", ["b", "94", "7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var Subscriber_1 = $__require('94');
  var Subscription_1 = $__require('7e');
  var ConnectableObservable = (function(_super) {
    __extends(ConnectableObservable, _super);
    function ConnectableObservable(source, subjectFactory) {
      _super.call(this);
      this.source = source;
      this.subjectFactory = subjectFactory;
    }
    ConnectableObservable.prototype._subscribe = function(subscriber) {
      return this.getSubject().subscribe(subscriber);
    };
    ConnectableObservable.prototype.getSubject = function() {
      var subject = this.subject;
      if (subject && !subject.isUnsubscribed) {
        return subject;
      }
      return (this.subject = this.subjectFactory());
    };
    ConnectableObservable.prototype.connect = function() {
      var source = this.source;
      var subscription = this.subscription;
      if (subscription && !subscription.isUnsubscribed) {
        return subscription;
      }
      subscription = source.subscribe(this.getSubject());
      subscription.add(new ConnectableSubscription(this));
      return (this.subscription = subscription);
    };
    ConnectableObservable.prototype.refCount = function() {
      return new RefCountObservable(this);
    };
    ConnectableObservable.prototype._closeSubscription = function() {
      this.subject = null;
      this.subscription = null;
    };
    return ConnectableObservable;
  }(Observable_1.Observable));
  exports.ConnectableObservable = ConnectableObservable;
  var ConnectableSubscription = (function(_super) {
    __extends(ConnectableSubscription, _super);
    function ConnectableSubscription(connectable) {
      _super.call(this);
      this.connectable = connectable;
    }
    ConnectableSubscription.prototype._unsubscribe = function() {
      var connectable = this.connectable;
      connectable._closeSubscription();
      this.connectable = null;
    };
    return ConnectableSubscription;
  }(Subscription_1.Subscription));
  var RefCountObservable = (function(_super) {
    __extends(RefCountObservable, _super);
    function RefCountObservable(connectable, refCount) {
      if (refCount === void 0) {
        refCount = 0;
      }
      _super.call(this);
      this.connectable = connectable;
      this.refCount = refCount;
    }
    RefCountObservable.prototype._subscribe = function(subscriber) {
      var connectable = this.connectable;
      var refCountSubscriber = new RefCountSubscriber(subscriber, this);
      var subscription = connectable.subscribe(refCountSubscriber);
      if (!subscription.isUnsubscribed && ++this.refCount === 1) {
        refCountSubscriber.connection = this.connection = connectable.connect();
      }
      return subscription;
    };
    return RefCountObservable;
  }(Observable_1.Observable));
  var RefCountSubscriber = (function(_super) {
    __extends(RefCountSubscriber, _super);
    function RefCountSubscriber(destination, refCountObservable) {
      _super.call(this, null);
      this.destination = destination;
      this.refCountObservable = refCountObservable;
      this.connection = refCountObservable.connection;
      destination.add(this);
    }
    RefCountSubscriber.prototype._next = function(value) {
      this.destination.next(value);
    };
    RefCountSubscriber.prototype._error = function(err) {
      this._resetConnectable();
      this.destination.error(err);
    };
    RefCountSubscriber.prototype._complete = function() {
      this._resetConnectable();
      this.destination.complete();
    };
    RefCountSubscriber.prototype._resetConnectable = function() {
      var observable = this.refCountObservable;
      var obsConnection = observable.connection;
      var subConnection = this.connection;
      if (subConnection && subConnection === obsConnection) {
        observable.refCount = 0;
        obsConnection.unsubscribe();
        observable.connection = null;
        this.unsubscribe();
      }
    };
    RefCountSubscriber.prototype._unsubscribe = function() {
      var observable = this.refCountObservable;
      if (observable.refCount === 0) {
        return;
      }
      if (--observable.refCount === 0) {
        var obsConnection = observable.connection;
        var subConnection = this.connection;
        if (subConnection && subConnection === obsConnection) {
          obsConnection.unsubscribe();
          observable.connection = null;
        }
      }
    };
    return RefCountSubscriber;
  }(Subscriber_1.Subscriber));
  return module.exports;
});

$__System.registerDynamic("97", ["af"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var ConnectableObservable_1 = $__require('af');
  function multicast(subjectOrSubjectFactory) {
    var subjectFactory;
    if (typeof subjectOrSubjectFactory === 'function') {
      subjectFactory = subjectOrSubjectFactory;
    } else {
      subjectFactory = function subjectFactory() {
        return subjectOrSubjectFactory;
      };
    }
    return new ConnectableObservable_1.ConnectableObservable(this, subjectFactory);
  }
  exports.multicast = multicast;
  return module.exports;
});

$__System.registerDynamic("b0", ["7e"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Subscription_1 = $__require('7e');
  var SubjectSubscription = (function(_super) {
    __extends(SubjectSubscription, _super);
    function SubjectSubscription(subject, observer) {
      _super.call(this);
      this.subject = subject;
      this.observer = observer;
      this.isUnsubscribed = false;
    }
    SubjectSubscription.prototype.unsubscribe = function() {
      if (this.isUnsubscribed) {
        return;
      }
      this.isUnsubscribed = true;
      var subject = this.subject;
      var observers = subject.observers;
      this.subject = null;
      if (!observers || observers.length === 0 || subject.isUnsubscribed) {
        return;
      }
      var subscriberIndex = observers.indexOf(this.observer);
      if (subscriberIndex !== -1) {
        observers.splice(subscriberIndex, 1);
      }
    };
    return SubjectSubscription;
  }(Subscription_1.Subscription));
  exports.SubjectSubscription = SubjectSubscription;
  return module.exports;
});

$__System.registerDynamic("b1", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function throwError(e) {
    throw e;
  }
  exports.throwError = throwError;
  return module.exports;
});

$__System.registerDynamic("b2", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var ObjectUnsubscribedError = (function(_super) {
    __extends(ObjectUnsubscribedError, _super);
    function ObjectUnsubscribedError() {
      _super.call(this, 'object unsubscribed');
      this.name = 'ObjectUnsubscribedError';
    }
    return ObjectUnsubscribedError;
  }(Error));
  exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
  return module.exports;
});

$__System.registerDynamic("3b", ["b", "94", "7e", "b0", "b3", "b1", "b2"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var Observable_1 = $__require('b');
  var Subscriber_1 = $__require('94');
  var Subscription_1 = $__require('7e');
  var SubjectSubscription_1 = $__require('b0');
  var rxSubscriber_1 = $__require('b3');
  var throwError_1 = $__require('b1');
  var ObjectUnsubscribedError_1 = $__require('b2');
  var Subject = (function(_super) {
    __extends(Subject, _super);
    function Subject(destination, source) {
      _super.call(this);
      this.destination = destination;
      this.source = source;
      this.observers = [];
      this.isUnsubscribed = false;
      this.isStopped = false;
      this.hasErrored = false;
      this.dispatching = false;
      this.hasCompleted = false;
      this.source = source;
    }
    Subject.prototype.lift = function(operator) {
      var subject = new Subject(this.destination || this, this);
      subject.operator = operator;
      return subject;
    };
    Subject.prototype.add = function(subscription) {
      return Subscription_1.Subscription.prototype.add.call(this, subscription);
    };
    Subject.prototype.remove = function(subscription) {
      Subscription_1.Subscription.prototype.remove.call(this, subscription);
    };
    Subject.prototype.unsubscribe = function() {
      Subscription_1.Subscription.prototype.unsubscribe.call(this);
    };
    Subject.prototype._subscribe = function(subscriber) {
      if (this.source) {
        return this.source.subscribe(subscriber);
      } else {
        if (subscriber.isUnsubscribed) {
          return;
        } else if (this.hasErrored) {
          return subscriber.error(this.errorValue);
        } else if (this.hasCompleted) {
          return subscriber.complete();
        }
        this.throwIfUnsubscribed();
        var subscription = new SubjectSubscription_1.SubjectSubscription(this, subscriber);
        this.observers.push(subscriber);
        return subscription;
      }
    };
    Subject.prototype._unsubscribe = function() {
      this.source = null;
      this.isStopped = true;
      this.observers = null;
      this.destination = null;
    };
    Subject.prototype.next = function(value) {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.dispatching = true;
      this._next(value);
      this.dispatching = false;
      if (this.hasErrored) {
        this._error(this.errorValue);
      } else if (this.hasCompleted) {
        this._complete();
      }
    };
    Subject.prototype.error = function(err) {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.isStopped = true;
      this.hasErrored = true;
      this.errorValue = err;
      if (this.dispatching) {
        return;
      }
      this._error(err);
    };
    Subject.prototype.complete = function() {
      this.throwIfUnsubscribed();
      if (this.isStopped) {
        return;
      }
      this.isStopped = true;
      this.hasCompleted = true;
      if (this.dispatching) {
        return;
      }
      this._complete();
    };
    Subject.prototype.asObservable = function() {
      var observable = new SubjectObservable(this);
      return observable;
    };
    Subject.prototype._next = function(value) {
      if (this.destination) {
        this.destination.next(value);
      } else {
        this._finalNext(value);
      }
    };
    Subject.prototype._finalNext = function(value) {
      var index = -1;
      var observers = this.observers.slice(0);
      var len = observers.length;
      while (++index < len) {
        observers[index].next(value);
      }
    };
    Subject.prototype._error = function(err) {
      if (this.destination) {
        this.destination.error(err);
      } else {
        this._finalError(err);
      }
    };
    Subject.prototype._finalError = function(err) {
      var index = -1;
      var observers = this.observers;
      this.observers = null;
      this.isUnsubscribed = true;
      if (observers) {
        var len = observers.length;
        while (++index < len) {
          observers[index].error(err);
        }
      }
      this.isUnsubscribed = false;
      this.unsubscribe();
    };
    Subject.prototype._complete = function() {
      if (this.destination) {
        this.destination.complete();
      } else {
        this._finalComplete();
      }
    };
    Subject.prototype._finalComplete = function() {
      var index = -1;
      var observers = this.observers;
      this.observers = null;
      this.isUnsubscribed = true;
      if (observers) {
        var len = observers.length;
        while (++index < len) {
          observers[index].complete();
        }
      }
      this.isUnsubscribed = false;
      this.unsubscribe();
    };
    Subject.prototype.throwIfUnsubscribed = function() {
      if (this.isUnsubscribed) {
        throwError_1.throwError(new ObjectUnsubscribedError_1.ObjectUnsubscribedError());
      }
    };
    Subject.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return new Subscriber_1.Subscriber(this);
    };
    Subject.create = function(destination, source) {
      return new Subject(destination, source);
    };
    return Subject;
  }(Observable_1.Observable));
  exports.Subject = Subject;
  var SubjectObservable = (function(_super) {
    __extends(SubjectObservable, _super);
    function SubjectObservable(source) {
      _super.call(this);
      this.source = source;
    }
    return SubjectObservable;
  }(Observable_1.Observable));
  return module.exports;
});

$__System.registerDynamic("b4", ["97", "3b"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var multicast_1 = $__require('97');
  var Subject_1 = $__require('3b');
  function shareSubjectFactory() {
    return new Subject_1.Subject();
  }
  function share() {
    return multicast_1.multicast.call(this, shareSubjectFactory).refCount();
  }
  exports.share = share;
  ;
  return module.exports;
});

$__System.registerDynamic("b5", ["b", "b4"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var share_1 = $__require('b4');
  Observable_1.Observable.prototype.share = share_1.share;
  return module.exports;
});

$__System.registerDynamic("79", ["6f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  var Symbol = root_1.root.Symbol;
  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      exports.$$observable = Symbol.observable;
    } else {
      if (typeof Symbol.for === 'function') {
        exports.$$observable = Symbol.for('observable');
      } else {
        exports.$$observable = Symbol('observable');
      }
      Symbol.observable = exports.$$observable;
    }
  } else {
    exports.$$observable = '@@observable';
  }
  return module.exports;
});

$__System.registerDynamic("5f", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.isArray = Array.isArray || (function(x) {
    return x && typeof x.length === 'number';
  });
  return module.exports;
});

$__System.registerDynamic("70", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isObject(x) {
    return x != null && typeof x === 'object';
  }
  exports.isObject = isObject;
  return module.exports;
});

$__System.registerDynamic("72", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  function isFunction(x) {
    return typeof x === 'function';
  }
  exports.isFunction = isFunction;
  return module.exports;
});

$__System.registerDynamic("71", ["74"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var errorObject_1 = $__require('74');
  var tryCatchTarget;
  function tryCatcher() {
    try {
      return tryCatchTarget.apply(this, arguments);
    } catch (e) {
      errorObject_1.errorObject.e = e;
      return errorObject_1.errorObject;
    }
  }
  function tryCatch(fn) {
    tryCatchTarget = fn;
    return tryCatcher;
  }
  exports.tryCatch = tryCatch;
  ;
  return module.exports;
});

$__System.registerDynamic("74", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.errorObject = {e: {}};
  return module.exports;
});

$__System.registerDynamic("b6", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var UnsubscriptionError = (function(_super) {
    __extends(UnsubscriptionError, _super);
    function UnsubscriptionError(errors) {
      _super.call(this);
      this.errors = errors;
      this.name = 'UnsubscriptionError';
      this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
        return ((i + 1) + ") " + err.toString());
      }).join('\n') : '';
    }
    return UnsubscriptionError;
  }(Error));
  exports.UnsubscriptionError = UnsubscriptionError;
  return module.exports;
});

$__System.registerDynamic("7e", ["5f", "70", "72", "71", "74", "b6"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var isArray_1 = $__require('5f');
  var isObject_1 = $__require('70');
  var isFunction_1 = $__require('72');
  var tryCatch_1 = $__require('71');
  var errorObject_1 = $__require('74');
  var UnsubscriptionError_1 = $__require('b6');
  var Subscription = (function() {
    function Subscription(unsubscribe) {
      this.isUnsubscribed = false;
      if (unsubscribe) {
        this._unsubscribe = unsubscribe;
      }
    }
    Subscription.prototype.unsubscribe = function() {
      var hasErrors = false;
      var errors;
      if (this.isUnsubscribed) {
        return;
      }
      this.isUnsubscribed = true;
      var _a = this,
          _unsubscribe = _a._unsubscribe,
          _subscriptions = _a._subscriptions;
      this._subscriptions = null;
      if (isFunction_1.isFunction(_unsubscribe)) {
        var trial = tryCatch_1.tryCatch(_unsubscribe).call(this);
        if (trial === errorObject_1.errorObject) {
          hasErrors = true;
          (errors = errors || []).push(errorObject_1.errorObject.e);
        }
      }
      if (isArray_1.isArray(_subscriptions)) {
        var index = -1;
        var len = _subscriptions.length;
        while (++index < len) {
          var sub = _subscriptions[index];
          if (isObject_1.isObject(sub)) {
            var trial = tryCatch_1.tryCatch(sub.unsubscribe).call(sub);
            if (trial === errorObject_1.errorObject) {
              hasErrors = true;
              errors = errors || [];
              var err = errorObject_1.errorObject.e;
              if (err instanceof UnsubscriptionError_1.UnsubscriptionError) {
                errors = errors.concat(err.errors);
              } else {
                errors.push(err);
              }
            }
          }
        }
      }
      if (hasErrors) {
        throw new UnsubscriptionError_1.UnsubscriptionError(errors);
      }
    };
    Subscription.prototype.add = function(teardown) {
      if (!teardown || (teardown === this) || (teardown === Subscription.EMPTY)) {
        return;
      }
      var sub = teardown;
      switch (typeof teardown) {
        case 'function':
          sub = new Subscription(teardown);
        case 'object':
          if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
            break;
          } else if (this.isUnsubscribed) {
            sub.unsubscribe();
          } else {
            (this._subscriptions || (this._subscriptions = [])).push(sub);
          }
          break;
        default:
          throw new Error('Unrecognized teardown ' + teardown + ' added to Subscription.');
      }
      return sub;
    };
    Subscription.prototype.remove = function(subscription) {
      if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
        return;
      }
      var subscriptions = this._subscriptions;
      if (subscriptions) {
        var subscriptionIndex = subscriptions.indexOf(subscription);
        if (subscriptionIndex !== -1) {
          subscriptions.splice(subscriptionIndex, 1);
        }
      }
    };
    Subscription.EMPTY = (function(empty) {
      empty.isUnsubscribed = true;
      return empty;
    }(new Subscription()));
    return Subscription;
  }());
  exports.Subscription = Subscription;
  return module.exports;
});

$__System.registerDynamic("b7", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  exports.empty = {
    isUnsubscribed: true,
    next: function(value) {},
    error: function(err) {
      throw err;
    },
    complete: function() {}
  };
  return module.exports;
});

$__System.registerDynamic("94", ["72", "7e", "b3", "b7"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var isFunction_1 = $__require('72');
  var Subscription_1 = $__require('7e');
  var rxSubscriber_1 = $__require('b3');
  var Observer_1 = $__require('b7');
  var Subscriber = (function(_super) {
    __extends(Subscriber, _super);
    function Subscriber(destinationOrNext, error, complete) {
      _super.call(this);
      this.syncErrorValue = null;
      this.syncErrorThrown = false;
      this.syncErrorThrowable = false;
      this.isStopped = false;
      switch (arguments.length) {
        case 0:
          this.destination = Observer_1.empty;
          break;
        case 1:
          if (!destinationOrNext) {
            this.destination = Observer_1.empty;
            break;
          }
          if (typeof destinationOrNext === 'object') {
            if (destinationOrNext instanceof Subscriber) {
              this.destination = destinationOrNext;
              this.destination.add(this);
            } else {
              this.syncErrorThrowable = true;
              this.destination = new SafeSubscriber(this, destinationOrNext);
            }
            break;
          }
        default:
          this.syncErrorThrowable = true;
          this.destination = new SafeSubscriber(this, destinationOrNext, error, complete);
          break;
      }
    }
    Subscriber.create = function(next, error, complete) {
      var subscriber = new Subscriber(next, error, complete);
      subscriber.syncErrorThrowable = false;
      return subscriber;
    };
    Subscriber.prototype.next = function(value) {
      if (!this.isStopped) {
        this._next(value);
      }
    };
    Subscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        this.isStopped = true;
        this._error(err);
      }
    };
    Subscriber.prototype.complete = function() {
      if (!this.isStopped) {
        this.isStopped = true;
        this._complete();
      }
    };
    Subscriber.prototype.unsubscribe = function() {
      if (this.isUnsubscribed) {
        return;
      }
      this.isStopped = true;
      _super.prototype.unsubscribe.call(this);
    };
    Subscriber.prototype._next = function(value) {
      this.destination.next(value);
    };
    Subscriber.prototype._error = function(err) {
      this.destination.error(err);
      this.unsubscribe();
    };
    Subscriber.prototype._complete = function() {
      this.destination.complete();
      this.unsubscribe();
    };
    Subscriber.prototype[rxSubscriber_1.$$rxSubscriber] = function() {
      return this;
    };
    return Subscriber;
  }(Subscription_1.Subscription));
  exports.Subscriber = Subscriber;
  var SafeSubscriber = (function(_super) {
    __extends(SafeSubscriber, _super);
    function SafeSubscriber(_parent, observerOrNext, error, complete) {
      _super.call(this);
      this._parent = _parent;
      var next;
      var context = this;
      if (isFunction_1.isFunction(observerOrNext)) {
        next = observerOrNext;
      } else if (observerOrNext) {
        context = observerOrNext;
        next = observerOrNext.next;
        error = observerOrNext.error;
        complete = observerOrNext.complete;
        if (isFunction_1.isFunction(context.unsubscribe)) {
          this.add(context.unsubscribe.bind(context));
        }
        context.unsubscribe = this.unsubscribe.bind(this);
      }
      this._context = context;
      this._next = next;
      this._error = error;
      this._complete = complete;
    }
    SafeSubscriber.prototype.next = function(value) {
      if (!this.isStopped && this._next) {
        var _parent = this._parent;
        if (!_parent.syncErrorThrowable) {
          this.__tryOrUnsub(this._next, value);
        } else if (this.__tryOrSetError(_parent, this._next, value)) {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.error = function(err) {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._error) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._error, err);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._error, err);
            this.unsubscribe();
          }
        } else if (!_parent.syncErrorThrowable) {
          this.unsubscribe();
          throw err;
        } else {
          _parent.syncErrorValue = err;
          _parent.syncErrorThrown = true;
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.complete = function() {
      if (!this.isStopped) {
        var _parent = this._parent;
        if (this._complete) {
          if (!_parent.syncErrorThrowable) {
            this.__tryOrUnsub(this._complete);
            this.unsubscribe();
          } else {
            this.__tryOrSetError(_parent, this._complete);
            this.unsubscribe();
          }
        } else {
          this.unsubscribe();
        }
      }
    };
    SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        this.unsubscribe();
        throw err;
      }
    };
    SafeSubscriber.prototype.__tryOrSetError = function(parent, fn, value) {
      try {
        fn.call(this._context, value);
      } catch (err) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      }
      return false;
    };
    SafeSubscriber.prototype._unsubscribe = function() {
      var _parent = this._parent;
      this._context = null;
      this._parent = null;
      _parent.unsubscribe();
    };
    return SafeSubscriber;
  }(Subscriber));
  return module.exports;
});

$__System.registerDynamic("b3", ["6f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  var Symbol = root_1.root.Symbol;
  exports.$$rxSubscriber = (typeof Symbol === 'function' && typeof Symbol.for === 'function') ? Symbol.for('rxSubscriber') : '@@rxSubscriber';
  return module.exports;
});

$__System.registerDynamic("b8", ["94", "b3"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Subscriber_1 = $__require('94');
  var rxSubscriber_1 = $__require('b3');
  function toSubscriber(nextOrObserver, error, complete) {
    if (nextOrObserver && typeof nextOrObserver === 'object') {
      if (nextOrObserver instanceof Subscriber_1.Subscriber) {
        return nextOrObserver;
      } else if (typeof nextOrObserver[rxSubscriber_1.$$rxSubscriber] === 'function') {
        return nextOrObserver[rxSubscriber_1.$$rxSubscriber]();
      }
    }
    return new Subscriber_1.Subscriber(nextOrObserver, error, complete);
  }
  exports.toSubscriber = toSubscriber;
  return module.exports;
});

$__System.registerDynamic("b", ["6f", "79", "b8"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  var observable_1 = $__require('79');
  var toSubscriber_1 = $__require('b8');
  var Observable = (function() {
    function Observable(subscribe) {
      this._isScalar = false;
      if (subscribe) {
        this._subscribe = subscribe;
      }
    }
    Observable.prototype.lift = function(operator) {
      var observable = new Observable();
      observable.source = this;
      observable.operator = operator;
      return observable;
    };
    Observable.prototype.subscribe = function(observerOrNext, error, complete) {
      var operator = this.operator;
      var sink = toSubscriber_1.toSubscriber(observerOrNext, error, complete);
      sink.add(operator ? operator.call(sink, this) : this._subscribe(sink));
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;
        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
      return sink;
    };
    Observable.prototype.forEach = function(next, PromiseCtor) {
      var _this = this;
      if (!PromiseCtor) {
        if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
          PromiseCtor = root_1.root.Rx.config.Promise;
        } else if (root_1.root.Promise) {
          PromiseCtor = root_1.root.Promise;
        }
      }
      if (!PromiseCtor) {
        throw new Error('no Promise impl found');
      }
      return new PromiseCtor(function(resolve, reject) {
        var subscription = _this.subscribe(function(value) {
          if (subscription) {
            try {
              next(value);
            } catch (err) {
              reject(err);
              subscription.unsubscribe();
            }
          } else {
            next(value);
          }
        }, reject, resolve);
      });
    };
    Observable.prototype._subscribe = function(subscriber) {
      return this.source.subscribe(subscriber);
    };
    Observable.prototype[observable_1.$$observable] = function() {
      return this;
    };
    Observable.create = function(subscribe) {
      return new Observable(subscribe);
    };
    return Observable;
  }());
  exports.Observable = Observable;
  return module.exports;
});

$__System.registerDynamic("6f", [], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var objectTypes = {
    'boolean': false,
    'function': true,
    'object': true,
    'number': false,
    'string': false,
    'undefined': false
  };
  exports.root = (objectTypes[typeof self] && self) || (objectTypes[typeof window] && window);
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;
  var freeGlobal = objectTypes[typeof global] && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
    exports.root = freeGlobal;
  }
  return module.exports;
});

$__System.registerDynamic("3d", ["6f"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var root_1 = $__require('6f');
  function toPromise(PromiseCtor) {
    var _this = this;
    if (!PromiseCtor) {
      if (root_1.root.Rx && root_1.root.Rx.config && root_1.root.Rx.config.Promise) {
        PromiseCtor = root_1.root.Rx.config.Promise;
      } else if (root_1.root.Promise) {
        PromiseCtor = root_1.root.Promise;
      }
    }
    if (!PromiseCtor) {
      throw new Error('no Promise impl found');
    }
    return new PromiseCtor(function(resolve, reject) {
      var value;
      _this.subscribe(function(x) {
        return value = x;
      }, function(err) {
        return reject(err);
      }, function() {
        return resolve(value);
      });
    });
  }
  exports.toPromise = toPromise;
  return module.exports;
});

$__System.registerDynamic("b9", ["b", "3d"], true, function($__require, exports, module) {
  "use strict";
  ;
  var define,
      global = this,
      GLOBAL = this;
  var Observable_1 = $__require('b');
  var toPromise_1 = $__require('3d');
  Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
  return module.exports;
});

$__System.register("9", ["63", "67", "6a", "6d", "7c", "80", "82", "85", "87", "90", "99", "9c", "9e", "a0", "a3", "a6", "a8", "aa", "ac", "ae", "b5", "b9"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  return {
    setters: [function(_1) {}, function(_2) {}, function(_3) {}, function(_4) {}, function(_5) {}, function(_6) {}, function(_7) {}, function(_8) {}, function(_9) {}, function(_10) {}, function(_11) {}, function(_12) {}, function(_13) {}, function(_14) {}, function(_15) {}, function(_16) {}, function(_17) {}, function(_18) {}, function(_19) {}, function(_20) {}, function(_21) {}, function(_22) {}],
    execute: function() {}
  };
});

$__System.register("1", ["2", "a", "3", "6", "9"], function(exports_1, context_1) {
  "use strict";
  var __moduleName = context_1 && context_1.id;
  var __extends = (this && this.__extends) || function(d, b) {
    for (var p in b)
      if (b.hasOwnProperty(p))
        d[p] = b[p];
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
  var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
        d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if (d = decorators[i])
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
  };
  var __metadata = (this && this.__metadata) || function(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
      return Reflect.metadata(k, v);
  };
  var core_1,
      index_1,
      worker_1;
  var BrowserAdapter;
  return {
    setters: [function(_1) {}, function(core_1_1) {
      core_1 = core_1_1;
    }, function(index_1_1) {
      index_1 = index_1_1;
    }, function(worker_1_1) {
      worker_1 = worker_1_1;
    }, function(_2) {}],
    execute: function() {
      BrowserAdapter = (function(_super) {
        __extends(BrowserAdapter, _super);
        function BrowserAdapter() {
          _super.apply(this, arguments);
        }
        BrowserAdapter.prototype.newRequest = function(req, init) {
          return new Request(req, init);
        };
        BrowserAdapter.prototype.newResponse = function(body) {
          return new Response(body);
        };
        BrowserAdapter = __decorate([core_1.Injectable(), __metadata('design:paramtypes', [])], BrowserAdapter);
        return BrowserAdapter;
      }(index_1.WorkerAdapter));
      core_1.ReflectiveInjector.resolveAndCreate([index_1.SW_PROVIDERS, core_1.provide(index_1.WorkerAdapter, {useClass: BrowserAdapter}), core_1.provide(index_1.WorkerScope, {useValue: (typeof self !== 'undefined') ? self : global})]).get(worker_1.ServiceWorker);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});