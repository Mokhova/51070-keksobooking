'use strict';

(function () {
  var type = document.querySelector('#type');
  var timeIn = document.querySelector('#time');
  var timeOut = document.querySelector('#timeout');
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');
  var priceTypeValues = ['1000', '0', '10000'];
  var timeValues = ['12', '13', '14'];
  var roomNumberValues = ['1', '2', '100'];
  var capacityValues = ['0', '3', '3'];

  // Ограничения полей
  var formTitle = document.querySelector('#title');
  formTitle.required = true;
  formTitle.minLength = 30;
  formTitle.maxLength = 100;

  var price = document.querySelector('#price');
  price.required = true;
  price.min = 1000;
  price.max = 10000;

  var address = document.querySelector('#address');
  address.required = true;
  address.readOnly = true;

  function syncValue(element, value) {
    element.value = value;
  }

  function syncValueWithMin(element, value) {
    element.min = value;
  }

  function syncValueWithPlaceholder(element, value) {
    element.placeholder = value;
  }

  window.synchronizeFields(roomNumber, capacity, roomNumberValues, capacityValues, syncValue);
  window.synchronizeFields(capacity, roomNumber, capacityValues, roomNumberValues, syncValue);
  window.synchronizeFields(timeIn, timeOut, timeValues, timeValues, syncValue);
  window.synchronizeFields(timeOut, timeIn, timeValues, timeValues, syncValue);
  window.synchronizeFields(type, price, priceTypeValues, priceTypeValues, syncValueWithMin);
  window.synchronizeFields(type, price, priceTypeValues, priceTypeValues, syncValueWithPlaceholder);
})();
