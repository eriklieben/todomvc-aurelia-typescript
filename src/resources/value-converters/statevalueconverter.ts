import TodoItem from './../../models/TodoItem';

export class StateValueConverter {
  public toView(todos: Array<TodoItem>, state) {
    switch(state) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  }
}

