
let money = 50000,
    income = "фриланс",
    addExpenses = 'Интернет, Такси, Коммуналка',
    deposit = true,
    mission = 300000,
    period = 6,
    budgetDay = money  / 30;



// Вывод в консоль
console.log (typeof money, typeof income, typeof deposit);
console.log (addExpenses.length);
console.log ('Период равен ' + period + ' месяцев и Цель заработать: '+ mission + ' рублей');
console.log (addExpenses.toLowerCase().split(', '));
console.log(budgetDay);