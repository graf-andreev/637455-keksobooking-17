'use strict';

//declare variables

var mapPins = document.querySelector('.map__pins');
var pinMain = document.querySelector('.map__pin--main');
var typeOfBooking = ['palace', 'flat', 'house', 'bungalo'];
var pinsArray = [];
var imagesArray = [];

var map = document.querySelector('.map');
var widthMainPin= 65;
var heightMainPin = 80;
var Limits = {
  limitTop: 130 - heightMainPin,
  limitRight: map.offsetWidth - widthMainPin,
  limitBottom: 630 - heightMainPin,
  limitLeft: 0
};

//random numbers for style.css

var randomNumber = function (min, max) {
  var random = Math.round(Math.random() * (max - min) + min);
  return random;
};

//main function creating array

var getPin = function (n) {
  var singlePin = {
    'author': {
      'avatar': 'img/avatars/user0' + imagesArray[n] + '.png'
    },

    'offer': {
      'typeOfBooking': typeOfBooking[randomNumber(0, 3)]
    },

    'location': {
      'x': randomNumber(0, mapPins.offsetWidth),
      'y': randomNumber(130, 630)
    }
  };
  return singlePin;
};

for (var i = 0; i < 8; i++) {
 imagesArray.push(i + 1);
 pinsArray.push(getPin(i));
}

//add pins to page

var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('button');

function addPinsToPage(){
for (var j = 0; j < imagesArray.length; j++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinsArray[j].location.x + 'px; top: ' + pinsArray[j].location.y + 'px;';
  var pinImg = pinElement.querySelector('img');
  pinImg.src = pinsArray[j].author.avatar;
  pinElement.alt = 'Заголовок объявления';
  mapPins.appendChild(pinElement);
}
}

// click to active 

var onMouseActivate = function () {
  var adForm = document.querySelector('.ad-form');
  var mainMap = document.querySelector('.map');
  adForm.classList.remove('ad-form--disabled');
  mainMap.classList.remove('map--faded');
}

//get pseudo array, remove attributes

var adFormInput = document.querySelectorAll('.ad-form input');
  for (var i = 0; i < adFormInput.length; i++) {
    adFormInput[i].removeAttribute('disabled');
  }

  var adFormSelect = document.querySelectorAll('.ad-form select');
  for (i = 0; i < adFormSelect.length; i++) {
    adFormSelect[i].removeAttribute('disabled');
  }

// change placeholder value

var adForm = document.querySelector('.ad-form'); 
var typeOfHousing = adForm.querySelector('#type');
var priceInput = adForm.querySelector('#price');

var changePlaceholder = function (value) {
  if (value == 'bungalo') {
    priceInput.placeholder = 0;
    priceInput.min = 0;
  } else if (value == 'flat') {
    priceInput.placeholder = 1000;
    priceInput.min = 1000;
  } else if (value == 'house') {
    priceInput.placeholder = 5000;
    priceInput.min = 5000;
  } else if (value == 'palace') {
    priceInput.placeholder = 10000;
    priceInput.min = 10000;
  }
};

typeOfHousing.addEventListener('change', function (evt) {
  changePlaceholder(evt.target.value);
});

// checkIn - checkOut Inputs

var checkInTime = adForm.querySelector('#timein');
var checkOutTime = adForm.querySelector('#timeout');

var changeCheckInTime = function (opt, index) {
  opt.selectedOptions[0].selected = false;
  opt.options[index].selected = true;
};

checkInTime.addEventListener('change', function (evt) {
  changeCheckInTime(checkOutTime, evt.target.selectedIndex);
});

checkOutTime.addEventListener('change', function (evt) {
  changeCheckInTime(checkInTime, evt.target.selectedIndex);
});

// drag and drop

pinMain.addEventListener('mousedown', function(evt){
  evt.preventDefault();
  onMouseActivate();
  addPinsToPage()

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };
    
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.left = Math.max(Math.min((pinMain.offsetLeft - shift.x), Limits.limitRight), Limits.limitLeft) + 'px';
    pinMain.style.top = Math.max(Math.min((pinMain.offsetTop - shift.y), Limits.limitBottom), Limits.limitTop) + 'px';

  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    var address = document.querySelector('#address');
    var pinMainTop = document.querySelector('.map__pin--main').style.top;
    var pinMainLeft = document.querySelector('.map__pin--main').style.left;
    address.setAttribute('value', pinMainLeft + ', ' + pinMainTop);


  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
