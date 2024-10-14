'use strict';
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addBtn = document.querySelector('.addBtn');

//Behaviour on clicking Add button
addBtn.addEventListener('click', () => {
  if (inputBox.value === '') {
    alert('You must write something!');
  } else {
    let li = document.createElement('li');
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement('span');
    span.innerHTML = '\u00d7';
    li.appendChild(span);
  }
  inputBox.value = '';
  saveData();
});

//Behaviour on clicking the added task
listContainer.addEventListener(
  'click',
  e => {
    if (e.target.tagName === 'LI') {
      e.target.classList.toggle('checked');
      saveData();
    } else if (e.target.tagName === 'SPAN') {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

//Saving data even after refresh
function saveData() {
  localStorage.setItem('data', listContainer.innerHTML);
}

//Displaying the saved item
function showTask() {
  listContainer.innerHTML = localStorage.getItem('data');
}

showTask();
