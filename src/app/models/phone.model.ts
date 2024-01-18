export class Phone {
    id: number;
    marka: string;
    model: string;
    cena: number;
  
    constructor(id: number, brand: string, model: string, price: number) {
      this.id = id;
      this.marka = brand;
      this.model = model;
      this.cena = price;
    }
  }
  