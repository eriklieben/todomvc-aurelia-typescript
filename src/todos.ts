import { activationStrategy } from 'aurelia-router';
import TodoItem from './models/TodoItem';

export class TodoView {
  public stateName = 'all';

  public determineActivationStrategy(){
    return activationStrategy.invokeLifecycle;
  }

  public activate(params, navigationInstruction) {
    this.stateName = navigationInstruction.name;
  }

  public keyUp(todo, keyCode:string) {
    keyCode = keyCode.toLowerCase();
    if (keyCode === 'enter') {
      todo.commitTitleChange();
    } else if (keyCode === 'escape') {
      todo.rollbackTitleChange();
    }
  }
}
