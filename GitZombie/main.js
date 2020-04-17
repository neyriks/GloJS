'use strict';

let body = document.querySelector('body');
class DomElement {
    constructor(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
    }
    randomMethod() {
        let newEl;
        if(this.selector[0] === '.') {
            newEl = document.createElement('div');
            newEl.className = ('divblock');
        } else if(this.selector[0] === '#') {
            newEl = document.createElement('p');
            newEl.id = ('justp');
        } 
        newEl.style.cssText=`
            height: ${this.height}px;
            background: ${this.bg};
            width: ${this.width}px;
            font-size: ${this.fontSize}px;
        `;
        newEl.textContent = 'Zombie';
        body.append(newEl);
    }
}
let newEl = new DomElement('.star', 50, 50, 'grey', 20 );
newEl.randomMethod();
console.log(newEl);
let newEl2= new DomElement('#sun', 50, 50, 'yellow', 20 );
newEl2.randomMethod();
console.log(newEl2);