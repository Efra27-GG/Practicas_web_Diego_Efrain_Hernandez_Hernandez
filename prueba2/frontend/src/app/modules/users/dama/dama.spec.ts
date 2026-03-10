import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dama } from './dama';

describe('Dama', () => {
  let component: Dama;
  let fixture: ComponentFixture<Dama>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dama]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dama);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
