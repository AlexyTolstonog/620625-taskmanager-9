import {card} from './components/data.js';
import {getComponentMenu} from './components/menu.js';
import {getComponentFilter} from './components/filter.js';
import {getComponentSearch} from './components/search.js';
import {getComponentBoardFilter} from './components/boardFilter.js';
import {getComponentCard} from './components/card.js';
import {getComponentCardEdit} from './components/cardEdit.js';
import {getComponentLoadMoreButton} from './components/loadMoreButton.js';
const NUMBER_OF_REPETITIONS_CARDS = 3;

const main = document.querySelector(`.main`);
const mainControl = document.querySelector(`.main__control`);

const insertMarkup = (markupContainer, markup, position) => {
  markupContainer.insertAdjacentHTML(position, markup);
};

const boardContainer = document.createElement(`section`);
boardContainer.classList.add(`board`, `container`);

const boardTaskContainer = document.createElement(`div`);
boardTaskContainer.classList.add(`board__tasks`);

insertMarkup(mainControl, getComponentMenu(), `beforeend`);

insertMarkup(main, getComponentSearch(), `beforeend`);

insertMarkup(main, getComponentFilter(), `beforeend`);

main.appendChild(boardContainer);

insertMarkup(boardContainer, getComponentBoardFilter(), `beforeend`);

boardContainer.appendChild(boardTaskContainer);

insertMarkup(boardTaskContainer, getComponentCardEdit(), `beforeend`);

new Array(NUMBER_OF_REPETITIONS_CARDS).fill(getComponentCard()).forEach(() => {
  insertMarkup(boardTaskContainer, getComponentCard(card), `beforeend`);
});
insertMarkup(boardContainer, getComponentLoadMoreButton(), `beforeend`);


