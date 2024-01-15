import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Phone {
  id: number;
  marka: string;
  model: string;
  cena: number;
}

@Component({
  selector: 'app-ponude',
  templateUrl: './ponude.component.html',
  styleUrls: ['./ponude.component.scss']
})
export class PonudeComponent implements OnInit {
// zbirracuna: boolean = false;
promeniVrednostPunjac() {
this.uvecanRacunPunjac = !this.uvecanRacunPunjac;
}
promeniVrednostKamera() {
this.uvecanRacunKamera = !this.uvecanRacunKamera;
}
promeniVrednostRama() {
this.uvecanRacunRam = !this.uvecanRacunRam;
}
  uvecanRacunRam: boolean = false;
  ram: number = 50;
  uvecanRacunKamera: boolean = false;
  kamera: number = 30;
  uvecanRacunPunjac: boolean = false;
  punjac: number = 20;




  constructor(private http: HttpClient) { }
  phones: Phone[] = [];
  ngOnInit() {
    this.http.get<Phone[]>('http://localhost:3000/phones')
      .subscribe((data: Phone[]) => {
        this.phones = data;
      });
  }
}
