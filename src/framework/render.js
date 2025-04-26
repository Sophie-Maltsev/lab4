export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export function createElement(template) {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstElementChild;
}

export function render(component, container, place = RenderPosition.BEFOREEND) {
  if (component instanceof HTMLElement) {
    container.insertAdjacentElement(place, component);
  } else {
    container.insertAdjacentElement(place, component.element);
  }
}