'use strict';

// Data
const account1 = {
  owner: 'Dennis Li',
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
accounts.forEach(function (user) {
  user.username = username(user.owner);
});
let currentAccount = accounts[0];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

function displayMovements(movements) {
  containerMovements.innerHTML = ``;
  movements.forEach(function (value, i) {
    const type = value > 0 ? `deposit` : `withdrawal`;
    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
    <div class="movements__date">3 days ago</div>
    <div class="movements__value">$${value}</div>
  </div>`;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
}
displayMovements(account1.movements);

function toDollar(string) {
  return `$${string}`;
}

function username(string) {
  const names = string.toLowerCase().split(` `);
  console.log(names);
  return names
    .map(function (name) {
      return name.substring(0, 1);
    })
    .join(``);
}

function balance(movements) {
  labelBalance.textContent = `$${movements.reduce(function (balance, val) {
    return balance + val;
  }, 0)}`;
}

function updateNumbers(movements) {
  (function () {
    labelSumIn.textContent = toDollar(
      movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov)
    );
  })();
  (function () {
    labelSumOut.textContent = toDollar(
      Math.abs(movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov))
    );
  })();
  (function () {
    labelSumInterest.textContent = toDollar(
      movements
        .filter(mov => mov > 0)
        .map(mov => (mov * currentAccount.interestRate) / 100)
        .filter(mov => mov >= 1)
        .reduce((acc, mov) => acc + mov)
    );
  })();
}
updateNumbers(account1.movements);
balance(currentAccount.movements);
