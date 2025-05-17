import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class TaskComponent extends AbstractComponent {
    #task = null;

    constructor(task) {
        super();
        this.#task = task;
    }

    get template() {
        return `
            <div class="taskboard__item task" draggable="true" data-task-id="${this.#task.id}">
                <div class="task__body">
                    <p class="task__view">${this.#task.title}</p>
                </div>
                <button class="task__edit" type="button" aria-label="Изменить"></button>
            </div>
        `;
    }
}