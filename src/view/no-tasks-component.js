import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class NoTasksComponent extends AbstractComponent {
    #status = null;

    constructor(status) {
        super();
        this.#status = status;
    }

    get template() {
        return `
            <p class="taskboard__empty">
                В списке «${this.#status}» пока нет задач
            </p>
        `;
    }
}