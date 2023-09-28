import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesseTypeComponent } from './messe-type.component';

describe('MesseTypeComponent', () => {
  let component: MesseTypeComponent;
  let fixture: ComponentFixture<MesseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesseTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
