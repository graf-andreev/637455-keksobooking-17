let arrMock = [];
let mapElement = document.querySelector('.map');
mapElement.classList.remove('map--faded');

const random = (min, max) => {
  let randomNumber = Math.floor(Math.random() * (max - min)) + min;
  return randomNumber;
};

const generateMock = () => {
  arrMock = [];
  let arrHouse = ['palace', 'flat', 'house', 'bungalo'];
  let obj = {}
  for (let i = 1; i < 9; i++) {
    obj = {
      'author': {
        'avatar': ''
      },
      'offer': {
        'type': ''
      },
      'location': {
        'x': 0,
        'y': 0,
      },
    }
    obj.author.avatar = `img/avatars/user0${i}.png`;
    obj.offer.type = arrHouse[random(0, 4)];
    obj.location.x = random(0, 1200);
    obj.location.y = random(130, 630);
    arrMock.push(obj)
  }
  return arrMock
}; generateMock();

const renderMaps = (data) => {
  console.log(data);
  for (let key in data) {
    let html = `<button type="button" class="map__pin" style="left:${data[key].location.x}px; top: ${data[key].location.y}px;"><img src=${data[key].author.avatar}
            width="40" height="40" draggable="false" alt="${data[key].offer.type}"></button>`;
    mapElement.innerHTML += html;
  }
}; renderMaps(arrMock)
