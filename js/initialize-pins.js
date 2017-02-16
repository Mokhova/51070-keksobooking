'use strict';

window.initializePins = function () {
  var map = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var closeIcon = document.querySelector('.dialog__close');

  // Деактивировать текущий пин
  function deactivatePin() {
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      window.toggleAriaLabel(activePin, 'Объявление на карте');
      window.toggleARIAPressed('.pin--active');
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
        window.toggleARIAPressed('.pin--active');
        window.toggleAriaLabel(target, 'Выбранное объявление на карте');
        return;
      }
      target = target.parentNode;
    }
  }

  // Открытие карточки
  function openDialog() {
    dialog.classList.remove('closed');
  }

  function closeDialog() {
    dialog.classList.add('closed');
  }

  // Закрытие диалога по крестику по клику и энтеру
  closeIcon.addEventListener('click', function () {
    closeDialog();
    deactivatePin();
  });

  closeIcon.addEventListener('keydown', function (evt) {
    window.onEnter(closeDialog, deactivatePin, evt);
  });

  // Выбор пина по клику и энтеру
  map.addEventListener('click', function (evt) {
    selectPin(evt);
    openDialog();
  });

  map.addEventListener('keydown', function (evt) {
    window.onEnter(selectPin, openDialog, evt);
  });
};
