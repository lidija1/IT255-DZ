import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MobileService } from '../services/mobile.service';
import { RestService } from '../services/rest.service';


interface Phone {
  id: number;
  marka: string;
  model: string;
  cena: number;
  selected?: boolean;
  phoneId: number;
}

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})


export class PhonesComponent implements OnInit {

  phoneForm: FormGroup;
  showErrorMessage: boolean = false;
  phones: Phone[] = [];
  selectedPhones: Phone[] = [];
  newPhone: Phone = {
    id: 0, marka: '', model: '', cena: 0,
    phoneId: 0
  };
  totalCost: number = 0;

  constructor(private http: HttpClient, private fb: FormBuilder, private mobileService: MobileService, private restService: RestService) {
    this.phoneForm = this.fb.group({
      marka: ['', Validators.required],
      model: ['', Validators.required],
      cena: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    // Prikazujemo podatke prilikom inicijalizacije komponente
    // this.http.get<Phone[]>('http://localhost:3000/phones')
    //   .subscribe((data: Phone[]) => {
    //     this.phones = data;
    //   });
    this.restService.getAllPhones().subscribe((data: any) => {
      console.log('Response from server:', data);
      this.phones = data;
    });
    const cenaControl = this.phoneForm.get('cena');
    if (this.phoneForm && cenaControl) {
      cenaControl.valueChanges.subscribe(value => {
        console.log('Nova vrednost cene:', value);
      });
    }

    this.restService.getAllPhones()
      .subscribe((data: Phone[]) => {
        this.phones = data;
      });

    // Pratimo promene u vrednosti marka polja
    // const markaControl = this.phoneForm.get('marka');
    // if (this.phoneForm && markaControl) {
    //   markaControl.valueChanges.subscribe(value => {
    //     if (value && value.length < 6) {
    //       console.log('Dužina vrednosti marka manja od 6 karaktera:', value);
    //     }
    //   });
    // }
    this.refreshPhones();
  }
  onSubmit(): void {
    // Your submit logic here
    console.log('Form submitted!');
  }



  //za sabiranje cene odabranih telefona
  toggleSelection(phone: any): void {
    if (this.isSelected(phone)) {
      this.selectedPhones = this.selectedPhones.filter((p) => p !== phone);
    } else {
      this.selectedPhones.push(phone);
    }
    this.calculateTotalCost();
  }

  isSelected(phone: any): boolean {
    return this.selectedPhones.includes(phone);
  }

  calculateTotalCost(): void {
    this.totalCost = this.selectedPhones.reduce((sum, phone) => sum + phone.cena, 0);
  }


  refreshPhones() {
    this.restService.getAllPhones().subscribe((data: Phone[]) => {
      this.phones = data;
    });
  }


  dodajTelefon() {
    if (!this.phoneForm) {
      console.error('Forma nije inicijalizovana.');
      return;
    }

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
      window.location.reload();
      return;
    }

    console.log('Vrednosti forme:', this.phoneForm!.value);
    console.log('Pokrenuta funkcija dodajTelefon');

    // Resetujemo prikaz poruke o grešci
    this.showErrorMessage = false;

    // Šaljemo podatke na server i dodajemo novi telefon
    this.restService.addPhone(this.phoneForm.value).subscribe(
      (data: Phone) => {
        // Uspesno dodavanje - ažuriranje lokalnog prikaza telefona
        this.phones.push(data);

        // Resetovanje forme nakon uspešnog dodavanja
        this.phoneForm.reset();

        // Resetovanje newPhone na podrazumevanu vrednost
        this.newPhone = { phoneId: 0, id: 0, marka: '', model: '', cena: 0 };
      },
      (error) => {
        console.error('Greška prilikom slanja podataka na server:', error);
      }
    );
  }



  //dugme u tabeli da bi se peokazali podaci koji treba da se azuriraju
  async azurirajTelefon(phone: Phone): Promise<void> {
    this.refreshPhones();
    console.log('Vrednost izabranog telefona (pre postavljanja):', phone);

    // Postavi vrednosti forme na osnovu izabranog telefona
    this.phoneForm.patchValue({
      id: phone.id,
      marka: phone.marka,
      model: phone.model,
      cena: phone.cena
    });

    // Ažuriraj 'newPhone' objekat sa informacijama izabranog telefona
    this.newPhone = { ...phone, id: phone.phoneId };
    // Postavi 'id' svojstvo na odgovarajuću vrednost

    console.log('Vrednost newPhone (posle postavljanja):', this.newPhone);

    try {
      // Sačekaj završetak asinhrone operacije pre nego što nastaviš dalje
      await this.restService.someAsyncOperation();

      // Ažuriraj izabrane telefone na serveru i lokalno
      await this.sacuvajAzuriranje();

    } catch (error) {
      console.error('Greška prilikom ažuriranja telefona:', error);
    }

  }

  async sacuvajAzuriranje(): Promise<void> {
    if (this.phoneForm.invalid) {
      console.log('Forma nije validna');
      return;
    }

    try {
      // Ažuriranje izabranih telefona na serveru
      await this.restService.updatePhone(this.newPhone.id, this.phoneForm.value).toPromise();

      // Ažuriraj lokalne podatke o telefonu
      const updatedPhoneIndex = this.phones.findIndex(p => p.id === this.newPhone.id);
      if (updatedPhoneIndex !== -1) {
        this.phones[updatedPhoneIndex] = { ...this.newPhone, ...this.phoneForm.value };
      }

      // Resetuj formu nakon ažuriranja
      this.handleFormReset();
    } catch (error) {
      console.error('Greška prilikom ažuriranja telefona:', error);
    }

  }


  obrisiTelefon(phoneId: number | undefined): void {
    if (phoneId === undefined) {
      console.error('phoneId nije definisan.');
      return;
    }

    console.log(`Brisanje telefona sa ID:`, phoneId);

    this.restService.deletePhone(phoneId).subscribe(
      () => {
        // Ukloni telefon iz lokalnog niza
        const index = this.phones.findIndex((p) => p.id === phoneId);
        if (index !== -1) {
          this.phones.splice(index, 1);
        }

        // Ažuriraj prikaz selektovanih telefona
        this.selectedPhones = this.selectedPhones.filter((p) => p.id !== phoneId);
      },
      (error) => {
        console.error(`Greška prilikom brisanja telefona sa ID: ${phoneId}`, error);
      }
    );
    this.refreshPhones();
  }

  //resetovanje forme
  private handleFormReset(): void {
    this.phoneForm.reset();
    this.newPhone = { phoneId: 0, id: 0, marka: '', model: '', cena: 0 };
  }
}





// updateSelectedPhones(phoneId: number, event: any): void {
  //   const checked = event.target?.checked || false;
  //   const phoneIndex = this.phones.findIndex(p => p.id === phoneId);
  
  //   if (phoneIndex !== -1) {
  //     const phone = this.phones[phoneIndex];
  //     phone.selected = checked;
  
  //     if (checked) {
  //       // Dodaj telefon u selectedPhones ako već nije dodat
  //       if (!this.selectedPhones.some(p => p.id === phoneId)) {
  //         this.selectedPhones.push(phone);
  //       }
  //     } else {
  //       // Ukloni telefon iz selectedPhones
  //       this.selectedPhones = this.selectedPhones.filter(p => p.id !== phoneId);
  //     }
  //   }
  // }
   // calculateTotalPrice(): number {
  //   console.log('Selected Phones:', this.selectedPhones);
  //   const totalPrice = this.selectedPhones.reduce((sum, phone) => {
  //     console.log('Phone cena:', phone.cena);
  //     return sum + (phone.cena || 0);
  //   }, 0);
  //   console.log('Total Price:', totalPrice);
  //   return totalPrice;
  // }