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
    let buttonS = document.querySelectorAll('.btn_plus');
    console.log(buttonS);
    buttonS.forEach(element => {
      element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}

const AppData = function() {
    this.income = {};
    this.incomeMonth =0 ;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.check = function() {
    if(salaryAmount.value.trim() !== '') {
        startBtn.removeAttribute('disabled');
    }
};


AppData.prototype.start = function(){
    let _this = this;
    periodSelect.addEventListener('input', function(){
       incomePeriodValue.value = _this.calcPeriod();
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
    
    this.showResult();
    blockInputText();
};
AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
};
AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};
AppData.prototype.addExpensesBlock = function() {

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
};
AppData.prototype.getExpenses = function() {
    let _this = this;
    expensesItems.forEach(function(item){
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== '' ) {
            _this.expenses[itemExpenses] = cashExpenses;
        }
    });
};
AppData.prototype.getIncome = function() {
    let _this = this;
    incomeItems.forEach(function(item){
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = cashIncome;
        }
    });
    for(let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};
AppData.prototype.getAddExpenses = function() {
    let _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        if(item !== '') {
            item = item.trim();
            _this.addExpenses.push(item);
        }
    });
};
AppData.prototype.getAddIncome = function() {
    let _this = this;
    additionalIncomeItem.forEach(function(item){
         let itemValue = item.value.trim();
         if(itemValue !== '') {
            _this.addIncome.push(itemValue);
         }
    });
};
AppData.prototype.getExpensesMonth = function () {  
   for(let key in this.expenses) {   
        this.expensesMonth += +this.expenses[key];
   }
};   
AppData.prototype.getBudget = function() {  
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = this.budgetMonth / 30;
};
AppData.prototype.getTargetMonth = function() { 
    return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() { 
    if (this.budgetDay >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budgetDay < 600 && this.budgetDay > 0) {
        return ('К сожалению, у вас уровень дохода ниже среднего');
    } else {
        return ('Что-то пошло не так');
    }
};
AppData.prototype.getInfoDeposit = function() {
    if(this.deposit){
        this.percentDeposit = prompt('Какой годовой процент?', 10);
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    } while(!isNumber(this.percentDeposit || this.moneyDeposit)) {
        this.percentDeposit = prompt('Какой годовой процент?', 10);
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
    }
};
AppData.prototype.calcPeriod = function() {
    return this.budgetMonth * periodSelect.value;
};
AppData.prototype.range = function() {
    let rangeLine=document.querySelector('.period-select').value;
    let number=document.querySelector('.period-amount');
    number.textContent=rangeLine;
};
AppData.prototype.reset = function() {  // Метод reset, задание 12
    let inputAll = document.querySelectorAll('input[type="text"'); 
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    inputAll.forEach(element => {
        element.disabled = false;
        element.value = '';
      });
    let buttonS = document.querySelectorAll('.btn_plus');
    buttonS.forEach(element => {
        element.disabled = false;
        element.value = '';
    });
    startBtn.style.display = 'block';
    cancelBtn.style.display = 'none';
};      

const appData = new AppData();

AppData.prototype.eventListeners = function() {
    startBtn.addEventListener('click', this.start.bind(this));
    cancelBtn.addEventListener('click', this.reset.bind(this));
    expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    incomePlus.addEventListener('click', this.addIncomeBlock.bind(this)); 
    periodSelect.addEventListener('input', this.range.bind(this));

    salaryAmount.addEventListener('input', function() {
    if(salaryAmount.value !== '') {
        startBtn.disabled = false;
    } else {
        startBtn.disabled = true;
    }
    });
};
appData.eventListeners();
appData.addExpenses = appData.addExpenses.map(
    (item) =>
    item.trim().charAt(0).toUpperCase() + item.trim().substr(1).toLowerCase()
);


