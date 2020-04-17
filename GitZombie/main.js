'use strict';

let body = document.querySelector('body');
function DomElement(selector, height, width, bg, fontSize) {
        this.selector = selector;
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
}
DomElement.prototype.randomMethod = function() {
        let newEl;
        if(this.selector[0] === '.') {
            newEl = document.createElement('div');
            newEl.className = (this.selector.split('.')[1]);
        } else if(this.selector[0] === '#') {
            newEl = document.createElement('p');
            newEl.id = (this.selector.split('#')[1]);
        } 
        newEl.style.cssText=`
            height: ${this.height}px;
            background: ${this.bg};
            width: ${this.width}px;
            font-size: ${this.fontSize}px;
        `;
        newEl.textContent = 'Zombie';
        body.append(newEl);
};
let newEl = new DomElement('.star', 50, 50, 'grey', 20 );
newEl.randomMethod();
let newEl2= new DomElement('#sun', 50, 50, 'yellow', 20 );
newEl2.randomMethod();