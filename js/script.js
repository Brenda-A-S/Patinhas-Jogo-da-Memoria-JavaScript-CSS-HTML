class MemoryGame {
    constructor(cardImgs, gameContainer) {
        this.cardImgs = cardImgs;
        this.gameContainer = gameContainer;
        this.openCards = [];
        this.handleClick = this.handleClick.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.isProcessing = false;
    }

    createCards(cardImgs, gameContainer) {
        return cardImgs.forEach(element => {
            let card = document.createElement('div');
            let cardImg = document.createElement('img');
            card.classList.add('card');
            card.classList.add(element.nome.replace(' ', ''));
            card.style.background = element.bgColor;
            card.appendChild(cardImg);
            card.addEventListener('click', () => { this.handleClick(card) })
            cardImg.src = element.src;
            cardImg.alt = element.nome;
            gameContainer.appendChild(card);
        })
    }

    handleClick(element) {
        if (this.isProcessing) {
            return;
        } else {
            if (this.openCards.length < 2 && !element.classList.contains('boxMatch') && !this.openCards.includes(element)) {
                element.classList.add('boxOpen');
                this.openCards.push(element);
                console.log('Carta aberta:', element);
            }
            if (this.openCards.length === 2) {
                this.isProcessing = true;
                console.log('Iniciando comparação...');
                setTimeout(this.checkMatch, 500);
            }
        }
    }

    checkMatch() {
        if (this.openCards.length === 2) {
            if (this.openCards[0].innerHTML === this.openCards[1].innerHTML) {
                this.openCards[0].classList.add("boxMatch");
                this.openCards[1].classList.add("boxMatch");
                console.log('Correspondência encontrada');
            } else {
                this.openCards[0].classList.remove("boxOpen");
                this.openCards[1].classList.remove("boxOpen");
                console.log('Nenhuma correspondência encontrada');
            }
        }

        this.openCards = [];

        if (document.querySelectorAll(".boxMatch").length === cardImgs.length) {
            alert("Você venceu !");
            this.reset();
        }

        this.isProcessing = false;
    }

    sortArray(arr) {
        arr.sort(() => (Math.random() > 0.5) ? 2 : -1);
        return arr;
    }

    reset() {
        this.gameContainer.innerHTML = '';
        this.openCards = [];
        this.createCards(this.sortArray(this.cardImgs), this.gameContainer);
    }
}

const cardImgs = [
    {
        src: './imgs/1.svg',
        nome: 'Gato 1',
        bgColor: '#692C2B'
    },
    {
        src: './imgs/2.svg',
        nome: 'Gato 2',
        bgColor: '#479898'
    },
    {
        src: './imgs/3.svg',
        nome: 'Gato 3',
        bgColor: '#B0A2AC'
    },
    {
        src: './imgs/4.svg',
        nome: 'Gato 4',
        bgColor: '#C2907C'
    },
    {
        src: './imgs/5.svg',
        nome: 'Gato 5',
        bgColor: '#FFE486'
    },
    {
        src: './imgs/6.svg',
        nome: 'Gato 6',
        bgColor: '#D2E2ED'
    },
    {
        src: './imgs/7.svg',
        nome: 'Gato 7',
        bgColor: '#CEE0C2'
    },
    {
        src: './imgs/8.svg',
        nome: 'Gato 8',
        bgColor: '#FF816F'
    },
    {
        src: './imgs/1.svg',
        nome: 'Gato 1',
        bgColor: '#692C2B'
    },
    {
        src: './imgs/2.svg',
        nome: 'Gato 2',
        bgColor: '#479898'
    },
    {
        src: './imgs/3.svg',
        nome: 'Gato 3',
        bgColor: '#B0A2AC'
    },
    {
        src: './imgs/4.svg',
        nome: 'Gato 4',
        bgColor: '#C2907C'
    },
    {
        src: './imgs/5.svg',
        nome: 'Gato 5',
        bgColor: '#FFE486'
    },
    {
        src: './imgs/6.svg',
        nome: 'Gato 6',
        bgColor: '#D2E2ED'
    },
    {
        src: './imgs/7.svg',
        nome: 'Gato 7',
        bgColor: '#CEE0C2'
    },
    {
        src: './imgs/8.svg',
        nome: 'Gato 8',
        bgColor: '#FF816F'
    }
]

const gameContainer = document.querySelector('.game');

const game = new MemoryGame(cardImgs, gameContainer);

const btnReset = document.querySelector('.reset');

game.createCards(game.sortArray(cardImgs), gameContainer);

btnReset.addEventListener('click',() => game.reset());