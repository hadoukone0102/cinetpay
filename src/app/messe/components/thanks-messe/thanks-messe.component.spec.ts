import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksMesseComponent } from './thanks-messe.component';

describe('ThanksMesseComponent', () => {
  let component: ThanksMesseComponent;
  let fixture: ComponentFixture<ThanksMesseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksMesseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThanksMesseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
