import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Phone {
  id: number;
  markat: string;
  modelt: string;
  cenat: number;
}

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss']
})
export class PonudeComponent implements OnInit{
  constructor(private http: HttpClient) { }
  phones: Phone[] = [];
  ngOnInit() {
    this.http.get<Phone[]>('http://localhost:3000/phones')
      .subscribe((data: Phone[]) => {
        this.phones = data;
      });
  }
}
