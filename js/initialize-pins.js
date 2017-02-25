'use strict';

window.initializePins = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var closeIcon = document.querySelector('.dialog__close');
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
  var fragment = document.createDocumentFragment();

  // Очистим карту от дефолтных пинов
  function cleanMap() {
    var pins = map.querySelectorAll('.pin');
    pins.forEach(function (i) {
      if (!i.classList.contains('pin__main')) {
        map.removeChild(i);
      }
    });
  }
  cleanMap();

  // Загружаем данныее, запоминаем и отрисовываем первые три объекта (пины)
  window.load(DATA_URL, function (data) {
    similarApartments = data;
    var firstThreeApartments = similarApartments.slice(0, 3);
    firstThreeApartments.forEach(function (i) {
      fragment.appendChild(window.renderPin(i));
    });
    map.appendChild(fragment);
  });


  // Деактивировать текущий пин
  function deactivatePin() {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      window.keyHandler.toggleAriaLabel(activePin, 'Объявление на карте');
      window.keyHandler.toggleARIAPressed('.pin--active');
      activePin.classList.remove('pin--active');
    }
  }

  // Выбор пина через делегирование событий
  function selectPin(evt) {
    var target = evt.target;
    while (target !== map) {
      if (target.classList.contains('pin') && !target.classList.contains('pin__main')) {
        deactivatePin();
        target.classList.add('pin--active');
        window.keyHandler.toggleARIAPressed('.pin--active');
        window.keyHandler.toggleAriaLabel(target, 'Выбранное объявление на карте');
        window.showCard.openDialog(target.data);
        return;
      }
      target = target.parentNode;
    }
  }

  // Функция возвращения фокуса на активный пин
  function returnFocusToIcon() {
    document.querySelector('.pin--active').focus();
  }

  map.addEventListener('click', function (evt) {
    selectPin(evt);
  });

  map.addEventListener('keydown', function (evt) {
    window.keyHandler.onEnter(selectPin, evt);
  });

  // Выбрать/снять пин по ентеру
  closeIcon.addEventListener('keydown', function (evt) {
    window.showCard.keyCloseDialog(evt, returnFocusToIcon);
    window.keyHandler.onEnter(deactivatePin, evt);
  });

  // Выбрать/снять пин по клику
  closeIcon.addEventListener('click', function () {
    deactivatePin();
    window.showCard.closeDialog();
  });
})();
