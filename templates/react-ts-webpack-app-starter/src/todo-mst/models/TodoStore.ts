import { types } from 'mobx-state-tree';
import { TodoList } from './TodoList';

export const TodoStore = types
  .model('TodoStore', {
    todoList: types.optional(TodoList, { todos: [] }),
  })
  .views(self => ({
    get total(): string {
      return 'Todos: ' + self.todoList.todos.length;
    },
  }));
