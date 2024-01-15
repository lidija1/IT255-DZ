import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  getPrice(numberOfPhones: number): number {
    // Logika za izračunavanje cene na osnovu broja telefona
    const cenaPoTelefonu = 100;
    return numberOfPhones * cenaPoTelefonu;
  }
}
