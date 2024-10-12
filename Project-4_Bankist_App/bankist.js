'use strict';
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Welcome & Login Selectors
const welcome = document.querySelector('.welcome');
const logo = document.querySelector('.logo');
const login = document.querySelector('.login');
const loginInput = document.querySelectorAll('.login__input');
const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');

// APP-Balance selectors
const app = document.querySelector('.app');
const balance = document.querySelector('.balance');
const currentBalance = document.querySelector('.balance__label');
const dateBalance = document.querySelector('.date');
const valueBalance = document.querySelector('.balance__value');

//APP-Movements selectors
const containerMovements = document.querySelector('.movements');
const movementsRow = document.querySelectorAll('.movements__row');
const movementsType = document.querySelectorAll('.movements__type');
const movementsTypeDeposit = document.querySelector(
  '.movements__type--deposit'
);
const movementsTypeWithdrawal = document.querySelector(
  '.movements__type--withdrawal'
);
const movementsDate = document.querySelector('.movements__date');
const movementsValue = document.querySelector('.movements__value');

//APP-Summary selectors
const summary = document.querySelector('.summary');
const summaryLabel = document.querySelectorAll('.summary__label');
const summaryValue = document.querySelectorAll('.summary__value');
const summaryValueIn = document.querySelector('.summary__value--in');
const summaryValueOut = document.querySelector('.summary__value--out');
const summaryValueInterest = document.querySelector(
  '.summary__value--interest'
);
const sortBtn = document.querySelector('.btn--sort');

//APP-Operations:Transfers selectors
const operation = document.querySelector('.operation');
const operationTransfer = document.querySelector('.operation--transfer');
const form = document.querySelectorAll('.form');
const formTransfer = document.querySelector('.form--transfer');
const formInput = document.querySelectorAll('.form__input');
const formInputTo = document.querySelector('.form__input--to');
const formInputAmount = document.querySelector('.form__input--amount');
const formBtn = document.querySelectorAll('.form__btn');
const formTransferBtn = document.querySelector('.form__btn--transfer');
const formLabel = document.querySelector('.form__labe');

//APP-Operations:Loan selectors
const operationLoan = document.querySelector('.operation--loan');
const formLoan = document.querySelector('.form--loan');
const formInputLoan = document.querySelector('.form__input--loan-amount');
const formLoanBtn = document.querySelector('.form__btn--loan');
const formLabelLoan = document.querySelector('.form__label--loan');

//APP-Operations:Close selectors
const operationClose = document.querySelector('.operation--close');
const formClose = document.querySelector('.form--close');
const formInputUser = document.querySelector('.form__input--user');
const formInputPin = document.querySelector('.form__input--pin');
const formCloseBtn = document.querySelector('.form__btn--close');
const logoutTimer = document.querySelector('.logout-timer');
const timer = document.querySelector('.timer');

//Implementing Current Balance Date
//const date = new Date();
function displayDate(date, dateSelector) {
  const day = `${date.getDate()}`.padStart(2, 0);
  const month = `${date.getMonth() + 1}`.padStart(2, 0);
  const year = date.getFullYear();
  const hour = `${date.getHours()}`.padStart(2, 0);
  const minute = `${date.getMinutes()}`.padStart(2, 0);
  dateSelector.textContent = `${day}/${month}/${year}, ${hour}:${minute}`;
}

//Internationalization API for Current Balance Date and others
function internationalizationDate(date, dateSelector) {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    weekday: 'long',
  };
  const locale = navigator.language;
  dateSelector.textContent = new Intl.DateTimeFormat(locale, options).format(
    date
  );
}

// Internationalization of Numbers
function internationalizationNumbers(mov) {
  const locale = 'en-IN';
  const options = {
    style: 'currency',
    currency: 'INR',
  };
  const formattedMov = new Intl.NumberFormat(locale, options).format(mov);
  return formattedMov;
}

//Display deposit/withdrawal movements
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = ''; // Deleting the previous data when calling the new one
  //Implementing sorting of movements
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${internationalizationNumbers(
            mov
          )}</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  //Calculating & displaying the Current balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  valueBalance.textContent = `${internationalizationNumbers(acc.balance)}`;

  //Calculating & displaying Summary
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueIn.textContent = `${internationalizationNumbers(incomes)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueOut.textContent = `${internationalizationNumbers(Math.abs(out))}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  summaryValueInterest.textContent = `${internationalizationNumbers(interest)}`;
};

//Implementing sort btn
let sorted = false;
sortBtn.addEventListener('click', e => {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

//Creating userName function
const createUserName = function (accs) {
  accs.forEach(
    acc =>
      (acc.userName = acc.owner
        .toLowerCase()
        .split(' ')
        .map(name => name.at(0))
        .join(''))
  );
};
createUserName(accounts);

//Run Logout Timer
const startLogoutTimer = () => {
  // Set time to 5 mins
  let time = 10;

  const tick = () => {
    const min = String(Math.floor(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    timer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and logout user
    if (time === 0) {
      clearInterval(timerOfLogout);
      welcome.textContent = `Log in to get started`;
      app.style.opacity = 0;
    }

    //Decrease 1s
    time--;
  };

  // Call the timer every 1 second
  tick();
  const timerOfLogout = setInterval(tick, 1000);

  return timerOfLogout;
};

// Setting up login with right credentials
let currentAccount, timerOfLogout;

loginBtn.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === loginInputUser.value);
  if (currentAccount?.pin === +loginInputPin.value) {
    //Display UI and Welcome Message
    welcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    app.style.opacity = 100;
    //Display Current Balnce Date
    const date = new Date();
    internationalizationDate(date, dateBalance);

    //Clear input fields
    loginInputUser.value = loginInputPin.value = '';
    loginInputPin.blur();

    //Calling LogoutTimer
    if (timerOfLogout) clearInterval(timerOfLogout);
    timerOfLogout = startLogoutTimer();

    //Display UI
    displayMovements(currentAccount);
  }
});

//Implementing Transfers
formTransferBtn.addEventListener('click', e => {
  e.preventDefault();
  const amount = +formInputAmount.value;
  const receiverAcc = accounts.find(acc => acc.userName === formInputTo.value);

  //checking conditions before transfer
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.userName !== currentAccount.userName
  ) {
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //Updating the UI
    displayMovements(currentAccount);

    // Reset Timer
    clearInterval(timerOfLogout);
    timerOfLogout = startLogoutTimer();

    //Clearing the input fields
    formInputTo.value = formInputAmount.value = '';
    formInputAmount.blur();
  }
});

//Requesting Loan
formLoanBtn.addEventListener('click', e => {
  e.preventDefault();
  const amount = Math.floor(+formInputLoan.value);

  //Checking the condition for requested loan
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(() => {
      //Add movement
      currentAccount.movements.push(amount);
      //Upadte the UI
      displayMovements(currentAccount);
    }, 2500);

    // Reset Timer
    clearInterval(timerOfLogout);
    timerOfLogout = startLogoutTimer();
  }

  //Clearing the input fields
  formInputLoan.value = '';
  formInputLoan.blur();
});

//Closing an Existing account
formCloseBtn.addEventListener('click', e => {
  e.preventDefault();
  if (
    currentAccount.userName === formInputUser.value &&
    currentAccount.pin === +formInputPin.value
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    //Deleting the currentAccount
    accounts.splice(index, 1);

    //Hiding the current UI
    app.style.opacity = 0;
  }
});

// //Fake UI
// currentAccount = account1;
// displayMovements(currentAccount);
// app.style.opacity = 100;

//Implementing the timer
