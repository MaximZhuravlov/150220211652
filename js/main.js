'use strict';

let allServices = 0;
const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
let commentsNumber = document.querySelector('.feedback__comments-number');
commentsNumber.innerText = 0;

const stats = document.querySelectorAll('.information__stats-number');
for (const item of stats) {
  allServices += Number(item.innerText);
}

document.querySelector('.information__stats-all-number').innerText = allServices;

// Retrieve data from the local storage
if (localStorage.getItem('comments')) {
  const comments = JSON.parse(localStorage.getItem('comments'));
  comments.forEach(comment => addComment(comment.author, comment.date, comment.text));
  commentsNumber.innerText = comments.length;
}

/**
 * Inserts comment to the DOM.
 * @param {string} author author of the comment.
 * @param {string} date date of the comment.
 * @param {string} text text of the comment.
 */
function addComment(author, date, text) {
  const htmlToInsert = `
    <div class="feedback__comment">
      <div class="feedback__comment-title">
        <p class="feedback__comment-author">${author}</p>
        <p class="feedback__comment-date">${date}</p>
      </div>
      <p class="feedback__comment-text">${text}</p>
    </div>
  `;

  document.querySelector('.feedback__comments').insertAdjacentHTML('beforeend', htmlToInsert);

  commentsNumber.innerText++;
}

/**
 * Saves comment to the local storage.
 * @param {string} author author of the comment.
 * @param {string} date date of the comment.
 * @param {string} text text of the comment.
 */
function saveToLocalStorage(author, date, text) {
  const comments = localStorage.getItem('comments')
    ? JSON.parse(localStorage.getItem('comments'))
    : [];
  
  comments.push({author, date, text});

  localStorage.setItem('comments', JSON.stringify(comments));
}

document.querySelector('.feedback__submit').addEventListener('click', event => {
  event.preventDefault();
  
  const input = document.querySelector('.feedback__input');
  
  if (input.value.trim() !== '') {
    const date = new Date();
    const dateElement = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;

    addComment('Anonymous', dateElement, input.value);
    saveToLocalStorage('Anonymous', dateElement, input.value);

    input.value = '';
  }
});

document.querySelector('.feedback__input').addEventListener('keyup', event => {
  event.preventDefault();

  const input = event.target;

  if (event.ctrlKey && event.key === 'Enter') {
    if (input.value.trim() !== '') {
      const date = new Date();
      const dateElement = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  
      addComment('Anonymous', dateElement, input.value);
      saveToLocalStorage('Anonymous', dateElement, input.value);
  
      input.value = '';
    }
  }
});