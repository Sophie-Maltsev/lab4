export const TaskStatus = {
    BACKLOG: 'backlog',
    PROCESSING: 'processing',
    DONE: 'done',
    BASKET: 'basket'
};

export const TaskStatusLabel = {
    [TaskStatus.BACKLOG]: 'Бэклог',
    [TaskStatus.PROCESSING]: 'В процессе',
    [TaskStatus.DONE]: 'Готово',
    [TaskStatus.BASKET]: 'Корзина'
};