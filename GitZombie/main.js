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
        if(this.selector[0] === '.') {
            let newEl = document.createElement('div');
            newEl.classList.add('newDiv');
            newEl.style.cssText=`
            height: ${this.height}px;
            background: ${this.bg};
            width: ${this.width}px;
            font-size: ${this.fontSize}px;
        `;
        newEl.textContent = 'ZombieOne';
        body.append(newEl);
        } else if(this.selector[0] === '#') {
           let newElboyz = document.createElement('p');
            newElboyz.classList.add('newId');
            newElboyz.style.cssText=`
            height: ${this.height}px;
            background: ${this.bg};
            width: ${this.width}px;
            font-size: ${this.fontSize}px;
        `;
        newElboyz.textContent = 'ZombieTwo';
        body.append(newElboyz);
        }  
    }
}
let newDomElement = new DomElement('.star', 50, 50, 'grey', 20 );
newDomElement.randomMethod();
console.log(newDomElement);
let newDomElementBoyz = new DomElement('#sun', 50, 50, 'yellow', 20 );
newDomElementBoyz.randomMethod();
console.log(newDomElementBoyz);