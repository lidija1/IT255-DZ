// task.service.ts

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [];

  constructor() {
    // Dodajemo nekoliko početnih zadataka za simulaciju
    this.tasks.push({ id: '1', title: 'Rezervisati telefon', completed: false });
    this.tasks.push({ id: '2', title: 'Kupiti masku za telefon', completed: true });
  }

  getTasks(): Observable<Task[]> {
    // Simuliramo dohvat zadataka
    return of(this.tasks);
  }

  addTask(task: Task): Observable<void> {
    // Simuliramo dodavanje zadatka
    this.tasks.push(task);
    return of();
  }

  removeTask(taskId: string): Observable<void> {
    // Simuliramo uklanjanje zadatka
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    return of();
  }

  toggleTask(taskId: string): Observable<void> {
    // Simuliramo promenu statusa zadatka
    this.tasks = this.tasks.map(task => (task.id === taskId ? { ...task, completed: !task.completed } : task));
    return of();
  }
}
