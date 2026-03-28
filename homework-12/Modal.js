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
    this.closeModal = this.closeModal.bind(this);
  }

  open() {
    this.modal.classList.add('modal-showed');
    if (this.overlay) this.overlay.classList.add('active');
    this.body.classList.add('modal-open');
    this.#initClose();
  }

  close() {
    this.modal.classList.remove('modal-showed');
    if (this.overlay) this.overlay.classList.remove('active');
    this.body.classList.remove('modal-open');
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.closeModal);
    }
    if (this.overlay) {
      this.overlay.removeEventListener('click', this.closeModal);
    }
  }

  isOpen() {
    return this.modal.classList.contains('modal-showed');
  }

  closeModal() {
    this.close();
  }

  #initClose() {
    if (this.closeBtn) {
      this.closeBtn.removeEventListener('click', this.closeModal);
      this.closeBtn.addEventListener('click', this.closeModal);
    }
    
    if (this.overlay) {
      this.overlay.removeEventListener('click', this.closeModal);
      this.overlay.addEventListener('click', this.closeModal);
    }
  }
}