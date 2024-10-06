'use strict';
//Selecting all important classes
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

//Creating Function for Opening the Modal
function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

btnShowModal.forEach(showModalbtn => {
  showModalbtn.addEventListener('click', openModal);
});

//Creating Function for reseting the project manipulating virtual keys
function reset() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', reset);
overlay.addEventListener('click', reset);

//Reseting the project manipulating actual key(Escape)
document.addEventListener('keydown', keyEvent => {
  if (keyEvent.key === 'Escape' && !modal.classList.contains('hidden')) {
    reset();
  }
});
