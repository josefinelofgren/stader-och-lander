// import {ctyInfo} from './modules/städer.mjs'

// ctyInfo();

let btns = document.querySelectorAll('.cities');

for (let i of btns) {
  i.addEventListener('click', function() {
    console.log(this);
  });
}