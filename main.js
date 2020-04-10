'use strict';

let book = document.querySelectorAll('.book'),
    collectionBook2 = document.getElementsByTagName('ul')[0],
    collectionBook5 = document.getElementsByTagName('ul')[5];
    collectionBook2.classList.add('bookTwo');
    let cb2 = collectionBook2.getElementsByTagName('li');
    collectionBook5.classList.add('bookFive');
    let cb5 = collectionBook5.getElementsByTagName('li'),
     collectionBook6 =  document.getElementsByTagName('ul')[2];
    collectionBook6.classList.add('bookSix');
    let cb6 = collectionBook6.getElementsByTagName('li');

// Удаление рекламы
let adv = document.getElementsByClassName('adv');   
adv[0].remove();
// Восстановить порядок книг.
// Можно было 6ую книгу перместить в конец через append. Но сделал так.
book[1].after(book[0]);
book[5].after(book[2]);
book[4].after(book[3]);

// Изменить название книги 3.
 book[4].innerHTML = '<h2><a>Книга 3. this и Прототипы Объектов</a></h2>';

// Изменение порядка глав.
// 2
cb2[1].after(cb2[3]);
cb2[2].after(cb2[6]);
cb2[3].after(cb2[8]);
cb2[9].after(cb2[5]);

// 5
cb5[1].after(cb5[9]);
cb5[2].after(cb5[4]);
cb5[3].after(cb5[5]);
cb5[8].after(cb5[6]);
//Добавление главы в 6ой книге.
const newElem  = document.createElement('li');
newElem.textContent = 'Глава 8: За пределами ES6';
collectionBook6.append(newElem);
cb6[8].after(cb6[10]);


// Замена фона.
const bgI = document.querySelector('body');
bgI.setAttribute('style', 'background-image:url(./image/you-dont-know-js.jpg)');
