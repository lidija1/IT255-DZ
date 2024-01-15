import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllPhones(): Observable<any> {
    return this.http.get(`${this.baseUrl}/phones`);
  }

  addPhone(phone: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/phones`, phone);
  }

  updatePhone(id: number, phone: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/phones/${id}`, phone);
  }

  deletePhone(phoneId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/phones/${phoneId}`);
  }
  async someAsyncOperation(): Promise<void> {
    return new Promise<void>(resolve => {
      // Simulacija asinhrone operacije koja traje neko vreme (npr. 2 sekunde)
      setTimeout(() => {
        console.log('Asinhrona operacija je zavrsena.');
        resolve();
      }, 2000);
    });
  }
}
