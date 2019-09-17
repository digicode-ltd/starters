import { ReactNode } from 'react';
import * as React from 'react';
import { observer } from 'mobx-react';
import { ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import { TodoItem } from './TodoItem';
import { TodoModel } from '../models/TodoModel';
import { ViewStore } from '../stores/ViewStore';
import { TodoStore } from '../stores/TodoStore';

@observer
export class TodoOverview extends React.Component<{
  viewStore: ViewStore;
  todoStore: TodoStore;
}> {
  public render(): ReactNode {
    const { todoStore, viewStore } = this.props;
    if (todoStore.todos.length === 0) {
      return null;
    }
    return (
      <section className="main">
        <input
          className="toggle-all"
          id="toggle-all"
          type="checkbox"
          onChange={this.toggleAll}
          checked={todoStore.activeTodoCount === 0}
        />
        <label htmlFor="toggle-all" />
        <ul className="todo-list">
          {this.getVisibleTodos().map((todo: TodoModel) => (
            <TodoItem key={todo.id} todo={todo} viewStore={viewStore} />
          ))}
        </ul>
      </section>
    );
  }

  private getVisibleTodos(): TodoModel[] {
    return this.props.todoStore.todos.filter((todo: TodoModel) => {
      switch (this.props.viewStore.todoFilter) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  private toggleAll = (event: any) => {
    const checked = event.target.checked;
    this.props.todoStore.toggleAll(checked);
  };
}
