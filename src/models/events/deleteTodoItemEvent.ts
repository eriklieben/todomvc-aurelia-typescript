import BaseEvent from './baseEvent';

export default class DeleteTodoItemEvent extends BaseEvent {
  constructor(id) {
    super(id);
  }
}
