import BaseEvent from './baseEvent';
export default class TodoItemTitleChangedEvent extends BaseEvent {
  constructor(id, public title) {
    super(id);
  }
}
