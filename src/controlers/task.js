import {AbstractComponent} from "../components/abstarct";
import {Card} from "../components/card";
import {CardEdit} from "../components/cardEdit";
import {render, Position, KeyCode, unrender} from './../components/utils.js';
import moment from 'moment';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';


export class TaskController extends AbstractComponent {
  constructor(container, data, onDataChange, onChangeView) {
    super();
    this._taskList = container;
    this._cards = data;
    this._card = new Card(data);
    this._cardEdit = new CardEdit(data);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this.init();
  }
  init() {
    flatpickr(this._cardEdit.getElement().querySelector(`.card__date`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._cards.dueDate,
    });

    const cardElement = this._card.getElement();
    const cardEditElement = this._cardEdit.getElement();
    const delOnClick = () => {
      this._card.removeElement();
      this._cardEdit.removeElement();
    };

    const onEscKeyDown = (evt) => {
      if (evt.keyCode === KeyCode.ESK_KEY) {
        this._taskList.getElement().replaceChild(cardElement, cardEditElement);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    cardElement
      .querySelector(`.card__btn--edit`)
      .addEventListener(`click`, () => {
        this._onChangeView();
        this._taskList.getElement().replaceChild(cardEditElement, cardElement);
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    cardEditElement.querySelector(`textarea`)
      .addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    cardEditElement.querySelector(`textarea`)
      .addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });

    const onButtonDedlineToogleClick = () => {
      const cardDedlineDateContainer = cardEditElement.querySelector(`.card__date-deadline`);
      const cardDedlineStaus = cardEditElement.querySelector(`.card__date-status`);
      const cardData = cardEditElement.querySelector(`.card__date`);
      cardDedlineDateContainer.classList.toggle(`visually-hidden`);
      if (cardDedlineStaus.textContent === `да`) {
        cardDedlineStaus.textContent = `нет`;
      } else {
        cardDedlineStaus.textContent = `да`;
      }
      if (cardDedlineStaus === `нет`) {
        cardData.value = null;
      } else {
        cardData.value = `"${moment(this._dueDate).format(`dddd, MMMM Do YYYY`)}"`;
      }
    };

    cardEditElement.querySelector(`.card__date-deadline-toggle`).
      addEventListener(`click`, onButtonDedlineToogleClick);

    cardEditElement
      .querySelector(`.card__save`)
      .addEventListener(`click`, () => {
        this._taskList.getElement().replaceChild(cardElement, cardEditElement);
        const formData = new FormData(cardEditElement.querySelector(`.card__form`));
        const entry = {
          description: formData.get(`text`),
          dueDate: new Date(formData.get(`date`)),
          color: formData.get(`color`),
          tags: formData.getAll(`hashtag`),
          repeatingDays: formData.getAll(`repeat`).reduce((acc, it) => {
            acc[it] = true;
            return acc;
          }, {
            'mo': false,
            'tu': false,
            'we': false,
            'th': false,
            'fr': false,
            'sa': false,
            'su': false,
          })
        };
        this._onDataChange(entry, this._cards);

        document.removeEventListener(`keydown`, onEscKeyDown);
      });

    cardEditElement.querySelector(`.card__delete`)
      .addEventListener(`click`, delOnClick);

    const delButton = cardEditElement.querySelectorAll(`.card__hashtag-delete`);
    if (delButton) {
      delButton.forEach((element) => {
        element.addEventListener(`click`, (evt) => {
          let target = evt.target.closest(`span`);
          unrender(target);
        });
      });
    }

    render(this._taskList.getElement(), cardElement, Position.BEFOREEND);

  }
  setDefaultView() {
    if (this._taskList.getElement().contains(this._cardEdit.getElement())) {
      this._taskList.getElement().replaceChild(this._card.getElement(), this._cardEdit.getElement());
    }
  }
}
