'use strict';

window.load = (function () {

  // Обработка ошибок
  // var errorHandler = function (error) {
  //   return error;
  // };
  //
  // return function (DATA_URL, onLoad, onError) {
  //   var xhr = new XMLHttpRequest();
  //
  //   if (typeof onError === 'function') {
  //     errorHandler = onError;
  //   }
  //
  //   xhr.addEventListener('load', function (evt) {
  //     if (evt.target.status >= 200 && evt.target.status < 400) {
  //       onLoad(evt.target.response);
  //     } else {
  //       errorHandler(xhr.status + ': ' + xhr.statusText);
  //     }
  //   });
  //
  //   xhr.addEventListener('error', errorHandler);
  //   xhr.addEventListener('timeout', errorHandler);
  //
  //   xhr.responseType = 'json';
  //   xhr.open('GET', DATA_URL);
  //   xhr.send();
  // };

  return function (url, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function (evt) {
      onLoad(evt.target.response);
    });
    xhr.responseType = 'json';
    xhr.open('GET', url);
    xhr.send();
  };
})();
