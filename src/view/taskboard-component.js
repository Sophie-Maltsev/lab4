import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class TaskBoardComponent extends AbstractComponent {
    get template() {
        return `
            <div class="taskboard__lists">
            </div>
        `;
    }
}