// phone-list.component.ts

import { Component, OnInit } from '@angular/core';
import { PhoneService } from '../services/phone.service';
import { Phone } from '../models/phone.model';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.scss'],
})
export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];

  constructor(private phoneService: PhoneService) {}

  ngOnInit(): void {
    this.phoneService.getPhones().subscribe((phones) => {
      this.phones = phones;
    });
  }
}
