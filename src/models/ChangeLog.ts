import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import BaseEvent from './../models/events/baseEvent';

@inject(EventAggregator)
export default class ChangeLog {

  constructor(ea: EventAggregator, private todoItemFactory) {
    ea.subscribe('todo.created', this.handleEvent.bind(this));
    ea.subscribe('todo.delete', this.handleEvent.bind(this));
    ea.subscribe('todo.completed', this.handleEvent.bind(this));
    ea.subscribe('todo.title', this.handleEvent.bind(this));
  }

  public lastModified = undefined;

  private handleEvent(event: BaseEvent) 
  {
    this.lastModified = event.occuredOn;
  }
}
