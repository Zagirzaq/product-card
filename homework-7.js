// Уровень 1:
// 2. Создать массив чисел от 1 до 10. Отфильтровать его таким образом, что бы мы получил массив чисел, 
// начиная с 5.

import { socialMediaComments } from "./comments.js";

let nambersSlaice;
const nambers = [1,2,3,4,5,6,7,8,9,10];
nambersSlaice = nambers.slice(0,5);
console.log(nambersSlaice);

// 3. Создать массив строк, относящихся к любой сущности 
// (название фильмов/книг, кухонные приборы, мебель и т.д.), 
// проверить, есть ли в массиве какая-то определенная сущность.

const cutlery = ["Ложка","Вилка","Нож"];
const searchCutlery = cutlery.includes("Вилка");
console.log(searchCutlery)

// 4. Написать функцию, которая аргументом будет принимать массив 
// и изменять его порядок на противоположный ("переворачивать") . 
// Два вышеуказанных массива с помощью этой функции перевернуть.

function reverseArray (array) {
  const result = [ ...array].reverse();
  return result;
}

console.log(reverseArray(nambers))
console.log(reverseArray(cutlery))

// Уровень 2:
// 5. Добавить файл comments.js, в нём создать константу и в него поместить первые 10 объектов 
// этого массива (https://jsonplaceholder.typicode.com/comments). 
// Данный массив представляет собой пример комментариев в соц. сетях, поэтому переменная должна быть 
// названа по смыслу. Не забудьте удалить квадратные кавычки у ключей объектов 
// (можно использовать Chat GPT, что бы не делать это вручную)
// 6. Сделать константу экспортируемой, добавив перед "const" ключевое слово "export". 
// Таким образом мы сможем внедрить переменную из comments.js в homework-7.js и работать с ней. 
// Когда мы введем название переменной, нам предложит импортировать ее - так и делаем.
// 7. Вывести в консоль массив тех комментариев, почта пользователей которых содержит ".com"

const commentsWithComEmail = socialMediaComments.filter(comment => comment.email.includes(".com"));

console.log(commentsWithComEmail)

// 8. Перебрать массив таким образом, что бы пользователи с id меньше или равно 5 имели postId: 2, 
// а те, у кого id больше 5, имели postId: 1

const updatedComments = socialMediaComments.map(updateid => {
  return {...updateid, postId: updateid.id <= 5 ? 2 : 1}
});

console.log(updatedComments)

// 9. Перебрать массив, что бы объекты состояли только из айди и имени

const commentIds = socialMediaComments.map(comment => ({id: comment.id, postId: comment.postId}));

console.log(commentIds)

// 10. Перебираем массив, добавляем объектам свойство isInvalid и проверяем: если длина тела сообщения 
// (body) больше 180 символов - устанавливаем true, меньше - false.

const checkLengthArray = socialMediaComments.map(comment => ({...comment, isInvalid: comment.body.length > 180}));

console.log(checkLengthArray)
// Уровень 3:
// 11. Почитать про метод массива reduce. Используя его, вывести массив почт и провернуть тоже самое 
// с помощью метода map

const emailsViaReduce = socialMediaComments.reduce(function (acc, comment) {
    acc.push(comment.email);
    return acc;
}, [])

console.log(emailsViaReduce)

const emailsViaMap = socialMediaComments.map(comment => comment.email);

console.log(emailsViaMap)
// 12. Почитать про методы toString(), join() и перебрав массив с задания №11, привести его к строке.

const emailsViaString = emailsViaReduce.toString();  // разделитель запятая
const emailsStringViaJoin = emailsViaMap.join(';');

console.log(emailsViaString)
console.log(emailsStringViaJoin)