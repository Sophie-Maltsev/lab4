import TaskBoardComponent from '../view/taskboard-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import ClearBasketButtonComponent from '../view/clear-basket-button-component.js';
import {render} from '../framework/render.js';
import {TaskStatus, TaskStatusLabel} from '../const.js';
import {generateID} from '../utils.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #taskModel = null;
    #boardComponent = new TaskBoardComponent();
    #taskLists = new Map();

    constructor(boardContainer, taskModel) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        this.#renderBoard();
        this.#setupEventListeners();
    }

    createTask(title) {
        const newTask = {
            id: generateID(),
            title,
            status: TaskStatus.BACKLOG
        };
        this.#taskModel.addTask(newTask);
    }

    #setupEventListeners() {
        this.#boardComponent.element.addEventListener('click', (evt) => {
            if (evt.target.closest('[data-basket-clear]')) {
                this.#taskModel.clearBasket();
            }
        });
    }

    #handleModelChange() {
        this.#updateTasks();
        this.#updateClearBasketButton();
    }

    #updateClearBasketButton() {
        const clearButton = this.#boardComponent.element.querySelector('[data-basket-clear]');
        if (clearButton) {
            const basketTasks = this.#taskModel.tasks.filter(task => task.status === TaskStatus.BASKET);
            clearButton.disabled = basketTasks.length === 0;
        }
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container);
    }

    #renderNoTasks(status, container) {
        render(new NoTasksComponent(TaskStatusLabel[status]), container);
    }

    #renderTasksList(status) {
        const listComponent = new TaskListComponent(TaskStatusLabel[status], status);
        render(listComponent, this.#boardComponent.element);
        
        const tasksContainer = listComponent.element.querySelector('.tasks-container');
        this.#taskLists.set(status, { component: listComponent, container: tasksContainer });

        if (status === TaskStatus.BASKET) {
            const clearBasketButton = new ClearBasketButtonComponent();
            render(clearBasketButton, listComponent.element);
            this.#updateClearBasketButton();
        }
    }

    #updateTasks() {
        this.#taskLists.forEach((list, status) => {
            const tasksContainer = list.container;
            tasksContainer.innerHTML = '';

            const statusTasks = this.#taskModel.tasks.filter(task => task.status === status);
            
            if (statusTasks.length === 0) {
                this.#renderNoTasks(status, tasksContainer);
            } else {
                statusTasks.forEach(task => this.#renderTask(task, tasksContainer));
            }
        });
    }

    #renderBoard() {
        this.#boardContainer.innerHTML = '';
        this.#taskLists.clear();

        render(this.#boardComponent, this.#boardContainer);

        Object.values(TaskStatus).forEach(status => {
            this.#renderTasksList(status);
        });

        this.#updateTasks();
    }
}