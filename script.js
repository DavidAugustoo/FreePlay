const s = (el) => document.querySelector(el);
const sa = (el) => document.querySelectorAll(el);


// animatios

let target = document.querySelectorAll('[data-anime]');

window.addEventListener('scroll', () => {
    let windowTop = window.scrollY + ((window.innerHeight * 3) / 4);

    target.forEach(element => {
        if((windowTop) > element.offsetTop) {
            element.classList.add('animate');
        } else {
            element.classList.remove('animate');
        }
    });
});

// menu mobile

let menuMobileIcon = s('.menu-mobile--icon');
let menuMobile = s('.menu-mobile');

menuMobileIcon.addEventListener('click', () => {
    if(menuMobile.classList.contains('closed')) {
        menuMobile.classList.remove('closed');
        menuMobile.classList.add('open');
    } else {
        menuMobile.classList.remove('open');
        menuMobile.classList.add('closed');
    }
});

// carousel

let currentSlide = 0;

function goNext() {
        currentSlide++;
        if(currentSlide > 2) {
            currentSlide = 0;
        }

        updateMargin();
}

function goBack() {
    currentSlide--;
    if(currentSlide < 2) {
        currentSlide = 0;
    }
    
    updateMargin();
}

function updateMargin() {
    let slideritemWidth = s('.carousel--item').clientWidth;
    let newMargin = (currentSlide * slideritemWidth);
    s('.carousel--item').style.marginLeft = `-${newMargin}px`
}

// games

let url = "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity";
let page = 0;
let json = [];

async function getGames() {

    let response = await fetch(url, {
        "method": "GET",
	    "headers": {
		"x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
		"x-rapidapi-key": "03fb1e4f2dmsh6bb237e14e40631p173a3ajsnf3d499c72407"
	}});

    return response.json();
}

async function addGamesIntoDom() {

    const games = await getGames();
    json = games;

    const newJson = json.slice(16 * page, (16 * page) + 16);

    newJson.map((item) => {
        let gameCard = s('.modal .game-card').cloneNode(true);

        gameCard.querySelector('.game--image img').src = item.thumbnail;
        gameCard.querySelector('.game--title').innerHTML = `{${item.title.substring(0,25)}`;
        gameCard.querySelector('.game--resume').innerHTML = `${item.short_description.substring(0,55)}...`;
        gameCard.querySelector('.tag').innerHTML = item.genre;

        s('.game-area').append(gameCard);
    });
}

addGamesIntoDom();

window.addEventListener('scroll', () => {
    const {clientHeight, scrollHeight, scrollTop} = document.documentElement

    if(scrollTop + clientHeight >= scrollHeight - 10) {
        page++;
        addGamesIntoDom();
    }
});