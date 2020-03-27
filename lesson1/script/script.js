let money, income, addExpenses, deposit, mission, period, budgetDat;

money = 50000;
income = "фриланс";
addExpenses = 'Интернет, Такси, Коммуналка';
deposit = true;
mission = 300000;
period = 6;


console.log (typeof money, income, deposit);
console.log (addExpenses.length);
console.log ('Период равен ' + period + ' месяцев' + ' и' + ' Цель заработать: '+ mission + ' рублей');

console.log (addExpenses.split(', ') && addExpenses.toLowerCase());

budgetDay = money  / 30;
console.log(budgetDay);