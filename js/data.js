'use strict';

(function () {
    var mapPins = document.querySelector('.map__pins');
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
      
      window.addPinsToPage = function (){
      for (var j = 0; j < imagesArray.length; j++) {
        var pinElement = pinTemplate.cloneNode(true);
        pinElement.style = 'left: ' + pinsArray[j].location.x + 'px; top: ' + pinsArray[j].location.y + 'px;';
        var pinImg = pinElement.querySelector('img');
        pinImg.src = pinsArray[j].author.avatar;
        pinElement.alt = 'Заголовок объявления';
        mapPins.appendChild(pinElement);
      }
      }
})();