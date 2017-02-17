'use strict';

window.synchronizeFields = function (element1, element2, array1, array2, attribute) {
  element1.addEventListener('change', function () {
    var indexOfValue = array1.indexOf(element1.value);
    element2[attribute] = array2[indexOfValue];
    window.changeInputPlaceholder(element2, array2[indexOfValue]);
  });

  element2.addEventListener('change', function () {
    var indexOfValue = array2.indexOf(element2.value);
    element1[attribute] = array1[indexOfValue];
  });
};


window.changeInputPlaceholder = function (element, value) {
  if (element.tagName === 'INPUT') {
    element.placeholder = value;
  }
};