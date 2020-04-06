'use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
    start = function(){
        do {
            money = prompt('Ваш месячный доход?');
        } while (!isNumber(money));
    };
start();
let expense,
    count;

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 50000,
    period: 6,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
            appData.addExpenses = addExpenses.toLowerCase().split('');
            appData.deposit = confirm('Есть ли у вас депозит в банке?');
    },
    getExpensesMonth: function () {  
        for (let i = 0; i < 2; i++) {    // Не сохраняет две переменные, а только одну.
            let ask = prompt('Введите обязательную статью расходов');         
            let count = prompt('Во сколько это обойдется?');
            appData.expenses[ask] = +count;
            while(!isNumber(count)) {
                count = prompt('Во сколько это обойдется?');
            }
        }

       for(let key in appData.expenses) {   // Правильно или нет? Не могу проверить, потому-что выше не сохранились два значения.
            appData.expensesMonth += +appData.expenses[key];
            return appData.expensesMonth;
       }
    },   
    getBudget: function() {   // getAccumulatedMonth переименовать в getBudget. Этот метод будет высчитывать значения свойств budgetMonth и budgetDay, чтобы вычислить значения используем только свойства объекта (никаких внешних переменных)
        appData.budgetDay = (appData.budgetDay / 30);
        appData.budgetMonth =(money - appData.expenses);
    },
    getTargetMonth: function() { // В методах getTargetMonth и getStatusIncome исправить переменные, все значения получаем от нашего объекта appData
        if (appData.mission/appData.budgetMonth < 0){
            console.log ('Цель не будет достигнута');
        } else {
           return appData.mission / appData.budgetMonth; 
        }
    },
    getStatusIncome: function() { //В методах getTargetMonth и getStatusIncome исправить переменные, все значения получаем от нашего объекта appData
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else if (appData.budgetDay <= 0) {
            return ('Что-то пошло не так');
        }
    }
};
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();
appData.getStatusIncome();




// Вывод в консоль
for(let key in appData) {
    console.log("Наша программа включает в себя данные: " + key);
}
console.log (Object.keys(appData).length);
console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()));
console.log('Ваш уровень дохода: ' + appData.getStatusIncome);   //Выводит функцию, не должно.

