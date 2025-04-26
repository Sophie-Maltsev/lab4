import TaskBoardComponent from '../view/taskboard-component.js';
import TaskListComponent from '../view/task-list-component.js';
import TaskComponent from '../view/task-component.js';
import NoTasksComponent from '../view/no-tasks-component.js';
import ClearBasketButtonComponent from '../view/clear-basket-button-component.js';
import {render} from '../framework/render.js';
import {TaskStatus, TaskStatusLabel} from '../const.js';

export default class TasksBoardPresenter {
    #boardContainer = null;
    #taskModel = null;
    #boardComponent = new TaskBoardComponent();
    #tasksByStatus = new Map();

    constructor(boardContainer, taskModel) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
    }

    init() {
        this.#groupTasksByStatus();
        this.#renderBoard();
    }

    #groupTasksByStatus() {
        this.#taskModel.tasks.forEach((task) => {
            if (!this.#tasksByStatus.has(task.status)) {
                this.#tasksByStatus.set(task.status, []);
            }
            this.#tasksByStatus.get(task.status).push(task);
        });
    }

    #renderTask(task, container) {
        render(new TaskComponent(task), container);
    }

    #renderNoTasks(status, container) {
        render(new NoTasksComponent(TaskStatusLabel[status]), container);
    }

    #renderBasketList(status) {
        const listComponent = new TaskListComponent(TaskStatusLabel[status], status);
        render(listComponent, this.#boardComponent.element);

        const tasks = this.#tasksByStatus.get(status) || [];
        
        if (tasks.length === 0) {
            this.#renderNoTasks(status, listComponent.element);
        } else {
            tasks.forEach((task) => this.#renderTask(task, listComponent.element));
        }

        render(new ClearBasketButtonComponent(), listComponent.element);
    }

    #renderTasksList(status) {
        const listComponent = new TaskListComponent(TaskStatusLabel[status], status);
        render(listComponent, this.#boardComponent.element);

        const tasks = this.#tasksByStatus.get(status) || [];
        
        if (tasks.length === 0) {
            this.#renderNoTasks(status, listComponent.element);
        } else {
            tasks.forEach((task) => this.#renderTask(task, listComponent.element));
        }
    }

    #renderBoard() {
        render(this.#boardComponent, this.#boardContainer);
    
        Object.values(TaskStatus).forEach((status) => {
            const listComponent = new TaskListComponent(TaskStatusLabel[status], status);
            render(listComponent, this.#boardComponent.element);
    
            const tasks = this.#tasksByStatus.get(status) || [];
            
            if (tasks.length === 0) {
                render(new NoTasksComponent(status), listComponent.element);
            } else {
                tasks.forEach((task) => {
                    render(new TaskComponent(task), listComponent.element);
                });
            }
    
            if (status === TaskStatus.BASKET) {
                render(new ClearBasketButtonComponent(), listComponent.element);
            }
        });
    }
}