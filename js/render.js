'use strict';

window.render = (function () {
  var templateElement = document.querySelector('#pin-template');
  var pinToClone = templateElement.content.querySelector('.pin');

  return function (data) {
    var newPin = pinToClone.cloneNode(true);
    var pinAvatar = newPin.querySelector('img.rounded');
    pinAvatar.src = data.author.avatar;
    newPin.style.left = data.location.x + 'px';
    newPin.style.top = data.location.y + 'px';
    newPin.setAttribute('tabindex', 1);
    return newPin;
  };
})();
