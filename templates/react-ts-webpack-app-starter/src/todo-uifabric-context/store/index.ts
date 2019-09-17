export type FilterTypes = 'all' | 'active' | 'completed';

export interface ITodoItem {
  label: string;
  completed: boolean;
}

export interface IStore {
  todos: {
    [id: string]: ITodoItem;
  };

  filter: FilterTypes;
}
