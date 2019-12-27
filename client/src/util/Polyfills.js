/* eslint-disable */
//Polyfill:
//#[].forEach
(function() {
  var o = [];
  if ('function' !== typeof o.forEach) {
    o.constructor.prototype.forEach = function(callback, thisArg) {
      if ('function' !== typeof callback) {
        throw new TypeError(callback + ' is not a function!');
      } else {
        if ('undefined' !== typeof thisArg) {
          for (
            var e = thisArg, f = callback, i = 0, m = this;
            i < m.length;
            ++i
          ) {
            f.call(e, m[i], i, m);
          }
        } else {
          for (var f = callback, i = 0, m = this; i < m.length; ++i) {
            f(m[i], i, m);
          }
        }
      }
    };
  }
})();
