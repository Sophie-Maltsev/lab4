// Новая версия
import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
    #task = null; // приватное поле для хранения данных задачи

    constructor(task) {
        super(); // вызываем конструктор родительского класса
        this.#task = task; // сохраняем данные задачи в приватное поле
    }

    // переопределяем геттер template из абстрактного класса
    get template() {
        return `
            <div class="taskboard__item task">
                <div class="task__body">
                    <p class="task__view">${this.#task.title}</p>
                </div>
                <button class="task__edit" type="button" aria-label="Изменить"></button>
            </div>
        `;
    }
}