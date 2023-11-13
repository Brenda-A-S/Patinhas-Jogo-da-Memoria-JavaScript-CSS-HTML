const cardImgs = [
    {
        src: '../assets/imgs/bluePotion.svg',
        nome: 'Poção azul'
    },
    {
        src: '../assets/imgs/cristal.svg',
        nome: 'Cristal'
    },
    {
        src: '../assets/imgs/grayGrimoire.svg',
        nome: 'Grimório cinza'
    },
    {
        src: '../assets/imgs/normalGrimoire.svg',
        nome: 'Grimório normal'
    },
    {
        src: '../assets/imgs/pinkPotion.svg',
        nome: 'Poção Rosa'
    },
    {
        src: '../assets/imgs/purpleRoundedPotion.svg',
        nome: 'Poção Roxa'
    },
    {
        src: '../assets/imgs/redPotion.svg',
        nome: 'Poção Vermelha'
    },
    {
        src: '../assets/imgs/greenPotion.svg',
        nome: 'Poção Verde'
    },
    {
        src: '../assets/imgs/bluePotion.svg',
        nome: 'Poção azul'
    },
    {
        src: '../assets/imgs/cristal.svg',
        nome: 'Cristal'
    },
    {
        src: '../assets/imgs/grayGrimoire.svg',
        nome: 'Grimório cinza'
    },
    {
        src: '../assets/imgs/normalGrimoire.svg',
        nome: 'Grimório normal'
    },
    {
        src: '../assets/imgs/pinkPotion.svg',
        nome: 'Poção Rosa'
    },
    {
        src: '../assets/imgs/purpleRoundedPotion.svg',
        nome: 'Poção Roxa'
    },
    {
        src: '../assets/imgs/redPotion.svg',
        nome: 'Poção Vermelha'
    },
    {
        src: '../assets/imgs/greenPotion.svg',
        nome: 'Poção Verde'
    }
]

let openCards = []

const gameContainer = document.querySelector('.game')

const sortCards = cardImgs.sort(() => (Math.random() > 0.5) ? 2 : -1)

cardImgs.forEach(element => {
    let card = document.createElement('div');
    let cardImg = document.createElement('img');
    card.classList.add('card');
    card.classList.add(element.nome.replace(' ', ''));
    card.appendChild(cardImg);
    card.onclick = handleClick;
    cardImg.src = element.src;
    gameContainer.appendChild(card);
})

function handleClick() {
    if (openCards.length < 2) {
        this.classList.add('boxOpen')
        openCards.push(this)
    }
    console.log(openCards);
    if (openCards.length === 2) {
        setTimeout(checkMatch, 500)
    }
}


function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
    }

    openCards = [];

    if (document.querySelectorAll(".boxMatch").length === cardImgs.length) {
        alert("Você venceu !");
    }
}