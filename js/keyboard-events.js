'use strict';

window.keyHandler = (function () {
  var ENTER_KEY_CODE = 13;

  return {
    // Проверяем нажатие на enter
    pressedEnterKey: function (evt) {
      return evt.target && evt.keyCode === ENTER_KEY_CODE;
    },

    // По ентеру совершаем действия
    // onEnter: function (actionWithEvt, actionNoEvt, evt) {
    //   if (window.keyHandler.pressedEnterKey(evt)) {
    //     actionWithEvt(evt);
    //     if (actionNoEvt) {
    //       actionNoEvt();
    //     }
    //   }
    // },

    onEnter: function (action, evt) {
      if (window.keyHandler.pressedEnterKey(evt)) {
        action(evt);
      }
    },

    // Меняем атбрибут aria-pressed для роли «кнопка»
    toggleARIAPressed: function (elementClass) {
      var element = document.querySelector(elementClass);
      if (element) {
        var pressed = (element.getAttribute('aria-pressed') === 'true');
        element.setAttribute('aria-pressed', !pressed);
      }
    },

    // Меняем aria-label
    toggleAriaLabel: function (element, string) {
      element.setAttribute('aria-label', string);
    }
  };
})();
