'use strict';


let count = document.getElementById('start'),
    plus1 = document.getElementsByTagName('button')[0],
    plus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('.deposit-checkmark'),
    incomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    incomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    rightInput1 = document.getElementsByClassName('budget_month-value'),
    rightInput2 = document.getElementsByClassName('budget_day-value'),
    rightInput3 = document.getElementsByClassName('expenses_month-value'),
    rightInput4 = document.getElementsByClassName('additional_income-value'),
    rightInput5 = document.getElementsByClassName('additional_expenses-value'),
    rightInput6 = document.getElementsByClassName('income_period-value'),
    rightInput7 = document.getElementsByClassName('target_month-value'),
    leftInput1 = document.querySelector('.salary-amount'),
    leftInput2 = document.querySelector('.income-title'),
    leftInput3 = document.querySelector('.income-amount'),
    leftInput4 = document.querySelector('.additional_income-item'),
    leftInput5 = document.querySelector('.additional_income-item'),
    leftInput6 = document.querySelector('.expenses-title'),
    leftInput7 = document.querySelector('.expenses-amount'),
    leftInput8 = document.querySelector('.additional_expenses-item'),
    leftInput9 = document.querySelector('.target-amount'),
    leftInput10 = document.querySelector('.period-select');
    
// вывод в консоль
console.log(count);
console.log(plus1, plus2);
console.log(checkBox);
console.log(incomeItem1, incomeItem2);
console.log(leftInput1, rightInput1);