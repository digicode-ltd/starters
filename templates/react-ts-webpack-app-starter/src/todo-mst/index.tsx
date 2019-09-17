import { onPatch } from 'mobx-state-tree';
// @ts-ignore
import makeInspectable from 'mobx-devtools-mst';
import { Provider } from 'mobx-react';
import { TodoStore } from './models/TodoStore';
import { App } from './App';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// create store
const todostore = TodoStore.create();

// Provider allows to pass the store to component
export const Root = (
  <Provider todoStore={todostore}>
    <App />
  </Provider>
);

// Patch listener will be invoked whenever the model or any of its descendants is mutated
onPatch(todostore, patch => {
  console.log('PATCH', patch, todostore);
});
makeInspectable(todostore);

ReactDOM.render(Root, document.getElementById('app'));
