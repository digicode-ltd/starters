import { observable } from 'mobx';
import { TodoStore } from '../stores/TodoStore';

export class TodoModel {
  private store: TodoStore;
  public id: string;
  @observable public title: string;
  @observable public completed: boolean;

  constructor(store: TodoStore, id: string, title: string, completed: boolean) {
    this.store = store;
    this.id = id;
    this.title = title;
    this.completed = completed;
  }

  public toggle(): void {
    this.completed = !this.completed;
  }

  public destroy(): void {
    // @ts-ignore
    this.store.todos.remove(this);
  }

  public setTitle(title: string): void {
    this.title = title;
  }

  public toJS(): any {
    return {
      id: this.id,
      title: this.title,
      completed: this.completed,
    };
  }

  public static fromJS(store: TodoStore, object: any): TodoModel {
    return new TodoModel(store, object.id, object.title, object.completed);
  }
}
