import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisDadosComponent } from './vis-dados.component';

describe('VisDadosComponent', () => {
  let component: VisDadosComponent;
  let fixture: ComponentFixture<VisDadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisDadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisDadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
