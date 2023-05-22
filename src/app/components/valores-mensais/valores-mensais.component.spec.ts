import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValoresMensaisComponent } from './valores-mensais.component';

describe('ValoresMensaisComponent', () => {
  let component: ValoresMensaisComponent;
  let fixture: ComponentFixture<ValoresMensaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValoresMensaisComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValoresMensaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
