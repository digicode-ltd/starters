import * as React from 'react';
import { FilterTypes, IStore } from './store';
import { Context } from 'react';

export interface ITodoContext {
  todos: IStore['todos'];
  filter: FilterTypes;
  addTodo: (label: string) => void;
  remove: (id: string) => void;
  complete: (id: string) => void;
  clear: () => void;
  setFilter: (filter: FilterTypes) => void;
  edit: (id: string, label: string) => void;
}

export const TodoContext: Context<ITodoContext> = React.createContext<ITodoContext>(undefined);
