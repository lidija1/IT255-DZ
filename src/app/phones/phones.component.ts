import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  newPhone: Phone = {
    id: 0, markat: '', modelt: '', cenat: 0
  };

  phoneForm: FormGroup;
  showErrorMessage: boolean = false;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.phoneForm = this.fb.group({
      markat: ['', Validators.required],
      modelt: ['', Validators.required],
      cenat: [0 , [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // Prikazujemo podatke prilikom inicijalizacije komponente
    this.http.get<Phone[]>('http://localhost:3000/phones')
      .subscribe((data: Phone[]) => {
        this.phones = data;
      });

    // Pratimo promene u vrednosti markat polja
    const markatControl = this.phoneForm.get('markat');
    if (this.phoneForm && markatControl) {
      markatControl.valueChanges.subscribe(value => {
        if (value && value.length < 6) {
          console.log('Dužina vrednosti markat manja od 6 karaktera:', value);
        }
      });
    }
  }

  dodajTelefon() {
    if (!this.phoneForm) {
      console.error('Forma nije inicijalizovana.');
      return;
    }

    console.log('Vrednosti forme:', this.phoneForm!.value);
    console.log('Pokrenuta funkcija dodajTelefon');

    if (this.phoneForm.invalid) {
      console.log('Forma nije validna');

      // Ispisujemo greške za svako polje koje nije validno
      Object.keys(this.phoneForm.controls).forEach(key => {
        const control: AbstractControl | null = this.phoneForm.get(key);
      
        if (control != null) {
          const controlErrors = control.errors;
      
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              console.log(`Polje ${key} ima grešku: ${keyError}`);
            });
          }
        }
      });

      this.showErrorMessage = true;
      return;
    }   

    // Resetujemo prikaz poruke o grešci
    this.showErrorMessage = false;

    // Šaljemo podatke na server i dodajemo novi telefon
    this.http.post<Phone>('http://localhost:3000/phones', this.phoneForm.value)
      .subscribe((data: Phone) => {
        this.phones.push(data);

        // Resetujemo formu nakon uspešnog dodavanja
        this.phoneForm.reset();

        // Resetujemo newPhone na podrazumevanu vrednost
        this.newPhone = { id: 0, markat: '', modelt: '', cenat: 0 };
      });
  }
}
