// task.effects.ts

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { TaskService } from './task.service'; // Implementiraj ovaj servis ako ti je potreban

@Injectable()
export class TaskEffects {

  // Implementiraj efekte ovde ako su potrebni
  // Primer efekta: fetchTasks$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Task] Fetch Tasks'),
  //   mergeMap(() => this.taskService.getTasks()
  //     .pipe(
  //       map(tasks => ({ type: '[Task] Set Tasks', tasks }))
  //     ))
  // ));

  constructor(private actions$: Actions, private taskService$: TaskService) {} // dodala dolar 
}
