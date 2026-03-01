// Modal.js
export class Modal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    if (!this.modal) {
      console.error(`Модальное окно с id "${modalId}" не найдено`);
      return;
    }

    this.overlay = document.querySelector('.overlay');
    this.body = document.body;
    this.closeBtn = this.modal.querySelector('.close-btn');

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', this.close);
    }
  }

  open() {
    this.modal.classList.add('modal-showed');
    if (this.overlay) this.overlay.classList.add('active');
    this.body.classList.add('modal-open');
  }

  close() {
    this.modal.classList.remove('modal-showed');
    if (this.overlay) this.overlay.classList.remove('active');
    this.body.classList.remove('modal-open');
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }
}