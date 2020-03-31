'use strict';

let money = prompt('Ваш месячный доход?'),
    income = "фриланс",
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    deposit = confirm('Есть ли у вас депозит в банке?'),
    mission = 60000,
    period = 6,
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = prompt('Во сколько это обойдется?');




// Функции
// Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
let a;
const getExpensesMonth = function (amount1, amount2) {   
    a = amount1 + amount2;
    return a;
};
getExpensesMonth(amount1, amount2);
// Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = function(money, a) {
    return money - a;
};
getAccumulatedMonth(money, a);

//  Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth(money, a);
// Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, 
// зная результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = function(period, accumulatedMonth) {
    return accumulatedMonth / period;
};
getTargetMonth(period, accumulatedMonth);
// budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = accumulatedMonth  / 30;


// Конструкция if
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
console.log(getStatusIncome());





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
console.log(budgetDay);
console.log('Ваш бюджет на месяц:' + accumulatedMonth);
console.log('Цель будет достигнута за:' + getTargetMonth());
console.log('Бюджет на день:' + Math.floor(accumulatedMonth / 30));