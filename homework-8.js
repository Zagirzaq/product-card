import { productCards } from "./array-product-cards.js";

const productCardsTemplate = document.querySelector('#product-cards-template');
const allCardsContainer = document.querySelector('.all-cards-container');


function createProductCard(productCard) {
  const productCardClone = productCardsTemplate.content.cloneNode(true);
  productCardClone.querySelector('.product-img').src = `./images/${productCard.imageSrc}.png`;
  productCardClone.querySelector('.product-img').alt = productCard.imageAlt;
  productCardClone.querySelector('.product-name').textContent = productCard.name
  productCardClone.querySelector('.product-description').textContent = productCard.description
  const compoundList = productCardClone.querySelector('.product-compound');
  productCard.compound.forEach(item => {
    const li = document.createElement('li');
    li.className = 'product-compound-item';
    li.textContent = item;
    compoundList.appendChild(li);
  });
  productCardClone.querySelector('.product-price').innerHTML = productCard.price
  return productCardClone;
};

const productDescription = productCards.reduce((acc, item) => {
  return [...acc, { [item.name]: item.description }];
}, []);

console.log(productDescription)


function getNumberOfCards(value) {
  let result = prompt("Сколько карточек отобразить? От 1 до 5", " ")
if (result === null) {
  alert('Вы отказались от ввода')
  return 5
} else if (isNaN(result % 2)) {
  alert('Ошибка, введено НЕ ЧИСЛО')
} else if (result > 5 || result < 1) {
  alert('Ненайдено')
} else {
  alert(`Будет отображено ${result} карточки`)
  return result
}
}


function renderProductCards(cardsArray) {
  allCardsContainer.innerHTML = '';
  cardsArray.forEach(productCard => {
    const card = createProductCard(productCard);
    allCardsContainer.appendChild(card);
  });
}

function init() {
  const cardsCount = getNumberOfCards();
  const cardsToShow = productCards.slice(0, cardsCount);
  renderProductCards(cardsToShow);
}

document.addEventListener('DOMContentLoaded', init);