import { Component, ReactNode } from 'react';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { cast, Instance } from 'mobx-state-tree';
import { TodoStore } from '../models/TodoStore';

@inject('todoStore')
@observer
export class Input extends Component<{ todoStore?: Instance<typeof TodoStore> }> {
  private nameInput: HTMLInputElement;
  public render(): ReactNode {
    const { todoStore } = this.props;
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          todoStore.todoList.add(cast({ name: this.nameInput.value, isCompleted: '' }));
          (e.target as HTMLFormElement).reset();
          this.nameInput.focus();
        }}
      >
        <input type="text" ref={input => (this.nameInput = input)} id="name" />
        <button type="submit">Add</button>
      </form>
    );
  }
}
