import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PhonesComponent } from './phones.component';


describe('PhonesComponent', () => {
  let component: PhonesComponent;
  let fixture: ComponentFixture<PhonesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhonesComponent],
      imports: [ReactiveFormsModule, FormsModule],
    });
    fixture = TestBed.createComponent(PhonesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should validate the form', () => {
    // Simuliraj unos podataka u formu
    component.phoneForm.controls['marka'].setValue('Samsung');
    component.phoneForm.controls['model'].setValue('Galaxy S21');
    component.phoneForm.controls['cena'].setValue(999);

    // Proveri da li je forma validna
    expect(component.phoneForm.valid).toBeTruthy();
  });

  it('should show error message if form is invalid', () => {
    // Podesi formu u nevalidno stanje (npr. ostavi prazno polje)
    component.phoneForm.controls['marka'].setValue('');
    component.phoneForm.controls['model'].setValue('');
    component.phoneForm.controls['cena'].setValue(null);

    // Proveri da li se prikazuje poruka o grešci
    component.showErrorMessage = false; // Resetuj prikaz poruke pre provere
    component.onSubmit(); // Pokreni submit metodu koja postavlja showErrorMessage

    expect(component.showErrorMessage).toBeTruthy();
  });
});




// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { PhonesComponent } from './phones.component';

// describe('PhonesComponent', () => {
//   let component: PhonesComponent;
//   let fixture: ComponentFixture<PhonesComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [PhonesComponent]
//     });
//     fixture = TestBed.createComponent(PhonesComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
