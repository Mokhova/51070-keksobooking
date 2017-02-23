'use strict';

window.showCard = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var closeIcon = document.querySelector('.dialog__close');
  var returnFocus;

  function callReturnFocus() {
    if (typeof returnFocus === 'function') {
      returnFocus();
    }
  }

  // Открытие карточки
  function openDialog() {
    dialog.classList.remove('closed');
  }

  function closeDialog() {
    dialog.classList.add('closed');
  }

  function keyCloseDialog(evt) {
    window.keyHandler.onEnter(closeDialog, evt);
    callReturnFocus();
  }

  return function (cb) {
    returnFocus = cb;

    // Открытие/закрытие по клику
    map.addEventListener('click', function (evt) {
      openDialog();
    });

    closeIcon.addEventListener('click', closeDialog);

    // Открытие/закрытие по ентеру
    map.addEventListener('keydown', function (evt) {
      window.keyHandler.onEnter(openDialog, evt);
    });

    closeIcon.addEventListener('keydown', keyCloseDialog);
  };

})();
