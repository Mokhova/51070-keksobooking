'use strict';

var map = document.querySelector('.tokyo__pin-map');
var dialog = document.querySelector('.dialog');
var type = document.querySelector('#type');
var timeIn = document.querySelector('#time');
var timeOut = document.querySelector('#timeout');
var capacity = document.querySelector('#capacity');
var roomNumber = document.querySelector('#room_number');
var ENTER_KEY_CODE = 13;

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
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.setAttribute('aria-label', 'Объявление на карте'); // Поменять ARIA-LABEL
    toggleARIAPressed();
    activePin.classList.remove('pin--active');
  }
}

// Выбор пина через делегирование событий
function selectPin(evt) {
  var target = evt.target;
  while (target !== map) {
    if (target.classList.contains('pin')) {
      deactivatePin();
      target.classList.add('pin--active');
      toggleARIAPressed();
      target.setAttribute('aria-label', 'Выбранное объявление на карте'); // Поменять ARIA-LABEL
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

// Проверяем нажатие на enter
function pressedEnterKey(evt) {
  return evt.target && evt.keyCode === ENTER_KEY_CODE;
}

// Переключение пинов с клавиатуры
map.addEventListener('keydown', function (evt) {
  if (pressedEnterKey(evt)) {
    selectPin(evt);
    dialog.classList.remove('closed');
  }
});

// Меняю ARIA-атрибут pressed у кнопок
function toggleARIAPressed() {
  var activePinARIA = map.querySelector('.pin--active');
  if (activePinARIA) {
    var pressed = (activePinARIA.getAttribute('aria-pressed') === 'true');
    activePinARIA.setAttribute('aria-pressed', !pressed);
  }
}

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
