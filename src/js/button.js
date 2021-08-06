import ImageApiService from "./apiService.js";
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { notice } from '@pnotify/core';


defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 3000;
defaults.stack.firstpos1 = 600;
defaults.stack.firstpos2 = 80;



const button = document.querySelector('.button');
const imageApiService = new ImageApiService();
const input = document.querySelector('#search');


function toggleClass() {
    this.classList.toggle('active');
    setTimeout(() => {
        imageApiService.query = "";
        input.value = "";
        document.querySelector('.gallery').innerHTML = "";
    }, 2900);
}

function addClass() {
    this.classList.add('finished');
    setTimeout(() => {
        this.classList.remove('finished');
        notice({
            text: "Your request was cleared successfully!!!"
        });
    }, 2000);

}

button.addEventListener('click', toggleClass);
button.addEventListener('transitionend', toggleClass);
button.addEventListener('transitionend', addClass);
