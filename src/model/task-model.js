import {TaskStatus} from '../const.js';

export default class TaskModel {
    #boardTasks = [];
    #observers = [];

    constructor(tasks) {
        this.#boardTasks = tasks;
    }

    addObserver(observer) {
        this.#observers.push(observer);
    }

    notifyObservers() {
        this.#observers.forEach(observer => observer());
    }

    get tasks() {
        return [...this.#boardTasks];
    }

    addTask(task) {
        this.#boardTasks.push(task);
        this.notifyObservers();
    }

    clearBasket() {
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== TaskStatus.BASKET);
        this.notifyObservers();
    }
}