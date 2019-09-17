import { observable, computed, reaction, action } from 'mobx';
import { TodoModel } from '../models/TodoModel';
import * as Utils from '../utils';

export class TodoStore {
  @observable public todos: TodoModel[] = [];

  @computed public get activeTodoCount(): number {
    return this.todos.reduce((sum, todo) => sum + (todo.completed ? 0 : 1), 0);
  }

  @computed public get completedCount(): number {
    return this.todos.length - this.activeTodoCount;
  }

  public subscribeServerToStore(): void {
    reaction(() => this.toJS(), todos => console.log('!!!!!!', todos));
  }

  @action
  public addTodo(title: string): void {
    this.todos.push(new TodoModel(this, Utils.uuid(), title, false));
  }

  @action
  public toggleAll(checked: boolean): void {
    this.todos.forEach(todo => (todo.completed = checked));
  }

  @action
  public clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
  }

  private toJS(): any {
    return this.todos.map(todo => todo.toJS());
  }

  public static fromJS(array: any[]): TodoStore {
    const todoStore = new TodoStore();
    todoStore.todos = array.map(item => TodoModel.fromJS(todoStore, item));
    return todoStore;
  }
}
