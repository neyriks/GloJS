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
let expenses1, 
    expenses2, 
    accumulatedMonth,
    budgetDay = accumulatedMonth  / 30;

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
    getExpensesMonth: function (amount1, amount2) {  
        let sum = 0;
        for(let i = 0; i < 2; i++) {
            if(i === 0) {
                expenses1 = prompt('Введите обязательную статью расходов?');
            } else if(i === 1) {
                expenses1 = prompt('Введите обязательную статью расходов?');
            }
    
            let count = prompt('Во сколько это обойдется?');
    
            while(!isNumber(count)) {
                count = prompt('Во сколько это обойдется?');
            }
            sum += +count;
        }
        return sum;
    },
    getAccumulatedMonth: function() {
        let expensesAmount = appData.getExpensesMonth();
        return money - expensesAmount;
    },
    getTargetMonth: function() {
        if (appData.mission/accumulatedMonth < 0){
            console.log ('Цель не будет достигнута');
        } else {
           return appData.mission / accumulatedMonth; 
        }
    },
    getStatusIncome: function() {
        if (budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (budgetDay >= 600 && budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (budgetDay < 600 && budgetDay > 0) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else if (budgetDay <= 0) {
            return ('Что-то пошло не так');
        }
    }
};

appData.getAccumulatedMonth();

accumulatedMonth = appData.getAccumulatedMonth();

appData.getTargetMonth();

appData.getStatusIncome();




// Вывод в консоль
console.log (appData.addExpenses.length);
console.log ('Период равен ' + appData.period + ' месяцев и Цель заработать: '+ appData.mission + ' рублей');
console.log (appData.addExpenses);
console.log(Math.floor(budgetDay));
console.log('Ваш бюджет на месяц:' + accumulatedMonth);
console.log('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()));
console.log('Бюджет на день:' + Math.floor(budgetDay));
