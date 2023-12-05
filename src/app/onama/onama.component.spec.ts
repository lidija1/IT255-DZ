import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnamaComponent } from './onama.component';

describe('OnamaComponent', () => {
  let component: OnamaComponent;
  let fixture: ComponentFixture<OnamaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OnamaComponent]
    });
    fixture = TestBed.createComponent(OnamaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
