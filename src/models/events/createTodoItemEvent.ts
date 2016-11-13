import BaseEvent from './baseEvent';

export default class CreateTodoItemEvent extends BaseEvent {
  constructor(id, public title) {
    super(id);
  }
}
