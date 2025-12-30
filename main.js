const oliveColor = '#6B8E23';
const khakiColor = '#F0E68C';

// Покраска первой карточки
const productFirstCard = document.querySelector('.card-container');
const buttonChangeFirstCardColor = document.querySelector('#first-card-color');

buttonChangeFirstCardColor.addEventListener('click', () => {
  productFirstCard.style.backgroundColor = khakiColor;
})

// Покраска всех карточек
const productCards = document.querySelectorAll('.card-container');
const changeButtonAllCardColor = document.querySelector('#all-cards-color');

changeButtonAllCardColor.addEventListener('click', () => {
  productCards.forEach((card) => card.style.backgroundColor = oliveColor);
})

// Открывает Google

const buttonOpenGoogle = document.querySelector('#open-google');

buttonOpenGoogle.addEventListener('click', openGoogle)

function openGoogle() {
  const answerConfirm = confirm('Вы действительно хотите открыть Google?');
  
  if (answerConfirm === true) {
    window.open('https://www.google.com');
  } else {
    return;
  }
}

// Вывод консоль лог и алерт

const outputButtonLogAlert = document.querySelector('#log-alert');
outputButtonLogAlert.addEventListener('click', () => outputLogAlert('Homework №4'))

function outputLogAlert(message) {
  alert(message);
  console.log(message);
}

//6. Используя слушатели событий, сделать так, что бы при наведении на главный заголовок 
//("Выбери свой продукт") - он выводился в консоль. 
//(контент элемента, а не произвольный текст, написанный от руки)

const listTitle = document.querySelector('.list-title');
listTitle.addEventListener('mouseover', () => {
  console.log(listTitle.textContent);
})


//7. Добавить кнопку, при нажатии на которую мы будем менять её цвет с одного на другой. 
//При повторном нажатии цвет меняется с второго на первый. 
//Цвета выбираем по желанию. (Для этого советую использовать .classList)


const buttonColor = document.querySelector('#button-color');

buttonColor.addEventListener('click', () => {
  buttonColor.classList.toggle('color-khaki');
});