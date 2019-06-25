'use strict';

//declare variables

var mapPins = document.querySelector('.map__pins');
var pinMain = document.querySelector('.map__pin--main');
var typeOfBooking = ['palace', 'flat', 'house', 'bungalo'];
var pinsArray = [];
var imagesArray = [];

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

function init(){
for (var j = 0; j < imagesArray.length; j++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + pinsArray[j].location.x + 'px; top: ' + pinsArray[j].location.y + 'px;';
  var pinImg = pinElement.querySelector('img');
  pinImg.src = pinsArray[j].author.avatar;
  pinElement.alt = 'Заголовок объявления';
  mapPins.appendChild(pinElement);
}
}

init()

// click to active 

var onClickActivate = function () {
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

//set adress attr
var setAttr = function(){
var address = document.querySelector('#address');
var pinMainTop = document.querySelector('.map__pin--main').style.top;
var pinMainLeft = document.querySelector('.map__pin--main').style.left;
address.setAttribute('value', pinMainLeft + ', ' + pinMainTop);
};

setAttr()

pinMain.addEventListener('click', function(){
  onClickActivate()
  });
