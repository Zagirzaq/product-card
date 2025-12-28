const oliveColor = '#6B8E23';
const khakiColor = '#F0E68C';

// Покраска первой карточки
const firstProductCard = document.querySelector('.card-container');
const changeButtonFirstCardColor = document.querySelector('#button-first-card-color');

changeButtonFirstCardColor.addEventListener('click', () => {
  firstProductCard.style.backgroundColor = khakiColor;
})

// Покраска всех карточек
const productCards = document.querySelectorAll('.card-container');
const changeButtonAllCardColor = document.querySelector('#button-change-all-cards-color');

changeButtonAllCardColor.addEventListener('click', () => {
  productCards.forEach((card) => card.style.backgroundColor = oliveColor);
})

// Открывает Google

const openGoogleButton = document.querySelector('#button-open-google-confirm');

openGoogleButton.addEventListener('click', openGoogl)

function openGoogl() {
  const answerConfirm = confirm('Вы действительно хотите открыть Google?');
  
  if (answerConfirm === true) {
    window.open('https://www.google.com');
  } else {
    return;
  }
}

// Вывод консоль лог и алерт

const outputButtonLogAndAlert = document.querySelector('#button-log-and-alert');
outputButtonLogAndAlert.addEventListener('click', () => outputLogAndAlert('Homework №4'))

function outputLogAndAlert(message) {
  alert(message);
  console.log(message);
}

//6. Используя слушатели событий, сделать так, что бы при наведении на главный заголовок 
//("Выбери свой продукт") - он выводился в консоль. 
//(контент элемента, а не произвольный текст, написанный от руки)

const titleList = document.querySelector('.title-list');
titleList.addEventListener('mouseover', () => {
  console.log(titleList.textContent);
})


//7. Добавить кнопку, при нажатии на которую мы будем менять её цвет с одного на другой. 
//При повторном нажатии цвет меняется с второго на первый. 
//Цвета выбираем по желанию. (Для этого советую использовать .classList)


const buttonColor = document.querySelector('#click-color-button');

buttonColor.addEventListener('click', () => {
  buttonColor.classList.toggle('color-button-khaki');
});