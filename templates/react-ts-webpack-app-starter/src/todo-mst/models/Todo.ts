import { types, getParent } from 'mobx-state-tree';

export const Todo = types
  .model('Todo', {
    name: types.string,
    isCompleted: '',
  })
  .actions(self => ({
    remove(): void {
      self.isCompleted !== 'completed'
        ? alert('Todo must be completed before removal')
        : getParent(self, 2).remove(self);
    },
    triggerComplete(): void {
      self.isCompleted === 'completed' ? (self.isCompleted = '') : (self.isCompleted = 'completed');
    },
  }));
