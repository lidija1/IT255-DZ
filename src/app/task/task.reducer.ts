// task.reducer.ts

import { createReducer, on } from '@ngrx/store';
import { addTask, removeTask, toggleTask } from './task.actions';
import { Task } from './task.model';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: [],
};

export const taskReducer = createReducer(
  initialState,
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(removeTask, (state, { taskId }) => ({ ...state, tasks: state.tasks.filter(task => task.id !== taskId) })),
  on(toggleTask, (state, { taskId }) => ({
    ...state,
    tasks: state.tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
  }))
);
