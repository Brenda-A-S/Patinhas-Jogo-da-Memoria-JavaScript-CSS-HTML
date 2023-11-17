export default class Modal {
    constructor(btnOpen, btnClose, btnPlay, containerModal, title, text) {

        this.btnOpen = document.querySelector(btnOpen);
        this.btnClose = document.querySelector(btnClose);
        this.btnPlay = document.querySelector(btnPlay);
        this.containerModal = document.querySelector(containerModal);
        this.title = document.querySelector(title);
        this.text = document.querySelector(text);

        this.toggleModal = this.toggleModal.bind(this);
        this.eventToggleModal = this.eventToggleModal.bind(this);
        this.outsideClick = this.outsideClick.bind(this);
    }
    toggleModal() {
        this.containerModal.classList.toggle('active');
    }
    eventToggleModal(event) {
        event.preventDefault();
        this.toggleModal();
    }
    outsideClick(event) {
        if (event.target === this.containerModal) {
            this.toggleModal();
        }
    }
    newHTMLModal(newTitle, newText, newBtn) {
        this.title.textContent = newTitle;
        this.text.textContent = newText;
        this.btnPlay.textContent = newBtn;
    }
    addEvents() {
        if (this.btnOpen) {
            this.btnOpen.addEventListener('click', this.toggleModal);
        }
        if (this.btnClose && this.containerModal) {
            this.btnClose.addEventListener('click', this.toggleModal);
            this.btnPlay.addEventListener('click', this.toggleModal);
            this.containerModal.addEventListener('click', this.outsideClick);
        }
    }
    init() {
        this.addEvents();
        return this;
    }
}
