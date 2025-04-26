// Новая версия
import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class TaskListComponent extends AbstractComponent {
    #title = null; // приватное поле для заголовка
    #status = null; // приватное поле для статуса

    constructor(title, status) {
        super();
        this.#title = title;
        this.#status = status;
    }

    get template() {
        return `
            <div class="taskboard__list" data-status="${this.#status}">
                <h3 class="taskboard__heading">${this.#title}</h3>
            </div>
        `;
    }
}