'use strict';

var ENTER_KEY_CODE = 13;

// По ентеру совершаем действия
window.onEnter = function (actionWithEvt, actionNoEvt, evt) {
  if (window.pressedEnterKey(evt)) {
    actionWithEvt(evt);
    if (actionNoEvt) {
      actionNoEvt();
    }
  }
};

// Проверяем нажатие на enter
window.pressedEnterKey = function (evt) {
  return evt.target && evt.keyCode === ENTER_KEY_CODE;
};

// Меняем атбрибут aria-pressed для роли «кнопка»
window.toggleARIAPressed = function (elementClass) {
  var element = document.querySelector(elementClass);
  if (element) {
    var pressed = (element.getAttribute('aria-pressed') === 'true');
    element.setAttribute('aria-pressed', !pressed);
  }
};

// Меняем aria-label
window.toggleAriaLabel = function (element, string) {
  element.setAttribute('aria-label', string);
};
