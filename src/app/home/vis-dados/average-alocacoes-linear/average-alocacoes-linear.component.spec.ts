/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AverageAlocacoesLinearComponent } from './average-alocacoes-linear.component';

describe('AverageAlocacoesLinearComponent', () => {
  let component: AverageAlocacoesLinearComponent;
  let fixture: ComponentFixture<AverageAlocacoesLinearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AverageAlocacoesLinearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageAlocacoesLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
