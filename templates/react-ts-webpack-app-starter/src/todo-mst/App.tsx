import { Component, ReactNode } from 'react';
// tslint:disable-next-line:no-import-side-effect
import './App.css';
import { inject, observer } from 'mobx-react';
import { Input } from './components/Input';
import { TodoList } from './components/TodoList';
import { Instance } from 'mobx-state-tree';
import { TodoStore } from './models/TodoStore';
import * as React from 'react';

@inject('todoStore')
@observer
export class App extends Component<{ todoStore?: Instance<typeof TodoStore> }> {
  public render(): ReactNode {
    const { todoStore } = this.props;
    return (
      <div className="App">
        <h2>{todoStore.total}</h2>
        <Input />
        <TodoList />
      </div>
    );
  }
}
