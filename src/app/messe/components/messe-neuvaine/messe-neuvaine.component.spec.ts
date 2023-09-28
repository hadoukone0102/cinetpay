import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesseNeuvaineComponent } from './messe-neuvaine.component';

describe('MesseNeuvaineComponent', () => {
  let component: MesseNeuvaineComponent;
  let fixture: ComponentFixture<MesseNeuvaineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MesseNeuvaineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesseNeuvaineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
