// task.selectors.ts

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TaskState } from './task.reducer';

// Selektor za dohvat celog stanja zadatka
export const selectTaskState = createFeatureSelector<TaskState>('tasks');

// Selektor za dohvat liste zadataka
export const selectAllTasks = createSelector(
  selectTaskState,
  (state) => state.tasks
);

// Dodaj dodatne selektore po potrebi
