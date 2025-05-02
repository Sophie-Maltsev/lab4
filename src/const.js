// src/const.js
export const TaskStatus = {
    BACKLOG: 'backlog',
    PROCESSING: 'processing',
    DONE: 'done',
    BASKET: 'basket'  // Убедимся, что здесь именно 'basket', а не 'корзина'
};

export const TaskStatusLabel = {
    [TaskStatus.BACKLOG]: 'Бэклог',
    [TaskStatus.PROCESSING]: 'В процессе',
    [TaskStatus.DONE]: 'Готово',
    [TaskStatus.BASKET]: 'Корзина'
};