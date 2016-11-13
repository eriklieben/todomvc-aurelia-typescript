import BaseEvent from './baseEvent';
export default class TodoItemCompletedChangedEvent extends BaseEvent {
  constructor(id, public completed) {
    super(id);
  }
}
