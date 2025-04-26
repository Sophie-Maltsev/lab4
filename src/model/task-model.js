export default class TaskModel {
    #boardTasks = [];

    constructor(tasks) {
        this.#boardTasks = tasks;
    }

    get tasks() {
        return this.#boardTasks;
    }
}