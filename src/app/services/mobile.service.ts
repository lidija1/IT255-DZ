import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  getPrice(numberOfPhones: number): number {
    // Ovde dodajte logiku za izračunavanje cene na osnovu broja telefona
    const cenaPoTelefonu = 100; // Postavljeno na primeru, prilagodite prema vašim potrebama
    return numberOfPhones * cenaPoTelefonu;
  }
}
