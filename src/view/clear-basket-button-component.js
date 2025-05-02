import {AbstractComponent} from '../framework/view/abstract-component.js';

export default class ClearBasketButtonComponent extends AbstractComponent {
    get template() {
        return `
            <button class="clear-basket-button" type="button" data-basket-clear>
                Очистить корзину
            </button>
        `;
    }
}