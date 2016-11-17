import { RouterConfiguration, Router } from 'aurelia-router';
import { inject } from 'aurelia-framework';

import TodoItems from './models/TodoItems';

@inject(TodoItems)
export class App {
  
  public router;
  public newTodoText = '';
   
  constructor(public todoItems: TodoItems) {
  }

  public addTodoItem() {
    this.todoItems.add(this.newTodoText);
    this.newTodoText = '';
  }

  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia - TodoMVC';
    config.map([
      { route: ['', 'all'],   name: 'all',        moduleId: 'todos', nav: true, title: 'All' },
      { route: 'active',      name: 'active',     moduleId: 'todos', nav: true, title: 'Active' },
      { route: 'completed',   name: 'completed',  moduleId: 'todos', nav: true, title: 'Completed' }
    ]);

    this.router = router;
  }
}
