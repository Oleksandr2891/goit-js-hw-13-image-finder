import photoCards from "../tmp/photo-card.hbs";
import _ from "lodash";
import ImageApiService from "./apiService.js";
import '@pnotify/core/dist/PNotify.css';
import { defaults } from '@pnotify/core';
// import '@pnotify/core/dist/BrightTheme.css'
// import '@pnotify/core/dist/Material.css';
// import 'material-design-icons/iconfont/material-icons.css';
import { success, error } from '@pnotify/core';
import * as basicLightbox from 'basiclightbox';
import "basiclightbox/src/styles/main.scss";

// defaults.styling = 'brighttheme';
// defaults.icons = 'brighttheme';
defaults.delay = 3000;
defaults.stack.firstpos1 = 600;
defaults.stack.firstpos2 = 80;
// defaults.addClass = 'btn-danger';
console.log(defaults);
// defaults.stack.dir1 = "down";

const input = document.querySelector('#search');
const imageApiService = new ImageApiService();
const observer = new IntersectionObserver(onEntry);
const galleryWrapper = document.querySelector(".gallery");

input.addEventListener('input', _.debounce(onInputSearch, 700));

galleryWrapper.addEventListener("click", event => {
    if (event.target.tagName !== "IMG") return false;
    const link = event.target.dataset.link;

    const instance = basicLightbox.create(`<img src=${link} width="800" height="600" />`);

    instance.show();


})

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
            await renderGallary();
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
            await renderGallary();
        } catch {
            error({
                text: "Nothing was found by your request!!!"
            });
        }

    });
};


async function renderGallary() {
    const galleryOfItems = await imageApiService.featchImage();
    markup(galleryOfItems.hits);
    observer.observe(galleryWrapper.lastElementChild);
};
