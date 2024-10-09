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
const movements = document.querySelector('.movements');
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
