import { observable } from 'mobx';
import { ALL_TODOS } from '../constants';
import { TodoModel } from '../models/TodoModel';

export class ViewStore {
  @observable public todoBeingEdited: TodoModel = null;
  @observable public todoFilter: string = ALL_TODOS;
}
