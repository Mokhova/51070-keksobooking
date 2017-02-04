'use strict';

var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var type = document.querySelector('#type');
var timeIn = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');

// Ограничения полей
var formTitle = document.querySelector('#title');
formTitle.required = true;
formTitle.minLength = 30;
formTitle.maxLength = 100;

var price = document.querySelector('#price');
price.required = true;
price.min = 1000;
price.max = 10000;

document.querySelector('#address').required = true;

// Деактивировать текущий пин
function deactivatePin() {
  if (document.querySelector('.pin--active')) {
    document.querySelector('.pin--active').classList.remove('pin--active');
  }
}

// Выбор пина через делегирование событий
function selectPin(evt) {
  var target = evt.target;
  while (target !== map) {
    if (target.classList.contains('pin')) {
      deactivatePin();
      target.classList.add('pin--active');
      return;
    }
    target = target.parentNode;
  }
}

document.querySelector('.dialog__close').addEventListener('click', function () {
  dialog.classList.add('closed');
  deactivatePin();
});

map.addEventListener('click', function (evt) {
  selectPin(evt);
  dialog.classList.remove('closed');
});

// Синк разных значений в форме
function addChangeEvent(element, callback) {
  element.addEventListener('change', callback);
}

function syncTime(evt) {
  timeIn.value = timeOut.value = evt.currentTarget.value;
}
addChangeEvent(timeIn, syncTime);
addChangeEvent(timeOut, syncTime);

function syncPriceType(evt) {
  var target = evt.currentTarget;
  if (target.value === '1000' || target.value === 'Квартира') {
    price.value = 1000;
    type.value = 'Квартира';
  }
  if (target.value === '0' || target.value === 'Лачуга') {
    price.value = 0;
    type.value = 'Лачуга';
  }
  if (target.value === '10000' || target.value === 'Дворец') {
    price.value = 10000;
    type.value = 'Дворец';
  }
}

addChangeEvent(type, syncPriceType);
addChangeEvent(price, syncPriceType);

function syncCapacityRoomNumber(evt) {
  var target = evt.currentTarget;
  if (target.value === '1' || target.value === 'не для гостей') {
    roomNumber.value = 1;
    capacity.value = 'не для гостей';
  }
  if (target.value === '2' || target.value === 'для 3 гостей') {
    roomNumber.value = 2;
    capacity.value = 'для 3 гостей';
  }
  if (target.value === '100') {
    roomNumber.value = 100;
    capacity.value = 'для 3 гостей';
  }
}
addChangeEvent(roomNumber, syncCapacityRoomNumber);
addChangeEvent(capacity, syncCapacityRoomNumber);
