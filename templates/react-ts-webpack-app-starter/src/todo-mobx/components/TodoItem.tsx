import * as React from 'react';
import { observer } from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { ReactNode } from 'react';
import { ViewStore } from '../stores/ViewStore';
import { TodoModel } from '../models/TodoModel';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;

@observer
export class TodoItem extends React.Component<{ todo: TodoModel; viewStore: ViewStore }> {
  @observable private editText: string = '';

  public render(): ReactNode {
    const { todo } = this.props;
    return (
      <li className={[todo.completed ? 'completed' : '', this.isBeingEdited ? 'editing' : ''].join(' ')}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.completed} onChange={this.handleToggle} />
          <label onDoubleClick={this.handleEdit}>{todo.title}</label>
          <button className="destroy" onClick={this.handleDestroy}>
            x
          </button>
        </div>
        <input
          className="edit"
          value={this.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }

  @computed
  private get isBeingEdited(): boolean {
    return this.props.viewStore.todoBeingEdited === this.props.todo;
  }

  @action
  private handleSubmit = (event: any) => {
    const val = this.editText.trim();
    if (val) {
      this.props.todo.setTitle(val);
      this.editText = val;
    } else {
      this.handleDestroy();
    }
    this.props.viewStore.todoBeingEdited = null;
  };

  @action
  private handleDestroy = () => {
    this.props.todo.destroy();
    this.props.viewStore.todoBeingEdited = null;
  };

  @action
  private handleEdit = () => {
    const todo = this.props.todo;
    this.props.viewStore.todoBeingEdited = todo;
    this.editText = todo.title;
  };

  @action
  private handleKeyDown = (event: any) => {
    if (event.which === ESCAPE_KEY) {
      this.editText = this.props.todo.title;
      this.props.viewStore.todoBeingEdited = null;
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  @action
  private handleChange = (event: any) => {
    this.editText = event.target.value;
  };

  @action
  private handleToggle = () => {
    this.props.todo.toggle();
  };
}
