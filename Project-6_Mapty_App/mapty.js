'use strict';
// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;
//Getting Current Position
navigator.geolocation.getCurrentPosition(
  position => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    //Display the map using 3rd party Library(Leaflet)
    //Below code is copypasted from the Leaflet website
    map = L.map('map').setView(coords, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //This 'on' method is only available on 'map' object provided by Leaflet library. 'on' is not of JS
    //Handling clicks on Map
    map.on('click', mapE => {
      mapEvent = mapE;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  },
  () => {
    alert(`Couldn't get your current location`);
  }
); // It takes two callbacks first the successCase & second the failureCase

//Implementing submit form using by trigerring enter key
form.addEventListener('submit', e => {
  e.preventDefault();
  //Clear input fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';
  const { lat, lng } = mapEvent.latlng;
  //The below code structure is provided by the leaflet Library
  //Display marker
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

// Implementing switch of forms between running & cycling
inputType.addEventListener('change', () => {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
