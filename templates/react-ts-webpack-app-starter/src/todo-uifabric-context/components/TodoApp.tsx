import * as React from 'react';
import { Stack } from 'office-ui-fabric-react';
import { TodoFooter } from './TodoFooter';
import { TodoHeader } from './TodoHeader';
import { TodoList } from './TodoList';
import { FilterTypes, IStore } from '../store';
import { TodoContext } from '../TodoContext';
import { ReactNode } from 'react';

let index = 0;

export class TodoApp extends React.Component<any, IStore> {
  constructor(props: any) {
    super(props);
    this.state = {
      todos: {},
      filter: 'all',
    };
  }
  public render(): ReactNode {
    return (
      <TodoContext.Provider
        value={{
          ...this.state,
          addTodo: this._addTodo,
          remove: this._remove,
          complete: this._complete,
          clear: this._clear,
          setFilter: this._setFilter,
          edit: this._edit,
        }}
      >
        <Stack horizontalAlign="center">
          <Stack style={{ width: 400 }} gap={25}>
            <TodoHeader />
            <TodoList />
            <TodoFooter />
          </Stack>
        </Stack>
      </TodoContext.Provider>
    );
  }

  private _addTodo = (label: string) => {
    const { todos } = this.state;
    const id = index++;

    this.setState({
      todos: { ...todos, [id]: { label, completed: true } },
    });
  };

  private _remove = (id: string) => {
    const newTodos = { ...this.state.todos };
    delete newTodos[id];

    this.setState({
      todos: newTodos,
    });
  };

  private _complete = (id: string) => {
    const newTodos = { ...this.state.todos };
    newTodos[id].completed = !newTodos[id].completed;

    this.setState({
      todos: newTodos,
    });
  };

  private _edit = (id: string, label: string) => {
    const newTodos = { ...this.state.todos };
    newTodos[id] = { ...newTodos[id], label };

    this.setState({
      todos: newTodos,
    });
  };

  private _clear = () => {
    const { todos } = this.state;
    const newTodos: IStore['todos'] = {};

    Object.keys(this.state.todos).forEach(id => {
      if (!todos[id].completed) {
        newTodos[id] = todos[id];
      }
    });

    this.setState({
      todos: newTodos,
    });
  };

  private _setFilter = (filter: FilterTypes) => {
    this.setState({
      filter: filter,
    });
  };
}
