import { EventAggregator } from 'aurelia-event-aggregator';
import { inject } from 'aurelia-framework';
import { CreatedEvent, CompletedChangedEvent, TitleChangedEvent } from './../models/events/index';


@inject(EventAggregator)
export default class TodoItem {
  private oldTitle = '';
  public editing = false;

  private innerId: string;
  public get id() {
    return this.innerId;
  }

  private innerCompleted: boolean;
  
  public get completed() {
    return this.innerCompleted;
  }
   
  public set completed(value) {
    if (value === this.innerCompleted) {
      return;
    }

    this.innerCompleted = value;
    this.ea.publish('todo.completed', new CompletedChangedEvent(this.innerId, this.innerCompleted));
  }

  constructor(
    private ea: EventAggregator, 
    public title: string,
    completed = false,
    id = null) {
      
      this.innerCompleted = completed;

      if (!id) {
        this.innerId = uniqueID();
        this.ea.publish('todo.created', new CreatedEvent(this.id, this.title));
      } else {
        this.innerId = id;
      }

  }

  public editTitle() {
    this.editing = !this.editing;
    if (this.editing) {
      this.oldTitle = this.title;
    }
  }

  public commitTitleChange() {
    this.oldTitle = '';
    this.editing = false;
    this.ea.publish('todo.title', new TitleChangedEvent(this.id, this.title));
  }

  public rollbackTitleChange() {
    this.title = this.oldTitle;
    this.oldTitle = '';
    this.editing = false;
  }
}

function uniqueID() {
  function chr4() {
    return Math.random().toString(16).slice(-4);
  }
  return chr4() + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() +
    '-' + chr4() + chr4() + chr4();
}
