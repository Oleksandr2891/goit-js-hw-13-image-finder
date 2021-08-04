import photoCards from "../tmp/photo-card.hbs";
import _ from "lodash";
import ImageApiService from "./apiService.js";
// import { defaultModules } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { alert, notice, info, success, error } from '@pnotify/core';
// import * as PNotifyFontAwesome4 from '@pnotify/font-awesome4';
// import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';
// defaultModules.set(PNotifyFontAwesome4, {});


defaults.styling = 'material';
defaults.icons = 'material';
defaults.delay = 2000;
defaults.stack.firstpos1 = 10;
defaults.stack.firstpos2 = 300;
defaults.stack.dir1 = "down";


console.log(defaults);

const input = document.querySelector('#search');
const imageApiService = new ImageApiService();
const observer = new IntersectionObserver(onEntry);

input.addEventListener('input', _.debounce(onInputSearch, 700));

const markup = (item) => {
    let counter = 0;
    item.forEach((i) => {
        document.querySelector('.gallery').insertAdjacentHTML('beforeend', photoCards(i));
        const lastImg = document.querySelector(".gallery").lastElementChild.querySelector("img");
        lastImg.onload = () => {
            if (++counter >= item.length) {
                console.log(counter);
                document.querySelectorAll("li.hide").forEach(node => { node.classList.remove("hide") });
            }
        }
    });
};

async function onInputSearch(event) {

    if (event.target.value !== "") {
        try {

            imageApiService.query = event.target.value;
            const galleryOfItems = await imageApiService.featchImage();
            markup(galleryOfItems.hits);
            const lastElementView = document.querySelector(".gallery").lastElementChild;
            observer.observe(lastElementView);
            success({
                text: "Your request was completed successfully!!!"
            });

        } catch {
            error({
                text: "Nothing was found by your request!!!"
            });
        }
    }
    return;
};

async function onEntry(entries, observer) {
    entries.forEach(async (entry) => {
        if (!entry.isIntersecting) return false;
        try {
            observer.unobserve(entry.target);
            const galleryOfItems = await imageApiService.featchImage();
            markup(galleryOfItems.hits);
            const lastElementView = document.querySelector(".gallery").lastElementChild;
            observer.observe(lastElementView);
        } catch {
            error({
                text: "Nothing was found by your request!!!"
            });
        }

    });
};



