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
let plataform = '?platform=all';
let category = '';
let url = `https://free-to-play-games-database.p.rapidapi.com/api/games${plataform}${category}&sort-by=popularity`;
console.log(url);
let page = 0;
let inputFilter = document.querySelector('.search-game');

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

        let json = await getGames();

        console.log(json)

        json.map((item) => {
        let gameCard = s('.modal .game-card').cloneNode(true);

        gameCard.querySelector('.game--image img').src = item.thumbnail;
        gameCard.querySelector('.game--title').innerHTML = `${item.title.substring(0,25)}`;
        gameCard.querySelector('.game--resume').innerHTML = `${item.short_description.substring(0,55)}...`;
        gameCard.querySelector('.tag--genre').innerHTML = item.genre;
        gameCard.querySelector('.tag--platform img').src = WhatThisPlataform(item.platform);
        gameCard.querySelector('.game-card--link').href = item.game_url;

        s('.game-area').append(gameCard);
    });
}

function WhatThisPlataform(platform) {
    if(platform == "PC (Windows)") {
        return '/assets/images/iconWindows.png';
    } else {
        return '/assets/images/iconBrowser.png';
    }
}

addGamesIntoDom();

inputFilter.addEventListener('input', event => {
    let inputValue = event.target.value.toLowerCase();
    let games = document.querySelectorAll('.game-card');
    let warning = document.querySelector('.game--warning');

    games.forEach((game) => {
        let gameTitle = game.querySelector('.game--title').textContent.toLowerCase();

        if(gameTitle.includes(inputValue)) {
            game.style.display = 'flex';
        } else {
            game.style.display = 'none'; 
        }

    });

});

// filter

let filterOptionsPlatform = s('.filter-options--platform');
let filterOptionsGenre = s('.filter-options--genre')

s('.filter-desc--platform').addEventListener('click', () => {
    if (filterOptionsPlatform.classList.contains('closed')) {
        filterOptionsPlatform.classList.remove('closed');
    } else {
        filterOptionsPlatform.classList.add('closed');
    }
    
});

s('.filter-desc--genre').addEventListener('click', () => {
    if (filterOptionsGenre.classList.contains('closed')) {
        filterOptionsGenre.classList.remove('closed');
    } else {
        filterOptionsGenre.classList.add('closed');
    }
    
});

sa('.filter--item--platform').forEach((option) => {
    option.addEventListener('click', (el) => {
        s('.filter--item--platform.selected').classList.remove('selected');
        option.classList.add('selected');
       
        let platformSelected = s('.filter--item--platform.selected').getAttribute('data-key');
        s('.currentSelected--platform').innerHTML = s('.filter--item--platform.selected').getAttribute('data-name');
        
        filterPlataform(platformSelected);
        filterOptionsPlatform.classList.add('closed');
    });
});

sa('.filter--item--genre').forEach((option) => {
    option.addEventListener('click', (el) => {
        s('.filter--item--genre.selected').classList.remove('selected');
        option.classList.add('selected');
       
        let genreSelected = s('.filter--item--genre.selected').getAttribute('data-key');
        s('.currentSelected--genre').innerHTML = genreSelected;
        
        filterGenre(genreSelected);
        filterOptionsGenre.classList.add('closed');
    });
});

function filterPlataform(platformSelected) {
    
    plataform = `?platform=${platformSelected}`;

    url = `https://free-to-play-games-database.p.rapidapi.com/api/games${plataform}${category}&sort-by=popularity`;
    s('.game-area').innerHTML = '';
    getGames();
    addGamesIntoDom();
}

function filterGenre(genreSelected) {
    
    if(genreSelected == 'todos') {
        category = '';
    } else {
        category = `&category=${genreSelected}`;
    }
   

    url = `https://free-to-play-games-database.p.rapidapi.com/api/games${plataform}${category}&sort-by=popularity`;

    getGames();
    s('.game-area').innerHTML = '';
    addGamesIntoDom();
}


