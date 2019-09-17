import * as React from 'react';
import { observer } from 'mobx-react';
import { action } from 'mobx';
import { ReactNode, RefObject } from 'react';
import { TodoStore } from '../stores/TodoStore';

const ENTER_KEY = 13;

@observer
export class TodoEntry extends React.Component<{ todoStore: TodoStore }> {
  private newField: RefObject<HTMLInputElement> = React.createRef<HTMLInputElement>();
  public render(): ReactNode {
    return (
      <input
        ref={this.newField}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyDown={this.handleNewTodoKeyDown}
        autoFocus={true}
      />
    );
  }

  @action
  private handleNewTodoKeyDown = (event: any) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }

    event.preventDefault();

    const val = this.newField.current.value.trim();

    if (val) {
      this.props.todoStore.addTodo(val);
      this.newField.current.value = '';
    }
  };
}
