'use strict';

window.initializePins = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var filters = document.querySelector('.tokyo__filters');
  var closeIcon = document.querySelector('.dialog__close');
  var DATA_URL = 'https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data';
  var similarApartments = [];
  var filteredApartments = [];
  var fragment = document.createDocumentFragment();

  // Очистка карту от дефолтных пинов
  function cleanMap() {
    var pins = map.querySelectorAll('.pin');
    pins.forEach(function (i) {
      if (!i.classList.contains('pin__main')) {
        map.removeChild(i);
      }
    });
    window.showCard.closeDialog();
  }
  cleanMap();

  function renderData(array) {
    array.forEach(function (item) {
      fragment.appendChild(window.renderPin(item));
    });
    map.appendChild(fragment);
  }

  // Загружаем данныее, запоминаем и отрисовываем первые три объекта (пины)
  window.load(DATA_URL, function (data) {
    similarApartments = data;
    var firstThreeApartments = similarApartments.slice(0, 3);
    renderData(firstThreeApartments);
  });

  // Деактивировать текущий пин
  function deactivatePin() {
    var activePin = document.querySelector('.pin--active');
    if (activePin !== null) {
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
    map.querySelector('.pin--active').focus();
  }

  // Логика на закрытие диалога
  function onDialogClose() {
    deactivatePin();
    window.showCard.closeDialog();
    closeIcon.removeEventListener('keydown', onDialogClose);
  }

  function onKeyDialogClose(evt) {
    window.showCard.keyCloseDialog(evt, returnFocusToIcon);
    window.keyHandler.onEnter(deactivatePin, evt);
    closeIcon.removeEventListener('keydown', onKeyDialogClose);
  }

  // Выбрать/снять пин, закрыть диалог
  map.addEventListener('click', function (evt) {
    selectPin(evt);
    closeIcon.addEventListener('click', onDialogClose);
  });

  map.addEventListener('keydown', function (evt) {
    window.keyHandler.onEnter(selectPin, evt);
    closeIcon.addEventListener('keydown', onKeyDialogClose);
  });

  // Перерисовка пинов по изменению в фильтрах
  filters.addEventListener('change', function () {
    cleanMap();
    filteredApartments = window.filterApartments(similarApartments);
    renderData(filteredApartments);
  });
})();
