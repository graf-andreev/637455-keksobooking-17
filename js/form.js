'use strict';

(function(){

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
})();
