import { inject, Factory } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import StorageService from './../services/storageService';
import TodoItem from './TodoItem';
import DeleteTodoItemEvent from './events/deleteTodoItemEvent';

@inject(EventAggregator, Factory.of(TodoItem), StorageService)
export default class TodoItems {
  
  public all: Array<TodoItem> = [];
  
  public get completed() {
    return this.all.filter(todo => todo.completed);
  }
  
  public get active() {
    return this.all.filter(todo => !todo.completed);
  }

  public get allCompleted() {
    return this.completed.length == this.all.length;  
  }
  
  public set allCompleted(value) {
    this.all.forEach(todo => todo.completed = value);
  }

  constructor(private ea: EventAggregator, private todoItemFactory, storageService: StorageService) {
    this.all = storageService.getTodoList();
  }

  public add(text) {
    text = text.trim();
    if (text.length === 0) {
      return;
    }

    let newTodoItem = this.todoItemFactory(text);
    this.all.push(newTodoItem);
  }

  public delete(todo) {
    this.all.splice(this.all.indexOf(todo), 1);
    this.ea.publish('todo.delete', new DeleteTodoItemEvent(todo.id));
  }

  public deleteAllCompleted() {
    this.completed.forEach(item => this.delete(item));
  }
}
