'use strict';
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
    income = "фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 60000,
    period = 6,
    expenses1,
    expenses2,
    accumulatedMonth,
    budgetDay,
    start;

// Функции
start = function(){
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
};
start();

const getExpensesMonth = function (amount1, amount2) {  
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
};
let expensesAmount = getExpensesMonth();


const getAccumulatedMonth = function() {
    return money - expensesAmount;
};
getAccumulatedMonth();

accumulatedMonth = getAccumulatedMonth();

const getTargetMonth = function() {
    if (mission/accumulatedMonth < 0){
        console.log ('Цель не будет достигнута');
    } else {
       return mission / accumulatedMonth; 
    }
};
getTargetMonth();

 budgetDay = accumulatedMonth  / 30;

let getStatusIncome = function() {
    if (budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budgetDay >= 600 && budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budgetDay < 600 && budgetDay > 0) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else if (budgetDay <= 0) {
        return ('Что-то пошло не так');
    }
};
getStatusIncome();




// Вывод в консоль
let showTypeOf = function(data) {
    console.log(data, typeof(data));
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log (addExpenses.length);
console.log ('Период равен ' + period + ' месяцев и Цель заработать: '+ mission + ' рублей');
console.log (addExpenses.toLowerCase().split(', '));
console.log(Math.floor(budgetDay));
console.log('Ваш бюджет на месяц:' + accumulatedMonth);
console.log('Цель будет достигнута за:' + Math.ceil(getTargetMonth()));
console.log('Бюджет на день:' + Math.floor(budgetDay));
