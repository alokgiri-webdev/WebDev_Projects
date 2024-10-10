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
          <div class="movements__value">${mov}€</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });

  //Calculating & displaying the Current balance
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  valueBalance.textContent = `${acc.balance}€`;

  //Calculating & displaying Summary
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  summaryValueOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  summaryValueInterest.textContent = `${interest}€`;
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

// Setting up login with right credentials
let currentAccount;
loginBtn.addEventListener('click', e => {
  e.preventDefault();
  currentAccount = accounts.find(acc => acc.userName === loginInputUser.value);
  if (currentAccount?.pin === +loginInputPin.value) {
    //Display UI and Welcome Message
    welcome.textContent = `Welcome back ${currentAccount.owner.split(' ')[0]}`;
    app.style.opacity = 100;
    //Clear input fields
    loginInputUser.value = loginInputPin.value = '';
    loginInputPin.blur();
    //Display Movements, balance & summary
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

    //Clearing the input fields
    formInputTo.value = formInputAmount.value = '';
    formInputAmount.blur();
  }
});

//Requesting Loan
formLoanBtn.addEventListener('click', e => {
  e.preventDefault();
  const amount = +formInputLoan.value;

  //Checking the condition for requested loan
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
  }

  //Clearing the input fields
  formInputLoan.value = '';
  formInputLoan.blur();

  //Upadte the UI
  displayMovements(currentAccount);
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
