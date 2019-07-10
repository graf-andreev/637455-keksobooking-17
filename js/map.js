'use strict';

(function(){

    var pinMain = document.querySelector('.map__pin--main');  
    var map = document.querySelector('.map');
    var widthMainPin= 65;
    var heightMainPin = 80;
    var Limits = {
      limitTop: 130 - heightMainPin,
      limitRight: map.offsetWidth - widthMainPin,
      limitBottom: 700 - heightMainPin,
      limitLeft: 0
    };
       
    // activate all
    
    window.onMouseActivate = function () {
      var adForm = document.querySelector('.ad-form');
      var mainMap = document.querySelector('.map');
      adForm.classList.remove('ad-form--disabled');
      mainMap.classList.remove('map--faded');
    }

    // drag and drop
    
    pinMain.addEventListener('mousedown', function(evt){
      evt.preventDefault();
      onMouseActivate();
      addPinsToPage();
    
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
    
    
  
})();