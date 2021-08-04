export default class ImageApiService {
    constructor() {
        this.searchName = "";
        this.link = "https://pixabay.com/api/?image_type=photo&orientation=horizontal";
        this.key = "&key=22753244-01291854404e32317fab358dd";
        this.page = 1;
    }

    featchImage = async function () {

        try {
            if (!this.searchName) return false
            const result = await fetch(`${this.link}&q=${this.searchName}&page=${this.page}&per_page=12${this.key}`);
            const foundImages = await result.json();
            this.page += 1;
            return foundImages;
        } catch (error) {
            console.log(error);
        }
    }

    get query() {
        return this.searchName;
    }

    set query(newQuery) {
        this.searchName = newQuery;
    }

}

