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

    updateTaskStatus(taskId, newStatus) {
        const numericTaskId = parseInt(taskId, 10); 

        const taskIndex = this.#boardTasks.findIndex(task => task.id === numericTaskId);

        if (taskIndex === -1) {
            console.warn(`Task with ID ${numericTaskId} not found.`); 
            return; 
        }

        if (this.#boardTasks[taskIndex].status !== newStatus) {
            console.log(`Updating task ${numericTaskId} from ${this.#boardTasks[taskIndex].status} to ${newStatus}`); 
            this.#boardTasks[taskIndex] = {
                ...this.#boardTasks[taskIndex],
                status: newStatus
            };
            this.notifyObservers(); 
        } else {
             console.log(`Task ${numericTaskId} already has status ${newStatus}. No update needed.`);
        }
    }


    clearBasket() {
        const initialLength = this.#boardTasks.length;
        this.#boardTasks = this.#boardTasks.filter(task => task.status !== TaskStatus.BASKET);
        if (this.#boardTasks.length < initialLength) {
            this.notifyObservers();
        }
    }
}