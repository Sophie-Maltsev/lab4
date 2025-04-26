import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class FormAddTaskComponent extends AbstractComponent {
    get template() {
        return `
            <form class="add-task__form">
                <h2 class="add-task__title">Новая задача</h2>
                <div class="add-task__input-wrapper">
                    <input type="text" 
                           class="add-task__input" 
                           placeholder="Название задачи..." 
                           required>
                </div>
                <button class="add-task__button" type="submit">
                    + Добавить
                </button>
            </form>
        `;
    }
}