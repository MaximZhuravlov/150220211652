'use strict';

let allServices = 0;
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const stats = document.querySelectorAll('.information__stats-number');
for (const item of stats) {
  allServices += Number(item.innerText);
}

document.querySelector('.information__stats-all-number').innerText = allServices;

document.querySelector('.feedback__submit').addEventListener('click', event => {
  event.preventDefault();
  
  const input = document.querySelector('.feedback__input');
  
  if (input.value.trim() !== '') {
    const date = new Date();
    const dateElement = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    const htmlToInsert = `
      <div class="feedback__comment">
        <div class="feedback__comment-title">
          <p class="feedback__comment-author">Anonymous</p>
          <p class="feedback__comment-date">${dateElement}</p>
        </div>
        <p class="feedback__comment-text">${input.value}</p>
      </div>
    `;

    document.querySelector('.feedback__comments').insertAdjacentHTML('afterbegin', htmlToInsert);

    input.value = '';
  }
});