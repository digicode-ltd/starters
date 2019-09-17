// import 'todomvc-common';
import { TodoStore } from './stores/TodoStore';
import { ViewStore } from './stores/ViewStore';
import { TodoApp } from './components/TodoApp';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

const todoStore = TodoStore.fromJS([]);
const viewStore = new ViewStore();

todoStore.subscribeServerToStore();

ReactDOM.render(<TodoApp todoStore={todoStore} viewStore={viewStore} />, document.getElementById('app'));
