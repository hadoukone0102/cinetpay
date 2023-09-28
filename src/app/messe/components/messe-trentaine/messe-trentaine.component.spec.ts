import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesseTrentaineComponent } from './messe-trentaine.component';

describe('MesseTrentaineComponent', () => {
  let component: MesseTrentaineComponent;
  let fixture: ComponentFixture<MesseTrentaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesseTrentaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesseTrentaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
