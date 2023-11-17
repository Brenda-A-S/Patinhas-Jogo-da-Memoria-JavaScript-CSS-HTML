class MemoryGame {
    constructor(cardImgs, gameContainer, btnReset) {
        this.cardImgs = cardImgs;
        this.gameContainer = gameContainer;
        this.btnReset = btnReset;
        this.openCards = [];
        this.playSound = this.playSound.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkMatch = this.checkMatch.bind(this);
        this.init = this.init.bind(this);
        this.isProcessing = false;
    }

    playSound(audioName) {
        let audio = new Audio(`src/assets/sounds/${audioName}.mp3`);
        audio.volume = 0.2;
        audio.play();
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
            cardImg.width = '80';
            cardImg.height = '80';
            gameContainer.appendChild(card);
        })
    }

    handleClick(element) {
        if (this.isProcessing) {
            return;
        } else {
            this.playSound('flip')

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
            this.playSound('win');

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

    init() {
        this.btnReset.addEventListener('click', () => this.reset())
    }
}