import { Component, ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import { Todo } from './Todo';
import { Instance } from 'mobx-state-tree';
import { TodoStore } from '../models/TodoStore';
import * as React from 'react';

@inject('todoStore')
@observer
export class TodoList extends Component<{ todoStore?: Instance<typeof TodoStore> }> {
  public render(): ReactNode {
    const { todoStore } = this.props;
    return (
      <ul>
        {todoStore.todoList.todos.map((todo, index) => (
          <Todo key={index} todo={todo} />
        ))}
      </ul>
    );
  }
}
