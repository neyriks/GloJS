'use strict';

const incomePlus = document.getElementsByTagName('button')[0],
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
    expensesTitle = document.querySelector('.expenses-title');
    let expensesItems = document.querySelectorAll('.expenses-items');
    const additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    startBtn = document.getElementById('start'),   // Это кнопка рассчитать
    cancelBtn = document.getElementById('cancel'); // Кнопка "сбросить"
    let incomeItems = document.querySelectorAll('.income-items');
    const titlePeriodAmount = document.querySelector('.period-amount'),
    resultIncomePeriod = document.querySelector('.result-income_period'),
    depositСheck = document.getElementById('deposit-check'),
    depositBank = document.querySelector('.deposit-bank'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPersent = document.querySelector('.deposit-percent');

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};
function blockInputText() {
    let inputText = document.querySelectorAll('input[type="text"]');
    inputText.forEach(element => {
      element.disabled = true;
    });
    let buttonS = document.querySelectorAll('.btn_plus');
    buttonS.forEach(element => {
      element.disabled = true;
    });
    startBtn.style.display = 'none';
    cancelBtn.style.display = 'block';
}

class AppData {
    constructor() {
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
    }

    check () {
        if(salaryAmount.value.trim() !== '') {
            startBtn.removeAttribute('disabled');
        } 
    }

    start(){
        let _this = this;
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = _this.calcPeriod();
        }); 
        if (salaryAmount.value === '') {
            startBtn.disabled = true;
                return;
        }
        if (isNumber(depositPersent.value) < 0 || isNumber(depositPersent.value) > 100 || !isNumber(depositPersent.value)) {
            alert('Введите корректное значение в поле проценты');
            return;
        }
        this.budget = +salaryAmount.value;
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        // appData.getStatusIncome();
        this.getInfoDeposit(); 
        this.getAddExpenses(); 
        this.getAddIncome();
        this.getBudget();
        this.range();
        
        this.showResult();
        blockInputText();
    }
    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
    }
    addIncomeBlock (){
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if(incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    }
    addExpensesBlock() {

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    }
    getExpenses () {
        let _this = this;
        expensesItems.forEach(item => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== '' ) {
                _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }
    
    getIncome () {
        let _this = this;
        incomeItems.forEach(item => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                _this.income[itemIncome] = cashIncome;
            }
        });
        for(let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }
    getAddExpenses () {
        let _this = this;
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(item => {
            if(item !== '') {
                item = item.trim();
                _this.addExpenses.push(item);
            }
        });
        this.addExpenses = this.addExpenses.map(
            (item) =>
            item.trim().charAt(0).toUpperCase() + item.trim().substr(1).toLowerCase()
            );
    }
    getAddIncome () {
        let _this = this;
        additionalIncomeItem.forEach(item => {
            let itemValue = item.value.trim();
            if(itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    }
    getExpensesMonth () {  
    for(let key in this.expenses) {   
            this.expensesMonth += +this.expenses[key];
    }
    }
    getBudget () {  
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = this.budgetMonth / 30;
    }
    getTargetMonth () { 
        return targetAmount.value / this.budgetMonth;
    }
    getStatusIncome () { 
        if (this.budgetDay >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
            return ('У вас средний уровень дохода');
        } else if (this.budgetDay < 600 && this.budgetDay > 0) {
            return ('К сожалению, у вас уровень дохода ниже среднего');
        } else {
            return ('Что-то пошло не так');
        }
    }
    getInfoDeposit () {
        if(this.deposit) {
            this.percentDeposit = depositPersent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }
    calcPeriod () {
        return this.budgetMonth * periodSelect.value;
    }
    range (){
        let rangeLine=document.querySelector('.period-select').value;
        let number=document.querySelector('.period-amount');
        number.textContent=rangeLine;
    }
    reset () {  // Метод reset, задание 12
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
        incomeItems = document.querySelectorAll('.income-items');
        expensesItems = document.querySelectorAll('.expenses-items');
        incomeItems.forEach((element, i) => {  
            if (i !== 0) {
              element.remove();
            }
        });
        expensesItems.forEach((element, i) => {  
            if (i !== 0) {
              element.remove();
            }
        });
        expensesPlus.style.display = 'block';
        incomePlus.style.display = 'block';
        depositPersent.style.display = 'none';

    }
    changePercent () {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositPersent.style.display = 'inline-block';
        }
        else {
            depositPersent.value = valueSelect;
            depositPersent.style.display = 'none';
        }
    }
    depositHandler () {
        if(depositСheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none'; 
            depositPersent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPersent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }
    eventListeners () {
        startBtn.addEventListener('click', this.start.bind(this));
        cancelBtn.addEventListener('click', this.reset.bind(this));
        expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
        incomePlus.addEventListener('click', this.addIncomeBlock.bind(this)); 
        periodSelect.addEventListener('input', this.range.bind(this));
        depositСheck.addEventListener('change', this.depositHandler.bind(this));
        salaryAmount.addEventListener('input', () => {
        if(salaryAmount.value !== '') {
            startBtn.disabled = false;
        } else {
            startBtn.disabled = true;
        }
        });
    }
}
const appData = new AppData();
appData.eventListeners();

