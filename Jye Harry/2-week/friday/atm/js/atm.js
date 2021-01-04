const accounts = {
  checking: 0,
  savings: 0
}

const CHECKING = Object.keys(accounts)[0];
const SAVINGS = Object.keys(accounts)[1];

$(document).ready(function () {
  toggleZeroClass($('#checking-balance').html('$' + accounts.checking), accounts.checking);
  toggleZeroClass($('#savings-balance').html('$' + accounts.savings), accounts.savings);

  $('#checking-deposit').on('click', function () {
    deposit($('#checking-amount'), CHECKING, $('#checking-balance'));
  })

  $('#savings-deposit').on('click', function () {
    deposit($('#savings-amount'), SAVINGS, $('#savings-balance'));
  })

  $('#checking-withdraw').on('click', function () {
    withdraw($('#checking-amount'), CHECKING, SAVINGS, $('#checking-balance'), $('#savings-balance'));
  })

  $('#savings-withdraw').on('click', function () {
    withdraw($('#savings-amount'), SAVINGS, CHECKING, $('#savings-balance'), $('#checking-balance'));
  })
})

const deposit = function ($amount, acc, $div) {
  accounts[acc] += parseInt($($amount).val());
  toggleZeroClass($($div).html('$' + accounts[acc]), accounts[acc]);
}

const withdraw = function ($amount, acc1, acc2, $div1, $div2) {
  const amount = parseInt($($amount).val());
  const difference = amount - accounts[acc1];
  if (amount <= accounts[acc1]) {
    setAccount(amount, acc1, $div1);
  } else if (difference <= accounts[acc2]) {
    setAccount(difference, acc2, $div2);
    setAccount(accounts[acc1], acc1, $div1);
  }
}

const setAccount = function (amount, acc, $div) {
  toggleZeroClass($($div).html('$' + (accounts[acc] -= amount)), accounts[acc]);
}

const toggleZeroClass = function ($div, bal) {
  bal === 0 ? $($div).addClass('zero') : $($div).removeClass('zero');
}
