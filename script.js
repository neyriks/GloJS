'use strict';

let incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],
    checkBox = document.querySelector('.deposit-checkmark'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
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
    startBtn = document.getElementById('start'),   // Это кнопка рассчитать
    cancelBtn = document.getElementById('cancel'), // Кнопка "сбросить"
    incomeItems = document.querySelectorAll('.income-items'),
    titlePeriodAmount = document.querySelector('.period-amount'),
    resultIncomePeriod = document.querySelector('.result-income_period');
let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
function blockInputText() {
    let inputText = document.querySelectorAll('input[type="text"]');
    inputText.forEach(element => {
      element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}
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
            startBtn.disabled = true;
            return;
        }
        periodSelect.addEventListener('input', function(){
           incomePeriodValue.value = appData.calcPeriod();
       });
        
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        // appData.getStatusIncome();
        // appData.getInfoDeposit(); 
        this.getAddExpenses(); 
        this.getAddIncome();
        this.getBudget();
        this.range();
        blockInputText();

        this.showResult();
        
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
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
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
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
       for(let key in this.expenses) {   
            this.expensesMonth += +this.expenses[key];
       }
    },   
    getBudget: function() {  
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = this.budgetMonth / 30;
    },
    getTargetMonth: function() { 
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function() { 
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    },
    getInfoDeposit: function() {
        if(this.deposit){
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        } while(!isNumber(this.percentDeposit || this.moneyDeposit)) {
            this.percentDeposit = prompt('Какой годовой процент?', 10);
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }
    },
    calcPeriod: function() {
        return this.budgetMonth * periodSelect.value;
    },
    range: function() {
        let rangeLine=document.querySelector('.period-select').value;
        let number=document.querySelector('.period-amount');
        number.textContent=rangeLine;
    },
    reset: function() {  // Метод reset, задание 12
        let inputAll = document.querySelectorAll('input[type="text"]'); 
        inputAll.forEach(el=>el.value ='');
        startBtn.style.display = 'block';
        cancelBtn.style.display = 'none';
    }        
};
startBtn.addEventListener('click', appData.start.bind(appData));
cancelBtn.addEventListener('click', appData.reset.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock.bind(appData)); 
periodSelect.addEventListener('input', appData.range.bind(appData));
salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== '') {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
});


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


