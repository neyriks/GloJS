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
    count,
    appData = {
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
        for (let i = 0; i < 2; i++) { 
            let ask = prompt('Введите обязательную статью расходов');         
            let count = prompt('Во сколько это обойдется?');
            while(!isNumber(count)) {
                count = prompt('Во сколько это обойдется?');
            }
            appData.expenses[ask] = +count;
        }
       for(let key in appData.expenses) {   
            appData.expensesMonth += +appData.expenses[key];
       }
    },   
    getBudget: function() {  
        appData.budgetDay = (money - appData.expensesMonth) / 30;
        appData.budgetMonth = money - appData.expensesMonth;
    },
    getTargetMonth: function() { 
        if (appData.mission/appData.budgetMonth < 0){
            return 'Цель не будет достигнута';
        } else {
           return appData.mission / appData.budgetMonth; 
        }
    },
    getStatusIncome: function() { 
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
console.log (Object.keys(appData).length);
console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
console.log('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()));
console.log('Ваш уровень дохода: ' + Math.ceil(appData.getStatusIncome));
for(let key in appData) {
    console.log("Наша программа включает в себя данные: " + key);
}
