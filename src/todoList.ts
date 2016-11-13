import { RouterConfiguration, Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';
import TodoItem from './models/TodoItem';
import TodoItems from './models/TodoItems';

@inject(TodoItems)
export class TodoList {
  public newTodoText = '';
  
  constructor(public todoItems: TodoItems) {
        
  }

  public addTodoItem() {
    this.todoItems.add(this.newTodoText);
    this.newTodoText = '';
  }
}
