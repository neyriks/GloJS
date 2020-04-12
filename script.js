'use strict';

let incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('.deposit-checkmark'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    incomeItem1 = additionalIncomeItem[0],
    incomeItem2 = additionalIncomeItem[1],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    start= document.getElementById('start'),
    incomeItems = document.querySelectorAll('.income-items'),
    titlePeriodAmount = document.querySelector('.period-amount'),
    resultIncomePeriod = document.querySelector('.result-income_period');
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
let appData = {
    income: {},
    incomeMonth:0 ,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function(){
        if(salaryAmount.value === '') {
            document.getElementById("start").disabled = true;
            return false;
        }
        
       periodSelect.addEventListener('change', function(){
           incomePeriodValue.value = appData.calcPeriod();
       });

        appData.budget = +salaryAmount.value;
        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit(); 
        appData.getAddExpenses(); 
        appData.getAddIncome();
        appData.getBudget();
        appData.range();
        
        appData.showResult();
        
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcPeriod();
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    addExpensesBlock: function() {
 
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '' ) {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });
        for(let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            if(item !== '') {
                item = item.trim();
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item){
             let itemValue = item.value.trim();
             if(itemValue !== '') {
                 appData.addIncome.push(itemValue);
             }
        });
    },
    getExpensesMonth: function () {  
       for(let key in appData.expenses) {   
            appData.expensesMonth += +appData.expenses[key];
       }
    },   
    getBudget: function() {  
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = appData.budgetMonth / 30;
    },
    getTargetMonth: function() { 
        return targetAmount.value / appData.budgetMonth;
    },
    getStatusIncome: function() { 
        if (appData.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budgetDay < 600 && appData.budgetDay > 0) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if(appData.deposit){
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while(!isNumber(appData.percentDeposit || appData.moneyDeposit)) {
            appData.percentDeposit = prompt('Какой годовой процент?', 10);
            appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
    },
    calcPeriod: function() {
        return appData.budgetMonth * periodSelect.value;
    },
    range: function() {
        let rangeLine=document.querySelector('.period-select').value;
        let number=document.querySelector('.period-amount');
        number.textContent=rangeLine;
    }        
};
start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock); 
periodSelect.addEventListener('input', appData.range);

appData.addExpenses = appData.addExpenses.map(
    (item) =>
    item.trim().charAt(0).toUpperCase() + item.trim().substr(1).toLowerCase()
);

// Вывод в консоль
// console.log(appData.addExpenses.join(', '));
// console.log (Object.keys(appData).length);
// console.log('Ваши расходы за месяц: ' + appData.expensesMonth);
// console.log('Цель будет достигнута за:' + Math.ceil(appData.getTargetMonth()));
// console.log('Ваш уровень дохода: ' + appData.getStatusIncome());
// for(let key in appData) {
//     console.log("Наша программа включает в себя данные: " + key)
//     ;}


