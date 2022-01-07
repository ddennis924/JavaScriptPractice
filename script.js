"use strict";

// Data
const account1 = {
  owner: "Dennis Li",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
accounts.forEach(function (user) {
  user.username = username(user.owner);
});
let currentAccount = account1;

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

btnLogin.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(`hi`);
  LogIn(accounts);
});
btnTransfer.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(`transfer`);
  const receiver = inputTransferTo.value;
  const amount = inputTransferAmount.value;
  transfer(receiver, amount);
});
btnLoan.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(`loan`);
  const amount = Number(inputLoanAmount.value);
  loan(amount);
});
btnClose.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(`close`);
  const account = inputCloseUsername.value;
  const pin = inputClosePin.value;
  closeAccount(account, pin);
});
btnSort.addEventListener(`click`, function (e) {
  e.preventDefault();
  console.log(`sort`);
  if (
    btnSort.textContent.includes(`&downarrow`) ||
    btnSort.textContent.includes(`\u2193`)
  ) {
    sortAscending();
    btnSort.textContent = `\u2191 SORT`;
  } else {
    sortDescending();
    btnSort.textContent = `\u2193 SORT`;
  }
});

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
console.log(accounts);

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
      movements.filter((mov) => mov > 0).reduce((acc, mov) => acc + mov)
    );
  })();
  (function () {
    labelSumOut.textContent = toDollar(
      Math.abs(
        movements.filter((mov) => mov < 0).reduce((acc, mov) => acc + mov)
      )
    );
  })();
  (function () {
    labelSumInterest.textContent = toDollar(
      movements
        .filter((mov) => mov > 0)
        .map((mov) => (mov * currentAccount.interestRate) / 100)
        .filter((mov) => mov >= 1)
        .reduce((acc, mov) => acc + mov)
    );
  })();
}

function LogIn(accounts) {
  currentAccount = accounts.find(
    (user) =>
      user.username == inputLoginUsername.value &&
      user.pin == inputLoginPin.value
  );
  console.log(currentAccount);
  if (currentAccount) {
    document.querySelector(`.app`).style.opacity = `1`;
    document.querySelector(`.welcome`).textContent = `Welcome`;
    update();
  }
}
function update() {
  displayMovements(currentAccount.movements);
  updateNumbers(currentAccount.movements);
  balance(currentAccount.movements);
}

function transfer(receiver, amount) {
  if (accounts.find((user) => user.username == receiver)) {
    console.log(`transferring to ${receiver}`);
    currentAccount.movements.push(-amount);
    accounts.find((user) => user.username == receiver).movements.push(amount);
    update();
  }
}

function loan(amount) {
  const balance = currentAccount.movements.reduce(function (balance, val) {
    return balance + val;
  }, 0);
  console.log(balance);
  if (balance >= amount) {
    currentAccount.movements.push(amount);
  }
  update();
}

function closeAccount(account, pin) {
  console.log(accounts);
  console.log(account);
  if (account == currentAccount.username && pin == currentAccount.pin) {
    accounts.splice(accounts.indexOf(currentAccount), 1);
    console.log(accounts);
    containerApp.style.opacity = `0`;
  } else {
    alert(`No account found!`);
  }
}

function sortDescending() {
  const newMovements = currentAccount.movements.slice().sort(function (a, b) {
    if (a > b) {
      return -1;
    } else if (b > a) {
      return 1;
    } else {
      return 0;
    }
  });
  displayMovements(newMovements);
}

function sortAscending() {
  const newMovements = currentAccount.movements.slice().sort(function (a, b) {
    if (a > b) {
      return 1;
    } else if (b > a) {
      return -1;
    } else {
      return 0;
    }
  });
  displayMovements(newMovements);
}
