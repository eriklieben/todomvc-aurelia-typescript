import { inject, Factory } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import TodoItem from './../models/TodoItem';
import StoredTodoItem from './../models/StoredTodoItem';

import createEvent from './../models/events/todoItemTitleChangedEvent';
import todoItemDeletedEvent from './../models/events/deleteTodoItemEvent';
import completedChangedEvent from './../models/events/todoItemCompletedChangedEvent';
import titleChangedEvent from './../models/events/todoItemTitleChangedEvent';

@inject(EventAggregator, Factory.of(TodoItem))
export default class StorageService {

  constructor(ea: EventAggregator, private todoItemFactory) {
    let todos: Array<StoredTodoItem> = this.getStoredTodos();
    if (!todos) {
      setObject('todoItems', []);
    }

    ea.subscribe('todo.created', this.handleCreateEvent.bind(this));
    ea.subscribe('todo.delete', this.handleDeleteEvent.bind(this));
    ea.subscribe('todo.completed', this.handleCompletedEvent.bind(this));
    ea.subscribe('todo.title', this.handleTitleChangedEvent.bind(this));
  }

  private handleCreateEvent(event: createEvent) {
    let todos = this.getStoredTodos();
    if (!todos) {
      return;
    }

    let itemToStore = new StoredTodoItem();
    itemToStore.id = event.id;
    itemToStore.title = event.title;
    todos.push(itemToStore);
    setObject('todoItems', todos);
  }

  private handleDeleteEvent(event: todoItemDeletedEvent) {
    let todos = this.getStoredTodos();
    if (!todos) {
      return;
    }

    let todoItem = todos.find(item => item.id === event.id);
    todos.splice(todos.indexOf(todoItem), 1);
    setObject('todoItems', todos);
  }

  private handleCompletedEvent(event: completedChangedEvent) {
    let todos = this.getStoredTodos();
    if (!todos) {
      return;
    }

    let todoItem = todos.find(item => item.id === event.id);
    todoItem.completed = event.completed;
    setObject('todoItems', todos);
  }

  private handleTitleChangedEvent(event: titleChangedEvent) {
    let todos = this.getStoredTodos();
    if (!todos) {
      return;
    }

    let todoItem = todos.find(item => item.id === event.id);
    todoItem.title = event.title;
    setObject('todoItems', todos);
  }

  private getStoredTodos(): Array<StoredTodoItem> {
    return getObject('todoItems');
  }

  public getTodoList() {
    return this.getStoredTodos().map(item => this.todoItemFactory(item.title, item.completed, item.id));
  }
}

function setObject(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getObject(key) {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
}
