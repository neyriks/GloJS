'use strict';

let count = document.getElementById('start'),
    plus1 = document.getElementsByTagName('button')[0],
    plus2 = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('.deposit-checkmark'),
    incomeItem1 = document.querySelectorAll('.additional_income-item')[0],
    incomeItem2 = document.querySelectorAll('.additional_income-item')[1],
    rightInput1 = document.getElementsByClassName('budget_month-value')[0],  // Есть ли способ писать [0-6], например?
    rightInput2 = document.getElementsByClassName('budget_day-value')[1],
    rightInput3 = document.getElementsByClassName('expenses_month-value')[2],
    rightInput4 = document.getElementsByClassName('additional_income-value')[3],
    rightInput5 = document.getElementsByClassName('additional_expenses-value')[4],
    rightInput6 = document.getElementsByClassName('income_period-value')[5],
    rightInput7 = document.getElementsByClassName('target_month-value')[6],
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
    
console.log(rightInput1,leftInput1);
// let isNumber = function(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// };
// let money,
//     start = function(){
//         do {
//             money = prompt('Ваш месячный доход?');
//         } while (isNaN(money) || money === '' || money === null);    
//     };
// start();

// let appData = {
//     income: {},
//     addIncome: [],
//     expenses: {},
//     addExpenses: [],
//     deposit: false,
//     percentDeposit: 0,
//     moneyDeposit: 0,
//     mission: 50000,
//     period: 6,
//     budget: money,
//     budgetDay: 0,
//     budgetMonth: 0,
//     expensesMonth: 0,
//     asking: function() {
//         if(confirm('Есть ли у вас дополнительный источник заработка?')) {
//             let itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
//             let cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
//             appData.income[itemIncome] = cashIncome;
//             while(!isNumber(cashIncome)) {
//                 cashIncome = prompt('Сколько в месяц зарабатываете на этом?', 10000);
//             }
//             while(isNumber(itemIncome)) {
//                 itemIncome = prompt('Какой у вас дополнительный заработок', 'Таксую');
//             }
//         } 
//         let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
//             appData.addExpenses = addExpenses.toLowerCase().split(', ');
//             appData.deposit = confirm('Есть ли у вас депозит в банке?');
//     },
//     getExpensesMonth: function () {  
//         for (let i = 0; i < 2; i++) { 
//             let ask = prompt('Введите обязательную статью расходов');
//             while(isNumber(ask)) {
//                 ask = prompt('Введите обязательную статью расходов');
//             }         
//             let count = prompt('Во сколько это обойдется?');
//             while(!isNumber(count)) {
//                 count = prompt('Во сколько это обойдется?');
//             }
//             appData.expenses[ask] = +count;
//         }
//        for(let key in appData.expenses) {   
//             appData.expensesMonth += +appData.expenses[key];
//        }
//     },   
//     getBudget: function() {  
//         appData.budgetDay = (money - appData.expensesMonth) / 30;
//         appData.budgetMonth = money - appData.expensesMonth;
//     },
//     getTargetMonth: function() { 
//         if (appData.mission/appData.budgetMonth < 0){
//             return 'Цель не будет достигнута';
//         } else {
//            return appData.mission / appData.budgetMonth; 
//         }
//     },
//     getStatusIncome: function() { 
//         if (appData.budgetDay >= 1200) {
//             return ('У вас высокий уровень дохода');
//         } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
//             return ('У вас средний уровень дохода');
//         } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
//             return ('К сожалению, у вас уровень дохода ниже среднего');
//         } else if (appData.budgetDay <= 0) {
//             return ('Что-то пошло не так');
//         }
//     },
//     getInfoDeposit: function() {
//         if(appData.deposit){
//             appData.percentDeposit = prompt('Какой годовой процент?', 10);
//             appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//         } while(!isNumber(appData.percentDeposit || appData.moneyDeposit)) {
//             appData.percentDeposit = prompt('Какой годовой процент?', 10);
//             appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
//         }
//     },
//     calcSavedMoney: function() {
//         return appData.budgetMonth * appData.period;
//     }
// };
// appData.asking();
// appData.getExpensesMonth();
// appData.getBudget();
// appData.getTargetMonth();
// appData.getStatusIncome();
// appData.getInfoDeposit();


// appData.addExpenses = appData.addExpenses.map(
//     (item) =>
//     item.trim().charAt(0).toUpperCase() + item.trim().substr(1).toLowerCase()
// );


// // Вывод в консоль
// console.log(appData.addExpenses.join(', '));
// console.log (Object.keys(appData).length);
// console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
// console.log('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()));
// console.log('Ваш уровень дохода: ' + appData.getStatusIncome());
// for(let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key)
//     ;}


