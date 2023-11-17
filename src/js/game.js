export default class MemoryGame {
    constructor(cardImgs, gameContainer, btnReset, modal) {
        this.cardImgs = cardImgs;
        this.gameContainer = document.querySelector(gameContainer);
        this.btnReset = btnReset = document.querySelector(btnReset);
        this.openCards = [];

        this.playSound = this.playSound.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.checkMatch = this.checkMatch.bind(this);

        if (this.title === undefined) this.title = 'Você venceu!';
        else this.title = title;
        if (this.text === undefined) this.text = 'Jogar novamente?';
        else this.text = text;
        if (this.btn === undefined) this.btn = 'Jogar novamente!';
        else this.btn = btn;

        this.modal = modal;

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

    addCards() {
        this.createCards(this.constructor.sortArray(this.cardImgs), this.gameContainer);
    }

    handleClick(element) {
        if (this.isProcessing) {
            return;
        } else {
            this.playSound('flip')

            if (this.openCards.length < 2 && !element.classList.contains('boxMatch') && !this.openCards.includes(element)) {
                element.classList.add('boxOpen');
                this.openCards.push(element);
            }
            if (this.openCards.length === 2) {
                this.isProcessing = true;
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
            } else {
                this.openCards[0].classList.remove("boxOpen");
                this.openCards[1].classList.remove("boxOpen");
            }
        }

        this.openCards = [];

        if (document.querySelectorAll(".boxMatch").length === this.cardImgs.length) {
            this.openResult();
            this.reset();
        }

        this.isProcessing = false;
    }

    static sortArray(arr) {
        arr.sort(() => (Math.random() > 0.5) ? 2 : -1);
        return arr;
    }

    setResultContent(title, text, btn) {
        this.title = title;
        this.text = text;
        this.btn = btn;
    }

    openResult() {
        this.modal.newHTMLModal(this.title, this.text, this.btn);
        this.modal.toggleModal();
    }

    reset() {
        this.gameContainer.innerHTML = '';
        this.openCards = [];
        this.createCards(this.constructor.sortArray(this.cardImgs), this.gameContainer);
    }

    init() {
        this.btnReset.addEventListener('click', () => this.reset());
        this.addCards();
    }
}