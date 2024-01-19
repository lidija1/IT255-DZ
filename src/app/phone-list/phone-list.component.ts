// phone-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../services/phone.service';
import { Phone } from '../models/phone.model';
import { Store } from '@ngrx/store';
import { addTask, removeTask, toggleTask } from '../task/task.actions';
import { TaskState } from '../task/task.reducer';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
})
export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];
  newTaskTitle: string = '';

  constructor(private phoneService: PhoneService, private store: Store<TaskState>) {}

  addTask(title: string) {
    this.store.dispatch(addTask({ task: { id: 'uniqueId', title, completed: false } }));
    this.newTaskTitle = '';
  }

  removeTask(phoneId: number) { // Promenjeno da prihvata broj
    this.store.dispatch(removeTask({ taskId: phoneId.toString() })); // Pretvoreno u string pre slanja ako je potrebno
  }

  toggleTask(phoneId: number) { // Promenjeno da prihvata broj
    this.store.dispatch(toggleTask({ taskId: phoneId.toString() })); // Pretvoreno u string pre slanja ako je potrebno
  }

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe((phones) => {
      this.phones = phones;
    });
  }
}
