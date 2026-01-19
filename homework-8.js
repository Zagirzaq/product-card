import { productCards } from "./array-product-cards.js";

const productCardsTemplate = document.querySelector('#product-cards-template');
const allCardsContainer = document.querySelector('.all-cards-container');


function createProductCard(productCard) {
  const productCardClone = productCardsTemplate.content.cloneNode(true);
  productCardClone.querySelector('.product-img').src = `./images/${productCard.img}.png`;
  productCardClone.querySelector('.product-img').alt = productCard.name;
  productCardClone.querySelector('.product-name').textContent = productCard.name
  productCardClone.querySelector('.product-description').textContent = productCard.description
  const compoundList = productCardClone.querySelector('.product-compound');
  productCard.compound.forEach(item => {
    const li = document.createElement('li');
    li.className = 'product-compound-item';
    li.textContent = item;
    compoundList.appendChild(li);
  });
  productCardClone.querySelector('.product-price').innerHTML = `${productCard.price} &#8381`
  return productCardClone;
};

const productDescription = productCards.reduce((acc, item) => {
  return [...acc, { [item.name]: item.description }];}, []);

console.log(productDescription)


function getNumberOfCards(value) {
  let result = prompt("Сколько карточек отобразить? От 1 до 5", " ");
  const num = parseInt(result);
  if (result === null) {
    alert('Вы отказались от ввода');
    return 5;
  } else if (isNaN(num)) {
    alert('Ошибка, введено НЕ ЧИСЛО');
    return getNumberOfCards();
  } else if (result > 5 || result < 1) {
    alert('Число должно быть от 1 до 5');
    return getNumberOfCards();
  } else {
    alert(`Будет отображено ${result} карточки`);
    return result;
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