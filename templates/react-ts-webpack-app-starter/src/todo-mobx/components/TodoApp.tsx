import { observer } from 'mobx-react';
import * as React from 'react';
import { TodoEntry } from './TodoEntry';
import { TodoOverview } from './TodoOverview';
import { TodoFooter } from './TodoFooter';
import { ReactNode } from 'react';
import { TodoStore } from '../stores/TodoStore';
import { ViewStore } from '../stores/ViewStore';

@observer
export class TodoApp extends React.Component<{ viewStore: ViewStore; todoStore: TodoStore }> {
  public render(): ReactNode {
    const { todoStore, viewStore } = this.props;
    return (
      <div>
        <header className="header">
          <h1>todos</h1>
          <TodoEntry todoStore={todoStore} />
        </header>
        <TodoOverview todoStore={todoStore} viewStore={viewStore} />
        <TodoFooter todoStore={todoStore} viewStore={viewStore} />
      </div>
    );
  }
}
