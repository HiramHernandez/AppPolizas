import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolizaModalComponent } from './poliza-modal.component';

describe('PolizaModalComponent', () => {
  let component: PolizaModalComponent;
  let fixture: ComponentFixture<PolizaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolizaModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolizaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
