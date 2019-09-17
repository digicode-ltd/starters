import * as React from 'react';
import { observer } from 'mobx-react';
import { Todo as TodoModel } from '../models/Todo';
import { Instance } from 'mobx-state-tree';

export const TodoP = ({ todo }: { todo: Instance<typeof TodoModel> }) => (
  <li className={todo.isCompleted}>
    <i onClick={todo.triggerComplete}>{todo.name}</i>
    <button className="x" onClick={todo.remove}>
      X
    </button>
  </li>
);

export const Todo = observer(TodoP);
