'use strict';

window.showCard = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var templateElement = document.querySelector('#dialog-template');
  var dialogToClone = templateElement.content.querySelector('.dialog');
  var newDialog = dialogToClone.cloneNode(true);
  // var closeIcon = newDialog.querySelector('.dialog__close');
  var dialogTitle = newDialog.querySelector('.lodge__title');
  var dialogAddress = newDialog.querySelector('.lodge__address');
  var dialogPrice = newDialog.querySelector('.lodge__price');
  var dialogType = newDialog.querySelector('.lodge__type');
  var dialogRoomsGuests = newDialog.querySelector('.lodge__rooms-and-guests');
  var dialogCheckInOut = newDialog.querySelector('.lodge__checkin-time');
  var dialogFeatures = newDialog.querySelector('.lodge__features');
  var dialogDescription = newDialog.querySelector('.lodge__description');
  var dialogPhotos = newDialog.querySelector('.lodge__photos');
  var returnFocus;

  // Проверяем, является ли переменна функцией
  function callReturnFocus() {
    if (typeof returnFocus === 'function') {
      returnFocus();
    }
  }

  // Отрисовка диайлога в зависимости от данных
  function openDialog(itemData) {
    newDialog.data = itemData;
    newDialog.classList.remove('closed');

    dialogTitle.innerHTML = itemData.offer.title;
    dialogAddress.innerHTML = itemData.offer.address;
    dialogPrice.innerHTML = itemData.offer.price + '₽ / ночь';
    dialogType.innerHTML = itemData.offer.type;
    dialogRoomsGuests.innerHTML = itemData.offer.rooms + ' комнат для ' + itemData.offer.guests + ' гостей ';
    dialogCheckInOut.innerHTML = 'Заезд после ' + itemData.offer.checkin + ', выезд до ' + itemData.offer.checkout;
    dialogDescription.innerHTML = itemData.offer.description;

    // Сначала удаляем все шаблонные фичи и создаем только те фичи, которые пришли json
    dialogFeatures.innerHTML = '';
    itemData.offer.features.forEach(function (i) {
      var feature = document.createElement('span');
      feature.classList.add('feature__image');
      feature.classList.add('feature__image--' + i);
      dialogFeatures.appendChild(feature);
    });

    // Сначала удаляем все шаблонные фотки и создаем только те фотки, которые пришли в json
    dialogPhotos.innerHTML = '';
    itemData.offer.photos.forEach(function (i) {
      var photo = document.createElement('img');
      photo.alt = 'Lodge photo';
      photo.width = '52';
      photo.height = '42';
      photo.src = i;
      dialogPhotos.appendChild(photo);
    });

    map.appendChild(newDialog);
  }

  return {
    openDialog: openDialog,

    closeDialog: function () {
      newDialog.classList.add('closed');
    },

    keyCloseDialog: function (evt) {
      window.keyHandler.onEnter(window.showCard.closeDialog, evt);
      callReturnFocus();
    }
  };

})();
