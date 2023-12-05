import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreporukeComponent } from './preporuke.component';

describe('PreporukeComponent', () => {
  let component: PreporukeComponent;
  let fixture: ComponentFixture<PreporukeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreporukeComponent]
    });
    fixture = TestBed.createComponent(PreporukeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
