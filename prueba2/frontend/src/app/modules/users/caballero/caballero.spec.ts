import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Caballero } from './caballero';

describe('Caballero', () => {
  let component: Caballero;
  let fixture: ComponentFixture<Caballero>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Caballero]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Caballero);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
