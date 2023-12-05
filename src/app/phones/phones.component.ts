import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Phone {
  id: number;
  markat: string;
  modelt: string;
  cenat: number;
}

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})
export class PhonesComponent implements OnInit {
  phones: Phone[] = [];
  newPhone: Phone = { id: 0, markat: '', modelt: '', cenat: 0 };

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.http.get<Phone[]>('http://localhost:3000/phones')
      .subscribe((data: Phone[]) => {
        this.phones = data;
      });
  }
  dodajTelefon() {
    
    this.http.post<Phone>('http://localhost:3000/phones', this.newPhone)
      .subscribe((data: Phone) => {
        this.phones.push(data);
        this.newPhone = {id: 0, markat: '', modelt: '', cenat: 0 };
      });
  }

}


