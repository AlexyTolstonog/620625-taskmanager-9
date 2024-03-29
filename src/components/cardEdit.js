import {AbstractComponent} from './abstarct.js';
import moment from 'moment';
import {KeyCode} from './utils.js';
export class CardEdit extends AbstractComponent {
  constructor({description, dueDate, tags, color, repeatingDays, id}) {
    super();
    this._description = description;
    this._dueDate = new Date(dueDate);
    this._tags = tags;
    this._color = color;
    this._repeatingDays = repeatingDays;
    this._id = id;

    this._subscribeOnEvents();
  }


  getTemplate() {
    return `<article data-id="${this._id}" class="card card--edit card--${this._color} ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `card--repeat` : ``}">
  <form class="card__form" method="get">
   <div class="card__inner">
      <div class="card__control">
         <button type="button" class="card__btn card__btn--archive"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
         архив
         </font></font></button>
         <button type="button" class="card__btn card__btn--favorites card__btn--disabled"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
         избранное
         </font></font></button>
      </div>
      <div class="card__color-bar">
         <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
         </svg>
      </div>
      <div class="card__textarea-wrap">
         <label>
         <textarea class="card__text" placeholder="Start typing your text here..." name="text">${this._description}</textarea>
         </label>
      </div>
      <div class="card__settings">
         <div class="card__details">
            <div class="card__dates">
               <button class="card__date-deadline-toggle" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
               дата: </font></font><span class="card__date-status"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${this._dueDate ? `да` : `нет`}</font></font></span>
               </button>
               ${this._dueDate ? `  <fieldset class="card__date-deadline">
               <label class="card__input-deadline-wrap">
               <input class="card__date" type="text" placeholder="" name="date" value="${moment(this._dueDate).format(`dddd, MMMM Do YYYY`)}">
               </label>
            </fieldset>` : ``}
               <button class="card__repeat-toggle" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
               повторить: </font></font><span class="card__repeat-status"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
               ${Object.keys(this._repeatingDays).some((day) => this._repeatingDays[day]) ? `да` : `нет`}</font></font></span>
               </button>
               <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-mo-4" name="repeat" value="mo"
                     ${this._repeatingDays.mo ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-mo-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">мо</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-tu-4" name="repeat" value="tu"
                     ${this._repeatingDays.tu ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-tu-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">вт</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-we-4" name="repeat" value="we"
                     ${this._repeatingDays.we ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-we-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">мы</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-th-4" name="repeat" value="th"
                     ${this._repeatingDays.th ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-th-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">го</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-fr-4" name="repeat" value="fr"
                     ${this._repeatingDays.fr ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-fr-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">фр</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" name="repeat" value="sa" id="repeat-sa-4"
                     ${this._repeatingDays.sa ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-sa-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">са</font></font></label>
                     <input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-su-4" name="repeat" value="su"
                     ${this._repeatingDays.su ? `checked=""` : ``}>
                     <label class="card__repeat-day" for="repeat-su-4"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">су</font></font></label>
                  </div>
               </fieldset>
            </div>
            <div class="card__hashtag">
               <div class="card__hashtag-list">
               ${Array.from(this._tags).map((tag) => `<span class="card__hashtag-inner">
                     <input type="hidden" name="hashtag" value="repeat" class="card__hashtag-hidden-input">
                     <p class="card__hashtag-name"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                        #${tag}
                        </font></font>
                     </p>
                     <button type="button" class="card__hashtag-delete"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
                     удалять
                     </font></font></button>
                  </span>`).join(``)}
               </div>
               <label>
               <input type="text" class="card__hashtag-input" name="hashtag-input" placeholder="Type new hashtag here">
               </label>
            </div>
         </div>
         <div class="card__colors-inner">
            <h3 class="card__colors-title"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">цвет</font></font></h3>
            <div class="card__colors-wrap">

               <input type="radio" id="color-black-4" class="card__color-input card__color-input--black visually-hidden" name="color" value="black" ${this._color === `black` ? `checked=""` : ``}>
               <label for="color-black-4" class="card__color card__color--black"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">черный</font></font></label>

               <input type="radio" id="color-yellow-4" class="card__color-input card__color-input--yellow visually-hidden" name="color" value="yellow" ${this._color === `yellow` ? `checked=""` : ``}>
               <label for="color-yellow-4" class="card__color card__color--yellow"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">желтый</font></font></label>

               <input type="radio" id="color-blue-4" class="card__color-input card__color-input--blue visually-hidden" name="color" value="blue" ${this._color === `blue` ? `checked=""` : ``}>
               <label for="color-blue-4" class="card__color card__color--blue"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">синий</font></font></label>

               <input type="radio" id="color-green-4" class="card__color-input card__color-input--green visually-hidden" name="color" value="green" ${this._color === `green` ? `checked=""` : ``}>
               <label for="color-green-4" class="card__color card__color--green"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">зеленый</font></font></label>

               <input type="radio" id="color-pink-4" class="card__color-input card__color-input--pink visually-hidden" name="color" value="pink" ${this._color === `pink` ? `checked=""` : ``}>
               <label for="color-pink-4" class="card__color card__color--pink"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">розовый</font></font></label>

               </div>
         </div>
      </div>
      <div class="card__status-btns">
         <button class="card__save" type="submit"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">спасти</font></font></button>
         <button class="card__delete" type="button"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">удалять</font></font></button>
      </div>
   </div>
  </form>
</article>`;
  }
  _subscribeOnEvents() {
    this.getElement()
      .querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === KeyCode.ENTER_KEY) {
          evt.preventDefault();
          this.getElement().querySelector(`.card__hashtag-list`).insertAdjacentHTML(`beforeend`, `<span class="card__hashtag-inner">
          <input
            type="hidden"
            name="hashtag"
            value="${evt.target.value}"
            class="card__hashtag-hidden-input"
          />
          <p class="card__hashtag-name">
            #${evt.target.value}
          </p>
          <button type="button" class="card__hashtag-delete">
            delete
          </button>
        </span>`);
          evt.target.value = ``;
        }
      });
  }
}
