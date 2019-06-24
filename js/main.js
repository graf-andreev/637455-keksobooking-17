'use strict';

//declare variables

var mapPins = document.querySelector('.map__pins');
var typeOfBooking = ['palace', 'flat', 'house', 'bungalo'];
var pinsArray = [];
var imagesArray = [];

//random numbers for style

var randomNumber = function (min, max) {
  var random = Math.round(Math.random() * (max - min) + min);
  return random;
};

//main function creat array

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

document.querySelector('.map').classList.remove('map--faded');

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

window.onload = init()
