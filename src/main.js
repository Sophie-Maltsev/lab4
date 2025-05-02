import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import {render, RenderPosition} from './framework/render.js';
import {tasks} from './mock/task.js';

document.addEventListener('DOMContentLoaded', () => {
    const bodyContainer = document.querySelector('.board-app');
    const formContainer = document.querySelector('.add-task');
    const taskboardContainer = document.querySelector('.taskboard');

    if (bodyContainer && formContainer && taskboardContainer) {
        const headerComponent = new HeaderComponent();
        render(headerComponent, bodyContainer, RenderPosition.BEFOREBEGIN);

        const formAddTaskComponent = new FormAddTaskComponent();
        render(formAddTaskComponent, formContainer);

        const taskModel = new TaskModel(tasks);
        const tasksBoardPresenter = new TasksBoardPresenter(taskboardContainer, taskModel);
        
        // Добавляем обработчик формы
        const taskForm = formAddTaskComponent.element;
        const taskInput = taskForm.querySelector('.add-task__input');

        taskForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            const title = taskInput.value.trim();
            
            if (title) {
                tasksBoardPresenter.createTask(title);
                taskInput.value = '';
            }
        });

        // Инициализируем презентер после настройки всех обработчиков
        tasksBoardPresenter.init();
    }
});