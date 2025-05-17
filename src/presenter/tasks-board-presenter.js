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
    #draggedTaskId = null;

    constructor(boardContainer, taskModel) {
        this.#boardContainer = boardContainer;
        this.#taskModel = taskModel;
        this.#taskModel.addObserver(this.#handleModelChange.bind(this));
    }

    init() {
        console.log('Presenter Init: Rendering board...'); 
        this.#renderBoard();
        console.log('Presenter Init: Setting up event listeners...'); 
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

    #handleDragStart(evt) {
        const taskElement = evt.target.closest('.task');
        if (!taskElement) {
            return;
        }
        this.#draggedTaskId = taskElement.dataset.taskId;
        console.log(`Drag Start: Task ID = ${this.#draggedTaskId}`); 
        evt.dataTransfer.setData('text/plain', this.#draggedTaskId);
        evt.dataTransfer.effectAllowed = 'move';
    }

    #handleDragOver(evt) {
        evt.preventDefault(); 
        const targetList = evt.target.closest('.taskboard__list');
        if (targetList && this.#draggedTaskId) {
             console.log(`Drag Over: List = ${targetList.dataset.status}`); 
             evt.dataTransfer.dropEffect = 'move';
            
        } else {
             evt.dataTransfer.dropEffect = 'none';
        }
    }

    #handleDragLeave(evt) {
        const targetList = evt.target.closest('.taskboard__list');
         if (targetList) {
             console.log(`Drag Leave: List = ${targetList.dataset.status}`); 
             
         }
    }

    #handleDrop(evt) {
        evt.preventDefault();
        const targetListElement = evt.target.closest('.taskboard__list');
        console.log('Drop Event Fired'); 

        if (!targetListElement || !this.#draggedTaskId) {
            console.warn('Drop failed: No target list or dragged task ID.'); 
            this.#draggedTaskId = null;
            return;
        }

        const targetStatus = targetListElement.dataset.status;
        const draggedTaskId = this.#draggedTaskId;
        this.#draggedTaskId = null; 

        console.log(`Drop: Task ID ${draggedTaskId} onto Status ${targetStatus}`); 
        const currentTask = this.#taskModel.tasks.find(task => String(task.id) === String(draggedTaskId)); 

        if (currentTask) {
             console.log(`Drop: Current task status = ${currentTask.status}`); 
             if (currentTask.status !== targetStatus) {
                 console.log('Drop: Status changed, updating model...'); 
                 this.#taskModel.updateTaskStatus(draggedTaskId, targetStatus);
             } else {
                 console.log('Drop: Status is the same, no update needed.'); 
             }
        } else {
             console.warn(`Drop failed: Task with ID ${draggedTaskId} not found in model.`); 
        }
        
    }

    #handleDragEnd(evt) {
        console.log('Drag End'); 
        this.#draggedTaskId = null; 
   }

   #setupEventListeners() {
       console.log('Setting up board listeners...'); 
       this.#boardComponent.element.addEventListener('click', (evt) => {
           if (evt.target.closest('[data-basket-clear]')) {
               console.log('Clear basket clicked'); 
               this.#taskModel.clearBasket();
           }
       });

       const boardElement = this.#boardComponent.element;
       boardElement.addEventListener('dragstart', this.#handleDragStart.bind(this));
       boardElement.addEventListener('dragover', this.#handleDragOver.bind(this));
       boardElement.addEventListener('dragleave', this.#handleDragLeave.bind(this));
       boardElement.addEventListener('drop', this.#handleDrop.bind(this));
       boardElement.addEventListener('dragend', this.#handleDragEnd.bind(this));
       console.log('Drag & Drop listeners added.');
   }

   #handleModelChange() {
       console.log('Model Changed: Updating tasks and button...'); 
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
        if (!tasksContainer) {
             console.error(`Could not find .tasks-container within list for status ${status}`);
             return; 
        }

        this.#taskLists.set(status, { component: listComponent, container: tasksContainer });

        if (status === TaskStatus.BASKET) {
            const clearBasketButton = new ClearBasketButtonComponent();
            render(clearBasketButton, listComponent.element);
        }
    }

    #updateTasks() {
        this.#taskLists.forEach((listInfo, status) => {
            const tasksContainer = listInfo.container;
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
        render(this.#boardComponent, this.#boardContainer);

        this.#taskLists.clear();

        Object.values(TaskStatus).forEach(status => {
            this.#renderTasksList(status);
        });

        this.#updateTasks();

        this.#updateClearBasketButton();
    }
}