export default class Modal {
    constructor(btnOpen, btnClose, btnPlay, container, title, text) {

        this.btnOpen = document.querySelector(btnOpen);
        this.btnClose = document.querySelector(btnClose);
        this.btnPlay = document.querySelector(btnPlay);
        this.container = document.querySelector(container);
        this.title = document.querySelector(title);
        this.text = document.querySelector(text);

        this.toggleModal = this.toggleModal.bind(this);
        this.newHTMLModal = this.newHTMLModal.bind(this);
        this.init = this.init.bind(this);
    }
    toggleModal(event) {
        event.preventDefault();
        this.container.classList.toggle('active');
    }
    newHTMLModal(newTitle, newText, newBtn){
        this.title.textContent = newTitle;
        this.text.textContent = newText;
        this.btnPlay.textContent = newBtn;
    }
    init() {
        if (this.btnOpen) {
            this.btnOpen.addEventListener('click', this.toggleModal);
        }
        if (this.btnClose && this.container) {
            this.btnClose.addEventListener('click', this.toggleModal);
            this.btnPlay.addEventListener('click', this.toggleModal);
            this.container.addEventListener('click', this.cliqueForaModal);
        }
    }
}
