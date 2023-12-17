import Data from "./data"

export default class Navigation {
    constructor() { this.setup(); }
    setup()
    {
        this.setupBottomButton();
        this.setupTopButton();
        this.setupRandomButton();
        this.setupBookshelfButton();
    }

    setupBottomButton()
    {
        const bottomBtn = document.getElementById('gotoBottomBtn');
        const footer = document.getElementById('site-footer');
        if(!bottomBtn || !footer) { return console.error("Can't load gotoBottom if footer or button nonexistent"); }
       
        bottomBtn.addEventListener('click', (ev) => {
            footer.scrollIntoView({'behavior': 'smooth'}); 
            return false;
        })
    }

    setupTopButton()
    {
        const topBtn = document.getElementById('gotoTopBtn');
        if(!topBtn) { return console.error("Can't load gotoTop if button nonexistent"); }

        topBtn.addEventListener('click', function(ev) {
            window.scrollTo({top: 0, behavior: 'smooth'}); 
            return false;
        })
    }

    setupRandomButton()
    {
        const randBtn = document.getElementById('randProjBtn');
        if(!randBtn) { return console.error("Can't load randomButton if button nonexistent"); }

        const projectList = Data.getMetaAttributes().stories.split(",");
        randBtn.addEventListener('click', (ev) => {
            const randURL = projectList[Math.floor(Math.random() * projectList.length)];
            return (window.location.href = randURL);
        })
    }

    setupBookshelfButton()
    {
        const bookshelfBtn = document.getElementById('bookshelfBtn');
        if(!bookshelfBtn) { return console.error("Can't load bookshelf button without button"); }

        bookshelfBtn.addEventListener('click', (ev) => {
            return (window.location.href = bookshelfBtn.dataset.url);
        });
    }
}