import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { pluralize } from '../utils';
import { ALL_TODOS, ACTIVE_TODOS, COMPLETED_TODOS } from '../constants';
import { ReactNode } from 'react';
import { ViewStore } from '../stores/ViewStore';
import { TodoStore } from '../stores/TodoStore';

@observer
export class TodoFooter extends React.Component<{ viewStore: ViewStore; todoStore: TodoStore }> {
  public render(): ReactNode {
    const todoStore = this.props.todoStore;
    if (!todoStore.activeTodoCount && !todoStore.completedCount) {
      return null;
    }

    const activeTodoWord = pluralize(todoStore.activeTodoCount, 'item');

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoStore.activeTodoCount}</strong> {activeTodoWord} left
        </span>
        <ul className="filters">
          {this.renderFilterLink(ALL_TODOS, '', 'All')}
          {this.renderFilterLink(ACTIVE_TODOS, 'active', 'Active')}
          {this.renderFilterLink(COMPLETED_TODOS, 'completed', 'Completed')}
        </ul>
        {todoStore.completedCount === 0 ? null : (
          <button className="clear-completed" onClick={this.clearCompleted}>
            Clear completed
          </button>
        )}
      </footer>
    );
  }

  private renderFilterLink(filterName: string, url: string, caption: any): ReactNode {
    return (
      <li>
        <button
          onClick={() => {
            this.props.viewStore.todoFilter = filterName;
          }}
        >
          {caption}
        </button>{' '}
      </li>
    );
  }

  @action
  private clearCompleted = () => {
    this.props.todoStore.clearCompleted();
  };
}
