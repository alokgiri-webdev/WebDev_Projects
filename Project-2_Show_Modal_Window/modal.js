'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnShowModal = document.querySelectorAll('.show-modal');
const btnCloseModal = document.querySelector('.close-modal');

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

btnShowModal.forEach(showModalbtn => {
  showModalbtn.addEventListener('click', openModal);
});

function reset() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnCloseModal.addEventListener('click', reset);
overlay.addEventListener('click', reset);
