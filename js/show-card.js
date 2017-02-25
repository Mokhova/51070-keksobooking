'use strict';

window.showCard = (function () {
  var map = document.querySelector('.tokyo__pin-map');
  var dialog = document.querySelector('.dialog');
  var dialogTitle = dialog.querySelector('.lodge__title');
  var dialogAddress = dialog.querySelector('.lodge__address');
  var dialogPrice = dialog.querySelector('.lodge__price');
  var dialogType = dialog.querySelector('.lodge__type');
  var dialogRoomsGuests = dialog.querySelector('.lodge__rooms-and-guests');
  var dialogCheckInOut = dialog.querySelector('.lodge__checkin-time');
  var dialogFeatures = dialog.querySelector('.lodge__features');
  var dialogDescription = dialog.querySelector('.lodge__description');
  var dialogPhotos = dialog.querySelector('.lodge__photos');

  // Отрисовка диайлога в зависимости от данных
  function openDialog(itemData) {
    dialog.classList.remove('closed');

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
  }

  return {
    openDialog: function (itemData) {
      openDialog(itemData);
    },

    closeDialog: function () {
      dialog.classList.add('closed');
    },

    keyCloseDialog: function(evt, cb) {
      window.keyHandler.onEnter(window.showCard.closeDialog, evt);
      if(typeof cb === 'function') {
        cb();
      }
    }
  };
})();
