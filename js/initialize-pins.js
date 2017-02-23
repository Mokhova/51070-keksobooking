'use strict';

window.initializePins = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var closeIcon = document.querySelector('.dialog__close');

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
      if (target.classList.contains('pin')) {
        deactivatePin();
        target.classList.add('pin--active');
        window.keyHandler.toggleARIAPressed('.pin--active');
        window.keyHandler.toggleAriaLabel(target, 'Выбранное объявление на карте');
        return;
      }
      target = target.parentNode;
    }
  }

  // Функция возвращения фокуса на активный пин
  function returnFocusToIcon() {
    document.querySelector('.pin--active').focus();
  }

  window.showCard(returnFocusToIcon);


  // Выбрать/снять пин по клику
  closeIcon.addEventListener('click', function () {
    deactivatePin();
  });

  map.addEventListener('click', function (evt) {
    selectPin(evt);
  });

  // Выбрать/снять пин по ентеру
  closeIcon.addEventListener('keydown', function (evt) {
    window.keyHandler.onEnter(deactivatePin, evt);
  });

  map.addEventListener('keydown', function (evt) {
    window.keyHandler.onEnter(selectPin, evt);
  });

})();
