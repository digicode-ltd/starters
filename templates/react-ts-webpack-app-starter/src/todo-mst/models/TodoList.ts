import { Instance, types } from 'mobx-state-tree';
import { Todo } from './Todo';

export const TodoList = types
  .model('TodoList', {
    todos: types.array(Todo),
  })
  .actions(self => ({
    add(todo: Instance<typeof Todo>): void {
      self.todos.push(todo);
    },
    remove(todo: Instance<typeof Todo>): void {
      self.todos.splice(self.todos.indexOf(todo), 1);
    },
  }));
