import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExyCardComponent } from './exy-card.component';

describe('ExyCardComponent', () => {
  let component: ExyCardComponent;
  let fixture: ComponentFixture<ExyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
