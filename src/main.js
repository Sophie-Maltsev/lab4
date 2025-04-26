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
        // Рендерим header
        const headerComponent = new HeaderComponent();
        render(headerComponent, bodyContainer, RenderPosition.BEFOREBEGIN);

        // Рендерим форму добавления
        const formAddTaskComponent = new FormAddTaskComponent();
        render(formAddTaskComponent, formContainer);

        // Инициализируем модель
        const taskModel = new TaskModel(tasks);

        // Инициализируем презентер
        const tasksBoardPresenter = new TasksBoardPresenter(taskboardContainer, taskModel);
        tasksBoardPresenter.init();
    } else {
        console.error('Не найдены необходимые контейнеры на странице');
    }
});